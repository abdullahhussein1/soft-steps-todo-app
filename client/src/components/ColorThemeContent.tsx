import { Calendar, Star } from "lucide-react";
import DarkModeToggle from "./DarkModeToggle";
import ColorThemeButton from "./ColorThemeButton";
import { useState } from "react";
import { Checkbox } from "./ui/checkbox";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";

const ColorThemeContent = () => {
  const [isPinned, setIsPinned] = useState(true);
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div className="flex items-center flex-col space-y-6 px-5 py-1">
      <div className="flex flex-col space-y-1">
        <p className="text-xs font-light text-foreground/60">preview</p>
        <div className="flex flex-col justify-between w-[65vw] h-24 px-3 bg-background py-2 border rounded-t-2xl">
          <div
            className={[
              "flex items-start border-[0.7px] rounded-xl px-3 py-2 space-x-2",
              isPinned && !isChecked && "bg-secondary",
            ].join(" ")}
          >
            <Checkbox
              checked={isChecked}
              onCheckedChange={() => setIsChecked(!isChecked)}
              className="h-[10px] w-[10px] flex items-center justify-center accent-primary"
            />
            <div className="flex-auto space-y-2">
              <div
                className={[
                  "h-2 w-11/12 text-[10px] leading-none",
                  isChecked && "line-through text-foreground/80",
                ].join(" ")}
              >
                Pray all prayers in mosque
              </div>
              {!isChecked && (
                <div className="h-[6px] w-2/5 flex text-foreground/70 items-center gap-[3px] text-[8px]">
                  <Calendar size={8} />
                  <p className="mt-[2px]">tomorrow</p>
                </div>
              )}
            </div>
            <Star
              size={10}
              className={[
                "flex-initial cursor-pointer mt-[1px]",
                isChecked
                  ? "hidden"
                  : isPinned
                  ? "text-yellow-500 fill-yellow-500  hover:text-yellow-600 hover:fill-yellow-600"
                  : "text-foreground/50  hover:text-foreground/90",
              ].join(" ")}
              onClick={() => setIsPinned(!isPinned)}
            />
          </div>
          <div className="flex h-6 space-x-1">
            <div className="flex items-center w-full rounded-full border p-2 text-[9px] text-foreground/40">
              Add todo
            </div>
            <div className="flex items-center justify-center text-[9px] text-special bg-primary w-10 h-6 rounded-full border">
              add
            </div>
          </div>
        </div>
        <ScrollArea className="w-[65vw] rounded-b-2xl border">
          <div className="flex p-2 gap-3">
            <ColorThemeButton color="green" />
            <ColorThemeButton color="blue" />
            <ColorThemeButton color="purple" />
            <ColorThemeButton color="neutral" />
            <ColorThemeButton color="red" />
            <ColorThemeButton color="orange" />
            <ColorThemeButton color="yellow" />
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
      <div className="w-[65vw]">
        <DarkModeToggle />
      </div>
    </div>
  );
};

export default ColorThemeContent;
