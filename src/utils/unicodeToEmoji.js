export default function unicodeToEmoji(unicode) {
  if (unicode === undefined) {
    return '';
  }
  const codePoints = unicode.toUpperCase().split(' ').map((u) => `0x${u.substr(2)}`);
  return String.fromCodePoint(...codePoints);
}
