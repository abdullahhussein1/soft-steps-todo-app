import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";

import profileImage from "@/assets/images/test-profile-image.jpg";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Settings } from "lucide-react";

import { Drawer, DrawerTrigger, DrawerContent } from "@/components/ui/drawer";

import { useMediaQuery } from "@/hooks/useMediaQuery";
import ThemesToggle from "./ThemesToggle";
import DarkModeToggle from "./DarkModeToggle";

const EditTodoDialog = () => {
  const isDesktop = useMediaQuery("(min-width: 640px)");

  if (isDesktop) {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Settings strokeWidth={1.4} />
        </DialogTrigger>
        <DialogContent className="sm:rounded-3xl px-4">
          <div className="flex flex-col items-center space-y-6 mt-8">
            <div className="flex flex-col font-medium items-center space-y-2 w-full bg-secondary/25 rounded-3xl p-3">
              <div className="w-20 h-20 rounded-full overflow-clip">
                <img src={profileImage} />
              </div>
              <p>Abdullah Hussein</p>
            </div>
            <div className="flex flex-col w-full space-y-2">
              <p className="text-lg font-bold self-start">Settings</p>
              <div className="flex flex-col font-medium items-center space-y-2 w-full bg-secondary/25 rounded-3xl p-3">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Appearance</AccordionTrigger>
                    <AccordionContent>
                      Yes. It adheres to the WAI-ARIA design pattern.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                <p className="self-start">font size</p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  } else {
    return (
      <Drawer>
        <DrawerTrigger asChild>
          <div className="hover:bg-white/10 transition-colors text-foreground/80 p-[6px] rounded-full">
            <Settings strokeWidth={1.4} />
          </div>
        </DrawerTrigger>
        <DrawerContent className="rounded-t-3xl h-4/5 px-4">
          <div className="flex flex-col items-center space-y-6 mt-8">
            <div className="flex flex-col font-medium items-center space-y-2 w-full bg-secondary/25 rounded-3xl p-3">
              <div className="w-20 h-20 rounded-full overflow-clip">
                <img src={profileImage} />
              </div>
              <p>Abdullah Hussein</p>
            </div>
            <div className="flex flex-col w-full space-y-2">
              <p className="text-lg font-bold self-start">Settings</p>
              <div className="flex flex-col font-medium items-center space-y-2 w-full bg-secondary/25 rounded-3xl p-3">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Appearance</AccordionTrigger>
                    <AccordionContent>
                      <ThemesToggle />
                      <DarkModeToggle />
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                <p className="self-start">font size</p>
              </div>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    );
  }
};

export default EditTodoDialog;
