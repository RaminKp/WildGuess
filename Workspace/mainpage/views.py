from django.shortcuts import render

# Create your views here.
def helloWorld(request):
  return render(request, 'index.html', context={
    'name': 'Ramin',
    'age': 22
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