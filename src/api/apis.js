import axios from 'axios';

export const getCourses = async ({ title, price, pageIndex }) => {
  const orCondition =
    price.length === 1
      ? [{ enroll_type: 0, is_free: price[0] === 'free' }]
      : [
          { enroll_type: 0, is_free: true },
          { enroll_type: 0, is_free: false },
        ];
  const filterValue = {
    filter_conditions: JSON.stringify({
      $and: [
        { title: '%' + title + '%' },
        {
          $or: orCondition,
        },
      ],
    }),
    offset: (pageIndex - 1) * 10,
    count: 20,
  };

  try {
    const result = await axios.get(process.env.REACT_APP_API_URL, { params: filterValue }, { withCredentials: true }).then((res) => {
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
