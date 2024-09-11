from rest_framework import status
from rest_framework.test import APITestCase
from .models import Job, JobApplication

class JobTests(APITestCase):
    def setUp(self):
        self.valid_job_payload = {
            'employer_id': 1,
            'title': 'Software Engineer',
            'description': 'Develop and maintain software applications.',
            'location': 'Remote'
        }
        self.job_response = self.client.post('/api/jobs', self.valid_job_payload, format='json')
        self.job_id = self.job_response.data['id']
        self.valid_application_payload = {
            'seeker_id': 1
        }
        self.application_response = self.client.post(f'/api/jobs/{self.job_id}/apply', self.valid_application_payload, format='json')
        self.application_id = self.application_response.data['id']

    def test_create_job(self):
        response = self.client.post('/api/jobs', self.valid_job_payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Job.objects.count(), 2)
        self.assertEqual(Job.objects.get(id=response.data['id']).title, 'Software Engineer')

    def test_apply_for_job(self):
        valid_application_payload = {
            'seeker_id': 1
        }
        response = self.client.post(f'/api/jobs/{self.job_id}/apply', valid_application_payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(JobApplication.objects.count(), 1)

    def test_track_applications(self):
        valid_application_payload = {
            'seeker_id': 1
        }
        self.client.post(f'/api/jobs/{self.job_id}/apply', valid_application_payload, format='json')
        response = self.client.get('/api/job-seekers/1/applications')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_fetch_filtered_jobs(self):
        response = self.client.get('/api/jobs/filter?title=Software')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['title'], 'Software Engineer')

    def test_apply_for_job_invalid(self):
        invalid_payload = {}
        response = self.client.post(f'/api/jobs/{self.job_id}/apply', invalid_payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_list_jobs(self):
        response = self.client.get('/api/employers/1/jobs')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['title'], 'Software Engineer')

    def test_update_job(self):
        updated_payload = {
            'title': 'Senior Software Engineer'
        }
        response = self.client.put(f'/api/jobs/{self.job_id}', updated_payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Job.objects.get(id=self.job_id).title, 'Senior Software Engineer')

    def test_delete_job(self):
        response = self.client.delete(f'/api/jobs/{self.job_id}')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Job.objects.count(), 1)

    def test_delete_job_not_found(self):
        response = self.client.delete('/api/jobs/9999')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_fetch_job_detail(self):
        response = self.client.get(f'/api/jobs/{self.job_id}')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['title'], 'Software Engineer')

    def test_schedule_interview(self):
        payload = {
            'interview_time': '2023-10-15T10:00:00Z'
        }
        response = self.client.post(f'/api/applications/{self.application_id}/schedule-interview', payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(JobApplication.objects.get(id=self.application_id).status, 'interview')
        self.assertEqual(JobApplication.objects.get(id=self.application_id).interview_time, '2023-10-15T10:00:00Z')

    def test_schedule_interview_no_time(self):
        response = self.client.post(f'/api/applications/{self.application_id}/schedule-interview', {}, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['error'], 'Interview time is required.')