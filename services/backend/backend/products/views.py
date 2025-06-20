from django.db.models.manager import BaseManager
from rest_framework import viewsets

from .models import Order, Product
from .serializers import OrderSerializer, ProductSerializer


class ProductViewSet(viewsets.ReadOnlyModelViewSet):
    queryset: BaseManager[Product] = Product.objects.all()
    serializer_class = ProductSerializer


class OrderViewSet(viewsets.ModelViewSet):
    queryset: BaseManager[Order] = Order.objects.all()
    serializer_class = OrderSerializer
