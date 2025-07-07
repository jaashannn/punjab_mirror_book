import { useState, useEffect, useCallback } from 'react';

export const useBookNavigation = (totalPages) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);

  // Load saved position
  useEffect(() => {
    const savedPage = localStorage.getItem('currentPage');
    if (savedPage) {
      setCurrentPage(parseInt(savedPage, 10));
    }
  }, []);

  // Save current position
  useEffect(() => {
    localStorage.setItem('currentPage', currentPage.toString());
  }, [currentPage]);

  const nextPage = useCallback(() => {
    if (currentPage < totalPages && !isAnimating) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentPage(prev => prev + 1);
        setIsAnimating(false);
      }, 300);
    }
  }, [currentPage, totalPages, isAnimating]);

  const prevPage = useCallback(() => {
    if (currentPage > 1 && !isAnimating) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentPage(prev => prev - 1);
        setIsAnimating(false);
      }, 300);
    }
  }, [currentPage, isAnimating]);

  const goToPage = useCallback((page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage && !isAnimating) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentPage(page);
        setIsAnimating(false);
      }, 300);
    }
  }, [currentPage, totalPages, isAnimating]);

  const canGoNext = currentPage < totalPages;
  const canGoPrev = currentPage > 1;
  const progress = (currentPage / totalPages) * 100;

  return {
    currentPage,
    nextPage,
    prevPage,
    goToPage,
    canGoNext,
    canGoPrev,
    progress,
    isAnimating
  };
};