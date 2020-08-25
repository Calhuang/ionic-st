import { db } from '../firebaseConfig'

export interface Review {
  id?: string,
  location: {
    city?: string,
    state?: string,
    name: string,
    images?: Array<string>,
    addr1?: string,
    addr2?: string,
    zip?: string,
  };
  reviewed_by: string;
  review: string;
  rating: number;
  created_at: string;
}

export const getReviews = async () => { 
  // get the whole collection
  const reviews: Review[] = await db.collection("reviews")
  .get()
  .then(querySnapshot => {
    const data = querySnapshot.docs.map(doc => {
      return { id: doc.id, ...doc.data() } as Review
    });
    return data;
  });

  return reviews;
};

export const getReview = async (id:string) => { 
  // get the whole collection
  const review = await db.collection("reviews").doc(id).get()
  const data = review.data()
  return data as Review;
};

export const postReview = async (review:Review) => { 
  try {
    review.created_at = Date.now().toString()
    const res = await db.collection("reviews").doc().set(review)
  } catch (err) { 
    console.log(err)
  }
};
