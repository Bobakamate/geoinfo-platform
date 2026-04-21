"use client"

import { useState } from "react"
import { Badge }     from "@/components/ui/badge"
import { Button }    from "@/components/ui/button"
import { Progress }  from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  ArrowLeft, ChevronRight, GraduationCap, Calendar, Clock,
  Play, FileText, Link2, Info, CheckCircle2, Lock,
  Download, ExternalLink, Maximize2, Minimize2,
  File, Sheet, Presentation, BookOpen, Trophy,
  BarChart3, Zap, PlayCircle,
} from "lucide-react"
import { cn } from "@/lib/utils"
import type { ResourceType } from "@/lib/api-type"
import {
  LEVEL_META, RESOURCE_CONFIG, totalHours,
  getYouTubeId, getYouTubeThumbnail, getDrivePreviewUrl, getDriveDownloadUrl,
  DEMO_VIDEOS, DEMO_DOCUMENTS, DEMO_LINKS,
} from "@/lib/course-config"
import type { CourseDetailDTO, VideoItem, DocumentItem, LinkItem } from "@/lib/course-config"

// ─── Tab types ────────────────────────────────────────────────────────────────

type Tab = "videos" | "documents" | "liens" | "infos"

// ─── Component ────────────────────────────────────────────────────────────────

