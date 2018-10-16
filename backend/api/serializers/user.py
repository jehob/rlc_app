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
from rest_framework import serializers
from .. import models
from .rlc import RlcOnlyNameSerializer


class UserProfileSerializer(serializers.ModelSerializer):
    """serializer for user profile objects"""
    records_created = serializers.PrimaryKeyRelatedField(
        many=True, read_only=True)
    working_on_record = serializers.PrimaryKeyRelatedField(
        many=True, read_only=True)
    group_members = serializers.PrimaryKeyRelatedField(
        many=True, read_only=True)
    rlc_members = RlcOnlyNameSerializer(
        many=True, read_only=True)

    user_has_permission = serializers.PrimaryKeyRelatedField(
        many=True, read_only=True
    )
    permission_for_user = serializers.PrimaryKeyRelatedField(
        many=True, read_only=True
    )

    class Meta:
        model = models.UserProfile
        fields = '__all__'
        extra_kwargs = {
            'password': {
                'write_only': True
            }
        }

    # TODO: do we need this anymore?, creating in UserProfileCreatorSerializer
    def create(self, validated_data):
        """create and return a new user"""

        user = models.UserProfile(
            email=validated_data['email'],
            name=validated_data['name']
        )

        user.set_password(validated_data['password'])

        if 'phone_number' in validated_data:
            user.phone_number = validated_data['phone_number']
        if 'street' in validated_data:
            user.street = validated_data['street']
        if 'city' in validated_data:
            user.city = validated_data['city']
        if 'zip_code' in validated_data:
            user.postal_code = validated_data['zip_code']
        # TODO: if name is member of rlc, is_active=True, real name is important (or same email)

        user.save()
        return user


class UserProfileNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.UserProfile
        fields = ('id', 'name',)
        extra_kwargs = {
            'password': {
                'write_only': True
            }
        }


class UserProfileCreatorSerializer(serializers.ModelSerializer):
    """serializer for user profile objects"""
    class Meta:
        model = models.UserProfile
        fields = ('id', 'password', 'email', 'name',
                  'phone_number', 'street', 'city', 'zip_code')
        extra_kwargs = {
            'password': {
                'write_only': True
            }
        }

    def create(self, validated_data):
        """create and return a new user"""
        user = models.UserProfile(
            email=validated_data['email'],
            name=validated_data['name']
        )

        user.set_password(validated_data['password'])
        user.is_active = True
        user.is_superuser = False
        if 'phone_number' in validated_data:
            user.phone_number = validated_data['phone_number']
        if 'street' in validated_data:
            user.street = validated_data['street']
        if 'city' in validated_data:
            user.city = validated_data['city']
        if 'zip_code' in validated_data:
            user.postal_code = validated_data['zip_code']

        user.save()
        rlc = models.Rlc.objects.get(name='München')
        if rlc is not None:
            user.rlc_members.add(rlc)
        group = models.Group.objects.get(name='RLC München member')
        if group is not None:
            user.group_members.add(group)
        user.save()
        return user
