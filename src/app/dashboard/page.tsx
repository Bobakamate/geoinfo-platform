"use client"

import { useState } from "react"
import { CourseCard } from "@/components/ui/CourseCard"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, SlidersHorizontal, Grid3x3, List } from "lucide-react"
import coursesData from "@/lib/data/courses.json"

export default function CoursesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedLevel, setSelectedLevel] = useState("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  // Filtrer les cours
  const filteredCourses = coursesData.courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory =
      selectedCategory === "all" || course.category === selectedCategory
    const matchesLevel =
      selectedLevel === "all" || course.level === selectedLevel

    return matchesSearch && matchesCategory && matchesLevel
  })

  // Statistiques
  const totalCourses = coursesData.courses.length
  const totalStudents = coursesData.courses.reduce(
    (acc, course) => acc + course.students,
    0
  )
  const avgRating =
    coursesData.courses.reduce((acc, course) => acc + course.rating, 0) /
    coursesData.courses.length

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">All Courses</h1>
        <p className="text-muted-foreground">
          Explore our comprehensive library of geomatics courses
        </p>
      </div>

      

      {/* Filters */}
      <div className="bg-card border rounded-lg p-6 space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <SlidersHorizontal className="h-5 w-5 text-muted-foreground" />
          <h2 className="text-lg font-semibold">Filters</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Category Filter */}
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {coursesData.categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Level Filter */}
          <Select value={selectedLevel} onValueChange={setSelectedLevel}>
            <SelectTrigger>
              <SelectValue placeholder="Level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              <SelectItem value="Beginner">Beginner</SelectItem>
              <SelectItem value="Intermediate">Intermediate</SelectItem>
              <SelectItem value="Advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Active Filters */}
        {(selectedCategory !== "all" || selectedLevel !== "all" || searchQuery) && (
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm text-muted-foreground">Active filters:</span>
            {searchQuery && (
              <Badge variant="secondary" className="gap-1">
                Search: {searchQuery}
                <button onClick={() => setSearchQuery("")}>×</button>
              </Badge>
            )}
            {selectedCategory !== "all" && (
              <Badge variant="secondary" className="gap-1">
                {selectedCategory}
                <button onClick={() => setSelectedCategory("all")}>×</button>
              </Badge>
            )}
            {selectedLevel !== "all" && (
              <Badge variant="secondary" className="gap-1">
                {selectedLevel}
                <button onClick={() => setSelectedLevel("all")}>×</button>
              </Badge>
            )}
          </div>
        )}
      </div>

      {/* View Mode Toggle */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {filteredCourses.length} of {totalCourses} courses
        </p>
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            size="icon"
            onClick={() => setViewMode("grid")}
          >
            <Grid3x3 className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            size="icon"
            onClick={() => setViewMode("list")}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Courses Tabs */}
      <Tabs defaultValue="all" className="space-y-6">
        <TabsList>
          <TabsTrigger value="all">All Courses</TabsTrigger>
          <TabsTrigger value="enrolled">My Courses</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="favorites">Favorites</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          {filteredCourses.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No courses found</p>
              <p className="text-sm text-muted-foreground mt-2">
                Try adjusting your filters
              </p>
            </div>
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                //@ts-ignore
                <CourseCard key={course.id} {...course} />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredCourses.map((course) => (
                //@ts-ignore
                <CourseCard key={course.id} {...course} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="enrolled">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.slice(0, 6).map((course) => (
              //@ts-ignore
              <CourseCard key={course.id} {...course} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="completed">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.slice(0, 3).map((course) => (
              //@ts-ignore
              <CourseCard key={course.id} {...course} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="favorites">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.slice(0, 4).map((course) => (
              //@ts-ignore
              <CourseCard key={course.id} {...course} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}