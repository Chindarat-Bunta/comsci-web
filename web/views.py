from django.shortcuts import render
from .models import Track, Course


# Create your views here.


def curriculum(request):
    return render(request, "curriculum.html")


def faculty(request):
    return render(request, "faculty.html")


def contact(request):
    return render(request, "contact.html")
