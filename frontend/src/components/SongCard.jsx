const SongCard = ({ title, time, artist, nowPlaying, isPlaying, audio }) => {
  
  return (
    <div className="card">
      <div className="card-body">
        <div className="card-title-req">
          <h3 className="card-title">{title}</h3>
          <p className="card-text">{time}</p>
        </div>
        <p className="card-text">{artist}</p>
      </div>
      {isPlaying && nowPlaying.title === title ? (
        <div className="card-playing" onClick={() => audio.pause()}>
          <ion-icon name="pause"></ion-icon>
        </div>
      ) : (
        <div
          className="card-playing"
          onClick={() => {
            audio.play();
          }}
        >
          <ion-icon name="play"></ion-icon>
        </div>
      )}
    </div>
  );
};

export default SongCard;
