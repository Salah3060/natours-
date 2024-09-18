import axios from 'axios';
import { showAlert } from './alerts';
import '@babel/polyfill';
export const login = async (email, password) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:3000/api/v1/users/login',
      data: {
        email,
        password,
      },
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Logged in successfully!');
      window.setTimeout(() => {
        location.assign('/overview');
      }, 1500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

export const logout = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: 'http://127.0.0.1:3000/api/v1/users/logout',
    });
    console.log(res);
    if (res.status === 200) {
      showAlert('success', 'Logged out successfully!');
      setTimeout(() => {
        location.assign('/overview');
        location.reload(true);
      }, 1500);
    }
  } catch (err) {
    console.log(err);
    showAlert('error', err.response.data.message);
  }
};
