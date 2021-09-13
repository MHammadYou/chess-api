import axios from "axios";

let archive = null;


export default function getData() {
  axios.get('https://api.chess.com/pub/player/erik/games/archives')
    .then(response => {
      const archives = response.data.archives;
      archive = archives[0];

      axios.get(archive)
        .then(response => {
          console.log(response.data.games[0].pgn)
          return response.data.games[0].pgn;
        })
    })
    .catch(error => {
      console.log(error)
    })
}



