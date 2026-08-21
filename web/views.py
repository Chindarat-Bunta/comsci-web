from django.shortcuts import render, redirect
# from .models import Track, Course

# Create your views here.

def index(request):
    import datetime

    context = {
        "title": "Computer Science",
    }

    context["date"] = datetime.date.today()
    return render(request, "index.html", context)

def about(request):
    return redirect("/#about")

def curriculum(request):
    return redirect("/#curriculum")


def faculty(request):
    return redirect("/#faculty")


def contact(request):
    return redirect("/#contact")

