import React from 'react';
import heroPastel from '../assets/images/hero_pastel_banner_1788042133809.jpg';
import pastelGiga from '../assets/images/pastel_giga_especial_1788042144050.jpg';
import pastelDoce from '../assets/images/pastel_doce_nutella_1788042155409.jpg';
import caldoCana from '../assets/images/caldo_cana_limao_1788042165432.jpg';
import pastelCarne from '../assets/images/pastel_carne_queijo_1788042191487.jpg';
import porcaoMini from '../assets/images/porcao_mini_pasteis_1788042202319.jpg';
import logoGigasPhotos from '../assets/images/gigas_logo_photos.png';

export const ASSET_IMAGES = {
  hero: heroPastel,
  giga: pastelGiga,
  carne: pastelCarne,
  doce: pastelDoce,
  caldoCana: caldoCana,
  porcao: porcaoMini,
  logo: logoGigasPhotos,
};

/**
 * Get category default bundled image
 */
export function getDefaultImageForCategory(category?: string): string {
  switch (category) {
    case 'giga-especiais':
    case 'mais-pedidos':
      return pastelGiga;
    case 'doces':
      return pastelDoce;
    case 'bebidas':
      return caldoCana;
    case 'porcoes':
      return porcaoMini;
    case 'tradicionais':
    default:
      return pastelCarne;
  }
}

/**
 * Resolves an image URL safely:
 * - Fixes dev server URLs (e.g. /@fs/..., /src/assets/..., localhost) stored in Firestore
 * - Matches image names to bundled production assets
 * - Preserves valid external URLs (https://...)
 * - Falls back to category default if missing or invalid
 */
export function resolveMenuItemImage(
  rawImage?: string | null,
  category?: string,
  itemId?: string
): string {
  if (!rawImage || typeof rawImage !== 'string' || !rawImage.trim()) {
    return getDefaultImageForCategory(category);
  }

  const trimmed = rawImage.trim();

  // If it's a dev server URL or local workspace path from prior seeding
  const isDevUrl = 
    trimmed.startsWith('/@fs') || 
    trimmed.startsWith('/src/assets') || 
    trimmed.includes('localhost:') || 
    trimmed.includes('127.0.0.1:') ||
    trimmed.startsWith('blob:');

  // If it's a valid remote HTTPS image or data URL and not a dev URL
  if ((trimmed.startsWith('https://') || trimmed.startsWith('data:image/')) && !isDevUrl) {
    return trimmed;
  }

  // If it references known image filenames
  const lower = trimmed.toLowerCase();
  if (lower.includes('pastel_giga') || lower.includes('especial') || lower.includes('giga')) {
    return pastelGiga;
  }
  if (lower.includes('pastel_doce') || lower.includes('nutella') || lower.includes('morango') || lower.includes('doce')) {
    return pastelDoce;
  }
  if (lower.includes('caldo_cana') || lower.includes('garapa') || lower.includes('bebida') || lower.includes('refrigerante') || lower.includes('suco')) {
    return caldoCana;
  }
  if (lower.includes('porcao') || lower.includes('mini') || lower.includes('batata') || lower.includes('combo')) {
    return porcaoMini;
  }
  if (lower.includes('pastel_carne') || lower.includes('queijo') || lower.includes('frango') || lower.includes('carne') || lower.includes('pizza') || lower.includes('palmito')) {
    return pastelCarne;
  }
  if (lower.includes('hero_pastel')) {
    return heroPastel;
  }

  // If it's a production hashed asset path starting with /assets/
  if (trimmed.startsWith('/assets/') && !isDevUrl) {
    return trimmed;
  }

  // Fallback by category
  return getDefaultImageForCategory(category);
}

/**
 * Handle image loading errors gracefully on <img> elements
 */
export function handleImageError(
  event: React.SyntheticEvent<HTMLImageElement, Event>,
  category?: string
): void {
  const target = event.currentTarget;
  const fallback = getDefaultImageForCategory(category);
  if (target.src !== fallback) {
    target.src = fallback;
  }
}
