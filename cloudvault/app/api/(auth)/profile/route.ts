import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import {connectDB} from "@/lib/database/connection";
import User from "@/models/user"; // adjust model if needed

connectDB();

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("authToken")?.value;

    if (!token) {
      return NextResponse.json(
        { message: "Not authenticated", user: null },
        { status: 401 }
      );
    }

    if (!process.env.JWT_SECRET) {
      console.error("❌ JWT_SECRET is missing in environment");
      return NextResponse.json(
        { message: "Server configuration error" },
        { status: 500 }
      );
    }

    // Verify JWT
    let decoded: any;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      return NextResponse.json(
        { message: "Invalid token" },
        { status: 401 }
      );
    }

    // Fetch user details
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "User fetched successfully", user },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("❌ Error fetching profile:", error);
    return NextResponse.json(
      { message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}
