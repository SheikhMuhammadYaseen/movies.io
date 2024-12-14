import { MovieCard } from "@/components/MovieCard";
import { useQuery } from "@tanstack/react-query";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const TVShows = () => {
  const { data: shows, isLoading } = useQuery({
    queryKey: ["popular-shows"],
    queryFn: async () => {
      const response = await fetch(
        "https://api.themoviedb.org/3/tv/popular?api_key=233d579ffe391c65ea271864eb408536"
      );
      const data = await response.json();
      return data.results;
    },
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 pt-24 pb-12">
        <h1 className="text-3xl font-bold mb-8 text-white">Popular TV Shows</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {shows?.map((show: any) => (
            <MovieCard
              key={show.id}
              id={show.id}
              title={show.name}
              year={new Date(show.first_air_date).getFullYear().toString()}
              genre="Drama"
              rating={show.vote_average}
              imageUrl={
                show.poster_path
                  ? `https://image.tmdb.org/t/p/w500${show.poster_path}`
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

export default TVShows;