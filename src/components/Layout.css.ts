import { style } from "@vanilla-extract/css";
import { vars } from "../styles/theme.css";

export const header = style({
  borderBottom: `1px solid ${vars.color.border}`,
  padding: "3rem 1.5rem 2.25rem",
  textAlign: "center",
});

export const kicker = style({
  fontSize: "0.8rem",
  color: vars.color.accent,
  textTransform: "uppercase",
  letterSpacing: "0.12em",
  fontWeight: 700,
  marginBottom: "0.5rem",
  display: "block",
});

export const headerTitle = style({
  margin: "0 0 0.5rem",
  fontSize: "1.75rem",
  fontWeight: 800,
  letterSpacing: "-0.02em",
  lineHeight: 1.3,
});

export const subtitle = style({
  color: vars.color.muted,
  fontSize: "1rem",
  margin: 0,
  lineHeight: 1.7,
});

export const main = style({
  maxWidth: "42rem",
  margin: "0 auto",
  padding: "2.5rem 1.5rem 6rem",
});

export const footer = style({
  textAlign: "center",
  color: vars.color.muted,
  fontSize: "0.8rem",
  padding: "2rem 1.5rem",
  borderTop: `1px solid ${vars.color.border}`,
});

export const backToToc = style({
  display: "inline-block",
  marginBottom: "2rem",
  color: vars.color.muted,
  fontSize: "0.875rem",
  fontWeight: 500,
  ":hover": {
    color: vars.color.accent,
  },
});

export const lede = style({
  fontSize: "1.05rem",
  color: "#444",
  borderLeft: `4px solid ${vars.color.accent}`,
  paddingLeft: "1.125rem",
  margin: "1.5rem 0 2rem",
  lineHeight: 1.9,
});
