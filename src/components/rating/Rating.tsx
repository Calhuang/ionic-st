import React from 'react';
import './Rating.css'
import {
  IonIcon,
} from '@ionic/react';
import { star } from 'ionicons/icons';

interface RatingPropTypes { 
  numOfRating: number;
}

const Rating: React.FC<RatingPropTypes> = ({ numOfRating }) => { 
  const renderRating = () => { 
    const stars:JSX.Element[] = []
    for (let i = 0; i < numOfRating; i += 1) { 
      stars.push(<div key={`rating-${i}`}>
        <IonIcon icon={star} className="star"></IonIcon>
      </div>)
    }

    for (let i = 0; i < (5 - numOfRating); i += 1) { 
      stars.push(<div key={`rating-inactive-${i}`}>
        <IonIcon icon={star} className="star-inactive"></IonIcon>
      </div>)
    }

    return stars
  }
  return (
    <div className="rating-container">{renderRating()}</div>
  )
}

export default Rating