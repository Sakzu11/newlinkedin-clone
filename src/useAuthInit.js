import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectuser, login, logout } from './userSlice';
import api from './api';

// Runs once on app load — silently refreshes the JWT if needed
export default function useAuthInit() {
  const dispatch = useDispatch();
  const user = useSelector(selectuser);

  useEffect(() => {
    const access = localStorage.getItem('access_token');
    const refresh = localStorage.getItem('refresh_token');

    if (!access && !refresh) {
      dispatch(logout());
      return;
    }

    // Try to verify the access token by hitting /api/profile/
    api.get('/profile/')
      .then((res) => {
        // token still valid — ensure Redux state is set
        if (!user) {
          dispatch(login({ username: res.data.user?.username, email: res.data.user?.email }));
        }
      })
      .catch(async () => {
        // access token expired — try refresh
        if (!refresh) { dispatch(logout()); return; }
        try {
          const res = await api.post('/token/refresh/', { refresh });
          localStorage.setItem('access_token', res.data.access);
          // re-fetch profile with new token
          const profile = await api.get('/profile/');
          dispatch(login({ username: profile.data.user?.username, email: profile.data.user?.email }));
        } catch {
          dispatch(logout());
        }
      });
  }, []); // eslint-disable-line
}
