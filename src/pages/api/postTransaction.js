export default function handler (req, res) {
  res.status(200).json({"Body" : req.body})
}