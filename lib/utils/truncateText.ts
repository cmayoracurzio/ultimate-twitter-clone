export function truncateText(input: string, maxTextLength: number): string {
  let truncated = input.substring(0, maxTextLength);
  // Remove the word that's been cut in half by the substring
  truncated = truncated.substring(0, truncated.lastIndexOf(" "));

  return `${truncated}... `;
}
