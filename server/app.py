from flask import Flask, request
from flask_restful import Resource, Api, abort
from flask_pymongo import PyMongo
from webargs import fields
from webargs.flaskparser import use_args

app = Flask(__name__)
app.config['MONGO_URI'] = 'mongodb://localhost:27017/workout_timer'

mongo = PyMongo(app)
api = Api(app)

class GetWorkouts(Resource):
    @use_args
    def get(self, args):
        try:
            # get workouts
            workouts = mongo.db.workouts.find({'email': args['email']})
            print(workouts)
            return workouts
        except:
            return 'Failed', 400
        
        

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
            json = request.get_json()
            workouts = mongo.db.workouts
            workouts.insert_one(json.workout)
            return json.workout, 201
        except:
            return 'Failed', 400


api.add_resource(GetWorkouts, '/workouts')
api.add_resource(AddWorkout, '/workout')
api.add_resource(ChangeWorkout, '/workout/<string:id>')

if __name__ == '__main__':
    app.run(debug=True)
