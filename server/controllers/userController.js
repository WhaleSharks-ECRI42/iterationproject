const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const userController = {};



userController.createUser = async (req, res, next) => {
  console.log('Entered createUser middleware');
  try{
  const { username, password } = req.body;
  console.log('username :', username);
  console.log('password :', password);
    if(!username || !password){
      return next({
        log: 'Missing username or password in userController.createUser',
        status: 400,
        message: 'Username and Password required'
      })
    }

    // ======== CHECK IF USER ALREADY EXISTS  ============
    const checkUser = await User.findOne({ username });
    console.log('checkUser', checkUser); 
    if(checkUser){
      console.log('username exits');
      //im a teapot
      return res.status(418)
    };

    const salt = await bcrypt.genSalt(10);
    console.log('salt completed', salt);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log('password HASHED');
  
    // const user = await User.create({
    //   username, password: hashedPassword}
    // );
    const user = new User({
      username, 
      password: hashedPassword
    })

    console.log('user:', user)
    res.locals.userId = user.id;
    await user.save();
    return next(); 
  }catch(err){
    return next({
      log: 'There was a problem in userController.createUser',
      status: 400,
      message: 'Problem with the username or password'
    })
  }
};


userController.verifyUser = async (req, res, next) => {
  console.log('enters verifyUser');
  try {
    const { username, password } = req.body; 
    console.log('username:', username);
    console.log('password: ', password);  
    
    // FRONTEND : send username and password in req.body
    if (!username || !password)
      return next({
        log: "Missing username or password in userController.verifyUser",
        status: 400,
        message: { err: "Invalid username or password" },
      });
    const user = await User.findOne({ username });
    console.log('user is: ', user);
    if (!user) {
      return next({
        log: "Failed findOne",
        status: 400,
        message: { err: "Invalid username" },
      });
    } else {
        try {
          const result = await bcrypt.compare(password, user.password);
          if (!result) {
            return next({
              log: "Wrong password in userController.verifyUser",
              status: 400,
              message: { err: "Incorrect password" },
            });
          } else {
            // ASSIGN RES.LOCALS.USERID for cookie use
            res.locals.userId = user.id // SSID : 6621177equt39
            return next(); 
          }
        } catch (err) {
            console.log(err); 
        }
    }
  } 
  catch (err) {
    return next({
      log: "Error in userController.verifyUser",
      status: 500,
      message: { err: "An error occured" },
    });
  }
};


// Cookies

module.exports = userController;



