type LyricsProps = {
  songData: string;
  id: string;
};

export default function Lyrics({ songData, id }: LyricsProps) {
  const lines = songData.split("\n");
  const title = lines[0];
  lines.splice(0, 1);
  const lyrics = lines.join("\n");
  return (
    <>
      <section>
        <h5 className="title">{title}</h5>
        <p style={{ whiteSpace: "pre-line" }}>{lyrics}</p>
      </section>
      <footer className="footer">
        <section className="container">
          <p>
            <i>Song ID: </i>
            <b>{id}</b>
          </p>
        </section>
      </footer>
    </>
  );
}
