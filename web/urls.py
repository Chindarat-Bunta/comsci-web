from django.urls import path
from . import views


urlpatterns = [
    path("", views.index, name="index"),
    path("curriculum", views.curriculum, name="curriculum"),
    path("faculty", views.faculty, name="faculty"),
    path("contact", views.contact, name="contact"),
]
