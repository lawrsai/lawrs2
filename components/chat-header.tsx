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
        <DialogContent className="max-h-[90vh] max-w-[440px] overflow-hidden overflow-y-auto rounded-3xl border border-white/30 bg-gradient-to-b from-[#f8f9ff] via-white to-[#f2f4ff] p-0 shadow-[0_24px_90px_rgba(15,23,42,0.35)] dark:border-white/10 dark:from-[#0a0b16] dark:via-[#111226] dark:to-[#12162a]">
          <DialogTitle className="sr-only">LAWRS SUPREME</DialogTitle>
          <DialogDescription className="sr-only">
            Upgrade to LAWRS SUPREME
          </DialogDescription>

          <div className="relative px-7 pb-7 pt-8">
            <div className="pointer-events-none absolute -left-12 -top-16 h-40 w-40 rounded-full bg-indigo-400/20 blur-3xl dark:bg-indigo-500/20" />
            <div className="pointer-events-none absolute -right-12 top-24 h-40 w-40 rounded-full bg-cyan-400/20 blur-3xl dark:bg-cyan-500/15" />

            <div className="relative z-10">
              <div className="mx-auto w-fit rounded-full border border-indigo-300/60 bg-white/80 px-3 py-1 text-[0.65rem] font-semibold tracking-[0.24em] text-indigo-700 backdrop-blur dark:border-indigo-400/40 dark:bg-indigo-400/10 dark:text-indigo-200">
                PREMIUM PLAN
              </div>

              <h2 className="mt-4 text-center text-[1.95rem] font-semibold tracking-tight text-foreground">
                LAWRS SUPREME
              </h2>

              <p className="mt-2 text-center text-sm text-muted-foreground">
                AI operating system for elite legal teams.
              </p>

              <div className="mt-5 rounded-2xl border border-white/80 bg-white/75 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_10px_30px_rgba(2,6,23,0.08)] backdrop-blur dark:border-white/10 dark:bg-white/5 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_14px_35px_rgba(0,0,0,0.35)]">
                <div className="flex items-end justify-between">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-base text-muted-foreground">$</span>
                    <span className="text-5xl font-semibold leading-none tracking-tight text-foreground">
                      25
                    </span>
                    <div className="mb-1 ml-1 flex flex-col text-xs leading-tight text-muted-foreground">
                      <span>USD /</span>
                      <span>month</span>
                    </div>
                  </div>
                  <span className="rounded-full border border-emerald-300/80 bg-emerald-50 px-2.5 py-1 text-[0.7rem] font-semibold text-emerald-700 dark:border-emerald-400/30 dark:bg-emerald-400/10 dark:text-emerald-300">
                    Cancel anytime
                  </span>
                </div>

                <Button className="mt-4 h-12 w-full rounded-xl bg-gradient-to-r from-[#0f172a] via-[#1d4ed8] to-[#0f172a] text-sm font-semibold text-white shadow-[0_10px_24px_rgba(29,78,216,0.4)] transition-all hover:brightness-110 dark:from-[#dbeafe] dark:via-white dark:to-[#dbeafe] dark:text-slate-900">
                  Activate SUPREME Access
                </Button>
              </div>

              <div className="my-6 h-px bg-gradient-to-r from-transparent via-zinc-300 to-transparent dark:via-zinc-700" />

              <ul className="space-y-3.5">
                <li className="flex items-start gap-3 rounded-xl border border-zinc-200/80 bg-white/70 p-3.5 shadow-sm backdrop-blur dark:border-zinc-700/80 dark:bg-white/5">
                  <svg
                    className="mt-0.5 size-5 shrink-0 text-indigo-600 dark:text-indigo-300"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.8"
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
                <li className="flex items-start gap-3 rounded-xl border border-zinc-200/80 bg-white/70 p-3.5 shadow-sm backdrop-blur dark:border-zinc-700/80 dark:bg-white/5">
                  <svg
                    className="mt-0.5 size-5 shrink-0 text-indigo-600 dark:text-indigo-300"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.8"
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
                <li className="flex items-start gap-3 rounded-xl border border-zinc-200/80 bg-white/70 p-3.5 shadow-sm backdrop-blur dark:border-zinc-700/80 dark:bg-white/5">
                  <svg
                    className="mt-0.5 size-5 shrink-0 text-indigo-600 dark:text-indigo-300"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.8"
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
                <li className="flex items-start gap-3 rounded-xl border border-zinc-200/80 bg-white/70 p-3.5 shadow-sm backdrop-blur dark:border-zinc-700/80 dark:bg-white/5">
                  <svg
                    className="mt-0.5 size-5 shrink-0 text-indigo-600 dark:text-indigo-300"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.8"
                    viewBox="0 0 24 24"
                  >
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                  </svg>
                  <span className="text-sm text-foreground">
                    Built for attorneys, clerks, and law students who need
                    results — fast
                  </span>
                </li>
              </ul>

              <p className="mt-6 text-center text-base font-semibold text-foreground">
                Not a chatbot. Your legal command center.
              </p>
            </div>
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
