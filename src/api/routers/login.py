from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import User, db
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required

login = Blueprint('login', __name__, url_prefix='/login')


@login.route('/',methods=['POST'])
def log_in():

    data = request.get_json()

    user = User.query.filter_by(email=data['email']).first()

    if user and user.check_password(data['password']):
        token = create_access_token(identity=user.id)
        return jsonify({"token": token, "user.id":user.id}), 200
    
    return jsonify({"msg": "username or password invalid"}), 401
    

@login.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    return jsonify(logged_in_as=user.email), 200