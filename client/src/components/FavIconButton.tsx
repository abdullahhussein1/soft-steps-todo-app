import { changeFavIcon, getFavIcon } from "@/utils/utils";

type Props = {
  favicon: string;
};

const FavIconButton = ({ favicon }: Props) => {
  return (
    <button
      className="flex h-12 w-12 items-center justify-center overflow-clip rounded-2xl border"
      onClick={() => changeFavIcon(getFavIcon(favicon))}
    >
      <img src={getFavIcon(favicon)} alt="favicon" className="object-cover" />
    </button>
  );
};

export default FavIconButton;
