import React from "react";

import {toast} from "sonner";

import DocumentService from "@/services/DocumentService.ts";

import {useEffect, useRef, useState} from "react";
import {useActionCreators, useAppSelector} from "@/hooks/redux.ts";
import {useNavigate} from "react-router-dom";

import {documentsActions} from "@/store/documents/slice.ts";

import {UserRoles} from "@/models/User.ts";

import DocumentCard from "@/components/pages/user/documents/documentList/documentCard/DocumentCard.tsx";
import {Button} from "@/components/ui/button.tsx";
import NoElementYet from "@/components/common/NoElementYet/NoElementYet.tsx";
import ContentHeader from "@/components/common/contentHeader/ContentHeader.tsx";
import MySpinner from "@/components/common/MySpinner/MySpinner.tsx";

import uploadIcon from "@/assets/upload.svg";
import returnIcon from "@/assets/returnIcon.svg";
import dragAndDropIcon from "@/assets/dragAndDropIcon.svg";

interface DocumentsListProps {
    userId?: string;
}

function DocumentList(props: DocumentsListProps) {
    const { userId } = props;

    const [searchString, setSearchString] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [dragEnter, setDragEnter] = useState<boolean>(false);

    const inputRef = useRef<HTMLInputElement | null>(null);

    const navigate = useNavigate();
    const user = useAppSelector(state => state.user.userData);
    const documents = useAppSelector(state => state.documents.documents);

    const documentsAction = useActionCreators(documentsActions);

    useEffect(() => {
        user?.role === UserRoles.ADMIN ? getCertainUserDocumentsByAdmin() : getUserDocuments();
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

    const uploadPromise = (formData: FormData) => new Promise(async (resolve, reject) => {
        try {
            const response = await (
                user?.role === UserRoles.ADMIN ?
                    DocumentService.uploadDocumentForUser(formData, userId!) :
                    DocumentService.uploadDocument(formData)
            );

            documentsAction.addNewDocument(response.data.data);

            resolve({name: response.data.data.name});
        } catch (e: any) {
            reject(e.response.data.message);
        }
    })

    function formatFile(file: File) {
        const newFileName = encodeURIComponent(file.name);

        const newFile = new File([file], newFileName, { type: file.type });

        const formData = new FormData();
        formData.append("file", newFile);

        return formData
    }

    async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;

        const formData = formatFile(file);

        toast.promise(uploadPromise(formData), {
            loading: 'Uploading document...',
            success: (data: any) => `Document "${data.name}" was uploaded successfully`,
            error: (errorMessage) => errorMessage,
        });
    }

    function dragEnterHandler(e: any) {
        e.preventDefault();
        e.stopPropagation();
        setDragEnter(true);
    }

    function dragLeaveHandler(e: any) {
        e.preventDefault();
        e.stopPropagation();

        const currentTarget = e.currentTarget;
        const relatedTarget = e.relatedTarget as Node | null;

        if (!currentTarget.contains(relatedTarget)) {
            setDragEnter(false);
        }
    }

    async function dropHandler(e: any) {
        e.preventDefault();
        e.stopPropagation();
        setDragEnter(false);

        const files = e.dataTransfer.files;
        if (!files || files.length === 0) return;

        const uploadTasks = Array.from(files as File[]).map((file) => {
            const formData = formatFile(file);

            return uploadPromise(formData);
        });

        toast.promise(Promise.all(uploadTasks), {
                loading: 'Uploading documents...',
                success: 'All documents uploaded successfully',
                error: 'Some uploads failed',
            }
        );
    }

    return (
        <div className="document-page-block w-full h-full flex flex-col">
            <ContentHeader title={'Documents'} searchString={searchString} setSearchString={setSearchString}>
                <div className={`flex gap-[5px] h-full`}>
                    <div className={'w-full h-full'}>
                        <input
                            type="file"
                            accept=".pdf"
                            id={'uploadDocument'}
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
                    {user?.role === UserRoles.ADMIN && (
                        <Button
                            onClick={() => navigate(`/main/admin-panel`)}
                            className={"min-w-[200px] bg-[#1F2937] h-full text-[20px] flex justify-center items-center rounded-[15px] transition duration-300 hover:bg-[#847BEF] cursor-pointer max-[850px]:w-full"}>
                            <img src={returnIcon} alt="icon"/>
                            Return
                        </Button>
                    )}
                </div>
            </ContentHeader>
            {!dragEnter ? (
                <div onDragEnter={dragEnterHandler}
                     onDragLeave={dragLeaveHandler}
                    className={"documents-list relative grow overflow-scroll h-[400px] grid justify-start gap-[20px] p-[5px] [grid-template-columns:repeat(auto-fill,minmax(300px,1fr))] [grid-template-rows:repeat(auto-fit,230px)] max-[400px]:[grid-template-columns:repeat(auto-fill,minmax(200px,1fr))]"}>
                    {isLoading ? (
                        <MySpinner/>
                    ) : (
                        documents.length > 0 ? (
                            documents.map((document) => (
                                <DocumentCard doc={document} key={document.document_id}/>
                            ))
                        ) : (
                            <NoElementYet/>
                        )
                    )}
                </div>
            ) : (
                <div onDragEnter={dragEnterHandler}
                     onDragLeave={dragLeaveHandler}
                     onDragOver={dragEnterHandler}
                     onDrop={dropHandler}
                    className={'h-full flex flex-col justify-center items-center bg-[#CBD5E1] border-[#878585] border-2 border-dashed transition duration-300'}>
                    <img className={'w-[275px] h-[275px] mb-[15px]'} src={dragAndDropIcon} alt=""/>
                    <h2 className={'text-[30px] font-semibold'}>Drag and drop or browse to choose a file</h2>
                </div>
            )}
        </div>
    )
}

export default DocumentList;