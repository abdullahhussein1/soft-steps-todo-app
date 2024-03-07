import blue from "@/assets/images/blue.png";
import red from "@/assets/images/red.png";
import green from "@/assets/images/green.png";
import orange from "@/assets/images/orange.png";
import purple from "@/assets/images/purple.png";
import neutral from "@/assets/images/neutral.png";
import yellow from "@/assets/images/yellow.png";
import BlueFilled from "@/assets/images/blue-filled.png";
import RedFilled from "@/assets/images/red-filled.png";
import GreenFilled from "@/assets/images/green-filled.png";
import PurpleFilled from "@/assets/images/purple-filled.png";
import OrangeFilled from "@/assets/images/orange-filled.png";
import YellowFilled from "@/assets/images/yellow-filled.png";
import NeutralFilled from "@/assets/images/neutral-filled.png";

export function getFavIcon(theme: string): string {
  const newTheme = theme.split("-")[0];
  switch (newTheme) {
    case "blue":
      return blue;
    case "red":
      return red;
    case "green":
      return green;
    case "purple":
      return purple;
    case "orange":
      return orange;
    case "yellow":
      return yellow;
    case "neutral":
      return neutral;
    case "bluefilled":
      return BlueFilled;
    case "redfilled":
      return RedFilled;
    case "greenfilled":
      return GreenFilled;
    case "purplefilled":
      return PurpleFilled;
    case "orangefilled":
      return OrangeFilled;
    case "yellowfilled":
      return YellowFilled;
    case "neutralfilled":
      return NeutralFilled;
    case "default":
      return blue;
  }

  return blue;
}

export const changeFavIcon = (link: string): void => {
  let $favicon = document.querySelector('link[rel="icon"]') as HTMLLinkElement;
  if ($favicon !== null) {
    $favicon.href = link;
  } else {
    $favicon = document.createElement("link");
    $favicon.rel = "icon";
    $favicon.href = link;
    document.head.appendChild($favicon);
  }
};
