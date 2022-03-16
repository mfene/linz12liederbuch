import { FC, useState } from "react";
import Lyrics from "../components/Lyrics";
import useSocket from "../hooks/useSocket";
import useSong from "../hooks/useSong";

const Live: FC = () => {
  const [songId, setSongId] = useState("");
  useSocket("next-song", (songId) => {
    setSongId(songId);
  });
  const { song, isLoading } = useSong(songId);
  if (!songId) {
    return <p>Session sicher gestartet?</p>;
  }
  if (isLoading) {
    return <p>Lade Song {songId}...</p>;
  }
  if (!song) {
    return <p>Da is was schiefgegangen</p>;
  }
  return <Lyrics id={songId} songData={song} />;
};
export default Live;
