"use client";

import { useRouter } from "next/navigation";
import { memo, useState } from "react";
import { useWindowSize } from "usehooks-ts";
import { SidebarToggle } from "@/components/sidebar-toggle";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { PlusIcon, VercelIcon } from "./icons";
import { useSidebar } from "./ui/sidebar";
import { VisibilitySelector, type VisibilityType } from "./visibility-selector";

function PureChatHeader({
  chatId,
  selectedVisibilityType,
  isReadonly,
}: {
  chatId: string;
  selectedVisibilityType: VisibilityType;
  isReadonly: boolean;
}) {
  const router = useRouter();
  const { open } = useSidebar();
  const { width: windowWidth } = useWindowSize();
  const [showSupreme, setShowSupreme] = useState(false);

  return (
    <>
      <header className="sticky top-0 flex items-center gap-2 px-2 py-1.5 md:px-2">
        <SidebarToggle />

        {(!open || windowWidth < 768) && (
          <Button
            className="order-2 ml-auto h-8 px-2 md:order-1 md:ml-0 md:h-fit md:px-2"
            onClick={() => {
              router.push("/");
              router.refresh();
            }}
            variant="outline"
          >
            <PlusIcon />
            <span className="md:sr-only">New Chat</span>
          </Button>
        )}

        {!isReadonly && (
          <VisibilitySelector
            chatId={chatId}
            className="order-1 md:order-2"
            selectedVisibilityType={selectedVisibilityType}
          />
        )}

        <Button
          className="order-3 hidden bg-zinc-900 px-2 text-zinc-50 hover:bg-zinc-800 md:ml-auto md:flex md:h-fit dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
          onClick={() => setShowSupreme(true)}
        >
          <VercelIcon size={16} />
          Unlock SUPREME
        </Button>
      </header>

      <Dialog open={showSupreme} onOpenChange={setShowSupreme}>
        <DialogContent className="max-w-md rounded-2xl p-8">
          <DialogHeader className="text-center sm:text-center">
            <DialogTitle className="text-2xl font-bold tracking-tight">
              LAWRS SUPREME
            </DialogTitle>
            <DialogDescription className="pt-1 text-base text-foreground/70">
              Our most advanced legal AI for serious legal work.
            </DialogDescription>
          </DialogHeader>

          <ul className="space-y-3 pt-2 text-sm text-foreground/80">
            <li className="flex gap-2">
              <span className="shrink-0">&#8226;</span>
              Instantly analyze thousands of cases, statutes, and judicial opinions
            </li>
            <li className="flex gap-2">
              <span className="shrink-0">&#8226;</span>
              Draft full motions, briefs, and memoranda in minutes
            </li>
            <li className="flex gap-2">
              <span className="shrink-0">&#8226;</span>
              Spot issues, frame arguments, and structure analysis with precision
            </li>
            <li className="flex gap-2">
              <span className="shrink-0">&#8226;</span>
              Built for attorneys, clerks, and law students who need results — fast
            </li>
          </ul>

          <p className="pt-2 text-center text-sm font-medium italic text-muted-foreground">
            Not a chatbot. A legal work engine.
          </p>

          <div className="flex flex-col items-center gap-3 pt-4">
            <p className="text-3xl font-bold">
              $25 <span className="text-base font-normal text-muted-foreground">/ mo</span>
            </p>
            <Button className="w-full rounded-lg bg-zinc-900 py-5 text-base text-zinc-50 hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200">
              Get SUPREME
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export const ChatHeader = memo(PureChatHeader, (prevProps, nextProps) => {
  return (
    prevProps.chatId === nextProps.chatId &&
    prevProps.selectedVisibilityType === nextProps.selectedVisibilityType &&
    prevProps.isReadonly === nextProps.isReadonly
  );
});
