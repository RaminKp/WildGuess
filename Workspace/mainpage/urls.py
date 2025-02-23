from django.urls import path
from . import views #represents the current directory

urlpatterns = [
    path("", views.helloWorld, name='helloWorld'),
    path("penguin/", views.penguin, name='penguin'),
    path("giraffe/", views.giraffe, name='giraffe'),
    path("wolf/", views.wolf, name='wolf'),
    path("ant/", views.ant, name='ant'),
]
