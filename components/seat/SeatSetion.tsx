/** SeatGrade Section Component */

import SeatGrid from "./SeatGrid";


type SeatSectionProps = {
    grade : "S" | "R" | "V";
    rowSize : number;
    colSize : number;
    onSeatClick: (seatNum: string) => void;
}

export default function SeatSection({grade, rowSize, colSize, onSeatClick}: SeatSectionProps) {

    const seats = [];

    for(let r = 0; r < rowSize; r++) {
        for(let c = 0; c < colSize; c++) {
          seats.push({
            seatNum : `${r}-${c}`,
            grade ,
            status : "available" as const,
          })
        }
    }



    return(
        <div>
            <SeatGrid seats={seats} cols={colSize} onSeatClick={onSeatClick} />
        </div>
    )
}