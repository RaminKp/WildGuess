from django.shortcuts import render

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