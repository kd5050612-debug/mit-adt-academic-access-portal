"use client"

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowRight, BookOpen, Calendar, GraduationCap, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Spline3DModel from '@/components/Spline3DModel'
import Sidebar from '@/components/Sidebar'
import { useEffect, useState } from 'react'
import { useSession } from '@/lib/auth-client'

export default function Home() {
  const [scrollY, setScrollY] = useState(0)
  const router = useRouter()
  const { data: session, isPending } = useSession()

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleStudentPortalClick = () => {
    if (!isPending && !session?.user) {
      router.push('/login?type=student&redirect=/student')
    } else {
      router.push('/student')
    }
  }

  const handleTeacherPortalClick = () => {
    if (!isPending && !session?.user) {
      router.push('/login?type=teacher&redirect=/teacher')
    } else {
      router.push('/teacher')
    }
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      
      <main className="flex-1 md:ml-64">
        {/* Hero Section with 3D Model */}
        <section className="relative h-screen overflow-hidden bg-gradient-to-br from-primary/10 via-purple-500/5 to-background">
          {/* 3D Model Background */}
          <div className="absolute inset-0 z-0">
            <Spline3DModel className="w-full h-full" />
          </div>
          
          {/* Hero Content */}
          <div className="relative z-10 flex h-full items-center justify-center">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center space-y-8 text-center">
                <div className="space-y-4 max-w-3xl">
                  <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl bg-gradient-to-r from-primary via-purple-600 to-primary bg-clip-text text-transparent">
                    MIT ADT University
                  </h1>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-foreground/90">
                    Academic Access Portal
                  </h2>
                  <p className="mx-auto max-w-[700px] text-lg text-muted-foreground md:text-xl">
                    Your centralized hub for attendance tracking, academic modules, daily events, and practice questions.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    onClick={handleStudentPortalClick}
                    size="lg" 
                    className="gap-2"
                    disabled={isPending}
                  >
                    <GraduationCap className="h-5 w-5" />
                    Student Portal
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                  <Button 
                    onClick={handleTeacherPortalClick}
                    variant="outline" 
                    size="lg" 
                    className="gap-2 bg-card/50 backdrop-blur-sm"
                    disabled={isPending}
                  >
                    <BookOpen className="h-5 w-5" />
                    Teacher Portal
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
            <div className="flex flex-col items-center gap-2 text-muted-foreground">
              <span className="text-sm">Scroll to explore</span>
              <div className="h-8 w-0.5 bg-gradient-to-b from-primary to-transparent" />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="relative py-24 bg-background overflow-hidden">
          {/* 3D Model Background - Parallax Effect */}
          <div 
            className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-30 pointer-events-none z-0"
            style={{
              transform: `translateY(calc(-50% + ${(scrollY - 800) * 0.3}px)) translateX(${Math.max(0, (scrollY - 800) * 0.1)}px) scale(${0.8 + Math.min(0.3, (scrollY - 800) * 0.0001)})`,
              transition: 'transform 0.1s ease-out'
            }}
          >
            <Spline3DModel className="w-full h-full" />
          </div>

          <div className="container px-4 md:px-6 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
                Portal Features
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Everything you need for seamless academic management in one place
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              <Card className="border-2 hover:border-primary transition-colors duration-300 backdrop-blur-sm bg-card/80">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <TrendingUp className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Attendance Tracking</CardTitle>
                  <CardDescription>
                    Monitor your attendance in real-time with detailed analytics and insights
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-2 hover:border-primary transition-colors duration-300 backdrop-blur-sm bg-card/80">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-purple-500/10 flex items-center justify-center mb-4">
                    <BookOpen className="h-6 w-6 text-purple-600" />
                  </div>
                  <CardTitle>Academic Modules</CardTitle>
                  <CardDescription>
                    Access course materials, papers, and resources uploaded by teachers
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-2 hover:border-primary transition-colors duration-300 backdrop-blur-sm bg-card/80">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4">
                    <Calendar className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle>Daily Events</CardTitle>
                  <CardDescription>
                    Stay updated with daily event notifications and academic calendar
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-2 hover:border-primary transition-colors duration-300 backdrop-blur-sm bg-card/80">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-green-500/10 flex items-center justify-center mb-4">
                    <GraduationCap className="h-6 w-6 text-green-600" />
                  </div>
                  <CardTitle>PYQ Practice</CardTitle>
                  <CardDescription>
                    Practice with previous year questions to ace your examinations
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-24 bg-gradient-to-br from-primary/10 via-purple-500/5 to-background overflow-hidden">
          {/* 3D Model Background - Parallax Effect */}
          <div 
            className="absolute left-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] opacity-40 pointer-events-none z-0"
            style={{
              transform: `translateY(calc(-50% + ${(scrollY - 1800) * 0.2}px)) translateX(${Math.min(0, -(scrollY - 1800) * 0.08)}px) scale(${0.7 + Math.min(0.4, (scrollY - 1800) * 0.0001)}) rotateY(${(scrollY - 1800) * 0.02}deg)`,
              transition: 'transform 0.1s ease-out'
            }}
          >
            <Spline3DModel className="w-full h-full" />
          </div>

          <div className="container px-4 md:px-6 relative z-10">
            <Card className="border-2 border-primary/20 backdrop-blur-sm bg-card/80">
              <CardContent className="p-12">
                <div className="flex flex-col items-center text-center space-y-6">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                    Ready to Get Started?
                  </h2>
                  <p className="text-muted-foreground text-lg max-w-2xl">
                    Access your personalized dashboard and start managing your academic journey today
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button 
                      onClick={handleStudentPortalClick}
                      size="lg" 
                      className="gap-2"
                      disabled={isPending}
                    >
                      Access Student Portal
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                    <Button asChild variant="outline" size="lg">
                      <Link href="/events">
                        View Events
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </div>
  )
}