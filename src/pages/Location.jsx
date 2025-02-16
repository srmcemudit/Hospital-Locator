// import { AdvancedMarker, APIProvider, Map } from "@vis.gl/react-google-maps";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useEffect, useState } from "react";
import axios from "axios";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import key from '../secret.json';
function Location() {
  const [pos, setPos] = useState();
  const [places, setplaces] = useState([]);
  const api_key = key.web.API_KEY;

  const healthIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/4314/4314281.png",
    iconSize: [50, 50], // size of the icon
  });

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newPos = [position.coords.latitude, position.coords.longitude];
          setPos(newPos);
        },
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  async function location() {
    try {
      let data = await axios.get(
        `https://maps.gomaps.pro/maps/api/place/nearbysearch/json?keyword=hospital&location=${pos}&name=hospital&radius=4000&type='hospital|pharmacy|doctor|nursing|trauma'&language=en&key=${api_key}`
      );
      const results = [];
      data.data.results.forEach((place) =>
        results.push({
          lat: place.geometry.location.lat,
          lng: place.geometry.location.lng,
          placeName: place.name,
        })
      );
      setplaces(results);
    } catch (error) {
      console.error("axios erroer", error);
    }
  }

  if (pos) {
    return (
      <>
        <MapContainer
          center={pos}
          zoom={8}
          style={{ height: "80vh", width: "100vw" }}
        >
          <TileLayer
            url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='<a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
          />
          <Marker position={pos}>
            <Popup>You are here!</Popup>
          </Marker>
          {places.map((place, index) => (
            <Marker
              key={index}
              position={[place.lat, place.lng]}
              icon={healthIcon}
            >
              <Popup>{place.placeName}</Popup>
            </Marker>
          ))}
        </MapContainer>
        <button onClick={location} className="location-btn">
          get hospital
        </button>
        <p>Welcome {JSON.parse(localStorage.getItem("userData")).name}</p>
      </>
    );
  }
}

export default Location;
