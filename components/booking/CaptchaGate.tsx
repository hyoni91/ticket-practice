/** bot 방지  */
"use client"

import { useEffect, useRef, useState } from "react"


type Props = {
    onSuccess:()=>void;
}

export default function CaptchaGate({ onSuccess }: Props){


    //문자열 생성
    const generateCaptcha = (): string => {
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        return Array.from({ length: 6 }, () => 
        characters.charAt(Math.floor(Math.random() * characters.length))
        ).join("");
    };

    // bot captcha code
    const [code, setCode] = useState(() => generateCaptcha());

    // user input
    const [input, setInput] = useState("");

    // validation error
    const [error, setError] = useState(false);

    // current input ref
    const inputRef = useRef<HTMLInputElement>(null);




    useEffect(()=>{
        inputRef.current?.focus();
    },[])

    //핸들 함수 
    function handleSubmit(){
        if(input == code){
            console.log("OK")
            onSuccess();
        }else{
            console.log("X")
            //모든걸 다시 리셋하기 / 다시적기위해
        }
    }


    return(
        <div className="flex flex-col items-center justify-center text-center ">
            <div>
                {code}
            </div>
            <div>
            <input 
                ref={inputRef}
                value={input}
                maxLength={6}
                onChange={(e)=>{ setInput(e.target.value.toUpperCase())}}
                onKeyDown={(e)=> e.key === "Enter" && handleSubmit()}
                className="border-1 block outline-none text-center"
            >
            </input>
            <button 
                type="button" 
                onClick={()=>handleSubmit()}
                className="mt-4 pr-2"
            >
                인증하기
            </button>
            </div>

        </div>
    )
}

