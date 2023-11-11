const SongPlayer = ({title, time, artist}) => {
    return (
      <div className="card songplayer">
        <div className="card-body">
          <div className="card-title-req">
            <h3 className="card-title">{title}</h3>
            {/* <p className="card-text">{time}</p> */}
          </div>
          <p className="card-text">{artist}</p>
        </div>
        <ion-icon name="play"></ion-icon>
      </div>
    );
  };
  
  export default SongPlayer;