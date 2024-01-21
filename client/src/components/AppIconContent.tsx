import favicon from "@/assets/images/favicon.png";
import faviconFilled from "@/assets/images/favicon-filled.png";
import faviconRed from "@/assets/images/favicon-red.png";
import faviconRedFilled from "@/assets/images/favicon-red-filled.png";
import faviconGreen from "@/assets/images/favicon-green.png";
import faviconGreenFilled from "@/assets/images/favicon-green-filled.png";
import faviconPurple from "@/assets/images/favicon-purple.png";
import faviconPurpleFilled from "@/assets/images/favicon-purple-filled.png";
import faviconOrange from "@/assets/images/favicon-orange.png";
import faviconOrangeFilled from "@/assets/images/favicon-orange-filled.png";
import faviconYellow from "@/assets/images/favicon-yellow.png";
import faviconYellowFilled from "@/assets/images/favicon-yellow-filled.png";
import faviconNeutral from "@/assets/images/favicon-neutral.png";
import faviconNeutralFilled from "@/assets/images/favicon-neutral-filled.png";
import FavIconButton from "./FavIconButton";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";

const AppIconContent = () => (
  <ScrollArea className="w-72 self-center rounded-2xl border">
    <div className="flex p-2 space-x-3">
      <FavIconButton favicon={favicon} />
      <FavIconButton favicon={faviconRed} />
      <FavIconButton favicon={faviconGreen} />
      <FavIconButton favicon={faviconPurple} />
      <FavIconButton favicon={faviconYellow} />
      <FavIconButton favicon={faviconOrange} />
      <FavIconButton favicon={faviconNeutral} />
      <FavIconButton favicon={faviconFilled} />
      <FavIconButton favicon={faviconRedFilled} />
      <FavIconButton favicon={faviconGreenFilled} />
      <FavIconButton favicon={faviconPurpleFilled} />
      <FavIconButton favicon={faviconYellowFilled} />
      <FavIconButton favicon={faviconOrangeFilled} />
      <FavIconButton favicon={faviconNeutralFilled} />
    </div>
    <ScrollBar orientation="horizontal" />
  </ScrollArea>
);

export default AppIconContent;
