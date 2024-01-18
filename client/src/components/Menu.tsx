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

import { Drawer, DrawerTrigger, DrawerContent } from "@/components/ui/drawer";
import { Separator } from "@/components/ui/separator";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

import { useMediaQuery } from "@/hooks/useMediaQuery";
import useTheme from "@/hooks/useTheme";

import DarkModeToggle from "./DarkModeToggle";
import { Button } from "./ui/button";

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
  let $favicon = document.querySelector('link[rel="icon"]');
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
        <DialogContent className="sm:rounded-3xl h-5/6 px-4">
          <ScrollArea className="rounded-t-3xl">
            <div className="flex flex-col items-center space-y-6 mt-8">
              <div className="flex flex-col font-medium items-center space-y-2 w-full bg-secondary/25 rounded-3xl p-3">
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
                  className="flex flex-col font-medium items-center space-y-2 w-full bg-secondary/25 rounded-3xl p-3"
                >
                  <AccordionItem value="item-1" className="w-full">
                    <AccordionTrigger>
                      <div className="flex items-center space-x-3">
                        <PaletteIcon size={18} />
                        <p>Color Theme</p>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="flex flex-col space-y-6 px-5 py-1">
                      <ScrollArea className="w-72 self-center rounded-3xl border">
                        <div className="flex p-2 space-x-3">
                          <Button
                            className="w-16 h-16 rounded-2xl bg-[#2563eb] hover:bg-[#2563eb]/90"
                            onClick={() => handleThemeChange("blue")}
                          />
                          <Button
                            className="w-16 h-16 rounded-2xl bg-red-700 hover:bg-red-800"
                            onClick={() => handleThemeChange("red")}
                          />
                          <Button
                            className="w-16 h-16 rounded-2xl bg-green-700 hover:bg-green-800"
                            onClick={() => handleThemeChange("green")}
                          />
                          <Button
                            className="w-16 h-16 rounded-2xl bg-orange-700 hover:bg-orange-800"
                            onClick={() => handleThemeChange("orange")}
                          />
                          <Button
                            className="w-16 h-16 rounded-2xl bg-neutral-700 hover:bg-neutral-800"
                            onClick={() => handleThemeChange("neutral")}
                          />
                          <Button
                            className="w-16 h-16 rounded-2xl bg-yellow-700 hover:bg-yellow-800"
                            onClick={() => handleThemeChange("yellow")}
                          />
                          <Button
                            className="w-16 h-16 rounded-2xl bg-purple-700 hover:bg-purple-800"
                            onClick={() => handleThemeChange("purple")}
                          />
                        </div>
                        <ScrollBar orientation="horizontal" />
                      </ScrollArea>
                      <DarkModeToggle />
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
                      <ScrollArea className="w-72 rounded-3xl border">
                        <div className="flex p-2 space-x-3">
                          <Button
                            className="w-16 h-16 rounded-2xl bg-[#2563eb] hover:bg-[#2563eb]/90"
                            onClick={() => handleThemeChange("blue")}
                          />
                          <Button
                            className="w-16 h-16 rounded-2xl bg-red-700 hover:bg-red-800"
                            onClick={() => handleThemeChange("red")}
                          />
                          <Button
                            className="w-16 h-16 rounded-2xl bg-green-700 hover:bg-green-800"
                            onClick={() => handleThemeChange("green")}
                          />
                          <Button
                            className="w-16 h-16 rounded-2xl bg-orange-700 hover:bg-orange-800"
                            onClick={() => handleThemeChange("orange")}
                          />
                          <Button
                            className="w-16 h-16 rounded-2xl bg-neutral-700 hover:bg-neutral-800"
                            onClick={() => handleThemeChange("neutral")}
                          />
                          <Button
                            className="w-16 h-16 rounded-2xl bg-yellow-700 hover:bg-yellow-800"
                            onClick={() => handleThemeChange("yellow")}
                          />
                          <Button
                            className="w-16 h-16 rounded-2xl bg-purple-700 hover:bg-purple-800"
                            onClick={() => handleThemeChange("purple")}
                          />
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
        <DrawerContent className="rounded-t-3xl h-5/6 px-4">
          <ScrollArea className="rounded-t-3xl">
            <div className="flex flex-col items-center space-y-6 py-8">
              <div className="flex flex-col font-medium items-center space-y-2 w-full bg-secondary/25 rounded-3xl p-3">
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
                  className="flex flex-col font-medium items-center space-y-2 w-full bg-secondary/25 rounded-3xl p-3"
                >
                  <AccordionItem value="item-1" className="w-full">
                    <AccordionTrigger>
                      <div className="flex items-center space-x-3">
                        <PaletteIcon size={18} />
                        <p>Color Theme</p>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="flex items-center flex-col space-y-6 px-5 py-1">
                      <div className="flex flex-col space-y-2">
                        <div className="flex flex-col justify-between w-72 h-24 p-2 border rounded-2xl">
                          <div className="flex items-start border-[0.7px] rounded-xl p-3 space-x-2">
                            <div className="h-[10px] w-[10px] rounded-full border border-primary"></div>
                            <div className="flex-auto space-y-1">
                              <div className="h-2 w-11/12 bg-secondary rounded-md"></div>
                              <div className="h-[6px] w-2/5 bg-secondary rounded-md"></div>
                            </div>
                            <div className="h-[10px] w-[10px] rounded-full border border-secondary"></div>
                          </div>
                          <div className="flex h-6 space-x-1">
                            <div className="w-full rounded-full border"></div>
                            <div className="flex items-center justify-center text-xs  bg-primary w-10 h-6 rounded-full border">
                              <div className="w-3 h-2 rounded-full bg-special"></div>
                            </div>
                          </div>
                        </div>
                        <ScrollArea className="w-72 rounded-2xl border">
                          <div className="flex p-2 space-x-3">
                            <Button
                              className="w-10 h-10 rounded-full bg-[#2563eb] hover:bg-[#2563eb]/90"
                              onClick={() => handleThemeChange("blue")}
                            />
                            <Button
                              className="w-10 h-10 rounded-full bg-red-700 hover:bg-red-800"
                              onClick={() => handleThemeChange("red")}
                            />
                            <Button
                              className="w-10 h-10 rounded-full bg-green-700 hover:bg-green-800"
                              onClick={() => handleThemeChange("green")}
                            />
                            <Button
                              className="w-10 h-10 rounded-full bg-orange-700 hover:bg-orange-800"
                              onClick={() => handleThemeChange("orange")}
                            />
                            <Button
                              className="w-10 h-10 rounded-full bg-neutral-700 hover:bg-neutral-800"
                              onClick={() => handleThemeChange("neutral")}
                            />
                            <Button
                              className="w-10 h-10 rounded-full bg-yellow-700 hover:bg-yellow-800"
                              onClick={() => handleThemeChange("yellow")}
                            />
                            <Button
                              className="w-10 h-10 rounded-full bg-purple-700 hover:bg-purple-800"
                              onClick={() => handleThemeChange("purple")}
                            />
                          </div>
                          <ScrollBar orientation="horizontal" />
                        </ScrollArea>
                      </div>
                      <DarkModeToggle />
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
                      <ScrollArea className="w-72 self-center rounded-3xl border">
                        <div className="flex p-2 space-x-3">
                          <button className="relative flex items-center justify-center">
                            <div
                              className="w-12 h-12 rounded-2xl border bg-white"
                              onClick={() => handleThemeChange("blue")}
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
