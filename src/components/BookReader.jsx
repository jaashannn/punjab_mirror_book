import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageSpread from './PageSpread';
import Navigation from './Navigation';
import TableOfContents from './TableOfContents';
import { useBookNavigation } from '../hooks/useBookNavigation';
import { useBookmarks } from '../hooks/useBookmarks';
import { useSearch } from '../hooks/useSearch';
import { useTheme } from '../hooks/useTheme';
import bookContent from '../data/content.json';
import '../styles/BookStyles.css';
import '../styles/Navigation.css';
import '../styles/Themes.css';

const BookReader = () => {
  const { book } = bookContent;
  const {
    currentPage,
    nextPage,
    prevPage,
    goToPage,
    canGoNext,
    canGoPrev,
    progress,
    isAnimating
  } = useBookNavigation(book.totalPages);

  const {
    bookmarks,
    toggleBookmark,
    isBookmarked
  } = useBookmarks();

  const {
    searchQuery,
    setSearchQuery,
    searchResults,
    isSearching
  } = useSearch(book);

  const { theme, toggleTheme } = useTheme();

  const [showTOC, setShowTOC] = React.useState(false);

  const getCurrentPageData = () => {
    return book.pages.find(page => page.id === currentPage);
  };

  const getPageSpread = () => {
    const leftPage = book.pages.find(page => page.id === currentPage);
    const rightPage = book.pages.find(page => page.id === currentPage + 1);
    return { leftPage, rightPage };
  };

  const handleSearchSelect = (pageId) => {
    goToPage(pageId);
    setSearchQuery('');
  };

  const handleBookmarkToggle = () => {
    const pageData = getCurrentPageData();
    const title = pageData?.content?.title || `Page ${currentPage}`;
    toggleBookmark(currentPage, title);
  };

  const pageVariants = {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 }
  };

  return (
    <div className="book-container">
      <div className="book-wrapper">
        <motion.div 
          className={`book theme-${theme}`}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="book-header">
            <h1 className="book-title">{book.title}</h1>
            <p className="book-subtitle">{book.subtitle}</p>
          </div>

          <div className="book-content">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPage}
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                <PageSpread
                  {...getPageSpread()}
                  currentPage={currentPage}
                  isAnimating={isAnimating}
                  theme={theme}
                />
              </motion.div>
            </AnimatePresence>
            
            <div className="book-spine"></div>
          </div>

          <Navigation
            currentPage={currentPage}
            totalPages={book.totalPages}
            onNextPage={nextPage}
            onPrevPage={prevPage}
            canGoNext={canGoNext}
            canGoPrev={canGoPrev}
            progress={progress}
            onToggleTOC={() => setShowTOC(!showTOC)}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            searchResults={searchResults}
            onSearchSelect={handleSearchSelect}
            isSearching={isSearching}
            onToggleTheme={toggleTheme}
            theme={theme}
            onToggleBookmark={handleBookmarkToggle}
            isBookmarked={isBookmarked(currentPage)}
          />
        </motion.div>
      </div>

      <TableOfContents
        chapters={book.chapters}
        pages={book.pages}
        currentPage={currentPage}
        onPageSelect={goToPage}
        isOpen={showTOC}
        onClose={() => setShowTOC(false)}
        bookmarks={bookmarks}
        onBookmarkSelect={goToPage}
      />
    </div>
  );
};

export default BookReader;