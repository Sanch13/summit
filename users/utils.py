from django.contrib.auth.password_validation import validate_password as django_validate_password
from django.core.exceptions import ValidationError

from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny


@api_view(['POST'])
@permission_classes([AllowAny])
def validate_password(request):
    if request.method == 'POST':
        print("i am working")
        password = request.POST.get('password')
        try:
            print("i am working")
            django_validate_password(password)
            return Response({'valid': True})
        except ValidationError as e:
            return Response({'valid': False, 'errors': e.messages})
    else:
        return Response({'error': 'Invalid request'}, status=400)
