import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";

interface MyFormInputProps {
    label: string;
    name: string
    form: any;
    type: string;
}

function MyFormInput(props: MyFormInputProps) {
    const {label, name, form, type} = props;

    return (
        <FormField control={form.control} name={name} render={({field}) => (
            <FormItem>
                <FormLabel className={"text-[15px] font-bold text-[#636363]"}>{label}</FormLabel>
                <FormControl>
                    <Input type={type} {...field} className={"rounded-[8px] border-none px-2 py-3 outline-none text-sm bg-[#EBEBEB] text-[#000000]"} />
                </FormControl>
                <FormMessage />
            </FormItem>
        )}/>
    );
}

export default MyFormInput;