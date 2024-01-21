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
      className="w-12 h-12 rounded-2xl border flex items-center justify-center overflow-clip"
      onClick={() => changeFavicon(favicon)}
    >
      <img src={favicon} alt="favicon" className="object-cover" />
    </button>
  );
};

export default FavIconButton;
