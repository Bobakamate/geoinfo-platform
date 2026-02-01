"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Award,
  BookOpen,
  TrendingUp,
  Camera,
  Edit2,
  Save,
  X,
} from "lucide-react"
import { useState } from "react"
import coursesData from "@/lib/data/courses.json"
import { CourseCard } from "@/components/ui/CourseCard"

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    name: "John Doe",
    email: "john.doe@email.com",
    phone: "+33 6 12 34 56 78",
    location: "Paris, France",
    bio: "Passionate geomatics student specializing in GIS and remote sensing. Always eager to learn new technologies and methodologies in spatial data analysis.",
    university: "École Nationale des Sciences Géographiques",
    level: "Master 2",
    specialization: "Géomatique et Aménagement du Territoire",
  })

  const enrolledCourses = coursesData.courses.slice(0, 6)

  const achievements = [
    {
      title: "GIS Master",
      description: "Completed 10 GIS courses",
      icon: "🗺️",
      date: "Jan 2024",
    },
    {
      title: "Python Expert",
      description: "Mastered geospatial programming",
      icon: "🐍",
      date: "Dec 2023",
    },
    {
      title: "Top Student",
      description: "Ranked in top 5% of class",
      icon: "🏆",
      date: "Nov 2023",
    },
    {
      title: "Project Champion",
      description: "Completed 15 projects",
      icon: "🎯",
      date: "Oct 2023",
    },
  ]

  const stats = [
    {
      label: "Courses Completed",
      value: "24",
      icon: BookOpen,
      color: "text-purple-600 dark:text-purple-400",
      bgColor: "bg-purple-100 dark:bg-purple-900/30",
    },
    {
      label: "Certificates",
      value: "15",
      icon: Award,
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-100 dark:bg-blue-900/30",
    },
    {
      label: "Study Hours",
      value: "487",
      icon: TrendingUp,
      color: "text-green-600 dark:text-green-400",
      bgColor: "bg-green-100 dark:bg-green-900/30",
    },
    {
      label: "Current Courses",
      value: "6",
      icon: BookOpen,
      color: "text-orange-600 dark:text-orange-400",
      bgColor: "bg-orange-100 dark:bg-orange-900/30",
    },
  ]

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header with Cover */}
      <Card className="overflow-hidden">
        <div className="h-48 bg-linear-to-r from-purple-600 via-blue-600 to-cyan-600 relative">
          <div className="absolute inset-0 bg-grid-white/10"></div>
        </div>
        <div className="px-8 pb-8">
          <div className="flex flex-col md:flex-row gap-6 -mt-16">
            {/* Avatar */}
            <div className="relative">
              <Avatar className="h-32 w-32 border-4 border-background ring-2 ring-purple-600">
                <AvatarImage src="/avatars/user.jpg" />
                <AvatarFallback className="bg-linear-to-br from-purple-600 to-blue-600 text-white text-4xl">
                  JD
                </AvatarFallback>
              </Avatar>
              <Button
                size="icon"
                className="absolute bottom-0 right-0 rounded-full h-10 w-10 bg-purple-600 hover:bg-purple-700"
              >
                <Camera className="h-5 w-5" />
              </Button>
            </div>

            {/* Info */}
            <div className="flex-1 mt-16 md:mt-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-3">
                <div>
                  <h1 className="text-3xl font-bold">{profileData.name}</h1>
                  <p className="text-muted-foreground">{profileData.specialization}</p>
                </div>
                <Button
                  variant={isEditing ? "outline" : "default"}
                  onClick={() => setIsEditing(!isEditing)}
                  className={isEditing ? "" : "bg-linear-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"}
                >
                  {isEditing ? (
                    <>
                      <X className="mr-2 h-4 w-4" />
                      Cancel
                    </>
                  ) : (
                    <>
                      <Edit2 className="mr-2 h-4 w-4" />
                      Edit Profile
                    </>
                  )}
                </Button>
              </div>
              
              <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>{profileData.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>Joined January 2023</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4" />
                  <span>{profileData.level}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.label} className="p-6">
              <div className="flex items-center gap-4">
                <div className={`h-12 w-12 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                  <Icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      {/* Tabs */}
      <Tabs defaultValue="about" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:inline-grid">
          <TabsTrigger value="about">About</TabsTrigger>
          <TabsTrigger value="courses">My Courses</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
        </TabsList>

        <TabsContent value="about" className="space-y-6">
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-6">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={profileData.name}
                  onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={profileData.phone}
                  onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={profileData.location}
                  onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="university">University</Label>
                <Input
                  id="university"
                  value={profileData.university}
                  onChange={(e) => setProfileData({ ...profileData, university: e.target.value })}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="level">Level</Label>
                <Input
                  id="level"
                  value={profileData.level}
                  onChange={(e) => setProfileData({ ...profileData, level: e.target.value })}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="specialization">Specialization</Label>
                <Input
                  id="specialization"
                  value={profileData.specialization}
                  onChange={(e) => setProfileData({ ...profileData, specialization: e.target.value })}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={profileData.bio}
                  onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                  disabled={!isEditing}
                  rows={4}
                />
              </div>
            </div>
            {isEditing && (
              <div className="flex justify-end gap-3 mt-6">
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
                <Button className="bg-linear-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </div>
            )}
          </Card>
        </TabsContent>

        <TabsContent value="courses">
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-6">Enrolled Courses</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {enrolledCourses.map((course) => (
                //@ts-ignore
                <CourseCard key={course.id} {...course} />
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="achievements">
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-6">Achievements & Badges</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {achievements.map((achievement, index) => (
                <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow border-2">
                  <div className="text-5xl mb-3">{achievement.icon}</div>
                  <h3 className="font-bold mb-1">{achievement.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{achievement.description}</p>
                  <Badge variant="secondary" className="text-xs">
                    {achievement.date}
                  </Badge>
                </Card>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}