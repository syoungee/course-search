import { useState } from 'react';

type PaginationProps = {
  setPageIndex(page: PaginationProps['pageIndex']): void;
  pageIndex: number;
};

const MAX_PAGE_NUMBER = 20;

const isNotFirst = (num: number) => num > 1;
const isNotLast = (num: number) => num < MAX_PAGE_NUMBER;

function Pagination({ pageIndex, setPageIndex }: PaginationProps) {
  const [range, setRange] = useState([1, 5]);
  const [left, setLeft] = useState(false);
  const [right, setRight] = useState(true);

  const move = ({ goLeft, goRight, canPrev, canNext, nextIndex }: any) => {
    setLeft(goLeft);
    setRight(goRight);
    if (canPrev || canNext) setRange([nextIndex - 4, nextIndex + 4]);
    setPageIndex(nextIndex);

    window.scrollTo(0, 0);
  };

  const pageOnClick = (target: HTMLDivElement) => {
    const value = +target.getAttribute('value')!;
    const [goLeft, goRight] = [isNotFirst(value), isNotLast(value)];

    move({ goLeft, goRight, canPrev: true, canNext: true, nextIndex: value });
  };

  const arrowOnClick = (target: HTMLDivElement) => {
    const value = +target.getAttribute('value')!;
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
      <button className={`index-arrow-left ${left ? 'enable' : 'disable'}`} value="-1" onClick={(e) => arrowOnClick(e.target as HTMLDivElement)}>
        {`<`}
      </button>
      {list
        .filter((item) => {
          return item >= range[0] && item <= range[1];
        })
        .map((item, index) => {
          return (
            <button className={`index ${item === pageIndex ? 'now' : ''}`} key={index} value={item} onClick={(e) => pageOnClick(e.target as HTMLDivElement)}>
              {item}
            </button>
          );
        })}
      <button className={`index-arrow-right ${right ? 'enable' : 'disable'}`} value={'+1'} onClick={(e) => arrowOnClick(e.target as HTMLDivElement)}>
        {`>`}
      </button>
    </div>
  );
}

export default Pagination;
