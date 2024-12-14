import { Star, Bookmark, Eye, Play, Download, Calendar, Clock, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

interface MovieDetails {
  id: number;
  title: string;
  poster_path: string;
  backdrop_path: string;
  overview: string;
  popularity: number;
  release_date: string;
  runtime: number;
  vote_average: number;
  genres: Array<{ id: number; name: string }>;
}

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: movie, isLoading } = useQuery<MovieDetails>({
    queryKey: ['movie', id],
    queryFn: async () => {
      if (!id) throw new Error('Movie ID is required');
      const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=233d579ffe391c65ea271864eb408536`);
      if (!response.ok) {
        if (response.status === 404) {
          navigate('/');
          throw new Error('Movie not found');
        }
        throw new Error('Failed to fetch movie details');
      }
      return response.json();
    },
    enabled: !!id,
  });

  if (isLoading) {
    return <div className="min-h-screen bg-background flex items-center justify-center">Loading...</div>;
  }

  if (!movie) {
    return <div>Movie not found</div>;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <div className="relative">
        {/* Backdrop Image */}
        <div className="absolute inset-0 h-[500px]">
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background z-10" />
          <img 
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="relative z-20 container mx-auto px-4 pt-32">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Poster */}
            <div className="w-full md:w-1/3 lg:w-1/4">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full rounded-lg shadow-xl"
              />
            </div>

            {/* Details */}
            <div className="w-full md:w-2/3 lg:w-3/4 text-white">
              <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
              
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(movie.release_date).getFullYear()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{movie.runtime} min</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span>{movie.vote_average.toFixed(1)}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {movie.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="px-3 py-1 bg-white/10 rounded-full text-sm"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>

              <p className="text-lg mb-8">{movie.overview}</p>

              <div className="flex flex-wrap gap-4">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Play className="mr-2 h-4 w-4" /> Watch Now
                </Button>
                <Button variant="outline">
                  <Bookmark className="mr-2 h-4 w-4" /> Add to Watchlist
                </Button>
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" /> Download
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional content section */}
      <div className="container mx-auto px-4 py-16">
        {/* Add more sections here like cast, reviews, similar movies, etc. */}
      </div>
      <Footer />
    </div>
  );
};

export default MovieDetails;