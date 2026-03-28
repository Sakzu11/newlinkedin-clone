from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Profile, Post, Comment, Job, Event, Group, Newsletter, Experience, Skill, Project, Certificate, ProfileLink


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=6)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'password']

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        Profile.objects.create(user=user)
        return user


class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    avatar = serializers.SerializerMethodField()
    cover_image = serializers.SerializerMethodField()

    class Meta:
        model = Profile
        fields = ['id', 'user', 'headline', 'avatar', 'cover_image', 'bio']

    def get_avatar(self, obj):
        request = self.context.get('request')
        if obj.avatar and request:
            return request.build_absolute_uri(obj.avatar.url)
        return None

    def get_cover_image(self, obj):
        request = self.context.get('request')
        if obj.cover_image and request:
            return request.build_absolute_uri(obj.cover_image.url)
        return None


class CommentSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)

    class Meta:
        model = Comment
        fields = ['id', 'author', 'content', 'created_at']


class PostSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)
    comments = CommentSerializer(many=True, read_only=True)
    likes_count = serializers.SerializerMethodField()
    liked_by_me = serializers.SerializerMethodField()
    image = serializers.SerializerMethodField()
    video = serializers.SerializerMethodField()
    document = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = ['id', 'author', 'content', 'image', 'video', 'document', 'is_archived', 'created_at', 'likes_count', 'liked_by_me', 'comments']

    def get_likes_count(self, obj):
        return obj.likes.count()

    def get_liked_by_me(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return obj.likes.filter(id=request.user.id).exists()
        return False

    def get_image(self, obj):
        request = self.context.get('request')
        if obj.image and request:
            return request.build_absolute_uri(obj.image.url)
        return None

    def get_video(self, obj):
        request = self.context.get('request')
        if obj.video and request:
            return request.build_absolute_uri(obj.video.url)
        return None

    def get_document(self, obj):
        request = self.context.get('request')
        if obj.document and request:
            return request.build_absolute_uri(obj.document.url)
        return None


class JobSerializer(serializers.ModelSerializer):
    posted_by = UserSerializer(read_only=True)

    class Meta:
        model = Job
        fields = ['id', 'title', 'company', 'location', 'description', 'posted_by', 'created_at']


class EventSerializer(serializers.ModelSerializer):
    organizer = UserSerializer(read_only=True)

    class Meta:
        model = Event
        fields = ['id', 'title', 'description', 'date', 'location', 'organizer', 'created_at']


class GroupSerializer(serializers.ModelSerializer):
    created_by = UserSerializer(read_only=True)
    members_count = serializers.SerializerMethodField()

    class Meta:
        model = Group
        fields = ['id', 'name', 'description', 'image', 'created_by', 'members_count', 'created_at']

    def get_members_count(self, obj):
        return obj.members.count()


class NewsletterSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)

    class Meta:
        model = Newsletter
        fields = ['id', 'title', 'content', 'author', 'created_at']


class ExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experience
        fields = ['id', 'title', 'company', 'location', 'start_date', 'end_date', 'currently_working', 'description', 'created_at']


class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = ['id', 'name', 'endorsements']


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ['id', 'title', 'description', 'url', 'start_date', 'end_date', 'created_at']


class CertificateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Certificate
        fields = ['id', 'title', 'issuer', 'issue_date', 'credential_url', 'created_at']


class ProfileLinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProfileLink
        fields = ['id', 'label', 'url']
