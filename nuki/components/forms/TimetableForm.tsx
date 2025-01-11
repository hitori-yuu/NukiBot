'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'

// 仮のデータ（実際にはAPIから取得）
const subjects = [
  { id: '1', name: '数学' },
  { id: '2', name: '国語' },
]

const formSchema = z.object({
  academicYear: z.number().min(2000, '年度を入力してください'),
  grade: z.number().min(1).max(3, '学年を選択してください'),
  className: z.string().min(1, 'クラスを選択してください'),
  cycleType: z.enum(['A', 'B', 'C', 'D'], {
    required_error: '周期を選択してください',
  }),
  details: z.array(
    z.object({
      dayOfWeek: z.enum([
        'MONDAY',
        'TUESDAY',
        'WEDNESDAY',
        'THURSDAY',
        'FRIDAY',
      ]),
      period: z.number().min(1).max(5),
    }),
  ),
})

export function TimetableForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      academicYear: new Date().getFullYear(),
      details: Array.from({ length: 25 }, (_, i) => ({
        dayOfWeek: ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY'][
          Math.floor(i / 5)
        ] as 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY',
        period: (i % 5) + 1,
        academicYear: new Date().getFullYear(),
        grade: 2,
        className: 'H',
      })),
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  const dayOfWeekJa = {
    MONDAY: '月',
    TUESDAY: '火',
    WEDNESDAY: '水',
    THURSDAY: '木',
    FRIDAY: '金',
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h2 className="text-3xl font-bold tracking-tight">時間割登録</h2>
        <p className="text-muted-foreground">
          時間割の基本情報を入力してください。
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="academicYear"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>年度</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="grade"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>学年</FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(parseInt(value))}
                    defaultValue={field.value?.toString()}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="選択してください" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {[1, 2, 3].map((grade) => (
                        <SelectItem key={grade} value={grade.toString()}>
                          {grade}年
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="className"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>クラス</FormLabel>
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
                      {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'].map(
                        (className) => (
                          <SelectItem key={className} value={className}>
                            {className}組
                          </SelectItem>
                        ),
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="cycleType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>周期</FormLabel>
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
                    {['A', 'B', 'C', 'D'].map((cycle) => (
                      <SelectItem key={cycle} value={cycle}>
                        {cycle}周期
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="border rounded-lg p-4">
            <div className="grid grid-cols-6 gap-4 mb-4 font-bold text-center">
              <div>時限</div>
              <div>月</div>
              <div>火</div>
              <div>水</div>
              <div>木</div>
              <div>金</div>
            </div>

            {[1, 2, 3, 4, 5].map((period) => (
              <div key={period} className="grid grid-cols-6 gap-4 mb-4">
                <div className="flex items-center justify-center font-bold">
                  {period}
                </div>
                {['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY'].map(
                  (day, dayIndex) => {
                    const index = dayIndex * 5 + (period - 1)
                    return (
                      <div key={`${day}-${period}`} className="space-y-2">
                        <FormField
                          control={form.control}
                          name={`details.${index}`}
                          render={({ field }) => (
                            <FormItem>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={JSON.stringify(field.value)}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="選択してください" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {subjects.map((subject) => (
                                    <SelectItem
                                      key={subject.id}
                                      value={subject.id}
                                    >
                                      {subject.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </FormItem>
                          )}
                        />
                      </div>
                    )
                  },
                )}
              </div>
            ))}
          </div>

          <Button type="submit" className="w-full">
            登録する
          </Button>
        </form>
      </Form>
    </div>
  )
}
