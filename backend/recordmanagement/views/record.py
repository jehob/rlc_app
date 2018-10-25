""" rlcapp - record and organization management software for refugee law clinics
Copyright (C) 2018  Dominik Walser

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/> """
from rest_framework import viewsets, mixins
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from django.db.models import Q
import os

from backend.recordmanagement import models, serializers
from backend.api import permissions
from backend.api.models import UserProfile
from backend.api.statics.staticNames import StaticPermissionNames as Static
from backend.api.other_functions.emails import EmailSender


class RecordsFullDetailViewSet(mixins.CreateModelMixin, mixins.RetrieveModelMixin, mixins.UpdateModelMixin,
                               mixins.DestroyModelMixin, viewsets.GenericViewSet):
    authentication_classes = (TokenAuthentication,)
    serializer_class = serializers.RecordFullDetailSerializer
    permission_classes = (permissions.EditRecord, IsAuthenticated)

    def perform_create(self, serializer):
        creator = models.UserProfile.objects.get(id=self.request.user.id)
        client = models.Client.objects.get(id=self.request.data['client'])
        user_rlcs = [str(rlc.id) for rlc in list(self.request.user.rlc_members.all())]
        if self.request.data['from_rlc'] not in user_rlcs:
            raise AttributeError
        from_rlc = models.Rlc.objects.get(id=self.request.data['from_rlc'])
        serializer.save(creator=creator, client=client, from_rlc=from_rlc)

    def get_queryset(self):
        return models.Record.objects.all()


class RecordsListViewSet(viewsets.ViewSet):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def list(self, request):
        user = request.user

        rlcs = list(user.rlc_members.all())
        search = request.query_params.get('search', '')
        parts = search.split(' ')
        search_query = Q()
        for part in parts:
            search_query.add(
                Q(tagged__name__contains=part) | Q(note__contains=part) | Q(working_on_record__name__contains=part),
                Q.AND)

        if user.is_superuser:
            queryset = models.Record.objects.filter(search_query)
            serializer = serializers.RecordFullDetailSerializer(queryset, many=True)
            return Response(serializer.data)

        records = []
        for rlc in rlcs:
            if user.has_permission(Static.VIEW_RECORDS_FULL_DETAIL, for_rlc=rlc.id):
                queryset = models.Record.objects.filter(search_query, from_rlc_id=rlc.id)
                serializer = serializers.RecordFullDetailSerializer(queryset, many=True)
                records += serializer.data
            else:
                queryset = models.Record.objects.filter(search_query,
                                                        id__in=user.working_on_record.values_list('id', flat=True),
                                                        from_rlc_id=rlc.id).distinct()
                serializer = serializers.RecordFullDetailSerializer(queryset, many=True)
                records += serializer.data

                queryset = models.Record.objects.exclude(
                    id__in=user.working_on_record.values_list('id', flat=True)).filter(
                    search_query, from_rlc_id=rlc.id).distinct()
                serializer = serializers.RecordNoDetailSerializer(queryset, many=True)
                records += serializer.data
        return Response(records)

    def create(self, request):
        rlc = request.user.rlc_members.first()
        record = models.Record(client_id=request.data['client'], first_contact_date=request.data['first_contact_date'],
                               last_contact_date=request.data['last_contact_date'],
                               record_token=request.data['record_token'],
                               note=request.data['note'],
                               creator_id=request.user.id,
                               from_rlc_id=rlc.id)
        record.save()
        for tag_id in request.data['tagged']:
            record.tagged.add(models.RecordTag.objects.get(pk=tag_id))
        for user_id in request.data['working_on_record']:
            record.working_on_record.add(UserProfile.objects.get(pk=user_id))
        record.save()
        return Response(serializers.RecordFullDetailSerializer(record).data)

    def retrieve(self, request, pk=None):
        queryset = models.Record.objects.get(pk=pk)
        if request.user.rlc_members.first() != queryset.from_rlc:
            return Response({'error': 'wrong rlc', 'error_token': 'api.retrieve_record.wrong_rlc'}, status=400)
        if request.user.has_permission(Static.VIEW_RECORDS_FULL_DETAIL) or request.user.working_on_record.filter(
            id=pk).count() == 1:
            serializer = serializers.RecordFullDetailSerializer(queryset)
        else:
            serializer = serializers.RecordNoDetailSerializer(queryset)
        return Response(serializer.data)


class RecordViewSet(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        data = request.data
        rlc = request.user.rlc_members.first()
        if 'client_id' in data:
            client = models.Client.objects.get(pk=data['client_id'])
            client.note = data['client_note']
            client.phone_number = data['client_phone_number']
            client.save()
        else:
            client = models.Client(name=data['client_name'], phone_number=data['client_phone_number'],
                                   birthday=data['client_birthday'], note=data['client_note'])
            client.save()

        record = models.Record(client_id=client.id, first_contact_date=data['first_contact_date'],
                               last_contact_date=data['first_contact_date'], record_token=data['record_token'],
                               note=data['record_note'], creator_id=request.user.id, from_rlc_id=rlc.id, state="op")
        record.save()
        for tag_id in data['tags']:
            record.tagged.add(models.RecordTag.objects.get(pk=tag_id))
        for user_id in data['consultants']:
            record.working_on_record.add(UserProfile.objects.get(pk=user_id))
        record.save()

        for user_id in data['consultants']:
            actual_consultant = UserProfile.objects.get(pk=user_id)
            if "URL" in os.environ:
                url = os.environ['URL'] + "/records/" + str(record.id)
            else:
                url = 'no url, please contact the administrator'

            EmailSender.send_email_notification((actual_consultant.email,), "New Record",
                                                "RLC Intranet Notification - Your were assigned as a consultant for a new record. Look here:" +
                                                url)

        return Response(serializers.RecordFullDetailSerializer(record).data)

    def get(self, request, id):
        record = models.Record.objects.get(pk=id)
        user = request.user
        if user.rlc_members.first() != record.from_rlc and not user.is_superuser:
            return Response({'error': 'wrong rlc', 'error_token': 'api.retrieve_record.wrong_rlc'}, status=400)

        if user.working_on_record.filter(id=id).count() == 1:
            record_serializer = serializers.RecordFullDetailSerializer(record)
            client_serializer = serializers.ClientSerializer(record.client)
            origin_country = serializers.OriginCountrySerializer(record.client.origin_country)

            return Response({
                'record': record_serializer.data,
                'client': client_serializer.data,
                'origin_country': origin_country.data
            })
        else:
            serializer = serializers.RecordNoDetailSerializer(record)
            return Response(serializer.data)

    def patch(self, request, id):
        record = models.Record.objects.get(pk=id)
        user = request.user
        if user.rlc_members.first() != record.from_rlc and not user.is_superuser:
            return Response({'error': 'wrong rlc', 'error_token': 'api.retrieve_record.wrong_rlc'}, status=400)

        if user.working_on_record.filter(id=id).count() == 1:
            if request.data['record_note']:
                record.note = request.data['record_note']
            record.save()

            for user in record.working_on_record.all():
                if 'URL' in os.environ:
                    url = os.environ['URL'] + "records/" + str(record.id)
                else:
                    url = 'no url, please contact the administrator'

                EmailSender.send_email_notification((user.email, ), "Patched Record",
                                                    "RLC Intranet Notification - A record of yours was changed. Look here:" +
                                                    url)

            return Response({'success': 'true'})

        return Response({'no permission': 'true'})
