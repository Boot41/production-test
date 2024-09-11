from rest_framework import status\nfrom rest_framework.test import APITestCase\nfrom .models import Job\n\nclass JobTests(APITestCase):\n    def setUp(self):\n        self.valid_payload = {\n            'employer_id': 1,\n            'title': 'Software Engineer',\n            'description': 'Develop and maintain software applications.',\n            'location': 'Remote'\n        }\n        self.invalid_payload = {\n            'employer_id': None,\n            'title': '',\n            'description': 'Develop software.',\n            'location': 'Remote'\n        }\n        self.job_id = self.client.post('/api/jobs', self.valid_payload, format='json').data['id']\n\n    def test_create_job(self):\n        response = self.client.post('/api/jobs', self.valid_payload, format='json')\n        self.assertEqual(response.status_code, status.HTTP_201_CREATED)\n        self.assertEqual(Job.objects.count(), 2)\n        self.assertEqual(Job.objects.get(id=response.data['id']).title, 'Software Engineer')\n\n    def test_create_job_invalid(self):\n        response = self.client.post('/api/jobs', self.invalid_payload, format='json')\n        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)\n        self.assertEqual(Job.objects.count(), 1)\n\n    def test_list_jobs(self):\n        response = self.client.get('/api/employers/1/jobs')\n        self.assertEqual(response.status_code, status.HTTP_200_OK)\n        self.assertEqual(len(response.data), 1)\n        self.assertEqual(response.data[0]['title'], 'Software Engineer')\n\n    def test_update_job(self):\n        updated_payload = {\n            'title': 'Senior Software Engineer'\n        }\n        response = self.client.put(f'/api/jobs/{self.job_id}', updated_payload, format='json')\n        self.assertEqual(response.status_code, status.HTTP_200_OK)\n        self.assertEqual(Job.objects.get(id=self.job_id).title, 'Senior Software Engineer')\n\n    def test_update_job_invalid(self):\n        response = self.client.put(f'/api/jobs/{self.job_id}', {'title': ''}, format='json')\n        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)\n\n    def test_delete_job(self):\n        response = self.client.delete(f'/api/jobs/{self.job_id}')\n        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)\n        self.assertEqual(Job.objects.count(), 1)\n\n    def test_delete_job_not_found(self):\n        response = self.client.delete('/api/jobs/9999')\n        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)\n   \n    def test_create_job_missing_field(self):\n        missing_field_payload = {\n            'employer_id': 1,\n            'description': 'A job without a title.',\n            'location': 'Remote'\n        }\n        response = self.client.post('/api/jobs', missing_field_payload, format='json')\n        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)\n        self.assertIn('title', response.data)\n    \n    def test_update_job_not_found(self):\n        response = self.client.put('/api/jobs/9999', {'title': 'Non-existing Job'}, format='json')\n        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)