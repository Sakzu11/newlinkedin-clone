from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from . import views

urlpatterns = [
    # Auth
    path('register/', views.RegisterView.as_view(), name='register'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('users/', views.UserListView.as_view(), name='user-list'),

    # Profile
    path('profile/', views.ProfileDetailView.as_view(), name='profile'),

    # Posts
    path('posts/', views.PostListCreateView.as_view(), name='post-list'),
    path('posts/archived/', views.ArchivedPostListView.as_view(), name='post-archived'),
    path('posts/user/', views.UserPostListView.as_view(), name='user-posts'),
    path('posts/<int:pk>/', views.PostDetailView.as_view(), name='post-detail'),
    path('posts/<int:pk>/like/', views.like_post, name='post-like'),
    path('posts/<int:pk>/delete/', views.delete_post, name='post-delete'),
    path('posts/<int:pk>/archive/', views.archive_post, name='post-archive'),
    path('posts/<int:pk>/comments/', views.CommentCreateView.as_view(), name='comment-create'),

    # Jobs
    path('jobs/', views.JobListCreateView.as_view(), name='job-list'),
    path('jobs/<int:pk>/', views.JobDetailView.as_view(), name='job-detail'),

    # Events
    path('events/', views.EventListCreateView.as_view(), name='event-list'),
    path('events/<int:pk>/', views.EventDetailView.as_view(), name='event-detail'),

    # Groups
    path('groups/', views.GroupListCreateView.as_view(), name='group-list'),
    path('groups/<int:pk>/join/', views.join_group, name='group-join'),

    # Newsletters
    path('newsletters/', views.NewsletterListCreateView.as_view(), name='newsletter-list'),
    path('newsletters/<int:pk>/', views.NewsletterDetailView.as_view(), name='newsletter-detail'),

    # Google OAuth
    path('auth/google/', views.google_login, name='google-login'),

    # Experience
    path('experiences/', views.ExperienceListCreateView.as_view(), name='experience-list'),
    path('experiences/<int:pk>/', views.ExperienceDetailView.as_view(), name='experience-detail'),

    # Skills
    path('skills/', views.SkillListCreateView.as_view(), name='skill-list'),
    path('skills/<int:pk>/', views.SkillDetailView.as_view(), name='skill-detail'),

    # Projects
    path('projects/', views.ProjectListCreateView.as_view(), name='project-list'),
    path('projects/<int:pk>/', views.ProjectDetailView.as_view(), name='project-detail'),

    # Certificates
    path('certificates/', views.CertificateListCreateView.as_view(), name='certificate-list'),
    path('certificates/<int:pk>/', views.CertificateDetailView.as_view(), name='certificate-detail'),

    # Profile Links
    path('links/', views.ProfileLinkListCreateView.as_view(), name='profilelink-list'),
    path('links/<int:pk>/', views.ProfileLinkDetailView.as_view(), name='profilelink-detail'),

    # Connections
    path('connections/', views.ConnectionRequestListCreateView.as_view(), name='connection-list'),
    path('connections/<int:pk>/', views.ConnectionRequestDetailView.as_view(), name='connection-detail'),
    path('connections/status/<int:user_id>/', views.connection_status, name='connection-status'),
    path('connections/count/', views.connection_count, name='connection-count'),
    path('connections/list/', views.connections_list, name='connections-list'),
]
