const API_BASE = '';

const state = {
  destinations: [],
  activeFilter: 'all',
  chatHistory: [],
  blogPosts: [
    {
      title: 'The Art Of The Slow Arrival',
      text: 'A private guide to slower mornings, hidden courtyards, and late dinners beside the water.'
    },
    {
      title: 'Five Days, Properly Paced',
      text: 'How to turn a five-day escape into a restorative journey without losing the thrill of discovery.'
    },
    {
      title: 'The City As A Private Ritual',
      text: 'Boutique stays, chef-led markets, and the quiet rituals that make a city feel personal.'
    }
  ],
  reviews: [
    {
      author: 'Mira S.',
      text: 'The Kyoto plan was beautiful, calm, and seamless. Every dinner felt memorable.'
    },
    {
      author: 'Leon R.',
      text: 'The hotel was excellent but one transfer was late, so the afternoon felt rushed.'
    },
    {
      author: 'Ava M.',
      text: 'The coast was crowded in places, but the private boat and villa were stunning.'
    }
  ]
};

const staticDestinations = [
  {
    id: 'amalfi',
    name: 'Amalfi Coast',
    country: 'Italy',
    location: 'Europe',
    price: 4200,
    priceTier: 'luxury',
    rating: 4.9,
    type: 'Coastal escape',
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1400&q=80',
    summary: 'Clifftop suites, lemon groves, private coves, and candlelit seafood terraces.'
  },
  {
    id: 'kyoto',
    name: 'Kyoto',
    country: 'Japan',
    location: 'Asia',
    price: 3600,
    priceTier: 'premium',
    rating: 4.8,
    type: 'Cultural retreat',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1400&q=80',
    summary: 'Temple gardens, ryokan rituals, kaiseki dining, and dawn walks through bamboo.'
  },
  {
    id: 'santorini',
    name: 'Santorini',
    country: 'Greece',
    location: 'Europe',
    price: 3900,
    priceTier: 'luxury',
    rating: 4.7,
    type: 'Island romance',
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1400&q=80',
    summary: 'Caldera suites, private catamarans, volcanic wines, and blue-hour terraces.'
  },
  {
    id: 'marrakech',
    name: 'Marrakech',
    country: 'Morocco',
    location: 'Africa',
    price: 2800,
    priceTier: 'premium',
    rating: 4.6,
    type: 'Design-led city stay',
    image: 'https://images.unsplash.com/photo-1597212618440-806262de4f6b?auto=format&fit=crop&w=1400&q=80',
    summary: 'Riad courtyards, souk ateliers, desert dinners, and hammam afternoons.'
  },
  {
    id: 'bali',
    name: 'Bali',
    country: 'Indonesia',
    location: 'Asia',
    price: 2600,
    priceTier: 'value',
    rating: 4.8,
    type: 'Wellness escape',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1400&q=80',
    summary: 'Jungle villas, sunrise yoga, surf coves, and chef-led Balinese tastings.'
  },
  {
    id: 'patagonia',
    name: 'Patagonia',
    country: 'Argentina & Chile',
    location: 'South America',
    price: 5100,
    priceTier: 'luxury',
    rating: 4.9,
    type: 'Expedition lodge',
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1400&q=80',
    summary: 'Glacier hikes, fire-warmed lodges, private guides, and big-sky silence.'
  }
];

