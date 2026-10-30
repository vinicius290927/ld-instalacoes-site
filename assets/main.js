/* ==========================================================
   LD INSTALAÇÕES — Lógica do site
   Depende de assets/config.js (carregado antes deste arquivo)
   ========================================================== */

/* ---------- WhatsApp helper (usado por todos os CTAs) ---------- */
function buildWhatsAppLink(messageKey) {
  const number = (companyConfig.whatsapp || "").replace(/\D/g, "");
  const text = companyConfig.whatsappMessages[messageKey] || companyConfig.whatsappMessages.default;
  const encoded = encodeURIComponent(text);
  if (!number) {
    // Sem número configurado ainda: mantemos o link inofensivo (não quebra a página)
    return "#contato";
  }
  return `https://wa.me/${number}?text=${encoded}`;
}

function wireWhatsAppLinks() {
  document.querySelectorAll("[data-wa]").forEach((el) => {
    const key = el.getAttribute("data-wa") || "default";
    el.setAttribute("href", buildWhatsAppLink(key));
    el.setAttribute("target", "_blank");
    el.setAttribute("rel", "noopener noreferrer");
  });
}

/* ---------- Header scroll state ---------- */
function initHeaderScroll() {
  const header = document.getElementById("site-header");
  const onScroll = () => {
    if (window.scrollY > 12) header.classList.add("scrolled");
    else header.classList.remove("scrolled");
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

/* ---------- Mobile menu ---------- */
function initMobileMenu() {
  const menu = document.getElementById("mobile-menu");
  const backdrop = document.getElementById("mobile-backdrop");
  const openBtn = document.getElementById("hamburger-btn");
  const closeBtn = document.getElementById("mobile-close-btn");

  const open = () => {
    menu.classList.add("open");
    backdrop.classList.add("open");
    openBtn.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  };
  const close = () => {
    menu.classList.remove("open");
    backdrop.classList.remove("open");
    openBtn.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  };

  openBtn.addEventListener("click", open);
  closeBtn.addEventListener("click", close);
  backdrop.addEventListener("click", close);
  menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", close));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });
}

/* ---------- Reveal on scroll ---------- */
function initReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("in"));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  items.forEach((el) => io.observe(el));
}

/* ---------- Render: Services ---------- */
function renderServices() {
  const grid = document.getElementById("services-grid");
  grid.innerHTML = services
    .map(
      (s) => `
    <article class="service-card reveal${s.highlight ? " highlight" : ""}">
      ${s.highlight ? '<span class="service-badge">Serviço em destaque</span>' : ""}
      <div class="service-icon"><i data-lucide="${s.icon}" width="22" height="22"></i></div>
      <h3 class="service-title">${s.title}</h3>
      <p class="service-desc">${s.description}</p>
    </article>`
    )
    .join("");
}

/* ---------- Render: Differentials ---------- */
function renderDifferentials() {
  const grid = document.getElementById("diff-grid");
  grid.innerHTML = differentials
    .map(
      (d) => `
    <div class="diff-card reveal">
      <div class="diff-icon"><i data-lucide="${d.icon}" width="24" height="24"></i></div>
      <div>
        <h3>${d.title}</h3>
        <p>${d.description}</p>
      </div>
    </div>`
    )
    .join("");
}

/* ---------- Render: Service area cities ---------- */
function renderCities() {
  const list = document.getElementById("city-list");
  list.innerHTML = companyConfig.cities
    .map(
      (c) => `
    <div class="city-item reveal">
      <i data-lucide="map-pin" width="19" height="19"></i>
      <span>${c}</span>
    </div>`
    )
    .join("");
}

