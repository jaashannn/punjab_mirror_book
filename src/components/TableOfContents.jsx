import React from 'react';
import { X, Bookmark } from 'lucide-react';

const TableOfContents = ({
  chapters,
  pages,
  currentPage,
  onPageSelect,
  isOpen,
  onClose,
  bookmarks,
  onBookmarkSelect
}) => {
  const handlePageClick = (pageId) => {
    onPageSelect(pageId);
    onClose();
  };

  const getPageTitle = (pageId) => {
    const page = pages.find(p => p.id === pageId);
    return page?.content?.title || `Page ${pageId}`;
  };

  return (
    <>
      <div className={`toc-overlay ${isOpen ? 'open' : ''}`} onClick={onClose}></div>
      
      <div className={`table-of-contents ${isOpen ? 'open' : ''}`}>
        <div className="toc-header">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>Table of Contents</span>
            <button 
              onClick={onClose}
              style={{ 
                background: 'none', 
                border: 'none', 
                color: 'inherit', 
                cursor: 'pointer',
                padding: '0.25rem'
              }}
            >
              <X size={20} />
            </button>
          </div>
        </div>
        
        <div className="toc-content">
          {/* Chapters */}
          {chapters.map((chapter) => (
            <div key={chapter.id} className="toc-chapter">
              <div className="toc-chapter-title">{chapter.title}</div>
              {pages
                .filter(page => page.id >= chapter.startPage && page.id <= chapter.endPage)
                .map((page) => (
                  <a
                    key={page.id}
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handlePageClick(page.id);
                    }}
                    className={`toc-page-link ${currentPage === page.id ? 'active' : ''}`}
                  >
                    {getPageTitle(page.id)}
                  </a>
                ))}
            </div>
          ))}
          
          {/* Bookmarks */}
          {bookmarks.length > 0 && (
            <div className="toc-chapter">
              <div className="toc-chapter-title">
                <Bookmark size={16} style={{ marginRight: '0.5rem', display: 'inline' }} />
                Bookmarks
              </div>
              {bookmarks.map((bookmark) => (
                <a
                  key={bookmark.id}
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    onBookmarkSelect(bookmark.page);
                    onClose();
                  }}
                  className={`toc-page-link ${currentPage === bookmark.page ? 'active' : ''}`}
                >
                  {bookmark.title}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default TableOfContents;