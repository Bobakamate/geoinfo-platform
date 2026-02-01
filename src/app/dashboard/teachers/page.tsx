"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Search,
  Star,
  Users,
  BookOpen,
  Clock,
  MapPin,
  Mail,
  MessageSquare,
  Award,
} from "lucide-react"

// Données des enseignants
const teachers = [
  {
    id: "1",
    name: "Dr. Marie Dupont",
    role: "GIS & Remote Sensing Expert",
    avatar: "/avatars/marie.jpg",
    rating: 4.9,
    students: 1250,
    courses: 12,
    experience: "15 years",
    location: "Paris, France",
    email: "marie.dupont@geoinfo.edu",
    specialties: ["GIS", "Remote Sensing", "Spatial Analysis"],
    bio: "Expert in Geographic Information Systems with over 15 years of experience in environmental monitoring and spatial data analysis.",
    hourlyRate: 45,
  },
  {
    id: "2",
    name: "Prof. Jean Lambert",
    role: "Geodesy & Surveying Specialist",
    avatar: "/avatars/jean.jpg",
    rating: 4.8,
    students: 980,
    courses: 10,
    experience: "20 years",
    location: "Lyon, France",
    email: "jean.lambert@geoinfo.edu",
    specialties: ["Geodesy", "GPS", "Surveying"],
    bio: "Professor of Geodesy specializing in satellite positioning systems and reference frames.",
    hourlyRate: 50,
  },
  {
    id: "3",
    name: "Marc Rousseau",
    role: "Topography & Field Surveying",
    avatar: "/avatars/marc.jpg",
    rating: 4.7,
    students: 850,
    courses: 8,
    experience: "12 years",
    location: "Marseille, France",
    email: "marc.rousseau@geoinfo.edu",
    specialties: ["Topography", "Total Station", "UAV Surveying"],
    bio: "Field surveying expert with extensive experience in modern topographic techniques.",
    hourlyRate: 40,
  },
  {
    id: "4",
    name: "Dr. Sophie Martin",
    role: "Remote Sensing & Image Processing",
    avatar: "/avatars/sophie.jpg",
    rating: 5.0,
    students: 1450,
    courses: 15,
    experience: "18 years",
    location: "Toulouse, France",
    email: "sophie.martin@geoinfo.edu",
    specialties: ["Satellite Imagery", "Image Processing", "Machine Learning"],
    bio: "Leading researcher in satellite image analysis and AI applications in remote sensing.",
    hourlyRate: 55,
  },
  {
    id: "5",
    name: "Thomas Lefebvre",
    role: "Spatial Database Expert",
    avatar: "/avatars/thomas.jpg",
    rating: 4.6,
    students: 720,
    courses: 7,
    experience: "10 years",
    location: "Bordeaux, France",
    email: "thomas.lefebvre@geoinfo.edu",
    specialties: ["PostGIS", "PostgreSQL", "Database Design"],
    bio: "Database architect specializing in spatial data management and optimization.",
    hourlyRate: 42,
  },
  {
    id: "6",
    name: "Laura Bernard",
    role: "Web Mapping Developer",
    avatar: "/avatars/laura.jpg",
    rating: 4.8,
    students: 1100,
    courses: 11,
    experience: "8 years",
    location: "Nantes, France",
    email: "laura.bernard@geoinfo.edu",
    specialties: ["Leaflet", "Mapbox", "Web Development"],
    bio: "Full-stack developer focused on creating interactive web mapping applications.",
    hourlyRate: 38,
  },
  {
    id: "7",
    name: "Dr. Pierre Dubois",
    role: "Photogrammetry & 3D Modeling",
    avatar: "/avatars/pierre.jpg",
    rating: 4.9,
    students: 890,
    courses: 9,
    experience: "16 years",
    location: "Strasbourg, France",
    email: "pierre.dubois@geoinfo.edu",
    specialties: ["Photogrammetry", "3D Reconstruction", "Point Clouds"],
    bio: "Specialist in aerial photogrammetry and 3D modeling from UAV imagery.",
    hourlyRate: 48,
  },
  {
    id: "8",
    name: "Alexandre Chen",
    role: "Geospatial Python Developer",
    avatar: "/avatars/alex.jpg",
    rating: 4.7,
    students: 1350,
    courses: 13,
    experience: "9 years",
    location: "Paris, France",
    email: "alex.chen@geoinfo.edu",
    specialties: ["Python", "GDAL", "GeoPandas"],
    bio: "Software engineer teaching automation and scripting for geospatial workflows.",
    hourlyRate: 44,
  },
]

