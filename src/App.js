import './App.css';
import { getCourses } from './api/apis';
import { useState, useEffect } from 'react';
import CourseBoard from './components/CourseBoard';

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
  }, [pageIndex, price.length, title]);

  const getAllCourses = (data) => {
    getCourses(data).then((res) => {
      if (res.course_count) {
        setCourses(res.courses);
        return res.courses;
      }
    });
  };

  const inputChange = (e) => {
    const text = e.target.value;
    console.log(text);
    setTitle(text);
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

  const pageOnClick = (e) => {
    const value = e.target.getAttribute('value');
    if (value !== '-1' || value !== '+1') {
      setPageIndex(parseInt(value));
    } else if (value === '-1') {
      if (value >= 2) setPageIndex(parseInt(value) - 1);
    } else if (value === '+1') {
      if (value < 20) setPageIndex(parseInt(value) + 1);
    }
  };

  return (
    <div className="container">
      <div className="layout">
        <div className="search-area">
          <div className="icon-area">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#000000"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>
          <div className="input-area">
            <input type="text" className="search-box" onChange={inputChange} placeholder="배우고 싶은 언어, 기술을 검색해 보세요"></input>
            {
              //TODO: 300ms debounce search
            }
          </div>
        </div>
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
        {<CourseBoard courses={courses}></CourseBoard>}

        {/* TODO: pagination 구현 */}

        <div className="page-container">
          <span>
            <div className="index" value="-1" onClick={(e) => pageOnClick(e)}>
              {`<`}
            </div>
            <div className="index" value="1" onClick={(e) => pageOnClick(e)}>
              1
            </div>
            <div className="index" value="2" onClick={(e) => pageOnClick(e)}>
              2
            </div>
            <div className="index" value="3" onClick={(e) => pageOnClick(e)}>
              3
            </div>
            <div className="index" value="4" onClick={(e) => pageOnClick(e)}>
              4
            </div>
            <div className="index" value="5" onClick={(e) => pageOnClick(e)}>
              5
            </div>
            <div className="index" value="+1" onClick={(e) => pageOnClick(e)}>
              {`>`}
            </div>
          </span>
        </div>
      </div>
    </div>
  );
}

export default App;
