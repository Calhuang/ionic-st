import React, { useState, useEffect } from 'react';
import { postReview, Review} from '../data/review';
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  IonLabel,
  IonInput,
  IonTitle,
  IonList,
  IonTextarea,
  IonItem,
  IonRange,
  IonButton,
  IonIcon,
  IonListHeader,
  IonLoading,
} from '@ionic/react';
import './AddReview.css';
import { camera } from 'ionicons/icons';
import { takePicture } from '../utils/camera'
import { uploadImage, isObjectEmpty } from '../utils'

interface IAddReview {
  onClick: () => void;
}


const AddReview: React.FC<IAddReview> = () => {

  const [review, setReview] = useState<Review>({
    location: {
      city: '',
      state: '',
      name: '',
      images: [],
      addr1: '',
      addr2: '',
      zip: '',
    },
    reviewed_by: '',
    review: '',
    rating: 0,
    created_at: '',
  });

  const [showLoading, setShowLoading] = useState(false)
  const [canSubmit, setCanSubmit] = useState(false)

  useEffect(() => {
    if (!isObjectEmpty(review.location) && !isObjectEmpty(review)) {
      setCanSubmit(true)
    } else { 
      setCanSubmit(false)
    }
  }, [review])

  const submit = async () => {
    // TODO add validation
    await postReview(review)
    window.location.replace('/home')
  }

  const updateNestedState = (e:CustomEvent, field:string) => {
    let state = { ...review } as Review
    state.location = { ...review.location, [field]: e.detail.value }
    setReview({ ...state })
  }

  const getPicture = async () => { 
    // get image
    try { 
      const img = await takePicture()
      setShowLoading(true)
      const name = img && img.dataUrl && img.dataUrl.slice(69, 85)
      const fileType = (img && img.format) || 'jpg'
      if (name && img.dataUrl) {
        // upload
        const url = await uploadImage(img.dataUrl, name, fileType)
        let state = { ...review } as Review
        state && state.location && state.location.images && state.location.images.push(url)
        setReview({ ...state })
        setShowLoading(false)
      } else { 
        alert('could not upload image')
        setShowLoading(false)
        return
      }
    } catch (err) {}
  }

  return (
    <IonPage id="add-review-page">
      <IonHeader translucent>
        <IonToolbar>
          <IonButtons>
            <IonBackButton text="Reviews" defaultHref="/home"></IonBackButton>
          </IonButtons>
          <IonTitle>Add Review</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonList>
          <IonListHeader>
            <div>Info</div>
          </IonListHeader>
          <IonItem>
            <IonLabel>Your Name</IonLabel>
            <IonInput value={review.reviewed_by} placeholder="Anon" onIonChange={e => setReview({...review, reviewed_by: e.detail.value || ''})}></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel>Store Name</IonLabel>
            <IonInput value={review.location.name} placeholder="Enter Input" onIonChange={e => updateNestedState(e, 'name')}></IonInput>
          </IonItem>
          <IonListHeader>
            <div>Address</div>
          </IonListHeader>
          <IonItem>
            <IonLabel>Address 1</IonLabel>
            <IonInput value={review.location.addr1} placeholder="Enter Input" onIonChange={e => updateNestedState(e, 'addr1')}></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel>Address 2</IonLabel>
            <IonInput value={review.location.addr2} placeholder="Enter Input" onIonChange={e => updateNestedState(e, 'addr2')}></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel>City</IonLabel>
            <IonInput value={review.location.city} placeholder="Enter Input" onIonChange={e => updateNestedState(e, 'city')}></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel>State</IonLabel>
            <IonInput value={review.location.state} placeholder="Enter Input" onIonChange={e => updateNestedState(e, 'state')}></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel>Zipcode</IonLabel>
            <IonInput value={review.location.zip} placeholder="Enter Input" onIonChange={e => updateNestedState(e, 'zip')}></IonInput>
          </IonItem>
          <IonListHeader>
            <div>Rating</div>
          </IonListHeader>
          <IonItem>
            <IonRange
              min={1}
              max={5}
              step={1}
              pin
              snaps={true}
              color="secondary"
              value={review.rating}
              onIonChange={e => setReview({ ...review, rating: e.detail.value as number })}
            >
              <div slot="start">1</div>
              <div slot="end">5</div>
            </IonRange>
          </IonItem>
          <IonListHeader>
            <div>Images</div>
          </IonListHeader>
          <IonItem className="camera-button">
            <div className="camera-button-wrapper">
              <IonButton size="small" color="secondary" onClick={e => getPicture()}>
                <IonIcon icon={camera} style={{color: 'white'}} slot="start"></IonIcon>
                <IonLabel>Upload Image</IonLabel>
              </IonButton>
            </div>
            <IonLoading
              cssClass='my-custom-class'
              isOpen={showLoading}
              onDidDismiss={() => setShowLoading(false)}
              message={'Please wait...'}
              duration={5000}
            />
          </IonItem>
          <IonListHeader>
            <div>Write your review:</div>
          </IonListHeader>
          <IonItem>
            <IonTextarea placeholder="Enter Input" onIonChange={e => setReview({...review, review: e.detail.value || 'Anon'})}></IonTextarea>
          </IonItem>
        </IonList>
        <IonButton className="add-review-button" expand="block" fill="solid" onClick={e => submit()} disabled={!canSubmit}>Submit</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default AddReview;
