import './App.css';
import { getCourses } from './api/apis';
import { useState, useEffect } from 'react';

function App() {
  const [filter, setFilter] = useState({ title: '', enroll_type: 0, is_free: true });
  const [price, setPrice] = useState([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [courses, setCourses] = useState([]);

  const value = {
    filter_conditions: {
      $and: [{ title: `${filter.title}` }, { $or: [{ enroll_type: `${filter.enroll_type}`, is_free: `${filter.is_free}` }] }],
    },
    offset: pageIndex,
    count: 20,
  };
  // value.filter_conditions.$and.push({ enroll_type: 0, is_free: false });

  useEffect(() => {
    getAllCourses(value);
  }, [value.offset, price, filter.title]);

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
  };

  const pageOnClick = (e) => {
    const value = e.target.getAttribute('value');

    if (value !== '-1' || value !== '+1') {
      setPageIndex((parseInt(value) - 1) * 10);
    } else if (value === '-1') {
      if (value !== 0) setPageIndex((parseInt(value) - 1) * 10);
    } else if (value === '+1') {
      if (value !== 200) setPageIndex((parseInt(value) + 1) * 10);
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
        {/* TODO: 해당하는 강의 전체 갯수 가져오기 */}
        <div className="course-body">
          {courses?.map((item, index) => {
            return (
              <div className="course-card" id={index}>
                <div className="course-card-body">
                  <p className="card-label">유료</p>
                  <p className="card-title">{item.title}</p>
                  <p className="card-description">{item.short_description}</p>
                  <div className="card-icon-container">
                    <div className="card-icon-text">
                      <p>{`난이도: ${'미설정' || item.info_summary_visibility_dict.level} `}</p>
                      <p>{`수업: ${'온라인' || item.info_summary_visibility_dict.level} `}</p>
                      <p>{`기간: ${'무제한' || item.info_summary_visibility_dict.level} `}</p>
                    </div>
                    <img src={item.logo_file_url} className="card-logo" alt="logo_file_url" />
                  </div>
                </div>
              </div>
            );
          })}
          {/* TODO: pagination 구현 */}
        </div>

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
