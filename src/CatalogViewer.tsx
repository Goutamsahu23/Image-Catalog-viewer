import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  IconButton,
  Typography,
  Button,
  Card,
  CardMedia
} from "@material-ui/core";
import {
  PlayArrow,
  Pause,
  ChevronLeft,
  ChevronRight
} from "@material-ui/icons";

interface Image {
  id: number;
  url: string;
  details: string;
}

const images: Image[] = [
  {
    id: 1,
    url: "https://images.pexels.com/photos/572897/pexels-photo-572897.jpeg",
    details:
      "Mountains are majestic landforms that rise prominently above the surrounding terrain, reaching great heights and often adorned with snow-capped peaks. They are characterized by their towering presence, rugged slopes, and breathtaking vistas, making them awe-inspiring and captivating natural features."
  },
  {
    id: 2,
    url: "https://images.pexels.com/photos/2922672/pexels-photo-2922672.jpeg",
    details:
      "The underwater sea is a vast and captivating realm that lies beneath the surface of the Earth's oceans. It is a mysterious and diverse ecosystem teeming with life and filled with wonders yet to be fully explored and understood."
  },
  {
    id: 3,
    url: "https://images.pexels.com/photos/165505/pexels-photo-165505.jpeg",
    details:
      "Sunset view refers to the visual experience of observing the sun as it appears to descend below the horizon, marking the end of the day and the transition into evening. It is a captivating and often breathtaking natural phenomenon that occurs daily."
  }
  // Add more images here
];

const CatalogViewer: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSlideshowPlaying, setIsSlideshowPlaying] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isSlideshowPlaying) {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 3000);
    }

    return () => clearInterval(interval);
  }, [isSlideshowPlaying]);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handleThumbnailClick = (index: number) => {
    setCurrentIndex(index);
    setIsSlideshowPlaying(false);
  };

  const handleSlideshowToggle = () => {
    setIsSlideshowPlaying((prevIsPlaying) => !prevIsPlaying);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <Card>
          <CardMedia component="img" image={images[currentIndex].url} />
        </Card>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          mb={2}
        >
          <IconButton onClick={handlePrevious}>
            <ChevronLeft />
          </IconButton>
          <Typography variant="h6">Image {currentIndex + 1}</Typography>
          <IconButton onClick={handleNext}>
            <ChevronRight />
          </IconButton>
        </Box>
        <Typography variant="body1">{images[currentIndex].details}</Typography>
        <Box display="flex" justifyContent="center" mt={2}>
          <IconButton onClick={handleSlideshowToggle}>
            {isSlideshowPlaying ? <Pause /> : <PlayArrow />}
          </IconButton>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box display="flex" justifyContent="center">
          {images.map((image, index) => (
            <Button
              key={image.id}
              onClick={() => handleThumbnailClick(index)}
              style={{
                filter: index === currentIndex ? "none" : "grayscale(100%)",
                margin: "0 4px"
              }}
            >
              <img
                src={image.url}
                alt={`Thumbnail ${index + 1}`}
                width={80}
                height={60}
              />
            </Button>
          ))}
        </Box>
      </Grid>
    </Grid>
  );
};

export default CatalogViewer;
