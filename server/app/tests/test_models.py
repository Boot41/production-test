from django.test import TestCase
from .models import Job, JobApplication

class JobModelTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        Job.objects.create(employer_id=1, title='Software Engineer', description='Develop software.', location='Remote')

    def test_job_content(self):
        job = Job.objects.get(id=1)
        expected_object_name = f'{job.title}'
        self.assertEqual(expected_object_name, 'Software Engineer')
        self.assertEqual(job.description, 'Develop software.')
        self.assertEqual(job.location, 'Remote')
        self.assertEqual(job.employer_id, 1)

    def test_job_string_representation(self):
        job = Job.objects.get(id=1)
        self.assertEqual(str(job), 'Software Engineer')

class JobApplicationModelTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        job = Job.objects.create(employer_id=1, title='Software Engineer', description='Develop software.', location='Remote')
        JobApplication.objects.create(job=job, seeker_id=1)

    def test_application_content(self):
        application = JobApplication.objects.get(id=1)
        self.assertEqual(application.seeker_id, 1)
        self.assertEqual(application.job.title, 'Software Engineer')
        self.assertEqual(application.status, 'applied')
        self.assertIsNone(application.interview_time)  # Check default value of interview_time

    def test_application_string_representation(self):
        application = JobApplication.objects.get(id=1)
        self.assertEqual(str(application), 'Application for Software Engineer by seeker 1')