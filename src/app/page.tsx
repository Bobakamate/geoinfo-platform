"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ThemeToggle } from "@/components/layout/ThemeToggle"
import { 
  Map, 
  Satellite, 
  Mountain, 
  Database, 
  Code, 
  Users,
  BookOpen,
  Award,
  TrendingUp
} from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen  from-violet-50 via-purple-50 to-blue-50 dark:from-gray-950 dark:via-purple-950 dark:to-blue-950">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Map className="h-8 w-8 text-purple-600 dark:text-purple-400" />
            <span className="text-2xl font-bold bg-linear-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              GeoInfo Club
            </span>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link href="/login">
              <Button variant="ghost" className="hidden md:inline-flex">
                Se connecter
              </Button>
            </Link>
            <Link href="/login">
              <Button className="bg-linear-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                Commencer
              </Button>
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-purple-100 dark:bg-purple-900/30 px-4 py-2 rounded-full mb-6">
            <Award className="h-4 w-4 text-purple-600 dark:text-purple-400" />
            <span className="text-sm font-medium text-purple-700 dark:text-purple-300">
              Plateforme #1 pour les étudiants en Géomatique
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-linear-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
            Maîtrisez la Géoinformation
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
            Rejoignez une communauté d'étudiants passionnés et accédez à des cours 
            de qualité en SIG, Topographie, Géodésie et Télédétection
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/login">
              <Button size="lg" className="bg-linear-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-lg px-8 py-6">
                <Users className="mr-2 h-5 w-5" />
                Rejoindre la communauté
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-2">
              <BookOpen className="mr-2 h-5 w-5" />
              Explorer les cours
            </Button>
          </div>

          <div className="mt-12 flex items-center justify-center gap-8 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500"></div>
              <span>+2,500 étudiants</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-blue-500"></div>
              <span>50+ cours</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-purple-500"></div>
              <span>20+ instructeurs</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Domaines d'expertise</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Développez vos compétences dans tous les aspects de la géomatique
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="p-6 hover:shadow-xl transition-all duration-300 border-2 hover:border-purple-300 dark:hover:border-purple-700 group">
            <div className="h-12 w-12 rounded-lg bg-linear-to-br from-purple-500 to-purple-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Map className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2">SIG & Cartographie</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Maîtrisez QGIS, ArcGIS et créez des cartes professionnelles
            </p>
          </Card>

          <Card className="p-6 hover:shadow-xl transition-all duration-300 border-2 hover:border-blue-300 dark:hover:border-blue-700 group">
            <div className="h-12 w-12 rounded-lg bg-linear-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Satellite className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2">Télédétection</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Analysez des images satellites et aériennes pour l'observation de la Terre
            </p>
          </Card>

          <Card className="p-6 hover:shadow-xl transition-all duration-300 border-2 hover:border-cyan-300 dark:hover:border-cyan-700 group">
            <div className="h-12 w-12 rounded-lg bg-linear-to-br from-cyan-500 to-cyan-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Mountain className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2">Topographie</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Techniques modernes de levés avec stations totales et GPS RTK
            </p>
          </Card>

          <Card className="p-6 hover:shadow-xl transition-all duration-300 border-2 hover:border-green-300 dark:hover:border-green-700 group">
            <div className="h-12 w-12 rounded-lg bg-linear-to-br from-green-500 to-green-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Database className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2">Bases de données</h3>
            <p className="text-gray-600 dark:text-gray-400">
              PostGIS, bases de données spatiales et gestion de l'information
            </p>
          </Card>

          <Card className="p-6 hover:shadow-xl transition-all duration-300 border-2 hover:border-orange-300 dark:hover:border-orange-700 group">
            <div className="h-12 w-12 rounded-lg bg-linear-to-br from-orange-500 to-orange-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Code className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2">Développement</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Python, JavaScript, applications web et mobile géospatiales
            </p>
          </Card>

          <Card className="p-6 hover:shadow-xl transition-all duration-300 border-2 hover:border-pink-300 dark:hover:border-pink-700 group">
            <div className="h-12 w-12 rounded-lg bg-linear-to-br from-pink-500 to-pink-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2">Analyse spatiale</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Techniques avancées d'analyse et modélisation géostatistique
            </p>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <Card className="bg-linear-to-r from-purple-600 to-blue-600 border-0 overflow-hidden">
          <div className="p-12 md:p-16 text-center text-white relative">
            <div className="absolute inset-0 bg-grid-white/10"></div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 relative z-10">
              Prêt à commencer votre parcours ?
            </h2>
            <p className="text-xl mb-8 text-purple-100 relative z-10">
              Rejoignez des milliers d'étudiants qui développent leurs compétences en géomatique
            </p>
            <Link href="/login">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 text-lg px-8 py-6 relative z-10">
                Créer un compte gratuitement
              </Button>
            </Link>
          </div>
        </Card>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-12 border-t dark:border-gray-800">
        <div className="text-center text-gray-600 dark:text-gray-400">
          <p>© 2024 GeoInfo Club. Plateforme communautaire pour étudiants en géomatique.</p>
        </div>
      </footer>
    </div>
  )
}