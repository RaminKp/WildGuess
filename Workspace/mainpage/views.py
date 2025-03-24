from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .models import ButtonPressLog

# Create your views here.
def start(request):
  return render(request, 'start.html', context={
  })

def penguin(request):
  return render(request, 'penguin.html', context={
})

def giraffe(request):
  return render(request, 'giraffe.html', context={
})

def wolf(request):
  return render(request, 'wolf.html', context={
})

def ant(request):
  return render(request, 'ant.html', context={
})



@csrf_exempt
def log_button_press(request):
  """Receive button press logs from JavaScript and store them in the database"""
  if request.method == 'POST':
    data = json.loads(request.body)
    button_name = data.get('button_name')

    if button_name:
      ButtonPressLog.objects.create(button_name=button_name)
      return JsonResponse({'status': 'success'}, status=200)

  return JsonResponse({'status': 'error', 'message': 'Invalid request'}, status=400)