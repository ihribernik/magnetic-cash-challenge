import os

from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand


class Command(BaseCommand):
    help = "Create a superuser if it doesn't exist"

    def handle(self, *args, **kwargs):
        User = get_user_model()
        username = os.getenv("SUPERUSER_USERNAME", "admin")
        email = os.getenv("SUPERUSER_EMAIL", "admin@example.com")
        password = os.getenv("SUPERUSER_PASS", "admin123")

        if not User.objects.filter(username=username).exists():
            User.objects.create_superuser(username, email, password)
            self.stdout.write("Superuser creado")
        else:
            self.stdout.write("Superuser ya existe")
