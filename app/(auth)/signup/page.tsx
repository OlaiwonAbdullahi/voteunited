"use client";
import Link from "next/link";
import { Eye, EyeClosed, LockKeyhole, Mail } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

// Define proper types for form data and errors
interface FormData {
  email: string;
  name: string;
  password: string;
}

interface FormErrors {
  email?: string;
  name?: string;
  password?: string;
  submit?: string;
}

const SignUpPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    name: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  return (
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
            Create Your Account:)
          </h1>
          <p className="text-gray-600 mt-1">
            Get Started by creating your account
          </p>
        </div>

        <form className="space-y-5">
          <div className="space-y-1">
            <label htmlFor="name" className="text-sm font-medium text-gray-700">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                className={`pl-10 w-full p-3 border ${
                  errors.name ? "border-red-500" : "border-gray-300"
                } rounded-none focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors`}
                required
              />
            </div>
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name}</p>
            )}
          </div>
          <div className="space-y-1">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                className={`pl-10 w-full p-3 border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } rounded-none focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors`}
                required
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          <div className="space-y-1">
            <div className="flex justify-between">
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-700"
              >
                Password
              </label>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <LockKeyhole className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className={`pl-10 w-full p-3 border ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } rounded-none focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors`}
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPassword ? (
                  <EyeClosed className="h-5 w-5 text-gray-400" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          {errors.submit && (
            <div
              className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <span className="block sm:inline text-sm">{errors.submit}</span>
            </div>
          )}

          <div className="pt-2">
            <Button
              type="submit"
              className="w-full bg-primary rounded-none text-white p-3 h-12  hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors disabled:opacity-75 disabled:cursor-not-allowed flex justify-center items-center"
            >
              Sign In
            </Button>
          </div>
        </form>

        <div className="mt-6">
          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-gray-600 hover:text-gray-500 transition-colors"
            >
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
