from flask import request, jsonify, Blueprint
from api.models import User, db
from flask_jwt_extended import create_access_token

register = Blueprint('register', __name__, url_prefix='/register')

@register.route('/', methods=['POST'])
def register_func():
    data = request.get_json()

    existing_user = User.query.filter_by(email=data['email']).first()
    if existing_user:
        return jsonify({"msg": "Email already registered"}), 409 

    new_user = User()
    new_user.email = data['email']
    new_user.set_password(data['password'])
    
    db.session.add(new_user)
    db.session.commit()
    
    return jsonify({"msg": "registered successfully"}), 201
