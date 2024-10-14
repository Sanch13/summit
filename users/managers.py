from django.apps import apps
from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import UserManager
from rest_framework.exceptions import ParseError


class CustomUserManager(UserManager):
    use_in_migrations = True

    def _create_user(self, username=None,
                     email=None,
                     password=None,
                     phone_number=None,
                     first_name=None,
                     last_name=None,
                     **extra_fields):

        self.username = email if username is None else username
        GlobalUserModel = apps.get_model(
            self.model._meta.app_label, self.model._meta.object_name
        )
        print("Отработал мой CustomUserManager")

        username = GlobalUserModel.normalize_username(self.username)
        first_name = first_name if first_name is not None else ''
        last_name = last_name if last_name is not None else ''
        user = self.model(username=username,
                          email=email,
                          phone_number=phone_number,
                          first_name=first_name,
                          last_name=last_name,
                          **extra_fields)
        user.password = make_password(password)
        user.save(using=self._db)
        return user

    def create_user(self,
                    username=None,
                    email=None,
                    password=None,
                    phone_number=None,
                    first_name=None,
                    last_name=None,
                    **extra_fields):
        extra_fields.setdefault("is_staff", False)
        extra_fields.setdefault("is_superuser", False)
        return self._create_user(username,
                                 email,
                                 password,
                                 phone_number,
                                 first_name,
                                 last_name,
                                 **extra_fields
                                 )

    def create_superuser(self,
                         username=None,
                         email=None,
                         password=None,
                         phone_number=None,
                         first_name=None,
                         last_name=None,
                         **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser must have is_staff=True.")
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=True.")

        return self._create_user(username,
                                 email,
                                 password,
                                 phone_number,
                                 first_name,
                                 last_name,
                                 **extra_fields)
