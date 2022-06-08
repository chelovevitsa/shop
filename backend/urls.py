from django.urls import path
from . import views

urlpatterns = [
    path('api/shop/login', views.loginApi),
    path('api/shop/product/add', views.productAdd),
    path('api/shop/products', views.getProducts),
]