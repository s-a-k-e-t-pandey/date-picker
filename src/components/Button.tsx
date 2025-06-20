'use client'
import type { ReactNode } from "react"

export const Button = ({children, onClick, size="small"} : {children: ReactNode, onClick: ()=> void, size?: "big" | "small"}) =>{
    return <div className={`${size === 'small' ? "px-8 py-2 text-sm" : "px-12 py-4 text-xl"} 
        bg-white justify-center cursor-pointer text-black transition-colors hover:shadow-lg rounded-full border `} 
        onClick={onClick}>
        {children}
    </div>
}