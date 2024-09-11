from rest_framework import status
from rest_framework.test import APITestCase
from .models import Job

class JobTests(APITestCase):
    def setUp(self):
        self.valid_payload = {
            'employer_id': 1,
            'title': 'Software Engineer',
            'description': 'Develop and maintain software applications.',
            'location': 'Remote'
        }
        self.invalid_payload = {
            'employer_id': None,
            'title': '',
            'description': 'Develop software.',
            'location': 'Remote'
        }

    def test_create_job(self):
        response = self.client.post('/api/jobs', self.valid_payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Job.objects.count(), 1)
        self.assertEqual(Job.objects.get().title, 'Software Engineer')

    def test_create_job_invalid(self):
        response = self.client.post('/api/jobs', self.invalid_payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(Job.objects.count(), 0)

    def test_list_jobs(self):
        Job.objects.create(**self.valid_payload)
        response = self.client.get('/api/employers/1/jobs')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['title'], 'Software Engineer')
