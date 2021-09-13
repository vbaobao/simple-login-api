require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) return res.status(403).send('Access denied.');
    const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY);
    req.user = decoded;
    next();
  } catch (err) {
    console.log(err);
    res.status(400).send('Invalid token.');
  }
};
