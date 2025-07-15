import {toast} from "sonner";

import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

import AuthService from "@/services/AuthService.ts";

import MyInput from "@/components/common/MyInput/MyInput.tsx";
import {Button} from "@/components/ui/button.tsx";

import logo from "@/assets/pdf_logo.svg"
import confirmLogo from "@/assets/confirmPasswordIcon.svg"
import arrowIcon from "@/assets/arrow_return_btn_icon.svg";

function StepTwo() {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        if (!window.location.href?.includes('resetPassword/newPassword?token=')) {
            navigate('/resetPassword');
        }
    }, []);

    const changePasswordPromise = () => new Promise(async (resolve, reject) => {
        try {
            const resetToken = window.location.href?.split('resetPassword/newPassword?token=')[1];
            const response = await AuthService.resetPassword(resetToken, newPassword);
            navigate('/resetPassword/passwordUpdated');
            resolve(response.data.message);
        } catch (e: any) {
            reject(e.response.data.message);
        }
    })

    async function changePassword() {
        toast.promise(changePasswordPromise(), {
            loading: 'Changing password...',
            success: (data: any) => data,
            error: (errorMessage) => errorMessage,
        });
    }

    return (
        <>
            <div className={'step-two-form-wrap w-[350px]'}>
                <div>
                    <div className={'step-two-head text-center mb-[40px]'}>
                        <div className={'flex items-center justify-center mb-[20px]'}>
                            <img src={logo} alt="" className={'w-[80px] h-[80px] cursor-pointer'}/>
                        </div>
                        <div className={'mb-[34px] flex items-center justify-center'}>
                            <h2 className={'text-[30px] leading-[36px] font-normal mr-[10px]'}>Email confirmed</h2>
                            <img src={confirmLogo} alt=""/>
                        </div>
                        <div>
                            <p className={'text-left text-[16px]'}>
                                Your email is confirmed, we have not verified your account. Now you can enter your new password.
                            </p>
                        </div>
                    </div>
                    <div className={'step-two-form'}>
                        <div>
                            <MyInput label={'New password'} value={newPassword} changeValue={setNewPassword}
                                     id={"passwordInput"}
                                     type={"password"} name={"password"}/>
                        </div>
                        <div>
                            <MyInput label={'New password confirmation'} value={confirmPassword} changeValue={setConfirmPassword}
                                     id={"passwordConfirmInput"}
                                     type={"password"} name={"password"}/>
                        </div>
                        <div>
                            <Button className={'w-full text-[14px] cursor-pointer h-[45px] bg-[#D85888] hover:!bg-[#847BEF] transition-all duration-500'} onClick={changePassword}>
                                Change password
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <div className={'flex justify-center w-full'}>
                <div className={'w-[65px] h-[65px] flex items-center justify-center cursor-pointer'}
                     onClick={() => navigate('/resetPassword')}>
                    <img src={arrowIcon} alt=""/>
                </div>
            </div>
        </>
    );
}

export default StepTwo;