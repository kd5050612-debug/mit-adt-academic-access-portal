"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar as CalendarIcon, Clock, MapPin, Filter } from 'lucide-react'
import Sidebar from '@/components/Sidebar'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'

const eventTypes = {
  exam: { label: 'Exam', color: 'bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20' },
  lecture: { label: 'Lecture', color: 'bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20' },
  workshop: { label: 'Workshop', color: 'bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-500/20' },
  seminar: { label: 'Seminar', color: 'bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20' },
  holiday: { label: 'Holiday', color: 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/20' },
  deadline: { label: 'Deadline', color: 'bg-orange-500/10 text-orange-700 dark:text-orange-400 border-orange-500/20' },
}

export default function EventsPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [selectedFilter, setSelectedFilter] = useState<string>('all')

  const events = [
    {
      id: 1,
      title: 'Mid-Semester Examination',
      type: 'exam' as keyof typeof eventTypes,
      date: '2024-02-15',
      time: '10:00 AM',
      location: 'Main Auditorium',
      description: 'Mid-semester exams for all subjects. Please arrive 15 minutes early.'
    },
    {
      id: 2,
      title: 'Guest Lecture on Artificial Intelligence',
      type: 'lecture' as keyof typeof eventTypes,
      date: '2024-02-10',
      time: '2:00 PM',
      location: 'Room 301, Computer Science Block',
      description: 'Industry expert Dr. Rajesh Kumar will discuss the latest trends in AI and ML.'
    },
    {
      id: 3,
      title: 'Web Development Workshop',
      type: 'workshop' as keyof typeof eventTypes,
      date: '2024-02-12',
      time: '11:00 AM',
      location: 'Computer Lab A',
      description: 'Hands-on workshop on modern web development with React and Next.js.'
    },
    {
      id: 4,
      title: 'Research Paper Submission Deadline',
      type: 'deadline' as keyof typeof eventTypes,
      date: '2024-02-08',
      time: '11:59 PM',
      location: 'Online Submission',
      description: 'Final deadline for semester research paper submission.'
    },
    {
      id: 5,
      title: 'Technical Seminar on Cloud Computing',
      type: 'seminar' as keyof typeof eventTypes,
      date: '2024-02-18',
      time: '3:30 PM',
      location: 'Seminar Hall',
      description: 'Learn about cloud infrastructure and deployment strategies.'
    },
    {
      id: 6,
      title: 'Republic Day Holiday',
      type: 'holiday' as keyof typeof eventTypes,
      date: '2024-01-26',
      time: 'All Day',
      location: 'Campus Closed',
      description: 'Campus will remain closed for Republic Day celebrations.'
    },
  ]

  const filteredEvents = events
    .filter(event => selectedFilter === 'all' || event.type === selectedFilter)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  const upcomingEvents = filteredEvents.filter(
    event => new Date(event.date) >= new Date()
  )

  const pastEvents = filteredEvents.filter(
    event => new Date(event.date) < new Date()
  )

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <main className="flex-1 md:ml-64 p-6 lg:p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Academic Events</h1>
            <p className="text-muted-foreground mt-2">
              Stay updated with daily event notifications and academic calendar
            </p>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedFilter === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedFilter('all')}
            >
              All Events
            </Button>
            {Object.entries(eventTypes).map(([key, value]) => (
              <Button
                key={key}
                variant={selectedFilter === key ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedFilter(key)}
              >
                {value.label}
              </Button>
            ))}
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Events Timeline */}
            <div className="lg:col-span-2 space-y-6">
              {/* Upcoming Events */}
              <div>
                <h2 className="text-xl font-semibold mb-4">Upcoming Events</h2>
                <div className="space-y-4">
                  {upcomingEvents.length > 0 ? (
                    upcomingEvents.map((event) => (
                      <Card key={event.id} className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div className="space-y-1">
                              <CardTitle className="text-lg">{event.title}</CardTitle>
                              <CardDescription className="flex items-center gap-4 text-sm">
                                <span className="flex items-center gap-1">
                                  <CalendarIcon className="h-4 w-4" />
                                  {new Date(event.date).toLocaleDateString('en-US', { 
                                    weekday: 'short', 
                                    month: 'short', 
                                    day: 'numeric' 
                                  })}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Clock className="h-4 w-4" />
                                  {event.time}
                                </span>
                              </CardDescription>
                            </div>
                            <Badge 
                              variant="outline" 
                              className={eventTypes[event.type].color}
                            >
                              {eventTypes[event.type].label}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="flex items-start gap-2 text-sm">
                            <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground flex-shrink-0" />
                            <span className="text-muted-foreground">{event.location}</span>
                          </div>
                          <p className="text-sm">{event.description}</p>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <Card>
                      <CardContent className="p-8 text-center">
                        <p className="text-muted-foreground">No upcoming events found</p>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>

              {/* Past Events */}
              {pastEvents.length > 0 && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">Past Events</h2>
                  <div className="space-y-4">
                    {pastEvents.map((event) => (
                      <Card key={event.id} className="opacity-60">
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div className="space-y-1">
                              <CardTitle className="text-lg">{event.title}</CardTitle>
                              <CardDescription className="flex items-center gap-4 text-sm">
                                <span className="flex items-center gap-1">
                                  <CalendarIcon className="h-4 w-4" />
                                  {new Date(event.date).toLocaleDateString('en-US', { 
                                    weekday: 'short', 
                                    month: 'short', 
                                    day: 'numeric' 
                                  })}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Clock className="h-4 w-4" />
                                  {event.time}
                                </span>
                              </CardDescription>
                            </div>
                            <Badge 
                              variant="outline" 
                              className={eventTypes[event.type].color}
                            >
                              {eventTypes[event.type].label}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-start gap-2 text-sm">
                            <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground flex-shrink-0" />
                            <span className="text-muted-foreground">{event.location}</span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Calendar Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Calendar</CardTitle>
                  <CardDescription>Select a date to view events</CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md"
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Total Events</span>
                    <span className="font-semibold">{events.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Upcoming</span>
                    <span className="font-semibold text-primary">{upcomingEvents.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">This Week</span>
                    <span className="font-semibold">
                      {events.filter(e => {
                        const eventDate = new Date(e.date)
                        const weekFromNow = new Date()
                        weekFromNow.setDate(weekFromNow.getDate() + 7)
                        return eventDate <= weekFromNow && eventDate >= new Date()
                      }).length}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
