from rest_framework import serializers

from .models import OrderItem, Order, Product
from backend.users.models import User


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = "__all__"


class OrderItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)
    product_id = serializers.PrimaryKeyRelatedField(
        queryset=Product.objects.all(), source="product", write_only=True
    )

    class Meta:
        model = OrderItem
        fields = ["product", "product_id", "amount"]


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True)

    class Meta:
        model = Order
        fields = ["id", "purchase_date", "client_name", "items"]

    def create(self, validated_data):
        items_data = validated_data.pop("items")

        user = validated_data.get("client_name")

        if not user:
            raise serializers.ValidationError("El usuario es requerido.")

        if not User.objects.filter(username=user).exists():
            raise serializers.ValidationError("El usuario no existe.")

        order = Order.objects.create(**validated_data)
        for item in items_data:
            product = item["product"]
            amount = item["amount"]
            if product.stock < amount:
                raise serializers.ValidationError(
                    f"Stock insuficiente para el producto {product.name}."
                )
            product.stock -= amount
            product.save()
            OrderItem.objects.create(order=order, **item)
        return order
