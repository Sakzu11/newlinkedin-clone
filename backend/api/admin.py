from django.contrib import admin
from .models import Profile, Post, Comment, Job, Event, Group, Newsletter, Experience, Skill, Project, Certificate, ProfileLink

@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ['user', 'headline']

@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ['author', 'content', 'created_at']

@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ['author', 'post', 'created_at']

@admin.register(Job)
class JobAdmin(admin.ModelAdmin):
    list_display = ['title', 'company', 'location', 'posted_by', 'created_at']

@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ['title', 'date', 'organizer']

@admin.register(Group)
class GroupAdmin(admin.ModelAdmin):
    list_display = ['name', 'created_by', 'created_at']

@admin.register(Newsletter)
class NewsletterAdmin(admin.ModelAdmin):
    list_display = ['title', 'author', 'created_at']

@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    list_display = ['user', 'title', 'company', 'start_date', 'end_date']

@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ['user', 'name', 'endorsements']

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ['user', 'title', 'url', 'created_at']

@admin.register(Certificate)
class CertificateAdmin(admin.ModelAdmin):
    list_display = ['user', 'title', 'issuer', 'issue_date']

@admin.register(ProfileLink)
class ProfileLinkAdmin(admin.ModelAdmin):
    list_display = ['user', 'label', 'url']
