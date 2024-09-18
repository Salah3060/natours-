import axios from 'axios';
import { showAlert } from './alerts';

export const updateSettings = async (data, type) => {
  const url =
    type === 'password'
      ? 'http://127.0.0.1:3000/api/v1/users/updatePassword'
      : 'http://127.0.0.1:3000/api/v1/users/updateMe';
  try {
    const res = await axios({
      method: 'PATCH',
      url,
      data,
    });
    if (res.status === 200) {
      showAlert('success', `${type.toUpperCase()}  updated successfully!`);
      setTimeout(() => {
        location.reload(true);
      }, 1000);
    }
  } catch (err) {
    console.log(err);
    showAlert('error', err.response.data.message);
  }
};
