
import React from 'react';

const Gallery = ({ images }) => {
  const imgs = images.map(({ _id, imgSrc }) => {
    return (
      <div className="img-container" key={_id}>
        <img src={`http://localhost:5000/uploads/${imgSrc}`} alt={imgSrc} />
      </div>
    );
  });

  return (
    <div className="galery-container d-flex flex-wrap justify-content-between">
      {imgs}
    </div>
  );
};

export default Gallery;
