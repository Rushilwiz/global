from django.contrib.auth.views import LogoutView
from django.urls import path

from . import views

app_name = "base"

urlpatterns = [
    path("", views.index, name="index"),
    path("login/", views.login, name="login"),
    path("logout/", LogoutView.as_view(), name="logout"),
    path("members/", views.members, name="members"),
    path("research/", views.research, name="research"),
    path("research/add/", views.add_link, name="add-link"),
    path("about/", views.about, name="about")
]  