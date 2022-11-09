import { useState } from 'react';

const MAX_PAGE_NUMBER = 20;

const isNotFirst = (num) => num > 1;
const isNotLast = (num) => num < MAX_PAGE_NUMBER;

function Pagination({ pageIndex, setPageIndex }) {
  const [range, setRange] = useState([1, 5]);
  const [left, setLeft] = useState(false);
  const [right, setRight] = useState(true);

  const move = ({ goLeft, goRight, canPrev, canNext, nextIndex }) => {
    setLeft(goLeft);
    setRight(goRight);
    if (canPrev || canNext) setRange([nextIndex - 4, nextIndex + 4]);
    setPageIndex(nextIndex);

    window.scrollTo(0, 0);
  };

  const pageOnClick = (e) => {
    const value = +e.target.getAttribute('value');
    const [goLeft, goRight] = [isNotFirst(value), isNotLast(value)];

    move({ goLeft, goRight, canPrev: true, canNext: true, nextIndex: value });
  };

  const arrowOnClick = (e) => {
    const value = +e.target.getAttribute('value');
    const canPrev = isNotFirst(pageIndex);
    const canNext = isNotLast(pageIndex);
    const nextIndex = value === -1 && canPrev ? pageIndex - 1 : value === 1 && canNext ? pageIndex + 1 : pageIndex;
    const goLeft = isNotFirst(nextIndex);
    const goRight = isNotLast(nextIndex);

    move({ goLeft, goRight, canPrev, canNext, nextIndex });
  };

  const list = Array.from({ length: MAX_PAGE_NUMBER }, (_, i) => i + 1); // [1, ... ,MAX_PAGE_NUMBER]

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
