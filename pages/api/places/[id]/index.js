import dbConnect from "@/db/connect";
import Place from "@/db/models/Place";
import { resolve } from "styled-jsx/css";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (request.method === "GET") {
    const place = await Place.findById(id);
    if (!place) {
      return response.status(404).json({ status: "Not found!" });
    }
    return response.status(200).json(place);
  }
  if (request.method === "PATCH") {
    try {
      const placeData = request.body;
      await Place.findByIdAndUpdate(id, { $set: placeData });
      return response.status(200).json({ status: "Place Updated!" });
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
  if (request.method === "DELETE") {
    await Place.findByIdAndDelete(id);
    return response.status(200).json({ status: "Place Deleted" });
  }
}
