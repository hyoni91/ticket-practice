"use client";


import BookingWait from "@/components/booking/BookingWait";
import { useCountdown } from "@/hooks/useCountdown";
import { Step } from "@/types/step";
import { useRef, useState } from "react";

export default function Home() {

  const COUNTDOWN_SECONDS = 10;

  const [openTime, setOpenTime] = useState(
    () => new Date(Date.now() + COUNTDOWN_SECONDS * 1000)
  );

  const { remainingText, isOpen, openAtRef } = useCountdown(openTime);

  const [reactionMs, setReactionMs] = useState<number | null>(null);

  const [step, setStep] = useState<Step>("WAIT"); 

  const handleStart = () => {
    if(!openAtRef.current) return;

    const clickedAt = performance.now();
    const reaction = clickedAt - openAtRef.current;

    setReactionMs(Math.floor(reaction)); // 반응 속도 밀리초 단위로 저장
    setStep("RESULT");

    }

  return (
    <div className="flex flex-row min-h-screen items-center justify-between p-20  bg-zinc-50 font-sans dark:bg-black">
     <div>
      <h1 className="text-4xl font-bold mt-20">티켓 예매 연습용 사이트</h1>
     </div>
     {step === "WAIT" && (
        <BookingWait
          remainingText={remainingText}
          isOpen={isOpen}
          onClickStart={handleStart}
        />
      )}

      {step === "RESULT" && (
        <div className="text-center">
          <h2 className="text-2xl mb-4">반응속도</h2>
          <p className="text-4xl font-mono">
            {reactionMs} ms
          </p>
        </div>
      )}
    </div>
  );
}






