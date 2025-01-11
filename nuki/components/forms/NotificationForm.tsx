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
    title: z.string().min(1, 'タイトルを入力してください'),
    content: z.string().min(1, '内容を入力してください'),
    type: z.enum(['GENERAL', 'SCHEDULE_CHANGE', 'ASSIGNMENT', 'DOCUMENT'], {
        required_error: '種類を選択してください',
    }),
    userId: z.string().min(1, 'ユーザーを選択してください'),
});

export function NotificationForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
    }

    return (
        <div className="max-w-2xl mx-auto p-6">
            <div className="mb-8">
                <h2 className="text-3xl font-bold tracking-tight">
                    お知らせ登録
                </h2>
                <p className="text-muted-foreground">
                    新しいお知らせの情報を入力してください。
                </p>
            </div>

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                >
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>タイトル</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="お知らせのタイトル"
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
                                        placeholder="お知らせの内容を入力してください"
                                        className="min-h-[100px]"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="type"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>種類</FormLabel>
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
                                        <SelectItem value="GENERAL">
                                            一般
                                        </SelectItem>
                                        <SelectItem value="SCHEDULE_CHANGE">
                                            時間割変更
                                        </SelectItem>
                                        <SelectItem value="ASSIGNMENT">
                                            課題
                                        </SelectItem>
                                        <SelectItem value="DOCUMENT">
                                            文書
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="userId"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>通知先ユーザー</FormLabel>
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
                                        <SelectItem value="all">
                                            全員
                                        </SelectItem>
                                        <SelectItem value="teachers">
                                            教員全員
                                        </SelectItem>
                                        <SelectItem value="students">
                                            生徒全員
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
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
