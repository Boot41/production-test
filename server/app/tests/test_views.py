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
        self.job_id = self.client.post('/api/jobs', self.valid_payload, format='json').data['id']

    def test_create_job(self):
        response = self.client.post('/api/jobs', self.valid_payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Job.objects.count(), 2)
        self.assertEqual(Job.objects.get(id=response.data['id']).title, 'Software Engineer')

    def test_create_job_invalid(self):
        response = self.client.post('/api/jobs', self.invalid_payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(Job.objects.count(), 1)

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

    def test_update_job_invalid(self):
        response = self.client.put(f'/api/jobs/{self.job_id}', {'title': ''}, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_delete_job(self):
        response = self.client.delete(f'/api/jobs/{self.job_id}')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Job.objects.count(), 1)

    def test_delete_job_not_found(self):
        response = self.client.delete('/api/jobs/9999')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_create_job_missing_field(self):
        missing_field_payload = {
            'employer_id': 1,
            'description': 'A job without a title.',
            'location': 'Remote'
        }
        response = self.client.post('/api/jobs', missing_field_payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('title', response.data)

    def test_update_job_not_found(self):
        response = self.client.put('/api/jobs/9999', {'title': 'Non-existing Job'}, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)