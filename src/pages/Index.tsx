import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Hero } from "@/components/Hero";
import { MovieCard } from "@/components/MovieCard";
import { GenreCard } from "@/components/GenreCard";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Navbar } from "@/components/Navbar";
import { TrendingSlider } from "@/components/TrendingSlider";
import { Footer } from "@/components/Footer";
import { FreeTrial } from "@/components/FreeTrial";
import { MobileApp } from "@/components/MobileApp";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  release_date: string;
  vote_average: number;
  genre_ids: number[];
}

const GENRES = [
  { name: "Action", id: 28, image: "https://source.unsplash.com/random/800x600/?action-movie" },
  { name: "Comedy", id: 35, image: "https://source.unsplash.com/random/800x600/?comedy" },
  { name: "Drama", id: 18, image: "https://source.unsplash.com/random/800x600/?drama" },
  { name: "Thriller", id: 53, image: "https://source.unsplash.com/random/800x600/?thriller" },
  { name: "Horror", id: 27, image: "https://source.unsplash.com/random/800x600/?horror" },
  { name: "Romance", id: 10749, image: "https://source.unsplash.com/random/800x600/?romance" },
];

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const { data: movies, isLoading } = useQuery({
    queryKey: ["movies", searchTerm],
    queryFn: async () => {
      if (!searchTerm) return null;
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=233d579ffe391c65ea271864eb408536&query=${searchTerm}`
      );
      const data = await response.json();
      return data.results;
    },
    enabled: searchTerm.length > 0,
  });

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <Hero />
      
      <main className="container mx-auto space-y-12 flex-grow">
        <TrendingSlider />

        {/* Search Results Section */}
        {searchTerm && movies && (
          <section>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Search Results</h2>
              <Button variant="ghost" className="group">
                See All
                <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {movies?.slice(0, 6).map((movie: Movie) => (
                <MovieCard
                  key={movie.id}
                  id={movie.id}
                  title={movie.title}
                  year={new Date(movie.release_date).getFullYear().toString()}
                  genre="Drama"
                  rating={Math.round(movie.vote_average * 10) / 10}
                  imageUrl={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                      : "https://via.placeholder.com/500x750"
                  }
                />
              ))}
            </div>
          </section>
        )}

        {/* Popular Genres */}
        <section className="pb-12">
          <h2 className="text-2xl font-semibold mb-6">Popular Genres</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {GENRES.map((genre) => (
              <GenreCard
                key={genre.name}
                genre={genre.name}
                genreId={genre.id}
                imageUrl={genre.image}
              />
            ))}
          </div>
        </section>
      </main>

      <FreeTrial />
      <MobileApp />
      <Footer />
    </div>
  );
};

export default Index;