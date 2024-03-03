import { ArrowUpWideNarrow, Calendar, MoreHorizontal, Pin } from "lucide-react";
import DarkModeButton from "./DarkModeButton";
import ColorThemeButton from "./ColorThemeButton";
import { useState } from "react";
import { Checkbox } from "./ui/checkbox";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";

const ColorThemeContent = () => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div className="flex flex-col items-center space-y-6 px-5 py-1">
      <div className="flex flex-col space-y-1">
        <p className="text-xs font-light text-foreground/60">preview</p>
        <div className="flex h-24 w-[65vw] flex-col justify-between rounded-t-2xl border bg-background px-3 py-2 sm:w-96">
          <div
            className={[
              "flex items-start space-x-2 rounded-xl border-[0.7px] px-3 py-2",
              !isChecked && "bg-secondary",
            ].join(" ")}
          >
            <Checkbox
              checked={isChecked}
              onCheckedChange={() => setIsChecked(!isChecked)}
              className="flex h-[10px] w-[10px] items-center justify-center accent-primary"
            />
            <div className="flex-auto space-y-3">
              <div
                className={[
                  "h-2 w-11/12 text-[10px] leading-none",
                  isChecked && "text-foreground/80 line-through",
                ].join(" ")}
              >
                Pray for Palestinians 🇵🇸
              </div>
              {!isChecked && (
                <div className="flex h-[6px] w-full items-center justify-between gap-[3px] text-[8px] text-foreground/70">
                  <div className="flex items-center gap-1">
                    <Calendar size={8} />
                    <p>right now</p>
                    <Pin size={8} />
                    <ArrowUpWideNarrow size={8} />
                  </div>
                  <div className="flex items-center gap-1 text-xs leading-none text-foreground/70">
                    <div className="rounded-full bg-red-400/20 px-1 py-[1.5px] text-[6px] font-semibold text-red-500">
                      high
                    </div>
                  </div>
                </div>
              )}
            </div>
            <MoreHorizontal size={10} />
          </div>
          <div className="flex h-6 space-x-1">
            <div className="flex w-full items-center rounded-full border p-2 text-[9px] text-foreground/40">
              I want to...
            </div>
            <div className="flex h-6 w-10 items-center justify-center rounded-full border bg-primary text-[9px] text-special">
              add
            </div>
          </div>
        </div>
        <ScrollArea className="w-[65vw] rounded-b-2xl border sm:w-96">
          <div className="flex space-x-3 p-2">
            <ColorThemeButton color="blue" />
            <ColorThemeButton color="green" />
            <ColorThemeButton color="red" />
            <ColorThemeButton color="neutral" />
            <ColorThemeButton color="purple" />
            <ColorThemeButton color="yellow" />
            <ColorThemeButton color="orange" />
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
      <div className="w-[65vw] sm:w-96">
        <DarkModeButton />
      </div>
    </div>
  );
};

export default ColorThemeContent;
