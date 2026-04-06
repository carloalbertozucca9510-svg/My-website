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
    name: 'Vistoria Evening Clutch — Drop 001',
    status: 'live',
    description: 'Structured. Minimal. Architectural. Designed to be carried once and remembered always. Each piece is produced in a single run of 100 — no reorders, no restocks.',
    price: 7500,
    currency: 'AED',
    totalUnits: 100,
    material: 'To be confirmed',
    dimensions: '24–26 cm × 13–15 cm × 4–5 cm',
    reservationType: 'engraved',
    colourways: [
      {
        id: 'onyx',
        name: 'Onyx Black',
        hex: '#1a1a1a',
        stock: 80,
        images: [
          { id: 'front',    label: 'Front',     src: null },
          { id: 'back',     label: 'Back',      src: null },
          { id: 'detail-1', label: 'Detail 01', src: null },
          { id: 'detail-2', label: 'Detail 02', src: null },
        ],
      },
    ],
    numbers: makeNumbers(available001),
  },
  {
    id: 'drop-002',
    number: 2,
    name: 'Vistoria Evening Clutch — Drop 002',
    status: 'vault',
    description: 'The second edition. Structured leather body, hand-finished edges, silk lining. Produced in a single run of 100.',
    price: 7500,
    currency: 'AED',
    totalUnits: 100,
    material: 'Full-grain leather',
    dimensions: '24–26 cm × 13–15 cm × 4–5 cm',
    reservationType: 'engraved',
    colourways: [
      { id: 'ivory', name: 'Ivory', hex: '#e8e0d5', stock: 8 },
      { id: 'slate', name: 'Slate', hex: '#4a4a4a', stock: 4 },
    ],
    numbers: makeNumbers([4, 17, 34, 51, 67, 83, 89, 95, 99, 100, 7, 23]),
  },
  {
    id: 'drop-000',
    number: 0,
    name: 'Vistoria Evening Clutch — Drop 000',
    status: 'soldout',
    description: 'The original edition. Where the number began.',
    price: 6500,
    currency: 'AED',
    totalUnits: 100,
    material: 'Satin-finish leather',
    dimensions: '22–24 cm × 12–14 cm × 4–5 cm',
    reservationType: 'engraved',
    colourways: [
      { id: 'noir', name: 'Noir', hex: '#111111', stock: 0 },
    ],
    numbers: makeNumbers([]),
  },
];

export const currentDrop = drops.find(d => d.status === 'live');
export const vaultDrops  = drops.filter(d => d.status === 'vault' || d.status === 'soldout');
