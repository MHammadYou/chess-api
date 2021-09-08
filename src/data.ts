import axios from "axios";

axios.get('https://google.com')
  .then(response => {
    console.log(response);
  })