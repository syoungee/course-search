import { ReactComponent as Calendar } from '../common/calendar.svg';
import { ReactComponent as Chart } from '../common/chart.svg';
import { ReactComponent as Laptop } from '../common/laptop.svg';

function CourseBoard({ courses }) {
  const getLabel = (item) => {
    let label = null;
    if (item.enroll_type === 5) label = '구독';
    else {
      label = item.is_free ? '무료' : '유료';
    }
    return label;
  };

  return (
    <div className="course-body">
      {courses?.map((item, index) => {
        return (
          <div className="course-card" key={index}>
            <div className="course-card-body">
              <p className="card-label">{getLabel(item)}</p>
              <p className="card-title">{item.title}</p>
              <p className="card-description">{item.short_description}</p>
              <div className="card-icon-container">
                <div className="card-icon-text">
                  <p>
                    <Chart />
                    {`난이도: ${'미설정' || item.info_summary_visibility_dict.level} `}
                  </p>
                  <p>
                    <Laptop />
                    {`수업: ${'온라인' || item.info_summary_visibility_dict.level} `}
                  </p>
                  <p>
                    <Calendar />
                    {`기간: ${'무제한' || item.info_summary_visibility_dict.level} `}
                  </p>
                </div>
                <img src={item.logo_file_url} className="card-logo" alt="logo_file_url" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default CourseBoard;
