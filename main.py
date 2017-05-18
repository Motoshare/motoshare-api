import logging
import os
import random, string
from google.appengine.ext import blobstore
from google.appengine.api import mail
from google.appengine.ext import ndb
from flask import Flask, jsonify, request, json, make_response, abort, render_template
from models import User, Motorcycle, Rental
from flask_jwt_extended import JWTManager, jwt_required, create_access_token, get_jwt_identity
import stripe
#Some hackery to get around unique email constraint when setting a recovery password.
import sys
if '__main__' not in sys.modules:
    sys.modules['__main__'] = sys.modules[__name__]
#Stripe Info be sure to switch to dev key for testing.
stripe.api_key = 'sk_test_336YZRu9JqOdtpk8zBycR5BK'

app = Flask(__name__)
app.secret_key = 'm0t0sh4r32016'
jwt = JWTManager(app)

BUCKET_NAME = 'motoshare-photos'

@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization,Cache-Control,X-Requested-With')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    return response

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    return render_template('index.html')

@app.route('/api/register', methods=['POST'])
def register():
	json = request.json
	user = User()
	user.email = json['email']
	user.password = json['password']
	if 'fname' in json:
		user.fname = json['fname']
	else:
		pass
	if 'lname' in json:
		user.lname = json['lname']
	else:
		pass
	if 'phone' in json:
		user.phone = json['phone']
	else:
		pass
	if 'location' in json:
		user.location = json['location']
	else:
		pass
	try:
		user.put()
		message = "Thank you for signing up."
		return jsonify(message=message)
	except:
		abort(500, 'Oops, there was a problem. That email is already in use.')

@app.route('/api/login/', methods=['POST'])
def login():
	email = request.json.get('email')
	password = request.json.get('password')
	user = User.query(User.email == email).get()
	uid = user.key.id()
	if user.email == email and user.password == password:
		ret = {'access_token': create_access_token(identity=email), 'uid': uid}
		return jsonify(ret), 200
	else:
		return jsonify({"message": "Bad username or password"}), 401

@app.route('/api/passwordreset', methods=['POST'])
def passwordreset():
	sender_address = "support@motoshare-v1.appspotmail.com"
	send_to = request.json.get('email')
	user = User.query(User.email == send_to).get()
	if user:
		password = ''.join(random.choice(string.ascii_uppercase + string.digits) for _ in range(10))
		print password
		user.password = password
		user.put()
		#reset_jwt = create_access_token(identity=send_to)
		#reset_url = 'https://motoshare-v1.appspot.com/reset?token=' + reset_jwt
		mail.send_mail(sender=sender_address,
	                   to=send_to,
	                   subject="Motoshare Password Reset",
	                   body="""Here is your temporary password:

						%r
					
						Please log in and update your password: https://motoshare.com/profile
						Thanks the Motoshare team.
						""" % password)
		return "Please check your email for password reset instructions."
	else:
		return "That email does not exsist. Please register."

# @app.route('/api/motorcycles', methods=['GET'])
# def motorcycles():
# 	filename = 'motorcycles.json'
# 	with open(filename) as motorcycle_list:
# 		data = json.load(motorcycle_list)
# 	return jsonify(data)

@app.route('/api/motorcycles', methods=['GET'])
#@jwt_required
def motorcycles():
	print(request.headers)
	motorcycles = Motorcycle.query()
	json_results = []
	for motorcycle in motorcycles:
		if motorcycle.location:
			lat = motorcycle.location.lat
			longitude = motorcycle.location.lon
		else:
			lat = 0
			longitude = 0
		d = {'id': motorcycle.get_id(),
			'availabledates': motorcycle.availabledates,
			'category': motorcycle.category,
			'color': motorcycle.color,
			'description': motorcycle.description,
			'isCompleted': motorcycle.isCompleted,
			'LIC': motorcycle.LIC,
			'VIN': motorcycle.VIN,
			'long': longitude,
			'lat': lat,
			'make': motorcycle.make,
			'media': motorcycle.media,
			'mileage': motorcycle.mileage,
			'model': motorcycle.model,
			'price': motorcycle.price,
			'year': motorcycle.year,
			'uid': motorcycle.user.id()}
		json_results.append(d)
	return jsonify(motorcycles=json_results)

