from django.urls import path, include

from social.views import (FollowListAPIView, GetMyFollowablesUsersAPIView, FollowUnfollowAPIView, FollowersForGivenUserAPIView,
                          FollowingsForGivenUserAPIView, GetPostsByMyFollowingsUsersAPIView, GetPostsForGivenUserAPIView, NewPostForLoggedUserAPIView, PostUpdateDeleteAPIView)

urlpatterns = [
    path('follows', FollowListAPIView.as_view()),
    path('follow-user/<int:pk>', FollowUnfollowAPIView.as_view()),
    path('followables', GetMyFollowablesUsersAPIView.as_view()),
    path('users/<int:pk>/followers', FollowersForGivenUserAPIView.as_view()),
    path('users/<int:pk>/followings',
         FollowingsForGivenUserAPIView.as_view()),

    # path to list posts
    path('posts', GetPostsByMyFollowingsUsersAPIView.as_view()),
    path('posts/new', NewPostForLoggedUserAPIView.as_view()),
    path('posts/<int:pk', PostUpdateDeleteAPIView.as_view()),
    path('users/<int:pk>/posts', GetPostsForGivenUserAPIView.as_view()),
    # Path to comments

]
