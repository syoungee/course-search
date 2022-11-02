import './App.css';
import { getCourses } from './api/apis';
import { useState, useEffect } from 'react';

function App() {
  const [filter, setFilter] = useState({ title: '', enroll_type: 0, is_free: true });
  const [price, setPrice] = useState([]);
  const value = {
    filter_conditions: {
      $and: [{ title: `${filter.title}` }, { $or: [{ enroll_type: `${filter.enroll_type}`, is_free: `${filter.is_free}` }] }],
    },
    offset: 0,
    count: 20,
  };
  // value.filter_conditions.$and.push({ enroll_type: 0, is_free: false });

  useEffect(() => {
    getAllCourses(value);
  }, []);

  const getAllCourses = (data) => {
    getCourses(data).then((res) => {
      if (res.course_count) {
        console.log(res.courses);
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
            <input type="text" className="search-box" placeholder="배우고 싶은 언어, 기술을 검색해 보세요"></input>
            {
              //TODO: 300ms debounce search
            }
          </div>
        </div>
        <div className="select-area">
          {/* TODO: 데이터 가져와서 ul li 구현 */}
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
        <div className="course-body">
          <div className="course-card"></div>
          <div className="course-card"></div>
          <div className="course-card"></div>
          <div className="course-card"></div>
          <div className="course-card"></div>
          <div className="course-card"></div>
          <div className="course-card"></div>
          <div className="course-card"></div>
          {/* TODO: 강의 목록 뿌려주기 */}
          {/* TODO: pagination 구현 */}
        </div>
      </div>
    </div>
  );
}

export default App;
