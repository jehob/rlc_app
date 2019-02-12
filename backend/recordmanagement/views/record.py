#  rlcapp - record and organization management software for refugee law clinics
#  Copyright (C) 2019  Dominik Walser
#
#  This program is free software: you can redistribute it and/or modify
#  it under the terms of the GNU Affero General Public License as
#  published by the Free Software Foundation, either version 3 of the
#  License, or (at your option) any later version.
#
#  This program is distributed in the hope that it will be useful,
#  but WITHOUT ANY WARRANTY; without even the implied warranty of
#  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#  GNU Affero General Public License for more details.
#
#  You should have received a copy of the GNU Affero General Public License
#  along with this program.  If not, see <https://www.gnu.org/licenses/>


import os

from django.db.models import Q
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.views import APIView

from backend.api.errors import CustomError
from backend.api.models import UserProfile
from backend.api.other_functions.emails import EmailSender
from backend.recordmanagement import models, serializers
from backend.static.error_codes import *
from backend.static.permissions import PERMISSION_VIEW_RECORDS_FULL_DETAIL


class RecordsListViewSet(viewsets.ViewSet):
    def list(self, request):
        """

        :param request:
        :return:
        """
        parts = request.query_params.get('search', '').split(' ')
        user = request.user

        if user.is_superuser:
            entries = models.Record.objects.all()
            for part in parts:
                consultants = UserProfile.objects.filter(name__icontains=part)
                entries = entries.filter(
                    Q(tagged__name__icontains=part) | Q(note__icontains=part) | Q(
                        working_on_record__in=consultants)).distinct()
            serializer = serializers.RecordFullDetailSerializer(entries, many=True)
            return Response(serializer.data)

        # entries = models.Record.objects.filter(from_rlc=user.rlc)
        entries = models.Record.objects.filter_by_rlc(user.rlc)
        for part in parts:
            consultants = UserProfile.objects.filter(name__icontains=part)
            entries = entries.filter(
                Q(tagged__name__icontains=part) | Q(note__icontains=part) | Q(
                    working_on_record__in=consultants)).distinct()

        records = []
        if user.has_permission(PERMISSION_VIEW_RECORDS_FULL_DETAIL, for_rlc=user.rlc):
            queryset = entries
            serializer = serializers.RecordFullDetailSerializer(queryset, many=True)
            records += serializer.data
        else:
            queryset = entries.get_full_access_records(user).distinct()
            serializer = serializers.RecordFullDetailSerializer(queryset, many=True)
            records += serializer.data

            queryset = entries.get_no_access_records(user)
            serializer = serializers.RecordNoDetailSerializer(queryset, many=True)
            records += serializer.data
        return Response(records)

    def create(self, request):
        """outdated"""
        rlc = request.user.rlc
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
        try:
            record = models.Record.objects.get(pk=pk) # changed
        except Exception as e:
            raise CustomError(ERROR__RECORD__DOCUMENT__NOT_FOUND)

        if request.user.rlc != record.from_rlc:
            raise CustomError(ERROR__RECORD__RETRIEVE_RECORD__WRONG_RLC)
        if record.user_has_permission(request.user):
            serializer = serializers.RecordFullDetailSerializer(record)
        else:
            serializer = serializers.RecordNoDetailSerializer(record)
        return Response(serializer.data)


class RecordViewSet(APIView):
    def post(self, request):
        data = request.data
        rlc = request.user.rlc
        if 'client_id' in data:
            try:
                client = models.Client.objects.get(pk=data['client_id'])
            except:
                raise CustomError(ERROR__RECORD__CLIENT__NOT_EXISTING)
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

            EmailSender.send_email_notification([actual_consultant.email], "New Record",
                                                "RLC Intranet Notification - Your were assigned as a consultant for a new record. Look here:" +
                                                url)

        return Response(serializers.RecordFullDetailSerializer(record).data)

    def get(self, request, id):
        try:
            record = models.Record.objects.get(pk=id)
        except:
            raise CustomError(ERROR__RECORD__RECORD__NOT_EXISTING)
        user = request.user
        if user.rlc != record.from_rlc and not user.is_superuser:
            raise CustomError(ERROR__RECORD__RETRIEVE_RECORD__WRONG_RLC)

        if record.user_has_permission(user):
            record_serializer = serializers.RecordFullDetailSerializer(record)
            client_serializer = serializers.ClientSerializer(record.client)
            origin_country = serializers.OriginCountrySerializer(record.client.origin_country)
            documents = serializers.RecordDocumentSerializer(record.record_documents, many=True)
            messages = serializers.RecordMessageSerializer(record.record_messages, many=True)

            return Response({
                'record': record_serializer.data,
                'client': client_serializer.data,
                'origin_country': origin_country.data,
                'record_documents': documents.data,
                'record_messages': messages.data
            })
        else:
            serializer = serializers.RecordNoDetailSerializer(record)
            return Response(serializer.data)

    def patch(self, request, id):
        record = models.Record.objects.get(pk=id)
        user = request.user
        if user.rlc != record.from_rlc and not user.is_superuser:
            raise CustomError(ERROR__RECORD__RETRIEVE_RECORD__WRONG_RLC)

        if record.user_has_permission(user):
            if request.data['record_note']:
                record.note = request.data['record_note']
            record.save()

            for user in record.working_on_record.all():
                if 'URL' in os.environ:
                    url = os.environ['URL'] + "records/" + str(record.id)
                else:
                    url = 'no url, please contact the administrator'

                EmailSender.send_email_notification([user.email], "Patched Record",
                                                    "RLC Intranet Notification - A record of yours was changed. Look here:" +
                                                    url)

            return Response({'success': 'true'})
        raise CustomError(ERROR__API__PERMISSION__INSUFFICIENT)
