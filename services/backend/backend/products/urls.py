from rest_framework.routers import DefaultRouter

from .views import OrderViewSet, ProductViewSet

app_name = "products"

router = DefaultRouter()
router.register(r"products", ProductViewSet, basename="products")
router.register(r"orders", OrderViewSet, basename="orders")

urlpatterns = router.urls
