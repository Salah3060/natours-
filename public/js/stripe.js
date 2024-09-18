import axios from 'axios';
import { showAlert } from './alerts';

const stripe = Stripe(
  'pk_test_51Q01AVRteE8VWdKJUjuutbpEkGXV0PVLqSmVoDG0LR64gooK35x6LL0LHN1xS7Jb2o7ItlPji1OYVuv25MvfsRR100ytq8qvUq',
);

export const bookTour = async (tourId) => {
  try {
    const sessions = await axios(
      `http://127.0.0.1:3000/api/v1/booking/checkout-sessions/${tourId}`,
    );
    console.log(sessions);
    await stripe.redirectToCheckout({
      sessionId: sessions.data.session.id, // Make sure this matches the response structure
    });
  } catch (err) {
    console.log(err.response ? err.response.data : err.message); // Log detailed error
    showAlert('error', err.message); // Display error to the user
  }
};
