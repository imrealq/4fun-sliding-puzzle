export const IMAGE_3X3 = '/src/assets/images/default-3x3.svg';
export const IMAGE_4X4 = '/src/assets/images/default.svg';
export const IMAGE_5X5 = '/src/assets/images/default-5x5.svg';

export const IMAGE_PRESETS = [
  {
    id: 'easy',
    label: '3 × 3',
    src: IMAGE_3X3,
  },
  {
    id: 'normal',
    label: '4 × 4',
    src: IMAGE_4X4,
  },
  {
    id: 'hard',
    label: '5 × 5',
    src: IMAGE_5X5,
  },
] as const;
