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

PERMISSION_CAN_CONSULT = "can_consult"
PERMISSION_CAN_ADD_ORIGIN_COUNTRY = 'can_add_origin_country'
PERMISSION_CAN_VIEW_RECORDS = 'can_view_records'
PERMISSION_VIEW_RECORDS_FULL_DETAIL = 'view_records_full_detail'
PERMISSION_CAN_PERMIT_RECORD_PERMISSION_REQUESTS = 'can_permit_record_permission_requests'
PERMISSION_CAN_VIEW_FULL_USER_DETAIL_OWN_RLC = 'can_view_full_user_detail_own_rlc'
PERMISSION_CAN_VIEW_FULL_USER_DETAIL_OVERALL = 'can_view_full_user_detail_overall'


def get_all_permissions():
    return [
        PERMISSION_CAN_CONSULT,
        PERMISSION_CAN_ADD_ORIGIN_COUNTRY,
        PERMISSION_CAN_VIEW_RECORDS,
        PERMISSION_VIEW_RECORDS_FULL_DETAIL,
        PERMISSION_CAN_PERMIT_RECORD_PERMISSION_REQUESTS,
        PERMISSION_CAN_VIEW_FULL_USER_DETAIL_OWN_RLC,
        PERMISSION_CAN_VIEW_FULL_USER_DETAIL_OVERALL
    ]
