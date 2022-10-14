from django.shortcuts import render

# Create your views here.
def under_construction(request):
    return render(request, "base/under_construction.html")
