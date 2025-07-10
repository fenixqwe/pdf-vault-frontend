import React from 'react';

import {
    AlertDialog, AlertDialogAction,
    AlertDialogCancel, AlertDialogContent, AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader, AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog.tsx";

interface MyAlertDialogProps {
    title: string;
    description: string;
    children?: React.ReactNode;
    continueFunction: () => void;
    cancelFunction?: () => void;
    open?: boolean;
    changeIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

function MyAlertDialog(props: MyAlertDialogProps) {
    const {title, description, children, continueFunction, cancelFunction, open, changeIsOpen} = props;

    return (
        <AlertDialog open={open} onOpenChange={changeIsOpen}>
            <AlertDialogTrigger asChild>
                {children}
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>{description}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={cancelFunction} className={'bg-[#111827] text-[#F3F4F6] hover:text-[#F3F4F6] hover:bg-[#E87474] cursor-pointer'}>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={continueFunction} className={'bg-[#111827] hover:bg-[#847BEF] text-[#F3F4F6] cursor-pointer'}>Ok</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

export default MyAlertDialog;