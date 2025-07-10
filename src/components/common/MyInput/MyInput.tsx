import React from "react";

import {Input} from "@/components/ui/input.tsx";

interface MyInputProps {
    label: string;
    value: any;
    changeValue: React.Dispatch<React.SetStateAction<string>>
    id: string;
    type: string;
    name: string;
}

function MyInput(props: MyInputProps) {
    const { label, value, changeValue, id, type, name } = props;

    return (
        <div className={"flex flex-col mb-[10px]"}>
            <label htmlFor={id}
                   className={"text-[15px] font-bold mb-[10px] text-left text-[#636363]"}>
                {label}
            </label>
            <Input type={type} id={id} name={name} value={value} onChange={(e) => changeValue(e.target.value)}
                   className={"rounded-[8px] border-none px-2 py-3 outline-none text-sm bg-[#EBEBEB] text-[#000000]"} />
        </div>
    );
}

export default MyInput;