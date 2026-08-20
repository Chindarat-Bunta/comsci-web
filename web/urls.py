from django.urls import path
from . import views


urlpatterns = [

    path("", views.index, name="home"),
    path("about", views.about, name="about"),
    path("curriculum", views.curriculum, name="curriculum"),
    path("faculty", views.faculty, name="faculty"),
    path("contact", views.contact, name="contact"),
]
