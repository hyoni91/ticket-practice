"use client";

import { useEffect, useRef, useState } from "react";


export function useCountdown(targetTime: Date) {

    const [remainingMs, setRemainingMs] = useState<number>(0); 
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const openedRef = useRef(false); // 오픈 여부 확인 
    const openAtRef = useRef<number | null>(null); // 예매창이 열린 순간 기록

    useEffect(()=>{
        const update = ()=>{
            const now = new Date().getTime();
            const diff = targetTime.getTime() - now;
            if(diff <= 0){
                setRemainingMs(0);
                if(!openedRef.current){ // 처음 오픈되는 순간 기록
                    openedRef.current = true; // 오픈 상태로 변경
                    openAtRef.current = performance.now(); // 예매창이 열린 순간 기록
                    setIsOpen(true); // 예매창 오픈 상태로 변경
                }
                clearInterval(timer); // 타이머 정리
            }else{
                setRemainingMs(diff);
            }
        }
        update(); // 컴포넌트가 마운트될 때 즉시 실행하여 초기 상태 설정

        const timer = setInterval(update, 16); // 16ms => 1프레임정도 간격으로 업데이트 

        return () => clearInterval(timer);
    },[targetTime])

    
    // Ms를 "HH:MM:SS" 형식으로 변환
    const formatTime = (ms: number) => {
        const totalSec = Math.floor(ms / 1000); //전체 시간을 초 단위로 변환
        const hours = Math.floor(totalSec / 3600); // 60초 * 60분 = 1시간
        const minutes = Math.floor((totalSec % 3600) / 60); // 1시간으로 나눈 나머지 초 단위를 60(1초)로 나눈 몫
        const seconds = totalSec % 60; // 60초(1분)로 나눈 나머지 
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    return {
    remainingText: formatTime(remainingMs),
    isOpen,
    openAtRef, 
  };

}