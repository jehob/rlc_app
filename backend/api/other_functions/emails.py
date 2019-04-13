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

from django.core.mail import EmailMultiAlternatives


class EmailSender:
    @staticmethod
    def send_email_notification(email_addresses, subject: str, text: str):
        """
        Sends emails to all email_addresses with subject and text
        :param email_addresses: array with email adresses
        :param subject: subject of the email
        :param text: the email content itself
        :return:
        """
        from_email = 'do-not-reply@rlc-app.de'
        msg = EmailMultiAlternatives(subject, text, from_email, email_addresses)
        msg.send()
        # send_mail(subject, text, 'notification@rlcm.de', email_addresses, fail_silently=False)

    @staticmethod
    def send_html_email(email_addresses, subject: str, html_content: str, text_alternative: str):
        from_email = 'do-not-reply@rlc-app.de'
        msg = EmailMultiAlternatives(subject, text_alternative, from_email, email_addresses)
        msg.attach_alternative(html_content, "text/html")
        msg.send()
