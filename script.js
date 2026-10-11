(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if ('IntersectionObserver' in window && !reduced) {
    document.documentElement.classList.add('motion');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } });
    }, {threshold: 0.08});
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  }
  const progress = document.querySelector('.progress');
  const road = document.querySelector('.road-bed');
  const traveler = document.querySelector('#traveler');
  const journey = document.querySelector('.journey');
  const length = road.getTotalLength();
  let queued = false;
  function paint() {
    const max = document.documentElement.scrollHeight - innerHeight;
    progress.style.width = `${max > 0 ? scrollY / max * 100 : 0}%`;
    const rect = journey.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (innerHeight * .5 - rect.top) / rect.height));
    const point = road.getPointAtLength(length * ratio);
    traveler.setAttribute('cx', point.x); traveler.setAttribute('cy', point.y);
    queued = false;
  }
  addEventListener('scroll', () => { if (!queued) { queued = true; requestAnimationFrame(paint); } }, {passive:true});
  addEventListener('resize', paint); paint();
})();
