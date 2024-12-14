import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useToast } from "@/components/ui/use-toast";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      toast({
        title: "Success",
        description: "Account created successfully!",
      });
      navigate("/");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to create account. Please try again.",
      });
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      toast({
        title: "Success",
        description: "Account created successfully with Google!",
      });
      navigate("/");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to create account with Google.",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left side - Image */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <img
          src="https://dnm.nflximg.net/api/v6/BvVbc2Wxr2w6QuoANoSpJKEIWjQ/AAAAQU247dqn9_X42p8rRBMYptceaWn9a9QaHR6roilhJtBnHhLQ09XrwDEc8Rt7kGWAis-JnxyqMbgJ__8FPsmSSOmF8eSFNY-QUgQS9su_JWkaR6oTiNSQ9JhZEr252l5CjvCldpIDDdUmQWA4T_IzgZj6WQw.jpg?r=46a"
          alt="Movie Background"
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
        <div className="absolute bottom-10 left-10 text-white max-w-lg">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Join our community</h2>
          <p className="text-base sm:text-lg text-gray-300">
            Create an account to access exclusive content and personalized recommendations.
          </p>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-gradient-to-br from-[#0f1219] via-[#171b2c] to-[#1f1635] p-4 sm:p-8">
        <div className="w-full max-w-md space-y-6 sm:space-y-8">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Create your account</h2>
            <p className="mt-2 text-sm sm:text-base text-gray-400">Join us to get access to exclusive content</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Button 
              variant="outline" 
              className="w-full bg-white/5 hover:bg-white/10 border-violet-500/20"
              onClick={handleGoogleSignUp}
            >
              <FaGoogle className="mr-2 text-red-500" />
              <span className="text-sm sm:text-base">Google</span>
            </Button>
            <Button 
              variant="outline" 
              className="w-full bg-white/5 hover:bg-white/10 border-violet-500/20"
            >
              <FaFacebook className="mr-2 text-blue-500" />
              <span className="text-sm sm:text-base">Facebook</span>
            </Button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-violet-900/20"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 text-gray-400 bg-[#171b2c]">Or continue with</span>
            </div>
          </div>

          <form onSubmit={handleEmailSignUp} className="space-y-4 sm:space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                Full Name
              </label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                className="mt-1 bg-white/5 border-violet-500/20 text-white placeholder:text-gray-500"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                Email
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="mt-1 bg-white/5 border-violet-500/20 text-white placeholder:text-gray-500"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                Password
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a strong password"
                className="mt-1 bg-white/5 border-violet-500/20 text-white placeholder:text-gray-500"
              />
            </div>

            <Button type="submit" className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700">
              Create Account
            </Button>
          </form>

          <p className="text-center text-sm sm:text-base text-gray-400">
            Already have an account?{" "}
            <Link to="/signin" className="text-violet-400 hover:text-violet-300">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;