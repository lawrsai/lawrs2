"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { memo, useState } from "react";
import { useWindowSize } from "usehooks-ts";
import { SidebarToggle } from "@/components/sidebar-toggle";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { PlusIcon } from "./icons";
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

        <button
          className="group order-3 hidden items-center gap-1.5 rounded-full border border-purple-200/70 bg-gradient-to-r from-blue-100/60 via-purple-100/60 to-pink-100/60 px-4 py-2 text-sm font-semibold text-zinc-800 shadow-[0_0_12px_rgba(196,181,253,0.3)] transition-all duration-500 hover:border-purple-300 hover:shadow-[0_0_24px_rgba(168,85,247,0.45)] md:ml-auto md:flex dark:border-purple-500/30 dark:from-blue-900/30 dark:via-purple-900/30 dark:to-pink-900/30 dark:text-zinc-100 dark:shadow-[0_0_12px_rgba(168,85,247,0.2)] dark:hover:border-purple-400/50 dark:hover:shadow-[0_0_24px_rgba(168,85,247,0.4)]"
          onClick={() => setShowSupreme(true)}
          type="button"
        >
          <Image
            alt=""
            className="size-7 dark:invert"
            height={28}
            src="/images/lawrs-icon.png"
            width={28}
          />
          Unlock SUPREME
        </button>
      </header>

      <Dialog onOpenChange={setShowSupreme} open={showSupreme}>
        <DialogContent className="max-w-[420px] overflow-hidden overflow-y-auto max-h-[90vh] rounded-2xl border border-zinc-200 bg-white p-0 shadow-xl dark:border-zinc-700 dark:bg-zinc-900">
          <DialogTitle className="sr-only">LAWRS SUPREME</DialogTitle>
          <DialogDescription className="sr-only">
            Upgrade to LAWRS SUPREME
          </DialogDescription>

          <div className="px-7 pt-8 pb-7">
            {/* Title */}
            <h2 className="text-center text-[1.7rem] font-semibold tracking-tight text-foreground">
              LAWRS SUPREME
            </h2>

            {/* Price */}
            <div className="mt-3 flex items-baseline justify-center gap-1.5">
              <span className="text-sm align-top text-muted-foreground">$</span>
              <span className="text-5xl font-semibold tracking-tight text-foreground">
                25
              </span>
              <div className="ml-1 flex flex-col text-xs leading-tight text-muted-foreground">
                <span>USD /</span>
                <span>month</span>
              </div>
            </div>

            {/* Subtitle */}
            <p className="mt-4 text-center text-sm text-muted-foreground">
              Our most advanced legal AI for serious legal work.
            </p>

            {/* CTA */}
            <Button className="mt-5 w-full rounded-full bg-zinc-900 py-5 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200">
              Get SUPREME
            </Button>

            {/* Divider */}
            <div className="my-7 h-px bg-zinc-200 dark:bg-zinc-700" />

            {/* Features */}
            <ul className="space-y-5">
              <li className="flex items-start gap-3.5">
                <svg
                  className="mt-0.5 size-5 shrink-0 text-zinc-500"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                >
                  <path d="M9 12l2 2 4-4" />
                  <circle cx="12" cy="12" r="10" />
                </svg>
                <span className="text-sm text-foreground">
                  Instantly analyze thousands of cases, statutes, and judicial
                  opinions
                </span>
              </li>
              <li className="flex items-start gap-3.5">
                <svg
                  className="mt-0.5 size-5 shrink-0 text-zinc-500"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                >
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" x2="8" y1="13" y2="13" />
                  <line x1="16" x2="8" y1="17" y2="17" />
                </svg>
                <span className="text-sm text-foreground">
                  Draft full motions, briefs, and memoranda in minutes
                </span>
              </li>
              <li className="flex items-start gap-3.5">
                <svg
                  className="mt-0.5 size-5 shrink-0 text-zinc-500"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" x2="16.65" y1="21" y2="16.65" />
                </svg>
                <span className="text-sm text-foreground">
                  Spot issues, frame arguments, and structure analysis with
                  precision
                </span>
              </li>
              <li className="flex items-start gap-3.5">
                <svg
                  className="mt-0.5 size-5 shrink-0 text-zinc-500"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                >
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                </svg>
                <span className="text-sm text-foreground">
                  Built for attorneys, clerks, and law students who need results
                  — fast
                </span>
              </li>
            </ul>

            {/* Tagline */}
            <p className="mt-7 text-center text-base font-bold text-foreground">
              Not a chatbot. A legal work engine.
            </p>
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
