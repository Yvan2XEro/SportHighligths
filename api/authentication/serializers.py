import pdb
from rest_framework import serializers
from django.contrib import auth
from rest_framework.exceptions import AuthenticationFailed
from versatileimagefield.serializers import VersatileImageFieldSerializer


from .models import User
from social.models import Follow, Post


class UserSerializer(serializers.ModelSerializer):

    followers_count = serializers.SerializerMethodField('get_followers_count')
    followings_count = serializers.SerializerMethodField(
        'get_followings_count')
    publications_count = serializers.SerializerMethodField(
        'get_publications_count')

    followed = serializers.SerializerMethodField('get_followed')

    class Meta:
        model = User
        fields = ['id', 'email', 'password',
                  'first_name', 'last_name',
                  'date_joined', 'avatar',
                  'followers_count', 'followings_count',
                  'publications_count', 'followed'
                  ]
        extra_kwargs = {'password': {'write_only': True, }}

    def validate(self, attrs):
        return attrs

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)

    def get_followers_count(self, obj):
        return Follow.objects.filter(following=obj).count()

    def get_followings_count(self, obj):
        return Follow.objects.filter(user=obj).count()

    def get_publications_count(self, obj):
        return Post.objects.filter(author=obj).count()

    def get_followed(self, obj):
        if self.context['request'].user.is_authenticated:
            return Follow.objects.filter(following=obj, user=self.context['request'].user).exists()
        return False


class LoginSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(max_length=255, min_length=3)
    password = serializers.CharField(
        max_length=255, min_length=3, write_only=True)

    class Meta:
        model = User
        fields = ['email', 'password', 'tokens']

    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')

        user = auth.authenticate(email=email, password=password,)

        if not user:
            raise AuthenticationFailed("Invalid credentials. Try again")
        if not user.is_active:
            raise AuthenticationFailed(
                "Account inactive. Contact administrator")

        # pdb.set_trace()
        return {
            "tokens": user.tokens(),
            "email": user.email,
        }


class SetProfileImageSerializer(serializers.ModelSerializer):
    avatar = VersatileImageFieldSerializer(
        sizes='avatar'
    )

    class Meta:
        model = User
        fields = ['avatar']

    def update(self, instance, validated_data):
        # Get the name of the image associated to user
        # pdb.set_trace()
        el = instance.avatar.name.split('/')
        image_name = el[len(el)-1]

        # Check if this image is not default image and is not the same image that we try to upload
        if image_name != "default.jpg" and image_name != validated_data['avatar'].name:
            instance.avatar.delete_all_created_images()
            instance.avatar.delete()
            instance.avatar = validated_data['avatar']
            instance.save()
            return instance

        instance.avatar = validated_data['avatar']
        instance.save()
        return instance


# Update profile serializer
class UpdateProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'email']

    def update(self, instance, validated_data):
        instance.first_name = validated_data.get(
            'first_name', instance.first_name)
        instance.last_name = validated_data.get(
            'last_name', instance.last_name)
        instance.save()
        return instance

    def validate_email(self, value):
        if value != self.instance.email:
            if User.objects.filter(email=value).exists():
                raise serializers.ValidationError(
                    "Email already exists")
        return value
