import { Card, CardContent } from "./ui/card";
import { PlayCircle, Star, StarHalf, StarOff } from "lucide-react";
import { Link } from "react-router-dom";

interface MovieCardProps {
  id: number;
  title: string;
  year: string;
  genre: string;
  rating: number;
  imageUrl: string;
}

export const MovieCard = ({ id, title, year, genre, rating, imageUrl }: MovieCardProps) => {
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating / 2);
    const hasHalfStar = rating % 2 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<Star key={i} className="w-4 h-4 text-violet-400 fill-violet-400" />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<StarHalf key={i} className="w-4 h-4 text-violet-400 fill-violet-400" />);
      } else {
        stars.push(<StarOff key={i} className="w-4 h-4 text-gray-600" />);
      }
    }
    return stars;
  };

  return (
    <Link to={`/movie/${id}`}>
      <Card className="group relative overflow-hidden transition-all duration-300 hover:scale-105 bg-[#171b2c]/50 backdrop-blur-sm border-violet-900/20 hover:border-violet-500/50">
        <div className="aspect-[2/3] relative overflow-hidden rounded-t-lg">
          <img
            src={imageUrl}
            alt={title}
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <PlayCircle className="w-16 h-16 text-white/90" />
          </div>
          <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm text-white px-2 py-1 rounded-full text-sm font-medium">
            {rating}
          </div>
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold text-lg line-clamp-1 text-white/90 group-hover:text-white transition-colors">
            {title}
          </h3>
          <p className="text-sm text-gray-400 mb-2">
            {year} • {genre}
          </p>
          <div className="flex gap-0.5">
            {renderStars(rating)}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};