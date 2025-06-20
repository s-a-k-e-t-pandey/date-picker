'use client'


export const Input = ({label, placeholder, onChange, type="text"}: {
    label: string,
    placeholder: string,
    onChange : (e: any) => void,
    type: "text" | "password"
}) =>{

    return <div>
        <div>
        * <label>{label}</label>
        </div>
        <input type={type} placeholder={placeholder} onChange={onChange} className="border rounded px-2 py-2 w-full"/>
    </div>
}