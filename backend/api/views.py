from rest_framework import generics, permissions, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User
from .models import Profile, Post, Comment, Job, Event, Group, Newsletter, Experience, Skill, Project, Certificate, ProfileLink
from .serializers import (
    RegisterSerializer, ProfileSerializer, PostSerializer,
    CommentSerializer, JobSerializer, EventSerializer,
    GroupSerializer, NewsletterSerializer, UserSerializer,
    ExperienceSerializer, SkillSerializer, ProjectSerializer,
    CertificateSerializer, ProfileLinkSerializer
)


# Auth
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]


# Users list (for MyNetwork)
class UserListView(generics.ListAPIView):
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return User.objects.exclude(id=self.request.user.id)


# Profile
class ProfileDetailView(generics.RetrieveUpdateAPIView):
    serializer_class = ProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user.profile

    def get_serializer_context(self):
        return {'request': self.request}


# Posts (Feed)
class PostListCreateView(generics.ListCreateAPIView):
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        return Post.objects.filter(is_archived=False)

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

    def get_serializer_context(self):
        return {'request': self.request}


class PostDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_serializer_context(self):
        return {'request': self.request}


class ArchivedPostListView(generics.ListAPIView):
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Post.objects.filter(is_archived=True, author=self.request.user)

    def get_serializer_context(self):
        return {'request': self.request}


class UserPostListView(generics.ListAPIView):
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Post.objects.filter(author=self.request.user, is_archived=False)

    def get_serializer_context(self):
        return {'request': self.request}


@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def like_post(request, pk):
    try:
        post = Post.objects.get(pk=pk)
    except Post.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.user in post.likes.all():
        post.likes.remove(request.user)
        liked = False
    else:
        post.likes.add(request.user)
        liked = True

    return Response({'liked': liked, 'likes_count': post.likes.count()})


@api_view(['DELETE'])
@permission_classes([permissions.IsAuthenticated])
def delete_post(request, pk):
    try:
        post = Post.objects.get(pk=pk, author=request.user)
    except Post.DoesNotExist:
        return Response({'error': 'Not found or not your post'}, status=status.HTTP_404_NOT_FOUND)
    post.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def archive_post(request, pk):
    try:
        post = Post.objects.get(pk=pk, author=request.user)
    except Post.DoesNotExist:
        return Response({'error': 'Not found or not your post'}, status=status.HTTP_404_NOT_FOUND)
    post.is_archived = not post.is_archived
    post.save()
    return Response({'is_archived': post.is_archived})


# Comments
class CommentCreateView(generics.CreateAPIView):
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        post = Post.objects.get(pk=self.kwargs['pk'])
        serializer.save(author=self.request.user, post=post)


# Jobs
class JobListCreateView(generics.ListCreateAPIView):
    serializer_class = JobSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        qs = Job.objects.all()
        search = self.request.query_params.get('search', '')
        location = self.request.query_params.get('location', '')
        if search:
            qs = qs.filter(title__icontains=search) | qs.filter(company__icontains=search)
        if location:
            qs = qs.filter(location__icontains=location)
        return qs

    def perform_create(self, serializer):
        serializer.save(posted_by=self.request.user)


class JobDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Job.objects.all()
    serializer_class = JobSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


# Events
class EventListCreateView(generics.ListCreateAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(organizer=self.request.user)


class EventDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


# Groups
class GroupListCreateView(generics.ListCreateAPIView):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        group = serializer.save(created_by=self.request.user)
        group.members.add(self.request.user)


@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def join_group(request, pk):
    try:
        group = Group.objects.get(pk=pk)
    except Group.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.user in group.members.all():
        group.members.remove(request.user)
        joined = False
    else:
        group.members.add(request.user)
        joined = True

    return Response({'joined': joined, 'members_count': group.members.count()})


# Newsletters
class NewsletterListCreateView(generics.ListCreateAPIView):
    queryset = Newsletter.objects.all()
    serializer_class = NewsletterSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class NewsletterDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Newsletter.objects.all()
    serializer_class = NewsletterSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


# Google OAuth
@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def google_login(request):
    credential = request.data.get('token')
    if not credential:
        return Response({'error': 'Token required'}, status=status.HTTP_400_BAD_REQUEST)
    try:
        import requests as req_lib
        from django.conf import settings as django_settings

        # Verify the ID token with Google
        verify_resp = req_lib.get(
            f'https://oauth2.googleapis.com/tokeninfo?id_token={credential}'
        )
        if verify_resp.status_code != 200:
            return Response({'error': 'Invalid Google token'}, status=status.HTTP_400_BAD_REQUEST)

        idinfo = verify_resp.json()

        # Check audience matches our client ID
        client_id = getattr(django_settings, 'GOOGLE_CLIENT_ID', '')
        if client_id and idinfo.get('aud') != client_id:
            return Response({'error': 'Token audience mismatch'}, status=status.HTTP_400_BAD_REQUEST)

        email = idinfo.get('email')
        first_name = idinfo.get('given_name', '')
        last_name = idinfo.get('family_name', '')
        # make username unique from email prefix
        base_username = email.split('@')[0]
        username = base_username
        counter = 1
        while User.objects.filter(username=username).exclude(email=email).exists():
            username = f"{base_username}{counter}"
            counter += 1

        user, created = User.objects.get_or_create(
            email=email,
            defaults={'username': username, 'first_name': first_name, 'last_name': last_name}
        )
        if created:
            user.set_unusable_password()
            user.save()
            Profile.objects.get_or_create(user=user)

        refresh = RefreshToken.for_user(user)
        return Response({
            'access': str(refresh.access_token),
            'refresh': str(refresh),
            'username': user.username,
            'email': user.email,
        })
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


# Experience
class ExperienceListCreateView(generics.ListCreateAPIView):
    serializer_class = ExperienceSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Experience.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class ExperienceDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ExperienceSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Experience.objects.filter(user=self.request.user)


# Skill
class SkillListCreateView(generics.ListCreateAPIView):
    serializer_class = SkillSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Skill.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class SkillDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = SkillSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Skill.objects.filter(user=self.request.user)


# Project
class ProjectListCreateView(generics.ListCreateAPIView):
    serializer_class = ProjectSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Project.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class ProjectDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ProjectSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Project.objects.filter(user=self.request.user)


# Certificate
class CertificateListCreateView(generics.ListCreateAPIView):
    serializer_class = CertificateSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Certificate.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class CertificateDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = CertificateSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Certificate.objects.filter(user=self.request.user)


# ProfileLink
class ProfileLinkListCreateView(generics.ListCreateAPIView):
    serializer_class = ProfileLinkSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return ProfileLink.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class ProfileLinkDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ProfileLinkSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return ProfileLink.objects.filter(user=self.request.user)
