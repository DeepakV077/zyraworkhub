// Generates a rounded SVG avatar with gold gradient and initials
// Returns a data URL that can be used as an <img src>
export function generateAvatarDataUrl(name: string, size = 96): string {
  const initials = getInitials(name);
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
  <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
    <defs>
      <linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#ff7b00"/>
        <stop offset="100%" stop-color="#ffd700"/>
      </linearGradient>
      <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
        <feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="#000" flood-opacity="0.15" />
      </filter>
    </defs>
    <circle cx="${size/2}" cy="${size/2}" r="${size/2 - 2}" fill="url(#grad)" filter="url(#shadow)" />
    <text x="50%" y="50%" text-anchor="middle" dominant-baseline="central"
          font-family="Inter, Poppins, Arial, Helvetica, sans-serif"
          font-weight="700" font-size="${Math.round(size*0.42)}" fill="#ffffff">${initials}</text>
  </svg>`;

  const encoded = encodeURIComponent(svg)
    .replace(/'/g, "%27")
    .replace(/\(/g, "%28")
    .replace(/\)/g, "%29");
  return `data:image/svg+xml;charset=UTF-8,${encoded}`;
}

export function getInitials(name: string): string {
  if (!name) return "ZU"; // Zyra User
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const first = parts[0]?.[0] ?? "Z";
  const second = parts.length > 1 ? parts[parts.length - 1][0] : (parts[0]?.[1] ?? "U");
  return `${first}${second}`.toUpperCase();
}
