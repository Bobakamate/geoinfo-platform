"use client"

import { useState, useEffect, useRef } from "react"
import { Badge }     from "@/components/ui/badge"
import { Button }    from "@/components/ui/button"
import { Input }     from "@/components/ui/input"
import { Progress }  from "@/components/ui/progress"
import { Skeleton }  from "@/components/ui/skeleton"
import { Separator } from "@/components/ui/separator"
import {
  Search, Clock, GraduationCap, Calendar,
  ChevronRight, BookMarked, Layers, TrendingUp,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { ApiClient } from "@/lib/ApiClient"
import type { CourseDTO, Level, ResourceType, User } from "@/lib/api-type"
import { LEVEL_META, RESOURCE_CONFIG, totalHours } from "@/lib/course-config"
import type { CourseDetailDTO } from "@/lib/course-config"
import { CourseDetail } from "@/components/courses/CoursesDetails"

// ─── Semestres disponibles (fixes — tous accessibles) ─────────────────────────
const ALL_SEMESTERS = [1, 2, 3, 4, 5, 6] as const

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CoursesPage() {
  const [courses,        setCourses]        = useState<CourseDTO[]>([])
  const [user,           setUser]           = useState<User | null>(null)
  const [loading,        setLoading]        = useState(true)
  const [search,         setSearch]         = useState("")
  const [activeSemester, setActiveSemester] = useState<number | "ALL">("ALL")
  const [selectedCourse, setSelectedCourse] = useState<CourseDetailDTO | null>(null)
  const [detailLoading,  setDetailLoading]  = useState(false)
  const topRef = useRef<HTMLDivElement>(null)

  useEffect(() => { load() }, [])

  // ── Chargement initial — tout via ApiClient ────────────────────
  async function load() {
    const [userRes, coursesRes] = await Promise.all([
      ApiClient.getUser(),      // retourne l'utilisateur connecté (mock ou DB)
      ApiClient.getCourses(),   // retourne TOUS les cours (tous semestres)
    ])
    if (userRes.data)    setUser(userRes.data)
    if (coursesRes.data) setCourses(coursesRes.data)
    console.log(userRes.data)
    console.log(coursesRes.data)
    setLoading(false)
  }

  // ── Ouverture du détail d'un cours ────────────────────────────
  async function openCourse(course: CourseDTO) {
    setDetailLoading(true)
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
    const res = await ApiClient.getCourseById(course.id)
    console.log(res.data)
    setSelectedCourse((res.data ?? course) as CourseDetailDTO)
    setDetailLoading(false)
  }

  function closeCourse() {
    setSelectedCourse(null)
    setTimeout(() => topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 50)
  }

  // ── Mise à jour de la progression (pas d'inscription) ─────────
  async function handleProgressUpdate(course: CourseDTO, resourceId: string, completed: boolean) {
    // Mise à jour optimiste locale
    const newProgress = completed
      ? Math.min((course.progress ?? 0) + 10, 100)
      : Math.max((course.progress ?? 0) - 10, 0)

    const updated = { ...course, progress: newProgress }
    setSelectedCourse(updated as CourseDetailDTO)
    setCourses((prev) => prev.map((c) => (c.id === course.id ? updated : c)))

    // Appel API
    await ApiClient.updateProgress(course.id, resourceId, completed)
  }

  // ─── Squelettes ───────────────────────────────────────────────
  if (loading)       return <ListSkeleton />
  if (detailLoading) return <DetailSkeleton />

  // ─── Vue détail ───────────────────────────────────────────────
  if (selectedCourse) {
    return (
      <div ref={topRef}>
        <CourseDetail
          course={selectedCourse}
          onBack={closeCourse}
          onProgressUpdate={(resourceId, completed) => handleProgressUpdate(selectedCourse, resourceId, completed)} 
          onEnroll={function (): void {
            throw new Error("Function not implemented.")
          } }        />
      </div>
    )
  }

  // ─── Statistiques globales ────────────────────────────────────
  const coursesWithProgress = courses.filter((c) => (c.progress ?? 0) > 0)
  const avgProgress =
    coursesWithProgress.length > 0
      ? coursesWithProgress.reduce((a, c) => a + (c.progress ?? 0), 0) /
        coursesWithProgress.length
      : 0

  // ─── Filtres ──────────────────────────────────────────────────
  function applyFilters(list: CourseDTO[]) {
    return list.filter((c) => {
      const matchSearch = !search || c.title.toLowerCase().includes(search.toLowerCase())
      const matchSem    = activeSemester === "ALL" || c.semester === activeSemester
      return matchSearch && matchSem
    })
  }

  const filteredCourses = applyFilters(courses)

  // Groupement par semestre pour l'affichage (utile en mode "Tous")
  const bySemester = ALL_SEMESTERS.reduce<Record<number, CourseDTO[]>>((acc, s) => {
    acc[s] = filteredCourses.filter((c) => c.semester === s)
    return acc
  }, {} as Record<number, CourseDTO[]>)

  const semestersToShow =
    activeSemester === "ALL"
      ? ALL_SEMESTERS.filter((s) => bySemester[s].length > 0)
      : ([activeSemester] as number[])

  return (
    <div className="min-h-screen bg-background" ref={topRef}>

      {/* ── Header ── */}
      <div className="border-b bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-4">

          {/* Titre + stats */}
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="space-y-1">
              {user && (
                <Badge
                  className={cn(
                    "border-0 text-xs font-semibold mb-2",
                    LEVEL_META[user.level].badge,
                  )}
                >
                  <GraduationCap className="h-3 w-3 mr-1" />
                  {LEVEL_META[user.level].year}
                </Badge>
              )}
              <h1 className="text-xl font-bold tracking-tight">GéoInformation</h1>
              <p className="text-sm text-muted-foreground">
                Parcours complet · {ALL_SEMESTERS.length} semestres · {courses.length} cours
              </p>
            </div>

            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="text-center">
                <p className="text-xl font-bold text-foreground leading-none">{courses.length}</p>
                <p className="text-xs mt-0.5">cours</p>
              </div>
              <Separator orientation="vertical" className="h-8" />
              
              {coursesWithProgress.length > 0 && (
                <>
                  <Separator orientation="vertical" className="h-8" />
                  <div className="text-center">
                    <p className="text-xl font-bold text-foreground leading-none">
                      {Math.round(avgProgress)}%
                    </p>
                    <p className="text-xs mt-0.5">moy. progression</p>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Barre de recherche + filtre semestre */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher un cours..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 h-9"
              />
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <FilterChip active={activeSemester === "ALL"} onClick={() => setActiveSemester("ALL")}>
                Tous
              </FilterChip>
              {ALL_SEMESTERS.map((s) => (
                <FilterChip
                  key={s}
                  active={activeSemester === s}
                  onClick={() => setActiveSemester(s)}
                >
                  <Calendar className="h-3 w-3" /> S{s}
                </FilterChip>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Grilles de cours ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-10">

        {filteredCourses.length === 0 ? (
          <EmptyState onReset={() => { setSearch(""); setActiveSemester("ALL") }} />
        ) : (
          semestersToShow.map((s) => {
            const list = bySemester[s]
            if (!list?.length) return null

            // Couleur de section selon l'année (S1-S2 = 1re, S3-S4 = 2e, S5-S6 = 3e)
            const yearLevel: Level =
              s <= 2 ? "BEGINNER" : s <= 4 ? "INTERMEDIATE" : "ADVANCED"
            const meta = LEVEL_META[yearLevel]

            return (
              <section key={s} className="space-y-3">
                <SectionHeading
                  icon={<BookMarked className="h-4 w-4" />}
                  count={list.length}
                  badge={meta.badge}
                  badgeLabel={meta.label}
                >
                  Semestre {s}
                </SectionHeading>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {list
                    .sort((a, b) => (b.progress ?? 0) - (a.progress ?? 0))
                    .map((c) => (
                      <CourseCard key={c.id} course={c} onClick={() => openCourse(c)} />
                    ))}
                </div>
              </section>
            )
          })
        )}
      </div>
    </div>
  )
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium border transition-all",
        active
          ? "bg-foreground text-background border-foreground"
          : "border-border text-muted-foreground hover:border-foreground/50 hover:text-foreground",
      )}
    >
      {children}
    </button>
  )
}

function SectionHeading({
  icon,
  count,
  badge,
  badgeLabel,
  children,
}: {
  icon: React.ReactNode
  count: number
  badge: string
  badgeLabel: string
  children: React.ReactNode
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="shrink-0 text-muted-foreground">{icon}</span>
      <h2 className="text-sm font-semibold">{children}</h2>
      <Badge className={cn("border-0 text-xs h-5 px-1.5", badge)}>{badgeLabel}</Badge>
      <span className="ml-auto text-xs text-muted-foreground">{count} cours</span>
    </div>
  )
}

function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <div className="rounded-xl border border-dashed py-12 text-center space-y-2">
      <p className="text-sm text-muted-foreground">Aucun cours trouvé.</p>
      <Button variant="ghost" size="sm" onClick={onReset}>
        Réinitialiser
      </Button>
    </div>
  )
}

function CourseCard({ course, onClick }: { course: CourseDTO; onClick: () => void }) {
  const yearLevel: Level =
    (course.semester ?? 1) <= 2
      ? "BEGINNER"
      : (course.semester ?? 1) <= 4
        ? "INTERMEDIATE"
        : "ADVANCED"
  const meta = LEVEL_META[yearLevel]
  const th   = totalHours(course)
  const prog = course.progress ?? 0

  return (
    <div
      onClick={onClick}
      className={cn(
        "group relative bg-card rounded-xl border border-l-[3px] p-4 flex flex-col gap-3",
        "cursor-pointer transition-all duration-150 hover:shadow-sm",
        prog > 0 ? meta.accentBorder : "border-l-transparent",
      )}
    >
      {/* Top row : badges + chevron */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex flex-wrap items-center gap-1.5">
          {course.semester != null && (
            <Badge variant="secondary" className="text-xs h-5 px-1.5">
              S{course.semester}
            </Badge>
          )}
          <Badge className={cn("text-xs border-0 h-5 px-1.5", meta.badge)}>
            {meta.label}
          </Badge>
        </div>
        <ChevronRight className="h-4 w-4 text-muted-foreground/30 shrink-0 group-hover:text-muted-foreground group-hover:translate-x-0.5 transition-all" />
      </div>

      {/* Titre */}
      <h3 className="text-sm font-semibold leading-snug line-clamp-2 flex-1">
        {course.title}
      </h3>

      {/* Pills d'heures */}
      {th > 0 && (
        <div className="flex flex-wrap gap-1">
          {(course.hoursCrs ?? 0) > 0 && <HourPill c="blue"    l="Crs" v={course.hoursCrs!} />}
          {(course.hoursTd  ?? 0) > 0 && <HourPill c="emerald" l="TD"  v={course.hoursTd!} />}
          {(course.hoursTp  ?? 0) > 0 && <HourPill c="amber"   l="TP"  v={course.hoursTp!} />}
          {(course.hoursAp  ?? 0) > 0 && <HourPill c="violet"  l="AP"  v={course.hoursAp!} />}
        </div>
      )}

      {/* Types de ressources */}
      {(course.resourceTypes ?? []).length > 0 && (
        <div className="flex flex-wrap gap-1">
          {(course.resourceTypes as ResourceType[]).map((type) => {
            const cfg  = RESOURCE_CONFIG[type]
            const Icon = cfg.icon
            return (
              <span
                key={type}
                className={cn(
                  "inline-flex items-center gap-1 text-xs px-1.5 py-0.5 rounded border font-medium",
                  cfg.bg, cfg.border, cfg.color,
                )}
              >
                <Icon className="h-3 w-3" />
                {cfg.label}
              </span>
            )
          })}
        </div>
      )}

      {/* Footer : heures totales + progression */}
      <div className="mt-auto pt-2.5 border-t flex items-center justify-between gap-2">
        {th > 0 && (
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            {th}h
          </span>
        )}


  <div className="ml-auto h-1 w-14 bg-muted rounded-full opacity-40" />

      </div>
    </div>
  )
}

function HourPill({ c, l, v }: { c: string; l: string; v: number }) {
  const map: Record<string, string> = {
    blue:    "bg-blue-500/10 text-blue-600 dark:text-blue-400",
    emerald: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    amber:   "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    violet:  "bg-violet-500/10 text-violet-600 dark:text-violet-400",
  }
  return (
    <span className={cn("text-xs px-1.5 py-0.5 rounded font-medium tabular-nums", map[c])}>
      {l} {v}h
    </span>
  )
}

// ─── Skeletons ────────────────────────────────────────────────────────────────

function ListSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-card px-4 sm:px-6 py-6 space-y-3 max-w-7xl mx-auto">
        <Skeleton className="h-5 w-32 rounded-full" />
        <Skeleton className="h-7 w-52" />
        <Skeleton className="h-4 w-40" />
        <Skeleton className="h-9 w-60 mt-1" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-3">
        <Skeleton className="h-4 w-36" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-44 rounded-xl" />
          ))}
        </div>
      </div>
    </div>
  )
}

function DetailSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-card h-14 flex items-center px-4 sm:px-6">
        <Skeleton className="h-5 w-36" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-5">
        <div className="space-y-2">
          <Skeleton className="h-7 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-3">
            <Skeleton className="aspect-video rounded-2xl" />
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-14 rounded-xl" />
            ))}
          </div>
          <div className="space-y-3">
            <Skeleton className="h-44 rounded-2xl" />
            <Skeleton className="h-28 rounded-2xl" />
          </div>
        </div>
      </div>
    </div>
  )
}