import debounce from 'lodash.debounce';
import { ReactComponent as Search } from '../common/search.svg';

function SearchBar({ setTitle }) {
  const debounceOnChange = debounce((e) => {
    setTitle(e.target.value);
  }, 300);

  const onChange = (e) => {
    debounceOnChange(e);
  };

  return (
    <div className="search-area">
      <div className="icon-area">
        <Search />
      </div>
      <div className="input-area">
        <input type="text" className="search-box" placeholder="배우고 싶은 언어, 기술을 검색해 보세요" onChange={onChange}></input>
      </div>
    </div>
  );
}

export default SearchBar;
