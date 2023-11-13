import jwt from "jsonwebtoken";
import { BadRequestError } from "../errors/index.js";

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw new BadRequestError("Please provide email and password");
  }
  const id = new Date().getDate();

  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  res.setHeader('Set-Cookie', 'token='+token+'; Max-Age=86400; HttpOnly');
  // res.cookie("token", token, { maxAge: 24 * 60 * 60 * 1000 ,httpOnly:true});

  res.status(200).json({ msg: "잘 만들어짐", token });
};

const dashboard = async (req, res) => {
  const luckyNumber = Math.floor(Math.random() * 100);
  res.status(200).json({
    msg: `Hello, ${req.users.username}`,
    secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
  });
};

export { login, dashboard };