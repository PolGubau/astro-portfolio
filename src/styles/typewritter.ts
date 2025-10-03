import type { PluginAPI } from "tailwindcss/plugin";

export default function typewriterPlugin({
  addBase,
  matchUtilities,
  theme,
}: PluginAPI) {
  addBase({
    "@keyframes typewriter-typing": {
      "0%": { width: "0" },
      "25%": { width: "0" },
      "50%": { width: "var(--typewriter-width)" },
      "100%": { width: "var(--typewriter-width)" },
    },
    "@keyframes typewriter-blink": {
      "50%": { borderColor: "transparent" },
    },
  });

  matchUtilities(
    {
      typewriter: (value) => ({
        "--typewriter-width": `${value}ch`,
        animation: `typewriter-typing 3s steps(${value}) forwards, typewriter-blink 0.4s step-end infinite alternate`,
        whiteSpace: "nowrap",
        borderRight: "2px solid",
        fontFamily: "monospace",
        overflow: "hidden",
        maxWidth: "fit-content",
      }),
    },
    { values: theme("typewriter", {}) },
  );
}