"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Sidebar from '@/components/Sidebar'
import { 
  BookOpen, 
  TrendingUp, 
  Award, 
  Calendar,
  CheckCircle2,
  XCircle,
  FileText,
  Download,
  ChevronRight
} from 'lucide-react'

export default function StudentDashboard() {
  const [selectedQuestion, setSelectedQuestion] = useState<number | null>(null)
  const [answers, setAnswers] = useState<Record<number, string>>({})

  // Mock data
  const attendanceData = {
    overall: 78,
    subjects: [
      { name: 'Data Structures', attendance: 85, total: 20, present: 17 },
      { name: 'Web Development', attendance: 75, total: 16, present: 12 },
      { name: 'Database Systems', attendance: 80, total: 15, present: 12 },
      { name: 'Operating Systems', attendance: 72, total: 18, present: 13 },
    ]
  }

  const modules = [
    { 
      id: 1, 
      title: 'Introduction to Data Structures', 
      subject: 'Data Structures',
      teacher: 'Dr. Sharma',
      uploadedDate: '2024-01-15',
      type: 'PDF'
    },
    { 
      id: 2, 
      title: 'React Fundamentals', 
      subject: 'Web Development',
      teacher: 'Prof. Patel',
      uploadedDate: '2024-01-14',
      type: 'PDF'
    },
    { 
      id: 3, 
      title: 'SQL Query Optimization', 
      subject: 'Database Systems',
      teacher: 'Dr. Kumar',
      uploadedDate: '2024-01-13',
      type: 'PDF'
    },
  ]

  const pyqs = [
    {
      id: 1,
      question: 'What is the time complexity of binary search?',
      options: ['O(n)', 'O(log n)', 'O(n²)', 'O(1)'],
      correctAnswer: 'O(log n)',
      subject: 'Data Structures'
    },
    {
      id: 2,
      question: 'Which hook is used for side effects in React?',
      options: ['useState', 'useEffect', 'useContext', 'useReducer'],
      correctAnswer: 'useEffect',
      subject: 'Web Development'
    },
    {
      id: 3,
      question: 'What does ACID stand for in database transactions?',
      options: [
        'Atomicity, Consistency, Isolation, Durability',
        'Authorization, Consistency, Integrity, Durability',
        'Atomicity, Compatibility, Isolation, Data',
        'Authorization, Compatibility, Integrity, Data'
      ],
      correctAnswer: 'Atomicity, Consistency, Isolation, Durability',
      subject: 'Database Systems'
    },
  ]

  const handleAnswerSubmit = (questionId: number, answer: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }))
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <main className="flex-1 md:ml-64 p-6 lg:p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Student Dashboard</h1>
            <p className="text-muted-foreground mt-2">
              Track your attendance, access modules, and practice questions
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Overall Attendance</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{attendanceData.overall}%</div>
                <Progress value={attendanceData.overall} className="mt-2" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Modules</CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{modules.length}</div>
                <p className="text-xs text-muted-foreground mt-2">Available for download</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Practice Questions</CardTitle>
                <Award className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{pyqs.length}</div>
                <p className="text-xs text-muted-foreground mt-2">PYQs available</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5</div>
                <p className="text-xs text-muted-foreground mt-2">This week</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Tabs */}
          <Tabs defaultValue="attendance" className="space-y-4">
            <TabsList>
              <TabsTrigger value="attendance">Attendance</TabsTrigger>
              <TabsTrigger value="modules">Modules</TabsTrigger>
              <TabsTrigger value="pyq">PYQ Practice</TabsTrigger>
            </TabsList>

            {/* Attendance Tab */}
            <TabsContent value="attendance" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Subject-wise Attendance</CardTitle>
                  <CardDescription>Your attendance record for each subject</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {attendanceData.subjects.map((subject, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">{subject.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {subject.present} / {subject.total} classes attended
                          </p>
                        </div>
                        <Badge variant={subject.attendance >= 75 ? 'default' : 'destructive'}>
                          {subject.attendance}%
                        </Badge>
                      </div>
                      <Progress value={subject.attendance} />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Modules Tab */}
            <TabsContent value="modules" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Academic Modules & Papers</CardTitle>
                  <CardDescription>Download course materials uploaded by teachers</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {modules.map((module) => (
                      <div 
                        key={module.id}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                      >
                        <div className="flex items-start gap-4">
                          <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <FileText className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-medium">{module.title}</h4>
                            <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                              <span>{module.subject}</span>
                              <span>•</span>
                              <span>{module.teacher}</span>
                              <span>•</span>
                              <span>{new Date(module.uploadedDate).toLocaleDateString()}</span>
                            </div>
                          </div>
                        </div>
                        <Button size="sm" className="gap-2">
                          <Download className="h-4 w-4" />
                          Download
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* PYQ Practice Tab */}
            <TabsContent value="pyq" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Previous Year Questions Practice</CardTitle>
                  <CardDescription>Test your knowledge with questions from previous exams</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {pyqs.map((pyq, index) => (
                    <div key={pyq.id} className="p-4 border rounded-lg space-y-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-medium">Question {index + 1}</h4>
                          <Badge variant="outline" className="mt-2">{pyq.subject}</Badge>
                        </div>
                      </div>
                      
                      <p className="text-foreground">{pyq.question}</p>
                      
                      <div className="space-y-2">
                        {pyq.options.map((option, optionIndex) => {
                          const isSelected = answers[pyq.id] === option
                          const isCorrect = option === pyq.correctAnswer
                          const showResult = answers[pyq.id] !== undefined
                          
                          return (
                            <Button
                              key={optionIndex}
                              variant={isSelected ? "default" : "outline"}
                              className={`w-full justify-start text-left h-auto py-3 ${
                                showResult && isCorrect ? 'border-green-500 bg-green-500/10' : ''
                              } ${
                                showResult && isSelected && !isCorrect ? 'border-red-500 bg-red-500/10' : ''
                              }`}
                              onClick={() => handleAnswerSubmit(pyq.id, option)}
                              disabled={answers[pyq.id] !== undefined}
                            >
                              <div className="flex items-center gap-2 w-full">
                                <span className="flex-1">{option}</span>
                                {showResult && isCorrect && (
                                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                                )}
                                {showResult && isSelected && !isCorrect && (
                                  <XCircle className="h-5 w-5 text-red-500" />
                                )}
                              </div>
                            </Button>
                          )
                        })}
                      </div>
                      
                      {answers[pyq.id] && (
                        <div className={`p-3 rounded-lg ${
                          answers[pyq.id] === pyq.correctAnswer 
                            ? 'bg-green-500/10 text-green-700 dark:text-green-400' 
                            : 'bg-red-500/10 text-red-700 dark:text-red-400'
                        }`}>
                          {answers[pyq.id] === pyq.correctAnswer 
                            ? '✓ Correct! Well done.' 
                            : `✗ Incorrect. The correct answer is: ${pyq.correctAnswer}`
                          }
                        </div>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
