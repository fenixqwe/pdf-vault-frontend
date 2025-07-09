import {useActionCreators, useAppSelector} from "@/hooks/redux.ts";
import {adminUsersActions} from "@/store/adminUsers/slice.ts";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {DialogContent, DialogTitle} from "@/components/ui/dialog.tsx";
import {Form} from "@/components/ui/form.tsx";
import MyFormInput from "@/components/common/MyFormInput/MyFormInput.tsx";
import {Button} from "@/components/ui/button.tsx";
import MyFormSelect from "@/components/common/MyFormSelect/MyFormSelect.tsx";
import type {AdminUsers} from "@/models/AdminUsers.ts";
import isEqual from 'lodash/isEqual';
import UserService from "@/services/UserService.ts";
import {toast} from "sonner";

interface EditUserModalProps {
    onClose: () => void;
    userData: AdminUsers;
}

function EditUserModal(props: EditUserModalProps) {
    const { onClose, userData } = props;

    const roles = useAppSelector(state => state.roles.roles);

    const adminUsersAction = useActionCreators(adminUsersActions);

    const editFormSchema = z.object({
        name: z.string().min(2, "The name must contain a minimum of 2 characters").max(50),
        email: z.string().email("Incorrect email format"),
        number: z.string().optional().refine(val => !val || /^\+380\d{9}$/.test(val), {
            message: "The number should be in the format +380XXXXXXXXXXXXXXX",
        }),
        role: z.enum(['USER', 'ADMIN'], {
            required_error: "Choose a role"
        }).optional(),
    });

    const form = useForm<z.infer<typeof editFormSchema>>({
        resolver: zodResolver(editFormSchema),
        defaultValues: {
            name: userData.name,
            email: userData.email,
            number: userData.number || '',
            role: userData.role || 'USER',
        }
    });

    function onCloseModal() {
        onClose();
        window.setTimeout(() => {
            form.reset();
        }, 300);
    }

    function getChangedValues<T extends Record<string, any>>(
        currentValues: T,
        initialValues: T
    ): Partial<T> {
        return Object.keys(currentValues).reduce((acc, key) => {
            if (!isEqual(currentValues[key], initialValues[key])) {
                acc[key as keyof T] = currentValues[key];
            }
            return acc;
        }, {} as Partial<T>);
    }

    const editUserPromise = (changedValues: any) => new Promise(async (resolve, reject) => {
        try {
            const response = await UserService.updateUser(changedValues, userData.user_id);
            changedValues.user_id = userData.user_id;
            adminUsersAction.updateUser(response.data.data);
            onCloseModal();

            resolve(response.data.message)
        } catch (e: any) {
            reject(e.response.data.message);
        }
    })

    async function onSubmit(values: z.infer<typeof editFormSchema>) {
        const changedValues: any = getChangedValues(values, {
            name: userData.name,
            email: userData.email,
            number: userData.number || '',
            role: userData.role || 'USER',
        });


        if (changedValues.role) {
            const roleId = roles.find((role) => role.name === changedValues.role)?.role_id;
            if (roleId) {
                delete changedValues.role;
                changedValues.role_id = roleId;
            }
        }

        toast.promise(editUserPromise(changedValues), {
            loading: 'Deleting user...',
            success: () => `User "${userData.email}" was updated successfully`,
            error: (errorMessage) => errorMessage,
        });
    }

    return (
        <DialogContent showCloseButton={false} aria-describedby={undefined} onPointerDownOutside={onCloseModal}>
            <DialogTitle className={"text-[35px] flex justify-center items-center"}>Edit User</DialogTitle>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className={'flex flex-col gap-[10px]'}>
                    <MyFormInput label={'Name'} name={'name'} type={'text'} form={form} />
                    <MyFormInput label={'Email'} name={'email'} type={'email'} form={form} />
                    <MyFormInput label={'Number'} name={'number'} type={'tel'} form={form} />
                    <MyFormSelect label={'Role'} name={'role'} form={form} selectArr={roles.map((role) => role.name)} />
                    <div className={"flex items-center justify-between mt-[15px]"}>
                        <Button type="button" onClick={onCloseModal} className={"cursor-pointer bg-[#111827] hover:bg-[#E87474] text-[15px] px-[40px] py-[20px]"}>Cancel</Button>
                        <Button type="submit" className={"cursor-pointer bg-[#111827] hover:bg-[#847BEF] text-[15px] px-[40px] py-[20px]"}>Edit</Button>
                    </div>
                </form>
            </Form>
        </DialogContent>
    );
}

export default EditUserModal;