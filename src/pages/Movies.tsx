import { MovieCard } from "@/components/MovieCard";
import { useQuery } from "@tanstack/react-query";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useSearchParams } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

const Movies = () => {
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("search");
  const genreId = searchParams.get("genre");
  const { toast } = useToast();

  const { data: movies, isLoading } = useQuery({
    queryKey: ["movies", searchTerm, genreId],
    queryFn: async () => {
      if (searchTerm) {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=233d579ffe391c65ea271864eb408536&query=${encodeURIComponent(searchTerm)}`
        );
        const data = await response.json();
        if (data.results.length === 0) {
          toast({
            title: "No results found",
            description: "No movies found matching your search term",
            variant: "destructive",
          });
        }
        return data.results;
      } else if (genreId) {
        const response = await fetch(
          `https://api.themoviedb.org/3/discover/movie?api_key=233d579ffe391c65ea271864eb408536&with_genres=${genreId}`
        );
        const data = await response.json();
        if (data.results.length === 0) {
          toast({
            title: "No results found",
            description: "No movies found in this genre",
            variant: "destructive",
          });
        }
        return data.results;
      } else {
        const response = await fetch(
          "https://api.themoviedb.org/3/movie/popular?api_key=233d579ffe391c65ea271864eb408536"
        );
        const data = await response.json();
        return data.results;
      }
    },
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 pt-24 pb-12">
        <h1 className="text-3xl font-bold mb-8 text-white">
          {searchTerm 
            ? `Search Results for "${searchTerm}"`
            : genreId 
              ? `${movies?.[0]?.genre_ids.includes(Number(genreId)) ? 'Genre Movies' : 'Popular Movies'}`
              : "Popular Movies"
          }
        </h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {movies?.map((movie: any) => (
            <MovieCard
              key={movie.id}
              id={movie.id}
              title={movie.title}
              year={new Date(movie.release_date).getFullYear().toString()}
              genre="Drama"
              rating={movie.vote_average}
              imageUrl={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : "https://via.placeholder.com/500x750"
              }
            />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Movies;