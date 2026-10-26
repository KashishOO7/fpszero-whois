(function () {
  "use strict";

  function $(id) { return document.getElementById(id); }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function slug(s) { return s.toLowerCase().replace(/[’']/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, ""); }
  function phone() { return window.innerWidth <= 720; }
  function openUrl(u) { window.open(u, "_blank", "noopener,noreferrer"); }
  var root = document.documentElement;

  var S = {}, db = null;
  function idbOpen() {
    return new Promise(function (res) {
      try {
        var r = indexedDB.open("fpszero", 1);
        r.onupgradeneeded = function () { r.result.createObjectStore("kv"); };
        r.onsuccess = function () { db = r.result; res(); };
        r.onerror = function () { res(); };
        r.onblocked = function () { res(); };
      } catch (e) { res(); }
    });
  }
  function idbLoad() {
    return new Promise(function (res) {
      if (!db) return res();
      try {
        var rq = db.transaction("kv").objectStore("kv").openCursor();
        rq.onsuccess = function () { var c = rq.result; if (c) { S[c.key] = c.value; c.continue(); } else res(); };
        rq.onerror = function () { res(); };
      } catch (e) { res(); }
    });
  }
  function put(k, v) { S[k] = v; if (!db) return; try { db.transaction("kv", "readwrite").objectStore("kv").put(v, k); } catch (e) {} }
  function wipe() { S = {}; if (db) { try { db.transaction("kv", "readwrite").objectStore("kv").clear(); } catch (e) {} } }

  function squircle() {
    var n = 5, r = 50, pts = 96, d = "", i, t, c, s, x, y;
    for (i = 0; i < pts; i++) {
      t = i / pts * 2 * Math.PI; c = Math.cos(t); s = Math.sin(t);
      x = 50 + r * (c < 0 ? -1 : 1) * Math.pow(Math.abs(c), 2 / n);
      y = 50 + r * (s < 0 ? -1 : 1) * Math.pow(Math.abs(s), 2 / n);
      d += (i ? "L" : "M") + x.toFixed(2) + " " + y.toFixed(2);
    }
    return d + "Z";
  }
  function gear(cx, cy, ro, ri, n) {
    var d = "", st = 2 * Math.PI / n, i, a;
    var p = function (r, t) { return (cx + r * Math.cos(t)).toFixed(2) + " " + (cy + r * Math.sin(t)).toFixed(2); };
    for (i = 0; i < n; i++) {
      a = i * st - Math.PI / 2;
      d += (i ? "L" : "M") + p(ri, a - st * 0.26) + "L" + p(ro, a - st * 0.14) + "L" + p(ro, a + st * 0.14) + "L" + p(ri, a + st * 0.26);
    }
    return d + "Z";
  }
  var SQ = squircle();
  function tile(id, c1, c2) {
    return "<defs>" +
      '<linearGradient id="' + id + 't" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="' + c1 + '"/><stop offset="1" stop-color="' + c2 + '"/></linearGradient>' +
      '<linearGradient id="' + id + 'h" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".34"/><stop offset=".55" stop-color="#fff" stop-opacity="0"/></linearGradient>' +
      '<linearGradient id="' + id + 'b" x1="0" y1="0" x2="0" y2="1"><stop offset=".6" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".22"/></linearGradient>' +
      "</defs>" +
      '<path d="' + SQ + '" fill="url(#' + id + 't)"/><path d="' + SQ + '" fill="url(#' + id + 'b)"/>';
  }
  function gloss(id) {
    return '<path d="' + SQ + '" fill="url(#' + id + 'h)"/><path d="' + SQ + '" fill="none" stroke="#fff" stroke-opacity=".22" stroke-width="1" transform="translate(50 50) scale(.99) translate(-50 -50)"/>';
  }
  var NIB = "M0 0C-4 -7 -11 -15 -12 -26L-7 -37H7L12 -26C11 -15 4 -7 0 0Z";
  var ICONS = {
    notes: function () { var id = "n"; return '<svg viewBox="0 0 100 100" aria-hidden="true">' + tile(id, "#6d73ea", "#2b2f86") +
      '<defs><linearGradient id="np" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#dfe2f5"/></linearGradient><linearGradient id="nn" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffe49a"/><stop offset=".5" stop-color="#ffb62e"/><stop offset="1" stop-color="#e5800d"/></linearGradient></defs>' +
      '<path d="M30 20H60L74 34V82H30Z" fill="#000" opacity=".22" transform="translate(1.5 3)"/><path d="M30 20H60L74 34V80H30Z" fill="url(#np)"/><path d="M60 20V34H74Z" fill="#c9cdea"/>' +
      '<path d="M38 46H66M38 55H66M38 64H54" stroke="#aeb4d6" stroke-width="3.4" stroke-linecap="round"/>' +
      '<g transform="translate(66 76) rotate(38) scale(.95)"><path d="' + NIB + '" fill="#000" opacity=".25" transform="translate(2 3)"/><path d="' + NIB + '" fill="url(#nn)"/><path d="M0 -3V-22" stroke="#9a5a08" stroke-width="1.8" stroke-linecap="round"/><circle cx="0" cy="-25" r="3.1" fill="#9a5a08"/><path d="M-6 -37V-44H6V-37Z" fill="#2b2f86"/></g>' +
      gloss(id) + "</svg>"; },
    workshop: function () { var id = "w"; return '<svg viewBox="0 0 100 100" aria-hidden="true">' + tile(id, "#3fdcc6", "#0c6a7c") +
      '<defs><linearGradient id="wl" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d9fbf4"/><stop offset="1" stop-color="#8fd9cf"/></linearGradient><linearGradient id="wr" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#c0eee7"/></linearGradient></defs>' +
      '<path d="M50 26 78 41V74L50 88 22 74V41Z" fill="#000" opacity=".25" transform="translate(0 3)"/><path d="M22 41 50 56V88L22 74Z" fill="url(#wl)"/><path d="M78 41 50 56V88L78 74Z" fill="url(#wr)"/><path d="M50 24 78 41 50 56 22 41Z" fill="#fff"/>' +
      '<path d="M50 56V88M22 41 50 56 78 41" stroke="#0c6a7c" stroke-opacity=".28" stroke-width="1.6" fill="none"/><path d="M36 33.5 50 41.5 64 33.5" stroke="#3fdcc6" stroke-opacity=".55" stroke-width="2.2" fill="none" stroke-linecap="round"/>' +
      gloss(id) + "</svg>"; },
    photos: function () { return '<svg viewBox="0 0 100 100" aria-hidden="true"><defs><linearGradient id="pt" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4aa8ff"/><stop offset=".55" stop-color="#9fd0ff"/><stop offset="1" stop-color="#ffd6a6"/></linearGradient><radialGradient id="ps" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#fffbe0"/><stop offset=".35" stop-color="#fff0a8" stop-opacity=".8"/><stop offset="1" stop-color="#fff0a8" stop-opacity="0"/></radialGradient><linearGradient id="ph1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ff9a76"/><stop offset="1" stop-color="#e5546e"/></linearGradient><clipPath id="pc"><path d="' + SQ + '"/></clipPath><linearGradient id="ph" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".34"/><stop offset=".55" stop-color="#fff" stop-opacity="0"/></linearGradient><linearGradient id="ph2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6a56c9"/><stop offset="1" stop-color="#2f2a78"/></linearGradient></defs>' +
      '<g clip-path="url(#pc)"><path d="' + SQ + '" fill="url(#pt)"/><circle cx="68" cy="40" r="26" fill="url(#ps)"/><circle cx="68" cy="40" r="10" fill="#fffdf0"/><ellipse cx="28" cy="26" rx="14" ry="4.6" fill="#fff" opacity=".75"/><ellipse cx="36" cy="30" rx="9" ry="3.4" fill="#fff" opacity=".6"/>' +
      '<path d="M-4 74 22 48C28 42 34 44 38 50L58 76 -4 100Z" fill="url(#ph1)"/><path d="M-4 84C14 66 30 66 46 76 62 66 80 60 104 78V104H-4Z" fill="url(#ph2)"/><path d="M-4 96C20 86 40 90 56 94 74 88 90 88 104 94V104H-4Z" fill="#1d1a55"/></g>' +
      gloss("p") + "</svg>"; },
    mail: function () { var id = "m"; return '<svg viewBox="0 0 100 100" aria-hidden="true">' + tile(id, "#55c2ff", "#1b5bf0") +
      '<defs><linearGradient id="mbb" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#d7e6ff"/></linearGradient></defs>' +
      '<path d="M34 28H68A17 17 0 0 1 85 45V55A17 17 0 0 1 68 72H62L52 82V72H34A17 17 0 0 1 17 55V45A17 17 0 0 1 34 28Z" fill="#000" opacity=".2" transform="translate(1 3)"/>' +
      '<path d="M32 22H66A17 17 0 0 1 83 39V49A17 17 0 0 1 66 66H48L34 79V66H32A17 17 0 0 1 15 49V39A17 17 0 0 1 32 22Z" fill="url(#mbb)"/>' +
      '<circle cx="36" cy="44" r="4.4" fill="#2a6cf2"/><circle cx="49" cy="44" r="4.4" fill="#2a6cf2"/><circle cx="62" cy="44" r="4.4" fill="#2a6cf2"/>' + gloss(id) + "</svg>"; },
    rl: function () { var id = "r"; return '<svg viewBox="0 0 100 100" aria-hidden="true">' + tile(id, "#ffa36b", "#e03a2f") +
      '<defs><linearGradient id="rp1" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#f1e6e2"/></linearGradient><linearGradient id="rp2" x1="1" y1="0" x2="0" y2="0"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#f1e6e2"/></linearGradient><linearGradient id="rr" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffe066"/><stop offset="1" stop-color="#f5a800"/></linearGradient></defs>' +
      '<path d="M14 30Q32 24 50 33V82Q32 74 14 80Z" fill="#000" opacity=".22" transform="translate(0 3)"/><path d="M86 30Q68 24 50 33V82Q68 74 86 80Z" fill="#000" opacity=".22" transform="translate(0 3)"/>' +
      '<path d="M14 28Q32 22 50 31V80Q32 72 14 78Z" fill="url(#rp1)"/><path d="M86 28Q68 22 50 31V80Q68 72 86 78Z" fill="url(#rp2)"/>' +
      '<path d="M22 40Q32 37 42 41M22 50Q32 47 42 51M22 60Q32 57 42 61M58 41Q68 37 78 40M58 51Q68 47 78 50" stroke="#d6c9c4" stroke-width="2.6" fill="none" stroke-linecap="round"/>' +
      '<path d="M62 14H76V52L69 46 62 52Z" fill="#000" opacity=".25" transform="translate(1 2)"/><path d="M62 14H76V50L69 44 62 50Z" fill="url(#rr)"/>' + gloss(id) + "</svg>"; },
    term: function () { var id = "t"; return '<svg viewBox="0 0 100 100" aria-hidden="true">' + tile(id, "#464f66", "#0a0c12") +
      '<defs><linearGradient id="tc" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffc187"/><stop offset="1" stop-color="#ff7a26"/></linearGradient></defs>' +
      '<rect x="13" y="22" width="74" height="58" rx="10" fill="#000" opacity=".3" transform="translate(0 3)"/><rect x="13" y="20" width="74" height="58" rx="10" fill="#0e1118"/><rect x="13.5" y="20.5" width="73" height="57" rx="9.5" fill="none" stroke="#fff" stroke-opacity=".2"/>' +
      '<path d="M13 30H87" stroke="#fff" stroke-opacity=".1"/><circle cx="22" cy="25" r="2.4" fill="#ff5f57"/><circle cx="30" cy="25" r="2.4" fill="#febc2e"/><circle cx="38" cy="25" r="2.4" fill="#28c840"/>' +
      '<path d="m25 44 15 11-15 11" stroke="url(#tc)" stroke-width="6.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M48 68H66" stroke="#fff" stroke-width="6.5" stroke-linecap="round"/>' + gloss(id) + "</svg>"; },
    about: function () { var id = "a"; return '<svg viewBox="0 0 100 100" aria-hidden="true">' + tile(id, "#343b58", "#080a13") +
      '<defs><linearGradient id="ar" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffd09a"/><stop offset=".55" stop-color="#ff9640"/><stop offset="1" stop-color="#f0600f"/></linearGradient><radialGradient id="ag" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#ff8a3d" stop-opacity=".35"/><stop offset="1" stop-color="#ff8a3d" stop-opacity="0"/></radialGradient></defs>' +
      '<circle cx="50" cy="50" r="40" fill="url(#ag)"/><circle cx="50" cy="52" r="21" fill="none" stroke="#000" stroke-opacity=".35" stroke-width="8"/><path d="M26 76 74 28" stroke="#000" stroke-opacity=".35" stroke-width="7" stroke-linecap="round"/>' +
      '<circle cx="50" cy="50" r="21" fill="none" stroke="url(#ar)" stroke-width="8"/><path d="M26 74 74 26" stroke="url(#ar)" stroke-width="7" stroke-linecap="round"/>' + gloss(id) + "</svg>"; },
    settings: function () { var id = "s"; return '<svg viewBox="0 0 100 100" aria-hidden="true">' + tile(id, "#d9dde8", "#6b7488") +
      '<defs><linearGradient id="sg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#c9cfdc"/></linearGradient><linearGradient id="sc" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5c667c"/><stop offset="1" stop-color="#8b94a8"/></linearGradient></defs>' +
      '<path d="' + gear(50, 53, 36, 27, 8) + '" fill="#000" opacity=".25"/><path d="' + gear(50, 50, 36, 27, 8) + '" fill="url(#sg)" stroke="url(#sg)" stroke-width="3" stroke-linejoin="round"/><circle cx="50" cy="50" r="15" fill="url(#sc)"/><circle cx="50" cy="50" r="8" fill="#e7eaf1"/>' +
      gloss(id) + "</svg>"; }
  };
  function icon(k) { return '<span class="ic">' + ICONS[k]() + "</span>"; }

  function rng(seed) { var s = seed; return function () { s = (s * 1664525 + 1013904223) % 4294967296; return s / 4294967296; }; }
  function ridgesSVG() {
    var r = rng(7), W = 1600, H = 900;
    var out = '<svg viewBox="0 0 ' + W + " " + H + '" preserveAspectRatio="xMidYMax slice" aria-hidden="true"><defs><linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#14183f"/><stop offset=".45" stop-color="#4b2a74"/><stop offset=".75" stop-color="#d4587a"/><stop offset="1" stop-color="#ffab6b"/></linearGradient><radialGradient id="sun" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#fff2cc" stop-opacity=".95"/><stop offset=".25" stop-color="#ffc07a" stop-opacity=".55"/><stop offset="1" stop-color="#ff8a5a" stop-opacity="0"/></radialGradient></defs><rect width="' + W + '" height="' + H + '" fill="url(#sky)"/><circle cx="1010" cy="560" r="330" fill="url(#sun)"/>';
    var cols = ["#7a4a8c", "#5a3a7e", "#3b2c68", "#241d4d", "#130f33"], ys = [560, 610, 670, 730, 800], amps = [34, 46, 60, 72, 58];
    cols.forEach(function (c, l) {
      var p1 = r() * 6, p2 = r() * 6, p3 = r() * 6, d = "M0 " + H + "L0 " + ys[l], x, y;
      for (x = 0; x <= W; x += 16) {
        y = ys[l] - amps[l] * (0.55 * Math.sin(x / (210 - l * 22) + p1) + 0.3 * Math.sin(x / (95 - l * 9) + p2) + 0.15 * Math.sin(x / (41 + l * 3) + p3));
        d += "L" + x + " " + y.toFixed(1);
      }
      out += '<path d="' + d + "L" + W + " " + H + 'Z" fill="' + c + '"/>';
    });
    return out + "</svg>";
  }
  function contourSVG() {
    var r = rng(21), W = 1600, H = 900;
    var out = '<svg viewBox="0 0 ' + W + " " + H + '" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs><radialGradient id="cg" cx=".3" cy=".25" r="1"><stop offset="0" stop-color="#1b3a46"/><stop offset=".6" stop-color="#0d1c2b"/><stop offset="1" stop-color="#070b14"/></radialGradient></defs><rect width="' + W + '" height="' + H + '" fill="url(#cg)"/>';
    [[430, 330, 1], [1180, 560, 0.9], [820, 820, 0.7]].forEach(function (c) {
      var a = [0, 0, 0, 0].map(function (_, i) { return { k: i + 2, amp: 0.07 + r() * 0.09, ph: r() * 6.28 }; });
      var lv, t, th, m, x, y, d, R;
      for (lv = 1; lv <= 16; lv++) {
        d = ""; R = lv * 30 * c[2];
        for (t = 0; t <= 64; t++) {
          th = t / 64 * 6.2832; m = 1;
          a.forEach(function (q) { m += q.amp * Math.sin(q.k * th + q.ph + lv * 0.06); });
          x = c[0] + R * m * Math.cos(th) * 1.25; y = c[1] + R * m * Math.sin(th);
          d += (t ? "L" : "M") + x.toFixed(1) + " " + y.toFixed(1);
        }
        out += '<path d="' + d + 'Z" fill="none" stroke="#7fd6d0" stroke-opacity="' + (lv % 4 === 0 ? 0.22 : 0.1) + '" stroke-width="' + (lv % 4 === 0 ? 1.6 : 1) + '"/>';
      }
    });
    return out + "</svg>";
  }
  var WALLS = {
    horizon: { n: "Horizon", html: function () { return '<div class="wb w-horizon"></div>'; } },
    ridge: { n: "Ridgeline", html: function () { return '<div class="wb">' + ridgesSVG() + "</div>"; } },
    contour: { n: "Contour", html: function () { return '<div class="wb">' + contourSVG() + "</div>"; } },
    drift: { n: "Drift", html: function () { return '<div class="wb w-drift"><i class="d1"></i><i class="d2"></i><i class="d3"></i></div>'; } },
    graphite: { n: "Graphite", html: function () { return '<div class="wb w-graphite"></div>'; } },
    paper: { n: "Paper", html: function () { return '<div class="wb w-paper"></div>'; } }
  };
  var wallCache = {};
  function wallHTML(k) { if (!wallCache[k]) wallCache[k] = WALLS[k].html(); return wallCache[k]; }
  var ACC = { orange: "#ff8a3d", blue: "#0a84ff", green: "#30d158", pink: "#ff375f", purple: "#bf5af2", teal: "#40c8e0" };
  var drawn = null;
  function apply() {
    if (S.theme === "dark" || S.theme === "light") root.dataset.theme = S.theme;
    else root.dataset.theme = matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
    if (S.motion) root.dataset.motion = S.motion;
    root.style.setProperty("--accent", ACC[S.accent] || ACC.orange);
    root.style.setProperty("--ts", S.ts || 1);
    root.style.setProperty("--ga", S.ga || 0.74);
    root.style.setProperty("--dock", (S.dock || 50) + "px");
    var k = S.wall && WALLS[S.wall] ? S.wall : (root.dataset.theme === "light" ? "paper" : "horizon");
    var wall = $("wall");
    if (wall && drawn !== k) { drawn = k; wall.innerHTML = wallHTML(k); }
  }

  var dataEl = $("os-data");
  var DATA = null;
  try { DATA = dataEl ? JSON.parse(dataEl.textContent) : null; } catch (e) { DATA = null; }

  idbOpen().then(idbLoad).then(function () {
    apply();
    if (!DATA || !$("shell")) return;
    build();
  });

  function build() {
    var A = DATA.articles, SH = DATA.shelves, PR = DATA.projects, PROFILES = DATA.site.profiles, ABOUT = DATA.about, PHOTOS = DATA.photos || [];
    var shelfName = {}; SH.forEach(function (s) { shelfName[s.slug] = s.name; });
    var bySlug = {}; A.forEach(function (a) { bySlug[a.slug] = a; });

    function toast(t) { var el = $("toast"); el.textContent = t; el.classList.add("on"); clearTimeout(toast.t); toast.t = setTimeout(function () { el.classList.remove("on"); }, 1800); }
    function animOK() { var d = root.dataset.motion; return d === "on" || (d !== "off" && !matchMedia("(prefers-reduced-motion: reduce)").matches); }
    function setHash(h) { try { history.replaceState(null, "", h); } catch (e) {} }

    var z = 10, desk = $("desk"), appname = $("appname"), wins = {};
    var order = ["notes", "workshop"];
    if (PHOTOS.length) order.push("photos");
    order.push("mail", "rl", "term", "about", "settings");
    var APP = {
      notes: { n: "Writing", w: 980, h: 610 }, workshop: { n: "Workshop", w: 940, h: 580 }, photos: { n: "Photos", w: 780, h: 520 },
      mail: { n: "Inbox", w: 840, h: 560 }, rl: { n: "Reading list", w: 500, h: 520 }, term: { n: "Terminal", w: 720, h: 440 },
      about: { n: "About", w: 600, h: 560 }, settings: { n: "Settings", w: 620, h: 620 }
    };
    var WS = S.wins || {};
    var PREF = {};
    order.forEach(function (k) { PREF[k] = { w: (WS[k] && WS[k].w) || APP[k].w, h: (WS[k] && WS[k].h) || APP[k].h }; });

    function sizeClass(w) {
      var x = w.offsetWidth;
      w.dataset.size = x < 620 ? "s" : x < 860 ? "m" : "l";
    }
    function layout(k, reset) {
      var w = wins[k];
      if (phone()) { sizeClass(w); return; }
      if (w.classList.contains("max")) { sizeClass(w); return; }
      var dw = desk.clientWidth, dh = desk.clientHeight;
      var pw = Math.max(300, Math.min(PREF[k].w, dw - 24)), ph = Math.max(240, Math.min(PREF[k].h, dh - 96));
      var idx = order.indexOf(k), off = (idx % 5) * 22;
      var g = WS[k], x, y;
      if (!reset && g && g.x != null) { x = g.x; y = g.y; }
      else { x = (dw - pw) / 2 + off - 44; y = Math.min((dh - 84 - ph) / 2, 56) + off; }
      x = Math.max(8, Math.min(x, dw - pw - 8)); if (x < 0) x = 0;
      y = Math.max(8, Math.min(y, dh - 84 - ph)); if (y < 0) y = 0;
      w.style.left = Math.round(x) + "px"; w.style.top = Math.round(y) + "px";
      w.style.width = Math.round(pw) + "px"; w.style.height = Math.round(ph) + "px";
      sizeClass(w);
    }
    function saveWins() {
      var o = {};
      order.forEach(function (k) {
        var w = wins[k]; if (!w) return;
        if (!phone() && !w.classList.contains("max")) { PREF[k] = { w: w.offsetWidth, h: w.offsetHeight }; }
        o[k] = { open: w.classList.contains("open"), x: w.offsetLeft, y: w.offsetTop, w: PREF[k].w, h: PREF[k].h };
      });
      WS = o; put("wins", o);
    }
    var ro = typeof ResizeObserver === "function" ? new ResizeObserver(function (es) { es.forEach(function (e) { sizeClass(e.target); }); }) : null;
    function mk(k) {
      var a = APP[k], s = document.createElement("section");
      s.className = "win"; s.id = "w-" + k; s.dataset.app = a.n; s.setAttribute("aria-label", a.n);
      s.innerHTML = '<div class="title"><div class="dots"><button class="x" type="button" aria-label="Close"></button><button class="m" type="button" aria-label="Minimise"></button><button class="z" type="button" aria-label="Zoom"></button></div><div class="name">' + a.n + '</div></div><div class="body" id="b-' + k + '"></div>';
      desk.appendChild(s); wins[k] = s;
      layout(k);
      if (ro) ro.observe(s);
      s.addEventListener("pointerdown", function () { if (!s.classList.contains("front")) focusWin(s); });
      s.querySelector(".x").addEventListener("click", function () { closeApp(s); });
      s.querySelector(".m").addEventListener("click", function () { closeApp(s); });
      s.querySelector(".z").addEventListener("click", function () { s.classList.toggle("max"); if (!s.classList.contains("max")) layout(k); s.style.zIndex = ++z; sizeClass(s); });
      var t = s.querySelector(".title"), sx, sy, ox, oy, drag = false;
      t.addEventListener("pointerdown", function (e) { if (e.target.closest(".dots") || phone() || s.classList.contains("max")) return; drag = true; sx = e.clientX; sy = e.clientY; ox = s.offsetLeft; oy = s.offsetTop; t.setPointerCapture(e.pointerId); });
      t.addEventListener("pointermove", function (e) {
        if (!drag) return;
        s.style.left = Math.max(-s.offsetWidth + 120, Math.min(desk.clientWidth - 120, ox + e.clientX - sx)) + "px";
        s.style.top = Math.max(0, Math.min(desk.clientHeight - 80, oy + e.clientY - sy)) + "px";
      });
      t.addEventListener("pointerup", function () { if (drag) { drag = false; saveWins(); } });
      t.addEventListener("dblclick", function (e) { if (!e.target.closest(".dots")) s.querySelector(".z").click(); });
    }
    function focusWin(w) {
      document.querySelectorAll(".win").forEach(function (x) { x.classList.remove("front"); });
      w.classList.add("front"); w.style.zIndex = ++z; appname.textContent = w.dataset.app;
    }
    function syncDock() { document.querySelectorAll("#dock .d").forEach(function (d) { d.classList.toggle("on", wins[d.dataset.open].classList.contains("open")); }); }
    function openApp(k, quiet) {
      var w = wins[k]; if (!w) return;
      w.classList.remove("closing"); w.classList.add("open"); focusWin(w); sizeClass(w); syncDock(); hidePop();
      if (!quiet) saveWins();
      if (k === "term" && !phone()) $("cmd").focus();
    }
    function closeApp(w) {
      var fin = function () {
        w.classList.remove("open", "front", "closing");
        var o = [].slice.call(document.querySelectorAll(".win.open"));
        if (o.length) focusWin(o[o.length - 1]); else appname.textContent = "";
        syncDock(); saveWins();
      };
      if (!animOK()) { fin(); return; }
      w.classList.add("closing"); setTimeout(fin, 140);
    }
    order.forEach(mk);
    $("dock").innerHTML = order.map(function (k) { return '<button class="d" type="button" data-open="' + k + '" aria-label="' + APP[k].n + '">' + icon(k) + '<span class="tip">' + APP[k].n + "</span></button>"; }).join("");
    $("dock").addEventListener("click", function (e) {
      var d = e.target.closest(".d"); if (!d) return;
      var w = wins[d.dataset.open];
      if (w.classList.contains("open") && w.classList.contains("front")) closeApp(w); else openApp(d.dataset.open);
    });
    var rz;
    window.addEventListener("resize", function () { clearTimeout(rz); rz = setTimeout(function () { order.forEach(function (k) { layout(k); }); placeStickies(); clock(); }, 60); });

    var WISHES = ABOUT.wishes || [], STK = S.stk || {}, stickies = [];
    WISHES.forEach(function (t, i) {
      var s = document.createElement("aside");
      s.className = "sticky st" + (i % 3); s.setAttribute("role", "note"); s.textContent = t;
      desk.appendChild(s); stickies.push(s);
      var sx, sy, ox, oy, drag = false;
      s.addEventListener("pointerdown", function (e) { drag = true; sx = e.clientX; sy = e.clientY; ox = s.offsetLeft; oy = s.offsetTop; s.setPointerCapture(e.pointerId); s.style.zIndex = 3; });
      s.addEventListener("pointermove", function (e) {
        if (!drag) return;
        s.style.left = Math.max(0, Math.min(desk.clientWidth - s.offsetWidth, ox + e.clientX - sx)) + "px";
        s.style.top = Math.max(0, Math.min(desk.clientHeight - s.offsetHeight - 84, oy + e.clientY - sy)) + "px";
      });
      s.addEventListener("pointerup", function () { if (!drag) return; drag = false; s.style.zIndex = ""; STK[i] = { x: s.offsetLeft, y: s.offsetTop }; put("stk", STK); });
    });
    function placeStickies() {
      var dw = desk.clientWidth, dh = desk.clientHeight;
      stickies.forEach(function (s, i) {
        var w = s.offsetWidth, h = s.offsetHeight, g = STK[i], x, y;
        if (g) { x = g.x; y = g.y; } else { x = dw - w - 44 + (i % 2) * 14; y = 36 + i * (h + 26); }
        s.style.left = Math.max(0, Math.min(x, dw - w)) + "px";
        s.style.top = Math.max(0, Math.min(y, dh - h - 84)) + "px";
      });
    }
    placeStickies();

    $("b-notes").innerHTML =
      '<div class="split" id="nsplit" data-view="folders"><nav class="s-side" id="nside" aria-label="Library"></nav>' +
      '<div class="s-list"><button class="back" type="button" data-back="folders">‹ Library</button>' +
      '<div class="head"><label class="search"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg><input id="nq" type="search" placeholder="Search" aria-label="Search writing" autocomplete="off"></label>' +
      '<button class="ib" id="nsort" type="button" aria-label="Sort" aria-haspopup="menu"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4v16M7 20l-3-3M7 20l3-3M17 20V4M17 4l-3 3M17 4l3 3"/></svg></button></div>' +
      '<button class="folder-pill" id="npill" type="button" aria-haspopup="menu"><b id="npill-t"></b><span>Change</span></button>' +
      '<div class="sortline" id="nsortline"></div><div class="items" id="nitems"></div></div>' +
      '<article class="s-read" id="nread" aria-live="polite"></article></div>';
    var SORTS = [["new", "Newest first"], ["old", "Oldest first"], ["az", "Title, A to Z"], ["za", "Title, Z to A"], ["long", "Longest first"], ["short", "Shortest first"], ["unread", "Unread first"]];
    var READ = S.read || {};
    var st = { folder: "all", tag: "", q: "", sort: S.sort || "new", slug: "" };
    var tagCount = {};
    A.forEach(function (a) { a.tags.forEach(function (t) { tagCount[t] = (tagCount[t] || 0) + 1; }); });
    var TAGS = Object.keys(tagCount).sort(function (x, y) { return tagCount[y] - tagCount[x] || (x < y ? -1 : 1); });
    function folderLabel() { return st.tag ? "Subject: " + st.tag : st.folder === "all" ? "All writing" : shelfName[st.folder]; }
    function inFolder(a) { return st.tag ? a.tags.indexOf(st.tag) > -1 : st.folder === "all" || a.shelves.indexOf(st.folder) > -1; }
    function visible() {
      var q = st.q.toLowerCase(), rows = A.filter(function (a) { return inFolder(a) && (!q || (a.title + " " + a.tags.join(" ") + " " + a.description).toLowerCase().indexOf(q) > -1); });
      var cmp = {
        new: function (a, b) { return a.date < b.date ? 1 : a.date > b.date ? -1 : 0; },
        old: function (a, b) { return a.date < b.date ? -1 : a.date > b.date ? 1 : 0; },
        az: function (a, b) { return a.title.localeCompare(b.title); },
        za: function (a, b) { return b.title.localeCompare(a.title); },
        long: function (a, b) { return b.words - a.words; },
        short: function (a, b) { return a.words - b.words; },
        unread: function (a, b) { return (READ[a.slug] ? 1 : 0) - (READ[b.slug] ? 1 : 0) || (a.date < b.date ? 1 : -1); }
      }[st.sort];
      return rows.slice().sort(cmp);
    }
    function sideHTML() {
      var h = '<div class="grp">Library</div><button class="f' + (!st.tag && st.folder === "all" ? " on" : "") + '" type="button" data-f="all">All writing<span>' + A.length + "</span></button>";
      SH.forEach(function (s) { var n = A.filter(function (a) { return a.shelves.indexOf(s.slug) > -1; }).length; h += '<button class="f' + (!st.tag && st.folder === s.slug ? " on" : "") + '" type="button" data-f="' + s.slug + '">' + esc(s.name) + "<span>" + n + "</span></button>"; });
      var open = !!S.subj;
      h += '<button class="grp tog" type="button" data-subj="1" aria-expanded="' + open + '"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 6 6 6-6 6"/></svg>Subjects<span>' + TAGS.length + "</span></button>";
      if (open) TAGS.forEach(function (t) { h += '<button class="f' + (st.tag === t ? " on" : "") + '" type="button" data-tag="' + esc(t) + '">' + esc(t) + "<span>" + tagCount[t] + "</span></button>"; });
      else if (st.tag) h += '<button class="f on" type="button" data-tag="' + esc(st.tag) + '">' + esc(st.tag) + "<span>" + tagCount[st.tag] + "</span></button>";
      return h;
    }
    function nList() {
      var rows = visible(), sl = SORTS.filter(function (s) { return s[0] === st.sort; })[0][1];
      $("npill-t").textContent = folderLabel();
      $("nsortline").textContent = rows.length + (rows.length === 1 ? " piece" : " pieces") + " · " + sl;
      $("nitems").innerHTML = rows.map(function (a) {
        return '<button class="it' + (a.slug === st.slug ? " on" : "") + (READ[a.slug] ? " read" : "") + '" type="button" data-s="' + a.slug + '"><b>' + esc(a.title) + "</b><small>" + esc(a.label) + "</small></button>";
      }).join("") || '<p class="none">Nothing matches.</p>';
    }
    var SVG_BM = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 3h12v18l-6-4.5L6 21z"/></svg>';
    var SVG_LN = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 14a4 4 0 0 0 5.6 0l3-3a4 4 0 0 0-5.6-5.6l-1 1M14 10a4 4 0 0 0-5.6 0l-3 3a4 4 0 0 0 5.6 5.6l1-1"/></svg>';
    var SVG_EX = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/></svg>';
    var cache = {}, token = 0;
    function nRead() {
      var el = $("nread"), a = bySlug[st.slug];
      if (!a) {
        el.innerHTML = '<button class="back" type="button" data-back="list">‹ Back</button><p class="kicker">' + A.length + ' pieces</p><h2 class="ttl">Writing</h2><p>Choose a piece from the list. Use the arrows beside the search box to change the order.</p>';
        return;
      }
      var saved = (S.rl || []).some(function (x) { return x.slug === a.slug; });
      var head = '<button class="back" type="button" data-back="list">‹ ' + esc(folderLabel()) + '</button>' +
        '<div class="tools"><button class="tb" type="button" data-act="save">' + SVG_BM + (saved ? "Saved" : "Save for later") + '</button><button class="tb io" type="button" data-act="link" aria-label="' + (a.sourceUrl ? "Copy the link to the original" : "Copy link") + '">' + SVG_LN + '<span class="lb">Copy link</span></button>' +
        (a.sourceUrl ? '<a class="tb io" href="' + esc(a.sourceUrl) + '" target="_blank" rel="noopener noreferrer external" aria-label="Open the original on ' + esc(a.source) + '">' + SVG_EX + '<span class="lb">Open original</span></a>' : '<a class="tb io" href="' + a.url + '" aria-label="Open page">' + SVG_EX + '<span class="lb">Open page</span></a>') + "</div>" +
        '<div class="kicker">' + esc(a.label + " · " + a.shelves.map(function (s) { return shelfName[s]; }).join(", ") + " · " + Math.max(1, Math.round(a.words / 220)) + " min read") + "</div><h2 class=\"ttl\">" + esc(a.title) + "</h2>";
      var foot = (a.source ? '<p class="origin">First published in <a href="' + esc(a.sourceUrl) + '" target="_blank" rel="noopener noreferrer external">' + esc(a.source) + "</a>. This is the author’s own copy.</p>" : "") +
        '<div class="chips">' + a.tags.map(function (t) { return '<button class="chip" type="button" data-tagc="' + esc(t) + '">' + esc(t) + "</button>"; }).join("") + '</div><p class="mark">' + esc(a.mark) + "</p>";
      el.innerHTML = head + '<div id="nbody"><p class="none">Loading…</p></div>' + foot;
      var my = ++token;
      getBody(a).then(function (frag) {
        if (my !== token) return;
        var b = $("nbody"); if (!b) return; b.innerHTML = ""; b.appendChild(frag.cloneNode(true));
      }, function () {
        if (my !== token) return;
        var b = $("nbody"); if (b) b.innerHTML = '<p>This piece could not be loaded. <a href="' + a.url + '">Open its page</a>.</p>';
      });
    }
    function getBody(a) {
      if (cache[a.slug]) return Promise.resolve(cache[a.slug]);
      return fetch(a.url, { credentials: "omit", referrerPolicy: "no-referrer" }).then(function (r) { if (!r.ok) throw new Error("status " + r.status); return r.text(); }).then(function (txt) {
        var doc = new DOMParser().parseFromString(txt, "text/html"), src = doc.querySelector(".prose"), frag = document.createDocumentFragment();
        if (!src) throw new Error("no body");
        [].slice.call(src.childNodes).forEach(function (n) { frag.appendChild(document.importNode(n, true)); });
        [].slice.call(frag.querySelectorAll("a[href]")).forEach(function (l) { if (/^https?:/.test(l.getAttribute("href"))) { l.setAttribute("target", "_blank"); l.setAttribute("rel", "noopener noreferrer external"); } });
        cache[a.slug] = frag; return frag;
      });
    }
    function bodyText(a) {
      return getBody(a).then(function (frag) {
        return [].slice.call(frag.childNodes).map(function (n) { return (n.textContent || "").trim(); }).filter(Boolean).join("\n\n");
      });
    }
    function nAll() { $("nside").innerHTML = sideHTML(); nList(); nRead(); }
    function markRead() { if (st.slug && !READ[st.slug]) { READ[st.slug] = 1; put("read", READ); } }
    function openNote(slugName) {
      if (!bySlug[slugName]) return;
      st.slug = slugName; st.q = ""; $("nq").value = "";
      var a = bySlug[slugName]; if (!inFolder(a)) { st.folder = "all"; st.tag = ""; }
      markRead(); nAll(); $("nsplit").dataset.view = "read"; openApp("notes"); setHash("#writing/" + slugName); put("last", slugName);
      var it = $("nitems").querySelector(".it.on"); if (it && it.scrollIntoView) it.scrollIntoView({ block: "nearest" });
    }
    function setFolder(f, tag) { st.folder = f || "all"; st.tag = tag || ""; st.q = ""; $("nq").value = ""; nAll(); }
    $("nside").addEventListener("click", function (e) {
      if (e.target.closest("[data-subj]")) { put("subj", !S.subj); $("nside").innerHTML = sideHTML(); return; }
      var b = e.target.closest("[data-f],[data-tag]"); if (!b) return;
      if (b.dataset.tag) setFolder("all", b.dataset.tag); else setFolder(b.dataset.f, "");
      $("nsplit").dataset.view = "list";
    });
    $("nitems").addEventListener("click", function (e) {
      var b = e.target.closest("[data-s]"); if (!b) return;
      st.slug = b.dataset.s; markRead(); nList(); nRead(); $("nsplit").dataset.view = "read"; setHash("#writing/" + st.slug); put("last", st.slug);
    });
    $("nq").addEventListener("input", function (e) { st.q = e.target.value; nList(); });
    $("nsplit").addEventListener("click", function (e) {
      var b = e.target.closest("[data-back]"); if (b) { $("nsplit").dataset.view = b.dataset.back; return; }
      var tg = e.target.closest("[data-tagc]"); if (tg) { setFolder("all", tg.dataset.tagc); $("nsplit").dataset.view = "list"; return; }
      var t = e.target.closest("[data-act]"); if (!t) return;
      var a = bySlug[st.slug]; if (!a) return;
      if (t.dataset.act === "save") { rlAdd(a.title, a.slug); nRead(); toast("Saved to your reading list"); }
      if (t.dataset.act === "link") {
        var u = a.sourceUrl || location.origin + a.url;
        try { navigator.clipboard.writeText(u).then(function () { toast("Link copied"); }, function () { toast(u); }); } catch (x) { toast(u); }
      }
    });
    $("nsort").addEventListener("click", function (e) {
      e.stopPropagation();
      showPop("sort", this, "left", SORTS.map(function (s) { return '<button class="pi' + (s[0] === st.sort ? " on" : "") + '" type="button" data-sort="' + s[0] + '"><span>' + s[1] + "</span><span>" + (s[0] === st.sort ? "✓" : "") + "</span></button>"; }).join(""));
    });
    $("npill").addEventListener("click", function (e) {
      e.stopPropagation();
      var h = '<div class="pop-h">Library</div><button class="pi' + (!st.tag && st.folder === "all" ? " on" : "") + '" type="button" data-f="all"><span>All writing</span><span>' + A.length + "</span></button>";
      SH.forEach(function (s) { h += '<button class="pi' + (!st.tag && st.folder === s.slug ? " on" : "") + '" type="button" data-f="' + s.slug + '"><span>' + esc(s.name) + "</span><span>" + A.filter(function (a) { return a.shelves.indexOf(s.slug) > -1; }).length + "</span></button>"; });
      h += '<div class="pop-sep"></div><div class="pop-h">Subjects</div>';
      TAGS.forEach(function (t) { h += '<button class="pi' + (st.tag === t ? " on" : "") + '" type="button" data-tag="' + esc(t) + '"><span>' + esc(t) + "</span><span>" + tagCount[t] + "</span></button>"; });
      showPop("folders", this, "left", h);
    });
    st.slug = "";
    nAll();

    $("b-workshop").innerHTML = '<div class="split" id="wsplit" data-view="list"><div class="s-list tint"><div class="items top" id="witems"></div></div><article class="s-read" id="wread"></article></div>';
    var pi = 0;
    function wList() { $("witems").innerHTML = PR.map(function (p, i) { return '<button class="it' + (i === pi ? " on" : "") + '" type="button" data-i="' + i + '"><b>' + esc(p.name) + "</b><small>" + esc(p.kicker) + "</small></button>"; }).join(""); }
    function wRead() {
      var p = PR[pi];
      var h = '<button class="back" type="button" data-back="list">‹ Workshop</button><div class="kicker">' + esc(p.kicker) + '</div><h2 class="ttl">' + esc(p.name) + '</h2><div class="chips">' + p.stamps.map(function (s) { return '<span class="chip">' + esc(s) + "</span>"; }).join("") + '</div><p class="lede">' + esc(p.lede) + "</p>";
      p.sections.forEach(function (s) {
        h += "<h3>" + esc(s.heading) + "</h3>" + s.body.map(function (t) { return "<p>" + esc(t) + "</p>"; }).join("");
        if (s.list && s.list.length) h += '<div class="chips">' + s.list.map(function (c) { return '<span class="chip">' + esc(c) + "</span>"; }).join("") + "</div>";
      });
      if (p.facts.length) h += "<h3>Facts</h3><ul>" + p.facts.map(function (f) { return "<li>" + esc(f) + "</li>"; }).join("") + "</ul>";
      var b = p.links.map(function (l, i) { return '<a class="btn' + (i ? " alt" : "") + '" href="' + esc(l.url) + '" target="_blank" rel="noopener noreferrer">' + esc(l.label) + "</a>"; }).join("");
      $("wread").innerHTML = h + (b ? '<div class="btns">' + b + "</div>" : "");
    }
    function openProject(i) { pi = i; wList(); wRead(); $("wsplit").dataset.view = "read"; openApp("workshop"); setHash("#workshop/" + PR[i].slug); }
    $("witems").addEventListener("click", function (e) { var b = e.target.closest("[data-i]"); if (!b) return; pi = +b.dataset.i; wList(); wRead(); $("wsplit").dataset.view = "read"; setHash("#workshop/" + PR[pi].slug); });
    $("wsplit").addEventListener("click", function (e) { var b = e.target.closest("[data-back]"); if (b) $("wsplit").dataset.view = b.dataset.back; });
    wList(); wRead();

    if (PHOTOS.length) {
      $("b-photos").innerHTML = '<div class="pad"><h2>Photos</h2><p class="sub">' + PHOTOS.length + ' photographs</p><div class="grid">' + PHOTOS.map(function (p) { return '<figure class="shot"><img src="/' + esc(p.file) + '" alt="' + esc(p.alt) + '" loading="lazy"><figcaption>' + esc(p.title) + "</figcaption></figure>"; }).join("") + "</div></div>";
    }

    var years = A.map(function (a) { return a.date.slice(0, 4); }).sort();
    function inline(s) { return esc(s).replace(/\[([^\]]+)\]\((https:\/\/[^)\s]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer external">$1</a>'); }
    var linkLine = ['<a href="mailto:' + esc(DATA.site.email) + '">Email</a>'].concat(PROFILES.filter(function (p) { return p.url !== "https://fpszero.com"; }).map(function (p) { return '<a href="' + esc(p.url) + '" target="_blank" rel="noopener noreferrer external">' + esc(p.label) + "</a>"; })).join(" · ");
    $("b-about").innerHTML = '<div class="pad about"><h2>' + esc(ABOUT.greeting) + "</h2>" + ABOUT.statement.map(function (t) { return "<p>" + inline(t) + "</p>"; }).join("") + '<p class="links">' + linkLine + "</p></div>";

    var UN = S.unread || { kashish: 1, fps: 1, principia: 1, absurd: 1 };
    var LI = PROFILES.filter(function (p) { return /linkedin\.com/.test(p.url); })[0];
    function pick(slugName) { return bySlug[slugName] || null; }
    function card(art) { return art ? [{ f: "card", src: art.source || "Medium", title: art.title, url: art.sourceUrl || art.url, date: art.label }] : []; }
    var attack = pick("your-attack-surface-is-not-what-you"), inducing = pick("the-art-of-inducing-an-existential");
    var NOTE = "A conversation I wrote for you, not a live chat. To reach me, use LinkedIn or email.";
    function me(t) { return { f: "me", t: t }; }
    function him(t) { return { f: "them", t: t }; }
    var THREADS = [
      { id: "kashish", name: "Kashish", av: "K", cls: "av-k", preview: "Hi, I’m Kashish. Nice meeting you!", note: NOTE, msgs: [
        me("Oh, hey. Who’s this?"),
        him("Hi, I’m Kashish. Nice meeting you!"),
        me("Hi! So what do you do?"),
        him("I take things apart until I find the assumption nobody ever questioned."),
        me("Okay, but what does that look like on a normal day?"),
        him("At work, it’s security research. Outside of it, I build things from scratch, just to understand why they work, not only that they do."),
        me("From scratch? Isn’t that the long way round?"),
        him("That’s the whole idea, actually. It’s why I started FPS Zero, short for First Principle Synthesis. Cybersecurity, quantum systems, cognitive science: I’d rather work each one out from the ground up than borrow conclusions from the field next door too early."),
        me("And the consciousness side? That feels like a different world from security."),
        him("It isn’t, really. Consciousness, information theory and adversarial systems are all asking the same questions from different angles. I take that part seriously. It’s not decoration."),
        me("I’m into this. How do I reach you?"),
        him("Glad to hear it. If we share an interest, or you’d like to connect about an opportunity, reach me on LinkedIn or by email. Both are right here."),
        him(["LinkedIn: " + LI.url.replace(/^https:\/\/(www\.)?linkedin\.com\/in\//, "").replace(/\/$/, ""), LI.url]),
        him(["Email: " + DATA.site.email, "mailto:" + DATA.site.email])
      ] },
      { id: "fps", name: DATA.site.brand, av: "∅", cls: "av-f", preview: "Patterns. I’ve been studying them for more than a decade now.", note: NOTE, msgs: [
        me("So what is FPSZERO about?"),
        him("Patterns. I’ve been studying them for more than a decade now."),
        me("Patterns in what, though?"),
        him("In us, mostly. There’s a line I keep coming back to: what I cannot create, I do not understand. I think that’s how Homo sapiens works underneath it all. The last of the genus Homo. You and me."),
        him("We’ve always been curious about our existence and everything around us. And in trying to understand how it all works, we end up copying it."),
        me("Copying? Come on, we’ve invented plenty."),
        him("Have we, though? I don’t think we ever really invented anything. We replicated mother nature, and our own biology, artificially."),
        him("Think about it. From the light bulb to harnessing bioelectricity. From the abacus to neuromorphic computing. From the wheel to the starship."),
        me("Huh. Then why does everything come with a price tag?"),
        him("Because that’s the cycle. We observe nature, decode it, replicate it so the masses can have it, then monetize it to keep the colonization going."),
        him("We’re nature’s mirror, held up by curiosity and refined by necessity. We don’t invent, we remember what the universe already knows. Then we charge a subscription fee for it."),
        me("Ha. So if not inventors, what should we call ourselves?"),
        him("Eventually, it would be better if we called ourselves artists, pioneers, wanderers. Not inventors sitting on untouched cosmic inventories."),
        me("Artists of what, if it was all already there?"),
        him("Here’s the thing: we are the universe itself, unwrapping reality one frame at a time."),
        him("We’re just stuck being 3D creatures who want to step into the parallel realms.")
      ] },
      { id: "principia", name: "A Principia", av: "Π", cls: "av-p", preview: "Your attack surface is not what you think it is.", note: NOTE, msgs: [
        me("“Your attack surface is not what you think it is.” Go on then, what is it?"),
        him("Bigger than your devices. It’s you. Social engineering goes after your emotions before it ever touches your systems."),
        me("My emotions? That sounds a bit dramatic."),
        him("Urgency, authority, fear, trust. Every one of those is an attack vector."),
        him("And it isn’t hard to do. Scrape someone’s personal info, build a profile, map where they’re most vulnerable, then strike. That’s phishing, spear phishing, doxxing."),
        me("Eh. I’ve got nothing to hide anyway."),
        him("That’s what most people say. But privacy isn’t about hiding everything or sharing nothing. It’s about closing the gap between feeling safe and actually being careful."),
        him("And remember, nothing is free. If you can’t see the cost, you’re the product."),
        me("Okay, that’s unsettling. Companies have whole security teams. What do I have?"),
        him("Honestly? Nothing like that. As an individual, you’re exposed and on your own."),
        him("That itch is what started this piece. What if one person could check their own security the way an organization does?"),
        me("And did you build something for that?"),
        him("I did. It’s called Spectra, and it’s a free security playbook now. It keeps changing, because the threats keep changing.")
      ].concat(attack ? [
        me("Okay, now I actually want to read it."),
        him("Here’s the full piece.")
      ].concat(card(attack)) : []) },
      { id: "absurd", name: "Beyond the Absurd", av: "B", cls: "av-b", preview: "God, the higher self, is a mathematician of the highest order.", note: NOTE, msgs: [
        me("Random question, but do you believe in God?"),
        him("In my own way, yes. God, the higher self, is a mathematician of the highest order."),
        me("A mathematician? That’s not what I expected."),
        him("Think of Mother Nature as God. To understand how it works, we replicate it artificially and call that an invention."),
        him("Rolling stones to the starship Avalon, the abacus to neuromorphic chips. We just keep getting better at copying nature."),
        me("So where do we fit in? We’re so small next to all that."),
        him("We’re not separate from it, though. Every bit of stardust, every neutron star pulsar we’re made of, it’s all one. We’re connected in an asymmetrically symmetric way. Entanglement."),
        me("Then where do new ideas come from?"),
        him("Every new idea stretches the mind in some new dimension, and the self becomes aware of it. We’re not inventing anything. We’re unraveling our true self, one frame at a time."),
        me("Be honest with me. Can I really have something just by picturing it?"),
        him("If you can see it in your mind, you can hold it in your hand. We’re everywhere in this observable universe."),
        him("Think superposition. A conscious self is another timeline, one that already holds what you see in your mind. To get there, you fine tune your inner vibrational strands."),
        him("Non-duality. Like tuning in to the right FM frequency to catch the show you want."),
        me("I try so hard to keep my life neat and in order. Is that wrong?"),
        him("Not wrong. Symmetry is just us finding order in the chaos of our lives, because we’re afraid of not being in control. Of not being the Architect."),
        him("But asymmetry is the true essence of the universe. Nothing is more symmetrical than true asymmetry.")
      ].concat(inducing ? [
        me("If it’s all one, why do I feel so separate?"),
        him("I wrote about exactly that."),
        him("Not because we forgot. Because creation requires separation. You can’t build anything without a subject and an object. A painter and a canvas. A thought and a thinker. The universe knows itself as one, but to experience itself, it splits. Vedanta calls this Maya. Not illusion as in “fake.” Illusion as in “functional.” The duality is real enough to live in. It’s just not the final word.")
      ].concat(card(inducing)) : []) }
    ];
    $("b-mail").innerHTML = '<div class="split" id="msplit" data-view="list"><div class="s-list tint"><div class="items top" id="mitems"></div></div><div class="chat" id="chat"></div></div>';
    var ti = 0;
    function mList() {
      $("mitems").innerHTML = THREADS.map(function (t, i) {
        return '<button class="th' + (i === ti ? " on" : "") + '" type="button" data-i="' + i + '"><span class="av ' + t.cls + '">' + t.av + '</span><span class="tx"><b>' + esc(t.name) + "</b><small>" + esc(t.preview) + "</small></span>" + (UN[t.id] ? '<span class="ub"></span>' : "") + "</button>";
      }).join("");
    }
    function bubble(m) {
      if (m.f === "sys") return '<div class="sysmsg">' + esc(m.t) + "</div>";
      if (m.f === "me") return '<div class="bub me">' + esc(m.t) + "</div>";
      if (m.f === "card") return '<a class="card" href="' + esc(m.url) + '" target="_blank" rel="noopener noreferrer"><span class="cs">' + esc(m.src) + " · " + esc(m.date) + '</span><span class="ct">' + esc(m.title) + "</span></a>";
      if (!Array.isArray(m.t)) return '<div class="bub them">' + esc(m.t) + "</div>";
      var u = m.t[1], ext = /^https?:/.test(u);
      return '<div class="bub them"><a href="' + esc(u) + '"' + (ext ? ' target="_blank" rel="noopener noreferrer"' : "") + ">" + esc(m.t[0]) + "</a></div>";
    }
    function mChat() {
      var t = THREADS[ti];
      var h = '<div class="chat-h"><button class="back" type="button" data-back="list">‹ Inbox</button><span class="av sm ' + t.cls + '">' + t.av + "</span>" + esc(t.name) + '</div><div class="msgs" id="msgs">' + t.msgs.map(bubble).join("") + "</div>";
      if (t.note) h += '<div class="comp note">' + esc(t.note) + "</div>";
      $("chat").innerHTML = h; var m = $("msgs"); if (m) m.scrollTop = 0;
    }
    function mOpen(i) { ti = i; delete UN[THREADS[i].id]; put("unread", UN); mList(); mChat(); $("msplit").dataset.view = "read"; badge(); }
    $("mitems").addEventListener("click", function (e) { var b = e.target.closest("[data-i]"); if (b) mOpen(+b.dataset.i); });
    $("msplit").addEventListener("click", function (e) { var b = e.target.closest("[data-back]"); if (b) $("msplit").dataset.view = b.dataset.back; });
    function badge() {
      var d = document.querySelector('.d[data-open="mail"]'), b = d.querySelector(".badge"), n = Object.keys(UN).length;
      if (n && !b) { b = document.createElement("span"); b.className = "badge"; d.appendChild(b); }
      if (b) { if (n) b.textContent = n; else b.remove(); }
    }
    mList(); mChat(); badge();

    var CK = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7"/></svg>';
    function rlAdd(text, sl) {
      var l = S.rl || [];
      if (sl && l.some(function (x) { return x.slug === sl; })) return;
      l.push({ id: Date.now() + "" + Math.floor(Math.random() * 1000), text: text, slug: sl || "", done: false }); put("rl", l); rlDraw();
    }
    function rlDraw() {
      var l = S.rl || [];
      $("rl-list").innerHTML = l.length ? '<ul class="rl">' + l.map(function (x) {
        return '<li class="' + (x.done ? "done" : "") + '"><button class="ck' + (x.done ? " on" : "") + '" type="button" data-t="' + x.id + '" aria-label="Mark done">' + CK + '</button><span class="tx">' + (x.slug && bySlug[x.slug] ? '<a href="#writing/' + x.slug + '" data-open="' + x.slug + '">' + esc(x.text) + "</a>" : esc(x.text)) + '</span><button class="x" type="button" data-x="' + x.id + '" aria-label="Remove">×</button></li>';
      }).join("") + "</ul>" : '<p class="empty">Nothing here yet. Open a piece in Writing and press “Save for later”, or add your own item above. This list lives on your device only.</p>';
    }
    $("b-rl").innerHTML = '<div class="pad"><h2>Reading list</h2><p class="sub">Yours alone. Kept in this browser, never sent anywhere.</p><form class="addrow" id="rl-form"><input id="rl-in" placeholder="Add something to read" aria-label="Add item" autocomplete="off"><button class="btn" type="submit">Add</button></form><div id="rl-list"></div></div>';
    $("rl-form").addEventListener("submit", function (e) { e.preventDefault(); var v = $("rl-in").value.trim(); if (v) { rlAdd(v, ""); $("rl-in").value = ""; } });
    $("rl-list").addEventListener("click", function (e) {
      var t = e.target.closest("[data-t]"), x = e.target.closest("[data-x]"), a = e.target.closest("[data-open]"), l = S.rl || [];
      if (t) { l.forEach(function (i) { if (i.id === t.dataset.t) i.done = !i.done; }); put("rl", l); rlDraw(); }
      if (x) { put("rl", l.filter(function (i) { return i.id !== x.dataset.x; })); rlDraw(); }
      if (a) { e.preventDefault(); openNote(a.dataset.open); }
    });
    rlDraw();

    function seg(attr, cur, opts) { return '<div class="seg" role="group">' + opts.map(function (o) { return "<button type=\"button\" data-" + attr + '="' + o[0] + '" class="' + (String(cur) === String(o[0]) ? "on" : "") + '">' + o[1] + "</button>"; }).join("") + "</div>"; }
    function setDraw() {
      var th = root.dataset.theme, wl = S.wall && WALLS[S.wall] ? S.wall : (th === "light" ? "paper" : "horizon"), mo = root.dataset.motion || "auto", ac = S.accent || "orange";
      var h = '<div class="pad set"><h2>Settings</h2><p class="sub">Saved on this device only.</p>';
      h += '<h3>Wallpaper</h3><div class="grpbox"><div class="walls">' + Object.keys(WALLS).map(function (k) { return '<button class="wp' + (wl === k ? " on" : "") + '" type="button" data-w="' + k + '" aria-label="' + WALLS[k].n + '">' + wallHTML(k) + "<span>" + WALLS[k].n + "</span></button>"; }).join("") + "</div></div>";
      h += '<h3>Look</h3><div class="grpbox"><div class="srow"><div class="l"><b>Appearance</b></div>' + seg("th", th, [["dark", "Dark"], ["light", "Light"]]) + "</div>";
      h += '<div class="srow"><div class="l"><b>Accent</b></div><div class="accs">' + Object.keys(ACC).map(function (k) { return '<button class="ac ac-' + k + (ac === k ? " on" : "") + '" type="button" data-ac="' + k + '" aria-label="' + k + '"></button>'; }).join("") + "</div></div>";
      h += '<div class="srow"><div class="l"><b>Text size</b><span>For reading comfort</span></div>' + seg("ts", S.ts || 1, [[".92", "Small"], ["1", "Default"], ["1.12", "Large"], ["1.25", "Larger"]]) + "</div>";
      h += '<div class="srow"><div class="l"><b>Glass</b><span>How see-through windows are</span></div><input type="range" id="r-ga" min="45" max="96" value="' + Math.round((S.ga || 0.74) * 100) + '" aria-label="Glass"></div>';
      h += '<div class="srow"><div class="l"><b>Dock size</b></div><input type="range" id="r-dock" min="40" max="72" value="' + (S.dock || 50) + '" aria-label="Dock size"></div></div>';
      h += '<h3>Motion</h3><div class="grpbox"><div class="srow"><div class="l"><b>Animations</b><span>Windows, the dock and the Drift wallpaper</span></div>' + seg("mo", mo, [["auto", "System"], ["on", "On"], ["off", "Off"]]) + "</div></div>";
      h += '<h3>Your data</h3><div class="grpbox"><div class="srow"><div class="l"><b>Stored on this device</b><span>' + (db ? Object.keys(S).length + " items in IndexedDB: look, windows, reading list, terminal files and history. Nothing is sent to a server." : "This browser blocks storage for this page, so choices last only until you close the tab. Nothing is sent to a server.") + '</span></div></div><div class="srow"><button class="danger" type="button" id="set-wipe">Clear all my data</button></div></div></div>';
      var box = $("b-settings"), sc = box.firstChild ? box.firstChild.scrollTop : 0;
      box.innerHTML = h; if (box.firstChild) box.firstChild.scrollTop = sc;
    }
    $("b-settings").addEventListener("click", function (e) {
      var t = e.target.closest("[data-th]"), w = e.target.closest("[data-w]"), m = e.target.closest("[data-mo]"), a = e.target.closest("[data-ac]"), s = e.target.closest("[data-ts]");
      if (t) { put("theme", t.dataset.th); apply(); setDraw(); }
      if (w) { put("wall", w.dataset.w); apply(); setDraw(); }
      if (m) { put("motion", m.dataset.mo); apply(); setDraw(); }
      if (a) { put("accent", a.dataset.ac); apply(); setDraw(); }
      if (s) { put("ts", parseFloat(s.dataset.ts)); apply(); setDraw(); }
      if (e.target.id === "set-wipe" && confirm("Clear everything stored by this site on this device?")) { wipe(); location.hash = ""; location.reload(); }
    });
    $("b-settings").addEventListener("input", function (e) {
      if (e.target.id === "r-ga") { put("ga", e.target.value / 100); apply(); }
      if (e.target.id === "r-dock") { put("dock", +e.target.value); apply(); }
    });
    setDraw();

    var BAT = null, conn = navigator.connection || null;
    function netDraw() {
      var on = navigator.onLine, et = conn && conn.effectiveType, bars = !on ? 0 : (et === "4g" || !et) ? 3 : et === "3g" ? 2 : 1;
      ["w1", "w2", "w3"].forEach(function (id, i) { $(id).setAttribute("opacity", i < bars ? "1" : "0.25"); });
      $("b-net").classList.toggle("bad", !on);
    }
    window.addEventListener("online", netDraw); window.addEventListener("offline", netDraw);
    if (conn && conn.addEventListener) conn.addEventListener("change", netDraw);
    netDraw();
    function batDraw() {
      if (!BAT) return; $("b-bat").hidden = false; var p = Math.round(BAT.level * 100);
      $("bat-t").textContent = p + "%" + (BAT.charging ? " ⚡" : ""); $("bat-f").setAttribute("width", Math.max(1, Math.round(17 * BAT.level)));
      $("b-bat").classList.toggle("bad", !BAT.charging && p <= 20);
    }
    if (navigator.getBattery) { navigator.getBattery().then(function (b) { BAT = b; batDraw(); ["levelchange", "chargingchange"].forEach(function (ev) { b.addEventListener(ev, batDraw); }); }).catch(function () {}); }
    var TZ = (function () { try { return Intl.DateTimeFormat().resolvedOptions().timeZone; } catch (e) { return ""; } })();
    function clock() {
      var d = new Date();
      $("clock-t").textContent = (phone() ? "" : d.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" }) + "  ") + d.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" });
      $("clock").title = TZ;
    }
    clock(); setInterval(clock, 15000);

    var pop = $("pop"), popKind = null;
    function hidePop() { pop.classList.remove("open"); popKind = null; document.querySelectorAll(".mb.on").forEach(function (b) { b.classList.remove("on"); }); }
    function showPop(kind, anchor, align, html) {
      if (popKind === kind) { hidePop(); return; }
      hidePop(); popKind = kind; pop.innerHTML = html; pop.classList.add("open");
      anchor.classList.add("on");
      var r = anchor.getBoundingClientRect(), pw = pop.offsetWidth, left;
      if (phone()) { pop.style.top = "32px"; return; }
      left = align === "right" ? r.right - pw : r.left;
      pop.style.left = Math.max(8, Math.min(left, window.innerWidth - pw - 8)) + "px";
      pop.style.top = Math.min(r.bottom + 4, window.innerHeight - pop.offsetHeight - 8) + "px";
    }
    function reqs() {
      var own = location.protocol + "//" + location.host, map = {}, third = 0, total = 0, list = [];
      try { list = performance.getEntriesByType("resource").map(function (e) { return e.name; }); } catch (e) {}
      list.forEach(function (u) { try { var x = new URL(u); if (x.protocol === "data:" || x.protocol === "blob:") return; var o = x.protocol + "//" + x.host; total++; map[o] = (map[o] || 0) + 1; if (o !== own) third++; } catch (e) {} });
      return { total: total, third: third, map: map };
    }
    function netHTML() {
      var r = reqs(), et = conn && conn.effectiveType, h = '<div class="pop-h">Connection</div>';
      h += '<div class="pi"><span>Status</span><span>' + (navigator.onLine ? "Online" : "Offline") + "</span></div>";
      if (et) h += '<div class="pi"><span>Type</span><span>' + et + (conn.downlink ? " · ~" + conn.downlink + " Mbps" : "") + "</span></div>";
      if (BAT) h += '<div class="pi"><span>Battery</span><span>' + Math.round(BAT.level * 100) + "%" + (BAT.charging ? " · charging" : "") + "</span></div>";
      h += '<div class="pi"><span>Time zone</span><span>' + esc(TZ || "unknown") + '</span></div><div class="pop-sep"></div><div class="pop-h">Requests made by this page</div>';
      Object.keys(r.map).forEach(function (o) { h += '<div class="pi"><span>' + esc(o) + "</span><span>" + r.map[o] + "</span></div>"; });
      if (!r.total) h += '<div class="pi"><span>None besides the page itself</span></div>';
      h += '<div class="pi"><span>Third-party requests</span><span class="' + (r.third ? "bad" : "good") + '">' + (r.third || "none") + "</span></div>";
      h += '<div class="pop-small">Read live from your browser. Battery and connection details are shown only to you and never stored or sent.</div>';
      return h;
    }
    function logoHTML() {
      var th = root.dataset.theme;
      return '<button class="pi" type="button" data-p="about"><span>About ' + esc(DATA.site.brand) + '</span></button><div class="pop-sep"></div><button class="pi" type="button" data-p="spot"><span>Search</span><span>Ctrl K</span></button><button class="pi" type="button" data-p="theme"><span>Appearance</span><span>' + (th === "dark" ? "Dark" : "Light") + '</span></button><button class="pi" type="button" data-p="settings"><span>Settings</span></button><div class="pop-sep"></div><button class="pi" type="button" data-p="wipe"><span>Clear my data</span></button>';
    }
    $("logo").addEventListener("click", function (e) { e.stopPropagation(); showPop("logo", this, "left", logoHTML()); });
    $("b-net").addEventListener("click", function (e) { e.stopPropagation(); showPop("net", this, "right", netHTML()); });
    $("b-bat").addEventListener("click", function (e) { e.stopPropagation(); showPop("net", this, "right", netHTML()); });
    pop.addEventListener("click", function (e) {
      var b = e.target.closest("button"); if (!b) return;
      var p = b.dataset.p;
      if (b.dataset.sort) { st.sort = b.dataset.sort; put("sort", st.sort); hidePop(); nList(); return; }
      if (b.dataset.f !== undefined) { hidePop(); setFolder(b.dataset.f, ""); $("nsplit").dataset.view = "list"; return; }
      if (b.dataset.tag) { hidePop(); setFolder("all", b.dataset.tag); $("nsplit").dataset.view = "list"; return; }
      if (!p) return;
      hidePop();
      if (p === "about") openApp("about");
      if (p === "settings") openApp("settings");
      if (p === "spot") sOpen();
      if (p === "theme") { put("theme", root.dataset.theme === "dark" ? "light" : "dark"); apply(); setDraw(); }
      if (p === "wipe" && confirm("Clear everything stored by this site on this device?")) { wipe(); location.hash = ""; location.reload(); }
    });
    document.addEventListener("pointerdown", function (e) { if (popKind && !e.target.closest("#pop") && !e.target.closest(".mb") && !e.target.closest(".ib") && !e.target.closest(".folder-pill")) hidePop(); });

    $("b-term").innerHTML = '<div class="term" id="term"><div id="termout"></div><label class="line"><span id="prompt">~ ›</span><input id="cmd" autocomplete="off" autocapitalize="off" spellcheck="false" aria-label="Command"></label></div>';
    var out = $("termout"), cmd = $("cmd");
    function say(h) { var d = document.createElement("div"); d.className = "out"; d.innerHTML = h; out.appendChild(d); $("term").scrollTop = 1e9; }
    var SITES = {};
    PROFILES.forEach(function (p) { SITES[slug(p.label)] = p.url; });
    PR.forEach(function (p) { if (p.url) SITES[slug(p.name)] = p.url; });
    function F(txt) { return { t: "f", ro: 1, x: txt }; }
    var wr = {}, wk = {};
    A.forEach(function (a) { wr[a.slug + ".md"] = { t: "f", ro: 1, a: a.slug }; });
    PR.forEach(function (p) { wk[p.slug + ".txt"] = F(p.name + "\n" + p.kicker + "\n\n" + p.lede + (p.url ? "\n\n" + p.url : "")); });
    var HOME = ["home", "kashish"];
    var homeC = { writing: { t: "d", ro: 1, c: wr }, workshop: { t: "d", ro: 1, c: wk }, "about.txt": F(DATA.site.author + "\n" + ABOUT.roles.join(" · ") + "\n\n" + ABOUT.statement.join("\n\n")), "contact.txt": F(DATA.site.email + "\n" + PROFILES.map(function (p) { return p.url.replace(/^https:\/\/(www\.)?/, ""); }).join("\n")) };
    var ROOT = { t: "d", ro: 1, c: { home: { t: "d", ro: 1, c: { kashish: { t: "d", c: homeC } } } } };
    var cwd = HOME.slice(), user = S.fs || [];
    function walk(parts) { var n = ROOT; for (var i = 0; i < parts.length; i++) { if (!n || n.t !== "d" || !n.c[parts[i]]) return null; n = n.c[parts[i]]; } return n; }
    function norm(p) {
      var base = p[0] === "/" ? [] : cwd.slice();
      if (p[0] === "~") { base = HOME.slice(); p = p.slice(1); }
      p.split("/").forEach(function (s) { if (!s || s === ".") return; if (s === "..") base.pop(); else base.push(s); });
      return base;
    }
    function pstr(parts) { var s = "/" + parts.join("/"), h = "/" + HOME.join("/"); return s === h ? "~" : s.indexOf(h + "/") === 0 ? "~" + s.slice(h.length) : s; }
    function setPrompt() { $("prompt").textContent = pstr(cwd) + " ›"; }
    function saveFs() { put("fs", user); }
    function applyFs(e) { var parts = e.p.split("/").filter(Boolean), name = parts.pop(), d = walk(parts); if (!d || d.t !== "d") return; d.c[name] = e.t === "d" ? { t: "d", c: {} } : { t: "f", x: e.x || "" }; }
    user.forEach(applyFs);
    function fileOf(arg) { var parts = norm(arg); return { parts: parts, n: walk(parts) }; }
    var hist = (S.hist || []).slice(), hi = hist.length;
    var helpText = '<span class="a">help</span>        this list\n<span class="a">ls cd pwd</span>    move around (try: cd writing)\n<span class="a">cat FILE</span>     read a piece or a project\n<span class="a">open X</span>       writing, workshop, inbox, reading, about, settings\n<span class="a">open FILE</span>    open a piece or project in its app\n<span class="a">sites</span>        my sites and profiles\n<span class="a">visit X</span>      open one in a new tab (no referrer, no opener)\n<span class="a">net</span>          requests this page has made\n<span class="a">mkdir touch rm echo</span>   your own files, kept on this device\n<span class="a">whois</span>        who is behind this site\n<span class="a">theme X</span>      light or dark\n<span class="a">history clear date wipe</span>\n<span class="m">Tab completes. Up recalls. Ctrl K searches everything.</span>';
    var CMD = {
      help: function () { return helpText; },
      pwd: function () { return pstr(cwd); },
      whoami: function () { return "visitor"; },
      whois: function () { return "domain      " + DATA.site.domain + "\nname        " + DATA.site.author + "\nroles       " + ABOUT.roles.join(" · ") + "\nwriting     " + A.length + " pieces since " + years[0] + "\nprojects    " + PR.map(function (p) { return p.name; }).join(", ") + "\ncontact     " + DATA.site.email; },
      date: function () { return new Date().toString(); },
      uname: function () { return DATA.site.brand + " web"; },
      history: function () { return hist.map(function (h, i) { return (i + 1) + "  " + esc(h); }).join("\n"); },
      clear: function () { out.innerHTML = ""; return ""; },
      theme: function (a) { if (a[0] === "light" || a[0] === "dark") { put("theme", a[0]); apply(); setDraw(); return "theme: " + a[0]; } return "usage: theme light|dark"; },
      sites: function () { return Object.keys(SITES).map(function (k) { return '<span class="a">' + k + "</span>" + new Array(Math.max(2, 22 - k.length)).join(" ") + SITES[k].replace(/^https:\/\/(www\.)?/, ""); }).join("\n"); },
      visit: function (a) { var k = (a[0] || "").toLowerCase(); if (!SITES[k]) return "usage: visit NAME  (see: sites)"; openUrl(SITES[k]); return "opening " + SITES[k].replace(/^https:\/\//, "") + " in a new tab"; },
      net: function () { var r = reqs(); return "requests made by this page: " + r.total + "\nthird-party: " + (r.third || "none") + "\n" + Object.keys(r.map).map(function (o) { return "  " + esc(o) + "  " + r.map[o]; }).join("\n"); },
      wipe: function () { wipe(); setTimeout(function () { location.hash = ""; location.reload(); }, 400); return "cleared everything this site stored on this device. reloading"; },
      ls: function (a) { var f = fileOf(a[0] || "."); if (!f.n) return "ls: no such directory: " + esc(a[0] || ""); if (f.n.t === "f") return esc(a[0]); return Object.keys(f.n.c).sort().map(function (k) { return f.n.c[k].t === "d" ? '<span class="dir">' + esc(k) + "/</span>" : esc(k); }).join("  ") || '<span class="m">(empty)</span>'; },
      cd: function (a) { var f = fileOf(a[0] || "~"); if (!f.n || f.n.t !== "d") return "cd: no such directory: " + esc(a[0] || ""); cwd = f.parts; setPrompt(); return ""; },
      cat: function (a) {
        if (!a[0]) return "usage: cat FILE";
        var f = fileOf(a[0]); if (!f.n) return "cat: no such file: " + esc(a[0]); if (f.n.t === "d") return "cat: " + esc(a[0]) + " is a directory";
        if (f.n.a) { var art = bySlug[f.n.a]; say("loading…"); bodyText(art).then(function (t) { say(esc(art.title + "\n" + art.label + "\n\n" + t)); }, function () { say("cat: could not load " + esc(a[0])); }); return ""; }
        return esc(f.n.x);
      },
      mkdir: function (a) { if (!a[0]) return "usage: mkdir NAME"; var f = fileOf(a[0]); if (f.n) return "mkdir: exists: " + esc(a[0]); var par = walk(f.parts.slice(0, -1)); if (!par || par.t !== "d" || par.ro) return "mkdir: not allowed here. Try your home folder (cd ~)."; var e = { p: "/" + f.parts.join("/"), t: "d" }; applyFs(e); user.push(e); saveFs(); return ""; },
      touch: function (a) { if (!a[0]) return "usage: touch NAME"; var f = fileOf(a[0]); if (f.n) return ""; var par = walk(f.parts.slice(0, -1)); if (!par || par.t !== "d" || par.ro) return "touch: not allowed here. Try your home folder (cd ~)."; var e = { p: "/" + f.parts.join("/"), t: "f", x: "" }; applyFs(e); user.push(e); saveFs(); return ""; },
      rm: function (a) {
        if (!a[0]) return "usage: rm NAME"; var f = fileOf(a[0]); if (!f.n) return "rm: no such file: " + esc(a[0]);
        var p = "/" + f.parts.join("/"), n = user.length;
        user = user.filter(function (e) { return e.p !== p && e.p.indexOf(p + "/") !== 0; });
        if (user.length === n) return "rm: read-only: " + esc(a[0]);
        var par = walk(f.parts.slice(0, -1)); delete par.c[f.parts[f.parts.length - 1]]; saveFs(); return "";
      },
      open: function (a) {
        var k = (a[0] || "").toLowerCase(), m = { writing: "notes", notes: "notes", workshop: "workshop", photos: "photos", inbox: "mail", mail: "mail", contact: "mail", reading: "rl", about: "about", settings: "settings", terminal: "term" };
        if (m[k] && wins[m[k]]) { openApp(m[k]); return "opening " + k; }
        var f = a[0] && fileOf(a[0]);
        if (f && f.n && f.n.t === "f") {
          var nm = f.parts[f.parts.length - 1].replace(/\.(md|txt)$/, ""), dir = f.parts[f.parts.length - 2];
          if (dir === "writing" && bySlug[nm]) { openNote(nm); return "opening " + nm; }
          if (dir === "workshop") { var j = PR.map(function (x) { return x.slug; }).indexOf(nm); if (j > -1) { openProject(j); return "opening " + nm; } }
          return "open: only pieces and projects open in an app. Try cat.";
        }
        return "open what? writing, workshop, inbox, reading, about, settings, or a file";
      }
    };
    function run(line) {
      var redirect = null, m = line.match(/^(echo\s.*?)\s*>\s*(\S+)\s*$/);
      if (m) { redirect = m[2]; line = m[1]; }
      var toks = (line.match(/"[^"]*"|'[^']*'|\S+/g) || []).map(function (t) { return t.replace(/^["']|["']$/g, ""); });
      var c = (toks.shift() || "").toLowerCase();
      if (c === "echo") {
        var txt = toks.join(" ");
        if (redirect) {
          var f = fileOf(redirect), par = walk(f.parts.slice(0, -1));
          if (!par || par.t !== "d" || par.ro) return "echo: not allowed here. Try your home folder (cd ~).";
          var e = { p: "/" + f.parts.join("/"), t: "f", x: txt }; applyFs(e);
          user = user.filter(function (u) { return u.p !== e.p; }); user.push(e); saveFs(); return "";
        }
        return esc(txt);
      }
      if (({}).hasOwnProperty.call(CMD, c)) return CMD[c](toks);
      return "command not found: " + esc(c) + "  (try help)";
    }
    cmd.addEventListener("keydown", function (e) {
      if (e.key === "ArrowUp") { if (hist.length) { hi = Math.max(0, hi - 1); cmd.value = hist[hi] || ""; } e.preventDefault(); return; }
      if (e.key === "ArrowDown") { hi = Math.min(hist.length, hi + 1); cmd.value = hist[hi] || ""; e.preventDefault(); return; }
      if (e.key === "Tab") { e.preventDefault(); complete(); return; }
      if (e.key !== "Enter") return;
      var v = cmd.value.trim(); cmd.value = "";
      say('<span class="m">' + esc(pstr(cwd)) + " › </span>" + esc(v));
      if (!v) return;
      hist.push(v); hist = hist.slice(-100); hi = hist.length; put("hist", hist);
      var r = run(v); if (r) say(r);
    });
    function complete() {
      var v = cmd.value, sp = v.lastIndexOf(" ");
      if (sp < 0) { var c = Object.keys(CMD).filter(function (k) { return k.indexOf(v) === 0; }); if (c.length === 1) cmd.value = c[0] + " "; else if (c.length > 1) say(c.join("  ")); return; }
      var head = v.slice(0, sp + 1), part = v.slice(sp + 1), sl = part.lastIndexOf("/"), dirp = sl < 0 ? "." : part.slice(0, sl + 1), pre = part.slice(sl + 1), d = walk(norm(dirp));
      if (!d || d.t !== "d") return;
      var c2 = Object.keys(d.c).filter(function (k) { return k.indexOf(pre) === 0; });
      if (c2.length === 1) cmd.value = head + (sl < 0 ? "" : part.slice(0, sl + 1)) + c2[0] + (d.c[c2[0]].t === "d" ? "/" : "");
      else if (c2.length > 1) say(c2.join("  "));
    }
    say('<span class="a">' + esc(DATA.site.brand) + "</span> shell. Type <span class=\"a\">help</span>. Files you make are kept on this device only.\n");
    setPrompt();

    var spot = $("spot"), spin = $("spin"), spres = $("spres"), sel = 0, items = [];
    function allItems() {
      var r = [];
      order.forEach(function (k) { r.push({ t: APP[k].n, k: "App", i: k, run: function () { openApp(k); } }); });
      A.forEach(function (a) { r.push({ t: a.title, k: "Writing", i: "notes", run: function () { openNote(a.slug); } }); });
      PR.forEach(function (p, i) { r.push({ t: p.name, k: "Workshop", i: "workshop", run: function () { openProject(i); } }); });
      TAGS.forEach(function (t) { r.push({ t: t, k: "Subject", i: "notes", run: function () { setFolder("all", t); $("nsplit").dataset.view = "list"; openApp("notes"); } }); });
      THREADS.forEach(function (t, i) { r.push({ t: t.name, k: "Inbox", i: "mail", run: function () { openApp("mail"); mOpen(i); } }); });
      return r;
    }
    function sRender() {
      var q = spin.value.toLowerCase().trim(), a = allItems();
      items = (q ? a.filter(function (x) { return x.t.toLowerCase().indexOf(q) > -1 || x.k.toLowerCase().indexOf(q) > -1; }) : a.slice(0, 8)).slice(0, 8);
      if (sel >= items.length) sel = 0;
      spres.innerHTML = items.length ? items.map(function (x, i) { return '<button class="sp' + (i === sel ? " on" : "") + '" type="button" data-n="' + i + '">' + icon(x.i) + '<span class="t">' + esc(x.t) + '</span><span class="k">' + x.k + "</span></button>"; }).join("") : '<div class="sp-empty">No results.</div>';
    }
    function sOpen() { hidePop(); spot.classList.add("open"); spin.value = ""; sel = 0; sRender(); spin.focus(); }
    function sClose() { spot.classList.remove("open"); }
    function sGo(n) { var x = items[n]; if (x) { sClose(); x.run(); } }
    $("btn-spot").addEventListener("click", sOpen);
    spin.addEventListener("input", function () { sel = 0; sRender(); });
    spin.addEventListener("keydown", function (e) {
      if (e.key === "ArrowDown") { sel = Math.min(items.length - 1, sel + 1); sRender(); e.preventDefault(); }
      else if (e.key === "ArrowUp") { sel = Math.max(0, sel - 1); sRender(); e.preventDefault(); }
      else if (e.key === "Enter") sGo(sel);
    });
    spres.addEventListener("click", function (e) { var b = e.target.closest("[data-n]"); if (b) sGo(+b.dataset.n); });
    spot.addEventListener("pointerdown", function (e) { if (e.target === spot) sClose(); });
    document.addEventListener("keydown", function (e) {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") { e.preventDefault(); spot.classList.contains("open") ? sClose() : sOpen(); return; }
      if (e.key === "Escape") {
        if (spot.classList.contains("open")) sClose();
        else if (popKind) hidePop();
        else { var fw = document.querySelector(".win.open.front"); if (fw) closeApp(fw); }
        return;
      }
      if (e.key === "/" && !/INPUT|TEXTAREA/.test((document.activeElement || {}).tagName)) { e.preventDefault(); sOpen(); }
    });
    document.addEventListener("pointerup", function () { setTimeout(saveWins, 60); });

    function route() {
      var h = (location.hash || "").replace(/^#\/?/, "").split("/"), a = h[0], s = decodeURIComponent(h.slice(1).join("/"));
      if (a === "writing" && s && bySlug[s]) { openNote(s); return true; }
      if (a === "shelf" && s && shelfName[s]) { setFolder(s, ""); $("nsplit").dataset.view = "list"; openApp("notes"); return true; }
      if (a === "tag" && s) { setFolder("all", s); $("nsplit").dataset.view = "list"; openApp("notes"); return true; }
      if (a === "workshop" && s) { var j = PR.map(function (x) { return x.slug; }).indexOf(s); if (j > -1) { openProject(j); return true; } }
      var m = { writing: "notes", workshop: "workshop", photos: "photos", inbox: "mail", reading: "rl", settings: "settings", about: "about", terminal: "term" };
      if (m[a] && wins[m[a]]) { openApp(m[a]); return true; }
      return false;
    }
    window.addEventListener("hashchange", route);
    if (!route()) {
      var any = false;
      order.forEach(function (k) { if (WS[k] && WS[k].open) { openApp(k, true); any = true; } });
      if (!any) openApp("notes", true);
      if (S.last && bySlug[S.last]) { st.slug = S.last; nAll(); }
      else if (!phone()) { st.slug = visible()[0].slug; nAll(); }
    }
  }
})();
