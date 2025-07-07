import { useState, useEffect } from 'react';

export const useBookmarks = () => {
  const [bookmarks, setBookmarks] = useState([]);

  // Load bookmarks from localStorage
  useEffect(() => {
    const savedBookmarks = localStorage.getItem('bookmarks');
    if (savedBookmarks) {
      setBookmarks(JSON.parse(savedBookmarks));
    }
  }, []);

  // Save bookmarks to localStorage
  useEffect(() => {
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  const addBookmark = (page, title) => {
    const newBookmark = {
      id: Date.now(),
      page,
      title,
      timestamp: new Date().toISOString()
    };
    setBookmarks(prev => [...prev, newBookmark]);
  };

  const removeBookmark = (page) => {
    setBookmarks(prev => prev.filter(bookmark => bookmark.page !== page));
  };

  const isBookmarked = (page) => {
    return bookmarks.some(bookmark => bookmark.page === page);
  };

  const toggleBookmark = (page, title) => {
    if (isBookmarked(page)) {
      removeBookmark(page);
    } else {
      addBookmark(page, title);
    }
  };

  return {
    bookmarks,
    addBookmark,
    removeBookmark,
    isBookmarked,
    toggleBookmark
  };
};