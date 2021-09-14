import axios from "axios";


export default function getData() {
  axios.get('https://api.chess.com/pub/player/erik/games/archives')
    .then(response => {
      const archives = response.data.archives;
      const archive = archives[0];

      axios.get(archive)
        .then(res => {
          const _data = res.data.games[0].pgn;
          return _data;
        })
    })
    .catch(error => {
      console.log(error)
    })
}



