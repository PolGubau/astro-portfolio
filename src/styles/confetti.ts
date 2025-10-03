import type { PluginAPI } from "tailwindcss/plugin";

export default function motionConfettiPlugin({
  addBase,
  matchUtilities,
}: PluginAPI) {
  addBase({
    "@keyframes RomboConfettiPop": {
      "0%": { opacity: "0", transform: "scale(1)" },
      "33%": { opacity: "1", transform: "scale(1.15)" },
      "50%": { transform: "scale(0.975)" },
      "65%": { transform: "scale(1.025)" },
      "80%": { transform: "scale(0.99)" },
      "87%": { transform: "scale(1.01)" },
      "100%": { opacity: "1", transform: "scale(1)" },
    },
    "@keyframes topfetti": {
      "0%": {
        backgroundPosition:
          "5% 90%, 10% 90%, 10% 90%, 15% 90%, 25% 90%, 25% 90%, 40% 90%, 55% 90%, 70% 90%",
      },
      "50%": {
        backgroundPosition:
          "0% 80%, 0% 20%, 10% 40%, 20% 0%, 30% 30%, 22% 50%, 50% 50%, 65% 20%, 90% 30%",
      },
      "100%": {
        backgroundPosition:
          "0% 70%, 0% 10%, 10% 30%, 20% -10%, 30% 20%, 22% 40%, 50% 40%, 65% 10%, 90% 20%",
        backgroundSize: "0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%",
      },
    },
    "@keyframes bottomfetti": {
      "0%": {
        backgroundPosition:
          "10% -10%, 30% 10%, 55% -10%, 70% -10%, 85% -10%,70% -10%, 70% 0%",
      },
      "50%": {
        backgroundPosition:
          "0% 80%, 20% 80%, 45% 60%, 60% 100%, 75% 70%, 95% 60%, 105% 0%",
      },
      "100%": {
        backgroundPosition:
          "0% 90%, 20% 90%, 45% 70%, 60% 110%, 75% 80%, 95% 70%, 110% 10%",
        backgroundSize: "0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%",
      },
    },
  });

  matchUtilities(
    {
      "confetti": () => ({
        display: "block",
        appearance: "none",
        position: "relative",
        outline: "0",
        zIndex: "1",
        margin: "0",
        animation:
          "RomboConfettiPop var(--motion-duration) var(--motion-timing) both",

        "&:after": {
          display: "block",
          animationDuration: "var(--motion-duration)",
          animationTimingFunction: "var(--motion-timing)",
          animationIterationCount: "1",
          animationDirection: "normal",
          animationFillMode: "forwards",
          animationName: "bottomfetti",
          position: "absolute",
          content: '" "',
          zIndex: "-1",
          width: "100%",
          height: "100%",
          left: "-20%",
          top: "100%",
          transition: "all var(--motion-timing) var(--motion-duration)",
          backgroundRepeat: "no-repeat",
          backgroundImage:
            "radial-gradient(circle, #a2dd60 20%, transparent 20%),radial-gradient(circle, transparent 20%, #ee65a9 20%, transparent 30%),radial-gradient(circle, #6092dd 20%, transparent 20%),radial-gradient(circle, #f3c548 20%, transparent 20%),radial-gradient(circle, transparent 10%, #46ec99 15%, transparent 20%),radial-gradient(circle, #f03e47 20%, transparent 20%),radial-gradient(circle, #7b4df7 20%, transparent 20%),radial-gradient(circle, #3ff1bc 20%, transparent 20%)",
          backgroundSize:
            "15% 15%, 20% 20%, 18% 18%, 20% 20%, 15% 15%, 10% 10%, 20% 20%",
        },

        "&:before": {
          display: "block",
          animationDuration: "var(--motion-duration)",
          animationTimingFunction: "var(--motion-timing)",
          animationIterationCount: "1",
          animationDirection: "normal",
          animationFillMode: "forwards",
          animationName: "topfetti",
          position: "absolute",
          content: '" "',
          width: "100%",
          height: "100%",
          left: "-5%",
          top: "-90%",
          zIndex: "-1",
          backgroundRepeat: "no-repeat",
          transition: "all var(--motion-timing) var(--motion-duration)",
          backgroundImage:
            "radial-gradient(circle, #a2dd60 30%, transparent 20%),radial-gradient(circle, transparent 20%, #ee65a9 40%, transparent 20%),radial-gradient(circle, #6092dd 30%, transparent 20%),radial-gradient(circle, #f3c548 30%, transparent 20%),radial-gradient(circle, transparent 10%, #46ec99 15%, transparent 20%),radial-gradient(circle, #f03e47 30%, transparent 20%),radial-gradient(circle, #7b4df7 30%, transparent 30%),radial-gradient(circle, #3ff1bc 30%, transparent 20%),radial-gradient(circle, #48f088 30%, transparent 30%)",
          backgroundSize:
            "10% 10%, 20% 20%, 15% 15%, 20% 20%, 18% 18%, 10% 10%, 15% 15%, 10% 10%, 25% 25%",
        },
      }),
    },
    { values: { DEFAULT: "" } },
  );
}
