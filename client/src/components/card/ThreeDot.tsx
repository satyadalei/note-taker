import {
    MouseEventHandler, forwardRef, InputHTMLAttributes
} from "react";
import SmallDot from "./SmallDot"


interface SmallDotContent extends InputHTMLAttributes<HTMLInputElement> {
    className?: string;
    onClick?: MouseEventHandler<HTMLDivElement>;
    onMouseOver?: MouseEventHandler<HTMLDivElement>;
}



const ThreeDot = forwardRef<HTMLDivElement, SmallDotContent>(({ className, onClick, onMouseOver }, ref) => {
    return (
        <div ref={ref} onMouseOver={onMouseOver} onClick={onClick} className={`${className}`} >
            <SmallDot />
            <SmallDot />
            <SmallDot />
        </div>
    )
})

export default ThreeDot
export type { SmallDotContent }