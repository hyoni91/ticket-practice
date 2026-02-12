/** SeatUI Component */

"use client"

import type { SeatType } from "@/types/seat";

type SeatProps = {
    seat : SeatType;
    onClick : (seatNum : string) => void;
}

export default function Seat({seat, onClick} : SeatProps) {

    // seatStatus color mapping
    const getColor = () => {
        if (seat.status === "taken") return "bg-red-500";
        if (seat.status === "selected") return "bg-blue-500";
        return "bg-purple-500";
    }

    return(
        <div className={`${getColor()} w-10 h-8 text-xs flex items-center justify-center text-white cursor-pointer hover:opacity-80`}
            onClick={() => onClick(seat.seatNum)}
        >
            {seat.seatNum}
        </div>
    )
}