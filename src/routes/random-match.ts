import express from "express";
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
  const url = `https://api.chess.com/pub/player/${username}/games/archives`;


  axios.get(url)

    .then(response => {

      const archives = response.data.archives;
      let archive = archives[Math.floor(Math.random()*archives.length)];

      if (archives.length <= 0) {
        res.json({"msg": "No record found"});
        return;
      }

      axios.get(archive)
        .then(response => {
          const data = response.data.games;
          const game = data[Math.floor(Math.random()*data.length)];

          // returns an object with only rating, result and username
          const white = (({rating, result, username}) => ({rating, result, username}))(game.white);
          const black = (({rating, result, username}) => ({rating, result, username}))(game.black);

          const pgnSplitArr = game.pgn.split('\n');
          const pgn = pgnSplitArr[pgnSplitArr.length - 2];

          const _result = pgn.slice(pgn.length - 3);

          const matchResult: MatchData = {
            result: _result,
            pgn,
            white,
            black,
          }

          res.json(matchResult);
        })
    })

    .catch(error => {
      const data = error.response.data;
      data.message = data.message.replace(new RegExp("\"", "g"), "'");
      res.json(data);
    })

})

export default router;