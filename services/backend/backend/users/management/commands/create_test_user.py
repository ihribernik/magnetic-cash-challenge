import os

from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand


class Command(BaseCommand):
    help = "Create a superuser if it doesn't exist"

    def handle(self, *args, **kwargs):
        User = get_user_model()
        username = os.getenv("USERNAME", "not-admin")
        email = os.getenv("EMAIL", "not-admin@not-admin.com")
        password = os.getenv("PASS", "not-admin-1234")

        if not User.objects.filter(username=username).exists():
            User.objects.create_superuser(username, email, password)
            self.stdout.write("testuser creado")
        else:
            self.stdout.write("testuser ya existe")