const staticTranslations = {
  en: {
    'A private guide to slower mornings, hidden courtyards, and late dinners beside the water.': 'A private guide to slower mornings, hidden courtyards, and late dinners beside the water.',
    'How to turn a five-day escape into a restorative journey without losing the thrill of discovery.': 'How to turn a five-day escape into a restorative journey without losing the thrill of discovery.',
    'Boutique stays, chef-led markets, and the quiet rituals that make a city feel personal.': 'Boutique stays, chef-led markets, and the quiet rituals that make a city feel personal.'
  },
  hi: {
    'A private guide to slower mornings, hidden courtyards, and late dinners beside the water.': 'Hindi travel note: a private guide to slower mornings, hidden courtyards, and late dinners beside the water.',
    'How to turn a five-day escape into a restorative journey without losing the thrill of discovery.': 'Hindi travel note: a five-day escape shaped as a restorative journey without losing discovery.',
    'Boutique stays, chef-led markets, and the quiet rituals that make a city feel personal.': 'Hindi travel note: boutique stays, chef-led markets, and quiet rituals that make a city feel personal.'
  },
  fr: {
    'A private guide to slower mornings, hidden courtyards, and late dinners beside the water.': "Un guide prive pour des matins plus lents, des cours cachees et des diners tardifs au bord de l'eau.",
    'How to turn a five-day escape into a restorative journey without losing the thrill of discovery.': 'Comment transformer une escapade de cinq jours en voyage reparateur sans perdre le frisson de la decouverte.',
    'Boutique stays, chef-led markets, and the quiet rituals that make a city feel personal.': 'Sejours boutique, marches avec chef et rituels discrets qui rendent une ville intime.'
  },
  es: {
    'A private guide to slower mornings, hidden courtyards, and late dinners beside the water.': 'Una guia privada para mananas pausadas, patios ocultos y cenas tardias junto al agua.',
    'How to turn a five-day escape into a restorative journey without losing the thrill of discovery.': 'Como convertir una escapada de cinco dias en un viaje reparador sin perder la emocion del descubrimiento.',
    'Boutique stays, chef-led markets, and the quiet rituals that make a city feel personal.': 'Estancias boutique, mercados guiados por chefs y rituales tranquilos que hacen que una ciudad se sienta propia.'
  }
};

const elements = {
  nav: document.getElementById('site-nav'),
  navToggle: document.getElementById('nav-toggle'),
  navLinks: document.getElementById('nav-links'),
  destinationGrid: document.getElementById('destination-grid'),
  suggestionsPanel: document.getElementById('suggestions-panel'),
  searchInput: document.getElementById('destination-search'),
  itineraryOutput: document.getElementById('itinerary-output'),
  plannerForm: document.getElementById('planner-form'),
  reviewsGrid: document.getElementById('reviews-grid'),
  blogGrid: document.getElementById('blog-grid'),
  languagePills: document.getElementById('language-pills'),
  dropZone: document.getElementById('drop-zone'),
  photoInput: document.getElementById('photo-input'),
  visionResult: document.getElementById('vision-result'),
  chatOrb: document.getElementById('chat-orb'),
  chatDrawer: document.getElementById('chat-drawer'),
  chatClose: document.getElementById('chat-close'),
  chatMessages: document.getElementById('chat-messages'),
  chatForm: document.getElementById('chat-form'),
  chatInput: document.getElementById('chat-input'),
  newsletterForm: document.getElementById('newsletter-form'),
  toastStack: document.getElementById('toast-stack')
};

document.addEventListener('DOMContentLoaded', () => {
  bindNavigation();
  bindSearch();
  bindFilters();
  bindPlanner();
  bindReviews();
  bindBlog();
  bindGallery();
  bindChat();
  bindNewsletter();
  bindRevealAnimations();
  bindParallax();
  loadDestinations();
  loadReviews();
  renderBlog('en');
  routeToHash();
});

