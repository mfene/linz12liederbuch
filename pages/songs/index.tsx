import { GetStaticProps } from "next";
import Link from "next/link";
import { promises } from "fs";
import path from "path";
import { MouseEvent, useState } from "react";
import Songlist from "../../components/Songlist";

type songlistProps = {
  songlist: string[];
};

export default function songs({ songlist }: songlistProps): JSX.Element {
  return <Songlist songlist={songlist} baseHref="/songs" />;
}

export const getStaticProps: GetStaticProps = async () => {
  const songlist = await promises.readFile(
    path.join(process.cwd(), "songs", "songlist.lb"),
    "utf-8"
  );
  return { props: { songlist: songlist.split("\n") } };
};
