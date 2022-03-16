import Link from "next/link";
import { ChangeEvent, FC, useState } from "react";

type SonglistProps = {
  songlist: string[];
  baseHref?: string;
  handleClick?: (songId: string) => void;
};

const Songlist: FC<SonglistProps> = ({ songlist, baseHref, handleClick }) => {
  const [sortedAlphabetically, setSortedAlphabetically] = useState(false);
  const [search, setSearch] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const toggleSortAlphabetically = () => {
    setSortedAlphabetically(!sortedAlphabetically);
  };

  const filteredSongs =
    songlist?.filter((song) =>
      song.toLowerCase().includes(search.toLowerCase())
    ) || [];

  if (sortedAlphabetically) {
    filteredSongs.sort((s1, s2) => s1.slice(5).localeCompare(s2.slice(5)));
  }

  const songLinks = filteredSongs.map((s) => {
    const songData = s.split(";");
    return (
      <div key={songData[0]}>
        {/* If baseRef is present, return actual link, else return <a> w/ click listener */}
        {baseHref || !handleClick ? (
          <Link href={`${baseHref}/${songData[0]}`}>
            <a>{songData[1]}</a>
          </Link>
        ) : (
          <a href="#" onClick={() => handleClick(songData[0])}>
            {songData[1]}
          </a>
        )}
        <br />
      </div>
    );
  });
  return (
    <>
      <label>
        Durchsuchen
        <button
          style={{ margin: "0" }}
          type="button"
          className="button button-clear"
          onClick={() => toggleSortAlphabetically()}
        >
          {`A-Z${sortedAlphabetically ? " \u2713" : ""}`}
        </button>
      </label>
      <input value={search} onChange={handleChange} />
      <div className="example">{songLinks}</div>
    </>
  );
};
export default Songlist;
