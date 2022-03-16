## Linz12Liederbuch

Linz12Liederbuch is a [Next.js](https://nextjs.org/) application for providing your club's songbooks via the web, written by the scouting group Linz 12, Austria. This version is strongly inspired by Daniel's php application, extending it with real-time features powered by the WebSocket framework [Socket.IO](https://socket.io).

Besides browsing the songbook by titles and viewing a song's lyrics, the application supports live sessions (currently one at a time per server). This allows one user to navigate to the `/master` page and select the song to be displayed at the `/live` page, which the other users can stay at. The master page is not linked anywhere to prevent accidental (or less accidental) switching.

The songlist and individual song pages make use of Next.js's static site generation.

## Setup

Before this application can run, the following steps must be carried out.

### 0. Prerequisites

Linz12Liederbuch requires [Node.js](https://nodejs.org) and [NPM](https://npmjs.com) to run. Make sure the `npm` command is available on the path.

### 1. Inserting song data

First, generate / create a 4-character-long ID (case-insensitive), unique for each song. Then, add the file 'songlist.lb' to the 'songs' directory in the project root. This file should list the song IDs in the following way:  
SongID;Song Title. S semicolon is expected as separator. Example:

```csv
ARSS;A Ram Sam Sam
```

The songs directory must also contain a 'songfiles' subdir with a separate file for each song:

Continuing the last example, the file should be named 'SONG.sng' - with the 4-char song ID as name and the '.sng' extension.

- linz12liederbuch
  - songs
    - songlist.lb
    - EXPL.sng
    - SNG1.sng
    - ... .sng

The first line of each song file will be rendered as title.

### 2. Building the application

It is important to first create the song data directory structure and then build, because of Next.js's static site generation features.

```bash
npm install # Install dependencies
npm run build # Run the Next.js build, not necessary if running for dev mode
# npm run dev # Run the application in dev mode using nodemon
```

## Running and configuring Linz12Liederbuch

After the build has finished, the application will be ready to run. When issuing the `npm start` command, the following environment variables will be considered (including default values):

- NODE_ENV=development (can be set to 'production')
- PORT=3000 (the Socket.IO server uses the same port as the HTTP server)
- DISABLE_AUTH= (Setting this variable to any value will disable the Basic Auth)
- LB_USER= (If using auth, this is the only accepted user...)
- LB_PWD= (...and this their password)

It is required to either set username and password or disable authentication. Else, the server will not start

## License

Linz12Liederbuch is licensed under the [GNU GPLv3](COPYING).
