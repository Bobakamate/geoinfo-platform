"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Star, Users, Bookmark } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface CourseCardProps {
  id: string
  title: string
  description: string
  level: "Beginner" | "Intermediate" | "Advanced"
  students: number
  rating: number
  image: string
  instructor: {
    name: string
    avatar: string
  }
  category: string
  duration?: string
  lessons?: number
}

const levelColors = {
  Beginner: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  Intermediate: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
  Advanced: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
}

export function CourseCard({
  id,
  title,
  description,
  level,
  students,
  rating,
  image,
  instructor,
  category,
  duration,
  lessons,
}: CourseCardProps) {
  const [isBookmarked, setIsBookmarked] = useState(false)

  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 border-2 hover:border-purple-300 dark:hover:border-purple-700">
      {/* Image */}
      <div className="relative aspect-video overflow-hidden bg-linear-to-br from-purple-100 to-blue-100 dark:from-purple-900/20 dark:to-blue-900/20">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-6xl opacity-20">📚</div>
        </div>
        
        {/* Bookmark Button */}
        <Button
          size="icon"
          variant="secondary"
          className={cn(
            "absolute top-3 right-3 h-9 w-9 rounded-full shadow-lg",
            isBookmarked && "bg-purple-600 hover:bg-purple-700 text-white"
          )}
          onClick={() => setIsBookmarked(!isBookmarked)}
        >
          <Bookmark className={cn("h-4 w-4", isBookmarked && "fill-current")} />
        </Button>

        {/* Level Badge */}
        <div className="absolute top-3 left-3">
          <Badge className={levelColors[level]}>{level}</Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 space-y-4">
        {/* Stats */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>{students}</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="font-medium text-foreground">{rating}</span>
          </div>
        </div>

        {/* Title */}
        <div>
          <h3 className="font-semibold text-lg line-clamp-2 mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {description}
          </p>
        </div>

        {/* Instructor */}
        <div className="flex items-center gap-2 pt-2 border-t">
          <Avatar className="h-8 w-8">
            <AvatarImage src={instructor.avatar} />
            <AvatarFallback className="bg-purple-600 text-white text-xs">
              {instructor.name.split(" ").map(n => n[0]).join("")}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium text-purple-600 dark:text-purple-400">
            {instructor.name}
          </span>
        </div>
      </div>
    </Card>
  )
}