import React, { useState } from 'react';
import { getReview, Review} from '../data/review';
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonChip,
  IonNote,
  IonPage,
  IonToolbar,
  IonImg,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  useIonViewWillEnter,
  IonCardSubtitle
} from '@ionic/react';
import { personCircle, location } from 'ionicons/icons';
import { RouteComponentProps } from 'react-router';
import './ViewReview.css';
import { getLocaleDate } from '../utils'
import Rating from '../components/rating/Rating'
import axios from 'axios'

interface ViewReviewProps extends RouteComponentProps<{ id: string; }> { }

const ViewReview: React.FC<ViewReviewProps> = ({ match }) => {

  const [review, setReview] = useState<Review>();
  const [weather, setWeather] = useState<any | undefined>()

  useIonViewWillEnter(async () => {
    const msg = await getReview(match.params.id);
    setReview(msg);
    if (msg && msg.location && msg.location.zip && /[0-9]+/.test(msg.location.zip)) { 
      const weather = await axios.get(`https://api.openweathermap.org/data/2.5/weather?zip=${msg.location.zip}&appid=9f19210e182be77c1f8edab03ca73ff7`)
      setWeather(weather.data)
    }
  });

  return (
    <IonPage id="view-review-page">
      <IonHeader translucent>
        <IonToolbar>
          <IonButtons>
            <IonBackButton text="Reviews" defaultHref="/home"></IonBackButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        {review ? (
          <>
            {(review.location.images && review.location.images.length > 0) && <IonItem>
              <IonImg src={review.location.images[0]} />
            </IonItem>}
            <IonItem>
              <div className="profile-section">
                <IonIcon icon={personCircle} color="primary"></IonIcon>
                <span>{review.reviewed_by}</span>
              </div>
              
              <IonLabel className="ion-text-wrap">
                <h2 className="review-header">
                  <IonChip color="secondary">
                    <IonLabel>{review.location.name}</IonLabel>
                  </IonChip>
                  <span className="date">
                    <IonNote>{getLocaleDate(review.created_at)}</IonNote>
                  </span>
                </h2>
                <div className="address">
                  <IonIcon icon={location} size="small" color="secondary"></IonIcon>
                  <h3>{`${review.location.addr1} ${review.location.addr2 || ''} ${review.location.city}, ${review.location.state} ${review.location.zip}`}</h3>
                </div>
                {(weather && weather.weather[0]) && <div className="weather-container">
                  <IonChip>
                    <span>Weather: </span>
                    <img height="32" src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="weather" />
                    <span>{`${weather.weather[0].main}`}</span>
                  </IonChip>
                </div>}
              </IonLabel>
            </IonItem>

            <div className="ion-padding">
              
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>Review</IonCardTitle>
                  <IonCardSubtitle><h1><Rating numOfRating={review.rating} /></h1></IonCardSubtitle>
                </IonCardHeader>

                <IonCardContent>
                  {review.review}
                </IonCardContent>
              </IonCard>
            </div>
          </>
        ) : <div>Review not found</div>}
      </IonContent>
    </IonPage>
  );
};

export default ViewReview;
