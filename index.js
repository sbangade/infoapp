import express from 'express';
import routes from './src/routes/registerRoutes';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const PORT = 8075;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors()); 

routes(app);
// serving static files
// app.use(express.static('Images'));
// app.post('/driver',requireLogin) 
//     (async (req, res) => {
//         console.log('testing')
//         console.log(req.user._id)
//         const {placeID} = req.params;
//         const newPlace = new Pilot(req.body);
//         //console.log(newPlace);
//         //const data = requireLogin();
        
//         const user = await Register.findById(req.user._id);
//         newPlace.poster = user;
//         await newPlace.save();
//         user.favlist.push(newPlace);
//         await user.save();
//         await Passenger.find({},{"_id":0},(err, login) => {
//                    if (err) {
//                        res.send(err);
//                    }
//                    res.json(login);
//                });});

app.get('/', (req, res) =>
    res.send(`Welcome to Registration API`)
);

// mongoose connection
mongoose.Promise = global.Promise;
// mongoose.connect('mongodb+srv://kalironRegister:infotech@cluster0.bo8z8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// });
// mongoose.set('useFindAndModify', false);

mongoose.connect('mongodb+srv://kalironRegister:infotech@cluster0.bo8z8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => app.listen(PORT, () => console.log(`Registration API Server is running on port: ${PORT}`)))
.catch((error) => console.log(error.message));

mongoose.set('useFindAndModify', false);

//mongoose.connect('mongodb+srv://shubham:1234@cluster0.mqt4m.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
//.then(() => app.listen(POT, () => console.log(`Server is running on port: ${POT}`)))
//.catch((error) => console.log(error.message));

//mongoose.set('useFindAndModify', false);

// bodyparser setup






// app.listen(PORT, () => 
//     console.log(`Server is running on port ${PORT}`)
// );