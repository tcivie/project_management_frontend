/* eslint-disable no-bitwise */
export default function stringToRGB(str) {
  // Calculate the hash code of the string
  let hash = 0;
  for (let i = 0; i < str.length; i += 1) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  // Generate the RGB values based on the hash code
  const r = (hash & 0xFF0000) >> 16;
  const g = (hash & 0x00FF00) >> 8;
  const b = hash & 0x0000FF;

  // Return the RGB string
  return `rgb(${r}, ${g}, ${b})`;
}
