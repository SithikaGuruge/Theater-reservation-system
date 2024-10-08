import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const MovieCard = ({ movie }) => {
  const navigate = useNavigate(); // Hook for navigation

  const handleClick = () => {
    navigate(`/movie/${movie.id}`); // Navigate to the schedule page
  };

  const handleUrlClick = () => {
    window.open(movie.trailer_video_url, "_blank");
  };

  return (
    <div
      className="group relative w-80 h-96 cursor-pointer bg-gray-900 rounded-lg overflow-hidden shadow-xl transition-transform duration-300 hover:scale-105 mt-5 "
      onClick={handleClick}
    >
      <div className="absolute inset-0">
        <img
          className="w-full h-full object-cover transform transition-opacity duration-300 group-hover:opacity-80"
          src={movie.poster_url}
          alt={`${movie.title} Poster`}
          onError={(e) => {
            e.target.src =
              "https://blog.bbt4vw.com/wp-content/uploads/2021/05/sorry-we-are-closed-sign-on-door-store-business-vector-27127112-1.jpg";
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
      </div>

      {/* Card Content */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-gray-900 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
        <h3 className="text-white font-semibold text-lg mb-2 line-clamp-2">
          {movie.title}
        </h3>
        <div className="hidden group-hover:block text-gray-300 text-sm line-clamp-3">
          {movie.overview}
          <p>Released: {new Date(movie.released_date).toDateString()}</p>
          <p>Duration: {movie.duration} min</p>
          <p>Language: {movie.original_language}</p>
          <p>Rating: {movie.rating}</p>
        </div>
        <div className="flex justify-between mt-2">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white py-1.5 px-3 rounded-full text-sm focus:outline-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            onClick={handleUrlClick}
          >
            Watch Trailer
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white py-1.5 px-3 rounded-full text-sm focus:outline-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            onClick={handleClick}
          >
            Buy Tickets
          </button>
        </div>
      </div>
    </div>
  );
};

const MovieList = () => {
  const axiosPrivate = useAxiosPrivate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosPrivate.get("/movies");
        setData(response.data);
      } catch (error) {
        setError(error.message);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error.length > 0) {
    console.log(error);
  }

  return (
    <div className="py-16 mb-10">
      <h1 className="text-white text-3xl pl-6 pb-5 font-bold">Movies</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center mx-auto">
        {data.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default MovieList;
