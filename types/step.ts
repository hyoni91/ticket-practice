export type Step =
 | "WAIT"          // 오픈 대기
  | "RESULT"        // 반응속도 결과
  | "CAPTCHA"       // 봇 방지 문자열
  | "SEAT"          // 좌석 선택
  | "SUCCESS"       // 성공
  | "FAIL";         // 실패