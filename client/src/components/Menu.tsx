import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { MenuIcon } from "lucide-react";
import { PaletteIcon } from "lucide-react";
import { GlobeIcon } from "lucide-react";
import { LogOutIcon } from "lucide-react";

import { Drawer, DrawerTrigger, DrawerContent } from "@/components/ui/drawer";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

import { useMediaQuery } from "@/hooks/useMediaQuery";
import useTheme from "@/hooks/useTheme";

import AppIconContent from "./AppIconContent";
import ColorThemeContent from "./ColorThemeContent";
import { User } from "@supabase/supabase-js";
import supabase from "@/supabase/supabase";
import { useNavigate } from "react-router-dom";

type props = {
  user: User | null;
};

const Menu = ({ user }: props) => {
  const { theme } = useTheme();
  const isDesktop = useMediaQuery("(min-width: 640px)");
  const navigate = useNavigate();

  async function signOutUser() {
    try {
      supabase.auth.signOut({ scope: "local" });
      navigate("/auth");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  }

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
            "bg-secondary sm:rounded-3xl h-[505px] px-4",
            theme.endsWith("-dark") && "bg-background",
          ].join(" ")}
        >
          <ScrollArea className="rounded-3xl py-3">
            <div className="flex flex-col items-center space-y-6 py-2">
              <div
                className={[
                  "flex flex-col font-medium items-center space-y-2 w-full bg-background rounded-3xl p-3",
                  theme.endsWith("-dark") && "bg-secondary/25",
                ].join(" ")}
              >
                <div className="w-20 h-20 rounded-full overflow-clip border-2">
                  <img src={user?.user_metadata.avatar_url} />
                </div>
                <p>{user?.user_metadata.full_name}</p>
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
                    <AccordionContent>
                      <ColorThemeContent />
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
                      <AppIconContent />
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
              <button
                className={[
                  "flex font-medium items-center justify-center space-x-3  transition-colors w-full  rounded-2xl px-6 py-4",
                  theme.endsWith("-dark")
                    ? "bg-secondary/25 text-red-700 hover:bg-red-400/5"
                    : "bg-background text-red-500 hover:bg-red-100",
                ].join(" ")}
                onClick={signOutUser}
              >
                <LogOutIcon size={18} />
                <p>Log Out</p>
              </button>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    );
  } else {
    return (
      <Drawer>
        <DrawerTrigger asChild>
          <div className="transition-colors text-foreground/80 p-[6px] rounded-full">
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
                  <img src={user?.user_metadata.avatar_url} />
                </div>
                <p>{user?.user_metadata.full_name}</p>
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
                    <AccordionContent>
                      <ColorThemeContent />
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
                      <AppIconContent />
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
              <button
                className={[
                  "flex font-medium items-center justify-center space-x-3  transition-colors w-full  rounded-2xl px-6 py-4",
                  theme.endsWith("-dark")
                    ? "bg-secondary/25 text-red-700 hover:bg-red-400/5"
                    : "bg-background text-red-500 hover:bg-red-100",
                ].join(" ")}
                onClick={signOutUser}
              >
                <LogOutIcon size={18} />
                <p>Log Out</p>
              </button>
            </div>
          </ScrollArea>
        </DrawerContent>
      </Drawer>
    );
  }
};

export default Menu;
