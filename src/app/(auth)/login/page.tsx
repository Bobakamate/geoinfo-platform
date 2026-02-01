"use client"

import Link from "next/link"
import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card } from "@/components/ui/card"
import { ThemeToggle } from "@/components/layout/ThemeToggle"
import { FcGoogle } from "react-icons/fc"
import { Map, Eye, EyeOff, Mail, ArrowRight } from "lucide-react"
import { toast } from "sonner" // ou votre système de toast

export default function LoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Connexion avec Google
  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true)
      await signIn("google", {
        callbackUrl: "/dashboard",
        redirect: true,
      })
    } catch (error) {
      console.error("Erreur lors de la connexion Google:", error)
      toast.error("Erreur lors de la connexion avec Google")
    } finally {
      setIsLoading(false)
    }
  }

  // Connexion avec email/password (si vous l'implémentez plus tard)
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      // Si vous voulez implémenter l'authentification par email/password
      // vous devrez ajouter le provider Credentials dans auth.ts
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        toast.error("Email ou mot de passe incorrect")
      } else {
        router.push("/dashboard")
      }
    } catch (error) {
      console.error("Erreur de connexion:", error)
      toast.error("Erreur lors de la connexion")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-violet-50 via-purple-50 to-blue-50 dark:from-gray-950 dark:via-purple-950 dark:to-blue-950 p-4">
      <div className="absolute top-6 right-6">
        <ThemeToggle />
      </div>

      <Card className="w-full max-w-6xl overflow-hidden shadow-2xl border-2 ">
        <div className="grid md:grid-cols-2 gap-0">
          {/* Left Side - Login Form */}
          <div className="p-8 md:p-12 bg-white dark:bg-gray-900">
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-6">
                <Map className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                <span className="text-2xl font-bold bg-linear-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  GeoInfo Club
                </span>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold mb-2 flex items-center gap-2">
                Welcome back 👋
              </h1>
              
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                Please enter your details
              </p>
            </div>

            <div className="space-y-6">
              {/* Google Login Button */}
              <Button
                type="button"
                variant="outline"
                className="w-full h-12 text-base border-2"
                onClick={handleGoogleLogin}
                disabled={isLoading}
              >
                <FcGoogle className="h-5 w-5" />
                {isLoading ? "Connexion..." : "Log In with Google"}
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t dark:border-gray-700" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white dark:bg-gray-900 px-2 text-gray-500">
                    or
                  </span>
                </div>
              </div>

              {/* Email/Password Form */}
              <form onSubmit={handleLogin} className="space-y-6">
                {/* Email Input */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email
                  </Label>
                  <div className="relative">
                    <Input
                      id="email"
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-12 pl-4 pr-10"
                      required
                      disabled={isLoading}
                    />
                    <Mail className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  </div>
                </div>

                {/* Password Input */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium">
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-12 pl-4 pr-10"
                      required
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="remember"
                      checked={rememberMe}
                      onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                      disabled={isLoading}
                    />
                    <Label
                      htmlFor="remember"
                      className="text-sm font-normal cursor-pointer"
                    >
                      Remember for 30 days
                    </Label>
                  </div>
                  <Link
                    href="/forgot-password"
                    className="text-sm text-purple-600 hover:text-purple-700 dark:text-purple-400 font-medium"
                  >
                    Forgot password?
                  </Link>
                </div>

                {/* Login Button */}
                <Button
                  type="submit"
                  className="w-full h-12 bg-linear-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-base font-semibold"
                  disabled={isLoading}
                >
                  {isLoading ? "Connexion..." : "Log In"}
                </Button>

                {/* Sign Up Link */}
                <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                  Don't have an account?{" "}
                  <Link
                    href="/register"
                    className="text-purple-600 hover:text-purple-700 dark:text-purple-400 font-semibold"
                  >
                    Sign Up
                  </Link>
                </p>
              </form>
            </div>
          </div>

          {/* Right Side - 3D Illustration (reste identique) */}
          <div className="hidden md:flex items-center justify-center bg-linear-to-br from-blue-500 via-purple-500 to-pink-500 p-12 relative overflow-hidden">
            {/* ... votre illustration 3D ... */}
          </div>
        </div>
      </Card>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(10deg); }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0px) rotate(45deg); }
          50% { transform: translateY(-30px) rotate(45deg); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 4s ease-in-out infinite;
        }
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>
    </div>
  )
}