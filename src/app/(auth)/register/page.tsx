"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card } from "@/components/ui/card"
import { ThemeToggle } from "@/components/layout/ThemeToggle"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Map, Eye, EyeOff, Mail, User, GraduationCap, Building2, MapPin } from "lucide-react"
import { useRouter } from "next/navigation"

export default function RegisterPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    university: "",
    level: "",
    specialization: "",
    country: "",
    agreeToTerms: false,
  })

  const handleChange = (field: string, value: string | boolean) => {
    setFormData({ ...formData, [field]: value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulation d'inscription - en production, vous feriez une vraie requête API
    console.log("Registration data:", formData)
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-violet-50 via-purple-50 to-blue-50 dark:from-gray-950 dark:via-purple-950 dark:to-blue-950 p-4">
      <div className="absolute top-6 right-6">
        <ThemeToggle />
      </div>

      <Card className="w-full max-w-5xl overflow-hidden shadow-2xl border-2">
        <div className="grid md:grid-cols-2 gap-0">
          {/* Left Side - Registration Form */}
          <div className="p-8 md:p-12 bg-white dark:bg-gray-900">
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-6">
                <Map className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                <span className="text-2xl font-bold bg-linear-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  GeoInfo Club
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                Create Account 🚀
              </h1>

              <p className="text-gray-600 dark:text-gray-400 mb-2">
                Join our geomatics community
              </p>

              <p className="text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-purple-600 hover:text-purple-700 dark:text-purple-400 font-semibold"
                >
                  Sign in
                </Link>
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-sm font-medium">
                    First Name
                  </Label>
                  <div className="relative">
                    <Input
                      id="firstName"
                      type="text"
                      placeholder="John"
                      value={formData.firstName}
                      onChange={(e) => handleChange("firstName", e.target.value)}
                      className="h-11 pl-4 pr-10"
                      required
                    />
                    <User className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-sm font-medium">
                    Last Name
                  </Label>
                  <Input
                    id="lastName"
                    type="text"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={(e) => handleChange("lastName", e.target.value)}
                    className="h-11 pl-4"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email
                </Label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    placeholder="john.doe@university.edu"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    className="h-11 pl-4 pr-10"
                    required
                  />
                  <Mail className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                </div>
              </div>

              {/* Password Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium">
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) => handleChange("password", e.target.value)}
                      className="h-11 pl-4 pr-10"
                      required
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

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-sm font-medium">
                    Confirm Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={formData.confirmPassword}
                      onChange={(e) =>
                        handleChange("confirmPassword", e.target.value)
                      }
                      className="h-11 pl-4 pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* University */}
              <div className="space-y-2">
                <Label htmlFor="university" className="text-sm font-medium">
                  University / Institution
                </Label>
                <div className="relative">
                  <Input
                    id="university"
                    type="text"
                    placeholder="Your university name"
                    value={formData.university}
                    onChange={(e) => handleChange("university", e.target.value)}
                    className="h-11 pl-4 pr-10"
                    required
                  />
                  <Building2 className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                </div>
              </div>

              {/* Level and Specialization */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="level" className="text-sm font-medium">
                    Level
                  </Label>
                  <Select
                    value={formData.level}
                    onValueChange={(value) => handleChange("level", value)}
                  >
                    <SelectTrigger className="h-11">
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bachelor1">Bachelor Year 1</SelectItem>
                      <SelectItem value="bachelor2">Bachelor Year 2</SelectItem>
                      <SelectItem value="bachelor3">Bachelor Year 3</SelectItem>
                      <SelectItem value="master1">Master Year 1</SelectItem>
                      <SelectItem value="master2">Master Year 2</SelectItem>
                      <SelectItem value="phd">PhD</SelectItem>
                      <SelectItem value="professional">Professional</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="specialization" className="text-sm font-medium">
                    Specialization
                  </Label>
                  <Select
                    value={formData.specialization}
                    onValueChange={(value) =>
                      handleChange("specialization", value)
                    }
                  >
                    <SelectTrigger className="h-11">
                      <SelectValue placeholder="Select field" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gis">GIS & Cartography</SelectItem>
                      <SelectItem value="geodesy">Geodesy</SelectItem>
                      <SelectItem value="topography">Topography</SelectItem>
                      <SelectItem value="remote-sensing">
                        Remote Sensing
                      </SelectItem>
                      <SelectItem value="photogrammetry">
                        Photogrammetry
                      </SelectItem>
                      <SelectItem value="spatial-analysis">
                        Spatial Analysis
                      </SelectItem>
                      <SelectItem value="geomatics-general">
                        General Geomatics
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Country */}
              <div className="space-y-2">
                <Label htmlFor="country" className="text-sm font-medium">
                  Country
                </Label>
                <div className="relative">
                  <Input
                    id="country"
                    type="text"
                    placeholder="Your country"
                    value={formData.country}
                    onChange={(e) => handleChange("country", e.target.value)}
                    className="h-11 pl-4 pr-10"
                    required
                  />
                  <MapPin className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                </div>
              </div>

              {/* Terms & Conditions */}
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="terms"
                  checked={formData.agreeToTerms}
                  onCheckedChange={(checked) =>
                    handleChange("agreeToTerms", checked as boolean)
                  }
                  required
                />
                <Label
                  htmlFor="terms"
                  className="text-sm font-normal cursor-pointer leading-relaxed"
                >
                  I agree to the{" "}
                  <Link
                    href="/terms"
                    className="text-purple-600 hover:text-purple-700 dark:text-purple-400"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy"
                    className="text-purple-600 hover:text-purple-700 dark:text-purple-400"
                  >
                    Privacy Policy
                  </Link>
                </Label>
              </div>

              {/* Register Button */}
              <Button
                type="submit"
                className="w-full h-12 bg-linear-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-base font-semibold"
                disabled={!formData.agreeToTerms}
              >
                Create Account
              </Button>
            </form>
          </div>

          {/* Right Side - Illustration */}
          <div className="hidden md:flex items-center justify-center bg-linear-to-br from-purple-500 via-blue-500 to-cyan-500 p-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-white/10"></div>

            <div className="relative z-10 text-white text-center max-w-md">
              <div className="mb-8">
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm mb-6">
                  <GraduationCap className="h-12 w-12" />
                </div>
                <h2 className="text-4xl font-bold mb-4">
                  Join Our Community
                </h2>
                <p className="text-lg text-purple-100 mb-6">
                  Connect with fellow geomatics students and professionals from
                  around the world
                </p>
              </div>

              <div className="space-y-4 text-left">
                <div className="flex items-start gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center shrink-0 mt-1">
                    ✓
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Access 50+ Courses</h3>
                    <p className="text-sm text-purple-100">
                      Learn GIS, Remote Sensing, Geodesy, and more
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center shrink-0 mt-1">
                    ✓
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Expert Instructors</h3>
                    <p className="text-sm text-purple-100">
                      Learn from industry professionals and professors
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center shrink-0 mt-1">
                    ✓
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Earn Certificates</h3>
                    <p className="text-sm text-purple-100">
                      Get recognized for your achievements
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center shrink-0 mt-1">
                    ✓
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">
                      Community Support
                    </h3>
                    <p className="text-sm text-purple-100">
                      Connect with 2,500+ students worldwide
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}