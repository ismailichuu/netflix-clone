import { useEffect, useState } from "react";
import Footer from "../../components/Footer/Footer";
import TitleCard from "../../components/TitleCard/TitleCard";
import Navbar from "../../components/Navbar/Navbar";
import playBtn from '../../assets/play_icon.png';
import infoBtn from '../../assets/info_icon.png';
import './Home.css';
import { useNavigate } from "react-router-dom";

const apiToken = import.meta.env.VITE_TMDB_BEARER_TOKEN;

function Home() {

    const [resState, setResState] = useState({});
    const navigate = useNavigate();

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${apiToken}`
        }
    };

    useEffect(() => {
  fetch(`https://api.themoviedb.org/3/movie/popular?language=en-US&page=2`, options)
    .then(res => res.json())
    .then(res => {
      const results = res.results;
      let index = 0;

      setResState({
        img: results[index].backdrop_path,
        desc: results[index].overview,
        key: results[index].id,
        title: results[index].title
      });


      const interval = setInterval(() => {
        index = (index + 1) % results.length;
        setResState({
          img: results[index].backdrop_path,
          desc: results[index].overview,
          key: results[index].id,
          title: results[index].title
        });
      }, 10000);

      return () => clearInterval(interval);
    })
    .catch(err => console.error(err));
}, []);

    return (
        <div className="home">
            <Navbar />
            <div className="hero">
                <img src={'https://image.tmdb.org/t/p/original'+ resState.img} alt="" className="hero-img" />
                <div className="hero-caption">
                    <h1>{resState.title}</h1>
                    <p>{resState.desc}</p>
                    <div className="hero-btns">
                        <button className="btn" onClick={() => navigate(`/player/${resState.key}`)}><img src={playBtn} alt="" /> Play</button>
                        <button className="btn dark"><img src={infoBtn} alt="" />More Info</button>
                    </div>
                    <div className="hero-cards">

                        <TitleCard type='popular' />
                    </div>
                </div>
            </div>
            <div className="more-cards">
                <TitleCard title='Bollywood Movies' />
                <TitleCard title='Top Pics for You' type={'top_rated'} />
                <TitleCard title='Only on Netflix' />
                <TitleCard title='Upcoming' type={'upcoming'} />
            </div>
            <Footer />
        </div>
    )
}

export default Home;