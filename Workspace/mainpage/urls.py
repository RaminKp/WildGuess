from django.urls import path
from . import views #represents the current directory

urlpatterns = [
    path("", views.helloWorld, name='helloWorld'),
    path("1/", views.penguin, name='penguin'),
    path("2/", views.giraffe, name='giraffe'),
    path("3/", views.wolf, name='wolf'),
    path("4/", views.ant, name='ant'),
]