@app.route('/api/motorcycles/<bike_id>', methods=['GET'])
def motorcycle(bike_id):
	if request.method == 'GET':
		motorcycle = Motorcycle.get_by_id(int(bike_id))
		lat = motorcycle.location.lat
		longitude = motorcycle.location.lon
		json_results = []
		d = {'id': motorcycle.get_id(),
				'availabledates': motorcycle.availabledates,
				'category': motorcycle.category,
				'color': motorcycle.color,
				'description': motorcycle.description,
				'isCompleted': motorcycle.isCompleted,
				'LIC': motorcycle.LIC,
				'VIN': motorcycle.VIN,
				'lat': lat,
				'long': longitude,
				'make': motorcycle.make,
				'media': motorcycle.media,
				'mileage': motorcycle.mileage,
				'model': motorcycle.model,
				'year': motorcycle.year,
				'uid': motorcycle.user.id()}
		json_results.append(d)
	return jsonify(motorcycle=json_results)

@app.route('/api/motorcycles/<bike_id>', methods=['POST'])
@jwt_required
def update_motorcycle(bike_id):
	motorcycle = Motorcycle.get_by_id(int(bike_id))
	json = request.json
	for k, value in json.items():
		setattr(motorcycle, k, value) 
	motorcycle.put()
	json_results = []
	d = {'id': motorcycle.get_id(),
		'availabledates': motorcycle.availabledates,
		'category': motorcycle.category,
		'color': motorcycle.color,
		'description': motorcycle.description,
		'isCompleted': motorcycle.isCompleted,
		'LIC': motorcycle.LIC,
		'VIN': motorcycle.VIN,
		'lat': lat,
		'long': longitude,
		'make': motorcycle.make,
		'media': motorcycle.media,
		'mileage': motorcycle.mileage,
		'model': motorcycle.model,
		'year': motorcycle.year}
	json_results.append(d)
	return jsonify(motorcycle=json_results)

@app.route('/api/motorcycles', methods=['POST'])
@jwt_required
def create_motorcycle():
	current_user = get_jwt_identity()
	user = User.query(User.email == current_user).get()
	uid = user.key.id()
	key = ndb.Key(User, uid)
	motorcycle = Motorcycle()
	json = request.json
	motorcycle.user = key
	if 'lat' in json:
		lat = json['lat']
		longitude = json['long']
		motorcycle.location = ndb.GeoPt(lat, longitude)
	else:
		lat = 38.581572
		longitude = -121.494400
		motorcycle.location = ndb.GeoPt(lat, longitude)
	if 'year' in json:
		motorcycle.year = json['year']
	else:
		pass
	if 'make' in json:
		motorcycle.make = json['make']
	else:
		pass
	if 'model' in json:
		motorcycle.model = json['model']
	else:
		pass
	if 'VIN' in json: 
		motorcycle.VIN = json['VIN']
	else:
		pass
	if 'LIC' in json:
		motorcycle.LIC = json['LIC']
	else:
		pass
	if 'category' in json:
		motorcycle.category = json['category']
	else:
		pass
	if 'color' in json:
		motorcycle.color = json['color']
	else:
		pass
	if 'mileage' in json:
		motorcycle.mileage = json['mileage']
	else:
		pass
	if 'description' in json:
		motorcycle.description = json['description']
	else:
		pass
	motorcycle.put()
	key = motorcycle.key.id()
	message = { 'motorcycleid' : key }
	return jsonify(message=message)

@app.route('/api/photo/upload', methods = ['POST', 'GET'])
def upload_photo():
    uploadUri = blobstore.create_upload_url('/api/photo/submit', gs_bucket_name=BUCKET_NAME)
    #return render_template('upload.html', uploadUri=uploadUri)
    return make_response(jsonify({'message': uploadUri}))

@app.route('/api/photo/submit', methods = ['POST'])
#@jwt_required
def submit_photo():
	data = request.get_data(as_text=True)
	print(data)
	start = "/gs/"
	end = "Content-MD5"
	link = data[data.find(start)+len(start):data.rfind(end)]
	temp_url = link.splitlines()
	bkey = "".join(temp_url)
	blob_key = bkey.replace('=','')
	json = request.json
	key = request.form['motorcycleid']
	motorcycle = Motorcycle.get_by_id(int(key))
	url = "https://storage.googleapis.com/"+blob_key
	motorcycle.media.append(url)
	motorcycle.put()
	message = 'Success'
	return jsonify(message=message)

