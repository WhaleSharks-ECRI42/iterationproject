const User = require('../models/userModel')

const userController = {};



userController.createUser = async (req, res, next) => {
try{
const { username, password } = req.body;
  if(!username || !password){
    return next({
      log: 'Missing username or password in userController.createUser',
      status: 400,
      message: 'Username and Password required'
    })
  }

  const checkUser = await User.findOne({username});
  if(!checkuser){
    return res.direct('/Auth/Login');
  };

  const salt = await bcrypt.getSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = await User.create({username, password: hashedPassword});

  res.locals.userId = user.id;
  return next(); 
}catch(err){
  return next({
    log: 'There was a problem in userController.createUser, error: ', err,
    status: 400,
    message: 'Problem with the username or password'
  })
}
};


userController.verifyUser = async (req, res, next) => {
  try {
    const { username, password } = req.body; // FRONTEND : send username and password in req.body
    if (!username || !password)
      return next({
        log: "Missing username or password in userController.verifyUser",
        status: 400,
        message: { err: "Invalid username or password" },
      });
    const user = await User.findOne({ username });
    if (!user) {
      return res.redirect("/Auth/Signup");
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



