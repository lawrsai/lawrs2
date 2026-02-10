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
  DialogHeader,
  DialogTitle,
  DialogDescription,
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
          className="order-3 hidden items-center gap-2 rounded-full border border-pink-200/60 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 px-4 py-1.5 text-sm font-medium text-zinc-700 shadow-sm transition-all duration-300 hover:border-pink-300/80 hover:shadow-[0_0_16px_rgba(196,181,253,0.5)] md:ml-auto md:flex dark:border-purple-400/30 dark:from-blue-950/40 dark:via-purple-950/40 dark:to-pink-950/40 dark:text-zinc-200 dark:hover:border-purple-400/50 dark:hover:shadow-[0_0_16px_rgba(196,181,253,0.3)]"
          onClick={() => setShowSupreme(true)}
        >
          <Image
            alt=""
            className="size-4 dark:invert"
            height={16}
            src="/images/lawrs-icon.png"
            width={16}
          />
          Unlock SUPREME
        </button>
      </header>

      <Dialog open={showSupreme} onOpenChange={setShowSupreme}>
        <DialogContent className="overflow-hidden border-0 bg-transparent p-0 shadow-2xl max-w-[420px]">
          <DialogTitle className="sr-only">LAWRS SUPREME</DialogTitle>
          <DialogDescription className="sr-only">Upgrade to LAWRS SUPREME</DialogDescription>
          {/* Outer glow border wrapper */}
          <div className="rounded-2xl bg-gradient-to-br from-zinc-300 via-zinc-100 to-zinc-300 p-[1px] shadow-[0_0_60px_-15px_rgba(0,0,0,0.2)] dark:from-zinc-600 dark:via-zinc-400 dark:to-zinc-600">
            {/* Card body */}
            <div className="relative rounded-2xl bg-gradient-to-b from-zinc-950 to-zinc-900 px-8 py-10 text-white">
              {/* Subtle radial glow at top */}
              <div className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.08),transparent_60%)]" />

              {/* Badge */}
              <div className="relative flex justify-center">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-700 bg-zinc-800/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-zinc-300">
                  <span className="inline-block size-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.6)]" />
                  Premium
                </span>
              </div>

              {/* Title */}
              <h2 className="relative mt-6 text-center text-3xl font-bold tracking-tight">
                LAWRS{" "}
                <span className="bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
                  SUPREME
                </span>
              </h2>

              <p className="relative mt-2 text-center text-sm text-zinc-400">
                Our most advanced legal AI for serious legal work.
              </p>

              {/* Divider */}
              <div className="relative my-6 h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent" />

              {/* Features */}
              <ul className="relative space-y-4 text-[13px] leading-relaxed text-zinc-300">
                <li className="flex gap-3">
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-zinc-800 text-[10px] text-emerald-400 ring-1 ring-zinc-700">&#10003;</span>
                  Instantly analyze thousands of cases, statutes, and judicial opinions
                </li>
                <li className="flex gap-3">
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-zinc-800 text-[10px] text-emerald-400 ring-1 ring-zinc-700">&#10003;</span>
                  Draft full motions, briefs, and memoranda in minutes
                </li>
                <li className="flex gap-3">
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-zinc-800 text-[10px] text-emerald-400 ring-1 ring-zinc-700">&#10003;</span>
                  Spot issues, frame arguments, and structure analysis with precision
                </li>
                <li className="flex gap-3">
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-zinc-800 text-[10px] text-emerald-400 ring-1 ring-zinc-700">&#10003;</span>
                  Built for attorneys, clerks, and law students who need results — fast
                </li>
              </ul>

              {/* Tagline */}
              <p className="relative mt-6 text-center text-xs font-medium tracking-wide text-zinc-500 italic">
                Not a chatbot. A legal work engine.
              </p>

              {/* Divider */}
              <div className="relative my-6 h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent" />

              {/* Price */}
              <div className="relative text-center">
                <p className="text-4xl font-bold tracking-tight">
                  $25
                  <span className="ml-1 text-base font-normal text-zinc-500">/ mo</span>
                </p>
              </div>

              {/* CTA */}
              <Button className="relative mt-6 w-full rounded-xl bg-gradient-to-r from-white to-zinc-200 py-6 text-base font-semibold text-zinc-900 shadow-[0_0_20px_rgba(255,255,255,0.15)] transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.25)] hover:from-zinc-100 hover:to-zinc-300">
                Get SUPREME
              </Button>
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
