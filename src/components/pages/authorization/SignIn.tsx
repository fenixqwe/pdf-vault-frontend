import {useActionCreators} from "@/hooks/redux.ts";
import {userActions} from "@/store/user/slice.ts";
import signInLeftImage from "@/assets/login_vector.svg"
import logo from "@/assets/pdf_logo.svg"
import {Button} from "@/components/ui/button.tsx";
import {useState} from "react";
import AuthService from "@/services/AuthService.ts";

function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [inProgress, setInProgress] = useState(false);

    const userAction = useActionCreators(userActions);

    const signIn = async () => {
        try {
            setInProgress(true);
            const response = await AuthService.login(email, password);
            setInProgress(false);

            localStorage.setItem("accessToken", response.data.data.tokens.access_token);
            localStorage.setItem("refreshToken", response.data.data.tokens.refresh_token);
            localStorage.setItem("sessionId", response.data.data.sessionId);

            userAction.changeIsAuth(true);
            userAction.changeUser({
                user_id: response.data.data.user_id,
                name: response.data.data.name,
                email: response.data.data.email,
                number: response.data.data.number,
                role: response.data.data.role,
            });
        } catch (e) {
            console.log(e);
            setInProgress(false);
        }
    }
    return (
        <div className={"bg-[#1E293B] flex min-h-screen"}>
            <div className={"left-side relative flex items-center box-border px-5 basis-[50%] max-[840px]:hidden"}>
                <div className={"company-block w-full flex flex-col items-center justify-center"}>
                    <img className={"max-w-full max-h-[500px] mb-[20px] pointer-events-none"} src={signInLeftImage} alt=""/>
                    <h1 className={"text-[#E2E8F0] text-center !text-[40px] font-medium max-[1250px]:text-[30px] max-[1024px]:text-[34px]"}>
                        Upload, store, and share documents with ease
                        thanks to <span className={"text-[#847BEF]"}>PDF Vault</span>
                    </h1>
                </div>
            </div>

            <div className={"right-side basis-[50%] rounded-l-[40px] flex flex-col relative z-[1] bg-[#CBD5E1] max-[840px]:basis-[100%] max-[840px]:rounded-none"}>
                <div className={"login-content flex items-center justify-center grow"}>
                    <div className={"login-form-wrapper w-[350px] max-[520px]:box-border max-[520px]:w-full max-[520px]:p-[20px]"}>
                        <div className={"head-form text-center mb-[40px]"}>
                            <div className={"flex items-center justify-center mb-[20px]"}>
                                <img className={"w-[80px] h-[80px]"} src={logo} alt="icon"/>
                            </div>
                            <div>
                                <h2 className={"text-[#1E293B] text-[30px] leading-[36px] font-normal max-[520px]:text-[25px]"}>Welcome to PDF Vault</h2>
                            </div>
                        </div>
                        <div className={"sign-in-form mb-[15px]"}>
                            <div className={"auth-input flex flex-col mb-[10px]"}>
                                <label htmlFor="loginInput"
                                       className={"text-[15px] font-bold mb-[10px] text-left text-[#636363]"}>
                                    Email Address
                                </label>
                                <input type="text" id="loginInput" name="email" value={email} onChange={(e) => setEmail(e.target.value)}
                                       className={"rounded-[8px] border-none px-2 py-3 outline-none text-sm bg-[#EBEBEB] text-[#000000]"}/>
                            </div>
                            <div className={"auth-input flex flex-col mb-[15px]"}>
                                <label htmlFor="passwordInput"
                                       className={"text-[15px] font-bold mb-[10px] text-left text-[#636363]"}>
                                    Password
                                </label>
                                <input type="password" id="passwordInput" name="password" value={password} onChange={(e) => setPassword(e.target.value)}
                                       className={"rounded-[8px] border-none px-2 py-3 outline-none text-sm bg-[#EBEBEB] text-[#000000]"}/>
                            </div>
                            <div className={"auth-btn"}>
                                <Button onClick={signIn} disabled={inProgress}
                                    className={"w-full text-white text-[14px] rounded-[10px] !border-none !transition-all !duration-500 h-[45px] !bg-[#D85888] hover:!bg-[#847BEF]"}>
                                    Sign in
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignIn;