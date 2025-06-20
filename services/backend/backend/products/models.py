from django.db import models


class Product(models.Model):
    name = models.TextField()
    description = models.TextField()
    image = models.ImageField(upload_to="products/")
    price = models.DecimalField(max_digits=8, decimal_places=2)
    stock = models.PositiveIntegerField()

    def __str__(self):
        return self.name


class Order(models.Model):
    purchase_date = models.DateTimeField(auto_now_add=True)
    products = models.ManyToManyField(Product, through="OrderItem")
    client_name = models.CharField(max_length=100)


class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name="items")
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    amount = models.PositiveIntegerField()

    def __str__(self):
        return f"{self.amount} x {self.product.name} (Order #{self.order.id})"
