import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";

import profileImage from "@/assets/images/profile-test.jpg";

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
        <DialogContent className="sm:rounded-3xl px-4">
          <ScrollArea>
            <div className="flex flex-col items-center space-y-6 mt-8">
              <div className="flex flex-col font-medium items-center space-y-2 w-full bg-secondary/25 rounded-3xl p-3">
                <div className="w-20 h-20 rounded-full overflow-clip border-2">
                  <img src={profileImage} />
                </div>
                <p>Abdullah Hussein</p>
              </div>
              <div className="flex flex-col w-full space-y-2">
                <p className="text-lg font-bold self-start">Appearance</p>
                <div className="flex flex-col font-medium items-center space-y-2 w-full bg-secondary/25 rounded-3xl p-3">
                  <div className="w-full">
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="item-1">
                        <AccordionTrigger>
                          <div className="flex items-center space-x-3">
                            <PaletteIcon size={18} />
                            <p>Color Theme</p>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="flex flex-col space-y-2 px-5 py-1">
                          {/* <ThemesToggle /> */}
                          <div className="w-full">
                            <ScrollArea className="rounded-3xl border">
                              <div className="flex space-x-4 w p-2">
                                <div className="w-24 h-24 rounded-2xl bg-blue"></div>
                                <div className="w-24 h-24 rounded-2xl bg-white"></div>
                                <div className="w-24 h-24 rounded-2xl bg-white"></div>
                                <div className="w-24 h-24 rounded-2xl bg-white"></div>
                                <div className="w-24 h-24 rounded-2xl bg-white"></div>
                                <div className="w-24 h-24 rounded-2xl bg-white"></div>
                                <div className="w-24 h-24 rounded-2xl bg-white"></div>
                              </div>
                              <ScrollBar orientation="horizontal" />
                            </ScrollArea>
                            <DarkModeToggle />
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                  <Separator />
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger>
                        <div className="flex items-center space-x-3">
                          <GlobeIcon size={18} />
                          <p>App Icon</p>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-5 py-1">
                        <ScrollArea className="rounded-3xl  border">
                          <div className="flex space-x-4 p-2">
                            <div className="w-16 h-16 rounded-2xl bg-white"></div>
                            <div className="w-16 h-16 rounded-2xl bg-white"></div>
                            <div className="w-16 h-16 rounded-2xl bg-white"></div>
                            <div className="w-16 h-16 rounded-2xl bg-white"></div>
                            <div className="w-16 h-16 rounded-2xl bg-white"></div>
                            <div className="w-16 h-16 rounded-2xl bg-white"></div>
                            <div className="w-16 h-16 rounded-2xl bg-white"></div>
                          </div>
                          <ScrollBar orientation="horizontal" />
                        </ScrollArea>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
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
                      <ScrollArea className="flex w-96 rounded-3xl border">
                        <div className="flex w-max space-x-4 p-2">
                          <Button
                            className="w-24 h-24 rounded-2xl bg-blue-700 hover:bg-blue-800"
                            onClick={() => handleThemeChange("blue")}
                          />
                          <Button
                            className="w-24 h-24 rounded-2xl bg-red-700 hover:bg-red-800"
                            onClick={() => handleThemeChange("red")}
                          />
                          <Button
                            className="w-24 h-24 rounded-2xl bg-green-700 hover:bg-green-800"
                            onClick={() => handleThemeChange("green")}
                          />
                          <Button
                            className="w-24 h-24 rounded-2xl bg-orange-700 hover:bg-orange-800"
                            onClick={() => handleThemeChange("orange")}
                          />
                          <Button
                            className="w-24 h-24 rounded-2xl bg-neutral-700 hover:bg-neutral-800"
                            onClick={() => handleThemeChange("neutral")}
                          />
                          <Button
                            className="w-24 h-24 rounded-2xl bg-yellow-700 hover:bg-yellow-800"
                            onClick={() => handleThemeChange("yellow")}
                          />
                          <Button
                            className="w-24 h-24 rounded-2xl bg-purple-700 hover:bg-purple-800"
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
                    <AccordionContent className="px-5 py-1">
                      <ScrollArea className="rounded-3xl w-96 border">
                        <div className="flex space-x-4 p-2">
                          <div className="w-16 h-16 rounded-2xl bg-white"></div>
                          <div className="w-16 h-16 rounded-2xl bg-white"></div>
                          <div className="w-16 h-16 rounded-2xl bg-white"></div>
                          <div className="w-16 h-16 rounded-2xl bg-white"></div>
                          <div className="w-16 h-16 rounded-2xl bg-white"></div>
                          <div className="w-16 h-16 rounded-2xl bg-white"></div>
                          <div className="w-16 h-16 rounded-2xl bg-white"></div>
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
