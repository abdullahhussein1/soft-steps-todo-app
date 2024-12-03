import { changeFavIcon, generateSvgUrl, getFavIcon } from "@/utils/utils";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";

const AppIconContent = () => (
  <ScrollArea className="w-[65vw] self-center rounded-2xl border sm:w-96 md:w-[440px]">
    <div className="flex items-center justify-center space-x-3 p-2">
      <FavIconButton favicon="blue" />
      <FavIconButton favicon="green" />
      <FavIconButton favicon="red" />
      <FavIconButton favicon="neutral" />
      <FavIconButton favicon="purple" />
      <FavIconButton favicon="yellow" />
      <FavIconButton favicon="orange" />
    </div>
    <ScrollBar orientation="horizontal" />
  </ScrollArea>
);

type FavIconButtonType = {
  favicon: string;
};

const FavIconButton = ({ favicon }: FavIconButtonType) => {
  const faviconUrl = generateSvgUrl(getFavIcon(favicon));
  return (
    <button
      className="flex h-12 w-12 items-center justify-center overflow-clip rounded-2xl border bg-muted/20 transition-colors hover:bg-muted/50"
      onClick={() => changeFavIcon(getFavIcon(favicon))}
    >
      <img
        src={faviconUrl}
        alt={`${favicon} favicon`}
        className="object-cover"
      />
    </button>
  );
};

export default AppIconContent;
