// Service for fetching spiritual quotes related to Krishna and Bhagavatam

const KRISHNA_QUOTES = [
  {
    text: "यदा यदा हि धर्मस्य ग्लानिर्भवति भारत। अभ्युत्थानमधर्मस्य तदात्मानं सृजाम्यहम्।।",
    translation: "Whenever there is decline in religious practice, O descendant of Bharata, and a predominant rise of irreligion—at that time I descend Myself.",
    reference: "Bhagavad Gita 4.7",
    author: "Lord Krishna"
  },
  {
    text: "सर्वधर्मान्परित्यज्य मामेकं शरणं व्रज। अहं त्वां सर्वपापेभ्यो मोक्षयिष्यामि मा शुचः।।",
    translation: "Abandon all varieties of religion and just surrender unto Me. I shall deliver you from all sinful reactions. Do not fear.",
    reference: "Bhagavad Gita 18.66",
    author: "Lord Krishna"
  },
  {
    text: "मन्मना भव मद्भक्तो मद्याजी मां नमस्कुरु। मामेवैष्यसि सत्यं ते प्रतिजाने प्रियोऽसि मे।।",
    translation: "Always think of Me, become My devotee, worship Me and offer your homage unto Me. Thus you will come to Me without fail. I promise you this because you are My very dear friend.",
    reference: "Bhagavad Gita 18.65",
    author: "Lord Krishna"
  },
  {
    text: "धर्मः प्रोज्झितकैतवोऽत्र परमो निर्मत्सराणां सतां वेद्यं वास्तवमत्र वस्तु शिवदं तापत्रयोन्मूलनम्।",
    translation: "Completely rejecting all religious activities which are materially motivated, this Bhagavata Purana propounds the highest truth, which is understandable by those devotees who are fully pure in heart.",
    reference: "Srimad Bhagavatam 1.1.2",
    author: "Srila Vyasadeva"
  },
  {
    text: "कृष्णे स्व-धामोपगते धर्म-ज्ञानादिभिः सह। कलौ नष्ट-दृशाम् एष पुराणार्को ऽधुनोदितः।।",
    translation: "This Bhagavata Purana is as brilliant as the sun, and it has arisen just after the departure of Lord Krishna to His own abode, accompanied by religion, knowledge, etc. Persons who have lost their vision due to the dense darkness of ignorance in the age of Kali shall get light from this Purana.",
    reference: "Srimad Bhagavatam 1.3.43",
    author: "Srila Vyasadeva"
  }
];

// API endpoints for spiritual quotes
const QUOTE_APIS = [
  {
    name: 'Quotable',
    url: 'https://api.quotable.io/random?tags=spirituality,wisdom,religion',
    transform: (data) => ({
      text: data.content,
      translation: data.content,
      reference: `Wisdom Quote`,
      author: data.author,
      source: 'Quotable'
    })
  },
  {
    name: 'ZenQuotes',
    url: 'https://zenquotes.io/api/today',
    transform: (data) => ({
      text: data[0].q,
      translation: data[0].q,
      reference: 'Daily Inspiration',
      author: data[0].a,
      source: 'ZenQuotes'
    })
  },
  {
    name: 'QuoteGarden',
    url: 'https://quotegarden.herokuapp.com/api/v3/quotes/random',
    transform: (data) => ({
      text: data.data.quoteText,
      translation: data.data.quoteText,
      reference: 'Inspirational Quote',
      author: data.data.quoteAuthor,
      source: 'QuoteGarden'
    })
  }
];

export const fetchQuoteOfTheDay = async () => {
  // 70% chance to use Krishna/Bhagavatam quotes, 30% chance to try API
  const useKrishnaQuote = Math.random() < 0.7;
  
  if (useKrishnaQuote) {
    // Return a random Krishna/Bhagavatam quote
    const randomIndex = Math.floor(Math.random() * KRISHNA_QUOTES.length);
    return {
      success: true,
      quote: KRISHNA_QUOTES[randomIndex],
      source: 'local'
    };
  }

  // Try to fetch from external APIs
  for (const api of QUOTE_APIS) {
    try {
      const response = await fetch(api.url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        const quote = api.transform(data);
        
        // Validate the quote
        if (quote.text && quote.text.length > 10 && quote.author) {
          return {
            success: true,
            quote: quote,
            source: 'api'
          };
        }
      }
    } catch (error) {
      console.log(`${api.name} API failed:`, error);
      continue;
    }
  }

  // If all APIs fail, return a Krishna quote
  const fallbackIndex = Math.floor(Math.random() * KRISHNA_QUOTES.length);
  return {
    success: true,
    quote: KRISHNA_QUOTES[fallbackIndex],
    source: 'fallback'
  };
};

export const getRandomKrishnaQuote = () => {
  const randomIndex = Math.floor(Math.random() * KRISHNA_QUOTES.length);
  return KRISHNA_QUOTES[randomIndex];
};

export default {
  fetchQuoteOfTheDay,
  getRandomKrishnaQuote,
  KRISHNA_QUOTES
};
