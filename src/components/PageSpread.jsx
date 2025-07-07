import React from 'react';
import Page from './Page';

const PageSpread = ({ leftPage, rightPage, currentPage, isAnimating, theme }) => {
  const isMobile = window.innerWidth <= 768;

  return (
    <div className={`page-spread ${isMobile ? 'single-page' : ''}`}>
      {leftPage && (
        <Page
          pageData={leftPage}
          pageNumber={leftPage.id}
          position={isMobile ? 'center' : 'left'}
          isAnimating={isAnimating}
          theme={theme}
        />
      )}
      
      {!isMobile && rightPage && (
        <Page
          pageData={rightPage}
          pageNumber={rightPage.id}
          position="right"
          isAnimating={isAnimating}
          theme={theme}
        />
      )}
    </div>
  );
};

export default PageSpread;