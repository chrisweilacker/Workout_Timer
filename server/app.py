from flask import Flask, request
from flask_restful import Resource, Api, abort, reqparse
from flask_pymongo import PyMongo
from flask_cors import CORS, cross_origin
from webargs import fields
from webargs.flaskparser import use_args

import json
from bson import ObjectId

class JSONEncoder(json.JSONEncoder):
    def default(self, o): # pylint: disable=E0202
        if isinstance(o, ObjectId):
            return str(o)
        return json.JSONEncoder.default(self, o)

app = Flask(__name__)
CORS(app)
app.config['MONGO_URI'] = 'mongodb://localhost:27017/workout_timer'
parser = reqparse.RequestParser()
parser.add_argument('email', type=str, help='Email to look up')
parser.add_argument('workout', type=dict)

mongo = PyMongo(app)
api = Api(app)



class GetWorkouts(Resource):
    def get(self):
        try:
            args = parser.parse_args()
            workouts = mongo.db.workouts
            results = workouts.find({'email': args['email']})

            return JSONEncoder().encode(list(results)), 200
        except Exception as e:
            return {'Failed': str(e)}, 400
        
        

class ChangeWorkout(Resource):
    def put(self, id):
        try:
            # update a workout
            json = request.get_json() 
            workouts = mongo.db.workouts.update_one({'_id': id}, json.workout)
            return workouts
        except Exception as e:
            return {'Failed': str(e)}, 400


    def delete(self, id):
        try:
            # delete a workout
            mongo.db.workouts.delete_one({'_id': ObjectId(id)})
            return 'Deleted'
        except Exception as e:
            return {'Failed': str(e)}, 400


class AddWorkout(Resource):
    def post(self):
        # add a workout
        try:
            args = parser.parse_args()
            workouts = mongo.db.workouts
            workouts.insert_one(args['workout'])
            return 'success', 201
        except Exception as e:
            print(str(e))
            return 'Failed, ' + str(e), 400


api.add_resource(GetWorkouts, '/workouts')
api.add_resource(AddWorkout, '/workout')
api.add_resource(ChangeWorkout, '/workout/<string:id>')

if __name__ == '__main__':
    app.run(debug=True)
