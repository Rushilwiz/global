from django.shortcuts import render

from .models import User, Link
from .forms import LinkForm

# Create your views here.
def under_construction(request):
    return render(request, "base/under_construction.html")

def index(request):
    return render(request, "base/index.html")

def login(request):
    return render(request, "base/login.html")

def members(request):
    context = {
        "alumni": [(u, None) for u in User.objects.filter(is_alumni=True).order_by("graduation_year", "last_name", "first_name")],
        "students": [(u, None) for u in User.objects.filter(is_global_student=True).order_by("last_name", "first_name")],
    }
    return render(request, "base/members.html", context=context)


def research(request):
    context = {
        "links": Link.objects.all()
    }
    return render(request, "base/research.html", context=context)

def add_link(request):
    form = LinkForm(request.POST or None)

    if form.is_valid():
        form.save()

    context = {
        "form": form
    }

    return render(request, "base/add_link.html", context=context)

def about(request):
    return render(request, "base/about.html")