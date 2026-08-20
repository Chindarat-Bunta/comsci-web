from django.shortcuts import render, redirect

# Create your views here.

def index(request):
    import datetime

    context = {
        "title": "My Home Page",
    }

    context["date"] = datetime.date.today()
    return render(request, "index.html", context)

def about(request):
    return redirect("/#about")

def contact(request):
    return redirect("/#contact")
