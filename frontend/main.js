const API_BASE = 'http://localhost:5000';

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
