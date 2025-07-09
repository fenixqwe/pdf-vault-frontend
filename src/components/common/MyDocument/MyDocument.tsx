import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup, DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import DocumentService from "@/services/DocumentService.ts";
import type {Documents} from "@/models/Document.ts";
import {Dialog, DialogContent, DialogTitle} from "@/components/ui/dialog.tsx";
import {useEffect, useState} from "react";
import {toast} from "sonner";
import {useActionCreators} from "@/hooks/redux.ts";
import {documentsActions} from "@/store/documents/slice.ts";
import MyAlertDialog from "@/components/common/MyAlertDialog/MyAlertDialog.tsx";

interface MyDocumentProps {
    doc: Documents;
}

function MyDocument(props: MyDocumentProps) {
    const {doc} = props;

    const documentsAction = useActionCreators(documentsActions);

    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    useEffect(() => {
        let timeout: number | null = null;

        if (!isDialogOpen && previewUrl) {
            timeout = window.setTimeout(() => {
                URL.revokeObjectURL(previewUrl);
                setPreviewUrl(null);
            }, 400);
        }

        return () => {
            if (timeout) clearTimeout(timeout);
        };
    }, [isDialogOpen]);

    async function downloadDocument() {
        const downloadPromise = () => new Promise(async (resolve, reject) => {
            try {
                const response = await DocumentService.downloadDocument(doc.document_id);

                const blob = new Blob([response.data], {
                    type: response.headers['content-type'],
                });
                const url = window.URL.createObjectURL(blob);

                const link = document.createElement('a');
                link.href = url;
                link.download = `${doc.name || 'document'}.pdf`;
                document.body.appendChild(link);
                link.click();

                link.remove();
                window.URL.revokeObjectURL(url);

                resolve({ name: doc.name });
            } catch (e: any) {
                reject("Unknown error while downloading document");
            }
        });

        toast.promise(downloadPromise(), {
            loading: 'Downloading document...',
            success: (data: any) => `Document "${data.name}" downloaded successfully`,
            error: (errorMessage) => errorMessage,
        });
    }

    async function handlePreview() {
        try {
            const response = await DocumentService.previewDocument(doc.document_id);
            const blob = new Blob([response.data], {
                type: response.headers['Content-Type'] as string || 'application/pdf'
            });

            const url = URL.createObjectURL(blob);
            setPreviewUrl(url);
            setIsDialogOpen(true);
        } catch (e) {
            toast.error("Error getting document preview");
        }
    }

    const deleteDocPromise = () => new Promise(async (resolve, reject) => {
        try {
            await DocumentService.deleteDocument(doc.document_id);

            documentsAction.deleteDocument(doc.document_id);
            resolve({ name: doc.name });
        } catch (e: any) {
            reject(e.response.message)
        }
    });

    async function handleDeleteDocument() {
        toast.promise(deleteDocPromise(), {
            loading: 'Deleting document...',
            success: (data: any) => `Document "${data.name}" deleted successfully`,
            error: (errorMessage) => errorMessage,
        });
    }

    return (
        <>
            <div onClick={downloadDocument}
                className={"document-card w-full h-[230px] rounded-[10px] flex flex-col overflow-hidden cursor-pointer shadow-[0_0_4px_rgba(0,0,0,0.25)] hover:shadow-[0_0_8px_rgba(0,0,0,0.5)] transition-shadow duration-300"}>
                <div className={"card-bg basis-[70%] relative bg-[#94A3B8]"}>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <div onClick={(e) => e.stopPropagation()}
                                 className={"settings bg-white flex items-center justify-center absolute top-[10px] right-[8px] p-[8px] rounded-[20px]"}>
                                <svg width="25" height="7" viewBox="0 0 25 7"
                                     className="fill-[#9A9A9A] transition duration-300"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <rect width="6.75676" height="6.75676" rx="3.37838"/>
                                    <rect x="9.45898" width="6.75676" height="6.75676" rx="3.37838"/>
                                    <rect x="18.2441" width="6.75676" height="6.75676" rx="3.37838"/>
                                </svg>
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent onClick={(e) => e.stopPropagation()}>
                            <DropdownMenuGroup>
                                <DropdownMenuItem className={"cursor-pointer"} onClick={handlePreview}>
                                    Preview
                                </DropdownMenuItem>
                                <DropdownMenuItem className={"cursor-pointer"} onClick={() => setIsDeleteDialogOpen(true)}>
                                    Delete
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <div
                        className={"card-body w-[75px] h-[75px] absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2"}>
                        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"
                             className={"w-full h-full"}>
                            <path fillRule="evenodd" clipRule="evenodd"
                                  d="M19.395 4.395C15 8.785 15 15.86 15 30V70C15 84.14 15 91.215 19.395 95.605C23.785 100 30.86 100 45 100H55C69.14 100 76.215 100 80.605 95.605C85 91.215 85 84.14 85 70V30C85 15.86 85 8.785 80.605 4.395C76.215 -2.98023e-07 69.14 0 55 0H45C30.86 0 23.785 -2.98023e-07 19.395 4.395ZM31.25 75C31.25 74.0054 31.6451 73.0516 32.3484 72.3483C33.0516 71.6451 34.0054 71.25 35 71.25H50C50.9946 71.25 51.9484 71.6451 52.6516 72.3483C53.3549 73.0516 53.75 74.0054 53.75 75C53.75 75.9946 53.3549 76.9484 52.6516 77.6517C51.9484 78.3549 50.9946 78.75 50 78.75H35C34.0054 78.75 33.0516 78.3549 32.3484 77.6517C31.6451 76.9484 31.25 75.9946 31.25 75ZM35 51.25C34.0054 51.25 33.0516 51.6451 32.3484 52.3484C31.6451 53.0516 31.25 54.0054 31.25 55C31.25 55.9946 31.6451 56.9484 32.3484 57.6516C33.0516 58.3549 34.0054 58.75 35 58.75H65C65.9946 58.75 66.9484 58.3549 67.6516 57.6516C68.3549 56.9484 68.75 55.9946 68.75 55C68.75 54.0054 68.3549 53.0516 67.6516 52.3484C66.9484 51.6451 65.9946 51.25 65 51.25H35ZM31.25 35C31.25 34.0054 31.6451 33.0516 32.3484 32.3484C33.0516 31.6451 34.0054 31.25 35 31.25H65C65.9946 31.25 66.9484 31.6451 67.6516 32.3484C68.3549 33.0516 68.75 34.0054 68.75 35C68.75 35.9946 68.3549 36.9484 67.6516 37.6516C66.9484 38.3549 65.9946 38.75 65 38.75H35C34.0054 38.75 33.0516 38.3549 32.3484 37.6516C31.6451 36.9484 31.25 35.9946 31.25 35Z"
                                  fill="#E2E8F0"/>
                            <path opacity="0.5"
                                  d="M16.175 10.2899C15 14.7049 15 20.8849 15 29.9999V69.9999C15 79.1149 15 85.2899 16.175 89.7099L15 89.6199C10.125 89.1399 6.845 88.0549 4.395 85.6049C-2.98023e-07 81.2149 0 74.1399 0 59.9999V39.9999C0 25.8549 -2.98023e-07 18.7849 4.395 14.3949C6.845 11.9449 10.125 10.8599 15 10.3799L16.175 10.2899ZM83.825 89.7099C85 85.2899 85 79.1099 85 69.9999V29.9999C85 20.8849 85 14.7049 83.825 10.2899L85 10.3799C89.875 10.8599 93.155 11.9449 95.605 14.3949C100 18.7849 100 25.8499 100 39.9949V59.9949C100 74.1449 100 81.2099 95.605 85.6049C93.155 88.0549 89.875 89.1399 85 89.6199L83.825 89.7099Z"
                                  fill="#E2E8F0"/>
                        </svg>

                    </div>
                </div>
                <div
                    className={"document-info-block basis-[30%] flex items-center justify-center p-[15px] box-border bg-[#111827]"}>
                    <div className={"document-info font-bold"}>
                        <h4 className={"whitespace-nowrap max-w-[300px] overflow-hidden text-ellipsis transition-colors duration-300 text-[#F3F4F6] max-[400px]:max-w-[200px] max-[350px]:max-w-[140px]"}>{doc.name}</h4>
                    </div>
                </div>
            </div>
            <MyAlertDialog title={'Are you absolutely sure?'}
                           description={'This will permanently delete this document from our servers'}
                           continueFunction={handleDeleteDocument}  open={isDeleteDialogOpen} changeIsOpen={setIsDeleteDialogOpen}/>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent aria-describedby={undefined} style={{ width: "90vw", maxWidth: "1000px" }} showCloseButton={false}>
                    <DialogTitle className={"text-[35px] flex justify-center items-center"}>Preview</DialogTitle>
                    <div>
                        {previewUrl && (
                            <object
                                data={previewUrl}
                                type="application/pdf"
                                width="100%"
                                height="800px" />
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}

export default MyDocument;