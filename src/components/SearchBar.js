import debounce from 'lodash.debounce';
import { useMemo } from 'react';

function SearchBar({ setTitle }) {
  const inputChange = (e) => {
    const text = e.target.value;
    setTitle(text);
  };

  const debouncedResults = useMemo(() => {
    return debounce(inputChange, 300);
  }, []);

  return (
    <div className="search-area">
      <div className="icon-area">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#000000"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </div>
      <div className="input-area">
        <input type="text" className="search-box" onChange={debouncedResults} placeholder="배우고 싶은 언어, 기술을 검색해 보세요"></input>
      </div>
    </div>
  );
}

export default SearchBar;
