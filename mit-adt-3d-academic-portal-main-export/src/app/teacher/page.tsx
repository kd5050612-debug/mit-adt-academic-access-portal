"use client"

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form'
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Sidebar from '@/components/Sidebar'
import { 
  Upload, 
  FileText, 
  Calendar,
  BookOpen,
  Users,
  CheckCircle
} from 'lucide-react'
import { toast } from 'sonner'

const moduleSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  subject: z.string().min(1, 'Please select a subject'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  file: z.any().optional()
})

const eventSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  date: z.string().min(1, 'Please select a date'),
  time: z.string().min(1, 'Please select a time'),
  type: z.string().min(1, 'Please select event type')
})

export default function TeacherDashboard() {
  const [uploadedModules, setUploadedModules] = useState([
    { id: 1, title: 'Introduction to Data Structures', subject: 'Data Structures', date: '2024-01-15' },
    { id: 2, title: 'React Fundamentals', subject: 'Web Development', date: '2024-01-14' },
  ])

  const [postedEvents, setPostedEvents] = useState([
    { id: 1, title: 'Mid-Semester Exam', date: '2024-02-15', type: 'Exam' },
    { id: 2, title: 'Guest Lecture on AI', date: '2024-02-10', type: 'Lecture' },
  ])

  const moduleForm = useForm<z.infer<typeof moduleSchema>>({
    resolver: zodResolver(moduleSchema),
    defaultValues: {
      title: '',
      subject: '',
      description: ''
    }
  })

  const eventForm = useForm<z.infer<typeof eventSchema>>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: '',
      description: '',
      date: '',
      time: '',
      type: ''
    }
  })

  const onModuleSubmit = (values: z.infer<typeof moduleSchema>) => {
    const newModule = {
      id: uploadedModules.length + 1,
      title: values.title,
      subject: values.subject,
      date: new Date().toISOString().split('T')[0]
    }
    setUploadedModules([newModule, ...uploadedModules])
    moduleForm.reset()
    toast.success('Module uploaded successfully!')
  }

  const onEventSubmit = (values: z.infer<typeof eventSchema>) => {
    const newEvent = {
      id: postedEvents.length + 1,
      title: values.title,
      date: values.date,
      type: values.type
    }
    setPostedEvents([newEvent, ...postedEvents])
    eventForm.reset()
    toast.success('Event posted successfully!')
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <main className="flex-1 md:ml-64 p-6 lg:p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Teacher Dashboard</h1>
            <p className="text-muted-foreground mt-2">
              Upload modules, papers, and manage academic events
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Modules</CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{uploadedModules.length}</div>
                <p className="text-xs text-muted-foreground mt-2">Uploaded this semester</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Events Posted</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{postedEvents.length}</div>
                <p className="text-xs text-muted-foreground mt-2">Active events</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">156</div>
                <p className="text-xs text-muted-foreground mt-2">Across all classes</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg. Attendance</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">82%</div>
                <p className="text-xs text-muted-foreground mt-2">This semester</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Tabs */}
          <Tabs defaultValue="upload" className="space-y-4">
            <TabsList>
              <TabsTrigger value="upload">Upload Module</TabsTrigger>
              <TabsTrigger value="event">Post Event</TabsTrigger>
              <TabsTrigger value="history">Upload History</TabsTrigger>
            </TabsList>

            {/* Upload Module Tab */}
            <TabsContent value="upload" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Upload Academic Module/Paper</CardTitle>
                  <CardDescription>Share course materials with students</CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...moduleForm}>
                    <form onSubmit={moduleForm.handleSubmit(onModuleSubmit)} className="space-y-6">
                      <FormField
                        control={moduleForm.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Module Title</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., Introduction to Data Structures" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={moduleForm.control}
                        name="subject"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Subject</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a subject" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="data-structures">Data Structures</SelectItem>
                                <SelectItem value="web-development">Web Development</SelectItem>
                                <SelectItem value="database-systems">Database Systems</SelectItem>
                                <SelectItem value="operating-systems">Operating Systems</SelectItem>
                                <SelectItem value="algorithms">Algorithms</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={moduleForm.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Describe the module content..."
                                className="min-h-[100px]"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="space-y-2">
                        <Label htmlFor="file">Upload File</Label>
                        <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors">
                          <Upload className="h-10 w-10 mx-auto mb-4 text-muted-foreground" />
                          <Input 
                            id="file" 
                            type="file" 
                            className="max-w-xs mx-auto"
                            accept=".pdf,.doc,.docx,.ppt,.pptx"
                          />
                          <p className="text-sm text-muted-foreground mt-2">
                            PDF, DOC, DOCX, PPT, PPTX (Max 10MB)
                          </p>
                        </div>
                      </div>

                      <Button type="submit" className="w-full gap-2">
                        <Upload className="h-4 w-4" />
                        Upload Module
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Post Event Tab */}
            <TabsContent value="event" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Post Daily Event Update</CardTitle>
                  <CardDescription>Share event information with students</CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...eventForm}>
                    <form onSubmit={eventForm.handleSubmit(onEventSubmit)} className="space-y-6">
                      <FormField
                        control={eventForm.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Event Title</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., Mid-Semester Examination" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={eventForm.control}
                        name="type"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Event Type</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select event type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="exam">Exam</SelectItem>
                                <SelectItem value="lecture">Lecture</SelectItem>
                                <SelectItem value="workshop">Workshop</SelectItem>
                                <SelectItem value="seminar">Seminar</SelectItem>
                                <SelectItem value="holiday">Holiday</SelectItem>
                                <SelectItem value="deadline">Deadline</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid gap-4 md:grid-cols-2">
                        <FormField
                          control={eventForm.control}
                          name="date"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Date</FormLabel>
                              <FormControl>
                                <Input type="date" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={eventForm.control}
                          name="time"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Time</FormLabel>
                              <FormControl>
                                <Input type="time" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={eventForm.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Provide event details..."
                                className="min-h-[100px]"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button type="submit" className="w-full gap-2">
                        <Calendar className="h-4 w-4" />
                        Post Event
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </TabsContent>

            {/* History Tab */}
            <TabsContent value="history" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Uploads</CardTitle>
                    <CardDescription>Your uploaded modules</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {uploadedModules.map((module) => (
                        <div key={module.id} className="flex items-start gap-3 p-3 border rounded-lg">
                          <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <FileText className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium truncate">{module.title}</h4>
                            <p className="text-sm text-muted-foreground">{module.subject}</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {new Date(module.date).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Recent Events</CardTitle>
                    <CardDescription>Your posted events</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {postedEvents.map((event) => (
                        <div key={event.id} className="flex items-start gap-3 p-3 border rounded-lg">
                          <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                            <Calendar className="h-5 w-5 text-blue-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium truncate">{event.title}</h4>
                            <p className="text-sm text-muted-foreground">{event.type}</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {new Date(event.date).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