async function apiFetch(path, options = {}) {
  try {
    const response = await fetch(`${API_BASE}${path}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {})
      }
    });

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    return response.json();
  } catch (error) {
    return staticApiFetch(path, options);
  }
}

function staticApiFetch(path, options = {}) {
  const url = new URL(path, window.location.origin);
  const body = options.body ? JSON.parse(options.body) : {};

  if (url.pathname === '/api/destinations') {
    return Promise.resolve({ destinations: staticDestinations });
  }

  if (url.pathname === '/api/search') {
    return Promise.resolve({ suggestions: staticSuggestDestinations(url.searchParams.get('q')) });
  }

  if (url.pathname === '/api/sentiment') {
    return Promise.resolve({ reviews: staticAnalyzeSentiment(body.reviews || [{ author: 'Guest', text: body.text || '' }]) });
  }

  if (url.pathname === '/api/entities') {
    return Promise.resolve({ entities: staticExtractEntities(body.text || '') });
  }

  if (url.pathname === '/api/translate') {
    return Promise.resolve(staticTranslateText(body.text || '', body.targetLanguage || 'en'));
  }

  if (url.pathname === '/api/vision') {
    return Promise.resolve(staticAnalyzeImage(body.imageData || ''));
  }

  if (url.pathname === '/api/itinerary') {
    return Promise.resolve(staticGenerateItinerary(body));
  }

  if (url.pathname === '/api/chat') {
    return Promise.resolve(staticChatReply(body.message || '', body.history || []));
  }

  return Promise.reject(new Error(`No static fallback for ${url.pathname}`));
}

function staticSuggestDestinations(query) {
  const needle = (query || '').trim().toLowerCase();
  const suggestions = staticDestinations.filter(destination => {
    const haystack = [
      destination.name,
      destination.country,
      destination.location,
      destination.type,
      destination.summary
    ].join(' ').toLowerCase();
    return !needle || haystack.includes(needle);
  });

  if (suggestions.length) {
    return suggestions.slice(0, 6);
  }

  return [
    {
      name: query ? query.replace(/\b\w/g, letter => letter.toUpperCase()) : 'Hidden Coast',
      country: 'Curated by WanderAI',
      location: 'Bespoke',
      type: 'Private itinerary concept',
      score: 0.74,
      image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=80'
    }
  ];
}

function staticGenerateItinerary(payload) {
  const destination = (payload.destination || 'Amalfi Coast').trim();
  const days = Math.min(Math.max(Number(payload.days) || 5, 1), 14);
  const budget = payload.budget || 'premium';
  const style = payload.style || payload.travelStyle || 'culture and slow luxury';
  const titles = [
    'Arrival With A Sense Of Place',
    'Markets, Makers, And Hidden Rooms',
    'Water, Wellness, And Slow Afternoons',
    'Architecture, Art, And After-Dark Tables',
    'A Private Detour Beyond The Guidebooks'
  ];

  return {
    destination,
    budget,
    style,
    days: Array.from({ length: days }, (_, index) => ({
      day: index + 1,
      title: titles[index] || `Signature ${style} Day In ${destination}`,
      morning: `Begin with a private, unhurried introduction to ${destination}, tuned for ${style}.`,
      afternoon: `Reserve the afternoon for a curated ${budget} experience with a local specialist.`,
      evening: `Close day ${index + 1} with a golden-hour table, a short walk, and a quiet nightcap.`
    }))
  };
}

function staticChatReply(message, history = []) {
  const lower = message.toLowerCase();
  let reply = 'I would start with season, pace, and the feeling you want from the trip, then shortlist destinations where the hotels and local rhythm support that mood.';

  if (!message.trim()) {
    reply = 'Tell me where you are dreaming of going, when you want to travel, and the pace you prefer.';
  } else if (lower.includes('budget')) {
    reply = 'For a luxury trip, protect budget for location, private transfers, and one signature meal, then trim on midday dining and optional add-on tours.';
  } else if (lower.includes('honeymoon') || lower.includes('romantic')) {
    reply = 'I would build this around slower mornings, view-led suites, private transfers, and one surprise dinner where the setting does most of the work.';
  } else if (lower.includes('itinerary') || lower.includes('days')) {
    reply = 'Share destination, number of days, budget, and travel style. I can turn that into a day-by-day plan with a calm pace and strong anchors.';
  }

  return {
    reply,
    historyDepth: history.length,
    suggestions: ['Design a 5-day itinerary', 'Find coastal luxury escapes', 'Compare Bali and Kyoto']
  };
}

function staticAnalyzeSentiment(reviews) {
  const positiveTerms = ['beautiful', 'excellent', 'amazing', 'luxury', 'perfect', 'memorable', 'seamless', 'stunning', 'calm', 'wonderful', 'loved'];
  const negativeTerms = ['late', 'delayed', 'poor', 'noisy', 'bad', 'crowded', 'expensive', 'cold', 'missed', 'rushed', 'disappointed'];

  return reviews.filter(review => (review.text || '').trim()).map(review => {
    const words = (review.text.toLowerCase().match(/[a-z]+/g) || []);
    const positiveHits = words.filter(word => positiveTerms.includes(word)).length;
    const negativeHits = words.filter(word => negativeTerms.includes(word)).length;
    const sentiment = positiveHits > negativeHits ? 'positive' : negativeHits > positiveHits ? 'negative' : 'neutral';

    return {
      author: review.author || 'Traveler',
      text: review.text,
      sentiment,
      confidenceScores: {
        positive: sentiment === 'positive' ? 0.86 : 0.28,
        neutral: sentiment === 'neutral' ? 0.53 : 0.12,
        negative: sentiment === 'negative' ? 0.82 : 0.08
      }
    };
  });
}

function staticExtractEntities(text) {
  const knownPlaces = ['Amalfi', 'Bali', 'Kyoto', 'Santorini', 'Marrakech', 'Patagonia', 'Paris', 'Tokyo', 'Rome', 'Jaipur'];
  const places = knownPlaces.filter(place => new RegExp(`\\b${place}\\b`, 'i').test(text));
  const dates = text.match(/\b(\d{4}-\d{2}-\d{2}|next\s(?:week|month|summer|winter|spring|fall))\b/gi) || [];

  return [
    ...places.map(place => ({ text: place, category: 'Location', confidenceScore: 0.92 })),
    ...dates.map(date => ({ text: date, category: 'DateTime', confidenceScore: 0.87 }))
  ];
}

function staticTranslateText(text, targetLanguage) {
  const language = (targetLanguage || 'en').toLowerCase();
  const phrasebook = staticTranslations[language] || staticTranslations.en;
  const translatedText = phrasebook[text] || `${language.toUpperCase()} travel note: ${text}`;

  return {
    detectedLanguage: 'en',
    targetLanguage: language,
    translatedText
  };
}

function staticAnalyzeImage(imageData) {
  const mood = (imageData || '').length > 120000 ? 'cinematic' : 'editorial';

  return {
    caption: `A ${mood} travel frame with refined light, strong sense of place, and magazine-ready composition.`,
    tags: ['travel', 'luxury', 'architecture', 'golden-hour', 'wanderai'],
    metadata: {
      received: Boolean(imageData),
      analysisMode: 'static-pages-demo'
    }
  };
}

function bindNavigation() {
  elements.navToggle.addEventListener('click', () => {
    document.body.classList.toggle('nav-open');
  });

  elements.navLinks.addEventListener('click', event => {
    if (event.target.matches('a')) {
      document.body.classList.remove('nav-open');
    }
  });

  window.addEventListener('scroll', () => {
    elements.nav.classList.toggle('compact', window.scrollY > 70);
  });

  window.addEventListener('hashchange', routeToHash);
}

function routeToHash() {
  const route = (window.location.hash.replace('#/', '') || 'home').split('?')[0];
  const target = document.querySelector(`[data-route="${route}"]`) || document.getElementById('home');
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#/${route}`);
  });
  target.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function bindSearch() {
  const debouncedSearch = debounce(async query => {
    if (!query.trim()) {
      elements.suggestionsPanel.hidden = true;
      return;
    }

    elements.suggestionsPanel.hidden = false;
    elements.suggestionsPanel.innerHTML = '<div class="suggestion-item">Searching private matches...</div>';

    try {
      const data = await apiFetch(`/api/search?q=${encodeURIComponent(query)}`, { method: 'GET' });
      renderSuggestions(data.suggestions || []);
    } catch (error) {
      showToast('Search is unavailable right now.', 'error');
      elements.suggestionsPanel.hidden = true;
    }
  }, 300);

  elements.searchInput.addEventListener('input', event => debouncedSearch(event.target.value));
}

