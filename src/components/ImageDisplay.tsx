import React from 'react'
import type { MenuItem } from '../types'

interface ImageDisplayProps {
  selectedItem: MenuItem
}

const ImageDisplay: React.FC<ImageDisplayProps> = ({ selectedItem }) => {
  return (
    <div className="left-column">
      <div className="image-container">
        <img 
          src={selectedItem.image} 
          alt={selectedItem.title}
          className="main-image"
        />
        <div className="image-overlay">
          <h2>{selectedItem.title}</h2>
          <p>{selectedItem.description}</p>
        </div>
      </div>
    </div>
  )
}

export default ImageDisplay
