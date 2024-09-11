from django.urls import path
from .views import create_job, list_jobs

urlpatterns = [
    path('api/jobs', create_job, name='create_job'),
    path('api/employers/<int:employer_id>/jobs', list_jobs, name='list_jobs'),
]
