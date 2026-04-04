// All numbers 1-100. true = available, false = claimed.
function makeNumbers(availableList) {
  const obj = {};
  for (let i = 1; i <= 100; i++) {
    obj[i] = availableList.includes(i);
  }
  return obj;
}

// Numbers 1–20 are claimed (20 claimed), 21–100 are available (80 remaining)
const available001 = [
  21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
  31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
  41, 42, 43, 44, 45, 46, 47, 48, 49, 50,
  51, 52, 53, 54, 55, 56, 57, 58, 59, 60,
  61, 62, 63, 64, 65, 66, 67, 68, 69, 70,
  71, 72, 73, 74, 75, 76, 77, 78, 79, 80,
  81, 82, 83, 84, 85, 86, 87, 88, 89, 90,
  91, 92, 93, 94, 95, 96, 97, 98, 99, 100,
];

export const drops = [
  {
    id: 'drop-001',
    number: 1,
    name: 'Drop 001 — Heavyweight Tee',
    status: 'live',
    description: '360gsm heavyweight cotton. Relaxed fit. Pre-washed for softness. Built to last, not to be replaced.',
    price: 450,
    currency: 'AED',
    totalUnits: 100,
    colourways: [
      { id: 'onyx',  name: 'Onyx Black',   hex: '#1a1a1a', stock: 25 },
      { id: 'ivory', name: 'Ivory White',   hex: '#f0ede8', stock: 0  },
      { id: 'olive', name: 'Midnight Navy', hex: '#1a1f3a', stock: 55 },
    ],
    numbers: makeNumbers(available001),
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  },
  {
    id: 'drop-002',
    number: 2,
    name: 'Drop 002 — Midweight Tee',
    status: 'vault',
    description: '280gsm midweight cotton. Regular fit. Garment dyed.',
    price: 450,
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
    id: 'drop-000',
    number: 0,
    name: 'Drop 000 — Original Tee',
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
