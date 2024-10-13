from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import CommonPasswordValidator
from django.views.decorators.csrf import csrf_exempt

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from drf_spectacular.utils import extend_schema

User = get_user_model()


class EmailCheckAPIView(APIView):

    @csrf_exempt
    @extend_schema(
        description="Проверяет, существует ли указанный адрес электронной почты в базе данных."
    )
    def post(self, request):
        """
        Checks if the specified e-mail address exists in the database.
        Проверяет, существует ли указанный адрес электронной почты в базе данных.
        :param request:
        :return:
        """
        email = request.data.get("email", None)
        if not email:
            return Response(data={'error': 'Email is required'},
                            status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(email=email).exists():
            return Response(data={'valid': False},
                            status=status.HTTP_200_OK)
        else:
            return Response(data={'valid': True},
                            status=status.HTTP_200_OK)


class CommonPassword(CommonPasswordValidator):
    def validate(self, password, user=None):
        return password.lower().strip() in self.passwords


class CommonPasswordCheckAPIView(APIView):

    @csrf_exempt
    def post(self, request):
        validator = CommonPassword()
        password = request.data.get("password", None)

        if not password:
            return Response(data={'valid': False, 'error': "Поле не может быть пустым."},
                            status=status.HTTP_400_BAD_REQUEST)

        if validator.validate(password=password):
            return Response(data={"valid": False, "error": "Этот пароль слишком распространен."},
                            status=status.HTTP_200_OK)
        else:
            return Response(data={"valid": True},
                            status=status.HTTP_200_OK)


class PhoneNumberCheckAPIView(APIView):

    @csrf_exempt
    def post(self, request):
        phone_number = request.data.get("phoneNumber", None)

        if not phone_number:
            return Response(data={'error': 'phone_number is required'},
                            status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(phone_number=phone_number).exists():
            return Response(data={"valid": False, "error": "Телефонный номер уже зарегистрирован"},
                            status=status.HTTP_200_OK)
        else:
            return Response(data={"valid": True},
                            status=status.HTTP_200_OK)
