__author__ = 'inbal'
from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.index, name="index"),
    url(r'^index', views.index, name="index"),
    url(r'^signin', views.signin, name="signin"),
    url(r'^signup', views.signup, name="signup"),
    url(r'^signout', views.signout, name="signout"),
    url(r'^get_statistics/', views.get_statistics, name='get_statistics'),
]
