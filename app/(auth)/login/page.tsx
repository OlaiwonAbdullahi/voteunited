"use client";
import Link from "next/link";
import Image from "next/image";
import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";
import toast from "react-hot-toast";

const GoogleLoginButton = () => {
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
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

        if (!response.ok) {
          throw new Error("Login failed");
        }

        const data = await response.json();
        toast.success("Login successful!");
        console.log("Login success:", data);
        // You might want to store the token and redirect here
        // localStorage.setItem('token', data.token);
        // router.push('/dashboard');
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
    <GoogleOAuthProvider clientId="649644210746-pripag64sp9svnrumn4oto05eo9le8bp.apps.googleusercontent.com">
      <div className="flex relative flex-col items-center justify-center fontroboto min-h-screen bg-gray-50 p-4 w-full">
        <div className="absolute top-6 left-6">
          <Link href="/" className="flex items-center gap-2 font-mont">
            <Image src="/flag.png" alt="flag" width={24} height={34} />
            <span className=" text-xl font-bold text-primary sm:inline">
              Vote United
            </span>
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

          <div className="mt-6">
            <p className="text-center text-sm text-gray-600">
              Don&apos;t have an account?{" "}
              <Link
                href="/signup"
                className="font-medium text-gray-600 hover:text-gray-500 transition-colors"
              >
                Create account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default LoginPage;
