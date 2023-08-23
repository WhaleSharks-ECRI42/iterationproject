const Session = require('../models/sessionModel');

const sessionController = {};


sessionController.isLoggedIn = async (req, res, next) => {

  try{
    const {ssid} = req.cookies;
    const session = await Session.findOne({cookiesId:ssid});
    if(!session){
      return res.redirect('/Auth/Signup');
    }else{
      return next();
    }

  }catch(err){
    return next({
    log: 'There was an error in sessionController.isLoggedIn, error: ', err,
    status: 400,
    message: 'An error occured in Session'
    })
  }
}

sessionController.startSession = async (req, res, next) => {
  try{
    const { userId } = res.locals;
    await Session.create({cookiesId : userId});
  }catch(err){
    return next({
      log: 'There was an error in sessionController.startSession, error: ', err,
      status: 400,
      message: 'An error occured starting Session'
      })
  }
};
module.exports = sessionController;