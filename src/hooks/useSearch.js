import { useState, useEffect } from 'react';

export const useSearch = (content) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    
    // Debounce search
    const timeoutId = setTimeout(() => {
      const results = searchContent(searchQuery, content);
      setSearchResults(results);
      setIsSearching(false);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, content]);

  const searchContent = (query, content) => {
    const lowercaseQuery = query.toLowerCase();
    const results = [];

    content.pages.forEach(page => {
      const pageContent = page.content;
      let searchableText = '';
      let title = '';

      // Extract searchable text based on page type
      switch (page.type) {
        case 'text':
          searchableText = `${pageContent.title || ''} ${pageContent.text || ''}`;
          title = pageContent.title || `Page ${page.id}`;
          break;
        case 'title':
          searchableText = `${pageContent.title || ''} ${pageContent.subtitle || ''} ${pageContent.author || ''}`;
          title = pageContent.title || `Page ${page.id}`;
          break;
        case 'image':
          searchableText = `${pageContent.title || ''} ${pageContent.caption || ''}`;
          title = pageContent.title || `Page ${page.id}`;
          break;
        case 'code':
          searchableText = `${pageContent.title || ''} ${pageContent.code || ''} ${pageContent.caption || ''}`;
          title = pageContent.title || `Page ${page.id}`;
          break;
        default:
          searchableText = JSON.stringify(pageContent);
          title = `Page ${page.id}`;
      }

      if (searchableText.toLowerCase().includes(lowercaseQuery)) {
        // Find snippet around the match
        const index = searchableText.toLowerCase().indexOf(lowercaseQuery);
        const start = Math.max(0, index - 50);
        const end = Math.min(searchableText.length, index + 100);
        let snippet = searchableText.substring(start, end);
        
        if (start > 0) snippet = '...' + snippet;
        if (end < searchableText.length) snippet = snippet + '...';

        results.push({
          pageId: page.id,
          title,
          snippet,
          type: page.type
        });
      }
    });

    return results;
  };

  return {
    searchQuery,
    setSearchQuery,
    searchResults,
    isSearching
  };
};