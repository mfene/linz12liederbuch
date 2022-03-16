import type { NextPage } from "next";
import { ChangeEvent, useState } from "react";

const Home: NextPage = () => {
  const [songId, setSongId] = useState("");

  const changeSongId = (e: ChangeEvent<HTMLInputElement>) => {
    setSongId(e.target.value);
  };

  return (
    <>
      <section className="container">
        <h5 className="title">Vorwort</h5>
        <p className="example">
          Hallo!
          <br />
          Wilkommen in der digitalen Version des Linz12 Liederbuchs!
        </p>
        <p>
          Vielen dank an Chrisi und die ganze Gitarrengruppe fürs zusammensuchen
          der Lieder
        </p>
      </section>
      <section className="container">
        <form action={`songs/${songId}`}>
          <fieldset>
            <h5 className="title">
              Mit der 4 Buchstaben Song ID kannst du direkt zu einem Lied
              springen
            </h5>
            <hr />
            <div className="row">
              <div className="column">
                <input
                  placeholder="Song ID"
                  value={songId}
                  onChange={changeSongId}
                />
              </div>
              <div className="column">
                <button>Suchen</button>
              </div>
            </div>
          </fieldset>
        </form>
      </section>
    </>
  );
};

export default Home;
