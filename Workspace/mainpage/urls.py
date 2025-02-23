from django.urls import path
from . import views #represents the current directory

urlpatterns = [
    path("", views.helloWorld, name='helloWorld'),
    path("penguin/", views.penguin, name='test')
]
