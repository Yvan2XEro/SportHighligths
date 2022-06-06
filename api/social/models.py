from django.db import models

from versatileimagefield.fields import VersatileImageField, PPOIField
from authentication.validators import validate_image_extension, validate_image_size

from authentication.models import User

# Create your models here.


class Follow(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    following = models.ForeignKey(
        User, related_name='following', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.user} follows {self.following}'

    class Meta:
        unique_together = ('user', 'following')


# Posts model like facebook publication model with images field
class Post(models.Model):
    content = models.TextField(max_length=500)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.author} posted {self.content}'


class PostImage(models.Model):
    image = VersatileImageField(
        'post image',
        upload_to='post_images', blank=True, null=True,
        ppoi_field='image_PPOI',
        validators=[validate_image_extension, validate_image_size]
    )
    image_PPOI = PPOIField()
    post = models.ForeignKey(
        Post, on_delete=models.CASCADE, related_name='images')

    def __str__(self):
        return f'{self.image}'


# Comments Model
class Comment(models.Model):
    content = models.TextField(max_length=500)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(
        Post, on_delete=models.CASCADE, related_name='comments')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.author} commented {self.content}'


# Likes Model
class Like(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(
        Post, on_delete=models.CASCADE, related_name='likes')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.author} liked {self.post}'
