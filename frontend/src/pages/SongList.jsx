import SongCard from "../components/SongCard";
import SongPlayer from "../components/SongPlayer";

const SongList = ({
  setShowPlayer,
  setNowPlaying,
  nowPlaying,
  songs,
  song,
  isPlaying,
  setIsPlaying,
  audio,
}) => {
  return (
    <>
      <div className="songlist-header">
        <h2>Song List</h2>
      </div>
      <div className="songlist">
        <div className="songlist-subheader">
          {songs.map((song) => (
            <div
              className="songlist-wrap"
              key={song.title}
              onClick={() => {
                setNowPlaying(song);
                setIsPlaying(true);
                audio && audio.play();
              }}
            >
              <SongCard
                title={song.title}
                time={song.time}
                artist={song.artist}
                isPlaying={isPlaying}
                nowPlaying={nowPlaying}
                audio={audio}
              />
            </div>
          ))}
          {nowPlaying.title && (
            <div
              className="songlist-footer"
              onClick={() => setShowPlayer((showPlayer) => !showPlayer)}
            >
              <SongPlayer
                title={nowPlaying.title}
                time={nowPlaying.time}
                artist={nowPlaying.artist}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SongList;
