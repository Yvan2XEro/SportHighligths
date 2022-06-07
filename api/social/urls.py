from django.urls import path, include

from social.views import (CommentUpdateDeleteAPIView, FollowListAPIView, GetMyFollowablesUsersAPIView, FollowUnfollowAPIView, FollowersForGivenUserAPIView,
                          FollowingsForGivenUserAPIView, GetPostsByMyFollowingsUsersAPIView, GetPostsForGivenUserAPIView, LikePostAPIView, NewCommentForPostAPIView, NewPostForLoggedUserAPIView, PostCommentsAPIView, PostLikesAPIView, PostUpdateDeleteAPIView, RetrieveUserAPIView, UnlikeAPIView)

urlpatterns = [
    path('follows', FollowListAPIView.as_view()),
    path('follow-user/<int:pk>', FollowUnfollowAPIView.as_view()),
    path('followables', GetMyFollowablesUsersAPIView.as_view()),
    path('users/<int:pk>/followers', FollowersForGivenUserAPIView.as_view()),
    path('users/<int:pk>/followings',
         FollowingsForGivenUserAPIView.as_view()),
    path('users/<int:pk>', RetrieveUserAPIView.as_view()),

    # path to list posts
    path('posts', GetPostsByMyFollowingsUsersAPIView.as_view()),
    path('posts/new', NewPostForLoggedUserAPIView.as_view()),
    path('posts/<int:pk>', PostUpdateDeleteAPIView.as_view()),
    path('posts/<int:pk>/comments', PostCommentsAPIView.as_view()),
    path('posts/<int:pk>/new-comment', NewCommentForPostAPIView.as_view()),
    # get likes for a post(GET)
    path('posts/<int:pk>/likes', PostLikesAPIView.as_view()),
    # like and unlike a post(POST, DELETE)
    path('posts/<int:pk>/like', LikePostAPIView.as_view()),
    path('users/<int:pk>/posts', GetPostsForGivenUserAPIView.as_view()),
    # Path to comments
    path('comments/<int:pk>', CommentUpdateDeleteAPIView.as_view()),
    # Unlike
    path('likes/<int:pk>', UnlikeAPIView.as_view()),

]
