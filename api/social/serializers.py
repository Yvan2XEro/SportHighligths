import pdb
from rest_framework import serializers

from authentication.serializers import UserSerializer
from .models import Comment, Follow, Like, Post, PostImage


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


class NewPostSerialiser(serializers.ModelSerializer):
    images = serializers.ListField(
        child=serializers.ImageField(max_length=20, use_url=True),
    )

    author = UserSerializer(read_only=True)

    class Meta:
        model = Post
        fields = "__all__"

    def create(self, validated_data):
        images = validated_data.pop('images')

        post = Post.objects.create(**validated_data)
        for image in images:
            PostImage.objects.create(image=image, post=post)
        return post


class PostSerializer(serializers.ModelSerializer):
    images = PostImagesSerializer(many=True, read_only=True)
    author = UserSerializer(read_only=True)
    commentsCount = serializers.SerializerMethodField('get_comments_count')
    likesCount = serializers.SerializerMethodField('get_likes_count')
    liked = serializers.SerializerMethodField('get_liked')


    class Meta:
        model = Post
        fields = ['id', 'author', 'content', 'images',
                  'created_at',
                  'commentsCount',
                  'likesCount',
                  'liked'
                  ]

    def get_comments_count(self, obj):
        return obj.comments.count()

    def get_likes_count(self, obj):
        return obj.likes.count()

    def get_liked(self, obj):
        if self.context['request'].user.is_authenticated:
            return Like.objects.filter(post=obj, user=self.context['request'].user).exists()
        return False


class CommentsSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)

    class Meta:
        model = Comment
        fields = '__all__'


class NewCommentSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)
    post = PostSerializer(read_only=True)

    class Meta:
        model = Comment
        fields = '__all__'


class LikeSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Like
        fields = '__all__'
