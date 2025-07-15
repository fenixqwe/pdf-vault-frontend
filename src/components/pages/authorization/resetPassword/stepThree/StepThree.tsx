import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

import logo from "@/assets/pdf_logo.svg"
import confirmLogo from "@/assets/confirmPasswordIcon.svg"

function StepThree() {
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            navigate('/signIn');
        }, 3000);
    }, []);
    return (
        <div className={'w-[350px]'}>
            <div>
                <div className={'text-center mb-[40px]'}>
                    <div className={'flex items-center justify-center mb-[20px]'}>
                        <img src={logo} alt="" className={'w-[80px] h-[80px] cursor-pointer'}/>
                    </div>
                    <div className={'mb-[34px] flex items-center justify-center'}>
                        <h2 className={'text-[30px] leading-[36px] font-normal mr-[10px]'}>Email confirmed</h2>
                        <img src={confirmLogo} alt=""/>
                    </div>
                    <div>
                        <p className={'text-left text-[16px]'}>
                            Your email is confirmed, we have not verified your account. Now you can enter your new
                            password.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StepThree;