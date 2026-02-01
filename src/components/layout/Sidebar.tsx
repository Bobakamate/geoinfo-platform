"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  Map,
  LayoutDashboard,
  BookOpen,
  Users,
  MessageSquare,
  BarChart3,
  CreditCard,
  User,
  Settings,
  LogOut
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const menuItems = [
 
  {
    label: "Courses",
    icon: BookOpen,
    href: "/dashboard",
  },
  {
    label: "Teachers",
    icon: Users,
    href: "/dashboard/teachers",
  },
  {
    label: "Messages",
    icon: MessageSquare,
    href: "/dashboard/messages",
    badge: 3,
  }
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-full w-64 flex-col bg-gray-950 dark:bg-gray-900 border-r dark:border-gray-800">
      {/* Logo */}
      <div className="flex h-16 items-center gap-2 border-b border-gray-800 px-6">
        <Map className="h-7 w-7 text-purple-400" />
        <span className="text-xl font-bold text-white">
          GeoInfo Club
        </span>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon

            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start gap-3 text-gray-300 hover:text-white hover:bg-gray-800",
                    isActive && "bg-gray-800 text-white font-medium"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="ml-auto flex h-6 w-6 items-center justify-center rounded-full bg-purple-600 text-xs font-medium text-white">
                      {item.badge}
                    </span>
                  )}
                </Button>
              </Link>
            )
          })}
        </nav>
      </ScrollArea>

      
    </div>
  )
}