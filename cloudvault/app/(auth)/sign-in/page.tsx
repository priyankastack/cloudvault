"use client";
import Link from "next/link";
import {useState,useEffect} from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/authContext";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const[loading,setLoading]=useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const{isAuthenticated, user}=useAuth();
  const router=useRouter();
   const handleSignin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await fetch("/api/sign-in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Something went wrong");
      } else {
        setSuccess(data.message);
        console.log("logged user info is here:",data.user)
        setEmail("");
        setPassword("");
      window.location.href = (data.user.role === "employee") ? "/upload" : "/sign-in";
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    // Do nothing while loading
     if (!loading && isAuthenticated) {
      // If admin, go to admin dashboard
      if (user?.role === "employee") router.push("/upload");
      else router.push("/")}
  }, [loading, isAuthenticated, user, router]);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6 text-black">
      <div className="w-full max-w-sm bg-white p-6 rounded-xl shadow">
        <h2 className="text-2xl font-semibold text-center mb-6">Sign In</h2>
        <form className="space-y-4" onSubmit={handleSignin} >
          <input 
            type="email" 
            placeholder="Email"
            value={email}
              onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border rounded-md"
          />
          <input 
            type="password" 
            placeholder="Password"
            value={password}
              onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border rounded-md"
          />

          <button className="w-full bg-blue-600 text-white p-3 rounded-md">
            Sign In
          </button>
        </form>

        <p className="text-center mt-4">
          Don’t have an account?{" "}
          <Link href="/sign-up" className="text-blue-600">
            Register
          </Link>
        </p>
      
      </div>
    </div>
  );
}
