import db from "@/lib/db";

export default function handler(req, res) {
    let id = req.query.id;
    let data = db.projects[id];
    if (!data) {
        return res.status(404).json({ error: "Not found" });
    }
  res.status(200).json(db.projects[id]);
}
