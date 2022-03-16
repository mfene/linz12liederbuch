import { FC, useState } from "react";
import Lyrics from "../components/Lyrics";
import SongSelect from "../components/SongSelect";
import useSocket from "../hooks/useSocket";
import useSong from "../hooks/useSong";

const Master: FC = () => {
  const selectSong = (songId: string) => {
    socket?.emit("next-song", songId);
  };
  const [songId, setSongId] = useState("");
  const socket = useSocket("next-song", setSongId);
  const [song, setSong] = useState("");

  const { song: songData, isLoading } = useSong(songId);
  const songSelect = <SongSelect selectSong={selectSong} />;

  if (!songId) {
    return songSelect;
  }
  if (songData && songData !== song) {
    setSong(songData);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  let lyrics = <p>Da is was schiefgegangen</p>;
  if (isLoading) {
    lyrics = <p>Wird geladen...</p>;
  }
  if (song) {
    lyrics = <Lyrics id={songId} songData={song} />;
  }
  return (
    <>
      {lyrics}
      <hr />
      {songSelect}
    </>
  );
};
export default Master;
