from django.core.mail import send_mail


class EmailSender:
    @staticmethod
    def send_email_notification(email_addresses, subject, text):
        send_mail(subject, text, 'notification@rlcm.de', email_addresses, fail_silently=False)


