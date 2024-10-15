from django.contrib.auth.models import AbstractUser
from django.db import models

from users.managers import CustomUserManager


class User(AbstractUser):
    email = models.EmailField(max_length=150,
                              verbose_name='Электронная почта',
                              unique=True)
    phone_number = models.CharField(max_length=17,
                                    verbose_name='Телефон',
                                    blank=True,
                                    null=True,
                                    unique=True)
    # USERNAME_FIELD = ('email', 'phone_number')
    # REQUIRED_FIELDS = ('email', 'phone_number')

    objects = CustomUserManager()

    class Meta:
        verbose_name = 'Пользователь'
        verbose_name_plural = 'Пользователи'

    @property
    def full_name(self):
        return f'{self.first_name} {self.last_name}' or ''

    def __str__(self):
        return f'{self.full_name} - ID:{self.pk}'
