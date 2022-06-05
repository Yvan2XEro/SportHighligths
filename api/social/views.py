from rest_framework.response import Response
from rest_framework import generics, status

from authentication.models import User
from authentication.serializers import UserSerializer
from .serializers import FollowSerializer, PostSerializer
from .models import Follow, Post


class FollowListAPIView(generics.ListAPIView):
    queryset = Follow.objects.all()
    serializer_class = FollowSerializer


class FollowUnfollowAPIView(generics.GenericAPIView):
    """
    This class handles the follow and unfollow of users
    """
    serializer_class = FollowSerializer

    def post(self, request, pk):
        """
        This method handles the follow of a user
        """
        user = User.objects.get(pk=pk)
        user_following = request.user
        if user_following.is_authenticated:
            if user_following.id != user.id:
                if not Follow.objects.filter(
                        user=user_following, following=user).exists():
                    Follow.objects.create(user=user_following, following=user)
                    return Response(
                        {"message": "You are now following {}".format(
                            user.email)},
                        status=status.HTTP_201_CREATED)
                else:
                    return Response(
                        {"message": "You are already following {}".format(
                            user.email)},
                        status=status.HTTP_200_OK)
            else:
                return Response(
                    {"message": "You cannot follow yourself"},
                    status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(
                {"message": "You are not authenticated"},
                status=status.HTTP_401_UNAUTHORIZED)

    def delete(self, request, pk):
        """
        This method handles the unfollow of a user
        """
        user = User.objects.get(pk=pk)
        user_following = request.user
        if user_following.is_authenticated:
            if user_following.id != user.id:
                if Follow.objects.filter(
                        user=user_following, following=user).exists():
                    Follow.objects.filter(
                        user=user_following, following=user).delete()
                    return Response(
                        {"message": "You are no longer following {}".format(
                            user.email)},
                        status=status.HTTP_200_OK)
                else:
                    return Response(
                        {"message": "You are not following {}".format(
                            user.email)},
                        status=status.HTTP_200_OK)

            else:
                return Response(
                    {"message": "You cannot unfollow yourself"},
                    status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(
                {"message": "You are not authenticated"},
                status=status.HTTP_401_UNAUTHORIZED)


class GetMyFollowablesUsersAPIView(generics.ListAPIView):
    def get_serializer_class(self):
        return UserSerializer

    # Find users followed by my friends or by users I follow
    def get_queryset(self):
        return User.objects.filter(
            id__in=Follow.objects.filter(
                user=self.request.user).values_list('following', flat=True)
        )


class FollowersForGivenUserAPIView(generics.ListAPIView):
    serializer_class = FollowSerializer

    def get_queryset(self):
        return Follow.objects.filter(following=self.kwargs['pk'])


class FollowingsForGivenUserAPIView(generics.ListAPIView):

    serializer_class = FollowSerializer

    def get_queryset(self):
        return Follow.objects.filter(user=self.kwargs['pk'])


class GetPostsByMyFollowingsUsersAPIView(generics.ListAPIView):
    serializer_class = PostSerializer

    def get_queryset(self): return Post.objects.filter(
        user__in=Follow.objects.filter(
            user=self.request.user).values_list('following', flat=True)
    )


class NewPostForLoggedUserAPIView(generics.CreateAPIView):
    serializer_class = PostSerializer

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class PostUpdateDeleteAPIView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = PostSerializer
    queryset = Post.objects.all()
