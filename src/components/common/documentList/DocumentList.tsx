import MyDocument from "@/components/common/MyDocument/MyDocument.tsx";
import {useEffect, useState} from "react";
import {useAppSelector} from "@/hooks/redux.ts";
import {UserRoles} from "@/models/User.ts";
import type {Documents} from "@/models/Document.ts";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import uploadIcon from "@/assets/upload.svg";
import DocumentService from "@/services/DocumentService.ts";
import {LoaderCircle} from "lucide-react";
import NoElementYet from "@/components/common/NoElementYet/NoElementYet.tsx";

interface DocumentsListProps {
    userId?: string;
}

function DocumentList(props: DocumentsListProps) {
    const {userId} = props;
    const user = useAppSelector(state => state.user.userData);

    const [documents, setDocuments] = useState<Documents[]>([]);
    const [searchString, setSearchString] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        user?.role === UserRoles.ADMIN ? getCertainUserDocumentsByAdmin() : getUserDocuments()
    },[searchString])

    async function getUserDocuments() {
        try {
            setIsLoading(true);
            const allDocuments = await DocumentService.getAllUserDocuments(searchString);
            setDocuments(allDocuments.data.data);
            setIsLoading(false);
        } catch (e) {
            console.log(e)
        }
    }

    async function getCertainUserDocumentsByAdmin() {
        try {
            setIsLoading(true);
            const allDocuments = await DocumentService.getCertainUserDocuments(userId!, searchString);
            setDocuments(allDocuments.data.data);
            setIsLoading(false);
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className="document-page-block w-full h-full flex flex-col">
            <div className="flex justify-between items-center mb-[40px]">
                <div className={"basis-[18%] text-[#03003C] text-[35px] font-medium"}>
                    Documents
                </div>
                <div className={"basis-[40%] flex justify-center items-center h-full"}>
                    <Input value={searchString} onChange={(e) => setSearchString(e.target.value)}
                        className={"bg-[#EBEBEB] min-h-[45px] h-full text-[20px] rounded-[15px] p-[15px]"}
                           placeholder="Search..."/>
                </div>
                <div className={"basis-[18%] flex justify-end items-center h-full"}>
                    <Button
                        className={"min-w-[200px] bg-[#1F2937] h-full text-[20px] flex justify-center items-center rounded-[15px] transition duration-300 hover:bg-[#847BEF] cursor-pointer"}>
                        <img src={uploadIcon} alt="icon"/>
                        Upload
                    </Button>
                </div>
            </div>
            <div
                className={"documents-list relative grow overflow-scroll h-[400px] grid justify-start gap-[20px] p-[5px] [grid-template-columns:repeat(auto-fill,minmax(300px,1fr))] [grid-template-rows:repeat(auto-fit,230px)]"}>
                {isLoading ? (
                    <div className="absolute inset-0 z-10 flex items-center justify-center">
                        <LoaderCircle className="animate-spin w-20 h-20 text-indigo-500 translate-y-[2px]"/>
                    </div>
                ) : (
                    documents.length > 0 ? (
                        documents.map((document) => (
                            <MyDocument doc={document} key={document.document_id}/>
                        ))
                    ) : (
                        <NoElementYet />
                    )
                )}
            </div>
        </div>
    )
}

export default DocumentList;