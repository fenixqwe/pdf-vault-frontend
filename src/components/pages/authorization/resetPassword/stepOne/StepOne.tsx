import {toast} from "sonner";

import {useNavigate, useOutletContext} from "react-router-dom";
import React, {useState} from "react";

import MyInput from "@/components/common/MyInput/MyInput.tsx";
import {Button} from "@/components/ui/button.tsx";

import logo from "@/assets/pdf_logo.svg"
import arrowIcon from "@/assets/arrow_return_btn_icon.svg"
import AuthService from "@/services/AuthService.ts";

function StepOne() {
    const [email, setEmail] = useState("");

    const navigate = useNavigate();
    const { setIsSendEmail } = useOutletContext<{setIsSendEmail: React.Dispatch<React.SetStateAction<boolean>>}>();

    const sendResetInstructionsPromise = () => new Promise( async (resolve, reject) => {
        try {
            await AuthService.requestResetPassword(email);
            setIsSendEmail(true);
            resolve({email: email});
        } catch (e: any) {
            reject(e.response.message);
        }
    })

    async function sendResetInstructions() {
        toast.promise(sendResetInstructionsPromise(), {
            loading: 'Sending instructions...',
            success: (data: any) => `Instruction on this "${data.email}" has been sent`,
            error: (errorMessage) => errorMessage,
        });
    }

    return (
        <>
            <div className={'step-one-form-wrap w-[350px]'}>
                <div>
                    <div className={'head text-center mb-[40px]'}>
                        <div className={'flex items-center justify-center mb-[20px]'}>
                            <img src={logo} alt="" className={'w-[80px] h-[80px] cursor-pointer'}/>
                        </div>
                        <div className={'mb-[34px]'}>
                            <h2 className={'text-[30px] leading-[36px] font-normal'}>
                                Want to change your password ?
                            </h2>
                        </div>
                        <div>
                            <p className={'text-left text-[16px] mb-[19px]'}>
                                Enter the email address you used when you joined and we’ll send you instructions to
                                reset your password.
                            </p>
                            <p className={'text-left text-[16px]'}>
                                For security reasons, we do NOT keep your password in plain text. So make sure we never
                                send your password by email.
                            </p>
                        </div>
                    </div>
                    <div className={'form mb-[15px]'}>
                        <div className={'flex flex-col'}>
                            <MyInput label={'Email Address'} value={email} changeValue={setEmail} id={"loginInput"}
                                     type={"text"} name={"email"}/>
                        </div>
                        <div>
                            <Button className={'w-full text-[14px] cursor-pointer h-[45px] bg-[#D85888] hover:!bg-[#847BEF] transition-all duration-500'} onClick={sendResetInstructions}>
                                Send Reset Instruction
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <div className={'flex justify-center w-full'}>
                <div className={'w-[65px] h-[65px] flex items-center justify-center cursor-pointer'} onClick={() => navigate('/signIn')}>
                    <img src={arrowIcon} alt=""/>
                </div>
            </div>
        </>
    );
}

export default StepOne;