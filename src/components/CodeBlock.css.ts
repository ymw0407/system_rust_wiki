import { style } from "@vanilla-extract/css";
import { vars } from "../styles/theme.css";

export const pre = style({
  margin: "1.5rem 0",
  padding: "1.125rem 0",
  borderRadius: "10px",
  overflow: "auto",
  fontSize: "0.84rem",
  lineHeight: 1.7,
  background: "#1e1e2e",
  border: "none",
  boxShadow: "none",
});

export const code = style({
  fontFamily: vars.font.mono,
  display: "block",
});

export const line = style({
  display: "flex",
  minHeight: "1.7em",
  paddingRight: "1rem",
  ":hover": {
    background: "rgba(255,255,255,0.035)",
  },
});

export const lineNo = style({
  flexShrink: 0,
  width: "3rem",
  textAlign: "right",
  paddingRight: "1rem",
  color: "#585b70",
  userSelect: "none",
  fontSize: "0.75rem",
  lineHeight: "inherit",
});

export const lineContent = style({
  flex: 1,
});
