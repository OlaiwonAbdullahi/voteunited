"use client";
import Link from "next/link";
import Image from "next/image";
import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const GoogleLoginButton = () => {
  const router = useRouter();
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log(tokenResponse);
      try {
        const response = await fetch(
          "https://voteunited.laravel.cloud/api/auth/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              access_token: tokenResponse.access_token,
            }),
          }
        );
        console.log(response);

        if (!response.ok) {
          throw new Error("Login failed");
        }
        const data = await response.json();
        toast.success("Login successful!");
        console.log("Login success:", data);
        localStorage.setItem("token", data.access_token);
        localStorage.setItem("user", JSON.stringify(data.user));
        router.push("/");
      } catch (error) {
        console.error("Login failed:", error);
        toast.error("Login failed. Please try again.");
      }
    },
    onError: () => {
      console.log("Login Failed");
      toast.error("Google Login Failed");
    },
  });

  return (
    <button
      onClick={() => login()}
      className="w-full bg-white rounded-none border cursor-pointer border-gray-200 gap-2 text-gray-700 p-3 h-12 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors disabled:opacity-75 disabled:cursor-not-allowed flex justify-center items-center"
    >
      <Image src="/google.jpeg" alt="google" width={24} height={24} />
      <div className="flex items-center gap-2">
        <span>Log in with Google</span>
      </div>
    </button>
  );
};

const LoginPage: React.FC = () => {
  return (
    <GoogleOAuthProvider clientId="904187096076-pr1acp7ricmtc2t3cdap19fi1q6j5nc7.apps.googleusercontent.com">
      <div className="flex relative flex-col items-center justify-center fontroboto min-h-screen bg-gray-50 p-4 w-full">
        <div className="absolute top-6 left-6">
          <Link href="/auth" className="flex items-center gap-2 font-mont">
            <Image src="/logo.jpg" alt="logo" width={100} height={100} />
          </Link>
        </div>
        <div className="bg-white border border-gray-200 p-8 rounded-none shadow-md w-full max-w-md">
          <div className="flex flex-col items-center mb-6">
            <h1 className="text-2xl font-bold text-primary fontmont">
              Welcome Back
            </h1>
            <p className="text-gray-600 mt-1">Sign in to your account</p>
          </div>
          <div className="flex flex-col items-center">
            <GoogleLoginButton />
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default LoginPage;