function renderSuggestions(suggestions) {
  if (!suggestions.length) {
    elements.suggestionsPanel.innerHTML = '<div class="suggestion-item">No matches yet. Try a mood or region.</div>';
    return;
  }

  elements.suggestionsPanel.innerHTML = suggestions.map(item => `
    <button class="suggestion-item" type="button" data-name="${escapeHtml(item.name)}">
      <img src="${item.image}" alt="${escapeHtml(item.name)}" />
      <span>
        <strong>${escapeHtml(item.name)}</strong><br />
        <small>${escapeHtml(item.country)} · ${escapeHtml(item.type)}</small>
      </span>
    </button>
  `).join('');

  elements.suggestionsPanel.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', () => {
      elements.searchInput.value = button.dataset.name;
      elements.suggestionsPanel.hidden = true;
      showToast(`${button.dataset.name} added to your search mood.`, 'success');
    });
  });
}

async function loadDestinations() {
  try {
    const data = await apiFetch('/api/destinations', { method: 'GET' });
    state.destinations = data.destinations || [];
    renderDestinations();
  } catch (error) {
    showToast('Destination cards could not load.', 'error');
  }
}

function bindFilters() {
  document.querySelectorAll('.filters .filter-pill').forEach(button => {
    button.addEventListener('click', () => {
      document.querySelectorAll('.filters .filter-pill').forEach(item => item.classList.remove('active'));
      button.classList.add('active');
      state.activeFilter = button.dataset.filter;
      renderDestinations();
    });
  });
}

