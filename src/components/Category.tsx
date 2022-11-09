import { PRICE } from '../types';

type CategoryProps = {
  setPrice(price: CategoryProps['price']): void;
  setPageIndex(page: number): void;
  price: PRICE[];
};

function Category({ setPrice, setPageIndex, price }: CategoryProps) {
  const onClick = (target: HTMLButtonElement) => {
    const value = target.getAttribute('value') as PRICE;
    const hasValue = price.includes(value);
    const result = hasValue ? price.filter((item) => item !== value) : [...price, value];
    const classListAction = hasValue ? 'remove' : 'add';

    setPageIndex(1);
    setPrice(result);
    target.classList[classListAction]('clicked');
  };

  return (
    <div className="select-area">
      <div className="category">가격</div>
      <div className="chip-area">
        <button className="button" value={PRICE.FREE} onClick={(e) => onClick(e.target as HTMLButtonElement)}>
          무료
        </button>
        <button className="button" value={PRICE.CHARGED} onClick={(e) => onClick(e.target as HTMLButtonElement)}>
          유료
        </button>
      </div>
    </div>
  );
}

export default Category;
