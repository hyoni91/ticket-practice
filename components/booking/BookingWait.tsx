"use client";



type Props = {
  remainingText: string; // e.g., "00:15:30"
  isOpen: boolean; 
  onClickStart: () => void;
};

export default function BookingWait({
  remainingText,
  isOpen,
  onClickStart,
}: Props) {

  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <h1 className="text-2xl font-bold">선예매 대기 중</h1>

      <p className="text-lg text-gray-400">
        예매 시작까지
      </p>

      <div className="text-4xl font-mono">
        {remainingText}
      </div>

      <button
        disabled={!isOpen}
        onClick={()=>{console.log("onClickStart"); onClickStart()}}
        className={`px-8 py-4 rounded text-lg
          ${
            isOpen
              ? "bg-blue-500 text-white"
              : "bg-gray-600 text-gray-400 cursor-not-allowed"
          }`}
      >
        예매시작하기
      </button>
    </div>
  );
}
