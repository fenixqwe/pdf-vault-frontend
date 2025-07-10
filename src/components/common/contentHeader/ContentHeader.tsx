import React from "react";

import {Input} from "@/components/ui/input.tsx";

interface ContentHeaderProps {
    title: string;
    searchString: string;
    setSearchString:  React.Dispatch<React.SetStateAction<string>>;
    children?: React.ReactNode;
}

function ContentHeader(props: ContentHeaderProps) {
    const {title, searchString, setSearchString, children} = props;

    return (
        <div
            className="flex justify-between gap-[5px] items-center mb-[40px] max-[850px]:flex-col max-[850px]:justify-center max-[850px]:items-center max-[850px]:gap-[15px]">
            <div
                className={"basis-[18%] text-[#03003C] text-[35px] font-medium max-[1100px]:text-[30px] max-[850px]:w-full max-[850px]:text-center"}>
                {title}
            </div>
            <div className={"basis-[40%] flex justify-center items-center h-full max-[850px]:w-full"}>
                <Input value={searchString} onChange={(e) => setSearchString(e.target.value)} id="search-input"
                       className={"bg-[#EBEBEB] min-h-[45px] h-full text-[20px] rounded-[15px] p-[15px]"}
                       placeholder="Search..."/>
            </div>
            <div className={"basis-[18%] flex justify-end items-center h-full max-[850px]:w-full"}>
                {children}
            </div>
        </div>
    );
}

export default ContentHeader;