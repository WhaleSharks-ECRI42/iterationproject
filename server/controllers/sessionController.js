const Session = require('../models/sessionModel');
const cookieParser = require('cookie-parser');
const sessionController = {};



sessionController.isLoggedIn = async (req, res, next) => {

  try{
    const {ssid} = req.cookies;
    const session = await Session.findOne({cookiesId:ssid});
    if(!session){
      return next({
        log: 'There was an error in sessionController.isLoggedIn, error: ', err,
        status: 400,
        message: 'An error occured in Session'
        });
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
  console.log('enters startSession');
  let ssid, session;
  if(req.cookies){ 
    console.log('ya got a cookie')
    ssid = req.cookies.ssid;
    console.log('ssid:', ssid);
    session = await Session.findOne({cookieId:ssid});
  }
  console.log('session', session);
  if(!session){
    try{
      const { userId } = res.locals;
      await Session.create({cookieId : userId});
      return next(); 
    }catch(err){
      return next({
        log: 'There was an error in sessionController.startSession',
        status: 400,
        message: 'An error occured starting Session'
      } )
    }
  }else{
    return next();
  }
}
module.exports = sessionController;