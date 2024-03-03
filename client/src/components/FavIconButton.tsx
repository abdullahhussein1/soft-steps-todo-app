const changeFavicon = (link: string): void => {
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

type Props = {
  favicon: string;
};

const FavIconButton = ({ favicon }: Props) => {
  return (
    <button
      className="flex h-12 w-12 items-center justify-center overflow-clip rounded-2xl border"
      onClick={() => changeFavicon(favicon)}
    >
      <img src={favicon} alt="favicon" className="object-cover" />
    </button>
  );
};

export default FavIconButton;
