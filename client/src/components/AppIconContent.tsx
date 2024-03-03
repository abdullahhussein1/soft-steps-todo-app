import favicon from "@/assets/images/blue.png";
import faviconFilled from "@/assets/images/blue-filled.png";
import faviconRed from "@/assets/images/red.png";
import faviconRedFilled from "@/assets/images/red-filled.png";
import faviconGreen from "@/assets/images/green.png";
import faviconGreenFilled from "@/assets/images/green-filled.png";
import faviconPurple from "@/assets/images/purple.png";
import faviconPurpleFilled from "@/assets/images/purple-filled.png";
import faviconOrange from "@/assets/images/orange.png";
import faviconOrangeFilled from "@/assets/images/orange-filled.png";
import faviconYellow from "@/assets/images/yellow.png";
import faviconYellowFilled from "@/assets/images/yellow-filled.png";
import faviconNeutral from "@/assets/images/neutral.png";
import faviconNeutralFilled from "@/assets/images/neutral-filled.png";
import FavIconButton from "./FavIconButton";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";

const AppIconContent = () => (
  <ScrollArea className="w-[65vw] self-center rounded-2xl border sm:w-96">
    <div className="flex space-x-3 p-2">
      <FavIconButton favicon={favicon} />
      <FavIconButton favicon={faviconGreen} />
      <FavIconButton favicon={faviconRed} />
      <FavIconButton favicon={faviconNeutral} />
      <FavIconButton favicon={faviconPurple} />
      <FavIconButton favicon={faviconYellow} />
      <FavIconButton favicon={faviconOrange} />
      <FavIconButton favicon={faviconFilled} />
      <FavIconButton favicon={faviconGreenFilled} />
      <FavIconButton favicon={faviconRedFilled} />
      <FavIconButton favicon={faviconNeutralFilled} />
      <FavIconButton favicon={faviconPurpleFilled} />
      <FavIconButton favicon={faviconYellowFilled} />
      <FavIconButton favicon={faviconOrangeFilled} />
    </div>
    <ScrollBar orientation="horizontal" />
  </ScrollArea>
);

export default AppIconContent;
