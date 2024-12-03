import { Check } from "lucide-react";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";

const createColoredSVG = (color: string) => (
  <Check stroke={color} strokeWidth="3" />
);

const BlueSVG = createColoredSVG("#3b82f6");
const RedSVG = createColoredSVG("#ef4444");
const GreenSVG = createColoredSVG("#22c55e");
const OrangeSVG = createColoredSVG("#f97316");
const PurpleSVG = createColoredSVG("#a855f7");
const NeutralSVG = createColoredSVG("#737373");
const YellowSVG = createColoredSVG("#eab308");

export function getFavIcon(theme: string): React.ReactElement {
  const newTheme = theme.split("-")[0];
  switch (newTheme) {
    case "blue":
      return BlueSVG;
    case "red":
      return RedSVG;
    case "green":
      return GreenSVG;
    case "purple":
      return PurpleSVG;
    case "orange":
      return OrangeSVG;
    case "yellow":
      return YellowSVG;
    case "neutral":
      return NeutralSVG;
    case "default":
      return BlueSVG;
  }

  return BlueSVG;
}

export function generateSvgUrl(svgElement: React.ReactElement): string {
  const svgString = renderToStaticMarkup(svgElement);
  const blob = new Blob([svgString], { type: "image/svg+xml" });
  return URL.createObjectURL(blob);
}

export const changeFavIcon = (svgElement: React.ReactElement): void => {
  const url = generateSvgUrl(svgElement);

  let $favicon = document.querySelector('link[rel="icon"]') as HTMLLinkElement;
  if ($favicon !== null) {
    $favicon.href = url;
  } else {
    $favicon = document.createElement("link");
    $favicon.rel = "icon";
    $favicon.href = url;
    document.head.appendChild($favicon);
  }
};

export const getButtonColor = (color: string) => {
  switch (color) {
    case "blue":
      return "bg-blue-500";
    case "green":
      return "bg-green-500";
    case "red":
      return "bg-red-500";
    case "orange":
      return "bg-orange-500";
    case "purple":
      return "bg-purple-700";
    case "neutral":
      return "bg-neutral-600";
    case "yellow":
      return "bg-yellow-400";
  }
};
