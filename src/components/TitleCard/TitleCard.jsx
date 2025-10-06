import { useEffect, useRef, useState } from "react";
import './TitleCard.css';
import Card from "../Card/Card";

const apiToken = import.meta.env.VITE_TMDB_BEARER_TOKEN;

function TitleCard({ title, type }) {
    const cardRef = useRef();
    const [apiResponse, setApiResponse] = useState([]);

    function handleCardWheel(e) {
        e.preventDefault();
        cardRef.current.scrollLeft += e.deltaY;
    }

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${apiToken}`
        }
    };

    function cardKeyHandler(e) {
        let cardList = cardRef.current;
        const scrollStep = 200;
        if (e.key === 'ArrowLeft') {
            cardList.scrollLeft += scrollStep;
        } else if (e.key === 'ArrowRight') {
            cardList.focus();
            cardList.scrollRight -= scrollStep;
        }
    }

    useEffect(() => {
        const cardList = cardRef.current;
        cardList.addEventListener('wheel', handleCardWheel);

        fetch(`https://api.themoviedb.org/3/movie/${type ? type : 'now_playing'}?language=en-US&page=1`, options)
        .then(res => res.json())
        .then(res => setApiResponse(res.results))
        .catch(err => console.error(err));

    }, [])

    return (
        <div className="title-card">
            <h2>{title ? title : 'Popular on netflix'}</h2>
            <div className="card-list"
                ref={cardRef}
                tabIndex={0}
                onKeyDown={cardKeyHandler}
                onMouseEnter={() => cardRef.current.focus()}
            >
                {apiResponse.map(card =>
                    <Card card={card} key={card.id}/>
                )}
            </div>

        </div>
    )
}

export default TitleCard;