// Typed menus for Clark's in-store kitchens, transcribed from the printed
// menu boards in src/assets/images/menus/. Prices/items change in-store first —
// update here when new boards ship.

export type MenuItem = {
  name: string
  price?: string
  note?: string
}

export type MenuSection = {
  title: string
  note?: string
  items: MenuItem[]
}

export type FoodBrandDef = {
  slug: string
  name: string
  /** kitchen name as it appears in stores.index.json (for store matching) */
  kitchenName: string
  tagline: string
  blurb: string
  /** brand folder under src/assets/images/menus/ (menu-board photos) */
  menuAssetKey: string
  sections: MenuSection[]
}

export const FOOD_BRANDS: FoodBrandDef[] = [
  {
    slug: 'krispy-krunchy',
    name: 'Krispy Krunchy Chicken',
    kitchenName: 'Krispy Krunchy Chicken',
    tagline: 'Freshly made. Perfectly Cajun.',
    blurb:
      'Hand-breaded Louisiana-style chicken, jumbo tenders, honey biscuits, and Cajun sides — cooked fresh throughout the day.',
    menuAssetKey: 'krispy-krunchy',
    sections: [
      {
        title: 'Hand-Breaded Chicken',
        note: 'Krunch Box includes a regular side + biscuit',
        items: [
          { name: '2 pc Krunch Box', price: '$7.99' },
          { name: '3 pc Krunch Box', price: '$9.99' },
          { name: '4 pc Krunch Box', price: '$11.99' },
          { name: '2 pc Chicken + Biscuit', price: '$5.99' },
          { name: '3 pc Chicken + Biscuit', price: '$7.99' },
          { name: '4 pc Chicken + Biscuit', price: '$9.99' }
        ]
      },
      {
        title: 'Hand-Breaded Jumbo Tenders',
        note: 'Krunch Box includes a regular side + biscuit',
        items: [
          { name: '3 pc Krunch Box', price: '$9.49' },
          { name: '4 pc Krunch Box', price: '$10.99' },
          { name: '6 pc Krunch Box', price: '$13.99' },
          { name: '3 pc Tenders + Biscuit', price: '$7.49' },
          { name: '4 pc Tenders + Biscuit', price: '$8.99' },
          { name: '6 pc Tenders + Biscuit', price: '$11.99' }
        ]
      },
      {
        title: 'Chicken Nuggets',
        items: [
          { name: '6 pc Krunch Box', price: '$6.99', note: 'regular side + biscuit' },
          { name: '10 pc Krunch Box', price: '$8.99', note: 'regular side + biscuit' },
          { name: '6 pc Nuggets + Biscuit', price: '$5.49' },
          { name: '10 pc Nuggets + Biscuit', price: '$7.49' }
        ]
      },
      {
        title: 'Sandwich, Wings & Shrimp',
        items: [
          { name: 'Cajun Chicken Sandwich Krunch Box', price: '$7.39', note: 'regular side' },
          { name: 'Cajun Chicken Sandwich Only', price: '$5.39' },
          { name: '5 pc Traditional Wings', price: '$8.99', note: 'Krispy, Buffalo or Sweet & Sour' },
          { name: '10 pc Traditional Wings', price: '$16.99' },
          { name: '20 pc Traditional Wings', price: '$30.99' },
          { name: '5 pc Honey Butter Shrimp', price: '$5.39' },
          { name: '10 pc Honey Butter Shrimp', price: '$8.59' }
        ]
      },
      {
        title: 'Family Meals',
        items: [
          {
            name: 'Chicken + Tenders Family Meal',
            price: '$43.99',
            note: '12 pc chicken, 6 tenders, 6 biscuits & family wedges'
          },
          { name: 'Chicken Family Meal', price: '$27.99', note: '12 pc chicken, 6 biscuits & family wedges' },
          { name: 'Tenders Family Meal', price: '$29.99', note: '12 tenders, 6 biscuits & family wedges' },
          { name: '8 pc Chicken', price: '$17.99' },
          { name: '12 pc Chicken', price: '$23.99' },
          { name: '16 pc Chicken', price: '$29.99' },
          { name: '8 pc Tenders', price: '$14.99' },
          { name: '12 pc Tenders', price: '$22.99' },
          { name: '16 pc Tenders', price: '$27.99' }
        ]
      },
      {
        title: 'Sides & Biscuits',
        note: 'Dipping sauces: Signature Krunch, Ranch, Sweet & Sour, Barbecue, Honey Mustard, Buffalo',
        items: [
          { name: 'Mashed Potatoes & Gravy', price: '$2.79 / $4.99', note: 'regular / large' },
          { name: 'Mac & Cheese', price: '$2.79 / $4.99', note: 'regular / large' },
          { name: 'Jambalaya', price: '$2.79 / $4.99', note: 'regular / large' },
          { name: 'Red Beans & Rice', price: '$2.79 / $4.99', note: 'regular / large' },
          { name: 'Wedges', price: '$1.99 / $3.99 / $4.99', note: 'regular / large / family' },
          { name: 'Honey Biscuits', price: '$0.99 / $1.99 / $4.99', note: '1 / 2 / 6' },
          { name: 'Extra Dipping Sauce', price: '$0.69' }
        ]
      }
    ]
  },
  {
    slug: 'hangar-54',
    name: 'Hangar 54 Pizza',
    kitchenName: 'Hangar 54',
    tagline: 'Hot from the oven — slices and whole pies.',
    blurb:
      'Fresh-made pizza in two sizes: grab a 7" personal for the road or a 14" pie for the crew. Breakfast pizza in the morning, First Class combos all day.',
    menuAssetKey: 'hangar54',
    sections: [
      {
        title: '1-Topping Pizzas',
        note: '14" $12.00 · 7" personal $4.99',
        items: [
          { name: '5 Cheese Blend' },
          { name: 'Pepperoni' },
          { name: 'Italian Sausage' },
          { name: 'Bacon' },
          { name: 'Chicken' }
        ]
      },
      {
        title: 'First Class Pizzas',
        note: '14" $15.00 · 7" personal $5.99',
        items: [
          { name: '3 Meat Pizza', note: 'pepperoni, Italian sausage & bacon' },
          { name: 'BBQ Chicken' },
          { name: 'Buffalo Chicken' },
          { name: 'Chicken Bacon Ranch' },
          { name: "You're the Pilot", note: 'pick up to 5 toppings' }
        ]
      },
      {
        title: 'Breakfast Pizza',
        note: 'Fuel your breakfast — mornings only',
        items: [
          {
            name: 'Sausage Gravy with Bacon, Egg & Cheese',
            price: '14" $15.00 · 7" $5.99'
          }
        ]
      },
      {
        title: 'Extras',
        items: [{ name: 'Sauce Cup — dip, dunk or drizzle', price: '$0.69' }]
      }
    ]
  },
  {
    slug: 'clarks-cafe',
    name: "Clark's Café",
    kitchenName: "Clark's Café",
    tagline: 'Freshly made, just for you.',
    blurb:
      'Scratch breakfast served hot: biscuits and gravy, breakfast sandwiches stacked your way, omelets, and coffee to match.',
    menuAssetKey: 'clarks-cafe',
    sections: [
      {
        title: 'Café Favorites',
        items: [
          {
            name: 'Café Special',
            price: '$5.99',
            note: '2 eggs, 1 biscuit with gravy, 1 sausage or 3 bacon strips'
          },
          { name: 'Egg Breakfast — 1 egg', price: '$3.99', note: 'choice of meat, biscuit or toast' },
          { name: 'Egg Breakfast — 2 eggs', price: '$4.99', note: 'choice of meat, biscuit or toast' },
          { name: 'Loaded Breakfast Burrito', price: '$3.59' },
          { name: 'Omelet with Cheese', price: '$2.99' },
          { name: 'Omelet with Meat & Cheese', price: '$3.99' },
          { name: 'Biscuit & Gravy', price: '$2.29' },
          { name: '2 Biscuits & Gravy', price: '$3.29' },
          { name: 'BLT on Toast — 3 bacon', price: '$3.59' },
          { name: 'BLT on Toast — 6 bacon', price: '$5.29' }
        ]
      },
      {
        title: 'Biscuits & Toast',
        note: 'On a fresh biscuit or toast — add egg or cheese to any',
        items: [
          { name: 'Egg', price: '$1.99' },
          { name: 'Sausage Patty', price: '$2.59', note: '+ egg $3.09 · + egg & cheese $3.49' },
          { name: '3 Bacon Strips', price: '$2.99', note: '+ egg $3.49 · + egg & cheese $3.89' },
          { name: 'Ham', price: '$2.49', note: '+ egg $3.19 · + egg & cheese $3.59' },
          { name: 'Chicken Strip', price: '$2.79', note: '+ egg $3.49 · + egg & cheese $3.89' },
          { name: 'Pork Tenderloin', price: '$3.69', note: '+ egg $3.89 · + egg & cheese $4.29' },
          { name: 'Bologna', price: '$2.99', note: '+ egg & cheese $3.79' },
          { name: 'Breaded Beef Steak', price: '$3.49', note: '+ egg $3.99 · + egg & cheese $4.39' },
          { name: 'Split Smoked Sausage', price: '$2.99', note: '+ egg $3.69 · + egg & cheese $4.09' },
          { name: 'Big T', price: '$2.99' }
        ]
      },
      {
        title: 'Sides & Extras',
        items: [
          { name: 'Hashbrown', price: '$1.49' },
          { name: 'Ham & Cheese Stuffed Hashbrown', price: '$3.29' },
          { name: 'Sausage & Gravy Stuffed Hashbrown', price: '$3.29' },
          { name: 'Sausage, Egg & Cheese Stuffed Waffle', price: '$3.29' },
          { name: 'Blueberry Pancake on a Stick', price: '$1.99' },
          { name: 'Biscuit', price: '$1.19' },
          { name: 'Toast Slice', price: '$0.99' },
          { name: 'Egg', price: '$1.09' },
          { name: 'Gravy', price: '$1.29' },
          { name: 'Cheese', price: '$0.59' }
        ]
      }
    ]
  },
  {
    slug: 'champs',
    name: 'Champs Chicken',
    kitchenName: 'Champs Chicken',
    tagline: 'Be a mealtime hero.',
    blurb:
      'Crispy tenders, the Real Champ sandwich, seafood boxes, and homestyle sides — every box comes with battered fries and Sassy Sauce.',
    menuAssetKey: 'champs',
    sections: [
      {
        title: 'Chicken Boxes',
        note: 'Every box includes battered fries & Sassy Sauce',
        items: [
          { name: 'The Real Champ Sandwich Box', price: '$7.99', note: 'sandwich only $5.99' },
          { name: '2 pc Tenders Box', price: '$6.99', note: 'chicken only $3.99' },
          { name: '3 pc Tenders Box', price: '$8.79', note: 'chicken only $5.99' },
          { name: '8 pc Dippers Box', price: '$7.49', note: 'chicken only $5.49' }
        ]
      },
      {
        title: 'Seafood Boxes',
        items: [
          { name: '1 pc Fish Box', price: '$6.99', note: 'fish only $4.99' },
          { name: '6 pc Shrimp Box', price: '$8.99', note: 'shrimp only $6.99' }
        ]
      },
      {
        title: 'Bone-In Favorites',
        items: [
          { name: 'Livers Box', price: '$6.49', note: 'chicken only $4.99' },
          { name: 'Gizzards Box', price: '$6.49', note: 'chicken only $4.99' }
        ]
      },
      {
        title: 'Bowls & Family Meals',
        items: [
          {
            name: 'Dipper Bowl',
            price: '$7.49',
            note: 'dippers, mashed potatoes, corn, gravy & cheese'
          },
          {
            name: '8 pc Tenders Family Meal',
            price: '$29.99',
            note: 'serves 4 — 2 large sides & 4 biscuits'
          },
          { name: 'Family Meal — Chicken Only', price: '$16.99' }
        ]
      },
      {
        title: 'Sides',
        note: 'Make any box a BIG box (+1 regular side & biscuit) for $3.00',
        items: [
          { name: 'French Fries', price: '$2.49 / $5.49', note: 'regular / large' },
          { name: 'Potato Wedges', price: '$2.99 / $5.99', note: 'regular / large' },
          { name: 'Mac & Cheese', price: '$2.99 / $5.99', note: 'regular / large' },
          { name: 'Mashed Potatoes', price: '$2.99 / $5.99', note: 'regular / large' },
          { name: 'Sweet Corn', price: '$2.99 / $5.99', note: 'regular / large' },
          { name: 'Green Beans', price: '$2.99 / $5.99', note: 'regular / large' },
          { name: 'Hushpuppies', price: '$2.99 / $5.99', note: 'regular / large' }
        ]
      }
    ]
  },
  {
    slug: 'coopers',
    name: "Cooper's Express",
    kitchenName: "Cooper's Express",
    tagline: 'Big & juicy, famous fried chicken.',
    blurb:
      'The Big & Juicy chicken sandwich, tenders, crispy fish, and local favorites like livers and gizzards — boxes come with battered fries and dipping sauce.',
    menuAssetKey: 'coopers',
    sections: [
      {
        title: 'Chicken Boxes',
        note: 'Every box includes battered fries & dipping sauce',
        items: [
          { name: 'Big & Juicy Chicken Sandwich Box', price: '$7.99', note: 'sandwich only $5.99' },
          { name: '2 pc Tenders Box', price: '$6.99', note: 'chicken only $3.99' },
          { name: '3 pc Tenders Box', price: '$8.79', note: 'chicken only $5.99' },
          { name: '8 pc Dippers Box', price: '$7.49', note: 'chicken only $5.49' }
        ]
      },
      {
        title: 'Seafood Boxes',
        items: [
          { name: '1 pc Crispy Fish Box', price: '$6.99', note: 'fish only $4.99' },
          { name: '6 pc Shrimp Box', price: '$8.99', note: 'shrimp only $6.99' }
        ]
      },
      {
        title: 'Local Favorites',
        items: [
          { name: 'Livers Box', price: '$6.49', note: 'chicken only $4.49' },
          { name: 'Gizzards Box', price: '$6.49', note: 'chicken only $4.49' }
        ]
      },
      {
        title: 'Bowls & Family Meals',
        items: [
          {
            name: 'Dipper Bowl',
            price: '$7.49',
            note: 'dippers, mashed potatoes, corn, gravy & cheese'
          },
          {
            name: '8 Tenders Family Meal',
            price: '$29.99',
            note: 'serves 4 — 2 large sides, 4 biscuits & sauce'
          },
          { name: 'Family Meal — Chicken Only & Sauce', price: '$16.99' }
        ]
      },
      {
        title: 'Sides',
        note: 'Make any box a BIG box (+1 regular side & biscuit) for $3.00',
        items: [
          { name: 'Battered Fries', price: '$2.49 / $5.49', note: 'regular / large' },
          { name: 'Potato Wedges', price: '$2.99 / $5.99', note: 'regular / large' },
          { name: 'Mac & Cheese', price: '$2.99 / $5.99', note: 'regular / large' },
          { name: 'Mashed Potatoes', price: '$2.99 / $5.99', note: 'regular / large' },
          { name: 'Sweet Corn', price: '$2.99 / $5.99', note: 'regular / large' },
          { name: 'Green Beans', price: '$2.99 / $5.99', note: 'regular / large' },
          { name: 'Hushpuppies', price: '$2.99 / $5.99', note: 'regular / large' }
        ]
      }
    ]
  }
]

export function getBrandBySlug(slug?: string): FoodBrandDef | undefined {
  return FOOD_BRANDS.find(b => b.slug === slug)
}
