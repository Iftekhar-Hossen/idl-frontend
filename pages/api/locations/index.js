import axios from "axios";

export default function handler(req, res) {
  axios.get("http://localhost:8055/items/locations").then((response) => {
    console.log(response.data);
  }
    ).catch((error) => {
      console.log(error);
    });

}
