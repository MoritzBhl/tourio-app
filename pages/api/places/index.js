import dbConnect from "@/db/connect";
import Place from "@/db/models/Place";

export default async function handler(request, response) {
  await dbConnect();
  if (request.method === "GET") {
    try {
      const places = await Place.find();
      return response.status(200).json(places);
    } catch (error) {
      return response.status(405).json({ error: error.message });
    }
  }

  if (request.method === "POST") {
    try {
      const placeDate = request.body;
      await Place.create(placeDate);
      response.status(201).json({ status: "Place created!" });
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}
