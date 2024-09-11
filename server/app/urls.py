from django.urls import path
from .views import create_job, list_jobs, fetch_filtered_jobs, fetch_job_detail, update_job, delete_job, apply_for_job, track_applications, schedule_interview

urlpatterns = [
    path('api/jobs', create_job, name='create_job'),
    path('api/employers/<int:employer_id>/jobs', list_jobs, name='list_jobs'),
    path('api/jobs/filter', fetch_filtered_jobs, name='fetch_filtered_jobs'),
    path('api/jobs/<int:job_id>', fetch_job_detail, name='fetch_job_detail'),
    path('api/jobs/<int:job_id>', update_job, name='update_job'),
    path('api/jobs/<int:job_id>', delete_job, name='delete_job'),
    path('api/jobs/<int:job_id>/apply', apply_for_job, name='apply_for_job'),
    path('api/job-seekers/<int:seeker_id>/applications', track_applications, name='track_applications'),
    path('api/applications/<int:application_id>/schedule-interview', schedule_interview, name='schedule_interview'),
]