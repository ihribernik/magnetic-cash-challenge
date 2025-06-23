from datetime import datetime
from random import choice, randint

from backend.products.factories import OrderFactory, OrderItemFactory, ProductFactory
from django.core.management.base import BaseCommand


class Command(BaseCommand):
    help = "Seed the database with sample products, orders, and order items."

    def handle(self, *args, **kwargs):
        self.stdout.write(self.style.SUCCESS('Seeding data...'))
        products = ProductFactory.create_batch(15)
        orders = OrderFactory.create_batch(5)
        for order in orders:
            for _ in range(randint(1, 5)):
                OrderItemFactory(order=order, product=choice(products))
        self.stdout.write(self.style.SUCCESS('Seeding completed!'))
