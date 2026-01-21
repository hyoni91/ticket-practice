

type Props = {
    onNext: () => void;
}

export default function RoundSelect({onNext}: Props) {
    

    return (
        <div>
            <div>
                <h2>관람일</h2>
                <div>
                    <button>4월 9일 - 20:00</button>
                    <button>4월 11일 - 20:00</button>
                    <button>4월 12일 - 20:00</button>


                </div>
            </div>
            <button onClick={onNext}>예매하기</button>
        </div>
    )
}