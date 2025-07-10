import {LoaderCircle} from "lucide-react";

function MySpinner() {
    return (
        <div className="absolute inset-0 z-10 flex items-center justify-center">
            <LoaderCircle className="animate-spin w-20 h-20 text-indigo-500 translate-y-[2px]"/>
        </div>
    );
}

export default MySpinner;