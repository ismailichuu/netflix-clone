import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { ToastContainer } from "react-toastify";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Player from "./pages/Player/Player";
import Watchlist from "./pages/WatchList/Watchlist";
import { auth } from "../firebase";
import { UserContext } from "./contexts/userCotext";


function App() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState('');

  useEffect(() => {

    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserId(user.uid);
        navigate('/');
      } else {
        navigate('/login');
      }
    })
  }, [])

  return (
    <>
      <ToastContainer theme="dark" />
      <UserContext.Provider value={userId}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/player/:id" element={<Player />} />
          <Route path="/watchlist" element={<Watchlist />} />
        </Routes>
      </UserContext.Provider>
    </>
  )
}


export default App;