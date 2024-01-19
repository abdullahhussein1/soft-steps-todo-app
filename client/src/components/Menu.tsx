import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";

import profileImage from "@/assets/images/profile-test.jpg";
import favIcon from "@/assets/images/favicon.png";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { MenuIcon } from "lucide-react";
import { PaletteIcon } from "lucide-react";
import { GlobeIcon } from "lucide-react";
import { Calendar } from "lucide-react";
import { Star } from "lucide-react";

import { Drawer, DrawerTrigger, DrawerContent } from "@/components/ui/drawer";
import { Separator } from "@/components/ui/separator";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

import { useMediaQuery } from "@/hooks/useMediaQuery";
import useTheme from "@/hooks/useTheme";

import DarkModeToggle from "./DarkModeToggle";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { useState } from "react";

type Theme =
  | "blue"
  | "blue-dark"
  | "red"
  | "red-dark"
  | "green"
  | "green-dark"
  | "orange"
  | "orange-dark"
  | "neutral"
  | "neutral-dark"
  | "purple"
  | "purple-dark"
  | "yellow"
  | "yellow-dark";

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

const EditTodoDialog = () => {
  const [isPinned, setIsPinned] = useState(true);
  const [isChecked, setIsChecked] = useState(false);
  const { setTheme, theme } = useTheme();
  const isDesktop = useMediaQuery("(min-width: 640px)");

  const handleThemeChange = (selectedTheme: Theme) => {
    const isDarkMode = theme.includes("-dark");

    const newTheme = isDarkMode ? `${selectedTheme}-dark` : selectedTheme;

    setTheme(newTheme as Theme);
  };

  if (isDesktop) {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <div className="hover:bg-white/10 transition-colors text-foreground/80 p-[6px] rounded-full">
            <MenuIcon strokeWidth={1.4} />
          </div>
        </DialogTrigger>
        <DialogContent
          className={[
            "bg-secondary sm:rounded-3xl h-5/6 px-4",
            theme.endsWith("-dark") && "bg-background",
          ].join(" ")}
        >
          <ScrollArea className="rounded-t-3xl py-3">
            <div className="flex flex-col items-center space-y-6 py-2">
              <div
                className={[
                  "flex flex-col font-medium items-center space-y-2 w-full bg-background rounded-3xl p-3",
                  theme.endsWith("-dark") && "bg-secondary/25",
                ].join(" ")}
              >
                <div className="w-20 h-20 rounded-full overflow-clip border-2">
                  <img src={profileImage} />
                </div>
                <p>Abdullah Hussein</p>
              </div>
              <div className="flex flex-col w-full space-y-2">
                <p className="text-lg font-bold self-start">Appearance</p>
                <Accordion
                  type="single"
                  collapsible
                  className={[
                    "flex flex-col font-medium text-foreground/80 items-center space-y-2 w-full bg-background rounded-3xl p-3",
                    theme.endsWith("-dark") && "bg-secondary/25",
                  ].join(" ")}
                >
                  <AccordionItem value="item-1" className="w-full">
                    <AccordionTrigger>
                      <div className="flex items-center space-x-3">
                        <PaletteIcon size={18} />
                        <p>Color Theme</p>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="flex items-center flex-col space-y-6 px-5 py-1">
                      <div className="flex flex-col space-y-1">
                        <p className="text-xs font-light text-foreground/60">
                          preview
                        </p>
                        <div className="flex flex-col justify-between w-80 h-24 px-3 bg-background py-2 border rounded-t-2xl">
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
                                  isChecked &&
                                    "line-through text-foreground/80",
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
                        <ScrollArea className="w-80 rounded-b-2xl border">
                          <div className="flex p-2 space-x-3">
                            <Button
                              className="w-10 h-10 p-2 rounded-full bg-[#2563eb] hover:bg-[#2563eb]/90"
                              onClick={() => handleThemeChange("blue")}
                            >
                              {theme.includes("blue") && (
                                <div className="w-5 h-5 rounded-full bg-white"></div>
                              )}
                            </Button>
                            <Button
                              className="w-10 h-10 p-2 rounded-full bg-green-700 hover:bg-green-800"
                              onClick={() => handleThemeChange("green")}
                            >
                              {theme.includes("green") && (
                                <div className="w-5 h-5 rounded-full bg-white"></div>
                              )}
                            </Button>
                            <Button
                              className="w-10 h-10 p-2 rounded-full bg-purple-700 hover:bg-purple-800"
                              onClick={() => handleThemeChange("purple")}
                            >
                              {theme.includes("purple") && (
                                <div className="w-5 h-5 rounded-full bg-white"></div>
                              )}
                            </Button>
                            <Button
                              className="w-10 h-10 p-2 rounded-full bg-neutral-700 hover:bg-neutral-800"
                              onClick={() => handleThemeChange("neutral")}
                            >
                              {theme.includes("neutral") && (
                                <div className="w-5 h-5 rounded-full bg-white"></div>
                              )}
                            </Button>
                            <Button
                              className="w-10 h-10 p-2 rounded-full bg-red-700 hover:bg-red-800"
                              onClick={() => handleThemeChange("red")}
                            >
                              {theme.includes("red") && (
                                <div className="w-5 h-5 rounded-full bg-white"></div>
                              )}
                            </Button>
                            <Button
                              className="w-10 h-10 p-2 rounded-full bg-orange-700 hover:bg-orange-800"
                              onClick={() => handleThemeChange("orange")}
                            >
                              {theme.includes("orange") && (
                                <div className="w-5 h-5 rounded-full bg-white"></div>
                              )}
                            </Button>
                            <Button
                              className="w-10 h-10 p-2 rounded-full bg-yellow-700 hover:bg-yellow-800"
                              onClick={() => handleThemeChange("yellow")}
                            >
                              {theme.includes("yellow") && (
                                <div className="w-5 h-5 rounded-full bg-white"></div>
                              )}
                            </Button>
                          </div>
                          <ScrollBar orientation="horizontal" />
                        </ScrollArea>
                      </div>
                      <div className="w-80">
                        <DarkModeToggle />
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <Separator />
                  <AccordionItem value="item-2" className="w-full">
                    <AccordionTrigger>
                      <div className="flex items-center space-x-3">
                        <GlobeIcon size={18} />
                        <p>App Icon</p>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="flex justify-center px-5 py-1">
                      <ScrollArea className="w-80 self-center rounded-2xl border">
                        <div className="flex p-2 space-x-3">
                          <button className="relative flex items-center justify-center">
                            <div
                              className="w-12 h-12 rounded-2xl border bg-white"
                              onClick={() =>
                                changeFavicon(
                                  "..//assets/images/icons/profile-test.jpg"
                                )
                              }
                            />
                            <img
                              src={favIcon}
                              alt="favicon"
                              className="absolute w-10 h-10"
                            />
                          </button>
                          <button className="relative flex items-center justify-center">
                            <div
                              className="w-12 h-12 rounded-2xl border bg-gray-900"
                              onClick={() => changeFavicon("blue")}
                            />
                            <img
                              src={favIcon}
                              alt="favicon"
                              className="absolute w-10 h-10"
                            />
                          </button>
                          <button className="relative flex items-center justify-center">
                            <div
                              className="w-12 h-12 rounded-2xl border bg-black"
                              onClick={() =>
                                changeFavicon(
                                  "@/assets/images/macos-monterey-wwdc-21-stock-5k-6016x6016-5584.jpg"
                                )
                              }
                            />
                            <img
                              src={favIcon}
                              alt="favicon"
                              className="absolute w-10 h-10"
                            />
                          </button>
                          <button className="relative flex items-center justify-center">
                            <div
                              className="w-12 h-12 rounded-2xl border bg-gradient-to-br from-white to-slate-400"
                              onClick={() => changeFavicon("blue")}
                            />
                            <img
                              src={favIcon}
                              alt="favicon"
                              className="absolute w-10 h-10"
                            />
                          </button>
                          <button className="relative flex items-center justify-center">
                            <div
                              className="w-12 h-12 rounded-2xl border bg-gradient-to-br from-black to-slate-900"
                              onClick={() => changeFavicon("blue")}
                            />
                            <img
                              src={favIcon}
                              alt="favicon"
                              className="absolute w-10 h-10"
                            />
                          </button>
                        </div>
                        <ScrollBar orientation="horizontal" />
                      </ScrollArea>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    );
  } else {
    return (
      <Drawer>
        <DrawerTrigger asChild>
          <div className="hover:bg-white/10 transition-colors text-foreground/80 p-[6px] rounded-full">
            <MenuIcon strokeWidth={1.4} />
          </div>
        </DrawerTrigger>
        <DrawerContent
          className={[
            "bg-secondary rounded-t-3xl h-5/6 px-4",
            theme.endsWith("-dark") && "bg-background",
          ].join(" ")}
        >
          <ScrollArea className="rounded-t-3xl py-3">
            <div className="flex flex-col items-center space-y-6 py-2">
              <div
                className={[
                  "flex flex-col font-medium items-center space-y-2 w-full bg-background rounded-3xl p-3",
                  theme.endsWith("-dark") && "bg-secondary/25",
                ].join(" ")}
              >
                <div className="w-20 h-20 rounded-full overflow-clip border-2">
                  <img src={profileImage} />
                </div>
                <p>Abdullah Hussein</p>
              </div>
              <div className="flex flex-col w-full space-y-2">
                <p className="text-lg font-bold self-start">Appearance</p>
                <Accordion
                  type="single"
                  collapsible
                  className={[
                    "flex flex-col font-medium text-foreground/80 items-center space-y-2 w-full bg-background rounded-3xl p-3",
                    theme.endsWith("-dark") && "bg-secondary/25",
                  ].join(" ")}
                >
                  <AccordionItem value="item-1" className="w-full">
                    <AccordionTrigger>
                      <div className="flex items-center space-x-3">
                        <PaletteIcon size={18} />
                        <p>Color Theme</p>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="flex items-center flex-col space-y-6 px-5 py-1">
                      <div className="flex flex-col space-y-1">
                        <p className="text-xs font-light text-foreground/60">
                          preview
                        </p>
                        <div className="flex flex-col justify-between w-72 h-24 px-3 bg-background py-2 border rounded-t-2xl">
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
                                  isChecked &&
                                    "line-through text-foreground/80",
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
                        <ScrollArea className="w-72 rounded-b-2xl border">
                          <div className="flex p-2 space-x-3">
                            <Button
                              className="w-10 h-10 p-2 rounded-full bg-[#2563eb] hover:bg-[#2563eb]/90"
                              onClick={() => handleThemeChange("blue")}
                            >
                              {theme.includes("blue") && (
                                <div className="w-5 h-5 rounded-full bg-white"></div>
                              )}
                            </Button>
                            <Button
                              className="w-10 h-10 p-2 rounded-full bg-green-700 hover:bg-green-800"
                              onClick={() => handleThemeChange("green")}
                            >
                              {theme.includes("green") && (
                                <div className="w-5 h-5 rounded-full bg-white"></div>
                              )}
                            </Button>
                            <Button
                              className="w-10 h-10 p-2 rounded-full bg-purple-700 hover:bg-purple-800"
                              onClick={() => handleThemeChange("purple")}
                            >
                              {theme.includes("purple") && (
                                <div className="w-5 h-5 rounded-full bg-white"></div>
                              )}
                            </Button>
                            <Button
                              className="w-10 h-10 p-2 rounded-full bg-neutral-700 hover:bg-neutral-800"
                              onClick={() => handleThemeChange("neutral")}
                            >
                              {theme.includes("neutral") && (
                                <div className="w-5 h-5 rounded-full bg-white"></div>
                              )}
                            </Button>
                            <Button
                              className="w-10 h-10 p-2 rounded-full bg-red-700 hover:bg-red-800"
                              onClick={() => handleThemeChange("red")}
                            >
                              {theme.includes("red") && (
                                <div className="w-5 h-5 rounded-full bg-white"></div>
                              )}
                            </Button>
                            <Button
                              className="w-10 h-10 p-2 rounded-full bg-orange-700 hover:bg-orange-800"
                              onClick={() => handleThemeChange("orange")}
                            >
                              {theme.includes("orange") && (
                                <div className="w-5 h-5 rounded-full bg-white"></div>
                              )}
                            </Button>
                            <Button
                              className="w-10 h-10 p-2 rounded-full bg-yellow-700 hover:bg-yellow-800"
                              onClick={() => handleThemeChange("yellow")}
                            >
                              {theme.includes("yellow") && (
                                <div className="w-5 h-5 rounded-full bg-white"></div>
                              )}
                            </Button>
                          </div>
                          <ScrollBar orientation="horizontal" />
                        </ScrollArea>
                      </div>
                      <div className="w-72">
                        <DarkModeToggle />
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <Separator />
                  <AccordionItem value="item-2" className="w-full">
                    <AccordionTrigger>
                      <div className="flex items-center space-x-3">
                        <GlobeIcon size={18} />
                        <p>App Icon</p>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="flex justify-center px-5 py-1">
                      <ScrollArea className="w-72 self-center rounded-2xl border">
                        <div className="flex p-2 space-x-3">
                          <button className="relative flex items-center justify-center">
                            <div
                              className="w-12 h-12 rounded-2xl border bg-white"
                              onClick={() =>
                                changeFavicon(
                                  "..//assets/images/icons/profile-test.jpg"
                                )
                              }
                            />
                            <img
                              src={favIcon}
                              alt="favicon"
                              className="absolute w-10 h-10"
                            />
                          </button>
                          <button className="relative flex items-center justify-center">
                            <div
                              className="w-12 h-12 rounded-2xl border bg-gray-900"
                              onClick={() => changeFavicon("blue")}
                            />
                            <img
                              src={favIcon}
                              alt="favicon"
                              className="absolute w-10 h-10"
                            />
                          </button>
                          <button className="relative flex items-center justify-center">
                            <div
                              className="w-12 h-12 rounded-2xl border bg-black"
                              onClick={() =>
                                changeFavicon(
                                  "@/assets/images/macos-monterey-wwdc-21-stock-5k-6016x6016-5584.jpg"
                                )
                              }
                            />
                            <img
                              src={favIcon}
                              alt="favicon"
                              className="absolute w-10 h-10"
                            />
                          </button>
                          <button className="relative flex items-center justify-center">
                            <div
                              className="w-12 h-12 rounded-2xl border bg-gradient-to-br from-white to-slate-400"
                              onClick={() => changeFavicon("blue")}
                            />
                            <img
                              src={favIcon}
                              alt="favicon"
                              className="absolute w-10 h-10"
                            />
                          </button>
                          <button className="relative flex items-center justify-center">
                            <div
                              className="w-12 h-12 rounded-2xl border bg-gradient-to-br from-black to-slate-900"
                              onClick={() => changeFavicon("blue")}
                            />
                            <img
                              src={favIcon}
                              alt="favicon"
                              className="absolute w-10 h-10"
                            />
                          </button>
                        </div>
                        <ScrollBar orientation="horizontal" />
                      </ScrollArea>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </ScrollArea>
        </DrawerContent>
      </Drawer>
    );
  }
};

export default EditTodoDialog;
