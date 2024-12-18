import axios from "axios";
import { log } from "console";

export default async function handler(req, res) {
  console.log("service-address req: ", req.method);
  if (req.method === "POST") {
    try {
      const data = req.body;
      console.log("service-address: ", JSON.stringify(data.prefix));

      const response = await axios.get(`https://api.gasnatural.io/v1.0.1/service/address/${data.prefix}`);
      console.log(`service response1 : ${response.data}`);
    
      res.status(200).send(response.data);
    } catch (error) {
      console.log("service-address error: ", error)
      res.status(error).send(error);
    }
  }
}