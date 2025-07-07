import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import uploadIcon from "@/assets/upload.svg"

function Documents() {
    return (
        <div className="document-page-block w-full h-full flex flex-col">
            <div className="flex justify-between items-center">
                <div className={"basis-[18%] text-[#03003C] text-[35px] font-medium"}>
                    Documents
                </div>
                <div className={"basis-[40%] flex justify-center items-center h-full"}>
                    <Input className={"bg-[#EBEBEB] min-h-[45px] h-full text-[20px] rounded-[15px] p-[15px]"} placeholder="Search..." />
                </div>
                <div className={"basis-[18%] flex justify-end items-center h-full"}>
                    <Button className={"min-w-[200px] h-full text-[20px] flex justify-center items-center rounded-[15px] transition duration-300 hover:bg-[#847BEF] cursor-pointer"}>
                        <img src={uploadIcon} alt="icon"/>
                        Upload
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Documents;