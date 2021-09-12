import axios from "axios";


axios.get('https://api.chess.com/pub/player/erik')
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.log(error);
  })