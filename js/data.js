// ============ demo data (all fake) ============
// Food photos: TheMealDB (free API, www.themealdb.com)
// Drink photos: TheCocktailDB (free API, www.thecocktaildb.com)
// Extra pizza photos: Foodish (open-source, foodish-api.com)
// Avatars: randomuser.me (free to use)

const MEAL = "https://www.themealdb.com/images/media/meals/";
const DRINK = "https://www.thecocktaildb.com/images/media/drink/";
const FOODISH = "https://foodish-api.com/images/";

const PROMOS = [
  { bg: "linear-gradient(120deg,#00B14F,#007A3D)", img: MEAL + "x0lk931587671540.jpg", title: "50% OFF your first order", text: "New here? Big welcome treat on us.", code: "WELCOME50" },
  { bg: "linear-gradient(120deg,#FF7043,#E64A19)", img: MEAL + "44bzep1761848278.jpg", title: "Free delivery all week", text: "No minimum spend. Yes, really.", code: "FREEDEL" },
  { bg: "linear-gradient(120deg,#7B1FA2,#4A148C)", img: DRINK + "vqwryq1441245927.jpg", title: "Buy 1 Get 1 bubble tea", text: "Treat a friend (or yourself twice).", code: "BOBA11" },
  { bg: "linear-gradient(120deg,#0288D1,#01579B)", img: MEAL + "vwrpps1503068729.jpg", title: "฿60 off lunch sets", text: "Weekdays 11am–2pm only.", code: "LUNCH60" },
];

const CUISINES = [
  { id: "all", name: "All" },
  { id: "thai", name: "Thai", img: MEAL + "rg9ze01763479093.jpg/preview" },
  { id: "burger", name: "Burgers", img: MEAL + "44bzep1761848278.jpg/preview" },
  { id: "pizza", name: "Pizza", img: MEAL + "x0lk931587671540.jpg/preview" },
  { id: "japanese", name: "Japanese", img: MEAL + "g046bb1663960946.jpg/preview" },
  { id: "dessert", name: "Dessert", img: MEAL + "swttys1511385853.jpg/preview" },
  { id: "coffee", name: "Coffee", img: DRINK + "ytprxy1454513855.jpg/preview" },
  { id: "healthy", name: "Healthy", img: MEAL + "1549542994.jpg/preview" },
];

