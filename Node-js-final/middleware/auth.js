// authenticationMiddleware.js
import jwt from "jsonwebtoken";
import { UnauthenticatedError } from "../errors/index.js";

const authenticationMiddleware = (req, res, next) => {
    console.log("내가 만든 쿠키: ");
    console.log(req.headers.cookie);
    const cookies = req.headers.cookie;

    if (!cookies) {
        throw next(new UnauthenticatedError("No cookies provided"));
    }

    const tokenCookie = cookies
        .split(";")
        .find((cookie) => cookie.trim().startsWith("token="));

    if (!tokenCookie) {
        throw next(new UnauthenticatedError("No token cookie provided"));
    }

    const token = tokenCookie.split("=")[1];

    if (!token) {
        throw next(new UnauthenticatedError("No token provided"));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const { id, username } = decoded;
        req.user = { id, username };
        next();
    } catch (error) {
        throw next(new UnauthenticatedError('Not authorized to access this route'));
    }
    // middleware/auth.js 수정
};

export default authenticationMiddleware;
