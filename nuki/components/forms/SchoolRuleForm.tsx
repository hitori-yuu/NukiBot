'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const formSchema = z.object({
    category: z.string().min(1, 'カテゴリを選択してください'),
    title: z.string().min(1, 'タイトルを入力してください'),
    content: z.string().min(1, '内容を入力してください'),
});

export function SchoolRuleForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
    }

    return (
        <div className="max-w-2xl mx-auto p-6">
            <div className="mb-8">
                <h2 className="text-3xl font-bold tracking-tight">校則登録</h2>
                <p className="text-muted-foreground">
                    新しい校則の情報を入力してください。
                </p>
            </div>

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                >
                    <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>カテゴリ</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="選択してください" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="general">
                                            一般規則
                                        </SelectItem>
                                        <SelectItem value="uniform">
                                            服装規定
                                        </SelectItem>
                                        <SelectItem value="attendance">
                                            出席・遅刻
                                        </SelectItem>
                                        <SelectItem value="behavior">
                                            行動規範
                                        </SelectItem>
                                        <SelectItem value="facilities">
                                            施設利用
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>タイトル</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="校則のタイトル"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="content"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>内容</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="校則の内容を入力してください"
                                        className="min-h-[200px]"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit" className="w-full">
                        登録する
                    </Button>
                </form>
            </Form>
        </div>
    );
}
