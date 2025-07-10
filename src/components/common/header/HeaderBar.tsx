import logo from "@/assets/pdf_logo.svg"
import logoutImg from "@/assets/logout.svg"
import {Button} from "@/components/ui/button.tsx";
import AuthService from "@/services/AuthService.ts";
import {useActionCreators, useAppSelector} from "@/hooks/redux.ts";
import {userActions} from "@/store/user/slice.ts";

function HeaderBar() {
    const sessionId = useAppSelector((state) => state.user.sessionId);

    const userAction = useActionCreators(userActions);

    async function logoutHandler() {
        try {
            await AuthService.logout(sessionId || localStorage.getItem("sessionId")!);
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            userAction.clearUser();
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <header className={"header w-full flex justify-between items-center p-[20px] max-[450px]:flex-col max-[450px]:gap-[10px]"}>
            <div className={"header-wrapper flex justify-center items-center gap-[10px]"}>
                <div className={"logo-block max-w-[70px] max-h-[80px] max-[1024px]:max-w-[50px] max-[1024px]:max-h-[60px]"}>
                    <img src={logo} alt="logo"/>
                </div>
                <div className={"title-block text-[70px] font-medium text-[#E2E8F0] max-[1024px]:text-[50px] max-[400px]:text-[40px]"}>
                    <p>PDF Vault</p>
                </div>
            </div>
            <div className={"flex items-center justify-center cursor-pointer max-[450px]:w-full"}>
                <Button className={"rounded-full bg-white w-[60px] h-[60px] cursor-pointer max-[450px]:rounded-[10px] max-[450px]:w-full"} onClick={logoutHandler}>
                    <img src={logoutImg} alt=""/>
                </Button>
            </div>
        </header>
    );
}

export default HeaderBar;