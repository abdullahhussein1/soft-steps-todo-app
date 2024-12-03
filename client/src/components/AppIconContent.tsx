import { changeFavIcon, getFavIcon } from "@/utils/utils";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import { renderToStaticMarkup } from "react-dom/server"; // Import this here as well

const AppIconContent = () => (
  <ScrollArea className="w-[65vw] self-center rounded-2xl border sm:w-96">
    <div className="flex space-x-3 p-2">
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
  const faviconElement = getFavIcon(favicon);
  const svgString = renderToStaticMarkup(faviconElement);
  const blob = new Blob([svgString], { type: "image/svg+xml" });
  const faviconUrl = URL.createObjectURL(blob);

  return (
    <button
      className="flex h-12 w-12 items-center justify-center overflow-clip rounded-2xl border"
      onClick={() => changeFavIcon(faviconElement)}
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
