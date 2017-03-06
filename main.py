import logging
import os
import random, string
from google.appengine.api import mail
from flask import Flask, jsonify, request, json, make_response, abort, render_template
from models import User, Motorcycle
from flask_jwt_extended import JWTManager, jwt_required, create_access_token, get_jwt_identity

#Some hackery to get around unique email constraint when setting a recovery password.
import sys
if '__main__' not in sys.modules:
    sys.modules['__main__'] = sys.modules[__name__]

app = Flask(__name__)
app.secret_key = 'm0t0sh4r32016'
jwt = JWTManager(app)

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

@app.route('/api/motorcycles', methods=['POST', 'GET'])
def motorcycles():
	filename = 'motorcycles.json'
	with open(filename) as motorcycle_list:
		data = json.load(motorcycle_list)
	return jsonify(data)

@app.route('/api/motorcycles/<bike_id>', methods=['POST', 'GET'])
def motorcycle(bike_id):
	filename = 'motorcycles.json'
	with open(filename) as motorcycle_list:
		data = json.load(motorcycle_list)
	return jsonify(data)

@app.route('/api/motorcycles/', methods=['POST', 'OPTIONS'])
@jwt_required
def create_motorcycle():
	motorcycle = Motorcycle()
	json = request.json
	#Insert User key 
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
	message = 'Motorcycle Saved'
	return jsonify(message=message)
	
@app.route('/protected', methods=['GET'])
@jwt_required
def protected():
    # Access the identity of the current user with get_jwt_identity
    current_user = get_jwt_identity()
    return jsonify({'Greetings': current_user}), 200

@app.errorhandler(500)
def custom500(error):
    return make_response(jsonify({'message': error.description}), 500)