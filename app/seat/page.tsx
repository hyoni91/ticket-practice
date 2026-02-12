// app/seat/page.tsx
"use client";


import CaptchaGate from "@/components/booking/CaptchaGate";
import { useState } from "react";
import Modal from "react-modal";
import { SeatType } from "@/types/seat";
import SeatGrid from "@/components/seat/SeatGrid";

Modal.setAppElement("body"); // 접근성 경고 방지


  //좌석 생성 함수
  const generateSeats = ():SeatType[]=>{
    const seats:SeatType[] = [];
    for(let r=0; r<10; r++){
      for(let c=0; c<10; c++){
        seats.push({
          seatNum: `${r}-${c}`,
          grade: "S",
          status: "available",
        });
      }
    }
    return seats;
  }

export default function SeatPage() {
  const [captchaPassed, setCaptchaPassed] = useState(false)
  const [seats, setSeats] = useState<SeatType[]>(generateSeats());

  const handleSeatClick = (seatNum: string) => {
    setSeats((prevSeats) =>
      prevSeats.map((seat) =>
        seat.seatNum === seatNum
          ? {
              ...seat,
              status: 
              seat.status === "selected" ? "available" : "selected",
            }
          : seat
      )
    );
  }


  return( 
    <div className="p-10">
      {
        captchaPassed && (
          <SeatGrid 
            seats={seats} 
            cols={10} 
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
        <CaptchaGate onSuccess={()=>setCaptchaPassed(true)} />
      </Modal>
       
    </div>
  )
}
