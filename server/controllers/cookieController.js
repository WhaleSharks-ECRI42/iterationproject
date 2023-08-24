const User = require('../models/userModel')
const cookieParser = require('cookie-parser');

const cookieController ={};

cookieController.setSSIDCookie = async (req, res, next) => {
  try{
    const { userId } = res.locals;
    await res.cookie('ssid', userId, {httpOnly: true});
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
    console.log('entered try block in getSSID');

    // console.log("REQ COOKIES", req.cookies)
    // const ssid = req.cookies.ssid;
    // console.log('SSID', ssid)
    // res.locals.SSID = ssdid;


    // console.log('req', req.cookies.ssid);
    // console.log('res', res.cookie.ssid);
    const ssid = res.cookie.ssid; //<-- OMITTED FOR TESTING
    // const ssid = "64e6529c445d6e4d5007c376"
    // console.log('ssid', ssid);
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