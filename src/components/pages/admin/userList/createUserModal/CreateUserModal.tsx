import {DialogContent, DialogTitle} from "@/components/ui/dialog.tsx";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form} from "@/components/ui/form.tsx";
import {Button} from "@/components/ui/button.tsx";
import MyFormInput from "@/components/common/MyFormInput/MyFormInput.tsx";
import AuthService from "@/services/AuthService.ts";
import {useActionCreators} from "@/hooks/redux.ts";
import {adminUsersActions} from "@/store/adminUsers/slice.ts";
import {toast} from "sonner";

interface CreateUserModalProps {
    onClose: () => void;
}

function CreateUserModal(props: CreateUserModalProps) {
    const { onClose } = props;

    const adminUsersAction = useActionCreators(adminUsersActions);

    const createFormSchema = z.object({
        name: z.string().min(2, "The name must contain a minimum of 2 characters").max(50),
        email: z.string().email("Incorrect email format"),
        number: z.string().optional().refine(val => !val || /^\+380\d{9}$/.test(val), {
            message: "The number should be in the format +380XXXXXXXXXXXXXXX",
        }),
        password: z.string().min(6, "Password must contain a minimum of 6 characters").max(50, "Password is too long"),
    });

    const form = useForm<z.infer<typeof createFormSchema>>({
        resolver: zodResolver(createFormSchema),
        defaultValues: {
            name: "",
            email: "",
            number: "",
            password: "",
        }
    });

    function onCloseModal() {
        onClose();
        window.setTimeout(() => {
            form.reset();
        }, 300);
    }

    async function onSubmit(values: z.infer<typeof createFormSchema>) {
        const cleanedValues = { ...values };
        if (!cleanedValues.number) delete cleanedValues.number;

        const createUserPromise = () => new Promise(async (resolve, reject) => {
            try {
                const response = await AuthService.registration(cleanedValues);
                adminUsersAction.addNewUser(response.data.data);
                onCloseModal();
                resolve({email: response.data.data.email})
            } catch (e: any) {
                reject(e.response.data.message);
            }
        })

        toast.promise(createUserPromise(), {
            loading: 'Creating user...',
            success: (data: any) => `User "${data.email}" was created successfully`,
            error: (errorMessage) => errorMessage,
        });
    }

    return (
        <DialogContent showCloseButton={false} aria-describedby={undefined} onPointerDownOutside={onCloseModal}>
            <DialogTitle className={"text-[35px] flex justify-center items-center"}>Create User</DialogTitle>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className={'flex flex-col gap-[10px]'}>
                    <MyFormInput label={'Name'} name={'name'} type={'text'} form={form} />
                    <MyFormInput label={'Email'} name={'email'} type={'email'} form={form} />
                    <MyFormInput label={'Number'} name={'number'} type={'tel'} form={form} />
                    <MyFormInput label={'Password'} name={'password'} type={'password'} form={form} />
                    <div className={"flex items-center justify-between mt-[15px]"}>
                        <Button type="button" onClick={onCloseModal} className={"cursor-pointer bg-[#111827] hover:bg-[#E87474] text-[15px] px-[40px] py-[20px]"}>Cancel</Button>
                        <Button type="submit" className={"cursor-pointer bg-[#111827] hover:bg-[#847BEF] text-[15px] px-[40px] py-[20px]"}>Create</Button>
                    </div>
                </form>
            </Form>
        </DialogContent>
    );
}

export default CreateUserModal;