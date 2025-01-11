import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { UserForm } from '@/components/forms/UserForm'
import { ScheduleForm } from '@/components/forms/ScheduleForm'
import { AssignmentForm } from '@/components/forms/AssignmentForm'
import { DocumentForm } from '@/components/forms/DocumentForm'
import { NotificationForm } from '@/components/forms/NotificationForm'
import { SchoolRuleForm } from '@/components/forms/SchoolRuleForm'
import { SubjectForm } from '@/components/forms/SubjectForm'
import { TimetableForm } from '@/components/forms/TimetableForm'

function App() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-10">
        <Tabs defaultValue="user" className="space-y-6">
          <TabsList className="grid w-full grid-cols-8">
            <TabsTrigger value="user">ユーザー</TabsTrigger>
            <TabsTrigger value="subject">教科</TabsTrigger>
            <TabsTrigger value="schedule">予定</TabsTrigger>
            <TabsTrigger value="timetable">時間割</TabsTrigger>
            <TabsTrigger value="assignment">課題</TabsTrigger>
            <TabsTrigger value="document">プリント</TabsTrigger>
            <TabsTrigger value="notification">お知らせ</TabsTrigger>
            <TabsTrigger value="schoolRule">校則</TabsTrigger>
          </TabsList>
          <TabsContent value="user">
            <UserForm />
          </TabsContent>
          <TabsContent value="subject">
            <SubjectForm />
          </TabsContent>
          <TabsContent value="schedule">
            <ScheduleForm />
          </TabsContent>
          <TabsContent value="timetable">
            <TimetableForm />
          </TabsContent>
          <TabsContent value="assignment">
            <AssignmentForm />
          </TabsContent>
          <TabsContent value="document">
            <DocumentForm />
          </TabsContent>
          <TabsContent value="notification">
            <NotificationForm />
          </TabsContent>
          <TabsContent value="schoolRule">
            <SchoolRuleForm />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default App