export function CourseDetail({
  course,
  onBack,
  onEnroll,
  onProgressUpdate
}: {
  course: CourseDetailDTO
  onBack: () => void
  onEnroll: () => void
  onProgressUpdate:(resourceId:string, completed:boolean)=> Promise<void>
}) {
  const meta  = LEVEL_META[course.level]
  const th    = totalHours(course)
  const types = (course.resourceTypes ?? []) as ResourceType[]

  // Use real data if present, otherwise demo
  const videos    = (course.videos    ?? DEMO_VIDEOS)    as VideoItem[]
  const documents = (course.documents ?? DEMO_DOCUMENTS) as DocumentItem[]
  const links     = (course.links     ?? DEMO_LINKS)     as LinkItem[]

  const [activeTab,    setActiveTab]    = useState<Tab>("videos")
  const [activeVideo,  setActiveVideo]  = useState<VideoItem>(videos[0])
  const [activeDoc,    setActiveDoc]    = useState<DocumentItem | null>(null)
  const [docFullscreen, setDocFullscreen] = useState(false)

  const tabs: { id: Tab; label: string; icon: React.ElementType; count?: number }[] = [
    { id: "videos",    label: "Vidéos",     icon: Play,      count: videos.length },
    { id: "documents", label: "Documents",  icon: FileText,  count: documents.length },
    { id: "liens",     label: "Liens",      icon: Link2,     count: links.length },
    { id: "infos",     label: "Infos",      icon: Info },
  ]

  return (
    <div className="min-h-screen bg-background">

      {/* ── Top bar ── */}
      <div className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group shrink-0"
          >
            <span className="p-1 rounded-md bg-muted group-hover:bg-muted/80 transition-colors">
              <ArrowLeft className="h-3.5 w-3.5" />
            </span>
            Retour
          </button>

          <p className="text-sm font-medium truncate hidden sm:block">{course.title}</p>

          <div className="flex items-center gap-2 shrink-0">
            
          </div>
        </div>
      </div>

      {/* ── Course title block ── */}
      <div className="border-b bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <Badge className={cn("border-0 text-xs font-semibold", meta.badge)}>
              <GraduationCap className="h-3 w-3 mr-1" />{meta.year}
            </Badge>
            {course.semester != null && (
              <Badge variant="outline" className="text-xs">
                <Calendar className="h-3 w-3 mr-1" />Semestre {course.semester}
              </Badge>
            )}
            {types.map((r) => {
              const cfg = RESOURCE_CONFIG[r]; const Icon = cfg.icon
              return (
                <span key={r} className={cn("inline-flex items-center gap-1 text-xs px-1.5 py-0.5 rounded border font-medium", cfg.bg, cfg.border, cfg.color)}>
                  <Icon className="h-3 w-3" />{cfg.label}
                </span>
              )
            })}
          </div>
          <h1 className="text-lg sm:text-xl font-bold leading-snug">{course.title}</h1>
          {course.description && (
            <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed max-w-3xl">{course.description}</p>
          )}
          <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-muted-foreground">
            {th > 0 && <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{th}h de contenu</span>}
            {course.isEnrolled && (
              <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="h-3.5 w-3.5" />{course.progress ?? 0}% complété
              </span>
            )}
          </div>
          {course.isEnrolled && (
            <div className="flex items-center gap-2 mt-2 max-w-xs">
              <Progress value={course.progress ?? 0} className="h-1 flex-1" />
              <span className="text-xs font-semibold tabular-nums text-emerald-600 dark:text-emerald-400 w-7">
                {course.progress ?? 0}%
              </span>
            </div>
          )}
        </div>

        {/* Tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex gap-0 border-t">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex items-center gap-1.5 px-4 py-3 text-xs font-medium border-b-2 transition-colors",
                  activeTab === tab.id
                    ? "border-foreground text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                )}
              >
                <Icon className="h-3.5 w-3.5" />
                {tab.label}
                {tab.count != null && (
                  <span className={cn(
                    "ml-0.5 rounded-full px-1.5 py-0 text-[10px] font-semibold",
                    activeTab === tab.id ? "bg-foreground/10" : "bg-muted"
                  )}>
                    {tab.count}
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* ── Tab content ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">

        {/* ════ VIDÉOS ════ */}
        {activeTab === "videos" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

            {/* Player */}
            <div className="lg:col-span-2 space-y-3">
              {activeVideo ? (
                <>
                  {/* YouTube embed */}
                  <div className="rounded-2xl overflow-hidden bg-black ring-1 ring-border shadow-md">
                    <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
                      <iframe
                        key={activeVideo.id}
                        src={`https://www.youtube.com/embed/${getYouTubeId(activeVideo.youtubeUrl)}?rel=0&modestbranding=1&color=white`}
                        title={activeVideo.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="absolute inset-0 w-full h-full"
                      />
                    </div>
                  </div>

                  {/* Video meta */}
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h2 className="font-semibold text-sm">{activeVideo.title}</h2>
                      {activeVideo.description && (
                        <p className="text-xs text-muted-foreground mt-1">{activeVideo.description}</p>
                      )}
                    </div>
                    <a
                      href={activeVideo.youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors shrink-0"
                    >
                      <ExternalLink className="h-3 w-3" />
                      YouTube
                    </a>
                  </div>
                </>
              ) : (
                <EmptySection icon={<PlayCircle className="h-8 w-8" />} label="Aucune vidéo disponible" />
              )}
            </div>

            {/* Playlist */}
            <aside className="space-y-2">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-1">
                Playlist · {videos.length} vidéo{videos.length > 1 ? "s" : ""}
              </p>
              <div className="space-y-1.5">
                {videos.map((v, i) => {
                  const thumb = getYouTubeThumbnail(v.youtubeUrl)
                  const isActive = activeVideo?.id === v.id
                  return (
                    <button
                      key={v.id}
                      onClick={() => setActiveVideo(v)}
                      className={cn(
                        "w-full flex items-center gap-3 p-2.5 rounded-xl text-left transition-all",
                        isActive
                          ? "bg-foreground/8 ring-1 ring-border"
                          : "hover:bg-muted/60"
                      )}
                    >
                      {/* Thumbnail */}
                      <div className="relative rounded-lg overflow-hidden bg-muted shrink-0 w-20 aspect-video">
                        {thumb ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={thumb} alt={v.title} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Play className="h-4 w-4 text-muted-foreground" />
                          </div>
                        )}
                        {isActive && (
                          <div className="absolute inset-0 bg-foreground/30 flex items-center justify-center">
                            <Play className="h-4 w-4 text-white fill-white" />
                          </div>
                        )}
                      </div>
                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <p className={cn("text-xs font-medium leading-snug line-clamp-2", isActive ? "text-foreground" : "text-muted-foreground")}>
                          <span className="text-muted-foreground/60 mr-1">{i + 1}.</span>
                          {v.title}
                        </p>
                        {v.duration && (
                          <p className="text-[10px] text-muted-foreground mt-1 flex items-center gap-1">
                            <Clock className="h-3 w-3" />{v.duration}
                          </p>
                        )}
                      </div>
                    </button>
                  )
                })}
              </div>
            </aside>
          </div>
        )}

        {/* ════ DOCUMENTS ════ */}
        {activeTab === "documents" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

            {/* Document list */}
            <aside className="space-y-2">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-1">
                {documents.length} document{documents.length > 1 ? "s" : ""}
              </p>
              {documents.length === 0 ? (
                <EmptySection icon={<FileText className="h-7 w-7" />} label="Aucun document disponible" small />
              ) : (
                <div className="space-y-1.5">
                  {documents.map((doc) => {
                    const isActive = activeDoc?.id === doc.id
                    return (
                      <button
                        key={doc.id}
                        onClick={() => setActiveDoc(isActive ? null : doc)}
                        className={cn(
                          "w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all border",
                          isActive
                            ? "bg-foreground/5 border-border ring-1 ring-border"
                            : "bg-card border-border/60 hover:border-border hover:shadow-sm"
                        )}
                      >
                        <div className={cn(
                          "p-2 rounded-lg shrink-0",
                          doc.fileType === "pdf"   && "bg-rose-500/10",
                          doc.fileType === "doc"   && "bg-blue-500/10",
                          doc.fileType === "sheet" && "bg-emerald-500/10",
                          doc.fileType === "slide" && "bg-amber-500/10",
                          (!doc.fileType || doc.fileType === "other") && "bg-muted",
                        )}>
                          <DocTypeIcon type={doc.fileType} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold line-clamp-2 leading-snug">{doc.title}</p>
                          {doc.size && <p className="text-[10px] text-muted-foreground mt-0.5">{doc.size}</p>}
                        </div>
                        <div className="flex items-center gap-1 shrink-0">
                          <a
                            href={getDriveDownloadUrl(doc.driveUrl)}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="p-1 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                            title="Télécharger"
                          >
                            <Download className="h-3.5 w-3.5" />
                          </a>
                          <ChevronRight className={cn("h-3.5 w-3.5 text-muted-foreground/50 transition-transform", isActive && "rotate-90")} />
                        </div>
                      </button>
                    )
                  })}
                </div>
              )}
            </aside>

            {/* Drive viewer */}
            <div className="lg:col-span-2">
              {activeDoc ? (
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2 min-w-0">
                      <DocTypeIcon type={activeDoc.fileType} />
                      <p className="text-sm font-semibold truncate">{activeDoc.title}</p>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={() => setDocFullscreen(!docFullscreen)}
                        className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                        title={docFullscreen ? "Réduire" : "Agrandir"}
                      >
                        {docFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                      </button>
                      <a
                        href={activeDoc.driveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                        title="Ouvrir dans Drive"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                  <div
                    className={cn(
                      "rounded-2xl overflow-hidden ring-1 ring-border bg-muted transition-all duration-200",
                      docFullscreen ? "h-[80vh]" : "h-[540px]"
                    )}
                  >
                    <iframe
                      src={getDrivePreviewUrl(activeDoc.driveUrl)}
                      title={activeDoc.title}
                      className="w-full h-full"
                      style={{ border: "none" }}
                      allow="autoplay"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground text-center">
                    Problème d&apos;affichage ?{" "}
                    <a href={activeDoc.driveUrl} target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">
                      Ouvrir dans Google Drive
                    </a>
                  </p>
                </div>
              ) : (
                <div className="h-full min-h-[300px] flex flex-col items-center justify-center rounded-2xl border border-dashed gap-3">
                  <FileText className="h-10 w-10 text-muted-foreground/20" />
                  <p className="text-sm text-muted-foreground">Sélectionnez un document pour le visualiser</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ════ LIENS ════ */}
        {activeTab === "liens" && (
          <div className="max-w-3xl space-y-3">
            {links.length === 0 ? (
              <EmptySection icon={<Link2 className="h-8 w-8" />} label="Aucun lien disponible" />
            ) : (
              <>
                {/* Group by category */}
                {Object.entries(
                  links.reduce<Record<string, LinkItem[]>>((acc, link) => {
                    const cat = link.category ?? "Général"
                    if (!acc[cat]) acc[cat] = []
                    acc[cat].push(link)
                    return acc
                  }, {})
                ).map(([category, items]) => (
                  <div key={category} className="space-y-2">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-1">{category}</p>
                    <div className="space-y-1.5">
                      {items.map((link) => (
                        <a
                          key={link.id}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-center gap-4 p-4 rounded-xl bg-card border border-border/60 hover:border-border hover:shadow-sm transition-all"
                        >
                          {/* Favicon */}
                          <div className="p-2 rounded-lg bg-muted shrink-0">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={`https://www.google.com/s2/favicons?sz=32&domain=${new URL(link.url).hostname}`}
                              alt=""
                              className="h-4 w-4"
                              onError={(e) => {
                                e.currentTarget.style.display = "none"
                                e.currentTarget.nextElementSibling?.classList.remove("hidden")
                              }}
                            />
                            <Link2 className="h-4 w-4 text-muted-foreground hidden" />
                          </div>
                          {/* Text */}
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold group-hover:text-foreground transition-colors">{link.title}</p>
                            {link.description && (
                              <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{link.description}</p>
                            )}
                            <p className="text-[10px] text-muted-foreground/60 mt-1 truncate">{link.url}</p>
                          </div>
                          <ExternalLink className="h-4 w-4 text-muted-foreground/40 group-hover:text-muted-foreground shrink-0 transition-colors" />
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        )}

        {/* ════ INFOS ════ */}
        {activeTab === "infos" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-3xl">

            {/* Volume horaire */}
            {th > 0 && (
              <div className="rounded-2xl border bg-card p-5 space-y-4 sm:col-span-2 lg:col-span-1">
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4 text-blue-500" />
                  <h3 className="text-sm font-semibold">Volume horaire</h3>
                </div>
                <div className="space-y-3">
                  {[
                    { label: "Cours magistraux",   key: "hoursCrs" as keyof CourseDetailDTO, bar: "bg-blue-500",    text: "text-blue-600 dark:text-blue-400" },
                    { label: "Travaux dirigés",     key: "hoursTd"  as keyof CourseDetailDTO, bar: "bg-emerald-500", text: "text-emerald-600 dark:text-emerald-400" },
                    { label: "Travaux pratiques",   key: "hoursTp"  as keyof CourseDetailDTO, bar: "bg-amber-500",   text: "text-amber-600 dark:text-amber-400" },
                    { label: "Apprentissage perso", key: "hoursAp"  as keyof CourseDetailDTO, bar: "bg-violet-500",  text: "text-violet-600 dark:text-violet-400" },
                  ].map(({ label, key, bar, text }) => {
                    const val = (course[key] as number | undefined) ?? 0
                    if (!val) return null
                    return (
                      <div key={String(key)} className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">{label}</span>
                          <span className={cn("font-semibold tabular-nums", text)}>{val}h</span>
                        </div>
                        <div className="h-1 bg-muted rounded-full overflow-hidden">
                          <div className={cn("h-full rounded-full", bar)} style={{ width: `${(val / th) * 100}%` }} />
                        </div>
                      </div>
                    )
                  })}
                </div>
                <Separator />
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total</span>
                  <span className="font-bold tabular-nums">{th}h</span>
                </div>
              </div>
            )}

            {/* Ressources dispo */}
            <div className="rounded-2xl border bg-card p-5 space-y-4">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-amber-500" />
                <h3 className="text-sm font-semibold">Ressources</h3>
              </div>
              {types.length === 0 ? (
                <p className="text-xs text-muted-foreground">Aucune ressource.</p>
              ) : (
                <div className="space-y-2">
                  {types.map((type) => {
                    const cfg = RESOURCE_CONFIG[type]; const Icon = cfg.icon
                    return (
                      <div key={type} className={cn("flex items-center gap-2.5 px-3 py-2 rounded-lg border", cfg.bg, cfg.border)}>
                        <Icon className={cn("h-3.5 w-3.5 shrink-0", cfg.color)} />
                        <span className={cn("text-xs font-medium", cfg.color)}>{cfg.label}</span>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>

            {/* Détails cours */}
            <div className="rounded-2xl border bg-card p-5 space-y-3.5">
              <h3 className="text-sm font-semibold">Détails</h3>
              {[
                { icon: GraduationCap, label: "Niveau",     value: meta.year },
                { icon: Calendar,      label: "Semestre",   value: course.semester ? `Semestre ${course.semester}` : "—" },
                { icon: Clock,         label: "Volume",     value: th > 0 ? `${th}h total` : "—" },
                { icon: BookOpen,      label: "Type",       value: course.type === "COURSE" ? "Cours" : "Ressource" },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1.5 text-muted-foreground">
                    <Icon className="h-3.5 w-3.5" />{label}
                  </span>
                  <span className="font-medium">{value}</span>
                </div>
              ))}
            </div>

            {/* Progression */}
            {course.isEnrolled && (
              <div className="rounded-2xl border border-emerald-200 dark:border-emerald-900 bg-card p-5 space-y-3 sm:col-span-2 lg:col-span-3">
                <div className="flex items-center gap-2">
                  <Trophy className="h-4 w-4 text-amber-500" />
                  <h3 className="text-sm font-semibold">Ma progression</h3>
                  <span className="ml-auto text-sm font-bold text-emerald-600 dark:text-emerald-400 tabular-nums">
                    {course.progress ?? 0}%
                  </span>
                </div>
                <Progress value={course.progress ?? 0} className="h-2" />
                <p className="text-xs text-muted-foreground">
                  {(course.progress ?? 0) === 0   && "Vous n'avez pas encore commencé."}
                  {(course.progress ?? 0) > 0 && (course.progress ?? 0) < 100 && "Continuez, vous progressez bien !"}
                  {(course.progress ?? 0) === 100 && "🎉 Cours complété avec succès !"}
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs text-muted-foreground w-full"
                  onClick={onEnroll}
                >
                  Se désinscrire
                </Button>
              </div>
            )}

           
            
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function DocTypeIcon({ type }: { type?: string }) {
  if (type === "pdf")   return <FileText    className="h-4 w-4 text-rose-500" />
  if (type === "doc")   return <BookOpen    className="h-4 w-4 text-blue-500" />
  if (type === "sheet") return <Sheet       className="h-4 w-4 text-emerald-500" />
  if (type === "slide") return <Presentation className="h-4 w-4 text-amber-500" />
  return <File className="h-4 w-4 text-muted-foreground" />
}

function EmptySection({ icon, label, small = false }: { icon: React.ReactNode; label: string; small?: boolean }) {
  return (
    <div className={cn("flex flex-col items-center justify-center rounded-2xl border border-dashed gap-2 text-center", small ? "py-8" : "py-16")}>
      <span className="text-muted-foreground/25">{icon}</span>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  )
}