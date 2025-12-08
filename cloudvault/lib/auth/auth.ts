import jwt from "jsonwebtoken";

export function generateToken(user: any) {
  const payload = {
    id: user._id,
    email: user.email,
    role: user.role || "user",
  };
  console.log("here is the jwt secret key:",process.env.JWT_SECRET)

  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
}
