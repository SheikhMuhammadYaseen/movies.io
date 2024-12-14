import { useQuery } from "@tanstack/react-query";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

const Celebrities = () => {
  const navigate = useNavigate();
  const { data: celebrities, isLoading } = useQuery({
    queryKey: ["popular-people"],
    queryFn: async () => {
      const response = await fetch(
        "https://api.themoviedb.org/3/person/popular?api_key=233d579ffe391c65ea271864eb408536&page=1"
      );
      const data = await response.json();
      return data.results;
    },
  });

  const handleCardClick = (id: number) => {
    navigate(`/celebrity/${id}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Popular Celebrities</h1>
          <Button variant="ghost" className="group">
            See All
            <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {celebrities?.map((celebrity: any) => (
            <Card 
              key={celebrity.id} 
              className="group relative overflow-hidden transition-all duration-300 hover:scale-105 bg-[#1a1f37]/50 border-gray-800 cursor-pointer"
              onClick={() => handleCardClick(celebrity.id)}
            >
              <div className="aspect-[3/4] relative overflow-hidden rounded-t-lg">
                <img
                  src={
                    celebrity.profile_path
                      ? `https://image.tmdb.org/t/p/w500${celebrity.profile_path}`
                      : "https://via.placeholder.com/500x750"
                  }
                  alt={celebrity.name}
                  className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg text-white/90 group-hover:text-white transition-colors line-clamp-1">
                  {celebrity.name}
                </h3>
                <p className="text-sm text-gray-400">
                  {celebrity.known_for_department}
                </p>
                <div className="mt-2 text-sm text-gray-400">
                  Known for: {celebrity.known_for?.[0]?.title || celebrity.known_for?.[0]?.name || 'Various Works'}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Celebrities;