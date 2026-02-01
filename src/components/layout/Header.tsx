"use client"

import { Bell, LogOut, User, Settings, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ThemeToggle } from "./ThemeToggle"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"
import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export function Header() {
  const { data: session } = useSession()
  const router = useRouter()
  const [showLogoutDialog, setShowLogoutDialog] = useState(false)

  const handleSignOut = async () => {
    await signOut({ 
      callbackUrl: "/login",
      redirect: true 
    })
  }

  const getInitials = (name: string | null | undefined) => {
    if (!name) return "U"
    return name
      .split(" ")
      .map(n => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <>
      <header className="sticky top-0 z-40 flex h-16 items-center justify-end gap-6 border-b border-border/40 backdrop-blur-xl bg-transparent px-6 md:px-8">
        {/* Right Side */}
        <div className="flex items-center gap-4 md:gap-6">
          {/* Theme Toggle */}
          <div className="flex items-center">
            <ThemeToggle />
          </div>

          {/* Notifications */}
          <div className="flex items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative h-10 w-10">
                  <Bell className="h-5 w-5" />
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs">
                    3
                  </Badge>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="flex flex-col items-start py-3">
                  <div className="font-medium">New course available</div>
                  <div className="text-sm text-muted-foreground">
                    Advanced LiDAR Processing is now live
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">2 hours ago</div>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex flex-col items-start py-3">
                  <div className="font-medium">Assignment due soon</div>
                  <div className="text-sm text-muted-foreground">
                    SIG Project due in 2 days
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">5 hours ago</div>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex flex-col items-start py-3">
                  <div className="font-medium">New message from instructor</div>
                  <div className="text-sm text-muted-foreground">
                    Dr. Marie Dupont replied to your question
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">1 day ago</div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Separator */}
          <div className="hidden md:block h-8 w-px bg-border/40" />

          {/* User Avatar */}
          <div className="flex items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full p-0">
                  <Avatar className="h-10 w-10">
                    <AvatarImage 
                      src={session?.user?.image || "/avatars/user.jpg"} 
                      alt={session?.user?.name || "User avatar"} 
                    />
                    <AvatarFallback className="bg-purple-600 text-white">
                      {getInitials(session?.user?.name)}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {session?.user?.name || "User"}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {session?.user?.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push('/profile')}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push('/settings')}>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push('/billing')}>
                  <CreditCard className="mr-2 h-4 w-4" />
                  <span>Billing</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  onClick={() => setShowLogoutDialog(true)}
                  className="text-red-600 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-950"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Logout Confirmation Dialog */}
      <AlertDialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Voulez-vous vraiment vous déconnecter ?</AlertDialogTitle>
            <AlertDialogDescription>
              Vous serez redirigé vers la page de connexion.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleSignOut}
              className="bg-red-600 hover:bg-red-700"
            >
              Se déconnecter
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}