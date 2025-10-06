import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { getWatchlist, removeFromWatchlist, updateWatchList } from "../../../firebase";
import { UserContext } from "../../contexts/userCotext";
import './Card.css';


function Card({ card, setRefresh }) {
    let userId = useContext(UserContext);
    const [watchStatus, setWatchStatus] = useState(false);

    useEffect(() => {
        if (!userId || !card.id) return;

        async function checkWatchStatus() {
            const exists = await getWatchlist(userId, card.id);
            setWatchStatus(exists);
        }

        checkWatchStatus();
    }, [userId, card.id]);

    async function addToWatchlist() {
        if (!watchStatus) {
            const movieDetails = {
                original_title: card.original_title,
                poster_path: card.poster_path,
                id: card.id,
            }

            await updateWatchList(userId, movieDetails);
            setWatchStatus(true);
        }else{
            await removeFromWatchlist(userId, card.id);
            setWatchStatus(false);
            setRefresh?.();
        }

    }

    return (
        <div className="card-container">
            <Link className="card" key={card.id} to={`/player/${card.id}`}>
                <img src={'https://image.tmdb.org/t/p/w500' + card.poster_path} alt="" />
                <p>{card.original_title}</p>
            </Link>

            <button className="dropdown" onClick={addToWatchlist}>{!watchStatus ? 'Add to Watchlist' : 'Remove from Watchlist'}</button>
        </div>

    )
}


export default Card;