import axios from 'axios';

export const getCourses = async (data) => {
  try {
    const result = await axios.get(process.env.REACT_APP_API_URL, { params: JSON.parse(data) }).then((res) => {
      console.log(res.data);
      return res.data;
    });
    return result;
  } catch (err) {
    console.log(err);
    if (err.response.status === 404) {
      console.log('404 error found');
    }
  } finally {
    console.log('getCourses api called');
  }
};