function renderDestinations() {
  const filtered = state.destinations.filter(destination => {
    if (state.activeFilter === 'all') return true;
    if (state.activeFilter === '4.8') return destination.rating >= 4.8;
    return destination.priceTier === state.activeFilter || destination.location === state.activeFilter;
  });

  elements.destinationGrid.innerHTML = filtered.map(destination => `
    <article class="destination-card reveal visible">
      <img src="${destination.image}" alt="${escapeHtml(destination.name)}" />
      <div class="card-body">
        <div class="meta-row">
          <span>${escapeHtml(destination.location)}</span>
          <span>Rating ${destination.rating}</span>
        </div>
        <h3>${escapeHtml(destination.name)}</h3>
        <p>${escapeHtml(destination.summary)}</p>
        <div class="meta-row">
          <span class="price">$${destination.price.toLocaleString()}</span>
          <span>${escapeHtml(destination.type)}</span>
        </div>
      </div>
    </article>
  `).join('');
}

function bindPlanner() {
  elements.plannerForm.addEventListener('submit', async event => {
    event.preventDefault();
    const form = new FormData(elements.plannerForm);
    const payload = Object.fromEntries(form.entries());
    payload.days = Number(payload.days);

    elements.itineraryOutput.innerHTML = `
      <div class="day-card skeleton"></div>
      <div class="day-card skeleton"></div>
      <div class="day-card skeleton"></div>
    `;

    try {
      const data = await apiFetch('/api/itinerary', {
        method: 'POST',
        body: JSON.stringify(payload)
      });
      renderItinerary(data.days || []);
      showToast('Itinerary generated.', 'success');
    } catch (error) {
      showToast('Itinerary generation failed.', 'error');
      elements.itineraryOutput.innerHTML = '<div class="empty-state">Try a shorter itinerary or different destination.</div>';
    }
  });
}