/* ---------- Render: Portfolio + lightbox data ---------- */
function renderPortfolio() {
  const grid = document.getElementById("portfolio-grid");
  grid.innerHTML = projects
    .map(
      (p, i) => `
    <article class="project-card reveal" data-index="${i}" tabindex="0" role="button" aria-label="Ver detalhes: ${p.title}">
      <div class="thumb">
        <span class="tag">${p.category}</span>
        <img src="${p.image}" alt="${p.title} — ${p.city}" loading="lazy" width="640" height="480">
      </div>
      <div class="body">
        <div class="meta">${p.city}</div>
        <h3>${p.title}</h3>
        <p>${p.description}</p>
      </div>
    </article>`
    )
    .join("");

  grid.querySelectorAll(".project-card").forEach((card) => {
    const idx = Number(card.getAttribute("data-index"));
    card.addEventListener("click", () => openLightbox(idx));
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openLightbox(idx);
      }
    });
  });
}

/* ---------- Render: Lighting mosaic (uses first 4 lighting-tagged photos) ---------- */
function renderLightingMosaic() {
  const mosaic = document.getElementById("lighting-mosaic");
  const lightingProjects = projects.filter((p) => p.category === "Projeto Luminotécnico").slice(0, 4);
  mosaic.innerHTML = lightingProjects
    .map(
      (p) => `
    <figure>
      <img src="${p.image}" alt="${p.title}" loading="lazy" width="480" height="360">
    </figure>`
    )
    .join("");
}

/* ---------- Render: Testimonials ---------- */
function renderTestimonials() {
  const grid = document.getElementById("testi-grid");
  const empty = document.getElementById("testi-empty");
  if (!testimonials || testimonials.length === 0) {
    grid.style.display = "none";
    empty.style.display = "block";
    return;
  }
  grid.style.display = "grid";
  empty.style.display = "none";
  grid.innerHTML = testimonials
    .map((t) => {
      const stars = Array.from({ length: 5 })
        .map((_, i) => `<i data-lucide="star" width="16" height="16" fill="${i < t.rating ? "currentColor" : "none"}"></i>`)
        .join("");
      return `
      <div class="testi-card reveal">
        <div class="testi-stars">${stars}</div>
        <p class="testi-text">"${t.text}"</p>
        <div class="testi-name">${t.name}</div>
        ${t.company ? `<div class="testi-company">${t.company}</div>` : ""}
      </div>`;
    })
    .join("");
}

