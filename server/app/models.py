from django.db import models

class Job(models.Model):
    employer_id = models.IntegerField()
    title = models.CharField(max_length=255)
    description = models.TextField()
    location = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

class JobApplication(models.Model):
    job = models.ForeignKey(Job, on_delete=models.CASCADE)
    seeker_id = models.IntegerField()
    status = models.CharField(max_length=50, default='applied')  # Status could be 'applied', 'interview', 'rejected', etc.
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Application for {self.job.title} by seeker {self.seeker_id}'