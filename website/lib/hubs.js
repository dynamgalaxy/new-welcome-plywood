import { mapPoint } from "./pakistanMap";

const images = [
  "/assets/products/hero-showroom.png",
  "/assets/comparison/after.png",
  "/assets/products/material-placeholders.png",
];

const places = [
  ["Peshawar", 71.52, 34.01], ["Abbottabad", 73.22, 34.15],
  ["Islamabad", 73.05, 33.69], ["Rawalpindi", 73.04, 33.60],
  ["Gujranwala", 74.19, 32.16], ["Sialkot", 74.54, 32.49],
  ["Lahore", 74.36, 31.55], ["Faisalabad", 73.13, 31.42],
  ["Multan", 71.47, 30.20], ["Quetta", 66.97, 30.18],
  ["Hyderabad", 68.37, 25.39], ["Karachi", 67.00, 24.86],
];

export const hubs = places.map(([city, lon, lat], index) => {
  const [x, y] = mapPoint(lon, lat);
  return ({
    id: index + 1,
    city,
    x: (x / 600) * 100,
    y: (y / 500) * 100,
    image: images[index % images.length],
    directions: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${city}, Pakistan`)}`,
  });
});
