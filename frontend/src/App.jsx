import { useEffect, useState } from "react";
import PlayerPage from "./pages/PlayerPage";
import SongList from "./pages/SongList";
import axios from "axios";

function App() {
  const [nowPlaying, setNowPlaying] = useState({});
  const [showPlayer, setShowPlayer] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songs, setSongs] = useState([]);
  const [song, setSong] = useState(null);
  const [audio, setAudio] = useState(null);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/songlist")
      .then((res) => {
        setSongs(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    nowPlaying.title &&
    axios
      .get(`http://127.0.0.1:5000/song/${nowPlaying.title}`, {
        responseType: "blob",
      })
      .then((res) => {
        const myblob = new Blob([res.data], {
          type: "text/plain",
        });
        setSong(myblob);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [nowPlaying]);

  useEffect(() => {
    if (song) {
      const audioElement = new Audio(URL.createObjectURL(song));
      setAudio(audioElement);
      setIsPlaying(true);
    }
  }, [song]);
  return (
    <div className="main">
      {showPlayer ? (
        <SongList
          setShowPlayer={setShowPlayer}
          setNowPlaying={setNowPlaying}
          nowPlaying={nowPlaying}
          songs={songs}
          song={song}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          audio={audio}
          setAudio={setAudio}
        />
      ) : (
        <PlayerPage
          setShowPlayer={setShowPlayer}
          setNowPlaying={setNowPlaying}
          nowPlaying={nowPlaying}
          songs={songs}
          song={song}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          audio={audio}
          setAudio={setAudio}
        />
      )}
    </div>
  );
}

export default App;
