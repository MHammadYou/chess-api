import express, {response} from "express";
import axios from "axios";

const router = express.Router();


interface MatchData {
  result: string
  pgn: string
  white: object
  black: object
}


router.get('/random/:player',  (req, res) => {

  const username = req.params.player;
  const url = `https://api.chess.com/pub/player/${username}/games/2015/07`;


  axios.get(url)

    .then(response => {

      const data = response.data.games[0];

      const white = data.white;
      const black = data.black;

      delete white["@id"];
      delete black["@id"];

      const pgnSplitArr = data.pgn.split('\n');
      const pgn = pgnSplitArr[pgnSplitArr.length - 2];

      const result = pgn.slice(pgn.length - 3);

      const matchResult: MatchData = {
        result,
        pgn,
        white,
        black,
      }

      res.json(matchResult);

    })

    .catch(error => {
      console.log(error);
      res.json({"msg": "No such player"})
    })

})

router.get('/:username', (req, res) => {

  const username = req.params.username;

  const url = `https://api.chess.com/pub/player/${username}/games/archives`;
  axios.get(url)
    .then(response => {

      const data = response.data.archives[0];
      axios.get(data)
        .then(response => {
          res.json(response.data.games);
        })
    })
    .catch(error => {
      console.log(error);
      res.json({"msg": "err"})
    })
})

export default router;