@app.route('/api/mymotorcycles/<uid>', methods = ['GET', 'OPTIONS'])
@jwt_required
def my_motorcycles(uid):
	user = User.get_by_id(int(uid))
	motorcycles = Motorcycle.query(Motorcycle.user == user.key).fetch()
	json_results = []
	for motorcycle in motorcycles:
		lat = motorcycle.location.lat
		longitude = motorcycle.location.lon
		d = {'id': motorcycle.get_id(),
			'availabledates': motorcycle.availabledates,
			'category': motorcycle.category,
			'color': motorcycle.color,
			'description': motorcycle.description,
			'isCompleted': motorcycle.isCompleted,
			'LIC': motorcycle.LIC,
			'VIN': motorcycle.VIN,
			'lat': lat,
			'long': longitude,
			'media': motorcycle.media,
			'mileage': motorcycle.mileage,
			'make': motorcycle.make,
			'model': motorcycle.model,
			'year': motorcycle.year}
		json_results.append(d)
	return jsonify(mymotorcycles=json_results)

@app.route('/api/delete/<bike_id>', methods=['GET', 'POST'])
@jwt_required
def delete_motorcycle(bike_id):
	motorcycle = Motorcycle.get_by_id(int(bike_id))
	make = motorcycle.make 
	model = motorcycle.model 
	motorcycle.key.delete()
	message = 'Motorcycle: %r %r has been deleted' % (make, model)
	return jsonify(message=message)

@app.route('/api/rental/<owner_id>/<motorcycle_id>/<renter_id>', methods=['GET', 'POST'])
#jwt_required
def rent_motorcycle(owner_id, motorcycle_id, renter_id):
	owner = User.get_by_id(int(owner_id))
	ownerkey = owner.key
	motorcycle = Motorcycle.get_by_id(int(motorcycle_id))
	motorcyclekey = motorcycle.key
	renter = User.get_by_id(int(renter_id))
	renterkey = renter.key
	json = request.json
	rental = Rental()
	for k, value in json.items():
		setattr(rental, k, value)
	rental.owner = ownerkey
	rental.motorcycle = motorcyclekey
	rental.renter = renterkey 
	rental.put()
	json_results = []
	d = {'id': rental.get_id(),
		'dates': rental.dates,
		'price': rental.price}
	json_results.append(d)
	return jsonify(rental=json_results)

@app.route('/api/payment/<rental_id>', methods=['GET', 'POST', 'OPTIONS'])
#jwt_required
def payment(rental_id):
	stripe.api_key = "sk_test_336YZRu9JqOdtpk8zBycR5BK"
	token = request.form['stripeToken']
	charge = stripe.Charge.create(
		amount=1000,
		currency="usd",
		description="Example charge",
		source=token,
		)
	rental = Rental.get_by_id(int(rental_id))
	rental.isPaid = True 
	rental.put()
	return render_template('receipt.html')
	#return "Where is response"

@app.route('/api/addmotorcycle', methods=['GET', 'POST'])
@jwt_required
def addmotorcycle():
	motorcycle = Motorcycle()
	json = request.json
	print(json)
	for k, value in json.items():
		setattr(motorcycle, k, value)
	motorcycle.availabledates = json['availableDates']
	owner_id = json['uid']
	owner = User.get_by_id(int(owner_id))
	ownerkey = owner.key
	motorcycle.user = ownerkey
	if 'latitude' in json:
		lat = json['latitude']
		longitude = json['longitude']
		motorcycle.location = ndb.GeoPt(lat, longitude)
	else:
		pass
	motorcycle.put()
	json_results = []
	d = {'next': motorcycle.get_id()}
	json_results.append(d)
	return jsonify(d)

@app.route('/api/protected', methods=['GET', 'OPTIONS'])
@jwt_required
def protected():
    # Access the identity of the current user with get_jwt_identity
    current_user = get_jwt_identity()
    return jsonify({'Greetings': current_user}), 200

@app.errorhandler(500)
def custom500(error):
    return make_response(jsonify({'message': error.description}), 500)