const { addAdmin, getAdmins, getAdminByUsername } = require('../db/admin');
const jwt = require("jsonwebtoken");
const bjcryptjs = require("bcryptjs");
const JWT_SECRET = process.env.JWT_SECRET;
const signup = async (req, res) => {
    try {
        const { name, username, password } = req.body;
        const admins = await getAdmins();
        for (const admin of admins) {
            if (admin.username === username) {
                return res.status(400).json({ "Error": "Username Exists, Please Choose Another Username" });
            }
        }
        const salt = await bjcryptjs.genSalt(10);
        const hashedPass = await bjcryptjs.hash(password, salt);
        const resp = await addAdmin(name, username, hashedPass);
        const authToken = await jwt.sign({ username }, JWT_SECRET);
        return res.json({ "success": true, authToken });
    } catch (err) {
        res.json({ "Error": err.msg });
    }
}

const signin = async (req, res) => {
    console.log(req.body);
    try {
        const { username, password } = req.body;
        const user = await getAdminByUsername(username);
        if (user.length === 0) {
            return res.status(400).json({ "Error": "Invalid Credentials" })
        }
        const verify = await bjcryptjs.compare(password, user[0].password);
        if (!verify) {
            return res.status(400).json({ "Error": "Invalid Credentials" })
        }
        const authToken = jwt.sign({ username }, JWT_SECRET);
        res.json({ "success": true, authToken });
    } catch (err) {
        res.json({ "Error": err.msg });
    }
}

module.exports.signup = signup;
module.exports.signin = signin;