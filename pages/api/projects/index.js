import db from "@/lib/db";

export default async function handler(req, res) {

  let data = await fetch(`${process.env.API_SERVER_URL}/project`)
 
  res.status(200).json(db.projects);

}
