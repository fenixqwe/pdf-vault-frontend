import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";

interface MyFormSelectProps {
    label: string;
    name: string
    form: any;
    selectArr: any[];
}

function MyFormSelect(props: MyFormSelectProps) {
    const {label, name, form, selectArr} = props;

    return (
        <FormField control={form.control} name={name} render={({field}) => (
            <FormItem>
                <FormLabel className={"text-[15px] font-bold text-[#636363]"}>{label}</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                        <SelectTrigger className={'w-full rounded-[8px] border-none px-2 py-3 outline-none text-sm bg-[#EBEBEB] text-[#000000]'}>
                            <SelectValue placeholder={'Select value'} />
                        </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                        {selectArr.map(((item, index) => (
                            <SelectItem value={item} key={index}>{item}</SelectItem>
                        )))}
                    </SelectContent>

                </Select>
                <FormMessage />
            </FormItem>
        )}/>
    );
}

export default MyFormSelect;