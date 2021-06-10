import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import {JWT_SECRET} from '../config/keys';
import requireLogin from '../middleware/requireLogin';
// const jwt = require('jsonwebtoken')
// const {JWT_SECRET} = require('../config/keys')
// const requireLogin = require('../middleware/requireLogin')
import { RegistersSchema, PilotSchema, passengerSchema } from '../models/registerModel';


const Register = mongoose.model('Register', RegistersSchema);
const Passenger = mongoose.model('Passenger', passengerSchema);
const Pilot = mongoose.model('Pilot', PilotSchema);

export const addnewRegister = (req, res, next) => {
  
//   let newRegister = new Register(req.body);
//  // if(req.file){
//    //        newRegister.Image = req.file.path
//      //    }
//   newRegister.save((err, login) => {
//         if (err) {
//             res.send(err);
//         }
//         res.json(login);
//     });
  // if(req.body.Email.length > 1 && req.body.FirstName.length > 1 && req.body.LastName.length > 1 && req.body.DOB.length > 1 && req.body.Mobile.length > 1 && req.body.Password.length > 1){
  // Register.find({ Email: req.body.Email })
  // .exec()
  // .then(user => {
  //   if (user.length < 1) {
  //     newRegister.save();
  //     res.send('Login successfully!')
  //   }else{
  //       res.send('email already exist')
  //   }
  // });}
  // else{
  //   res.send("Please enter the medatory fields")
  // }

    let newRegister = new Register(req.body);
    if(req.body.Email.length > 1){
    Register.find({ Email: req.body.Email })
    .exec()
    .then(user => {
      if (user.length < 1) {
        //if(req.file){
         // newRegister.Image = req.file.path
        //}
        newRegister.save();
        res.send('Login successfully!')
      }else{
          res.send('email already exist')
      }
    });}
    else{
      res.send("Please enter the medatory fields")
    }    
}



export const getRegister = (req, res) => {
    Register.find({}, (err, register) => {
        if (err) {
            res.send(err);
        }
        requireLogin(req, res);
        res.sendStatus(200);
        //res.json(register);
    });
}

export const userLogin = (req, res, next) => {
    Register.find({ Email: req.body.Email })
    .exec()
    .then(user => {
      if (user.length < 1) {
        return res.status(401).json({
          message: "Wrong Username"
        });
      }else{
        Register.find({ Password: req.body.Password })
        .exec()
        .then(user => {
            if (user.length < 1) {
              return res.status(401).json({
                message: "Wrong Password"
              });
            }else{
              const token = jwt.sign({_id:user._id},JWT_SECRET)
              res.json({token})
            }
        });
      }
    });
}
 
// Get user's profile by ID
export const getUserProfile = (req, res) => {
    Register.findById(req.params.userID,{"_id":0, "FirstName":1,"LastName":1,"DOB":1,"Is_driver_or_passenger":1,"Image":1,"Mobile":1,"Email":1,"Gender":1,"Car_details":1}, (err, product) => {

        if (err) {
            res.send(err);
        }
        
        res.json(product);
    });
}
export const getEmail = (req, res) => {
    Register.find({ Email: req.body.Email })
    .exec()
    .then(user => {
      if (user.length < 1) {
        return res.status(401).json({
          message: "Email doesnt exist."
        });
      }else{
        return res.status(201).json({
            message: "Login Successfully"
          });
            }
        });
      }
//let ra      
export const tom = (requireLogin) => {
  //let ra = requireLogin
  console.log('test')
  console.log(requireLogin)
   return addDriver
  }

export const addDriver = async (req, res) => {
  const {placeID} = req.params;
  const newPlace = new Pilot(req.body);
  //console.log(newPlace);
  //const data = requireLogin();
  
  const user = await Register.findById(ra.user._id);
  newPlace.poster = user;
  await newPlace.save();
  user.favlist.push(newPlace);
  await user.save();
  await Passenger.find({},{"_id":0},(err, login) => {
             if (err) {
                 res.send(err);
             }
             res.json(login);
         });
  // let newDriver = new Pilot(req.body);
  // newDriver.save((err, driver) => {
  //     if (err) {
  //         res.send(err);
  //     }
  //     Passenger.find({},{"_id":0},(err, login) => {
  //         if (err) {
  //             res.send(err);
  //         }
  //         res.json(login);
  //     });
  //     //  res.json(driver);
  // });
       
    
    }

// update driver
export const updateDriver = (req, res) => {
    Pilot.findOneAndUpdate({_id: req.params.productID}, req.body, { new: true, useFindAndModify: false }, (err, product) => {
        if (err) {
            res.send(err);
        }
        res.json(product);
    });
  }    

// passengers posting

export const addUserRequest = async (req, res) => {
  const {placeID} = req.params;
  const newPlace = new Passenger(req.body);
  console.log(newPlace);
  const user = await Register.findById(placeID);

  newPlace.poster = user;
  await newPlace.save();
  user.plist.push(newPlace);
  await user.save();
  res.status(201).json(newPlace);
    // let newUser = new Passenger(req.body);
    // newUser.save((err, driver) => {
    //     if (err) {
    //         res.send(err);
    //     }else{
    //     Register.find({Is_driver_or_passenger: {$eq: true}},{"_id":0,"FirstName":1,"LastName":1,"DOB":1,"Image":1,"Mobile":1,"Email":1,"Gender":1,"Car_details":1},(err, login) => {
    //         if (err) {
    //             res.send(err);
    //         }
    //         res.json(login);
    //     });
        
    //     }
    // });

}

export const getPassengerWithId = async (req, res) => {
  const {placeID} = req.params;
    const userpost =  await Register.findById(placeID).populate('favlist');
    res.status(200).json(userpost.favlist) ;
  // Register.findById({_id: req.params.placeID},(err, product) => {

  //     if (err) {
  //         res.send(err);
  //     }
      
  //     res.json(product);
  // });
}
export const updatePassenger = (req, res) => {
    Passenger.findOneAndUpdate({_id: req.params.placeID}, req.body, { new: true, useFindAndModify: false }, (err, product) => {
        if (err) {
            res.send(err);
        }
        res.json(product);
    });
  }     