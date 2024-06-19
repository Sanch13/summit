from django.contrib.auth.password_validation import CommonPasswordValidator

from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny

from django.contrib.auth import get_user_model

User = get_user_model()


class CheckCommonPassword(CommonPasswordValidator):
    def validate(self, password, user=None):
        return password.lower().strip() in self.passwords


@api_view(['POST'])
@permission_classes([AllowAny])
def validate_password(request):
    validator = CheckCommonPassword()
    password = request.data.get('password')  # false true -- check

    if not password:
        return Response(data={'valid': False, 'error': "Поле не может быть пустым."},
                        status=status.HTTP_400_BAD_REQUEST)

    if validator.validate(password=password):
        return Response(data={'valid': False, 'error': "Этот пароль слишком распространен."},
                        status=status.HTTP_200_OK)
    else:
        return Response(data={'valid': True},
                        status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([AllowAny])
def check_email(request):
    email = request.query_params.get('email', None)
    print(email)
    if not email:
        return Response(data={'error': 'Email is required'},
                        status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(email=email).exists():
        return Response(data={'valid': False},
                        status=status.HTTP_200_OK)
    else:
        return Response(data={'valid': True},
                        status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([AllowAny])
def check_phone_number(request):
    phone_number = request.data.get('phone_number')
    if not phone_number:
        return Response(data={'error': 'phone_number is required'},
                        status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(phone_number=phone_number).exists():
        return Response(data={'valid': False},
                        status=status.HTTP_200_OK)
    else:
        return Response(data={'valid': True},
                        status=status.HTTP_200_OK)
