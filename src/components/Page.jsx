import React from 'react';
import { motion } from 'framer-motion';

const Page = ({ pageData, pageNumber, position, isAnimating, theme }) => {
  if (!pageData) return null;

  const renderContent = () => {
    switch (pageData.type) {
      case 'title':
        return (
          <div className="page-content">
            <div style={{ textAlign: 'center', paddingTop: '2rem' }}>
              <h1 className="page-title" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
                {pageData.content.title}
              </h1>
              <p className="page-subtitle" style={{ fontSize: '1.3rem', marginBottom: '2rem', color: '#4a5568' }}>
                {pageData.content.subtitle}
              </p>
              <p className="page-author" style={{ fontSize: '1.1rem', color: '#718096' }}>
                By {pageData.content.author}
              </p>
              {pageData.content.image && (
                <div style={{ marginTop: '2rem' }}>
                  <img 
                    src={pageData.content.image} 
                    alt={pageData.content.title}
                    className="page-image"
                    style={{ maxHeight: '200px', objectFit: 'cover' }}
                  />
                </div>
              )}
            </div>
          </div>
        );

      case 'text':
        return (
          <div className="page-content">
            {pageData.content.title && (
              <h2 className="page-title">{pageData.content.title}</h2>
            )}
            <div className="page-text">
              {pageData.content.text.split('\n').map((paragraph, index) => (
                <p key={index} style={{ marginBottom: '1rem' }}>
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        );

      case 'image':
        return (
          <div className="page-content">
            {pageData.content.title && (
              <h2 className="page-title">{pageData.content.title}</h2>
            )}
            <div style={{ textAlign: 'center' }}>
              <img 
                src={pageData.content.image} 
                alt={pageData.content.title || 'Page image'}
                className="page-image"
              />
              {pageData.content.caption && (
                <p className="page-caption">{pageData.content.caption}</p>
              )}
            </div>
          </div>
        );

      case 'code':
        return (
          <div className="page-content">
            {pageData.content.title && (
              <h2 className="page-title">{pageData.content.title}</h2>
            )}
            <div className="code-block">
              <div className="code-title">
                {pageData.content.language ? `${pageData.content.language.toUpperCase()} Code` : 'Code'}
              </div>
              <pre style={{ margin: 0, overflow: 'auto' }}>
                <code>{pageData.content.code}</code>
              </pre>
            </div>
            {pageData.content.caption && (
              <p className="page-caption" style={{ marginTop: '1rem' }}>
                {pageData.content.caption}
              </p>
            )}
          </div>
        );

      default:
        return (
          <div className="page-content">
            <div className="page-text">
              <p>Content type not supported: {pageData.type}</p>
            </div>
          </div>
        );
    }
  };

  return (
    <motion.div 
      className={`page ${position}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {renderContent()}
      <div className={`page-number ${position}`}>
        {pageNumber}
      </div>
    </motion.div>
  );
};

export default Page;