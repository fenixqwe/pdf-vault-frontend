import {LoaderCircle} from "lucide-react";
import NoElementYet from "@/components/common/NoElementYet/NoElementYet.tsx";
import {useEffect, useState} from "react";
import UserCard from "@/components/pages/admin/userList/userCard/UserCard.tsx";
import {toast} from "sonner";
import UserService from "@/services/UserService.ts";
import {useActionCreators, useAppSelector} from "@/hooks/redux.ts";
import {adminUsersActions} from "@/store/adminUsers/slice.ts";

interface UserListProps {
    searchString: string;
}

function UserList(props: UserListProps) {
    const { searchString } = props;
    const [isLoading, setIsLoading] = useState(false);

    const users = useAppSelector(state => state.adminUsers.users);

    const adminUsersAction = useActionCreators(adminUsersActions);

    useEffect(() => {
        getAllUserList()
    },[searchString]);

    async function getAllUserList() {
        try {
            setIsLoading(true);
            const allUsers = await UserService.getAllUsers(searchString);
            adminUsersAction.changeUsers(allUsers.data.data);
            setIsLoading(false);
        } catch (e: any) {
            setIsLoading(false);
            toast.error(e.response.data.message);
        }
    }

    return (
        <div
            className={"documents-list relative grow overflow-scroll grid justify-start gap-[20px] [grid-template-columns:repeat(auto-fill,minmax(300px,1fr))] [grid-template-rows:repeat(auto-fit,270px)] max-[400px]:[grid-template-columns:repeat(auto-fill,minmax(200px,1fr))]"}>
            {isLoading ? (
                <div className="absolute inset-0 z-10 flex items-center justify-center">
                    <LoaderCircle className="animate-spin w-20 h-20 text-indigo-500 translate-y-[2px]"/>
                </div>
            ) : (
                users.length > 0 ? (
                    users.map((user) => (
                        <UserCard user={user} key={user.user_id}/>
                    ))
                ) : (
                    <NoElementYet/>
                )
            )}
        </div>
    );
}

export default UserList;