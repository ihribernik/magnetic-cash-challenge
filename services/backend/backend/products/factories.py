import factory

from backend.products.models import Order, OrderItem, Product


class ProductFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Product

    name = factory.Faker("word")
    description = factory.Faker("sentence")
    image = factory.django.ImageField(color="blue")
    price = factory.Faker("pydecimal", left_digits=3, right_digits=2, positive=True)
    stock = factory.Faker("pyint", min_value=0, max_value=100)


class OrderFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Order

    purchase_date = factory.Faker("date_time_this_year")
    client_name = factory.Faker("name")


class OrderItemFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = OrderItem

    order = factory.SubFactory(OrderFactory)
    product = factory.SubFactory(ProductFactory)
    amount = factory.Faker("pyint", min_value=1, max_value=10)
