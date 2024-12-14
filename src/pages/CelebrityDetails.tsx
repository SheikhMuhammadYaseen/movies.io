import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MovieCard } from "@/components/MovieCard";

const CelebrityDetails = () => {
  const { id } = useParams();

  const { data: celebrity, isLoading: isLoadingCelebrity } = useQuery({
    queryKey: ["celebrity", id],
    queryFn: async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/person/${id}?api_key=233d579ffe391c65ea271864eb408536`
      );
      return response.json();
    },
  });

  const { data: movies, isLoading: isLoadingMovies } = useQuery({
    queryKey: ["celebrity-movies", id],
    queryFn: async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=233d579ffe391c65ea271864eb408536`
      );
      return response.json();
    },
  });

  if (isLoadingCelebrity || isLoadingMovies) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <img
              src={`https://image.tmdb.org/t/p/w500${celebrity?.profile_path}`}
              alt={celebrity?.name}
              className="w-full rounded-lg shadow-xl"
            />
          </div>
          <div className="md:col-span-2">
            <h1 className="text-4xl font-bold mb-4 text-white">{celebrity?.name}</h1>
            <div className="space-y-4 text-gray-300">
              <p><span className="font-semibold">Birthday:</span> {celebrity?.birthday}</p>
              <p><span className="font-semibold">Place of Birth:</span> {celebrity?.place_of_birth}</p>
              <p><span className="font-semibold">Known For:</span> {celebrity?.known_for_department}</p>
              <p><span className="font-semibold">Popularity:</span> {celebrity?.popularity}</p>
              <div className="mt-6">
                <h2 className="text-2xl font-semibold mb-4">Biography</h2>
                <p className="text-gray-400 leading-relaxed">{celebrity?.biography}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-6">Known For</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {movies?.cast?.slice(0, 12).map((movie: any) => (
              <MovieCard
                key={movie.id}
                id={movie.id}
                title={movie.title}
                year={movie.release_date ? new Date(movie.release_date).getFullYear().toString() : "N/A"}
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
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CelebrityDetails;