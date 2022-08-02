import axios from 'axios';

const instance = axios.create({
  baseURL:
    'http://ec2-3-34-252-245.ap-northeast-2.compute.amazonaws.com:8080/api/v1/',
  // baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
  headers: {
    Authorization:
      'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJ0ZW53b25tb2EiLCJleHAiOjE2NTkzNDQ0MTksImlhdCI6MTY1OTM0MDgxOSwidXNlcklkIjozLCJlbWFpbCI6InRlc3RAdGVzdC5jb20ifQ.eee2xl1U7HYJ5nDtE5_6m5XKkFP5Hc3f5TjpNLcBOqrk27p1BjVQuaXK3fyVZ-85uos87wS4CcJu5rOpT3xWZw',
    'Content-Type': 'application/json',
  },
});

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 404 || error.response.status === 400) {
      // window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export default instance;
