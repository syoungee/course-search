import { useState } from 'react';
function Pagination({ pageIndex, setPageIndex }) {
  const [range, setRange] = useState([1, 5]);
  const [left, setLeft] = useState(false);
  const [right, setRight] = useState(true);

  const pageOnClick = (e) => {
    const value = parseInt(e.target.getAttribute('value'));
    setPageIndex(value);
    setRange([value - 4, value + 4]);
    if (pageIndex <= 1) {
      setLeft(false);
    } else if (pageIndex >= 20) {
      setRight(false);
    } else {
      setLeft(true);
      setRight(true);
    }
    window.scrollTo(0, 0);
  };

  const arrowOnClick = (e) => {
    const value = e.target.getAttribute('value');
    if (value === '-1') {
      if (pageIndex >= 2) {
        setPageIndex(pageIndex - 1);
        setRange([pageIndex - 4, pageIndex + 4]);
      }
    } else if (value === '+1') {
      if (pageIndex < 20) {
        setPageIndex(pageIndex + 1);
        setRange([pageIndex - 4, pageIndex + 4]);
      }
    }

    if (pageIndex <= 1) {
      setLeft(false);
    } else if (pageIndex >= 20) {
      setRight(false);
    } else {
      setLeft(true);
      setRight(true);
    }
    window.scrollTo(0, 0);
  };

  const list = Array.from({ length: 20 }, (_, i) => i + 1); // [0, 1, ... ,20]

  return (
    <div className="page-container">
      <div className={`index-arrow-left ${left ? 'enable' : 'disable'}`} value="-1" onClick={(e) => arrowOnClick(e)}>
        {`<`}
      </div>
      {list
        .filter((item) => {
          return item >= range[0] && item <= range[1];
        })
        .map((item, index) => {
          if (item === pageIndex) {
            return (
              <div className="index now" key={index} value={item} onClick={(e) => pageOnClick(e)}>
                {item}
              </div>
            );
          } else
            return (
              <div className="index" key={index} value={item} onClick={(e) => pageOnClick(e)}>
                {item}
              </div>
            );
        })}
      <div className={`index-arrow-right ${right ? 'enable' : 'disable'}`} value="+1" onClick={(e) => arrowOnClick(e)}>
        {`>`}
      </div>
    </div>
  );
}

export default Pagination;
