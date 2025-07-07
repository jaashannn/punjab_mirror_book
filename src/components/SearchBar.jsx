import React, { useState, useRef, useEffect } from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({
  searchQuery,
  onSearchChange,
  searchResults,
  onSearchSelect,
  isSearching
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    onSearchChange(e.target.value);
    setIsOpen(true);
  };

  const handleResultSelect = (result) => {
    onSearchSelect(result.pageId);
    setIsOpen(false);
    onSearchChange('');
  };

  return (
    <div className="search-container" ref={searchRef}>
      <div style={{ position: 'relative' }}>
        <input
          type="text"
          placeholder="Search pages..."
          value={searchQuery}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
          className="search-input"
        />
        <Search 
          size={16} 
          style={{ 
            position: 'absolute', 
            right: '0.75rem', 
            top: '50%', 
            transform: 'translateY(-50%)',
            color: '#a0aec0',
            pointerEvents: 'none'
          }} 
        />
      </div>
      
      {isOpen && (searchResults.length > 0 || isSearching) && (
        <div className="search-results">
          {isSearching ? (
            <div className="search-result">
              <div className="search-result-title">Searching...</div>
            </div>
          ) : (
            searchResults.map((result, index) => (
              <div
                key={index}
                className="search-result"
                onClick={() => handleResultSelect(result)}
              >
                <div className="search-result-title">
                  {result.title} (Page {result.pageId})
                </div>
                <div className="search-result-snippet">
                  {result.snippet}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;