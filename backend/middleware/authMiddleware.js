import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  let token = req.headers.authorization?.split(" ")[1];
  if (!token) return next(); // Allow guest uploads if desired

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};