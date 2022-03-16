import { NextApiRequest, NextApiResponse } from "next";
import { promises as fs } from "fs";
import { join } from "path";

export default async function id(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  try {
    const song = await fs.readFile(
      join(
        process.cwd(),
        "songs",
        "songfiles",
        `${id.toString().toUpperCase()}.sng`
      ),
      "utf-8"
    );
    res.send(song);
  } catch (e) {
    res.send("Des Liad gibts leider (nu) ned");
  }
}
