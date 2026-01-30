document.addEventListener("DOMContentLoaded", () => {

  /* ===============================
     SCROLL NORMAL
  =============================== */

  const normalItems = document.querySelectorAll(".animate-on-scroll");

  const normalObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const el = entry.target;
      if (el.dataset.animated) return;

      el.dataset.animated = "true";

      const anim = el.dataset.anim;
      if (!anim) return;

      el.classList.add("animate__animated", anim);
      normalObserver.unobserve(el);
    });
  }, { threshold: 0.25 });

  normalItems.forEach(el => normalObserver.observe(el));

  /* ===============================
     STAGGER — STEPS
  =============================== */

  const stepsSection = document.querySelector(".page__steps");
  if (!stepsSection) return;

  const steps = stepsSection.querySelectorAll(".animate-stagger");
  let hasAnimated = false;

  const stepsObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting || hasAnimated) return;

      hasAnimated = true;

      steps.forEach((step, index) => {
        const anim = step.dataset.anim;
        if (!anim) return;

        step.style.animationDelay = `${index * 0.35}s`;
        step.classList.add("animate__animated", anim);
      });

      stepsObserver.disconnect();
    });
  }, { threshold: 0.35 });

  stepsObserver.observe(stepsSection);

});
