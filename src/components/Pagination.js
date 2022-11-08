import { useState } from 'react';
function Pagination({ pageIndex, setPageIndex }) {
  const [range, setRange] = useState([1, 5]);
  const [left, setLeft] = useState(false);
  const [right, setRight] = useState(true);

  const pageOnClick = (e) => {
    const value = parseInt(e.target.getAttribute('value'));
    const goLeft = value === 1 ? false : true;
    const goRight = value === 20 ? false : true;

    setLeft(goLeft);
    setRight(goRight);
    setRange([value - 4, value + 4]);
    setPageIndex(value);

    window.scrollTo(0, 0);
  };

  const arrowOnClick = (e) => {
    const value = e.target.getAttribute('value');
    const canPrev = pageIndex >= 2 ? true : false;
    const canNext = pageIndex < 20 ? true : false;
    const nextIndex = value === '-1' && canPrev ? pageIndex - 1 : value === '+1' && canNext ? pageIndex + 1 : pageIndex;
    const goLeft = nextIndex === 1 ? false : true;
    const goRight = nextIndex === 20 ? false : true;

    setLeft(goLeft);
    setRight(goRight);
    if (canPrev || canNext) setRange([nextIndex - 4, nextIndex + 4]);
    setPageIndex(nextIndex);

    window.scrollTo(0, 0);
  };

  const list = Array.from({ length: 20 }, (_, i) => i + 1); // [1, ... ,20]

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
          return (
            <div className={`index ${item === pageIndex ? 'now' : ''}`} key={index} value={item} onClick={(e) => pageOnClick(e)}>
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
