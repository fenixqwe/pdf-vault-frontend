import {Outlet} from "react-router-dom";
import {useState} from "react";

import signInLeftImage from "@/assets/login_vector.svg";
import logo from "@/assets/pdf_logo.svg"

function ResetPassword() {
    const [isSentEmailConfirmation, setIsSentEmailConfirmation] = useState(false);

    return (
        <div className={"bg-[#1E293B] flex min-h-screen"}>
            <div className={"left-side relative flex items-center box-border px-5 basis-[50%] max-[840px]:hidden"}>
                <div className={"company-block w-full flex flex-col items-center justify-center"}>
                    <img className={"max-w-full max-h-[500px] mb-[20px] pointer-events-none"} src={signInLeftImage}
                         alt=""/>
                    <h1 className={"text-[#E2E8F0] text-center !text-[40px] font-medium max-[1250px]:text-[30px] max-[1024px]:text-[34px] max-[1024px]:text-[34px]"}>
                        Upload, store, and share documents with ease
                        thanks to <span className={"text-[#847BEF]"}>PDF Vault</span>
                    </h1>
                </div>
            </div>

            <div
                className={"right-side basis-[50%] rounded-l-[40px] flex flex-col relative z-[1] bg-[#CBD5E1] max-[840px]:basis-[100%] max-[840px]:rounded-none"}>
                <div className={'reset-password-content flex items-center justify-evenly flex-col grow flex-wrap'}>
                    {isSentEmailConfirmation ? (
                        <div className={'confirmation-email-screen flex flex-col items-center justify-center grow'}>
                            <div className={'confirmation-email-block w-[380px] text-center'}>
                                <div className={'logo mb-[20px] flex justify-center items-center'}>
                                    <img className={'w-[80px] h-[80px] cursor-pointer'} src={logo} alt=""/>
                                </div>
                                <div>
                                    <h2 className={'text-[30px] font-normal leading-[36px] mb-[10px]'}>Сonfirmation link was sent!</h2>
                                    <p className={'leading-[20px] mb-[10px]'}>
                                        For security reasons, we've sent you an email that contains a link to confirm your email address.
                                    </p>
                                    <p>Confirm your email, and continue reset process.</p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <Outlet context={{
                            setIsSendEmail: setIsSentEmailConfirmation
                        }} />
                    )}
                </div>
            </div>
        </div>
    );
}

export default ResetPassword;