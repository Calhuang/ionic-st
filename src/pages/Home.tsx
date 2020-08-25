import ReviewListItem from '../components/ReviewListItem';
import React, { useState } from 'react';
import { getReviews, Review } from '../data/review';
import {
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
  IonFab,
  IonFabButton,
  IonIcon,
  IonSearchbar
} from '@ionic/react';
import './Home.css';
import { add } from 'ionicons/icons';

const Home: React.FC = () => {

  const [reviews, setReviews] = useState<Review[]>([]);
  const [filteredReviews, setFilteredReviews] = useState<Review[]>([]);
  const [searchText, setSearchText] = useState('')

  useIonViewWillEnter(async () => {
    const msgs = await getReviews();
    const sorted = msgs.sort((a, b) => Number(b.created_at) - Number(a.created_at))
    setReviews(sorted);
    setFilteredReviews(msgs);
  });

  const refresh = (e: CustomEvent) => {
    setTimeout(() => {
      e.detail.complete();
    }, 3000);
  };

  const onSearchInput = (e: CustomEvent) => {
    // TODO set debounce
    let search = e.detail.value
    setSearchText(search!)
    let filtered = reviews.filter(item => { 
      if (
        (item.location.name.toLowerCase().includes(search.toLowerCase())) ||
        (item.reviewed_by.toLowerCase().includes(search.toLowerCase())) ||
        (item.location.city?.toLowerCase().includes(search.toLowerCase())) ||
        (item.location.state?.toLowerCase().includes(search.toLowerCase())) ||
        (item.location.zip?.toLowerCase().includes(search.toLowerCase()))
      ) { 
        return true
      }
    })
    setFilteredReviews(filtered)
  }

  return (
    <IonPage id="home-page">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Reviews</IonTitle>
        </IonToolbar>
      </IonHeader>
      
      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={refresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">
              Reviews
            </IonTitle>
          </IonToolbar>
        </IonHeader>
        
        <IonSearchbar value={searchText} onIonChange={e => onSearchInput(e)} animated enterkeyhint="enter"></IonSearchbar>

        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton color="secondary" routerLink={`/review/add`}>
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>

        <IonList class="ion-padding">
          {filteredReviews.map((m, index) => <ReviewListItem key={m.reviewed_by + index} review={m} />)}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Home;
