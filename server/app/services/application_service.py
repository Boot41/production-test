from .models import JobApplication

class ApplicationService:
    @staticmethod
    def update_application(application_id, data):
        application = JobApplication.objects.get(id=application_id)
        for key, value in data.items():
            setattr(application, key, value)
        application.save()
        return application

    @staticmethod
    def withdraw_application(application_id):
        application = JobApplication.objects.get(id=application_id)
        application.delete()
        return True
