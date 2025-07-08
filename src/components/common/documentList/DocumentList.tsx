import MyDocument from "@/components/common/MyDocument/MyDocument.tsx";
import React, {useEffect, useRef, useState} from "react";
import {useActionCreators, useAppSelector} from "@/hooks/redux.ts";
import {UserRoles} from "@/models/User.ts";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import uploadIcon from "@/assets/upload.svg";
import DocumentService from "@/services/DocumentService.ts";
import {LoaderCircle} from "lucide-react";
import NoElementYet from "@/components/common/NoElementYet/NoElementYet.tsx";
import {toast} from "sonner";
import {documentsActions} from "@/store/documents/slice.ts";

interface DocumentsListProps {
    userId?: string;
}

function DocumentList(props: DocumentsListProps) {
    const {userId} = props;
    const user = useAppSelector(state => state.user.userData);
    const documents = useAppSelector(state => state.documents.documents);

    const documentsAction = useActionCreators(documentsActions);

    const [searchString, setSearchString] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        user?.role === UserRoles.ADMIN ? getCertainUserDocumentsByAdmin() : getUserDocuments()
    },[searchString])

    async function getUserDocuments() {
        try {
            setIsLoading(true);
            const allDocuments = await DocumentService.getAllUserDocuments(searchString);
            documentsAction.changeDocuments(allDocuments.data.data);
            setIsLoading(false);
        } catch (e: any) {
            setIsLoading(false);
            toast.error(e.response.data.message);
        }
    }

    async function getCertainUserDocumentsByAdmin() {
        try {
            setIsLoading(true);
            const allDocuments = await DocumentService.getCertainUserDocuments(userId!, searchString);
            documentsAction.changeDocuments(allDocuments.data.data);
            setIsLoading(false);
        } catch (e: any) {
            setIsLoading(false);
            toast.error(e.response.data.message);
        }
    }

    function handleButtonClick() {
        inputRef.current?.click();
    }

    async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;

        const newFileName = encodeURIComponent(file.name);

        const newFile = new File([file], newFileName, { type: file.type });

        const formData = new FormData();
        formData.append("file", newFile);

        const uploadPromise = () => new Promise(async (resolve, reject) => {
            try {
                const response = await DocumentService.uploadDocument(formData);

                documentsAction.addNewDocument(response.data.data);

                resolve({name: response.data.data.name});
            } catch (e: any) {
                reject(e.response.data.message);
            }
        })

        toast.promise(uploadPromise(), {
            loading: 'Uploading document...',
            success: (data: any) => `Document "${data.name}" was uploaded successfully`,
            error: (errorMessage) => errorMessage,
        });
    }

    return (
        <div className="document-page-block w-full h-full flex flex-col">
            <div className="flex justify-between items-center mb-[40px] max-[850px]:flex-col max-[850px]:justify-center max-[850px]:items-center max-[850px]:gap-[15px]">
                <div className={"basis-[18%] text-[#03003C] text-[35px] font-medium max-[850px]:w-full max-[850px]:text-center"}>
                    Documents
                </div>
                <div className={"basis-[40%] flex justify-center items-center h-full max-[850px]:w-full"}>
                    <Input value={searchString} onChange={(e) => setSearchString(e.target.value)}
                        className={"bg-[#EBEBEB] min-h-[45px] h-full text-[20px] rounded-[15px] p-[15px]"}
                           placeholder="Search..."/>
                </div>
                <div className={"basis-[18%] flex justify-end items-center h-full max-[850px]:w-full"}>
                    <input
                        type="file"
                        accept=".pdf"
                        ref={inputRef}
                        onChange={handleFileChange}
                        className={"hidden"}
                    />
                    <Button
                        onClick={handleButtonClick}
                        className={"min-w-[200px] bg-[#1F2937] h-full text-[20px] flex justify-center items-center rounded-[15px] transition duration-300 hover:bg-[#847BEF] cursor-pointer max-[850px]:w-full"}>
                        <img src={uploadIcon} alt="icon"/>
                        Upload
                    </Button>
                </div>
            </div>
            <div
                className={"documents-list relative grow overflow-scroll h-[400px] grid justify-start gap-[20px] p-[5px] [grid-template-columns:repeat(auto-fill,minmax(300px,1fr))] [grid-template-rows:repeat(auto-fit,230px)] max-[400px]:[grid-template-columns:repeat(auto-fill,minmax(200px,1fr))]"}>
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