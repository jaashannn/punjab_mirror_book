import React from 'react';
import { ChevronLeft, ChevronRight, Menu, Search, Sun, Moon, Bookmark, BookOpen } from 'lucide-react';
import SearchBar from './SearchBar';

const Navigation = ({
  currentPage,
  totalPages,
  onNextPage,
  onPrevPage,
  canGoNext,
  canGoPrev,
  progress,
  onToggleTOC,
  searchQuery,
  onSearchChange,
  searchResults,
  onSearchSelect,
  isSearching,
  onToggleTheme,
  theme,
  onToggleBookmark,
  isBookmarked
}) => {
  const getThemeIcon = () => {
    switch (theme) {
      case 'light':
        return <Sun className="nav-icon" />;
      case 'dark':
        return <Moon className="nav-icon" />;
      case 'sepia':
        return <BookOpen className="nav-icon" />;
      default:
        return <Sun className="nav-icon" />;
    }
  };

  return (
    <div className="navigation-container">
      <div className="progress-bar" style={{ width: `${progress}%` }}></div>
      
      <div className="nav-controls">
        <button 
          className="nav-button"
          onClick={onToggleTOC}
          title="Table of Contents"
        >
          <Menu className="nav-icon" />
          <span>Contents</span>
        </button>
        
        <button 
          className="nav-button"
          onClick={onPrevPage}
          disabled={!canGoPrev}
          title="Previous Page"
        >
          <ChevronLeft className="nav-icon" />
          <span>Previous</span>
        </button>
        
        <button 
          className="nav-button"
          onClick={onNextPage}
          disabled={!canGoNext}
          title="Next Page"
        >
          <span>Next</span>
          <ChevronRight className="nav-icon" />
        </button>
      </div>

      <div className="page-indicator">
        Page {currentPage} of {totalPages}
      </div>

      <div className="nav-controls">
        <SearchBar
          searchQuery={searchQuery}
          onSearchChange={onSearchChange}
          searchResults={searchResults}
          onSearchSelect={onSearchSelect}
          isSearching={isSearching}
        />
        
        <button
          className={`bookmark-button ${isBookmarked ? 'active' : ''}`}
          onClick={onToggleBookmark}
          title={isBookmarked ? 'Remove Bookmark' : 'Add Bookmark'}
        >
          <Bookmark className="nav-icon" />
        </button>
        
        <button
          className="theme-toggle"
          onClick={onToggleTheme}
          title={`Switch to ${theme === 'light' ? 'Dark' : theme === 'dark' ? 'Sepia' : 'Light'} Theme`}
        >
          {getThemeIcon()}
        </button>
      </div>
    </div>
  );
};

export default Navigation;