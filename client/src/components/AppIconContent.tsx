import { changeFavIcon, getFavIcon } from "@/utils/utils";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";

const AppIconContent = () => (
  <ScrollArea className="w-[65vw] self-center rounded-2xl border sm:w-96">
    <div className="flex space-x-3 p-2">
      <FavIconButton favicon={"blue"} />
      <FavIconButton favicon={"green"} />
      <FavIconButton favicon={"red"} />
      <FavIconButton favicon={"neutral"} />
      <FavIconButton favicon={"purple"} />
      <FavIconButton favicon={"yellow"} />
      <FavIconButton favicon={"orange"} />
      <FavIconButton favicon={"bluefilled"} />
      <FavIconButton favicon={"greenfilled"} />
      <FavIconButton favicon={"redfilled"} />
      <FavIconButton favicon={"neutralfilled"} />
      <FavIconButton favicon={"purplefilled"} />
      <FavIconButton favicon={"yellowfilled"} />
      <FavIconButton favicon={"orangefilled"} />
    </div>
    <ScrollBar orientation="horizontal" />
  </ScrollArea>
);

type favIconButtonType = {
  favicon: string;
};

const FavIconButton = ({ favicon }: favIconButtonType) => {
  return (
    <button
      className="flex h-12 w-12 items-center justify-center overflow-clip rounded-2xl border"
      onClick={() => changeFavIcon(getFavIcon(favicon))}
    >
      <img src={getFavIcon(favicon)} alt="favicon" className="object-cover" />
    </button>
  );
};

export default AppIconContent;
