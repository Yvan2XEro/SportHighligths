from rest_framework.permissions import IsAuthenticated
import pdb
from rest_framework.response import Response
from rest_framework import generics, status

from rest_framework.parsers import MultiPartParser


from authentication.models import User
from authentication.serializers import UserSerializer
from .serializers import CommentsSerializer, FollowSerializer, LikeSerializer, NewCommentSerializer, NewPostSerialiser, PostSerializer
from .models import Comment, Follow, Like, Post


class RetrieveUserAPIView(generics.RetrieveAPIView):
    """
    Retrieve a user
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer


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
        return User.objects.all().exclude(
            id__in=Follow.objects.filter(
                user=self.request.user).values_list('following', flat=True)
        ).exclude(id=self.request.user.id)


class FollowersForGivenUserAPIView(generics.ListAPIView):
    serializer_class = UserSerializer

    def get_queryset(self):
        return User.objects.filter(
            id__in=Follow.objects.filter(
                following=self.kwargs['pk']).values_list('user', flat=True))


class FollowingsForGivenUserAPIView(generics.ListAPIView):
    serializer_class = UserSerializer

    def get_queryset(self):
        return User.objects.filter(
            id__in=Follow.objects.filter(
                user=self.kwargs['pk']).values_list('following', flat=True))


class GetPostsByMyFollowingsUsersAPIView(generics.ListAPIView):
    serializer_class = PostSerializer
    queryset = Post.objects.all()

    # def get_queryset(self):
    #     return Post.objects.filter(
    #         author__in=Follow.objects.filter(
    #             user=self.request.user).values_list('following', flat=True)
    #     )


class NewPostForLoggedUserAPIView(generics.CreateAPIView):
    serializer_class = NewPostSerialiser

    parser_classes = [MultiPartParser]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

#


class PostUpdateDeleteAPIView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = PostSerializer
    queryset = Post.objects.all()


# get comments for a post
class PostCommentsAPIView(generics.ListAPIView):
    serializer_class = CommentsSerializer

    def get_queryset(self):
        return Comment.objects.filter(post=self.kwargs['pk']).order_by('-created_at')


# new comment for a post
class NewCommentForPostAPIView(generics.CreateAPIView):
    serializer_class = NewCommentSerializer

    def perform_create(self, serializer):
        serializer.save(author=self.request.user,
                        post=Post.objects.get(pk=self.kwargs['pk']))


class CommentUpdateDeleteAPIView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = CommentsSerializer
    queryset = Comment.objects.all()


class PostLikesAPIView(generics.ListAPIView):
    serializer_class = LikeSerializer

    def get_queryset(self):
        return Like.objects.filter(post=self.kwargs['pk'])


class LikePostAPIView(generics.GenericAPIView):
    serializer_class = LikeSerializer

    def post(self, request, pk):
        post = Post.objects.get(pk=pk)
        user = request.user
        if user.is_authenticated:
            if not Like.objects.filter(user=user, post=post).exists():
                Like.objects.create(user=user, post=post)
                return Response(
                    {"message": "You liked {}".format(post.id)},
                    status=status.HTTP_201_CREATED)
            else:
                return Response(
                    {"message": "You already liked {}".format(post.id)},
                    status=status.HTTP_200_OK)
        else:
            return Response(
                {"message": "You are not authenticated"},
                status=status.HTTP_401_UNAUTHORIZED)

    def delete(self, request, pk):
        post = Post.objects.get(pk=pk)
        user = request.user
        if user.is_authenticated:
            if Like.objects.filter(user=user, post=post).exists():
                Like.objects.filter(user=user, post=post).delete()
                return Response(
                    {"message": "You unliked {}".format(post.id)},
                    status=status.HTTP_200_OK)
            else:
                return Response(
                    {"message": "You did not like {}".format(post.id)},
                    status=status.HTTP_200_OK)
        else:
            return Response(
                {"message": "You are not authenticated"},
                status=status.HTTP_401_UNAUTHORIZED)


class UnlikeAPIView(generics.DestroyAPIView):
    serializer_class = LikeSerializer
    queryset = Like.objects.all()


class PostLikeUpdateDeleteAPIView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = PostSerializer
    queryset = Post.objects.all()


# get posts for a user !!
class GetPostsForGivenUserAPIView(generics.ListAPIView):
    serializer_class = PostSerializer

    def get_queryset(self):
        return Post.objects.filter(author=self.kwargs['pk'])
