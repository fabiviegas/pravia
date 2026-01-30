document.addEventListener("DOMContentLoaded", function () {
  const elements = document.querySelectorAll(".animate-on-scroll");

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;

          // Evita reprocessar
          if (el.dataset.animated) return;
          el.dataset.animated = "true";

          // Mostra antes de animar
          el.style.opacity = 1;

          // força repaint pra evitar piscar
          void el.offsetWidth;

          el.classList.add("animate__animated");
          observer.unobserve(el);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -20% 0px"
    }
  );

  elements.forEach(el => observer.observe(el));
});
