import './App.css';
import { getCourses } from './api/apis';
import { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import Category from './components/Category';
import CourseBoard from './components/CourseBoard';
import Pagination from './components/Pagination';

function App() {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState([]);
  const [countCourses, setCountCourses] = useState(0);
  const [pageIndex, setPageIndex] = useState(1);
  const [courses, setCourses] = useState([]);
  const [filterValue, setFilterValue] = useState({
    filter_conditions: {
      $and: [
        { title: '%' + title + '%' },
        {
          $or: [
            { enroll_type: 0, is_free: true },
            { enroll_type: 0, is_free: false },
          ],
        },
      ],
    },
    offset: (pageIndex - 1) * 10,
    count: 20,
  });

  useEffect(() => {
    filterValue.filter_conditions.$and[0].title = '%' + title + '%';
    getAllCourses(JSON.stringify({ ...filterValue, filter_conditions: JSON.stringify(filterValue.filter_conditions) }));
  }, [filterValue, title, pageIndex, price, price.length]);

  const getAllCourses = (data) => {
    getCourses(data).then((res) => {
      if (res._result.status === 'ok') {
        setCountCourses(res.course_count);
        setCourses(res.courses);
      }
    });
  };

  return (
    <div className="container">
      <div className="layout">
        <SearchBar setTitle={setTitle} title={title} />
        <Category setPrice={setPrice} setFilterValue={setFilterValue} title={title} pageIndex={pageIndex} setPageIndex={setPageIndex} price={price} />
        <div className="total-count"> 전체 {countCourses}개 </div>
        <CourseBoard courses={courses} />
        <Pagination pageIndex={pageIndex} setPageIndex={setPageIndex} />
      </div>
    </div>
  );
}

export default App;
