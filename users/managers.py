from django.apps import apps
from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import UserManager
from rest_framework.exceptions import ParseError


class CustomUserManager(UserManager):
    use_in_migrations = True

    def _create_user(self, username, password=None, email=None, phone_number=None, **extra_fields):
        if not username:
            raise ValueError("The given username must be set")

        GlobalUserModel = apps.get_model(
            self.model._meta.app_label, self.model._meta.object_name
        )

        print(f"Отрабатал мой Манаджер Модель-{GlobalUserModel}")

        username = GlobalUserModel.normalize_username(username)
        # user = self.model(username=username, email=email, **extra_fields)
        user = self.model(username=username, **extra_fields)
        user.password = make_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, username, email=None, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", False)
        extra_fields.setdefault("is_superuser", False)
        return self._create_user(username, email, password, **extra_fields)

    def create_superuser(self, username, email=None, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser must have is_staff=True.")
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=True.")

        return self._create_user(username, email, password, **extra_fields)

        # email = self.normalize_email(email)
        #
        # if not (email or phone_number or username):
        #     raise ParseError('Укажите email или телефон')
        #
        # if email:
        #     email = self.normalize_email(email)
        #
        # if not username:
        #     if email:
        #         username = email
        #     else:
        #         username = phone_number
        #
        # user = self.model(username=username, **extra_fields)
        # if email:
        #     user.email = email
        # if phone_number:
        #     user.phone_number = phone_number
        #
        # user.set_password(password)
        # user.save(using=self._db)
        # return user

    # def create_user(self, phone_number=None, email=None,
    # password=None, username=None, **extra_fields):
    #     extra_fields.setdefault('is_superuser', False)
    #     extra_fields.setdefault('is_staff', False)
    #     extra_fields.setdefault('is_active', True)
    #
    #     return self._create_user(
    #         phone_number, email, password, username, **extra_fields
    #     )
    #
    # def create_superuser(self,
    # phone_number=None,
    # email=None,
    # password=None, username=None, **extra_fields):
    #     extra_fields.setdefault('is_superuser', True)
    #     extra_fields.setdefault('is_staff', True)
    #     extra_fields.setdefault('is_active', True)
    #
    #     return self._create_user(
    #         phone_number, email, password, username, **extra_fields
    #     )
