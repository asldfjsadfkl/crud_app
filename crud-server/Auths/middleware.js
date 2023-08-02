const jwt = require("jsonwebtoken");
const User = require("../MongoDB/User_Model");
const ErrorHandler = require("../utils/ErrorHandler");

exports.isAuthenticated = async (req, res, next) => {
  
  const { token } = req.cookies;

  console.log(token , "   auth func");

  if (!token) {
    return next(new ErrorHandler("Please Login First!", 401));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await User.findById(decoded.id);

  next();
};

////admin auth.js
// exports.authorizeRole = (...roles) => {
//   return (req, res, next) => {
//     if (!roles.includes(req.user.role)) {
//       return next(
//         new ErrorHandler(
//           `${req.user.role} is Not allowed to access this resource!`,
//           403
//         )
//       );
//     }
//     next();
//   };
// };
