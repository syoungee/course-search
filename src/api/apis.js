import axios from 'axios';

export const getCourses = async (data) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  const result = await axios.get(process.env.REACT_APP_API_URL, { params: JSON.parse(data) }, headers).then((res) => {
    return res.data;
  });
  return result;
};
