import ContentHeader from "@/components/common/contentHeader/ContentHeader.tsx";
import {useEffect, useState} from "react";
import {Button} from "@/components/ui/button.tsx";
import addIcon from "@/assets/plus.svg";
import UserList from "@/components/pages/admin/userList/UserList.tsx";
import {Dialog, DialogTrigger} from "@/components/ui/dialog.tsx";
import CreateUserModal from "@/components/pages/admin/userList/createUserModal/CreateUserModal.tsx";
import RoleService from "@/services/RoleService.ts";
import {useActionCreators, useAppSelector} from "@/hooks/redux.ts";
import {rolesActions} from "@/store/roles/slice.ts";

function AdminPanel() {
    const [searchString, setSearchString] = useState('');
    const [modalOpen, setModalOpen] = useState(false);

    const roles = useAppSelector(state => state.roles.roles);

    const rolesAction = useActionCreators(rolesActions);

    useEffect(() => {
        if (roles.length > 0) return;

        getAllRoles();
    }, []);

    async function getAllRoles() {
        try {
            const response = await RoleService.getAllRoles();
            rolesAction.changeRoles(response.data.data);
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div className={"users-block w-full h-full flex flex-col"}>
            <ContentHeader title={'Users'} searchString={searchString} setSearchString={setSearchString}>
                <Dialog open={modalOpen} onOpenChange={setModalOpen}>
                    <DialogTrigger asChild>
                        <Button
                            className={"min-w-[200px] bg-[#1F2937] h-full text-[20px] flex justify-center items-center rounded-[15px] transition duration-300 hover:bg-[#847BEF] cursor-pointer max-[850px]:w-full"}>
                            <img src={addIcon} alt="icon"/>
                            Add User
                        </Button>
                    </DialogTrigger>
                    <CreateUserModal onClose={() => setModalOpen(false)} />
                </Dialog>
            </ContentHeader>
            <UserList searchString={searchString} />
        </div>
    );
}

export default AdminPanel;