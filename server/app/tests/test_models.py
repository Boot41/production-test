from django.test import TestCase
from .models import Job

class JobModelTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        Job.objects.create(employer_id=1, title='Software Engineer', description='Develop software.', location='Remote')

    def test_job_content(self):
        job = Job.objects.get(id=1)
        expected_object_name = f'{job.title}'
        self.assertEqual(expected_object_name, 'Software Engineer')
