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

PERMISSION_CAN_CONSULT = 'can_consult'
PERMISSION_ADD_ORIGIN_COUNTRY_RLC = 'add_origin_country_rlc'
PERMISSION_VIEW_RECORDS_RLC = 'view_records_rlc'
PERMISSION_VIEW_RECORDS_FULL_DETAIL_RLC = 'view_records_full_detail_rlc'
PERMISSION_PERMIT_RECORD_PERMISSION_REQUESTS_RLC = 'permit_record_permission_requests_rlc'
PERMISSION_VIEW_FULL_USER_DETAIL_RLC = 'view_full_user_detail_own_rlc'
PERMISSION_VIEW_FULL_USER_DETAIL_OVERALL = 'view_full_user_detail_overall'
PERMISSION_SET_PERMISSIONS_RLC = 'set_permissions_rlc'
PERMISSION_MANAGE_GROUPS_RLC = 'manage_groups_rlc'


def get_all_permissions():
    return [
        PERMISSION_CAN_CONSULT,
        PERMISSION_ADD_ORIGIN_COUNTRY_RLC,
        PERMISSION_VIEW_RECORDS_RLC,
        PERMISSION_VIEW_RECORDS_FULL_DETAIL_RLC,
        PERMISSION_PERMIT_RECORD_PERMISSION_REQUESTS_RLC,
        PERMISSION_VIEW_FULL_USER_DETAIL_RLC,
        PERMISSION_VIEW_FULL_USER_DETAIL_OVERALL,
        PERMISSION_SET_PERMISSIONS_RLC,
        PERMISSION_MANAGE_GROUPS_RLC
    ]
