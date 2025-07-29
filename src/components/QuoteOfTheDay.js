import { useState, useEffect } from 'react';
import { fetchQuoteOfTheDay } from '../services/quoteService';
import './QuoteOfTheDay.css';

const QuoteOfTheDay = () => {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quoteSource, setQuoteSource] = useState('');

  // Function to fetch quotes using the quote service
  const loadQuoteOfTheDay = async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await fetchQuoteOfTheDay();

      if (result.success) {
        setQuote(result.quote);
        setQuoteSource(result.source);

        // Set appropriate status messages
        if (result.source === 'fallback') {
          setError('API unavailable - showing Krishna quote');
        } else if (result.source === 'local') {
          setError(null); // Krishna quotes are preferred, no error
        }
      } else {
        throw new Error('Failed to fetch quote');
      }
    } catch (err) {
      console.error('Error fetching quote:', err);
      setError('Unable to load quote');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadQuoteOfTheDay();
  }, []);

  const refreshQuote = () => {
    loadQuoteOfTheDay();
  };

  if (loading) {
    return (
      <div className="quote-of-day">
        <div className="quote-header">
          <div className="quote-icon">📿</div>
          <h3 className="quote-title">Quote of the Day</h3>
        </div>
        <div className="quote-content">
          <div className="quote-loading">
            <div className="loading-spinner">🔄</div>
            <p>Fetching spiritual wisdom...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!quote) {
    return (
      <div className="quote-of-day">
        <div className="quote-header">
          <div className="quote-icon">📿</div>
          <h3 className="quote-title">Quote of the Day</h3>
        </div>
        <div className="quote-content">
          <div className="quote-error">
            <p>Unable to fetch quote. Please try again later.</p>
            <button onClick={refreshQuote} className="retry-button">
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="quote-of-day">
      <div className="quote-header">
        <div className="quote-icon">📿</div>
        <h3 className="quote-title">Quote of the Day</h3>
        <div className="quote-status">
          {error && (
            <span className="offline-indicator">📱 {error}</span>
          )}
          {quoteSource === 'api' && (
            <span className="online-indicator">🌐 Live</span>
          )}
          {quoteSource === 'local' && (
            <span className="krishna-indicator">🕉️ Krishna</span>
          )}
        </div>
      </div>

      <div className="quote-content">
        {quote.text !== quote.translation && (
          <div className="sanskrit-quote">
            "{quote.text}"
          </div>
        )}

        <div className="quote-translation">
          {quote.translation}
        </div>

        <div className="quote-reference">
          — {quote.reference}
        </div>

        <div className="quote-author">
          by {quote.author}
        </div>

        {quote.source && (
          <div className="quote-source">
            Source: {quote.source}
          </div>
        )}
      </div>

      <div className="quote-actions">
        <div className="quote-action" onClick={refreshQuote}>
          <span className="action-icon">🔄</span>
          <span className="action-text">New Quote</span>
        </div>
        <div className="quote-action">
          <span className="action-icon">🙏</span>
          <span className="action-text">Reflect</span>
        </div>
        <div className="quote-action">
          <span className="action-icon">💫</span>
          <span className="action-text">Meditate</span>
        </div>
      </div>
    </div>
  );
};

export default QuoteOfTheDay;
