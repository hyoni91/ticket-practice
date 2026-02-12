export type SeatStatus = "available" | "taken" | "selected";


export type SeatType = {
    seatNum : string; //좌석 번호
    grade : "S" | "R" | "V"; //좌석 등급
    status : SeatStatus; //좌석 상태
}
