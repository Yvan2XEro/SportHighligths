from rest_framework import serializers

from authentication.serializers import UserSerializer
from .models import Follow, Post, PostImage


class FollowSerializer(serializers.ModelSerializer):

    user = UserSerializer(read_only=True)
    following = UserSerializer(read_only=True)

    class Meta:
        model = Follow
        fields = "__all__"


class PostImagesSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostImage
        fields = "__all__"


class PostSerializer(serializers.ModelSerializer):
    images = PostImagesSerializer(many=True, read_only=True)
    author = UserSerializer(read_only=True)
    commentsCount = serializers.SerializerMethodField('get_comments_count')
    likesCount = serializers.SerializerMethodField('get_likes_count')

    class Meta:
        model = Post
        fields = "__all__"

    def get_comments_count(self, obj):
        return obj.comments.count()

    def get_likes_count(self, obj):
        return obj.likes.count()
