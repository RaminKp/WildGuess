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