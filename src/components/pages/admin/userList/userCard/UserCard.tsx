import {toast} from "sonner";

import formatDate from "@/utils/formatDate.ts";
import formatSessionDuration from "@/utils/formatSessionDuration.ts";
import UserService from "@/services/UserService.ts";

import {useState} from "react";
import {useActionCreators, useAppSelector} from "@/hooks/redux.ts";
import {useNavigate} from "react-router-dom";

import {adminUsersActions} from "@/store/adminUsers/slice.ts";

import type {AdminUsers} from "@/models/AdminUsers.ts";
import {Button} from "@/components/ui/button.tsx";
import {Dialog, DialogTrigger} from "@/components/ui/dialog.tsx";
import EditUserModal from "@/components/pages/admin/userList/editUserModal/EditUserModal.tsx";
import {Badge} from "@/components/ui/badge.tsx";
import MyAlertDialog from "@/components/common/MyAlertDialog/MyAlertDialog.tsx";

import userIcon from "@/assets/user.svg";
import mailIcon from "@/assets/mail.svg";
import phoneIcon from "@/assets/number.svg";
import roleIcon from "@/assets/role_shield.svg";
import onlineIcon from "@/assets/online.svg";
import sessionDurationIcon from "@/assets/time.svg";

interface UserCardProps {
    user: AdminUsers
}

function UserCard(props: UserCardProps) {
    const { user } = props;

    const [modalOpen, setModalOpen] = useState(false);

    const navigate = useNavigate();

    const currentUser = useAppSelector(state => state.user.userData);

    const adminUsersAction = useActionCreators(adminUsersActions);

    const deleteUserPromise = () => new Promise(async (resolve, reject) => {
        try {
            const response = await UserService.deleteUser(user.user_id);
            adminUsersAction.deleteUser(user.user_id);
            resolve(response.data.message)
        } catch (e: any) {
            reject(e.response.data.message);
        }
    });

    async function handleUserDelete() {
        toast.promise(deleteUserPromise(), {
            loading: 'Deleting user...',
            success: () => `User "${user.email}" was deleted successfully`,
            error: (errorMessage) => errorMessage,
        });
    }

    return (
        <div onClick={() => navigate(`/main/admin-panel/documents/${user.user_id}`)}
            className={`user-card relative ${currentUser?.user_id === user.user_id ? 'bg-[#57534E]' : 'bg-[#1E293B]'} rounded-[10px] px-[15px] py-[10px] flex flex-col cursor-pointer shadow-[0_0_4px_rgba(0,0,0,0.25)] hover:shadow-[0_0_8px_rgba(0,0,0,0.5)] transition-shadow duration-300`}>
            {currentUser?.user_id === user.user_id && (
                <Badge className={'absolute right-[15px] bg-[#78716c] text-white'} variant={'secondary'}>You</Badge>
            )}
            <div className={"card-content text-[15px] mb-[10px]"}>
                {[
                    { label: user.name, icon: userIcon },
                    { label: user.email, icon: mailIcon },
                    { label: user.number || "-", icon: phoneIcon },
                    { label: user.role, icon: roleIcon },
                    { label: user.lastLoginAt ? formatDate(user.lastLoginAt!) : "-", icon: onlineIcon },
                    { label: user.lastSessionDuration ? formatSessionDuration(user.lastSessionDuration!) : "-", icon: sessionDurationIcon },
                ].map((item, index, arr) => (
                    <div key={index}>
                        <div className="flex items-center gap-[15px] py-[5px]">
                            <img src={item.icon} alt="" />
                            <p className="text-white">{item.label}</p>
                        </div>
                        {index !== arr.length - 1 && (
                            <div className="h-[2px] rounded-full bg-white" />
                        )}
                    </div>
                ))}
            </div>
            <div className={"card-actions flex justify-between items-center gap-[10px]"}>
                <div className={'flex-1 w-full h-full'} onClick={(e) => e.stopPropagation()}>
                    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
                        <DialogTrigger asChild>
                            <Button className={`rounded-[10px] w-full h-full text-[17px] cursor-pointer ${currentUser?.user_id === user.user_id ? 'bg-[#44403C]' : 'bg-[#111827]'} text-[#F3F4F6] hover:bg-[#847BEF]`}>
                                Edit
                            </Button>
                        </DialogTrigger>
                        <EditUserModal onClose={() => setModalOpen(false)} userData={user} />
                    </Dialog>
                </div>
                <div className={'flex-1'} onClick={(e) => e.stopPropagation()}>
                    <MyAlertDialog title={'Are you absolutely sure?'} description={`This action cannot be undone. This will permanently delete this account and remove this data from our servers.`} continueFunction={handleUserDelete}>
                        <Button className={`rounded-[10px] w-full h-full text-[17px] flex-1 cursor-pointer ${currentUser?.user_id === user.user_id ? 'bg-[#44403C]' : 'bg-[#111827]'} text-[#F3F4F6] hover:bg-[#E87474]`}>
                            Delete
                        </Button>
                    </MyAlertDialog>
                </div>
            </div>
        </div>
    );
}

export default UserCard;