function renderItinerary(days) {
  elements.itineraryOutput.innerHTML = days.map((day, index) => `
    <article class="day-card" data-day="${day.day}" style="animation-delay: ${index * 100}ms">
      <h3>${escapeHtml(day.title)}</h3>
      <p><strong>Morning:</strong> ${escapeHtml(day.morning)}</p>
      <p><strong>Afternoon:</strong> ${escapeHtml(day.afternoon)}</p>
      <p><strong>Evening:</strong> ${escapeHtml(day.evening)}</p>
    </article>
  `).join('');
}

function bindReviews() {
  elements.reviewsGrid.addEventListener('click', async event => {
    const card = event.target.closest('[data-review-text]');
    if (!card) return;

    try {
      const data = await apiFetch('/api/entities', {
        method: 'POST',
        body: JSON.stringify({ text: card.dataset.reviewText })
      });
      const entities = (data.entities || []).map(item => item.text).join(', ') || 'No places or dates detected';
      showToast(`Entities: ${entities}`, 'success');
    } catch (error) {
      showToast('Entity extraction failed.', 'error');
    }
  });
}

async function loadReviews() {
  try {
    const data = await apiFetch('/api/sentiment', {
      method: 'POST',
      body: JSON.stringify({ reviews: state.reviews })
    });
    renderReviews(data.reviews || []);
  } catch (error) {
    showToast('Review sentiment could not load.', 'error');
  }
}

function renderReviews(reviews) {
  elements.reviewsGrid.innerHTML = reviews.map(review => `
    <article class="review-card" data-review-text="${escapeHtml(review.text)}">
      <span class="sentiment-badge ${review.sentiment}">${review.sentiment}</span>
      <h3>${escapeHtml(review.author)}</h3>
      <p>${escapeHtml(review.text)}</p>
      <small>Click card to extract places and dates.</small>
    </article>
  `).join('');
}

function bindBlog() {
  elements.languagePills.addEventListener('click', event => {
    const button = event.target.closest('[data-lang]');
    if (!button) return;

    elements.languagePills.querySelectorAll('button').forEach(item => item.classList.remove('active'));
    button.classList.add('active');
    renderBlog(button.dataset.lang);
  });
}

async function renderBlog(language) {
  elements.blogGrid.innerHTML = state.blogPosts.map(() => '<article class="blog-card skeleton"></article>').join('');

  try {
    const translated = await Promise.all(state.blogPosts.map(post => (
      apiFetch('/api/translate', {
        method: 'POST',
        body: JSON.stringify({ text: post.text, targetLanguage: language })
      })
    )));

    elements.blogGrid.innerHTML = state.blogPosts.map((post, index) => `
      <article class="blog-card">
        <p class="eyebrow">${language.toUpperCase()}</p>
        <h3>${escapeHtml(post.title)}</h3>
        <p>${escapeHtml(translated[index].translatedText)}</p>
      </article>
    `).join('');
  } catch (error) {
    showToast('Translation failed.', 'error');
  }
}

function bindGallery() {
  elements.dropZone.addEventListener('click', () => elements.photoInput.click());
  elements.dropZone.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      elements.photoInput.click();
    }
  });

  ['dragenter', 'dragover'].forEach(type => {
    elements.dropZone.addEventListener(type, event => {
      event.preventDefault();
      elements.dropZone.classList.add('dragging');
    });
  });

  ['dragleave', 'drop'].forEach(type => {
    elements.dropZone.addEventListener(type, event => {
      event.preventDefault();
      elements.dropZone.classList.remove('dragging');
    });
  });

  elements.dropZone.addEventListener('drop', event => {
    const file = event.dataTransfer.files[0];
    if (file) analyzePhoto(file);
  });

  elements.photoInput.addEventListener('change', event => {
    const file = event.target.files[0];
    if (file) analyzePhoto(file);
  });
}

