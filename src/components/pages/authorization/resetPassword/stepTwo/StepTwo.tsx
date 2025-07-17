import {z} from "zod";
import {toast} from "sonner";

import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

import AuthService from "@/services/AuthService.ts";

import {Button} from "@/components/ui/button.tsx";
import {Form} from "@/components/ui/form.tsx";
import MyFormInput from "@/components/common/MyFormInput/MyFormInput.tsx";

import logo from "@/assets/pdf_logo.svg"
import confirmLogo from "@/assets/confirmPasswordIcon.svg"
import arrowIcon from "@/assets/arrow_return_btn_icon.svg";

function StepTwo() {

    const navigate = useNavigate();

    const passwordSchema = z.object({
        newPassword: z.string().min(6, "Password must be at least 6 characters"),
        confirmPassword: z.string().min(6, "Confirmation must be at least 6 characters")
    }).refine(data => data.newPassword === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"]
    });

    const form = useForm<z.infer<typeof passwordSchema>>({
        resolver: zodResolver(passwordSchema),
        defaultValues: {
            newPassword: "",
            confirmPassword: ""
        }
    });

    useEffect(() => {
        if (!window.location.href?.includes('resetPassword/newPassword?token=')) {
            navigate('/resetPassword');
        }
    }, []);

    const changePasswordPromise = (values: z.infer<typeof passwordSchema>) => new Promise(async (resolve, reject) => {
        try {
            const resetToken = window.location.href?.split('resetPassword/newPassword?token=')[1];
            const response = await AuthService.resetPassword(resetToken, values.newPassword);
            navigate('/resetPassword/passwordUpdated');
            resolve(response.data.message);
            form.reset();
        } catch (e: any) {
            reject(e.response.data.message);
        }
    })

    async function changePassword(values: z.infer<typeof passwordSchema>) {
        toast.promise(changePasswordPromise(values), {
            loading: 'Changing password...',
            success: (data: any) => data,
            error: (errorMessage) => errorMessage,
        });
    }

    return (
        <>
            <div className={'step-two-form-wrap w-[350px] max-[520px]:box-border max-[520px]:w-full max-[520px]:p-[20px]'}>
                <div>
                    <div className={'step-two-head text-center mb-[40px]'}>
                        <div className={'flex items-center justify-center mb-[20px]'}>
                            <img src={logo} alt="" className={'w-[80px] h-[80px] cursor-pointer'}/>
                        </div>
                        <div className={'mb-[34px] flex items-center justify-center'}>
                            <h2 className={'text-[30px] leading-[36px] font-normal mr-[10px] max-[520px]:text-[25px]'}>Email confirmed</h2>
                            <img src={confirmLogo} alt=""/>
                        </div>
                        <div>
                            <p className={'text-left text-[16px]'}>
                                Your email is confirmed, we have not verified your account. Now you can enter your new password.
                            </p>
                        </div>
                    </div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(changePassword)} className={'flex flex-col gap-[10px]'}>
                            <MyFormInput label={'New password'} name={"newPassword"} form={form} type={"password"} />
                            <MyFormInput label={'New password confirmation'} name={"confirmPassword"} form={form} type={"password"} />
                            <div className={'mt-[10px]'}>
                                <Button type={'submit'} className={'w-full text-[14px] cursor-pointer h-[45px] bg-[#D85888] hover:!bg-[#847BEF] transition-all duration-500'}>
                                    Change password
                                </Button>
                            </div>
                        </form>
                    </Form>
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