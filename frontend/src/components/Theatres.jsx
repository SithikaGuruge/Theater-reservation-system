import {React, useEffect , useState} from "react";
import useFetch from "../hooks/useFetch";
import { useNavigate, useLocation  } from "react-router-dom";
import axios from "axios";
import useAxiosPrivate from "../hooks/useAxiosPrivate";



const TheatreCard = ({ theatre }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/schedule/${theatre.id}`);
  };

    return (
        <div 
          className={`theatre-card w-72 relative overflow-hidden transition-transform duration-300 hover:scale-105 ${
            theatre.is_active ? "" : "inactive"
          }`} 
          onClick={handleClick}
        >
          {/* Image Container with hover effect */}
          <div className="relative transition-opacity duration-300 hover:opacity-75">
            <img
              src={theatre.image_url}
              alt={theatre.name}
              className="object-cover w-full h-64" 
              onError={(e) =>
                (e.target.src =
                  'https://blog.bbt4vw.com/wp-content/uploads/2021/05/sorry-we-are-closed-sign-on-door-store-business-vector-27127112-1.jpg')
              }
            />
          </div>
    
          {/* Details Container */}
          <div className="theatre-details p-4">
            <h3 className="text-xl font-bold mb-2">{theatre.name}</h3>
            <p className="text-gray-700">{theatre.details}</p>
          </div>
        </div>
      );
};

const TheatreList = () => {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
      const fetchData = async () => {
          try {
              const response = await axiosPrivate.get("/theatres");
              setData(response.data);
          } catch (error) {
              setError(error.message);
              navigate("/login",{state: {from: location}, replace: true})
          }
          setLoading(false);
      };

      fetchData();
  }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error.length >0) {
        console.log(error);
    }

    return (
        <div className="flex flex-col sm:flex-row justify-center sm:space-x-4">
            {data.map(theatre => (
                <TheatreCard
                    key={theatre.id}
                    theatre={theatre} // Pass theatre object as prop
                />
            ))}
        </div>
    );
};

export default TheatreList;
