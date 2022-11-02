function Pagination({ pageIndex, setPageIndex }) {
  const pageOnClick = (e) => {
    const value = e.target.getAttribute('value');
    if (value !== '-1' || value !== '+1') {
      setPageIndex(parseInt(value));
    } else if (value === '-1') {
      if (value >= 2) setPageIndex(parseInt(value) - 1);
    } else if (value === '+1') {
      if (value < 20) setPageIndex(parseInt(value) + 1);
    }
    window.scrollTo(0, 0);
  };

  return (
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
  );
}

export default Pagination;
