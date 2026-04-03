// All numbers 1-100. true = available, false = claimed.
function makeNumbers(availableList) {
  const obj = {};
  for (let i = 1; i <= 100; i++) {
    obj[i] = availableList.includes(i);
  }
  return obj;
}

const available003 = [
  3, 5, 8, 11, 14, 17, 19, 22, 25, 27, 31, 33, 36, 38, 41,
  44, 47, 49, 52, 54, 57, 59, 62, 65, 68, 71, 74, 76, 79, 82,
  85, 87, 90, 93, 96, 98,
];

export const drops = [
  {
    id: 'drop-003',
    number: 3,
    name: 'Drop 003 — Heavyweight Tee',
    status: 'live',
    description: '360gsm heavyweight cotton. Oversized fit. Pre-washed for softness. Built to last, not to be replaced.',
    price: 285,
    currency: 'AED',
    totalUnits: 100,
    colourways: [
      { id: 'onyx',  name: 'Onyx Black',  hex: '#1a1a1a', stock: 12 },
      { id: 'ivory', name: 'Ivory White',  hex: '#f0ede8', stock: 0  },
      { id: 'olive', name: 'Olive Fade',   hex: '#3a3a2a', stock: 55 },
    ],
    numbers: makeNumbers(available003),
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  },
  {
    id: 'drop-002',
    number: 2,
    name: 'Drop 002 — Midweight Tee',
    status: 'vault',
    description: '280gsm midweight cotton. Regular fit. Garment dyed.',
    price: 265,
    currency: 'AED',
    totalUnits: 100,
    colourways: [
      { id: 'slate', name: 'Slate Grey',  hex: '#4a4a4a', stock: 8 },
      { id: 'bone',  name: 'Bone',        hex: '#e8e0d5', stock: 3 },
    ],
    numbers: makeNumbers([4, 17, 34, 51, 67, 83, 89, 95, 99, 100, 7, 23]),
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  },
  {
    id: 'drop-001',
    number: 1,
    name: 'Drop 001 — Original Tee',
    status: 'soldout',
    description: '320gsm heavyweight cotton. Boxy fit.',
    price: 250,
    currency: 'AED',
    totalUnits: 100,
    colourways: [
      { id: 'black', name: 'Black', hex: '#111111', stock: 0 },
    ],
    numbers: makeNumbers([]),
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  },
];

export const currentDrop = drops.find(d => d.status === 'live');
export const vaultDrops  = drops.filter(d => d.status === 'vault' || d.status === 'soldout');
