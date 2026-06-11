// ============ state ============
const state = {
  cart: { restaurantId: null, items: [] }, // items: [{itemId, qty, note}]
  promoCode: null,
  payment: "cash",
  orders: JSON.parse(localStorage.getItem("gf_orders") || "[]"),
  navStack: ["home"],
  cuisineFilter: "all",
  chipFilter: "all",
  trackingTimer: null,
};

const $ = (id) => document.getElementById(id);
const baht = (n) => "฿" + (Math.round(n * 100) / 100).toLocaleString();

// photo with emoji fallback: if the image fails to load it disappears,
// revealing the emoji underneath
const foodImg = (src, emoji) =>
  `<span class="img-fb">${emoji || ""}</span>` +
  (src ? `<img class="food-img" src="${src}" alt="" loading="lazy" onerror="this.remove()">` : "");

const svg = (path, fill = "currentColor") =>
  `<svg viewBox="0 0 24 24" fill="${fill}"><path d="${path}"/></svg>`;

const ICONS = {
  cutlery: svg("M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.75 3.97V22h2.5v-9.03C11.34 12.84 13 11.12 13 9V2h-2v7zm5-3v8h2.5v8H21V2c-2.76 0-5 2.24-5 4z"),
  cart: svg("M7 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.49 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"),
  box: svg("M21 8l-2-5H5L3 8v13a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V8zM5.7 5h12.6l1.2 3H4.5l1.2-3zM12 17l-5-5h3V9h4v3h3l-5 5z"),
  car: svg("M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"),
  pin: svg("M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"),
  store: svg("M20 4H4v2h16V4zm1 10v-2l-1-5H4l-1 5v2h1v6h10v-6h4v6h2v-6h1zm-9 4H6v-4h6v4z"),
  scooter: svg("M19 15a3 3 0 1 0 3 3 3 3 0 0 0-3-3zm0 4.5A1.5 1.5 0 1 1 20.5 18 1.5 1.5 0 0 1 19 19.5zM5 15a3 3 0 1 0 3 3 3 3 0 0 0-3-3zm0 4.5A1.5 1.5 0 1 1 6.5 18 1.5 1.5 0 0 1 5 19.5zM16 5h-2v2h1.59l1.91 3H9.41A4.5 4.5 0 0 0 2 13.5V16h1.5a3.5 3.5 0 0 1 7 0H15a4 4 0 0 1 4-4h.66L16.7 5.6A1 1 0 0 0 16 5z"),
  phone: svg("M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"),
  chat: svg("M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"),
  home: svg("M4 10.5L12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6h-4v6H5a1 1 0 0 1-1-1z"),
  office: svg("M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"),
  receipt: svg("M6 2h12a1 1 0 0 1 1 1v18l-3-2-3 2-3-2-3 2V3a1 1 0 0 1 1-1zm2 5h8v2H8zm0 4h8v2H8z"),
  tag: svg("M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58.55 0 1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41 0-.55-.23-1.06-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7z"),
  card: svg("M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"),
  help: svg("M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"),
  wallet: svg("M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"),
  cash: `<svg viewBox="0 0 24 24"><rect x="2" y="6" width="20" height="12" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="2.5" fill="currentColor"/></svg>`,
  check: svg("M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"),
  search: `<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" stroke-width="2"/><path d="M20 20l-3.5-3.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,
};
const findRestaurant = (id) => RESTAURANTS.find((r) => r.id === id);
function findItem(rid, itemId) {
  const r = findRestaurant(rid);
  for (const sec of r.menu) {
    const it = sec.items.find((i) => i.id === itemId);
    if (it) return it;
  }
  return null;
}

function saveOrders() {
  localStorage.setItem("gf_orders", JSON.stringify(state.orders));
}

// ============ navigation ============
const TABS = ["home", "orders", "account"];

function showScreen(name, { push = true } = {}) {
  document.querySelectorAll(".screen").forEach((s) => s.classList.remove("active"));
  $("screen-" + name).classList.add("active");
  if (push && state.navStack[state.navStack.length - 1] !== name) state.navStack.push(name);

  // bottom nav only on top-level tabs
  $("bottom-nav").classList.toggle("hidden", !TABS.includes(name));
  document.querySelectorAll(".nav-item").forEach((b) =>
    b.classList.toggle("active", b.dataset.tab === name)
  );

  if (name !== "tracking" && state.trackingTimer) {
    clearInterval(state.trackingTimer);
    state.trackingTimer = null;
  }
}

function switchTab(tab) {
  state.navStack = [tab];
  if (tab === "orders") renderOrders();
  if (tab === "account") renderAccount();
  showScreen(tab, { push: false });
}

function goBack() {
  state.navStack.pop();
  const prev = state.navStack[state.navStack.length - 1] || "home";
  if (prev === "orders") renderOrders();
  if (prev === "restaurant" && state.currentRestaurant) renderRestaurant(state.currentRestaurant);
  if (prev === "basket") renderBasket();
  showScreen(prev, { push: false });
}

// ============ toast ============
let toastTimer = null;
function toast(msg) {
  const t = $("toast");
  t.textContent = msg;
  t.classList.remove("hidden");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.add("hidden"), 2200);
}

// ============ home ============
function renderPromos() {
  $("promo-scroll").innerHTML = PROMOS.map(
    (p) => `
    <div class="promo-card" style="background:${p.bg}" onclick="toast('Use code ${p.code} at checkout!')">
      <img class="promo-photo" src="${p.img}" alt="" loading="lazy" onerror="this.remove()">
      <div class="promo-shade"></div>
      <div class="promo-content">
        <h3>${p.title}</h3>
        <p>${p.text}</p>
        <span class="promo-code">${p.code}</span>
      </div>
    </div>`
  ).join("");
  $("promo-dots").innerHTML = PROMOS.map((_, i) => `<span class="${i === 0 ? "on" : ""}"></span>`).join("");

  $("promo-scroll").addEventListener("scroll", () => {
    const el = $("promo-scroll");
    const i = Math.round(el.scrollLeft / (el.scrollWidth / PROMOS.length));
    document.querySelectorAll("#promo-dots span").forEach((d, j) => d.classList.toggle("on", j === i));
  }, { passive: true });
}

function renderCuisines() {
  $("cuisine-scroll").innerHTML = CUISINES.map(
    (c) => `
    <button class="cuisine ${state.cuisineFilter === c.id ? "active" : ""}" onclick="setCuisine('${c.id}')">
      <div class="cuisine-icon">${c.img ? foodImg(c.img, "") : `<span class="cuisine-all">${ICONS.cutlery}</span>`}</div><span>${c.name}</span>
    </button>`
  ).join("");
}

function setCuisine(id) {
  state.cuisineFilter = id;
  renderCuisines();
  renderRestaurantList();
  scrollToRestaurants();
}

function restaurantCard(r) {
  return `
  <div class="r-card" onclick="openRestaurant('${r.id}')">
    <div class="r-cover" style="background:${r.bg}">
      ${foodImg(r.img, r.emoji)}
      ${r.promo ? `<span class="promo-tag">${r.promo}</span>` : ""}
      ${!r.open ? `<span class="closed-tag">Closed · Opens 6 PM</span>` : ""}
    </div>
    <div class="r-info">
      <div class="r-name">${r.name}</div>
      <div class="r-meta">
        <span class="star">★</span> ${r.rating} (${r.ratings})
        <span class="dot"></span> ${r.time} min
        <span class="dot"></span> ${r.distance} km
        <span class="dot"></span> ${r.deliveryFee === 0 ? `<b style="color:var(--green)">Free delivery</b>` : `Delivery ${baht(r.deliveryFee)}`}
      </div>
      <div class="r-cuisine">${r.cuisineLabel}</div>
    </div>
  </div>`;
}

function renderRestaurantList() {
  let list = RESTAURANTS.slice();
  if (state.cuisineFilter !== "all") list = list.filter((r) => r.cuisine === state.cuisineFilter);
  if (state.chipFilter === "promo") list = list.filter((r) => r.promo);
  if (state.chipFilter === "rating") list = list.filter((r) => r.rating >= 4.5);
  if (state.chipFilter === "fast") list = list.filter((r) => r.time < 25);

  $("restaurant-list").innerHTML = list.length
    ? list.map(restaurantCard).join("")
    : `<div class="empty-state"><div class="big">🔍</div>No restaurants match these filters.</div>`;
}

document.querySelectorAll("#filter-chips .chip").forEach((chip) => {
  chip.addEventListener("click", () => {
    document.querySelectorAll("#filter-chips .chip").forEach((c) => c.classList.remove("active"));
    chip.classList.add("active");
    state.chipFilter = chip.dataset.filter;
    renderRestaurantList();
  });
});

function scrollToRestaurants() {
  $("restaurants-anchor").scrollIntoView({ behavior: "smooth" });
}

// ============ search ============
function openSearch() {
  showScreen("search");
  $("search-input").value = "";
  runSearch("");
  setTimeout(() => $("search-input").focus(), 60);
}

function runSearch(q) {
  q = q.trim().toLowerCase();
  const box = $("search-results");
  if (!q) {
    box.innerHTML = `
      <h2 class="section-title" style="padding-left:0">Popular searches</h2>
      ${["Pad thai", "Burger", "Sushi", "Boba", "Pizza", "Salad"].map(
        (s) => `<button class="chip" style="margin:0 6px 8px 0" onclick="presetSearch('${s}')">${s}</button>`
      ).join("")}`;
    return;
  }
  const results = [];
  for (const r of RESTAURANTS) {
    if (r.name.toLowerCase().includes(q) || r.cuisineLabel.toLowerCase().includes(q)) {
      results.push({ type: "restaurant", r });
    }
    for (const sec of r.menu)
      for (const it of sec.items)
        if (it.name.toLowerCase().includes(q)) results.push({ type: "item", r, it });
  }
  box.innerHTML = results.length
    ? results.slice(0, 20).map((res) =>
        res.type === "restaurant"
          ? `<div class="s-card" onclick="openRestaurant('${res.r.id}')">
              <div class="s-thumb" style="background:${res.r.bg}">${foodImg(res.r.img, res.r.emoji)}</div>
              <div class="r-info" style="padding:0">
                <div class="r-name">${res.r.name}</div>
                <div class="r-meta"><span class="star">★</span> ${res.r.rating} <span class="dot"></span> ${res.r.time} min</div>
                <div class="r-cuisine">${res.r.cuisineLabel}</div>
              </div>
            </div>`
          : `<div class="s-card" onclick="openRestaurant('${res.r.id}')">
              <div class="s-thumb" style="background:${res.it.bg}">${foodImg(res.it.img, res.it.emoji)}</div>
              <div class="r-info" style="padding:0">
                <div class="r-name">${res.it.name}</div>
                <div class="r-meta">${baht(res.it.price)}</div>
                <div class="r-cuisine">from ${res.r.name}</div>
              </div>
            </div>`
      ).join("")
    : `<div class="empty-state"><div class="big">${ICONS.search}</div>No results for “${q}”.<br>Try another dish or restaurant.</div>`;
}

function presetSearch(s) {
  $("search-input").value = s;
  runSearch(s);
}

// ============ restaurant detail ============
function openRestaurant(id) {
  state.currentRestaurant = id;
  renderRestaurant(id);
  showScreen("restaurant");
}

function cartQty(itemId) {
  const e = state.cart.items.find((i) => i.itemId === itemId);
  return e ? e.qty : 0;
}

function renderRestaurant(id) {
  const r = findRestaurant(id);
  $("restaurant-detail").innerHTML = `
    <div class="detail-hero" style="background:${r.bg}">
      ${foodImg(r.img, r.emoji)}
      <button class="back-float" onclick="goBack()"><svg viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
    </div>
    <div class="detail-card">
      <h1>${r.name}</h1>
      <div class="r-meta">
        <span class="star">★</span> ${r.rating} (${r.ratings} ratings)
        <span class="dot"></span> ${r.time} min
        <span class="dot"></span> ${r.distance} km
      </div>
      <div class="detail-perks">
        ${r.deliveryFee === 0 ? `<span class="perk">Free delivery</span>` : `<span class="perk">Delivery ${baht(r.deliveryFee)}</span>`}
        ${r.promo ? `<span class="perk">${r.promo}</span>` : ""}
        <span class="perk">Open until 10 PM</span>
      </div>
    </div>
    ${r.menu.map((sec) => `
      <h2 class="menu-section-title">${sec.section}</h2>
      ${sec.items.map((it) => `
        <div class="menu-item" onclick="openItemModal('${r.id}','${it.id}')">
          <div class="menu-item-info">
            <div class="menu-item-name">${it.name}</div>
            <div class="menu-item-desc">${it.desc}</div>
            <div class="menu-item-price">${baht(it.price)}${it.was ? `<span class="was">${baht(it.was)}</span>` : ""}</div>
          </div>
          <div class="menu-thumb" style="background:${it.bg}">
            ${foodImg(it.img, it.emoji)}
            ${cartQty(it.id) ? `<span class="qty-in-cart">${cartQty(it.id)}</span>` : ""}
            <span class="add-fab">+</span>
          </div>
        </div>`).join("")}
    `).join("")}
    <div class="end-note">All prices are fake. So is the food.</div>`;
  updateCartBar();
}

// ============ item modal ============
let modalCtx = null; // { rid, itemId, qty }

function openItemModal(rid, itemId) {
  const r = findRestaurant(rid);
  if (!r.open) { toast("This restaurant is currently closed"); return; }
  if (state.cart.items.length && state.cart.restaurantId !== rid) {
    if (!confirm("Start a new basket? Your current basket from another restaurant will be cleared.")) return;
    state.cart = { restaurantId: null, items: [] };
    state.promoCode = null;
  }
  const it = findItem(rid, itemId);
  modalCtx = { rid, itemId, qty: 1 };
  $("item-modal").innerHTML = `
    <div class="modal-hero" style="background:${it.bg}">
      ${foodImg(it.img, it.emoji)}
      <button class="modal-close" onclick="closeItemModal()">✕</button>
    </div>
    <div class="modal-body">
      <h2>${it.name}</h2>
      <p class="m-desc">${it.desc}</p>
      <div class="m-price">${baht(it.price)}${it.was ? ` <span class="was" style="font-size:13px;color:var(--ink-3);text-decoration:line-through;font-weight:500">${baht(it.was)}</span>` : ""}</div>
      <input class="note-input" id="item-note" placeholder="Note to restaurant (optional) e.g. no chili" maxlength="100">
    </div>
    <div class="modal-footer">
      <div class="stepper">
        <button onclick="modalQty(-1)">−</button>
        <span class="qty" id="modal-qty">1</span>
        <button onclick="modalQty(1)">+</button>
      </div>
      <button class="btn-primary" id="modal-add-btn" onclick="confirmAddItem()">Add to basket · ${baht(it.price)}</button>
    </div>`;
  $("item-modal-overlay").classList.remove("hidden");
}

function modalQty(d) {
  modalCtx.qty = Math.max(1, Math.min(20, modalCtx.qty + d));
  $("modal-qty").textContent = modalCtx.qty;
  const it = findItem(modalCtx.rid, modalCtx.itemId);
  $("modal-add-btn").textContent = `Add to basket · ${baht(it.price * modalCtx.qty)}`;
}

function closeItemModal(ev) {
  if (ev && ev.target !== $("item-modal-overlay")) return;
  $("item-modal-overlay").classList.add("hidden");
}

function confirmAddItem() {
  const note = $("item-note").value.trim();
  state.cart.restaurantId = modalCtx.rid;
  const existing = state.cart.items.find((i) => i.itemId === modalCtx.itemId && i.note === note);
  if (existing) existing.qty += modalCtx.qty;
  else state.cart.items.push({ itemId: modalCtx.itemId, qty: modalCtx.qty, note });
  $("item-modal-overlay").classList.add("hidden");
  renderRestaurant(modalCtx.rid);
  toast("Added to basket ✓");
}

// ============ cart bar / basket ============
function cartTotals() {
  const r = findRestaurant(state.cart.restaurantId);
  let subtotal = 0, count = 0;
  for (const e of state.cart.items) {
    const it = findItem(state.cart.restaurantId, e.itemId);
    subtotal += it.price * e.qty;
    count += e.qty;
  }
  let deliveryFee = r ? r.deliveryFee : 0;
  const serviceFee = subtotal > 0 ? 10 : 0;
  let discount = 0;
  const promo = state.promoCode && PROMO_CODES[state.promoCode];
  if (promo) {
    if (promo.type === "percent") discount = Math.min(subtotal * promo.value / 100, promo.max);
    if (promo.type === "flat") discount = Math.min(promo.value, subtotal);
    if (promo.type === "freedel") { discount = 0; deliveryFee = 0; }
  }
  const total = Math.max(0, subtotal + deliveryFee + serviceFee - discount);
  return { subtotal, deliveryFee, serviceFee, discount, total, count, restaurant: r };
}

function updateCartBar() {
  const { count, total } = cartTotals();
  const bar = $("cart-bar");
  if (!count || state.cart.restaurantId !== state.currentRestaurant) {
    bar.classList.add("hidden");
    return;
  }
  bar.classList.remove("hidden");
  $("cart-bar-count").textContent = count;
  $("cart-bar-total").textContent = baht(total);
}

function openBasket() {
  renderBasket();
  showScreen("basket");
}

function changeQty(idx, d) {
  const e = state.cart.items[idx];
  e.qty += d;
  if (e.qty <= 0) state.cart.items.splice(idx, 1);
  if (!state.cart.items.length) {
    state.cart.restaurantId = null;
    state.promoCode = null;
    goBack();
    return;
  }
  renderBasket();
}

function renderBasket() {
  const t = cartTotals();
  if (!t.count) { $("basket-body").innerHTML = `<div class="empty-state"><div class="big">${ICONS.cart}</div>Your basket is empty.</div>`; $("basket-cta").style.display = "none"; return; }
  $("basket-cta").style.display = "";
  $("basket-title").textContent = t.restaurant.name;
  $("basket-body").innerHTML = `
    <div class="panel">
      <h3>Your items</h3>
      ${state.cart.items.map((e, idx) => {
        const it = findItem(state.cart.restaurantId, e.itemId);
        return `
        <div class="basket-row">
          <div class="b-emoji" style="background:${it.bg}">${foodImg(it.img, it.emoji)}</div>
          <div class="b-info">
            <div class="b-name">${it.name}</div>
            ${e.note ? `<div class="b-note">Note: ${e.note}</div>` : ""}
            <div class="b-price">${baht(it.price * e.qty)}</div>
          </div>
          <div class="stepper">
            <button onclick="changeQty(${idx},-1)">−</button>
            <span class="qty">${e.qty}</span>
            <button onclick="changeQty(${idx},1)">+</button>
          </div>
        </div>`;
      }).join("")}
      <button class="btn-ghost" style="padding:10px 0 0" onclick="goBack()">+ Add more items</button>
    </div>

    <div class="panel">
      <h3>Promo code</h3>
      ${state.promoCode
        ? `<div class="promo-applied"><span>🏷 ${state.promoCode} — ${PROMO_CODES[state.promoCode].label}</span><button class="btn-ghost" onclick="removePromo()">Remove</button></div>`
        : `<div class="promo-input-row">
            <input id="promo-input" placeholder="Enter code (try WELCOME50)">
            <button class="btn-ghost" onclick="applyPromo()">Apply</button>
          </div>`}
    </div>

    <div class="panel">
      <h3>Summary</h3>
      <div class="fee-row"><span>Subtotal</span><span>${baht(t.subtotal)}</span></div>
      <div class="fee-row"><span>Delivery fee</span>${t.deliveryFee === 0 ? `<span class="free">Free</span>` : `<span>${baht(t.deliveryFee)}</span>`}</div>
      <div class="fee-row"><span>Service fee</span><span>${baht(t.serviceFee)}</span></div>
      ${t.discount ? `<div class="fee-row"><span>Promo discount</span><span class="discount">−${baht(t.discount)}</span></div>` : ""}
      <div class="fee-row total"><span>Total</span><span>${baht(t.total)}</span></div>
    </div>`;
}

function applyPromo() {
  const code = $("promo-input").value.trim().toUpperCase();
  if (!code) return;
  if (PROMO_CODES[code]) {
    state.promoCode = code;
    toast("Promo applied 🎉");
  } else {
    toast("This code isn't valid (it's a demo — try WELCOME50)");
  }
  renderBasket();
}

function removePromo() {
  state.promoCode = null;
  renderBasket();
}

// ============ checkout ============
const PAYMENTS = [
  { id: "cash", icon: "cash", title: "Cash on delivery", sub: "Pay the driver when food arrives" },
  { id: "wallet", icon: "wallet", title: "GrubPay Wallet", sub: "Balance: ฿1,250.00 (fake money)" },
  { id: "card", icon: "card", title: "Visa •••• 4242", sub: "Demo card — never charged" },
];

function openCheckout() {
  renderCheckout();
  showScreen("checkout");
}

function renderCheckout() {
  const t = cartTotals();
  $("checkout-body").innerHTML = `
    <div class="panel">
      <h3>Deliver to</h3>
      <div class="option-row selected" onclick="toast('Address book is fixed in this demo')">
        <span class="o-icon">${ICONS.home}</span>
        <div class="o-text">
          <div class="o-title">Home</div>
          <div class="o-sub">123 Sukhumvit Rd, Khlong Toei, Bangkok 10110</div>
        </div>
        <span class="radio"></span>
      </div>
      <div class="option-row" onclick="toast('Address book is fixed in this demo')">
        <span class="o-icon">${ICONS.office}</span>
        <div class="o-text">
          <div class="o-title">Office</div>
          <div class="o-sub">88 Silom Rd, Bang Rak, Bangkok 10500</div>
        </div>
        <span class="radio"></span>
      </div>
    </div>

    <div class="panel" id="payment-panel">
      <h3>Payment method</h3>
      ${PAYMENTS.map((p) => `
        <div class="option-row ${state.payment === p.id ? "selected" : ""}" onclick="setPayment('${p.id}')">
          <span class="o-icon">${ICONS[p.icon]}</span>
          <div class="o-text">
            <div class="o-title">${p.title}</div>
            <div class="o-sub">${p.sub}</div>
          </div>
          <span class="radio"></span>
        </div>`).join("")}
    </div>

    <div class="panel">
      <h3>Order summary · ${t.restaurant.name}</h3>
      ${state.cart.items.map((e) => {
        const it = findItem(state.cart.restaurantId, e.itemId);
        return `<div class="fee-row"><span>${e.qty} × ${it.name}</span><span>${baht(it.price * e.qty)}</span></div>`;
      }).join("")}
      <div class="fee-row"><span>Delivery fee</span>${t.deliveryFee === 0 ? `<span class="free">Free</span>` : `<span>${baht(t.deliveryFee)}</span>`}</div>
      <div class="fee-row"><span>Service fee</span><span>${baht(t.serviceFee)}</span></div>
      ${t.discount ? `<div class="fee-row"><span>Promo (${state.promoCode})</span><span class="discount">−${baht(t.discount)}</span></div>` : ""}
      <div class="fee-row total"><span>Total</span><span>${baht(t.total)}</span></div>
    </div>`;
  $("checkout-total").textContent = baht(t.total);
}

function setPayment(id) {
  state.payment = id;
  renderCheckout();
}

// ============ place order + tracking ============
function placeOrder() {
  const t = cartTotals();
  if (!t.count) return;
  const btn = $("place-order-btn");
  btn.disabled = true;
  btn.textContent = "Placing your order…";

  setTimeout(() => {
    const order = {
      id: "GF" + Date.now().toString().slice(-8),
      restaurantId: state.cart.restaurantId,
      items: state.cart.items.map((e) => ({ ...e })),
      totals: { subtotal: t.subtotal, deliveryFee: t.deliveryFee, serviceFee: t.serviceFee, discount: t.discount, total: t.total },
      payment: state.payment,
      promoCode: state.promoCode,
      placedAt: Date.now(),
      driver: DRIVERS[Math.floor(Math.random() * DRIVERS.length)],
      rated: 0,
    };
    state.orders.unshift(order);
    saveOrders();
    state.cart = { restaurantId: null, items: [] };
    state.promoCode = null;
    btn.disabled = false;
    btn.innerHTML = `Place order · <span id="checkout-total">฿0</span>`;
    state.navStack = ["home"];
    openTracking(order.id);
    updateOrdersBadge();
  }, 1400);
}

// derive current stage from elapsed time so tracking survives reloads
function orderStage(order) {
  let elapsed = (Date.now() - order.placedAt) / 1000;
  for (let i = 0; i < ORDER_FLOW.length; i++) {
    const dur = ORDER_FLOW[i][2];
    if (i === ORDER_FLOW.length - 1 || elapsed < dur) return { index: i, remaining: Math.max(0, dur - elapsed) };
    elapsed -= dur;
  }
  return { index: ORDER_FLOW.length - 1, remaining: 0 };
}

function totalRemaining(order) {
  const st = orderStage(order);
  let rem = st.remaining;
  for (let i = st.index + 1; i < ORDER_FLOW.length; i++) rem += ORDER_FLOW[i][2];
  return rem;
}

function openTracking(orderId) {
  state.trackingOrderId = orderId;
  renderTracking();
  showScreen("tracking");
  if (state.trackingTimer) clearInterval(state.trackingTimer);
  state.trackingTimer = setInterval(renderTracking, 1000);
}

function renderTracking() {
  const order = state.orders.find((o) => o.id === state.trackingOrderId);
  if (!order) return;
  const r = findRestaurant(order.restaurantId);
  const st = orderStage(order);
  const stageKey = ORDER_FLOW[st.index][0];
  const delivered = stageKey === "delivered";

  if (delivered && state.trackingTimer) {
    clearInterval(state.trackingTimer);
    state.trackingTimer = null;
    updateOrdersBadge();
  }

  const etaMin = Math.max(1, Math.ceil(totalRemaining(order) / 60));
  const eta = new Date(Date.now() + totalRemaining(order) * 1000);
  const etaStr = eta.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  const driverClass = stageKey === "delivering" ? "moving" : delivered ? "arrived" : "";
  const showDriver = ["pickup", "delivering", "delivered"].includes(stageKey);

  $("tracking-body").innerHTML = `
    <div class="track-map">
      <button class="track-back" onclick="exitTracking()"><svg viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
      <span class="map-pin home">${ICONS.pin}</span>
      <span class="map-pin store">${ICONS.store}</span>
      ${showDriver ? `<span class="map-pin driver ${driverClass}">${ICONS.scooter}</span>` : ""}
    </div>

    <div class="track-card">
      ${delivered
        ? `<div class="delivered-banner" style="padding-top:6px">
            <div class="big delivered-check">${ICONS.check}</div>
            <h2>Order delivered!</h2>
            <p>Hope it was delicious (it was imaginary).</p>
            <div class="stars-row" id="stars-row">
              ${[1,2,3,4,5].map((n) => `<span class="${order.rated >= n ? "lit" : ""}" onclick="rateOrder(${n})">★</span>`).join("")}
            </div>
          </div>`
        : `<div class="track-eta">Estimated arrival ${etaStr} · ~${etaMin} min</div>
           <div class="track-status">${ORDER_FLOW[st.index][1]}</div>
           <div class="track-progress">
             ${ORDER_FLOW.slice(0, 4).map((_, i) =>
               `<span class="${i < st.index ? "done" : i === st.index ? "now" : ""}"></span>`).join("")}
           </div>`}
    </div>

    ${showDriver ? `
    <div class="track-card" style="margin-top:0">
      <div class="driver-card">
        <div class="driver-avatar">${order.driver.photo ? `<img class="food-img" src="${order.driver.photo}" alt="" onerror="this.remove()">` : (order.driver.emoji || "")}</div>
        <div>
          <div class="driver-name">${order.driver.name} <span style="color:#FFB300;font-size:12px">★ ${order.driver.rating}</span></div>
          <div class="driver-sub">${order.driver.vehicle}</div>
        </div>
        <div class="driver-actions">
          <button class="round-btn" onclick="toast('This is a demo — no one will pick up')">${ICONS.phone}</button>
          <button class="round-btn" onclick="toast('Chat is not real in this demo')">${ICONS.chat}</button>
        </div>
      </div>
    </div>` : ""}

    <div class="track-card" style="margin-top:0">
      <h3 style="font-size:14.5px;font-weight:800;margin-bottom:14px">Order ${order.id} · ${r.name}</h3>
      <div class="timeline">
        ${ORDER_FLOW.map(([key, label], i) => `
          <div class="tl-step ${i < st.index || delivered ? "done" : i === st.index ? "now" : ""}">
            <span class="tl-dot">${i < st.index || delivered ? "✓" : ""}</span>
            <div>
              <div class="tl-text">${label}</div>
              ${i === 0 ? `<div class="tl-time">${new Date(order.placedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</div>` : ""}
            </div>
          </div>`).join("")}
      </div>
    </div>

    <div class="track-card" style="margin-top:0">
      <h3 style="font-size:14.5px;font-weight:800;margin-bottom:10px">Items</h3>
      ${order.items.map((e) => {
        const it = findItem(order.restaurantId, e.itemId);
        return `<div class="fee-row"><span>${e.qty} × ${it.name}</span><span>${baht(it.price * e.qty)}</span></div>`;
      }).join("")}
      <div class="fee-row total"><span>Total (${order.payment === "cash" ? "Cash" : order.payment === "wallet" ? "Wallet" : "Card"})</span><span>${baht(order.totals.total)}</span></div>
    </div>`;
}

function exitTracking() {
  state.navStack = ["orders"];
  renderOrders();
  showScreen("orders", { push: false });
}

function rateOrder(n) {
  const order = state.orders.find((o) => o.id === state.trackingOrderId);
  order.rated = n;
  saveOrders();
  renderTracking();
  toast(`Thanks for the ${n} star${n > 1 ? "s" : ""}! ⭐`);
}

// ============ orders list ============
function isLive(order) {
  return ORDER_FLOW[orderStage(order).index][0] !== "delivered";
}

function updateOrdersBadge() {
  const live = state.orders.filter(isLive).length;
  const b = $("orders-nav-badge");
  b.classList.toggle("hidden", !live);
  b.textContent = live;
}

function renderOrders() {
  updateOrdersBadge();
  if (!state.orders.length) {
    $("orders-body").innerHTML = `<div class="empty-state"><div class="big">${ICONS.receipt}</div>No orders yet.<br>Hungry? Your first (fake) meal awaits.</div>`;
    return;
  }
  $("orders-body").innerHTML = state.orders.map((o) => {
    const r = findRestaurant(o.restaurantId);
    const live = isLive(o);
    const count = o.items.reduce((s, e) => s + e.qty, 0);
    return `
    <div class="order-card" onclick="openTracking('${o.id}')">
      <div class="order-card-top">
        <div class="order-emoji" style="background:${r.bg}">${foodImg(r.img, r.emoji)}</div>
        <div>
          <div class="order-rname">${r.name}</div>
          <div class="order-sub">${count} item${count > 1 ? "s" : ""} · ${baht(o.totals.total)} · ${new Date(o.placedAt).toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}</div>
        </div>
        <span class="order-state ${live ? "live" : "done"}">${live ? "● Live" : "Delivered"}</span>
      </div>
      <div class="order-actions">
        ${live
          ? `<button class="btn-fill" onclick="event.stopPropagation();openTracking('${o.id}')">Track order</button>`
          : `<button class="btn-outline" onclick="event.stopPropagation();openTracking('${o.id}')">View details</button>
             <button class="btn-fill" onclick="event.stopPropagation();reorder('${o.id}')">Reorder</button>`}
      </div>
    </div>`;
  }).join("");
}

function reorder(orderId) {
  const o = state.orders.find((x) => x.id === orderId);
  state.cart = { restaurantId: o.restaurantId, items: o.items.map((e) => ({ ...e })) };
  state.promoCode = null;
  state.navStack = ["home", "basket"];
  renderBasket();
  showScreen("basket", { push: false });
  toast("Items added back to your basket");
}

// ============ account ============
function renderAccount() {
  const totalOrders = state.orders.length;
  const totalSpent = state.orders.reduce((s, o) => s + o.totals.total, 0);
  $("account-body").innerHTML = `
    <div class="profile-head">
      <div class="profile-avatar"><img class="food-img" src="https://randomuser.me/api/portraits/men/11.jpg" alt="" onerror="this.remove()"></div>
      <div>
        <div class="profile-name">Hungry Human</div>
        <div class="profile-sub">demo@grubfood.fake · Gold member</div>
      </div>
    </div>
    <div class="wallet-row">
      <div class="wallet-box"><div class="w-label">GrubPay balance</div><div class="w-value">฿1,250.00</div></div>
      <div class="wallet-box"><div class="w-label">Reward points</div><div class="w-value">${(2480 + totalOrders * 35).toLocaleString()} pts</div></div>
    </div>
    <div class="panel menu-list">
      ${[
        ["receipt", "Your orders", totalOrders + " orders · " + baht(totalSpent) + " spent (fake)"],
        ["tag", "Promos & vouchers", "4 available"],
        ["pin", "Saved addresses", "Home · Office"],
        ["card", "Payment methods", "Cash · Wallet · Visa 4242"],
        ["help", "Help centre", "We can't actually help, it's a demo"],
      ].map(([icon, title, sub]) => `
        <div class="option-row" onclick="${title === "Your orders" ? "switchTab('orders')" : `toast('Just for show in this demo')`}">
          <span class="o-icon">${ICONS[icon]}</span>
          <div class="o-text"><div class="o-title">${title}</div><div class="o-sub">${sub}</div></div>
          <svg class="chev-r" viewBox="0 0 24 24"><path d="M9 6l6 6-6 6"/></svg>
        </div>`).join("")}
    </div>
    <p class="fake-note">GrubFood is a demo app. No real restaurants, orders, payments or drivers.</p>`;
}

// ============ init ============
renderPromos();
renderCuisines();
renderRestaurantList();
updateOrdersBadge();
