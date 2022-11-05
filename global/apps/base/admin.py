from django.contrib import admin
from .models import User

@admin.action(description="Mark as Global Student")
def mark_global_student(modeladmin, request, queryset):
    queryset.update(is_global_student=True)
    queryset.update(is_alumni=False)

@admin.action(description="Mark as Alumni")
def mark_alumni(modeladmin, request, queryset):
    queryset.update(is_global_student=False)
    queryset.update(is_alumni=True)

class UserAdmin(admin.ModelAdmin):
    actions = [mark_global_student, mark_alumni]


admin.site.register(User, UserAdmin)