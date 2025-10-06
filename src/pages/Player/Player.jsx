import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import backArrow from '../../assets/back_arrow_icon.png';
import './Player.css';

const apiToken = import.meta.env.VITE_TMDB_BEARER_TOKEN;

function Player() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [playerInfo, setPlayerInfo] = useState({
        key: '',
        name: '',
        publish_date: '',
        type: ''
    });

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${apiToken}`
        }
    };

    useState(() => {

        fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
        .then(res => res.json())
        .then(res => {
            const data = res.results[0];
            setPlayerInfo(
                {
                    name: data.name,
                    key: data.key, 
                    publish_date: data.published_at, 
                    type: data.type
                }
            )
        })
        .catch(err => console.error(err));
    }, [playerInfo])

    
    return (
        <div className='player'>
            <img src={backArrow} alt="" onClick={() => navigate(-1)}/>
            <iframe width='90%' height='90%'
                src={`https://www.youtube.com/embed/${playerInfo.key}`}
                title='trailer'
                frameborder="0" allowFullScreen></iframe>
            <div className="player-info">
                <p>{playerInfo.publish_date.slice(0, 10)}</p>
                <p>{playerInfo.name.split('|')[0]}</p>
                <p>{playerInfo.type}</p>
            </div>
        </div>
    )
}

export default Player;