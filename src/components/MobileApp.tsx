export const MobileApp = () => {
  return (
    <div className="bg-gradient-to-br from-[#1a1f37] to-black text-white py-24 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMjIiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzRjMC0yIDEtMy42IDItNC40LS43LS4yLTEuNC0uMy0yLjEtLjMtMy4zIDAtNiAyLjctNiA2IDAgMy4zIDIuNyA2IDYgNiAxLjkgMCAzLjYtLjkgNC43LTIuMy0yLjYtLjctNC42LTMtNC42LTV6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-10" />
      
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 max-w-6xl mx-auto">
          {/* Left Content */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
              Download Our Mobile App
            </h2>
            <p className="text-gray-300 text-lg mb-8 leading-relaxed max-w-xl">
              Take your entertainment everywhere with our mobile app. Stream your favorite movies and shows anytime, anywhere. Download now and enjoy offline viewing!
            </p>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center md:justify-start">
  <a 
    href="#" 
    className="transform transition-all hover:scale-105 hover:opacity-90"
    aria-label="Download on App Store"
  >
    <img 
      src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" 
      alt="App Store" 
      className="h-10 w-auto sm:h-12"
    />
  </a>
  <a 
    href="#" 
    className="transform transition-all hover:scale-105 hover:opacity-90"
    aria-label="Get it on Google Play"
  >
    <img 
      src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" 
      alt="Google Play" 
      className="h-10 w-auto sm:h-12"
    />
  </a>
</div>

          </div>
          
          {/* Right Image/Mockup */}
          <div className="flex-1 relative">
            <div className="relative w-full max-w-sm mx-auto">
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-blue-500/20 blur-3xl rounded-full" />
              <img 
                src="https://static1.howtogeekimages.com/wordpress/wp-content/uploads/2024/03/a-hand-holding-a-smartphone-with-a-movie-app-open.jpg?q=50&fit=crop&w=1100&h=618&dpr=1.5"
                alt="Mobile App Preview"
                className="relative rounded-3xl shadow-2xl border border-white/10 transform -rotate-6 hover:rotate-0 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};