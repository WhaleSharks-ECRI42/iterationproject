const User = require('../models/userModel')

const cookieController ={};

cookieController.setSSIDCookie = async (req, res, next) => {
  try{
    const { userId } = res.locals;
    await res.cookies('ssid', userId, {httpOnly: true});
    return next();
  }catch(err){
    return next({
      log: 'There was an error in cookieController.setSSIDCookie, error: ', err,
      status: 400,
      message: "There was a problem setting the SSID"
    })
  }
};

cookieController.getSSID = async (req, res, next) => {
  try{
    const {ssid} = req.cookies;
    res.locals.ssid = ssid;
    return next();
  }catch(err){
    return next({
      log: 'There was an error in cookieController.getSSID, error: ', err,
      status: 400,
      message: "There was a problem getting the SSID"
    })

  }
}

module.exports = cookieController;