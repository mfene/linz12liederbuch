import { FC } from "react";
import useSongs from "../hooks/useSongs";
import Songlist from "./Songlist";

const SongSelect: FC<{ selectSong: (id: string) => void }> = ({
  selectSong,
}) => {
  const { songs, error } = useSongs();

  if (error) {
    return <p>Da is was schiefgegangen</p>;
  }
  return (
    <>
      <Songlist songlist={songs || []} handleClick={selectSong} />;
      {/* <ul>{results}</ul> */}
    </>
  );
};
export default SongSelect;
