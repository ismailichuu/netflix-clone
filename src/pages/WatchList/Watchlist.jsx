import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/userCotext";
import Navbar from "../../components/Navbar/Navbar";
import { getFullWatchlist } from "../../../firebase";
import Card from "../../components/Card/Card";
import './Watchlist.css';

function Watchlist() {
  const userId = useContext(UserContext);
  const [movieList, setMovieList] = useState([]);
  const [refresh, setRefresh] = useState(false);
 
  useEffect(() => {
    async function getMovieList() {
      const list = await getFullWatchlist(userId);
      setMovieList(list);
    }
    getMovieList();
  }, [userId, refresh]);

  return (
    <div className="watchlist-page">
      <Navbar />
      <div className="watchlist-content">
        <h1 className="watchlist-title">My Watchlist</h1>
        {movieList.length > 0 ? (
          <div className="watchlist-grid">
            {movieList.map((movie) => (
              <Card card={movie} key={movie.id} setRefresh={() => setRefresh(prev => !prev)}/>
            ))}
          </div>
        ) : (
          <p className="empty-text">Your watchlist is empty 😔</p>
        )}
      </div>
    </div>
  );
}

export default Watchlist;
