from django.core.validators import RegexValidator


phone_regex = RegexValidator(regex=r'^\+{0,2}\d{9,15}$',
                             message="Phone number must be entered "
                                     "in the format: Up to 15 digits allowed.")
