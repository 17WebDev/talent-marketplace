export function formatName(
  firstName: string | undefined,
  lastName: string | undefined
): string {
  if (!firstName) return '';

  return `${firstName} ${lastName ? `${lastName.charAt(0)}.` : ''}`;
}
