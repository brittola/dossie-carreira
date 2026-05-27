/* ==========================================================================
   Dossiê de Carreira — comportamento do site
   - Injeta header (navegação) e footer compartilhados em todas as páginas.
   - Marca a página atual, controla o menu mobile e os reveals de scroll.
   Cada página define no <body>:  data-page="NN"  data-root="."|".."
   ========================================================================== */
(function () {
  "use strict";

  /* --- Configuração editável -------------------------------------------- */
  // Edite aqui seu nome e seus links de perfil — vale para o site inteiro.
  var PERFIL = {
    nome: "Gabriel",
    sobrenome: "Rodrigues",
    curso: "Análise e Desenvolvimento de Sistemas",
    escola: "CESAR School",
    links: {
      linkedin: "https://linkedin.com/in/grbritto",
      github: "https://github.com/brittola",
      email: "gabriel.rodrigues.brito@gmail.com"     // mailto:voce@exemplo.com
    }
  };

  // Ordem e títulos das páginas (a navegação é gerada a partir daqui).
  var PAGINAS = [
    { id: "00", titulo: "Início",          arquivo: "index.html", home: true },
    { id: "01", titulo: "Perfil",          arquivo: "paginas/01-perfil.html" },
    { id: "02", titulo: "Diagnóstico",     arquivo: "paginas/02-diagnostico.html" },
    { id: "03", titulo: "Contexto",        arquivo: "paginas/03-contexto.html" },
    { id: "04", titulo: "Hipóteses",       arquivo: "paginas/04-hipoteses.html" },
    { id: "05", titulo: "Experimentação",  arquivo: "paginas/05-experimentacao.html" },
    { id: "06", titulo: "Evidências",      arquivo: "paginas/06-evidencias.html" },
    { id: "07", titulo: "Percurso",        arquivo: "paginas/07-percurso.html" },
    { id: "08", titulo: "Planejamento",    arquivo: "paginas/08-planejamento.html" },
    { id: "09", titulo: "Síntese",         arquivo: "paginas/09-sintese.html" }
  ];

  var body = document.body;
  var ROOT = (body.getAttribute("data-root") || ".").replace(/\/$/, "");
  var CURRENT = body.getAttribute("data-page") || "00";

  function href(arquivo) { return ROOT + "/" + arquivo; }

  /* --- Header / navegação ----------------------------------------------- */
  function buildHeader() {
    var mount = document.getElementById("site-header");
    if (!mount) return;

    var links = PAGINAS.map(function (p) {
      var current = p.id === CURRENT ? ' aria-current="page"' : "";
      var num = p.home ? "" : '<span class="nav__num">' + p.id + "</span>";
      return (
        '<a class="nav__link" href="' + href(p.arquivo) + '"' + current + ">" +
          num + "<span>" + p.titulo + "</span>" +
        "</a>"
      );
    }).join("");

    mount.className = "site-header";
    mount.innerHTML =
      '<div class="shell site-header__bar">' +
        '<a class="brandmark" href="' + href("index.html") + '">' +
          "<span>" + PERFIL.nome + " " + PERFIL.sobrenome + "</span>" +
          '<span class="brandmark__tag">Dossiê</span>' +
        "</a>" +
        '<button class="nav-toggle" aria-expanded="false" aria-controls="primary-nav">' +
          "<span>Índice</span>" +
          '<span class="nav-toggle__lines" aria-hidden="true"><span></span><span></span><span></span></span>' +
        "</button>" +
        '<nav class="nav" id="primary-nav" aria-label="Navegação principal">' +
          '<div class="nav__inner-wrap"><div class="nav__inner">' + links + "</div></div>" +
        "</nav>" +
      "</div>";

    wireMobileMenu(mount);
    syncHeaderHeight(mount);
  }

  function syncHeaderHeight(mount) {
    var apply = function () {
      document.documentElement.style.setProperty("--header-h", mount.offsetHeight + "px");
    };
    apply();
    window.addEventListener("resize", apply);
  }

  function wireMobileMenu(mount) {
    var toggle = mount.querySelector(".nav-toggle");
    var nav = mount.querySelector(".nav");
    if (!toggle || !nav) return;

    var close = function () {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    };
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    // Fecha ao navegar, ao apertar Esc ou clicar fora.
    nav.addEventListener("click", function (e) {
      if (e.target.closest(".nav__link")) close();
    });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") close(); });
    window.addEventListener("resize", function () { if (window.innerWidth > 920) close(); });
  }

  /* --- Footer ------------------------------------------------------------ */
  function buildFooter() {
    var mount = document.getElementById("site-footer");
    if (!mount) return;

    var L = PERFIL.links;
    var navCols = PAGINAS.filter(function (p) { return !p.home; });
    var half = Math.ceil(navCols.length / 2);

    function colLinks(items) {
      return items.map(function (p) {
        return '<a href="' + href(p.arquivo) + '">' + p.id + " · " + p.titulo + "</a>";
      }).join("");
    }

    var atualizado = new Date().toLocaleDateString("pt-BR", { year: "numeric", month: "long" });

    mount.className = "site-footer";
    mount.innerHTML =
      '<div class="shell site-footer__grid">' +
        "<div>" +
          "<h2>Um registro vivo da minha trajetória.</h2>" +
          '<div class="profile-links">' +
            '<a class="profile-link" href="' + L.linkedin + '" target="_blank" rel="noopener"><span class="profile-link__dot"></span>LinkedIn</a>' +
            '<a class="profile-link" href="' + L.github + '" target="_blank" rel="noopener"><span class="profile-link__dot"></span>GitHub</a>' +
          "</div>" +
        "</div>" +
        '<div class="site-footer__col">' +
          "<h5>Páginas</h5>" + colLinks(navCols.slice(0, half)) +
        "</div>" +
        '<div class="site-footer__col">' +
          "<h5>&nbsp;</h5>" + colLinks(navCols.slice(half)) +
        "</div>" +
      "</div>" +
      '<div class="shell site-footer__meta">' +
        "<span>" + PERFIL.nome + " " + PERFIL.sobrenome + " · " + PERFIL.curso + " · " + PERFIL.escola + "</span>" +
        "<span>Atualizado em " + atualizado + "</span>" +
      "</div>";
  }

  /* --- Reveal de scroll / entrada --------------------------------------- */
  function setupReveals() {
    var targets = document.querySelectorAll("[data-reveal]");
    if (!targets.length) return;

    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) {
      targets.forEach(function (el) { el.classList.add("is-in"); });
      return;
    }

    // Stagger automático entre irmãos que compartilham [data-reveal-group].
    document.querySelectorAll("[data-reveal-group]").forEach(function (group) {
      var kids = group.querySelectorAll(":scope > [data-reveal]");
      kids.forEach(function (el, i) {
        if (!el.style.getPropertyValue("--reveal-delay")) {
          el.style.setProperty("--reveal-delay", (i * 90) + "ms");
        }
      });
    });

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.12 });

    targets.forEach(function (el) { io.observe(el); });
  }

  /* --- Init -------------------------------------------------------------- */
  function init() {
    buildHeader();
    buildFooter();
    setupReveals();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
