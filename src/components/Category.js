function Category({ setPrice, setFilterValue, title, pageIndex, setPageIndex, price }) {
  const filterValue1 = {
    filter_conditions: {
      $and: [{ title: '%' + title + '%' }, { $or: [{ enroll_type: 0, is_free: true }] }],
    },
    offset: (pageIndex - 1) * 10,
    count: 20,
  };

  const filterValue2 = {
    filter_conditions: {
      $and: [{ title: '%' + title + '%' }, { $or: [{ enroll_type: 0, is_free: false }] }],
    },
    offset: (pageIndex - 1) * 10,
    count: 20,
  };

  const filterValue3 = {
    filter_conditions: {
      $and: [
        { title: '%' + title + '%' },
        {
          $or: [
            { enroll_type: 0, is_free: true },
            { enroll_type: 0, is_free: false },
          ],
        },
      ],
    },
    offset: (pageIndex - 1) * 10,
    count: 20,
  };

  const onClick = (e) => {
    const value = e.target.getAttribute('value');
    if (price.includes(value)) {
      const result = price.filter((item) => {
        return item !== value;
      });
      setPageIndex(1);
      e.target.classList.remove('clicked');
      getFilterData(result);
      setPrice(result);
    } else {
      setPageIndex(1);
      e.target.classList.add('clicked');
      getFilterData([...price, value]);
      setPrice([...price, value]);
    }
  };

  const getFilterData = (price_data) => {
    if (price_data.length === 2) {
      setFilterValue(filterValue3);
    } else if (price_data[0] === 'free') {
      setFilterValue(filterValue1);
    } else if (price_data[0] === 'charged') {
      setFilterValue(filterValue2);
    } else {
      setFilterValue(filterValue3);
    }
  };

  return (
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
  );
}

export default Category;
