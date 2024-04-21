import React, { useState } from 'react';
import './Carousel.css'; // Import CSS for styling

const Carousel = ({ slides }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const nextSlide = () => {
    setCurrentSlideIndex((currentSlideIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlideIndex((currentSlideIndex - 1 + slides.length) % slides.length);
  };

  return (
    <div className="carousel">
      <div className="slide">
        <img src={slides[currentSlideIndex].image} alt={slides[currentSlideIndex].title} />
        <div className="quote-box">
          <h2>{slides[currentSlideIndex].title}</h2>
          <p>"{slides[currentSlideIndex].quote}"</p>
        </div>
      </div>

      <button className="prev-next-btn prev-btn" onClick={prevSlide}>Previous</button>
      <button className="prev-next-btn next-btn" onClick={nextSlide}>Next</button>
    </div>
  );
};

export default Carousel;
