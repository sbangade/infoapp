import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const RegistersSchema = new Schema({
    FirstName: {
        type: String,
        required: 'Enter first name'
    },
    LastName: {
        type: String,
        required: 'Enter first name'
    },
    DOB: {
        type: Date,
        required: 'Enter Date of Birth'
    },
    Is_driver_or_passenger: {
        type: Boolean
        // true for passenger and false for driver
    },
    Image: {
        type: String
    },
    Mobile: {
        type: Number,
        required: 'Enter your mobile number'

    },
    Email: {
        type: String,
        required: 'Enter your Email address'

    },
    Gender: {
        type: String
    },
    Car_details: {
        type: String
    },
    Password: {
        type: String,
        required: 'Enter your password'
    },
    plist: [{
        type: Schema.Types.ObjectId,
        ref: 'Passenger'
    }],
    favlist: [{
        type: Schema.Types.ObjectId,
        ref: 'Pilot'
    }]
});

export const PilotSchema = new Schema({
    FindPassenger: {
        type: Boolean,
    },
    Locality: {
        type: String,
        required: 'Enter your location'
    },
    RideType: {
        type: String,
        required: 'Enter ride type'
    },
    myfavorite: {
        type: Schema.Types.ObjectId,
        ref: 'Register'
    }
   
});
export const passengerSchema = new Schema({
    PickUp: {
        type: String,
        required: 'Enter your pickup location'
    },
    DropOff: {
        type: String,
        required: 'Enter your drop off location'
    },
    Time: {
        type: Number
    },
    Description: {
        type: String,
       required: 'Enter your description'
    },
    poster: {
        type: Schema.Types.ObjectId,
        ref: 'Register'
    }
});
