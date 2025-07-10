interface NoElementsProps {
    image: string;
    text: string;
}

function NoElementYet(props: NoElementsProps) {
    const {image, text} = props
    return (
        <div className={"no-documents-block inline-flex flex-col justify-center items-center text-center absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2"}>
            <img src={image} alt="" className={"mb-[20px] max-h-[280px] max-w-[280px] max-[600px]:max-h-[200px] max-[350px]:max-h-[150px]"} />
            <h3 className={"text-[20px] font-bold text-[#03003C]"}>{text}</h3>
        </div>
    );
}

export default NoElementYet;