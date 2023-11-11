import { useState, useEffect } from "react";

const formatTime = (time) => {
  const min = Math.floor(time / 60);
  const sec = Math.floor(time % 60);
  return `${min}:${sec < 10 ? "0" + sec : sec}`;
};

const PlayerPage = ({
  setShowPlayer,
  setNowPlaying,
  nowPlaying,
  songs,
  song,
  isPlaying,
  setIsPlaying,
  audio,
  setAudio,
}) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [progressWidth, setProgressWidth] = useState(0);

  useEffect(() => {
    if (audio) {
      if (isPlaying) {
        audio.play();
      } else {
        audio.pause();
      }
    }
  }, [isPlaying, audio]);

  useEffect(() => {
    if (audio) {
      audio.addEventListener("ended", () => {
        const index = songs.findIndex(
          (song) =>
            song.title === nowPlaying.title && song.artist === nowPlaying.artist
        );
        if (index === songs.length - 1) {
          setNowPlaying(songs[0]);
        } else {
          setNowPlaying(songs[index + 1]);
        }
      });
      return () => {
        audio.removeEventListener("ended", () => {});
      };
    }
  }, [audio, songs, nowPlaying, setNowPlaying]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (audio && isPlaying) {
        setCurrentTime(audio.currentTime);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [audio, isPlaying]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (audio && isPlaying) {
        setCurrentTime(audio.currentTime);
        const timeString = nowPlaying.time;
        const [min, sec] = timeString.split(":");
        const timeInSeconds = parseInt(min) * 60 + parseInt(sec);
        setProgressWidth((audio.currentTime / timeInSeconds) * 100);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [audio, isPlaying, nowPlaying.time]);

  const handlePlayPause = () => {
    if (isPlaying) {
      audio.pause();
    } else {
      audio && audio.currentTime === 0 && (audio.currentTime = 0);
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSkipBack = () => {
    const index = songs.findIndex(
      (song) =>
        song.title === nowPlaying.title && song.artist === nowPlaying.artist
    );
    audio && audio.pause();
    audio && (audio.currentTime = 0);
    if (index === 0) {
      setNowPlaying(songs[songs.length - 1]);
    } else {
      setNowPlaying(songs[index - 1]);
      setAudio(null);
    }
  };

  const handleSkipForward = () => {
    const index = songs.findIndex(
      (song) =>
        song.title === nowPlaying.title && song.artist === nowPlaying.artist
    );
    audio && audio.pause();
    audio && (audio.currentTime = 0);
    if (index === songs.length - 1) {
      setNowPlaying(songs[0]);
      setAudio(null);
    } else {
      setNowPlaying(songs[index + 1]);
      setAudio(null);
    }
  };

  return (
    <div className="playerpage">
      <div className="playerpage-head">
        <div onClick={() => setShowPlayer((showPlayer) => !showPlayer)}>
          <ion-icon name="chevron-down-outline"></ion-icon>
        </div>
        <h2>Now Playing</h2>
        <ion-icon name="ellipsis-vertical"></ion-icon>
      </div>
      <div className="playerpage-image">
        <img
          src={`https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/ab52da00-71c2-4ae2-bc2a-3b28214b02c9/df5ivtx-eadd298a-d7bd-474b-8a5c-ac25ae236089.png/v1/fill/w_894,h_894/music_band_logo_design__song_logo_design_png__by_rahatislam11_df5ivtx-pre.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTI4MCIsInBhdGgiOiJcL2ZcL2FiNTJkYTAwLTcxYzItNGFlMi1iYzJhLTNiMjgyMTRiMDJjOVwvZGY1aXZ0eC1lYWRkMjk4YS1kN2JkLTQ3NGItOGE1Yy1hYzI1YWUyMzYwODkucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.stwNmQZaDjjAVXsG4piJptiaoHLXKAsIMa3SAWCoV_c`}
          alt="song"
        />
      </div>
      <div className="playerpage-bottom">
        <div className="playerpage-info">
          <h3>{nowPlaying.title}</h3>
          <p>{nowPlaying.artist}</p>
        </div>
        <div className="playerpage-progress">
          <p>{audio ? formatTime(currentTime) : "0:00"}</p>
          <div className="progress">
            <div className="progress-bar" role="progressbar">
              <div
                className="progress-bar-fill"
                style={{
                  width: `${progressWidth}%`,
                  height: "1vh",
                  backgroundColor: "red",
                  borderRadius: "10px",
                }}
              ></div>
            </div>
          </div>
          <p>{nowPlaying.time}</p>
        </div>
        <div className="playerpage-controls">
          <div onClick={handleSkipBack}>
            <ion-icon name="play-skip-back" id="play-circle-2"></ion-icon>
          </div>
          <ion-icon
            name={isPlaying ? "pause-circle" : "play-circle"}
            id="play-circle"
            onClick={handlePlayPause}
          ></ion-icon>
          <div onClick={handleSkipForward}>
            <ion-icon name="play-skip-forward" id="play-circle-2"></ion-icon>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerPage;
