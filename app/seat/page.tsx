// app/seat/page.tsx
"use client";


import CaptchaGate from "@/components/booking/CaptchaGate";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import { GameStatus, SeatType } from "@/types/seat";
import SeatGrid from "@/components/seat/SeatGrid";
import Link from "next/link";

Modal.setAppElement("body"); // 접근성 경고 방지


  //좌석 생성 함수 & 10%w좌석 감소 시작
  const generateSeats = ():SeatType[]=>{
    const seats:SeatType[] = [];

    for(let r=0; r<10; r++){
      for(let c=0; c<30; c++){
        seats.push({
          seatNum: `${r}-${c}`,
          grade: "S",
          status: Math.random() < 0.30 ? "taken" : "available", 
        });
      }
    }

    return seats;
  }

export default function SeatPage() {
  const [captchaPassed, setCaptchaPassed] = useState(false)
  const [seats, setSeats] = useState<SeatType[]>(generateSeats());
  // 좌석 예약 게임
  const [timeLeft, setTimeLeft] = useState(4);
  const [gameStatus, setGameStatus] = useState<GameStatus>("ready");


    useEffect(() => {
    if (gameStatus !== "running") return;

    if (seats.some((seat) => seat.status === "selected")) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setGameStatus("success");
      alert("Success! 🎉")
    }
  }, [seats, gameStatus]);


  useEffect(()=>{
  
  if (gameStatus !== "running") return;


 const gameTimer = setInterval(() => {

  setTimeLeft(prev => {
    const newTime = prev - 1;
    const progress = (10 - prev) / 10;
    const probability = 0.05 + progress * 0.5; 

    // 좌석 랜덤 상태 변경(sold out 시뮬레이션)
    setSeats(prevSeats => {
      return prevSeats.map(seat => {
        if (seat.status === "available" && Math.random() < probability) {
          return { ...seat, status: "taken" };
        }
        return seat;
      });
    });

    // 실패 조건 
      if (newTime <= 0) {
          setGameStatus("fail");
          alert("sold out... 😢");
          return 0;
        }

        return newTime;
  });
}, 1000);
return () => clearInterval(gameTimer);

  },[gameStatus]) 






  const handleSeatClick = (seatNum: string) => {
    setSeats((prevSeats) =>
      prevSeats.map((seat) => {
        if (seat.seatNum === seatNum && seat.status === "available") {
          return {
            ...seat,
            status: "selected",
          };
        }
        if (seat.seatNum === seatNum && seat.status === "taken") {
          alert("This seat is no longer available.");
        }
        return seat;
      })
    );
  }


  return( 
    <div className="p-12 w-full h-screen flex flex-col items-center">
      {
        captchaPassed && (
          <SeatGrid 
            seats={seats} 
            cols={20} 
            onSeatClick={handleSeatClick}
          />
        )
      }

      <Modal
        isOpen={!captchaPassed}
        shouldCloseOnOverlayClick={false} 
        shouldCloseOnEsc={false}
        overlayClassName="fixed inset-0 bg-black/50"
        className="bg-white p-6 rounded shadow w-80 mx-auto mt-40"
      >
        <CaptchaGate onSuccess={()=>{setCaptchaPassed(true); setGameStatus("running");}} />
      </Modal>
      
      {
        gameStatus === "fail" &&  (
        <Link href="/" className="mt-10 p-2 text-xl text-gray-500 border-2 rounded cursor-pointer hover:bg-blue-500 hover:text-white transition">
         Go Home
        </Link>
        )
      }
      {
        gameStatus === "success" && (
        <Link href="/" className="mt-10 p-2 text-xl  text-gray-500 border-2 rounded cursor-pointer hover:bg-blue-500 hover:text-white transition">
         Go Home
        </Link>
        )
      }
    </div>
  )
}
