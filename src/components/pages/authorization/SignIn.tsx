import {Button} from "@/components/ui/button.tsx";
import {useActionCreators} from "@/hooks/redux.ts";
import {userActions} from "@/store/user/userSlice.ts";

function SignIn() {
    const userAction = useActionCreators(userActions);


    const signIn = () => {
        userAction.changeIsAuth(true);
    }
    return (
        <div>
            <Button onClick={signIn}>
                Click
            </Button>
        </div>
    );
}

export default SignIn;