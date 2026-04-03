from rest_framework import generics, permissions, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.parsers import MultiPartParser, FormParser
from django.contrib.auth.models import User
from django.db import models as db_models
from .models import Profile, Post, Comment, Job, Event, Group, Newsletter, Experience, Skill, Project, Certificate, ProfileLink, ConnectionRequest
from .serializers import (
    RegisterSerializer, ProfileSerializer, PostSerializer,
    CommentSerializer, JobSerializer, EventSerializer,
    GroupSerializer, NewsletterSerializer, UserSerializer,
    ExperienceSerializer, SkillSerializer, ProjectSerializer,
    CertificateSerializer, ProfileLinkSerializer,
    ConnectionRequestSerializer, ConnectionStatusSerializer
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
# class PostListCreateView(generics.ListCreateAPIView):
#     serializer_class = PostSerializer
#     permission_classes = [permissions.IsAuthenticatedOrReadOnly]

#     def get_queryset(self):
#         return Post.objects.filter(is_archived=False)

#     def perform_create(self, serializer):
#         serializer.save(author=self.request.user)

#     def get_serializer_context(self):
#         return {'request': self.request}

#     def create(self, request, *args, **kwargs):
#         serializer = self.get_serializer(data=request.data)
#         serializer.is_valid(raise_exception=True)
#         self.perform_create(serializer)
#         # Re-fetch the post to get correct media URLs
#         from .models import Post as PostModel
#         post = PostModel.objects.get(pk=serializer.instance.pk)
#         out = self.get_serializer(post)
class PostListCreateView(generics.ListCreateAPIView):
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    parser_classes = [MultiPartParser, FormParser]   # 🔥 ADD THIS LINE

    def get_queryset(self):
        return Post.objects.filter(is_archived=False)

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

    def get_serializer_context(self):
        return {'request': self.request}

    def create(self, request, *args, **kwargs):
        print(request.FILES)  # 👈 DEBUG (optional)

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)

        from .models import Post as PostModel
        post = PostModel.objects.get(pk=serializer.instance.pk)
        out = self.get_serializer(post)

        return Response(out.data, status=status.HTTP_201_CREATED)


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


# Connections
class ConnectionRequestListCreateView(generics.ListCreateAPIView):
    serializer_class = ConnectionRequestSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return ConnectionRequest.objects.filter(
            db_models.Q(requester=user) | db_models.Q(recipient=user)
        )

    def create(self, request, *args, **kwargs):
        recipient_id = request.data.get('recipient_id')
        if not recipient_id:
            return Response({'error': 'recipient_id is required.'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            recipient = User.objects.get(pk=recipient_id)
        except User.DoesNotExist:
            return Response({'error': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)

        if recipient == request.user:
            return Response({'error': 'You cannot connect with yourself.'}, status=status.HTTP_400_BAD_REQUEST)

        # Check both directions
        exists = ConnectionRequest.objects.filter(
            db_models.Q(requester=request.user, recipient=recipient) |
            db_models.Q(requester=recipient, recipient=request.user)
        ).exists()
        if exists:
            return Response({'error': 'A connection request already exists between these users.'}, status=status.HTTP_400_BAD_REQUEST)

        conn = ConnectionRequest.objects.create(requester=request.user, recipient=recipient)
        serializer = self.get_serializer(conn)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class ConnectionRequestDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ConnectionRequestSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return ConnectionRequest.objects.filter(
            db_models.Q(requester=user) | db_models.Q(recipient=user)
        )

    def partial_update(self, request, *args, **kwargs):
        conn = self.get_object()
        new_status = request.data.get('status')
        if conn.recipient != request.user:
            return Response({'error': 'You are not the recipient of this request.'}, status=status.HTTP_403_FORBIDDEN)
        if new_status not in ['accepted', 'declined']:
            return Response({'error': 'Invalid status.'}, status=status.HTTP_400_BAD_REQUEST)
        conn.status = new_status
        conn.save()
        return Response(self.get_serializer(conn).data)

    def destroy(self, request, *args, **kwargs):
        conn = self.get_object()
        if conn.status == 'pending':
            if conn.requester != request.user:
                return Response({'error': 'You are not the requester of this request.'}, status=status.HTTP_403_FORBIDDEN)
        else:
            if conn.requester != request.user and conn.recipient != request.user:
                return Response({'error': 'You are not part of this connection.'}, status=status.HTTP_403_FORBIDDEN)
        conn.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def connection_status(request, user_id):
    try:
        other = User.objects.get(pk=user_id)
    except User.DoesNotExist:
        return Response({'error': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)

    conn = ConnectionRequest.objects.filter(
        db_models.Q(requester=request.user, recipient=other) |
        db_models.Q(requester=other, recipient=request.user)
    ).first()

    if not conn:
        return Response({'status': 'none', 'connection_id': None})
    if conn.status == 'accepted':
        return Response({'status': 'connected', 'connection_id': conn.id})
    if conn.status == 'pending':
        if conn.requester == request.user:
            return Response({'status': 'pending_sent', 'connection_id': conn.id})
        else:
            return Response({'status': 'pending_received', 'connection_id': conn.id})
    return Response({'status': 'none', 'connection_id': None})


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def connection_count(request):
    count = ConnectionRequest.objects.filter(
        db_models.Q(requester=request.user) | db_models.Q(recipient=request.user),
        status='accepted'
    ).count()
    return Response({'count': count})


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def connections_list(request):
    accepted = ConnectionRequest.objects.filter(
        db_models.Q(requester=request.user) | db_models.Q(recipient=request.user),
        status='accepted'
    )
    users = []
    for conn in accepted:
        other = conn.recipient if conn.requester == request.user else conn.requester
        avatar_url = None
        if hasattr(other, 'profile') and other.profile.avatar:
            avatar_url = other.profile.avatar.url
        users.append({
            'id': other.id,
            'username': other.username,
            'first_name': other.first_name,
            'last_name': other.last_name,
            'avatar': avatar_url,
        })
    return Response(users)
