from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    id = models.AutoField(primary_key=True)

    graduation_year = models.IntegerField(blank=True, null=True)
    college = models.CharField(max_length=100, blank=True, null=True)

    is_alumni = models.BooleanField(default=False)
    is_global_student = models.BooleanField(default=False)

    class Meta:
        ordering = ("last_name", "first_name")


    def get_social_auth(self):
        return self.social_auth.get(provider="ion")

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

class Link(models.Model):
    SOURCE_CHOICES = (
        ('Website', 'Website'),
        ('Book', 'Book'),
        ('Article', 'Journal Article'),
        ('Video', 'Video'),
        ('Podcast', 'Podcast'),
        ('Other', 'Other')
    )

    id = models.AutoField(primary_key=True)

    title = models.CharField(max_length=100)
    source = models.CharField(max_length=20, choices=SOURCE_CHOICES, default='website')
    description = models.TextField(max_length=5000)
    link = models.CharField(max_length=200)
    author = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.title}"