function analyzePhoto(file) {
  if (!file.type.startsWith('image/')) {
    showToast('Please choose an image file.', 'error');
    return;
  }

  const reader = new FileReader();
  reader.onload = async () => {
    const imageData = reader.result;
    elements.visionResult.innerHTML = `
      <img src="${imageData}" alt="Uploaded travel preview" />
      <div class="skeleton" style="min-height: 90px; margin-top: 14px;"></div>
    `;

    try {
      const data = await apiFetch('/api/vision', {
        method: 'POST',
        body: JSON.stringify({ imageData })
      });
      renderVisionResult(imageData, data);
      showToast('Photo analyzed.', 'success');
    } catch (error) {
      showToast('Photo analysis failed.', 'error');
    }
  };
  reader.readAsDataURL(file);
}

function renderVisionResult(imageData, data) {
  elements.visionResult.innerHTML = `
    <img src="${imageData}" alt="Uploaded travel preview" />
    <h3>AI Caption</h3>
    <p>${escapeHtml(data.caption)}</p>
    <div class="tag-list">
      ${(data.tags || []).map(tag => `<span class="tag-chip">${escapeHtml(tag)}</span>`).join('')}
    </div>
  `;
}

function bindChat() {
  addMessage('bot', 'Tell me the mood, dates, and destination you are considering. I will shape a sharper travel idea.');

  elements.chatOrb.addEventListener('click', () => {
    elements.chatDrawer.classList.add('open');
    elements.chatInput.focus();
  });

  elements.chatClose.addEventListener('click', () => {
    elements.chatDrawer.classList.remove('open');
  });

  elements.chatForm.addEventListener('submit', async event => {
    event.preventDefault();
    const message = elements.chatInput.value.trim();
    if (!message) return;

    elements.chatInput.value = '';
    addMessage('user', message);
    state.chatHistory.push({ role: 'user', content: message });
    const typingNode = addTyping();

    try {
      const data = await apiFetch('/api/chat', {
        method: 'POST',
        body: JSON.stringify({ message, history: state.chatHistory })
      });
      typingNode.remove();
      await streamMessage(data.reply);
      state.chatHistory.push({ role: 'assistant', content: data.reply });
    } catch (error) {
      typingNode.remove();
      showToast('Chat response failed.', 'error');
    }
  });
}

function addMessage(role, text) {
  const node = document.createElement('div');
  node.className = `message ${role}`;
  node.textContent = text;
  elements.chatMessages.appendChild(node);
  elements.chatMessages.scrollTop = elements.chatMessages.scrollHeight;
  return node;
}

function addTyping() {
  const node = document.createElement('div');
  node.className = 'message bot';
  node.innerHTML = '<span class="typing"><span></span><span></span><span></span></span>';
  elements.chatMessages.appendChild(node);
  elements.chatMessages.scrollTop = elements.chatMessages.scrollHeight;
  return node;
}

async function streamMessage(text) {
  const node = addMessage('bot', '');
  for (let index = 0; index < text.length; index += 1) {
    node.textContent += text[index];
    elements.chatMessages.scrollTop = elements.chatMessages.scrollHeight;
    await wait(12);
  }
}

function bindNewsletter() {
  elements.newsletterForm.addEventListener('submit', event => {
    event.preventDefault();
    elements.newsletterForm.reset();
    showToast('You are on the private dispatch list.', 'success');
  });
}

function bindRevealAnimations() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.16 });

  document.querySelectorAll('.reveal').forEach(item => observer.observe(item));
}

function bindParallax() {
  const hero = document.querySelector('.hero-backdrop');
  window.addEventListener('scroll', () => {
    const offset = Math.min(window.scrollY * 0.16, 90);
    hero.style.setProperty('--parallax', `${offset}px`);
  });
}

function showToast(message, type = 'success') {
  const node = document.createElement('div');
  node.className = `toast ${type}`;
  node.textContent = message;
  elements.toastStack.appendChild(node);
  setTimeout(() => node.remove(), 3600);
}

function debounce(callback, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => callback(...args), delay);
  };
}

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function escapeHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}
