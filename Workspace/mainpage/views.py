from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .models import ButtonPressLog
import threading
import pyttsx3

# Create your views here.
def start(request):
  threading.Thread(target=speak_text, args=("hello, Get ready for a fun and educational adventure into the world of wildlife! In this game, you'll learn fascinating facts about animals from around the world. Here's how it works: You will be given some key details about an animal. Based on these clues, you must guess the correct animal. Then, select 6 traits that best describe it. At the end of each game, you'll receive a score out of 6 based on your choices. Think you know your animals? Let's find out!",)).start()
  return render(request, 'start.html', context={
  })

def penguin(request):
  threading.Thread(target=speak_text, args=("Here are my specifications: I live in very cold places, but some of my kind enjoy warmer areas too. I cannot fly, but I am an excellent swimmer. I don’t have teeth, but I can still catch my food easily. Now, you should be able to imagine what animal I am, based on your guess choose my traits from the list on the left side.",)).start()
  return render(request, 'penguin.html', context={
})

def giraffe(request):
  threading.Thread(target=speak_text, args=("Here are my specifications: I live in warm, open areas with scattered trees and little shade. I walk in a unique way, moving both legs on one side of my body at the same time. My tongue is dark-colored, which helps protect it from the sun while I eat. Go on and choose my traits.",)).start()
  return render(request, 'giraffe.html', context={
})

def wolf(request):
  threading.Thread(target=speak_text, args=("Here are my specifications: I am social. I live in a cold northern climate. I am a predator but I also scavenge. I live on land. I hunt large prey. I am a carnivore. Ok, should be able to imagine what animal I am, based on your guess choose my traits from the list on the left side.",)).start()
  return render(request, 'wolf.html', context={
})

def ant(request):
  threading.Thread(target=speak_text, args=("Here are my specifications: I live in large colonies, where each member has a specific role to play. I can adapt to different climates, from rainforests to deserts. I can carry objects many times my own weight. Fron what you heard, you should be able to imagine what animal I am, based on your guess choose my traits from the list on the left side.",)).start()
  return render(request, 'ant.html', context={
})



def speak_text(text):
  engine = pyttsx3.init()
  engine.setProperty('rate', 135)
  engine.setProperty('volume', 0.9)
  engine.say(text)
  engine.runAndWait()



# Recieving button and time information
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