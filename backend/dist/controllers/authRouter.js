import express from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";
const authRouter = express.Router();
authRouter.post("/genTokenCookie", (req, res, next) => {
    var _a;
    let userId = req.body.userValue;
    console.log("req.body: ", req.body);
    let jwtSecretKey = (_a = process.env.JWT_SECRET_KEY) !== null && _a !== void 0 ? _a : "CHICKEN";
    let data = {
        time: Date(),
        userId: userId,
    };
    let token;
    token = jwtSecretKey
        ? jwt.sign(data, jwtSecretKey, { expiresIn: "18000000" })
        : res.status(400).send({ message: "JWTSECRETKEY EMPTY" });
    res.cookie("jwtToken", token, {
        httpOnly: true,
    });
    res.send({ message: "Secure cookie set, expiring in 30 mins." + token });
});
authRouter.get("/valTokenCookie", (req, res) => {
    var _a, _b;
    let jwtSecretKey = (_a = process.env.JWT_SECRET_KEY) !== null && _a !== void 0 ? _a : "CHICKEN";
    let token = (_b = req.headers) === null || _b === void 0 ? void 0 : _b.cookie;
    let tokenFound;
    if (token) {
        tokenFound = token.match(/jwtToken=([\w\.?\-?]+)/);
        console.log("Full token", token);
    }
    if (tokenFound && tokenFound[1] && jwtSecretKey) {
        try {
            console.log("tokenfound: ", tokenFound[1]);
            const decoded = jwt.verify(tokenFound[1], jwtSecretKey);
            if (typeof decoded != "string") {
                console.log("decoded: ", decoded);
                return res.status(200).send({ message: "success", userId: decoded.userId });
            }
            else {
                return res.status(401).send({ message: "This is an error!" });
            }
        }
        catch (error) {
            return res.status(401).send({ message: "This is an error!" + error });
        }
    }
    return res.status(401).send({ message: "This is an error!" });
});
authRouter.post("/genTokenLocalS", (req, res, next) => {
    var _a;
    let userId = req.body.userValue;
    console.log("req.body: ", req.body);
    let jwtSecretKey = (_a = process.env.JWT_SECRET_KEY) !== null && _a !== void 0 ? _a : "CHICKEN";
    let data = {
        time: Date(),
        userId: userId,
    };
    let token;
    token = jwtSecretKey
        ? jwt.sign(data, jwtSecretKey, { expiresIn: "1800s" })
        : res.status(400).send({ message: "JWTSECRETKEY EMPTY" });
    res.send({ token });
});
authRouter.get("/valTokenLocalS", (req, res) => {
    var _a;
    let jwtSecretKey = (_a = process.env.JWT_SECRET_KEY) !== null && _a !== void 0 ? _a : "CHICKEN";
    let token = req.header("Authorization");
    if (token && jwtSecretKey) {
        token = token.split(" ")[1];
        console.log("token: ", token);
        try {
            const decoded = jwt.verify(token, jwtSecretKey);
            if (typeof decoded != "string") {
                console.log("decoded: ", decoded);
                return res.status(200).send({ message: "success", userId: decoded.userId });
            }
            else {
                return res.status(401).send({ message: "This is an error!" });
            }
        }
        catch (error) {
            return res.status(401).send({ message: "This is an error!" + error });
        }
    }
    return res.status(401).send({ message: "This is an error!" });
});
export default authRouter;
//# sourceMappingURL=authRouter.js.map