import './App.css';
import { getCourses } from './api/apis';
import { useState, useEffect } from 'react';
import CourseBoard from './components/CourseBoard';
import Pagination from './components/Pagination';
import SearchBar from './components/SearchBar';

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

  const filterValue1 = {
    filter_conditions: {
      $and: [{ title: title }, { $or: [{ enroll_type: 0, is_free: true }] }],
    },
    offset: (pageIndex - 1) * 10,
    count: 20,
  };

  const filterValue2 = {
    filter_conditions: {
      $and: [{ title: title }, { $or: [{ enroll_type: 0, is_free: true }] }],
    },
    offset: (pageIndex - 1) * 10,
    count: 20,
  };

  const filterValue3 = {
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
  };

  useEffect(() => {
    getAllCourses(JSON.stringify(filterValue3));
  }, [pageIndex, price.length]);

  const getAllCourses = (data) => {
    getCourses(data).then((res) => {
      if (res.course_count) {
        setCourses(res.courses);
        return res.courses;
      }
    });
  };

  const onClick = (e) => {
    const value = e.target.getAttribute('value');
    if (price.includes(value)) {
      const result = price.filter((item) => {
        return item !== value;
      });
      e.target.classList.remove('clicked');
      setPrice(result);
    } else {
      e.target.classList.add('clicked');
      setPrice([...price, value]);
    }
    getFilterData();
  };

  const getFilterData = () => {
    console.log(price);
    if (price.length === 2) {
      setFilterValue(filterValue3);
    } else if (price[0] === 'free') {
      setFilterValue(filterValue1);
    } else if (price[0] === 'charged') {
      setFilterValue(filterValue2);
    } else {
      setFilterValue(filterValue3);
    }
  };

  return (
    <div className="container">
      <div className="layout">
        <SearchBar setTitle={setTitle} />
        <div className="select-area">
          <div className="category">가격</div>
          <div className="chip-area">
            <div className="button" value="free" onClick={(e) => onClick(e)}>
              무료
            </div>
            <div className="button" value="charged" onClick={(e) => onClick(e)}>
              유료
            </div>
          </div>
        </div>
        <div className="total-count"> 전체 121개 </div>
        <CourseBoard courses={courses}></CourseBoard>
        {/* TODO: pagination 구현 */}
        <Pagination pageIndex={pageIndex} setPageIndex={setPageIndex} />
      </div>
    </div>
  );
}

export default App;
