from flask import Flask, request
from flask_restful import Resource, Api, abort, reqparse
from flask_pymongo import PyMongo
from webargs import fields
from webargs.flaskparser import use_args

app = Flask(__name__)
app.config['MONGO_URI'] = 'mongodb://localhost:27017/workout_timer'
parser = reqparse.RequestParser()
parser.add_argument('email', type=str, help='Email to look up')
parser.add_argument('workout', type=dict, help='Workout to post or update')
mongo = PyMongo(app)
api = Api(app)

class GetWorkouts(Resource):
    def get(self):
        try:
            args = parser.parse_args()
            workouts = mongo.db.workouts.find({'email': args['email']})
            print(dict(workouts))
            return dict(workouts)
        except:
            return {'Failed': 'sys.exc_info()[0]'}, 400
        
        

class ChangeWorkout(Resource):
    def put(self, id):
        try:
            # update a workout
            json = request.get_json()
            workouts = mongo.db.workouts.update_one({'_id': id}, json.workout)
            return workouts
        except:
            return 'Failed', 400


    def delete(self, id):
        try:
            # delete a workout
            workouts = mongo.db.workouts.delete_one({'_id': id})
            return workouts
        except:
            return 'Failed', 400


class AddWorkout(Resource):
    def post(self):
        # add a workout
        try:
            args = parser.parse_args()
            print('got here')
            workouts = mongo.db.workouts
            workouts.insert_one(args['workout'])
            return json.workout, 201
        except:
            return 'Failed', 400


api.add_resource(GetWorkouts, '/workouts')
api.add_resource(AddWorkout, '/workout')
api.add_resource(ChangeWorkout, '/workout/<string:id>')

if __name__ == '__main__':
    app.run(debug=True)
