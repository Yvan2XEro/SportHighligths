from django.urls import path

from .views import ChangeProfilePictureAPIView, ListUsers, LoginApiView, RegisterView


urlpatterns = [
    path('users', ListUsers.as_view()),
    path('auth/register', RegisterView.as_view()),
    path('auth/login', LoginApiView.as_view()),
    path('auth/set-avatar', ChangeProfilePictureAPIView.as_view())
]
