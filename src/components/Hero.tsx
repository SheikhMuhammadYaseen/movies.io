import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "./ui/use-toast";

export const Hero = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSearch = async (term: string) => {
    if (term.trim().length < 2) {
      toast({
        title: "Search term too short",
        description: "Please enter at least 2 characters to search",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=233d579ffe391c65ea271864eb408536&query=${encodeURIComponent(term.trim())}`
      );
      const data = await response.json();
      
      if (data.results.length === 0) {
        toast({
          title: "No results found",
          description: "No movies found matching your search term",
          variant: "destructive",
        });
        return;
      }
      
      navigate(`/movies?search=${encodeURIComponent(term.trim())}`);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to search movies. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSearch(searchTerm);
  };

  return (
    <div className="relative min-h-[400px] w-full overflow-hidden mt-16">
      {/* Darker gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-[#0f1219] z-10" />
      
      {/* Background image with parallax effect */}
      <div 
        className="absolute inset-0 bg-cover bg-center transform scale-110 transition-transform duration-1000"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80')",
        }}
      />

      {/* Content */}
      <div className="relative z-20 h-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 pt-16">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400 text-center mb-4 animate-fade-in">
          Discover Amazing Movies
        </h1>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white text-center mb-8 animate-fade-in [animation-delay:200ms]">
          Your Ultimate Entertainment Hub
        </h2>
        <p className="text-lg sm:text-xl text-gray-200 text-center max-w-3xl mb-8 animate-fade-in [animation-delay:400ms]">
          Explore thousands of movies, TV shows, and discover your next favorite entertainment
        </p>
        
        <form onSubmit={handleSubmit} className="w-full max-w-3xl flex gap-2 animate-fade-in [animation-delay:600ms]">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 h-12 bg-white/10 backdrop-blur-sm border-transparent text-white placeholder:text-gray-400 focus:ring-2 focus:ring-violet-500 focus:border-transparent"
              placeholder="Search movies, TV shows, and more..."
            />
          </div>
          <Button 
            type="submit" 
            className="h-12 px-8 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 text-white border-0"
          >
            Search
          </Button>
        </form>
      </div>
    </div>
  );
};