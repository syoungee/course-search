import './App.css';

function App() {
  return (
    <div className="container">
      <div className="layout">
        <div className="search-area">
          <div className="icon-area">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#000000"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>
          <div className="input-area">
            <input type="text" className="search-box" placeholder="배우고 싶은 언어, 기술을 검색해 보세요"></input>
            {
              //TODO: 300ms debounce search
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
