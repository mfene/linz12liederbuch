import { GetStaticPaths, GetStaticProps } from "next";
import { promises as fs } from "fs";
import path from "path";
import Lyrics from "../../components/Lyrics";
import { FC } from "react";

type songProps = {
  songData?: string;
  id: string;
  error?: any;
};

const Song: FC<songProps> = ({ songData, error, id }: songProps) => {
  if (error || !songData) {
    return <p>{error}</p>;
  }
  return (
    <>
      <Lyrics songData={songData} id={id} />
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const songfiles = await fs.readdir(
    path.join(__dirname, "..", "..", "..", "..", "songs", "songfiles"),
    { withFileTypes: false }
  );
  return {
    paths: songfiles.map((id) => ({
      params: {
        id,
      },
    })),
    fallback: true,
  };
};

export const getStaticProps = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  if (!/^[A-Za-z]{4}$/.test(id)) {
    return {
      props: {
        error: "Keine gültige Song ID!",
      },
    };
  }
  try {
    const songData = await fs.readFile(
      path.join(process.cwd(), "songs", "songfiles", `${id.toUpperCase()}.sng`),
      "utf-8"
    );
    return {
      props: {
        songData,
        id,
      },
    };
  } catch (e) {
    return {
      props: {
        error: "Des Liad gibts leider (nu) ned...",
      },
    };
  }
};
export default Song;
