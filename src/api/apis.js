import axios from 'axios';

export const getCourses = async (data) => {
  const result = await axios.get(process.env.REACT_APP_API_URL, { params: data }).then((res) => {
    // console.log(res.data);
    return res.data;
  });
  return result;
};
