export default function unicodeToEmoji(unicode) {
  const codePoints = unicode.toUpperCase().split(' ').map((u) => `0x${u.substr(2)}`);
  return String.fromCodePoint(...codePoints);
}
