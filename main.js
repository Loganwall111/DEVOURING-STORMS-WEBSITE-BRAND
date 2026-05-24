// DEVOURING STORMS STUDIOS — MAIN JS v2

// ── NAV ──
function toggleNav() {
  document.getElementById('navLinks').classList.toggle('open');
}
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => document.getElementById('navLinks').classList.remove('open'));
  });

  // Active nav
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const linkPage = link.getAttribute('href').split('/').pop();
    if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
      link.classList.add('active');
    }
  });

  // Particles
  createParticles();

  // Scroll fade-in
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.portal-card, .song-card, .video-card, .lore-card, .news-card, .series-arc, .community-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
  });
});

// ── PARTICLES ──
function createParticles() {
  const container = document.createElement('div');
  container.className = 'storm-particles';
  document.body.appendChild(container);
  const colors = ['#8b00ff','#ff00ff','#00d4ff','#bf7fff'];
  for (let i = 0; i < 30; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.left = Math.random() * 100 + 'vw';
    p.style.width = (Math.random() * 3 + 1) + 'px';
    p.style.height = p.style.width;
    p.style.background = colors[Math.floor(Math.random() * colors.length)];
    p.style.animationDuration = (Math.random() * 15 + 10) + 's';
    p.style.animationDelay = (Math.random() * 10) + 's';
    container.appendChild(p);
  }
}

// ── VIDEO MODAL ──
function openVideo(videoId) {
  let modal = document.getElementById('videoModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'videoModal';
    modal.className = 'modal-overlay';
    modal.innerHTML = `
      <div class="modal-inner">
        <button class="modal-close" onclick="closeVideo()">✕ CLOSE</button>
        <iframe id="modalFrame" class="modal-frame" frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen></iframe>
      </div>`;
    modal.addEventListener('click', e => { if (e.target === modal) closeVideo(); });
    document.body.appendChild(modal);
  }
  document.getElementById('modalFrame').src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeVideo() {
  const modal = document.getElementById('videoModal');
  if (modal) {
    modal.classList.remove('open');
    document.getElementById('modalFrame').src = '';
    document.body.style.overflow = '';
  }
}
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeVideo(); });

// ── VIDEO FILTER ──
function filterVideos(type) {
  document.querySelectorAll('.video-card').forEach(card => {
    const match = type === 'all' || card.dataset.type === type;
    card.style.display = match ? 'block' : 'none';
  });
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.toggle('btn-primary', btn.dataset.filter === type);
    btn.classList.toggle('btn-secondary', btn.dataset.filter !== type);
  });
}