const RESTAURANTS = [
  {
    id: "somtum-house",
    name: "Somtum House",
    emoji: "🍜",
    img: MEAL + "sstssx1487349585.jpg",
    bg: "linear-gradient(135deg,#FFE0B2,#FFCC80)",
    cuisine: "thai",
    cuisineLabel: "Thai · Isaan · Street food",
    rating: 4.8, ratings: "2.1k", time: 20, distance: 1.2,
    deliveryFee: 0, promo: "20% off selected items", open: true,
    menu: [
      { section: "Popular", items: [
        { id: "st1", name: "Som Tum Thai", desc: "Classic green papaya salad with peanuts, tomatoes and a punchy lime dressing.", price: 65, was: 80, emoji: "🥗", bg: "#FFF3E0", img: MEAL + "6g3rso1763486069.jpg" },
        { id: "st2", name: "Grilled Chicken (Half)", desc: "Charcoal-grilled marinated chicken, served with sticky rice and jaew dip.", price: 120, emoji: "🍗", bg: "#FFF3E0", img: MEAL + "ittake1763586925.jpg" },
        { id: "st3", name: "Larb Moo", desc: "Spicy minced pork salad with roasted rice powder, mint and shallots.", price: 85, emoji: "🥘", bg: "#FFF3E0", img: MEAL + "g7jomp1763763994.jpg" },
      ]},
      { section: "Noodles & Rice", items: [
        { id: "st4", name: "Pad Thai Shrimp", desc: "Wok-fried rice noodles with river prawns, tamarind sauce and bean sprouts.", price: 95, emoji: "🍤", bg: "#FFF8E1", img: MEAL + "rg9ze01763479093.jpg" },
        { id: "st5", name: "Sticky Rice", desc: "Warm Thai sticky rice in a bamboo basket.", price: 20, emoji: "🍚", bg: "#FFF8E1", img: MEAL + "kw92t41604181871.jpg" },
        { id: "st6", name: "Pad Krapow Moo + Egg", desc: "Stir-fried pork with holy basil and a crispy fried egg over rice.", price: 75, emoji: "🍳", bg: "#FFF8E1", img: MEAL + "el64dy1763483009.jpg" },
      ]},
      { section: "Drinks", items: [
        { id: "st7", name: "Thai Iced Tea", desc: "Sweet, creamy and very orange.", price: 40, emoji: "🧋", bg: "#FBE9E7", img: DRINK + "trvwpu1441245568.jpg" },
        { id: "st8", name: "Fresh Coconut", desc: "Chilled young coconut, straw included.", price: 55, emoji: "🥥", bg: "#FBE9E7", img: DRINK + "upgsue1668419912.jpg" },
      ]},
    ],
  },
  {
    id: "burger-bros",
    name: "Burger Bros",
    emoji: "🍔",
    img: MEAL + "44bzep1761848278.jpg",
    bg: "linear-gradient(135deg,#FFCDD2,#EF9A9A)",
    cuisine: "burger",
    cuisineLabel: "Burgers · American · Fries",
    rating: 4.6, ratings: "1.4k", time: 25, distance: 2.0,
    deliveryFee: 15, promo: "Free fries over ฿300", open: true,
    menu: [
      { section: "Signature Burgers", items: [
        { id: "bb1", name: "Double Smash Classic", desc: "Two smashed beef patties, American cheese, pickles, house sauce, potato bun.", price: 189, was: 219, emoji: "🍔", bg: "#FFEBEE", img: MEAL + "44bzep1761848278.jpg" },
        { id: "bb2", name: "Truffle Mushroom Melt", desc: "Beef patty, sautéed mushrooms, Swiss cheese, truffle mayo.", price: 215, emoji: "🍄", bg: "#FFEBEE", img: MEAL + "lgmnff1763789847.jpg" },
        { id: "bb3", name: "Crispy Chicken Deluxe", desc: "Buttermilk fried chicken thigh, slaw, spicy honey drizzle.", price: 169, emoji: "🍗", bg: "#FFEBEE", img: MEAL + "vdwloy1713225718.jpg" },
      ]},
      { section: "Sides", items: [
        { id: "bb4", name: "Loaded Cheese Fries", desc: "Crinkle fries, cheese sauce, bacon bits, jalapeños.", price: 119, emoji: "🍟", bg: "#FFF3E0", img: MEAL + "flrajf1762341295.jpg" },
        { id: "bb5", name: "Onion Rings", desc: "Beer-battered, extra crunchy, with ranch.", price: 89, emoji: "🧅", bg: "#FFF3E0", img: MEAL + "ul2uy31764794321.jpg" },
      ]},
      { section: "Shakes", items: [
        { id: "bb6", name: "Salted Caramel Shake", desc: "Hand-spun with vanilla ice cream and caramel ribbons.", price: 129, emoji: "🥤", bg: "#FFF8E1", img: DRINK + "861tzm1504784164.jpg" },
      ]},
    ],
  },
  {
    id: "napoli-slice",
    name: "Napoli Slice",
    emoji: "🍕",
    img: MEAL + "x0lk931587671540.jpg",
    bg: "linear-gradient(135deg,#C8E6C9,#A5D6A7)",
    cuisine: "pizza",
    cuisineLabel: "Pizza · Italian · Pasta",
    rating: 4.7, ratings: "980", time: 30, distance: 3.1,
    deliveryFee: 20, promo: null, open: true,
    menu: [
      { section: "Wood-fired Pizza", items: [
        { id: "np1", name: "Margherita D.O.P.", desc: "San Marzano tomato, fior di latte, fresh basil, olive oil.", price: 249, emoji: "🍕", bg: "#E8F5E9", img: MEAL + "x0lk931587671540.jpg" },
        { id: "np2", name: "Pepperoni Honey", desc: "Spicy pepperoni cups, mozzarella, hot honey drizzle.", price: 289, emoji: "🍕", bg: "#E8F5E9", img: FOODISH + "pizza/pizza14.jpg" },
        { id: "np3", name: "Quattro Formaggi", desc: "Mozzarella, gorgonzola, parmesan, taleggio. For cheese people.", price: 299, was: 329, emoji: "🧀", bg: "#E8F5E9", img: FOODISH + "pizza/pizza20.jpg" },
      ]},
      { section: "Pasta", items: [
        { id: "np4", name: "Carbonara", desc: "Guanciale, pecorino, egg yolk. No cream — we checked with Rome.", price: 219, emoji: "🍝", bg: "#FFF8E1", img: MEAL + "llcbn01574260722.jpg" },
        { id: "np5", name: "Truffle Tagliatelle", desc: "Fresh egg pasta, truffle cream, parmesan crisp.", price: 259, emoji: "🍝", bg: "#FFF8E1", img: MEAL + "0jv5gx1661040802.jpg" },
      ]},
      { section: "Dolci", items: [
        { id: "np6", name: "Tiramisu", desc: "Espresso-soaked ladyfingers, mascarpone, cocoa.", price: 139, emoji: "🍮", bg: "#EFEBE9", img: MEAL + "1549542877.jpg" },
      ]},
    ],
  },
  {
    id: "sakura-sushi",
    name: "Sakura Sushi & Bowl",
    emoji: "🍣",
    img: MEAL + "g046bb1663960946.jpg",
    bg: "linear-gradient(135deg,#F8BBD0,#F48FB1)",
    cuisine: "japanese",
    cuisineLabel: "Japanese · Sushi · Donburi",
    rating: 4.9, ratings: "3.3k", time: 35, distance: 4.2,
    deliveryFee: 25, promo: "฿0 delivery over ฿500", open: true,
    menu: [
      { section: "Sushi Sets", items: [
        { id: "sk1", name: "Salmon Lover Set (10 pcs)", desc: "Salmon nigiri, salmon roll, salmon sashimi. We like salmon.", price: 329, was: 379, emoji: "🍣", bg: "#FCE4EC", img: MEAL + "g046bb1663960946.jpg" },
        { id: "sk2", name: "Chef's Omakase (12 pcs)", desc: "Daily selection of nigiri and maki by our head chef.", price: 459, emoji: "🍱", bg: "#FCE4EC", img: MEAL + "prrirc1763781360.jpg" },
      ]},
      { section: "Rice Bowls", items: [
        { id: "sk3", name: "Salmon Ikura Don", desc: "Torched salmon, ikura, onsen egg over sushi rice.", price: 289, emoji: "🍚", bg: "#FFF8E1", img: MEAL + "xxyupu1468262513.jpg" },
        { id: "sk4", name: "Chicken Katsu Curry", desc: "Crispy panko chicken with Japanese curry and rice.", price: 189, emoji: "🍛", bg: "#FFF8E1", img: MEAL + "vwrpps1503068729.jpg" },
        { id: "sk5", name: "Gyudon", desc: "Simmered beef and onion over rice, temomi-style.", price: 169, emoji: "🥩", bg: "#FFF8E1", img: MEAL + "d8f6qx1604182128.jpg" },
      ]},
      { section: "Sides & Drinks", items: [
        { id: "sk6", name: "Miso Soup", desc: "Tofu, wakame, spring onion.", price: 45, emoji: "🍲", bg: "#FFF3E0", img: MEAL + "1529446137.jpg" },
        { id: "sk7", name: "Matcha Latte", desc: "Ceremonial grade matcha, your choice of milk.", price: 95, emoji: "🍵", bg: "#E8F5E9", img: DRINK + "jogv4w1487603571.jpg" },
      ]},
    ],
  },
  {
    id: "sweet-cloud",
    name: "Sweet Cloud Café",
    emoji: "🍰",
    img: MEAL + "swttys1511385853.jpg",
    bg: "linear-gradient(135deg,#D1C4E9,#B39DDB)",
    cuisine: "dessert",
    cuisineLabel: "Dessert · Cakes · Bingsu",
    rating: 4.5, ratings: "760", time: 20, distance: 1.8,
    deliveryFee: 10, promo: "Buy 1 Get 1 bingsu", open: true,
    menu: [
      { section: "Cakes", items: [
        { id: "sc1", name: "Basque Burnt Cheesecake", desc: "Caramelized top, molten center. Slice of happiness.", price: 145, emoji: "🍰", bg: "#EDE7F6", img: MEAL + "swttys1511385853.jpg" },
        { id: "sc2", name: "Dark Chocolate Fudge", desc: "70% dark chocolate layer cake with ganache.", price: 135, emoji: "🍫", bg: "#EDE7F6", img: MEAL + "tqtywx1468317395.jpg" },
      ]},
      { section: "Bingsu & Ice cream", items: [
        { id: "sc3", name: "Mango Sticky Rice Bingsu", desc: "Shaved milk ice, fresh mango, sticky rice, coconut cream.", price: 185, was: 220, emoji: "🥭", bg: "#FFF8E1", img: MEAL + "8hx4fi1780087744.jpg" },
        { id: "sc4", name: "Strawberry Cloud Bingsu", desc: "Strawberries, condensed milk snow, berry coulis.", price: 195, emoji: "🍓", bg: "#FFF8E1", img: MEAL + "uuxwvq1483907861.jpg" },
      ]},
      { section: "Drinks", items: [
        { id: "sc5", name: "Brown Sugar Boba Milk", desc: "Chewy pearls, caramelized brown sugar, fresh milk.", price: 89, emoji: "🧋", bg: "#EFEBE9", img: DRINK + "vqwryq1441245927.jpg" },
      ]},
    ],
  },
  {
    id: "daily-grind",
    name: "The Daily Grind",
    emoji: "☕",
    img: MEAL + "rwuyqx1511383174.jpg",
    bg: "linear-gradient(135deg,#D7CCC8,#BCAAA4)",
    cuisine: "coffee",
    cuisineLabel: "Coffee · Brunch · Bakery",
    rating: 4.4, ratings: "540", time: 15, distance: 0.8,
    deliveryFee: 0, promo: null, open: true,
    menu: [
      { section: "Coffee", items: [
        { id: "dg1", name: "Iced Latte", desc: "Double shot espresso, fresh milk over ice.", price: 75, emoji: "🥤", bg: "#EFEBE9", img: DRINK + "ytprxy1454513855.jpg" },
        { id: "dg2", name: "Es Yen (Thai Style)", desc: "Strong espresso, condensed milk, evaporated milk. Sweet & bold.", price: 65, emoji: "☕", bg: "#EFEBE9", img: DRINK + "wquwxs1441247025.jpg" },
        { id: "dg3", name: "Orange Coffee", desc: "Espresso shaken with fresh orange juice. Trust us.", price: 95, emoji: "🍊", bg: "#FFF3E0", img: DRINK + "ttyrxr1454514759.jpg" },
      ]},
      { section: "Brunch", items: [
        { id: "dg4", name: "Avocado Toast", desc: "Sourdough, smashed avo, poached egg, chili flakes.", price: 159, emoji: "🥑", bg: "#E8F5E9", img: MEAL + "1550440197.jpg" },
        { id: "dg5", name: "Butter Croissant", desc: "Baked every morning. Flaky beyond reason.", price: 79, emoji: "🥐", bg: "#FFF8E1", img: MEAL + "7mxnzz1593350801.jpg" },
      ]},
    ],
  },
  {
    id: "green-bowl",
    name: "Green Bowl",
    emoji: "🥗",
    img: MEAL + "1549542994.jpg",
    bg: "linear-gradient(135deg,#DCEDC8,#C5E1A5)",
    cuisine: "healthy",
    cuisineLabel: "Healthy · Salads · Poke",
    rating: 4.6, ratings: "890", time: 22, distance: 2.4,
    deliveryFee: 15, promo: "15% off salads", open: true,
    menu: [
      { section: "Signature Bowls", items: [
        { id: "gb1", name: "Salmon Poke Bowl", desc: "Cubed salmon, edamame, avocado, sushi rice, shoyu dressing.", price: 219, was: 249, emoji: "🐟", bg: "#F1F8E9", img: MEAL + "1549542994.jpg" },
        { id: "gb2", name: "Grilled Chicken Caesar", desc: "Romaine, herb chicken, parmesan, light caesar dressing.", price: 179, emoji: "🥗", bg: "#F1F8E9", img: MEAL + "zry07j1763779321.jpg" },
        { id: "gb3", name: "Falafel Hummus Bowl", desc: "Crispy falafel, hummus, quinoa, pickled onions, tahini.", price: 169, emoji: "🧆", bg: "#F1F8E9", img: MEAL + "u5e9qq1763795441.jpg" },
      ]},
      { section: "Cold-pressed Juice", items: [
        { id: "gb4", name: "Green Detox", desc: "Kale, green apple, cucumber, lemon, ginger.", price: 99, emoji: "🥬", bg: "#E8F5E9", img: DRINK + "metwgh1606770327.jpg" },
        { id: "gb5", name: "Sunrise Carrot", desc: "Carrot, orange, turmeric.", price: 89, emoji: "🥕", bg: "#FFF3E0", img: DRINK + "quqyqp1480879103.jpg" },
      ]},
    ],
  },
  {
    id: "midnight-wok",
    name: "Midnight Wok",
    emoji: "🥡",
    img: MEAL + "1529444830.jpg",
    bg: "linear-gradient(135deg,#B0BEC5,#90A4AE)",
    cuisine: "thai",
    cuisineLabel: "Chinese · Wok · Late night",
    rating: 4.3, ratings: "410", time: 40, distance: 5.0,
    deliveryFee: 30, promo: null, open: false,
    menu: [
      { section: "Wok Favourites", items: [
        { id: "mw1", name: "Beef Hor Fun", desc: "Smoky flat rice noodles with tender beef and bean sprouts.", price: 129, emoji: "🍜", bg: "#ECEFF1", img: MEAL + "1529444830.jpg" },
        { id: "mw2", name: "Salt & Pepper Tofu", desc: "Crispy tofu tossed with garlic, chili and spring onion.", price: 99, emoji: "🥡", bg: "#ECEFF1", img: MEAL + "1525874812.jpg" },
      ]},
    ],
  },
];

