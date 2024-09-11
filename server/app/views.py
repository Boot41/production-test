from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Job, JobApplication, JobSeekerProfile
from .serializers import JobSerializer, JobApplicationSerializer, JobSeekerProfileSerializer

@api_view(['POST'])
def create_job(request):
    serializer = JobSerializer(data=request.data)
    if serializer.is_valid():
        job = serializer.save()
        return Response(JobSerializer(job).data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def list_jobs(request, employer_id):
    jobs = Job.objects.filter(employer_id=employer_id)
    serializer = JobSerializer(jobs, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
def fetch_filtered_jobs(request):
    title = request.GET.get('title', None)
    location = request.GET.get('location', None)
    job_type = request.GET.get('type', None)
    posted_date = request.GET.get('posted_date', None)

    filters = {}
    if title:
        filters['title__icontains'] = title
    if location:
        filters['location__icontains'] = location
    if job_type:
        filters['job_type'] = job_type
    if posted_date:
        filters['created_at__date'] = posted_date

    jobs = Job.objects.filter(**filters)
    serializer = JobSerializer(jobs, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
def fetch_job_detail(request, job_id):
    job = get_object_or_404(Job, id=job_id)
    serializer = JobSerializer(job)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['PUT'])
def update_job(request, job_id):
    job = get_object_or_404(Job, id=job_id)
    serializer = JobSerializer(job, data=request.data, partial=True)
    if serializer.is_valid():
        job = serializer.save()
        return Response(JobSerializer(job).data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def delete_job(request, job_id):
    job = get_object_or_404(Job, id=job_id)
    job.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['POST'])
def apply_for_job(request, job_id):
    serializer = JobApplicationSerializer(data=request.data)
    if serializer.is_valid():
        job_application = serializer.save(job_id=job_id, seeker_id=request.data.get('seeker_id'))
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def track_applications(request, seeker_id):
    applications = JobApplication.objects.filter(seeker_id=seeker_id)
    serializer = JobApplicationSerializer(applications, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['POST'])
def schedule_interview(request, application_id):
    job_application = get_object_or_404(JobApplication, id=application_id)
    interview_time = request.data.get('interview_time')
    if not interview_time:
        return Response({'error': 'Interview time is required.'}, status=status.HTTP_400_BAD_REQUEST)
    job_application.interview_time = interview_time  # Save interview time
    job_application.status = 'interview'
    job_application.save()
    return Response({'message': 'Interview scheduled successfully.'}, status=status.HTTP_200_OK)

@api_view(['POST'])
def create_job_seeker_profile(request):
    serializer = JobSeekerProfileSerializer(data=request.data)
    if serializer.is_valid():
        profile = serializer.save()
        return Response(JobSeekerProfileSerializer(profile).data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def fetch_job_seeker_profile(request, seeker_id):
    profile = get_object_or_404(JobSeekerProfile, seeker_id=seeker_id)
    serializer = JobSeekerProfileSerializer(profile)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['PUT'])
def update_job_seeker_profile(request, seeker_id):
    profile = get_object_or_404(JobSeekerProfile, seeker_id=seeker_id)
    serializer = JobSeekerProfileSerializer(profile, data=request.data, partial=True)
    if serializer.is_valid():
        profile = serializer.save()
        return Response(JobSeekerProfileSerializer(profile).data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
