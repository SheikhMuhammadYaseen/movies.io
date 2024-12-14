import { Button } from "./ui/button";
import { Link } from "react-router-dom";

export const FreeTrial = () => {
  return (
    <div className="relative w-full bg-gradient-to-br from-[#1a1f37] to-black py-24 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
  <div 
    className="absolute inset-0 bg-[url('https://cdn.dribbble.com/userupload/3002558/file/original-ffde477aa840d7a659908c1a3938ecd3.jpg')] bg-cover bg-center opacity-50"
  />
</div>


      <div className="relative container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
            Start Your Free Trial Today!
          </h2>
          <p className="text-gray-300 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
            Get unlimited access to thousands of movies, TV shows, and exclusive content. 
            No commitments - cancel anytime.
          </p>
          <Link to="/signup">
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-10 py-6 rounded-lg text-lg font-semibold transform transition-all hover:scale-105 shadow-lg hover:shadow-xl">
              Start Your Free Trial
            </Button>
          </Link>
          <p className="mt-6 text-sm text-gray-400">
            No credit card required • 30-day free trial
          </p>
        </div>
      </div>
    </div>
  );
};