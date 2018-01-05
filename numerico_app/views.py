# -*- coding: utf-8 -*-
from __future__ import unicode_literals
import json
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render, render_to_response, get_object_or_404
from queries import *

def index(request):
    context = {'tags': ["rock", "pop"]}
    return render_to_response('index.html', context)

def signin(request):
    return render_to_response('signin.html')

def signup(request):
    return render_to_response('signup.html')

def signout(request):
    return render_to_response('signin.html')

# Sample Ajax
def get_statistics(request):
    input = request.body
    sample_data_from_db  = sample_sql_query(input)
    return JsonResponse(sample_data_from_db, safe=False)