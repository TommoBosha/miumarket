import { BounceLoader } from "react-spinners";

export default function Spinner({ fullWidth }) {
    return (
        <div className={fullWidth ? "flex justify-center" : "border-2 border-blue-500 p-2"}>
            <BounceLoader speedMultiplier={3} color={'#555'} />
        </div>
    );
}