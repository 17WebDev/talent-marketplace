export function formatName(name: string | undefined): string {
  if (!name) return '';

  const nameParts = name.trim().split(' ');

  const firstName = nameParts[0];
  const lastName =
    nameParts.length > 1 ? nameParts[nameParts.length - 1] : undefined;

  return `${firstName} ${lastName ? `${lastName.charAt(0)}.` : ''}`;
}
