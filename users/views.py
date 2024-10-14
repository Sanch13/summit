from django.shortcuts import render, reverse, redirect
from django.contrib.auth import get_user_model, login

from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response

from users.forms import UserRegistrationForm
from users.serializers.serializers import UserRegistrationSerializer


User = get_user_model()


def registration(request):
    # if request.method == 'POST':
    #     form = UserRegistrationForm(data=request.POST)
    #     if form.is_valid():
    #         print(form.cleaned_data)
    #         email = form.cleaned_data.pop('email')
    #         password = form.cleaned_data.pop('password1')
    #         phone_number = form.cleaned_data.pop('phone_number')
    #         print(email, password, phone_number)
    #         User.objects.create_user(email=email,
    #                                  password=password,
    #                                  phone_number=phone_number,
    #                                  )
    #         print("CREATE USER")
    #         return redirect("users:profile")
    #     else:
    #         print(form)
    #         for field, errors in form.errors.items():
    #             print(f"Ошибка в поле {field}: {errors}")
    #         return render(
    #             request=request,
    #             template_name="users/registration_old.html",
    #             context={"form": UserRegistrationForm()}
    #         )
    #
    # else:
    return render(
        request=request,
        template_name="users/registration.html",
    )


class UserRegistrationView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        # Здесь вы можете вернуть форму или что-то другое
        return render(
            request=request,
            template_name="users/registration.html",
        )

    def post(self, request):
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            # Выполняем аутентификацию пользователя
            # user = authenticate(username=user.username, password=request.data.get('password'))

            if user is not None:
                # Если аутентификация прошла успешно, войдите в систему
                login(request, user)

            return Response(data={"message": "User registered successfully."},
                            status=status.HTTP_201_CREATED)

        return Response(data={"errors": serializer.errors},
                        status=status.HTTP_400_BAD_REQUEST)


def profile(request):
    return render(
        request=request,
        template_name="users/profile.html"
    )
