interface RGBColor {
  readonly r: string;
  readonly g: string;
  readonly b: string;
}

interface HSLColor {
  readonly h: number;
  readonly s: number;
  readonly l: number;
}

export const generatePastelColor = (): string => {
  const { r, g, b } = generateRGBColor();
  return `#${r}${g}${b}`;
};

const generateRGBColor = (): RGBColor => {
  const { h, s, l } = generateHSLColor();
  return hslToRgb(h, s, l);
};

const generateHSLColor = (): HSLColor => {
  const h = Math.floor(Math.random() * 360);
  const s = Math.floor(Math.random() * 31) + 70;
  const l = Math.floor(Math.random() * 21) + 70;
  return { h, s, l };
};

const hslToRgb = (h: number, s: number, l: number): RGBColor => {
  s /= 100;
  l /= 100;

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));

  const [r, g, b] = calculateRGBValues(h, c, x);

  const hexR = Math.round(r * 255).toString(16);
  const hexG = Math.round(g * 255).toString(16);
  const hexB = Math.round(b * 255).toString(16);

  return {
    r: hexR.padStart(2, '0'),
    g: hexG.padStart(2, '0'),
    b: hexB.padStart(2, '0'),
  };
};

const calculateRGBValues = (h: number, c: number, x: number): [number, number, number] => {
  if (0 <= h && h < 60) {
    return [c, x, 0];
  } else if (60 <= h && h < 120) {
    return [x, c, 0];
  } else if (120 <= h && h < 180) {
    return [0, c, x];
  } else if (180 <= h && h < 240) {
    return [0, x, c];
  } else if (240 <= h && h < 300) {
    return [x, 0, c];
  } else if (300 <= h && h < 360) {
    return [c, 0, x];
  } else {
    return [0, 0, 0];
  }
};
