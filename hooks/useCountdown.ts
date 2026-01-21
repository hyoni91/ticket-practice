"use client";

import { useEffect, useRef, useState } from "react";


export function useCountdown(targetTime: Date) {

    const [remainingMs, setRemainingMs] = useState<number>(0); 
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const openedRef = useRef(false); // 오픈 여부 확인 
    const openAtRef = useRef<number | null>(null); // 예매창이 열린 순간 기록


    useEffect(()=>{
        const timer = setInterval(()=>{
            const now = new Date().getTime();
            const diff = targetTime.getTime() - now; // 남은 시간 계산

            if(diff <= 0){
                setRemainingMs(0);
                setIsOpen(true);

                if(!openedRef.current){ // 처음 오픈되는 순간 기록
                    openedRef.current = true; // 오픈 상태로 변경
                    openAtRef.current = performance.now(); // 예매창이 열린 순간 기록
                }
            } else {
                setRemainingMs(diff); // 남은 시간 업데이트
            }
        }, 50); // 50ms 간격으로 업데이트 --> 1초당 20번 업데이트

        return () => clearInterval(timer);

    },[targetTime]); // targetTime이 변경될 때마다 실행

    
    // Ms를 "HH:MM:SS" 형식으로 변환
    const formatTime = (ms: number) => {
        const totalSec = Math.floor(ms / 1000); //전체 시간을 초 단위로 변환
        const hours = Math.floor(totalSec / 3600); 
        const minutes = Math.floor((totalSec % 3600) / 60); 
        const seconds = totalSec % 60; // 분 단위로 환산 후 나머지 초 계산 
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    return {
    remainingText: isOpen ? "00:00" : formatTime(remainingMs),
    isOpen,
    openAtRef, 
  };

}