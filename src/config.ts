// Edit this file for site identity.
// Edit token.json for design tokens (colors, typography, spacing).

import tokens from "../token.json";

export const site = {
  name: "Your Name",
  title: "Your Name",
  description: "A personal site for writing.",
  url: "https://example.com",
};

export const tokens_ = tokens;
export const scheme = tokens.scheme as keyof typeof tokens.color;
export const colors = tokens.color[scheme];
