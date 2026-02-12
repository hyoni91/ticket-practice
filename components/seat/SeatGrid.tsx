/** SeatGrid Component */

"use client"

import { SeatType } from "@/types/seat"
import Seat from "./Seat";

type SeatGridProps = {
    seats : SeatType[];
    cols : number;
    onSeatClick: (seatNum : string) => void;
}

export default function SeatGrid({seats, cols, onSeatClick} : SeatGridProps) {

    return(
        <div className={`grid gap-2`}style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
           {
            seats.map((seat) => (
                <Seat 
                    key={seat.seatNum}
                    seat={seat}
                    onClick={onSeatClick}
                />
            ))
           }
        </div>
    )
}