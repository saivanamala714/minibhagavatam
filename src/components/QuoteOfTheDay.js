import React from 'react';
import './QuoteOfTheDay.css';

const QuoteOfTheDay = () => {
  const bhagavatamQuote = {
    text: "धर्मः प्रोज्झितकैतवोऽत्र परमो निर्मत्सराणां सतां वेद्यं वास्तवमत्र वस्तु शिवदं तापत्रयोन्मूलनम्।",
    translation: "Completely rejecting all religious activities which are materially motivated, this Bhagavata Purana propounds the highest truth, which is understandable by those devotees who are fully pure in heart.",
    reference: "Srimad Bhagavatam 1.1.2",
    author: "Srila Vyasadeva"
  };

  return (
    <div className="quote-of-day">
      <div className="quote-header">
        <div className="quote-icon">�</div>
        <h3 className="quote-title">Quote of the Day</h3>
      </div>

      <div className="quote-content">
        <div className="sanskrit-quote">
          "{bhagavatamQuote.text}"
        </div>

        <div className="quote-translation">
          {bhagavatamQuote.translation}
        </div>

        <div className="quote-reference">
          — {bhagavatamQuote.reference}
        </div>

        <div className="quote-author">
          by {bhagavatamQuote.author}
        </div>
      </div>

      <div className="quote-actions">
        <div className="quote-action">
          <span className="action-icon">�</span>
          <span className="action-text">Reflect</span>
        </div>
        <div className="quote-action">
          <span className="action-icon">�</span>
          <span className="action-text">Read More</span>
        </div>
        <div className="quote-action">
          <span className="action-icon">�</span>
          <span className="action-text">Meditate</span>
        </div>
      </div>
    </div>
  );
};

export default QuoteOfTheDay;
