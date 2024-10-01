import { directusClient } from "@/lib/directus";
import { createItem } from "@directus/sdk";
export default async function handler(req, res) {
  if (req.method == "POST") {
    try {
      directusClient.request(createItem("contact", JSON.parse(req.body)));

      res.status(200).json({ message: "Ok" });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
    }
  } else {
    res.status(200).json({ message: "Method Not  Allowed" });
  }
}
