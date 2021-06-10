import { addnewRegister,
         getRegister,
         userLogin,
         getUserProfile,
         getEmail,
         addDriver,
         addUserRequest,
         updateDriver,
         updatePassenger,
         getPassengerWithId,
         tom
} from '../controller/registerController';
import requireLogin from '../middleware/requireLogin';
import upload from '../middleware/upload';
// , upload.single('Image'

const routes = (app) => {
app.route('/register', requireLogin)
    .get((req,res, next) => {
        console.log(`Request from: ${req.originalUrl}`)
        console.log(`Request type: ${req.method}`)
        next();
    }, getRegister)
    .post(addnewRegister);

    // Login Route
app.route('/login')
    .post(userLogin);
 
// get a specific user's profile    
app.route('/profile/:userID')
    .get(getUserProfile) 

// Forgot password    
app.route('/forgot')
    .post(getEmail);

// driver posting route    
app.route('/driver',requireLogin) 
    .post(addDriver);

app.route('/driver/:productID')
    .put(updateDriver);    

// passenger posting    
app.route('/user/:placeID')
    .get(getPassengerWithId)
    .post(addUserRequest)
    .put(updatePassenger);
}    
    
// update passenger posting



export default routes;