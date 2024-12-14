import { useQuery } from "@tanstack/react-query";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import { MovieCard } from "./MovieCard";
import { Button } from "./ui/button";
import { ChevronRight } from "lucide-react";
import { useToast } from "./ui/use-toast";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
}

export const TrendingSlider = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  const { data: movies, isLoading, error } = useQuery({
    queryKey: ["trending-movies"],
    queryFn: async () => {
      try {
        const response = await fetch(
          "https://api.themoviedb.org/3/trending/movie/day?api_key=233d579ffe391c65ea271864eb408536"
        );
        if (!response.ok) {
          throw new Error('Failed to fetch trending movies');
        }
        const data = await response.json();
        return data.results;
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load trending movies. Please try again later.",
          variant: "destructive",
        });
        throw error;
      }
    },
  });

  if (isLoading || !movies) return null;
  if (error) return null;

  return (
    <section className="py-4">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6 gap-2">
          <h2 className="text-xl sm:text-2xl font-semibold truncate">Trending Now</h2>
          <Button 
            variant="ghost" 
            className="group whitespace-nowrap text-sm sm:text-base"
            onClick={() => navigate('/movies?sort=trending')}
          >
            See All
            <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
        
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {movies.map((movie: Movie) => (
              <CarouselItem key={movie.id} className={`pl-4 ${isMobile ? 'basis-full' : 'basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5'}`}>
                <MovieCard
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
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex -left-12" />
          <CarouselNext className="hidden md:flex -right-12" />
        </Carousel>
      </div>
    </section>
  );
};