export default function TeachersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSpecialty, setSelectedSpecialty] = useState("all")
  const [sortBy, setSortBy] = useState("rating")

  // Extraire toutes les spécialités uniques
  const allSpecialties = Array.from(
    new Set(teachers.flatMap((teacher) => teacher.specialties))
  )

  // Filtrer et trier les enseignants
  const filteredTeachers = teachers
    .filter((teacher) => {
      const matchesSearch =
        teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        teacher.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        teacher.specialties.some((s) =>
          s.toLowerCase().includes(searchQuery.toLowerCase())
        )
      const matchesSpecialty =
        selectedSpecialty === "all" ||
        teacher.specialties.includes(selectedSpecialty)

      return matchesSearch && matchesSpecialty
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.rating - a.rating
        case "students":
          return b.students - a.students
        case "courses":
          return b.courses - a.courses
        case "experience":
          return (
            parseInt(b.experience) - parseInt(a.experience)
          )
        default:
          return 0
      }
    })

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Our Teachers</h1>
        <p className="text-muted-foreground">
          Learn from expert geomatics professionals
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
              <Users className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-2xl font-bold">{teachers.length}</p>
              <p className="text-sm text-muted-foreground">Expert Teachers</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
              <BookOpen className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold">
                {teachers.reduce((acc, t) => acc + t.courses, 0)}
              </p>
              <p className="text-sm text-muted-foreground">Total Courses</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <Star className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-2xl font-bold">
                {(
                  teachers.reduce((acc, t) => acc + t.rating, 0) / teachers.length
                ).toFixed(1)}
              </p>
              <p className="text-sm text-muted-foreground">Avg. Rating</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
              <Award className="h-6 w-6 text-orange-600 dark:text-orange-400" />
            </div>
            <div>
              <p className="text-2xl font-bold">
                {teachers.reduce((acc, t) => acc + t.students, 0).toLocaleString()}
              </p>
              <p className="text-sm text-muted-foreground">Students Taught</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="md:col-span-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search teachers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Specialty Filter */}
          <Select
            value={selectedSpecialty}
            onValueChange={setSelectedSpecialty}
          >
            <SelectTrigger>
              <SelectValue placeholder="Specialty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Specialties</SelectItem>
              {allSpecialties.map((specialty) => (
                <SelectItem key={specialty} value={specialty}>
                  {specialty}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Sort */}
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger>
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rating">Highest Rating</SelectItem>
              <SelectItem value="students">Most Students</SelectItem>
              <SelectItem value="courses">Most Courses</SelectItem>
              <SelectItem value="experience">Most Experience</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Teachers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTeachers.map((teacher) => (
          <Card
            key={teacher.id}
            className="overflow-hidden hover:shadow-lg transition-shadow"
          >
            {/* Header with gradient */}
            <div className="h-24 bg-linear-to-r from-purple-500 via-blue-500 to-cyan-500" />

            <div className="p-6 -mt-12">
              {/* Avatar */}
              <Avatar className="h-24 w-24 border-4 border-background mb-4">
                <AvatarImage src={teacher.avatar} />
                <AvatarFallback className="bg-linear-to-br from-purple-600 to-blue-600 text-white text-2xl">
                  {teacher.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>

              {/* Info */}
              <div className="space-y-3">
                <div>
                  <h3 className="text-xl font-bold">{teacher.name}</h3>
                  <p className="text-sm text-muted-foreground">{teacher.role}</p>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{teacher.rating}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    ({teacher.students} students)
                  </span>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-2 text-center py-3 border-y">
                  <div>
                    <div className="font-bold text-lg">{teacher.courses}</div>
                    <div className="text-xs text-muted-foreground">Courses</div>
                  </div>
                  <div>
                    <div className="font-bold text-lg">{teacher.students}</div>
                    <div className="text-xs text-muted-foreground">Students</div>
                  </div>
                  <div>
                    <div className="font-bold text-lg">
                      {teacher.experience.split(" ")[0]}
                    </div>
                    <div className="text-xs text-muted-foreground">Years</div>
                  </div>
                </div>

                {/* Specialties */}
                <div className="flex flex-wrap gap-2">
                  {teacher.specialties.map((specialty) => (
                    <Badge key={specialty} variant="secondary">
                      {specialty}
                    </Badge>
                  ))}
                </div>

                {/* Bio */}
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {teacher.bio}
                </p>

                {/* Location & Price */}
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{teacher.location.split(",")[0]}</span>
                  </div>
                  <div className="font-bold text-lg text-purple-600 dark:text-purple-400">
                    ${teacher.hourlyRate}/hr
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <Button className="flex-1 bg-linear-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Contact
                  </Button>
                  <Button variant="outline" className="flex-1">
                    View Profile
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredTeachers.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">No teachers found</p>
          <p className="text-sm text-muted-foreground mt-2">
            Try adjusting your filters
          </p>
        </div>
      )}
    </div>
  )
}