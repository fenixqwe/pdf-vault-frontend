import noDocumentsImage from "@/assets/no-documents.svg"

function NoElementYet() {
    return (
        <div className={"no-documents-block inline-flex flex-col justify-center items-center text-center absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2"}>
            <img src={noDocumentsImage} alt="" className={"mb-[20px]"} />
            <h3 className={"text-[20px] font-bold text-[#03003C]"}>You don't have any documents yet</h3>
        </div>
    );
}

export default NoElementYet;