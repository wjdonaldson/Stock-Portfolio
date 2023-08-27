module.exports = function(req,res,next) {
    // status code of 401 if unauthorized
    if (!req.user) return res.status(401).json("Unauthorized")
    next();
}