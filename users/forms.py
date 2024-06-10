from django.contrib.auth.forms import UserCreationForm

from users.models.users import User


class UserRegistrationForm(UserCreationForm):
    class Meta:
        model = User
        fields = (
            # "username",
            "email",
            "password1",
            "password2",
            "phone_number",
            # "first_name",
            # "last_name",
        )
