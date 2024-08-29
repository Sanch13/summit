from django.shortcuts import render, reverse, redirect
from django.contrib.auth import get_user_model

from users.forms import UserRegistrationForm


User = get_user_model()


def registration(request):
    if request.method == 'POST':
        form = UserRegistrationForm(data=request.POST)
        if form.is_valid():
            print(form.cleaned_data)
            email = form.cleaned_data.pop('email')
            password = form.cleaned_data.pop('password1')
            phone_number = form.cleaned_data.pop('phone_number')
            print(form.cleaned_data)
            User.objects.create_user(email=email,
                                     password=password,
                                     phone_number=phone_number,
                                     )
            print("CREATE USER")
            return redirect("users:profile")
        else:
            print(form)
            for field, errors in form.errors.items():
                print(f"Ошибка в поле {field}: {errors}")
            return render(
                request=request,
                template_name="users/registration.html",
                context={"form": UserRegistrationForm()}
            )

    else:
        return render(
            request=request,
            template_name="users/registration.html",
            context={"form": UserRegistrationForm()}
        )


def profile(request):
    return render(
        request=request,
        template_name="users/profile.html"
    )
