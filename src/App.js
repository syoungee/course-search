import './App.css';
import { getCourses } from './api/apis';
import { useState, useEffect } from 'react';
import CourseBoard from './components/CourseBoard';
import Pagination from './components/Pagination';
import SearchBar from './components/SearchBar';
import Category from './components/Category';

function App() {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState([]);
  const [pageIndex, setPageIndex] = useState(1);
  const [courses, setCourses] = useState([]);
  const [filterValue, setFilterValue] = useState({
    filter_conditions: {
      $and: [
        { title: title },
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
    getAllCourses(JSON.stringify(filterValue));
  }, [pageIndex, price.length]);

  const getAllCourses = (data) => {
    getCourses(data).then((res) => {
      if (res.course_count) {
        setCourses(res.courses);
        return res.courses;
      }
    });
  };

  return (
    <div className="container">
      <div className="layout">
        <SearchBar setTitle={setTitle} />
        <Category setPrice={setPrice} setFilterValue={setFilterValue} title={title} pageIndex={pageIndex} price={price}/>
        <div className="total-count"> 전체 121개 </div>
        <CourseBoard courses={courses}></CourseBoard>
        {/* TODO: pagination 구현 */}
        <Pagination pageIndex={pageIndex} setPageIndex={setPageIndex} />
      </div>
    </div>
  );
}

export default App;