/* ---------- Lightbox ---------- */
let lightboxIndex = 0;
function openLightbox(index) {
  lightboxIndex = index;
  updateLightbox();
  document.getElementById("lightbox").classList.add("open");
  document.body.style.overflow = "hidden";
}
function closeLightbox() {
  document.getElementById("lightbox").classList.remove("open");
  document.body.style.overflow = "";
}
function updateLightbox() {
  const p = projects[lightboxIndex];
  document.getElementById("lightbox-img").src = p.image;
  document.getElementById("lightbox-img").alt = p.title;
  document.getElementById("lightbox-title").textContent = p.title;
  document.getElementById("lightbox-desc").textContent = `${p.city} — ${p.category}. ${p.description}`;
}
function initLightbox() {
  document.getElementById("lightbox-close").addEventListener("click", closeLightbox);
  document.getElementById("lightbox").addEventListener("click", (e) => {
    if (e.target.id === "lightbox") closeLightbox();
  });
  document.getElementById("lightbox-prev").addEventListener("click", () => {
    lightboxIndex = (lightboxIndex - 1 + projects.length) % projects.length;
    updateLightbox();
  });
  document.getElementById("lightbox-next").addEventListener("click", () => {
    lightboxIndex = (lightboxIndex + 1) % projects.length;
    updateLightbox();
  });
  document.addEventListener("keydown", (e) => {
    if (!document.getElementById("lightbox").classList.contains("open")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") document.getElementById("lightbox-prev").click();
    if (e.key === "ArrowRight") document.getElementById("lightbox-next").click();
  });
}

/* ---------- Quote form validation + submit ---------- */


function initQuoteForm() {
  const form = document.getElementById("quote-form");
  if (!form) return;

  const status = document.getElementById("form-status");

  const telefoneEmpresa = "5513988118891";

  const validators = {
    name: (v) => v.trim().length >= 3 || "Informe seu nome completo.",
    whatsapp: (v) => /^[\d\s()+-]{8,}$/.test(v.trim()) || "Informe um WhatsApp válido.",
    city: (v) => v.trim().length >= 2 || "Informe sua cidade.",
    serviceType: (v) => v.trim().length > 0 || "Selecione o tipo de serviço.",
    description: (v) => v.trim().length >= 10 || "Descreva um pouco mais seu projeto.",
  };

  function setFieldError(field, message) {
    const wrap = field.closest(".field");
    if (!wrap) return;

    wrap.classList.toggle("error", Boolean(message));

    const err = wrap.querySelector(".field-error");
    if (err) err.textContent = message || "";
  }

  function validateField(field) {
    const rule = validators[field.name];
    if (!rule) return true;

    const result = rule(field.value);
    setFieldError(field, result === true ? "" : result);

    return result === true;
  }

  form.querySelectorAll("input, select, textarea").forEach((field) => {
    field.addEventListener("blur", () => validateField(field));
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const campos = Array.from(
      form.querySelectorAll("input, select, textarea")
    );

    const dados = campos
      .filter((campo) => {
        if (["checkbox", "radio"].includes(campo.type) && !campo.checked) {
          return false;
        }

        return campo.type !== "submit" && campo.name !== "";
      })
      .map((campo) => {
        const rotulo =
          campo.labels?.[0]?.textContent?.trim() ||
          campo.name ||
          campo.id;

        const valor = campo.value.trim();

        return valor ? `${rotulo}: ${valor}` : "";
      })
      .filter(Boolean);

    const mensagem = [
      "Olá! Gostaria de solicitar um orçamento para a LD Instalações.",
      "",
      ...dados,
      "",
      "Enviado pelo formulário do site."
    ].join("\n");

    const url = `https://wa.me/${telefoneEmpresa}?text=${encodeURIComponent(mensagem)}`;

    if (status) {
      status.textContent = "Abrindo o WhatsApp...";
    }

    window.open(url, "_blank", "noopener,noreferrer");
  });
}



/* ---------- Footer year ---------- */
function initFooterYear() {
  const el = document.getElementById("footer-year");
  if (el) el.textContent = new Date().getFullYear();
}

/* ---------- Instagram link ---------- */
function wireInstagramLinks() {
  document.querySelectorAll("[data-instagram]").forEach((el) => {
    if (companyConfig.instagram) {
      el.setAttribute("href", companyConfig.instagram);
      el.setAttribute("target", "_blank");
      el.setAttribute("rel", "noopener noreferrer");
    } else {
      el.setAttribute("href", "#contato");
    }
  });
}

/* ---------- Config-driven contact info ---------- */
function fillContactInfo() {
  const emailEl = document.getElementById("contact-email");
  if (emailEl) emailEl.textContent = companyConfig.email || "A definir";
  const addressEl = document.getElementById("contact-address");
  if (addressEl) addressEl.textContent = companyConfig.address || companyConfig.cities.join(" · ");
  const waEl = document.getElementById("contact-whatsapp-text");
  if (waEl) waEl.textContent = companyConfig.whatsapp ? "Falar agora" : "A definir";
}

/* ---------- Init ---------- */
document.addEventListener("DOMContentLoaded", () => {
  renderServices();
  renderDifferentials();
  renderCities();
  renderPortfolio();
  renderLightingMosaic();
  renderTestimonials();
  fillContactInfo();

  initHeaderScroll();
  initMobileMenu();
  initLightbox();
  initQuoteForm();
  initFooterYear();

  wireWhatsAppLinks();
  wireInstagramLinks();

  if (window.lucide) lucide.createIcons();
  initReveal();
});
