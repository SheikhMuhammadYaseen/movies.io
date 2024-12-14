import { Card, CardContent } from "./ui/card";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

interface GenreCardProps {
  genre: string;
  genreId: number;
  imageUrl: string;
  className?: string;
}

// TMDB Genre IDs and their corresponding images
const GENRE_IMAGES = {
  "Action": "https://static1.colliderimages.com/wordpress/wp-content/uploads/2023/04/25-best-action-movies-of-all-time-ranked.jpg",
  "Comedy": "https://media.gq-magazine.co.uk/photos/65e99a7c6c03b53bb6ca3042/4:3/w_900,h_675,c_limit/Best-comedy-films.jpg",
  "Drama": "https://www.thedigitalfix.com/wp-content/sites/thedigitalfix/2023/08/best-drama-movies-550x309.jpg",
  "Thriller": "https://static1.colliderimages.com/wordpress/wp-content/uploads/2023/04/best-movie-trailers.jpg",
  "Horror": "https://static1.colliderimages.com/wordpress/wp-content/uploads/2023/09/100-best-horror-movies-of-all-time-ranked-1.jpg",
  "Romance": "https://static0.colliderimages.com/wordpress/wp-content/uploads/2024/09/the-10-most-romantic-movies-of-the-2000s-ranked.jpg",
};

export const GenreCard = ({ genre, genreId, imageUrl, className }: GenreCardProps) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate(`/movies?genre=${genreId}`);
  };

  return (
    <Card 
      className={cn(
        "group relative overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-105",
        className
      )}
      onClick={handleClick}
    >
      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors z-10" />
      <img
        src={GENRE_IMAGES[genre as keyof typeof GENRE_IMAGES] || imageUrl}
        alt={genre}
        className="w-full h-full object-cover aspect-video group-hover:scale-110 transition-transform duration-300"
      />
      <CardContent className="absolute inset-0 z-20 flex items-center justify-center">
        <h3 className="text-white text-xl font-semibold group-hover:scale-110 transition-transform duration-300">
          {genre}
        </h3>
      </CardContent>
    </Card>
  );
};