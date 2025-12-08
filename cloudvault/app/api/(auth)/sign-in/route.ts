import { NextResponse } from "next/server";
import { connectDB } from "@/lib/database/connection";
import User from "@/models/user";
import bcrypt from "bcryptjs";
import { generateToken } from "@/lib/auth/auth";

export async function POST(req: Request) {
  try {
    await connectDB();
    const { email, password } = await req.json();

    if (!email || !password)
      return NextResponse.json({ message: "All fields required" }, { status: 400 });

    const user = await User.findOne({ email }).select("+password");
    if (!user)
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });

    const token = generateToken(user);

    const response = NextResponse.json({ message: "Login success" });

    response.cookies.set("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 7 * 24 * 60 * 60,
    });

    return response;
  } catch (error:any) {
    return NextResponse.json({ message: "Server error", error: error?.message }, { status: 500 });
  }
}
