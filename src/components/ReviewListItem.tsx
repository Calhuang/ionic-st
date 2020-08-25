import React from 'react';
import {
  IonItem,
  IonLabel,
  IonNote,
  IonThumbnail
  } from '@ionic/react';
import { Review } from '../data/review';
import './ReviewListItem.css';
import { getLocaleDate } from '../utils'
import { imageSharp } from 'ionicons/icons';

interface ReviewListItemProps {
  review: Review;
}

const ReviewListItem: React.FC<ReviewListItemProps> = ({ review }) => {
  
  return (
    <IonItem routerLink={`/review/${review.id}`} detail={false}>
      <IonThumbnail slot="start">
        <img className="home-image-thumbnail" src={(review.location.images && review.location.images.length > 0) ? review.location.images[0] : imageSharp} alt="profile"/>
      </IonThumbnail>
      <IonLabel className="ion-text-wrap">
        <h2>
          {review.location.name}
          <span className="date">
            <IonNote>{getLocaleDate(review.created_at)}</IonNote>
          </span>
        </h2>
        <h3>by: {review.reviewed_by}</h3>
        <p>
          {review.review.slice(0, 35)}
        </p>
      </IonLabel>
    </IonItem>
  );
};

export default ReviewListItem;
