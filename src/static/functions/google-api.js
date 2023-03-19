require("dotenv").config();
const fetch = require("node-fetch");

exports.handler = async function (event) {
  const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
  const eventBody = JSON.parse(event.body);
  const address = eventBody.address;
  const FETCH_URL = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(
    address
  )}&key=${GOOGLE_API_KEY}`;

  try {
    const response = await fetch(FETCH_URL, {
      method: "GET",
      headers: { Accept: "application/json" },
    });
    const data = await response.json();

    if (data.status !== "OK") {
      console.error(data);
      throw new Error("Could not fetch location!");
    }

    const coords = data.results[0].geometry.location;
    const viewport = data.results[0].geometry.viewport;
    const locationData = JSON.stringify({ coords: coords, viewport: viewport });

    return {
      statusCode: 200,
      body: locationData,
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed fetching data" }),
    };
  }
};
