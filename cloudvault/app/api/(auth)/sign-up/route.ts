import { NextResponse } from "next/server";
import { connectDB } from "@/lib/database/connection";
import User from "@/models/user";
import { generateToken } from "@/lib/auth/auth";

export async function POST(req: Request) {
  try {
    await connectDB();
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ message: "All fields required" }, { status: 400 });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return NextResponse.json({ message: "Email already exists" }, { status: 400 });
    }

    const user = await User.create({ name, email, password });

    // Generate token
    let token: string;
    try {
      token = generateToken(user); // generateToken now always returns a string
    } catch (error) {
      console.error("Token generation failed:", error);
      return NextResponse.json({ message: "Server error generating token" }, { status: 500 });
    }

    // Create response
    const response = NextResponse.json({ message: "User registered successfully" });

    // Set cookie safely
    response.cookies.set("authToken", token, {
      httpOnly: true,
      secure: true,
      path: "/",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server error", error }, { status: 500 });
  }
}
