from django.shortcuts import render

# Create your views here.
def helloWorld(request):
  return render(request, 'index.html', context={
    'name': 'Ramin',
    'age': 22
  })

def test(request):
  return render(request, 'test.html', context={
    'name': 'Ashlar',
    'age': 21
  })