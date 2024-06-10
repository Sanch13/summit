from django.contrib.auth.models import AbstractUser
from django.db import models
from phonenumber_field.modelfields import PhoneNumberField

from users.managers import CustomUserManager


class User(AbstractUser):
    email = models.EmailField(verbose_name='Электронная почта',
                              unique=True)
    # phone_number = PhoneNumberField(verbose_name='Телефон',
    #                                 unique=True)
    phone_number = models.CharField(max_length=17,
                                    verbose_name='Телефон',
                                    unique=True)
    # USERNAME_FIELD = ('email', 'phone_number')
    # REQUIRED_FIELDS = ('email',)

    objects = CustomUserManager()

    class Meta:
        verbose_name = 'Пользователь'
        verbose_name_plural = 'Пользователи'

    @property
    def full_name(self):
        return f'{self.first_name} {self.last_name}' or ''

    def __str__(self):
        return f'ID[{self.pk}] - {self.full_name}'
