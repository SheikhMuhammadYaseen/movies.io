import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Search, Film, Tv, Users, Menu, X } from "lucide-react";
import { useState } from "react";
import { useToast } from "./ui/use-toast";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchTerm.trim().length < 2) {
      toast({
        title: "Search term too short",
        description: "Please enter at least 2 characters to search",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=233d579ffe391c65ea271864eb408536&query=${encodeURIComponent(searchTerm.trim())}`
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
      
      navigate(`/movies?search=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm("");
      setIsMenuOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to search movies. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-gradient-to-r from-[#0f1219]/95 via-[#171b2c]/95 to-[#1f1635]/95 backdrop-blur-md border-b border-violet-900/20">
      <div className="container flex h-20 items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <Link to="/" className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">
            Movies.io
          </Link>
          <div className="hidden md:flex gap-6">
            <Link to="/movies" className="text-sm font-medium text-white/80 hover:text-white transition-colors flex items-center gap-2">
              <Film className="w-4 h-4" />
              Movies
            </Link>
            <Link to="/tvshows" className="text-sm font-medium text-white/80 hover:text-white transition-colors flex items-center gap-2">
              <Tv className="w-4 h-4" />
              TV Shows
            </Link>
            <Link to="/celebrities" className="text-sm font-medium text-white/80 hover:text-white transition-colors flex items-center gap-2">
              <Users className="w-4 h-4" />
              Celebrities
            </Link>
          </div>
        </div>
      
      <div className="flex items-center gap-4">
        <form onSubmit={handleSearch} className="relative hidden md:flex items-center">
          <Search className="absolute left-3 h-4 w-4 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search..."
            className="pl-10 pr-4 py-2 rounded-full bg-white/5 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 w-64 border-transparent"
          />
        </form>
          <div className="hidden md:flex items-center gap-4">
            <Link to="/signin">
              <Button variant="ghost" className="text-white/80 hover:text-white hover:bg-white/10">
                Sign In
              </Button>
            </Link>
            <Link to="/signup">
              <Button className="bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 text-white border-0">
                Sign Up
              </Button>
            </Link>
          </div>
          <Button
            variant="ghost"
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gradient-to-r from-[#0f1219]/90 to-[#1f1635]/90 border-t border-white/10 py-4 px-4 space-y-4">
          <Link
            to="/movies"
            className="flex items-center gap-2 text-white/80 hover:text-white py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            <Film className="w-4 h-4" />
            Movies
          </Link>
          <Link
            to="/tvshows"
            className="flex items-center gap-2 text-white/80 hover:text-white py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            <Tv className="w-4 h-4" />
            TV Shows
          </Link>
          <Link
            to="/celebrities"
            className="flex items-center gap-2 text-white/80 hover:text-white py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            <Users className="w-4 h-4" />
            Celebrities
          </Link>
          <form onSubmit={handleSearch} className="relative flex items-center">
            <Search className="absolute left-3 h-4 w-4 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 rounded-full bg-white/10 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 border-transparent"
            />
          </form>
          <div className="flex flex-col gap-2">
            <Link to="/signin" className="w-full">
              <Button variant="ghost" className="w-full text-white/80 hover:text-white hover:bg-white/10">
                Sign In
              </Button>
            </Link>
            <Link to="/signup" className="w-full">
              <Button className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 text-white border-0">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};