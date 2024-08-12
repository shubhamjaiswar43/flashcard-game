const jwt = require("jsonwebtoken")
const JWT_SECRET = process.env.JWT_SECRET;
const fetchuser = async (req, res, next) => {
    try {
        const authToken = req.header("authToken");
        if (!authToken)
            return res.status(401).json({ success: false, "Error": "authToken Not Exists!!!" })
        const user = await jwt.verify(authToken, JWT_SECRET);
        if (!user)
            return res.status(401).json({ success: false, "Error": "Invalid authToken!!!" })
        req.body.username = user.username;
        next();
    } catch (err) {
        res.json({ Error: err.msg });
    }
}

module.exports = { fetchuser };