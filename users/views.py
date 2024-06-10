from django.shortcuts import render, reverse, redirect

from users.forms import UserRegistrationForm


def registration(request):
    if request.method == 'POST':
        form = UserRegistrationForm(data=request.POST)
        if form.is_valid():
            print(form)
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
