from django.test import TestCase
from .models import Job, JobApplication, JobSeekerProfile

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

class JobSeekerProfileModelTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        JobSeekerProfile.objects.create(work_history='Worked at ABC Corp.', skills='Python', education='BSc in Computer Science')

    def test_profile_content(self):
        profile = JobSeekerProfile.objects.get(seeker_id=1)
        self.assertEqual(profile.work_history, 'Worked at ABC Corp.')
        self.assertEqual(profile.skills, 'Python')
        self.assertEqual(profile.education, 'BSc in Computer Science')

    def test_profile_string_representation(self):
        profile = JobSeekerProfile.objects.get(seeker_id=1)
        self.assertEqual(str(profile), 'Profile for seeker 1')
