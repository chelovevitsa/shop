from django.http import JsonResponse
from pymongo import MongoClient
from django.views.decorators.csrf import csrf_exempt
import json
import jwt

client = MongoClient('mongodb+srv://admin:TechniSchools!@cluster0.zfvtf.mongodb.net/techni?retryWrites=true&w=majority')
db = client['shop']

@csrf_exempt
def loginApi(request):
    user = json.loads(request.body)

    email = user['email']
    login = user['login']
    password = user['password']

    if email:
        userDB = db.users.find_one({'email' : email})

        if not userDB:
            db.users.insert_one({ 'login': login, 'email': email, 'password': password })
            tokenEncode = jwt.encode({ 'email': email }, "secret", algorithm="HS256")
            return JsonResponse({ 'message': 'OK', 'token': tokenEncode, 'success': True }, safe=False)
        else:
            return JsonResponse({ 'message': 'EMAIL IN DATABASE', 'success': False }, safe=False)

    userDB = db.users.find_one({'login' : login})

    if userDB and login == userDB['login'] and password == userDB['password']:
        tokenEncode = jwt.encode({ 'email': userDB['email'] }, "secret", algorithm="HS256")
        isAdmin = False
        
        if login == 'admin':
            isAdmin = True

        return JsonResponse({ 'message': 'OK', 'token': tokenEncode, 'success': True, 'admin': isAdmin }, safe=False)
    else:
        return JsonResponse({ 'message': 'INCORRECT LOGIN OR PASSWORD', 'success': False }, safe=False)

@csrf_exempt
def productAdd(request):
    product = json.loads(request.body)

    name = product['name']
    desc = product['desc']
    price = product['price']

    db.products.insert_one({ 'name': name, 'desc': desc, 'price': price })

    return JsonResponse({ 'message': 'PRODUCT ADDED', 'success': True })

@csrf_exempt
def getProducts(request):
    productsDB = db.products.find()
    productsResponse = []

    for product in productsDB:
        product['_id'] = str(product['_id'])
        productsResponse.append(product)


    return JsonResponse({ 'message': 'PRODUCTS LIST', 'products': productsResponse, 'success': True })