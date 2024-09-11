from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Job
from .serializers import JobSerializer

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