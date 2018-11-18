PERMISSION_CAN_CONSULT = "can_consult"
PERMISSION_CAN_ADD_ORIGIN_COUNTRY = 'can_add_origin_country'
PERMISSION_CAN_VIEW_RECORDS = 'can_view_records'
PERMISSION_VIEW_RECORDS_FULL_DETAIL = 'view_records_full_detail'


def get_all_permissions():
    return [
        PERMISSION_CAN_CONSULT,
        PERMISSION_CAN_ADD_ORIGIN_COUNTRY,
        PERMISSION_CAN_VIEW_RECORDS,
        PERMISSION_VIEW_RECORDS_FULL_DETAIL
    ]
