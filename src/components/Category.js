function Category({ setPrice, setPageIndex, price }) {
  const onClick = (e) => {
    const value = e.target.getAttribute('value');
    const hasValue = price.includes(value);
    const result = hasValue ? price.filter((item) => item !== value) : [...price, value];
    const classListAction = hasValue ? 'remove' : 'add';

    setPageIndex(1);
    setPrice(result);
    e.target.classList[classListAction]('clicked');
  };

  return (
    <div className="select-area">
      <div className="category">가격</div>
      <div className="chip-area">
        <button className="button" value="free" onClick={(e) => onClick(e)}>
          무료
        </button>
        <button className="button" value="charged" onClick={(e) => onClick(e)}>
          유료
        </button>
      </div>
    </div>
  );
}

export default Category;
