/* ---------- Palette ---------- */
export const C = {
  maroon: "#7A1B2E",
  maroonDeep: "#4E0E1C",
  gold: "#C9A24B",
  goldLight: "#E8CD86",
  goldPale: "#F3E3B8",
  ivory: "#FDF6E9",
  green: "#2E4D3B",
  brown: "#3D1F1A",
  turmeric: "#E0A83A",
};

export const FONT_IMPORT = `@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,500&family=Marcellus&family=Tiro+Devanagari+Sanskrit:ital@0;1&family=Parisienne&display=swap');`;

/* Prefix public-directory paths with Vite's base (e.g. "/wedding-invitation-scroll/" on GitHub Pages) */
const asset = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;

/* Add your own music file path here (e.g. "/audio/shehnai.mp3") to enable sound on open */
export const AUDIO_SRC = asset("/audio/rotegeche_khabar.mp3");

/* Ceremony roadmap cards — one static image per ceremony, all matching ~16:9 art */
export const IMG_CEREMONY_SANGEET = asset("/images/sangeet.png");
export const IMG_CEREMONY_HALDI = asset("/images/haldi.png");
export const IMG_CEREMONY_WEDDING = asset("/images/wedding.png");
export const IMG_CEREMONY_RECEPTION = asset("/images/reception.png");

/* Uploaded artwork: cover, textures, icons */
export const IMG_COVER = asset("/images/cover.png");
export const IMG_BANNER = asset("/images/top_banner.jpeg");
export const IMG_DAMASK = asset("/images/damask.png");
export const IMG_MANDALA = asset("/images/mandala.png");
export const IMG_ICON_CROWNS = asset("/images/icon_crowns.png");
export const IMG_ICON_POT = asset("/images/icon_pot.png");
export const IMG_ICON_TREE = asset("/images/icon_tree.png");
export const IMG_ICON_GLYPH = asset("/images/icon_glyph.png");
export const IMG_ICON_TRAY = asset("/images/icon_tray.png");
export const IMG_ICON_BETEL = asset("/images/betel.png");

/* New round of uploaded artwork */
export const IMG_INVITE_FRAME = asset("/images/invitation.png");
export const IMG_BRIDE_BETEL2 = asset("/images/bride_betel2.jpg");
export const IMG_CHIBI_PORTRAIT = asset("/images/chibi_portrait.jpg");
export const IMG_CHIBI_FIRE = asset("/images/chibi_fire.jpg");
export const IMG_HANDS = asset("/images/hands.png");
