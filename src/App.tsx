import './App.scss';
import { getCourses } from './api/apis';
import { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import Category from './components/Category';
import CourseBoard from './components/CourseBoard';
import Pagination from './components/Pagination';
import { Course, DataProps } from './types';

function App() {
  const [title, setTitle] = useState<DataProps['title']>('');
  const [price, setPrice] = useState<DataProps['price']>([]);
  const [countCourses, setCountCourses] = useState(0);
  const [pageIndex, setPageIndex] = useState<DataProps['pageIndex']>(1);
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    getAllCourses({ title, price, pageIndex });
  }, [title, pageIndex, price]);

  const getAllCourses = (data: DataProps) => {
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
        <SearchBar setTitle={setTitle} />
        <Category setPrice={setPrice} setPageIndex={setPageIndex} price={price} />
        <div className="total-count"> 전체 {countCourses}개 </div>
        <CourseBoard courses={courses} />
        <Pagination pageIndex={pageIndex} setPageIndex={setPageIndex} />
      </div>
    </div>
  );
}

export default App;
