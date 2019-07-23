module.exports = (req, res, next) => {
  // this will check if the user is logged in/ currently has a session
  if (req.session && req.session.username) {
    next();
  } else {
    res.status(401).json({ message: `I'm sorry, guy!~` });
  }
};
