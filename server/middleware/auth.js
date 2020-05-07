const { User } = require('../models/User');
const jwt = require('jsonwebtoken');

let auth = (req, res, next) => {
  try {
    console.log('heereeeee');
    console.log('token  ', req.headers.authorization);
    const authHeader = req.headers.authorization;
    const token = authHeader.split(' ')[1];
    if (!authHeader || !token || token === '') {
      req.isAuthorized = false;
      next();
    }
    console.log('heereeeee 11111111');
    console.log(token , process.env.JWTSECRETKEY);
    // const decoded = jwt.verify(token, 'bookingappsecretkey');
    // console.log('verify' , decoded);
    // console.log('heereeeee 000000000');
    // if (!decoded) {
    //   req.isAuthorized = false;
    //   next();
    // }
    // console.log('heereeeee 22222222')
    // req.isAuthorized = true;
    // req.user = {
    //   id: decoded.userId,
    //   email: decoded.email,
    // };
    req.isAuthorized = true;
    next();
  } catch (error) {
    req.isAuthorized = false;
    console.log('theree');
    next();
  }
};

module.exports = { auth };
