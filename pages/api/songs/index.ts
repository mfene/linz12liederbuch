import { NextApiRequest, NextApiResponse } from "next";
import { promises as fs } from "fs";
import { join } from "path";

export default async function songs(req: NextApiRequest, res: NextApiResponse) {
  const search = req.query.s;
  const songs = await fs.readFile(
    join(process.cwd(), "songs", "songlist.lb"),
    "utf-8"
  );
  const array = songs.split("\n");
  if (!search || typeof search !== "string") {
    res.json(array);
    return;
  }
  res.json(array.filter((song) => song[1].includes(search)));
}