// promo codes: code -> { type, value, label }
const PROMO_CODES = {
  WELCOME50: { type: "percent", value: 50, max: 100, label: "50% off (max ฿100)" },
  FREEDEL:   { type: "freedel", value: 0, label: "Free delivery" },
  BOBA11:    { type: "flat", value: 89, label: "฿89 off (B1G1 boba)" },
  LUNCH60:   { type: "flat", value: 60, label: "฿60 off lunch" },
};

// order status flow: [key, label, seconds in this stage]
const ORDER_FLOW = [
  ["confirmed", "Order confirmed", 6],
  ["preparing", "Restaurant is preparing your food", 14],
  ["pickup", "Driver is heading to the restaurant", 10],
  ["delivering", "Your food is on the way", 18],
  ["delivered", "Delivered. Enjoy your meal!", 0],
];

const DRIVERS = [
  { name: "Somchai P.", vehicle: "Honda Wave · 1กข 4523", rating: 4.9, photo: "https://randomuser.me/api/portraits/men/32.jpg" },
  { name: "Anan K.", vehicle: "Yamaha Fino · 2ขค 8810", rating: 4.8, photo: "https://randomuser.me/api/portraits/men/75.jpg" },
  { name: "Malee S.", vehicle: "Honda Click · 3คง 1276", rating: 5.0, photo: "https://randomuser.me/api/portraits/women/44.jpg" },
];
