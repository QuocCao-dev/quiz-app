import { CardMedia } from "@mui/material";
import "./home.css"

function HomePage() {
  return (
    <div>
      <div id="scroll-container">
        <div id="scroll-text">Quiz App will help you learn better.</div>
      </div>
      <CardMedia
        component="img"
        height="500"
        image="../../public/Sunflower-Background-Image.jpg" // Replace with the actual image path
        alt="Image description"
      />
    </div>
  );
}

export default HomePage;
