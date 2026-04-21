import { BookOpen, Video, FileText, Globe, HelpCircle } from "lucide-react"
import type { CourseDTO, Level, ResourceType } from "@/lib/api-type"

// ─── Level → Année / Semestres ────────────────────────────────────────────────
//
// Chaque level correspond à une année du cursus.
// Les semestres sont purement informatifs — tous les cours sont accessibles
// à tous les utilisateurs quel que soit leur level.
//
//   BEGINNER      → 1ère Année — S1 & S2
//   INTERMEDIATE  → 2ème Année — S3 & S4
//   ADVANCED      → 3ème Année — S5 & S6

export const LEVEL_META: Record<
  Level,
  {
    label:        string
    year:         string
    yearNum:      number
    semesters:    number[]
    badge:        string        // tailwind classes pour le badge
    accentBorder: string        // bordure gauche des cartes avec progression
    accentDot:    string        // point de couleur
  }
> = {
  BEGINNER: {
    label:        "1ère Année",
    year:         "1ère Année",
    yearNum:      1,
    semesters:    [1, 2],
    badge:        "bg-emerald-500/12 text-emerald-700 dark:text-emerald-400",
    accentBorder: "border-l-emerald-500",
    accentDot:    "bg-emerald-500",
  },
  INTERMEDIATE: {
    label:        "2ème Année",
    year:         "2ème Année",
    yearNum:      2,
    semesters:    [3, 4],
    badge:        "bg-blue-500/12 text-blue-700 dark:text-blue-400",
    accentBorder: "border-l-blue-500",
    accentDot:    "bg-blue-500",
  },
  ADVANCED: {
    label:        "3ème Année",
    year:         "3ème Année",
    yearNum:      3,
    semesters:    [5, 6],
    badge:        "bg-violet-500/12 text-violet-700 dark:text-violet-400",
    accentBorder: "border-l-violet-500",
    accentDot:    "bg-violet-500",
  },
}

/** Retourne les métadonnées d'un level. */
export function getLevel(level: Level) {
  return LEVEL_META[level]
}

// ─── Resource config ──────────────────────────────────────────────────────────

export const RESOURCE_CONFIG: Record<
  ResourceType,
  { label: string; icon: React.ElementType; color: string; bg: string; border: string }
> = {
  VIDEO: { label: "Vidéo",   icon: Video,      color: "text-blue-500",    bg: "bg-blue-500/8",    border: "border-blue-500/20"   },
  PDF:   { label: "PDF",     icon: FileText,   color: "text-rose-500",    bg: "bg-rose-500/8",    border: "border-rose-500/20"   },
  TEXT:  { label: "Lecture", icon: BookOpen,   color: "text-violet-500",  bg: "bg-violet-500/8",  border: "border-violet-500/20" },
  LINK:  { label: "Lien",    icon: Globe,      color: "text-emerald-500", bg: "bg-emerald-500/8", border: "border-emerald-500/20"},
  QUIZ:  { label: "Quiz",    icon: HelpCircle, color: "text-amber-500",   bg: "bg-amber-500/8",   border: "border-amber-500/20"  },
}

// ─── Extended content types (retournés par getCourseById) ─────────────────────

export type VideoItem = {
  id:           string
  title:        string
  youtubeUrl:   string
  duration?:    string       // ex: "12:34"
  description?: string
}

export type DocumentItem = {
  id:        string
  title:     string
  driveUrl:  string          // google drive share URL
  fileType?: "pdf" | "doc" | "sheet" | "slide" | "other"
  size?:     string          // ex: "2.4 Mo"
}

export type LinkItem = {
  id:           string
  title:        string
  url:          string
  description?: string
  category?:    string       // ex: "Outil", "Documentation", "Tutoriel"
}

/**
 * DTO complet retourné par ApiClient.getCourseById().
 * Étend CourseDTO avec les contenus détaillés.
 * Pas de champ `isEnrolled` — la progression est le seul indicateur d'avancement.
 */
export type CourseDetailDTO = CourseDTO & {
  videos?:    VideoItem[]
  documents?: DocumentItem[]
  links?:     LinkItem[]
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Calcule le total d'heures d'un cours. */
export function totalHours(c: CourseDTO): number {
  return (c.hoursCrs ?? 0) + (c.hoursTd ?? 0) + (c.hoursTp ?? 0) + (c.hoursAp ?? 0)
}

export function getYouTubeId(url: string): string | null {
  const patterns = [
    /youtube\.com\/watch\?v=([^&\s]+)/,
    /youtu\.be\/([^?&\s]+)/,
    /youtube\.com\/embed\/([^?&\s]+)/,
  ]
  for (const p of patterns) {
    const m = url.match(p)
    if (m?.[1]) return m[1]
  }
  return null
}

export function getYouTubeThumbnail(url: string): string | null {
  const id = getYouTubeId(url)
  return id ? `https://img.youtube.com/vi/${id}/mqdefault.jpg` : null
}

export function getDrivePreviewUrl(url: string): string {
  const fileMatch = url.match(/\/file\/d\/([^/?]+)/)
  if (fileMatch) return `https://drive.google.com/file/d/${fileMatch[1]}/preview`
  const idMatch = url.match(/[?&]id=([^&]+)/)
  if (idMatch) return `https://drive.google.com/file/d/${idMatch[1]}/preview`
  return url
}

export function getDriveDownloadUrl(url: string): string {
  const fileMatch = url.match(/\/file\/d\/([^/?]+)/)
  if (fileMatch) return `https://drive.google.com/uc?export=download&id=${fileMatch[1]}`
  return url
}

// ─── Données d'exemple pour CourseDetail ─────────────────────────────────────
//
// Toutes ces données sont injectées via ApiClient.getCourseById() (mock).
// Elles disparaîtront dès que USE_MOCK = false et que la DB sera alimentée.

export const DEMO_VIDEOS: VideoItem[] = [
  { id: "v1", title: "Introduction à la Géomatique",          youtubeUrl: "https://youtu.be/dQw4w9WgXcQ", duration: "18:42" },
  { id: "v2", title: "Systèmes de coordonnées géographiques", youtubeUrl: "https://youtu.be/dQw4w9WgXcQ", duration: "24:15" },
  { id: "v3", title: "Cartographie numérique — Partie 1",     youtubeUrl: "https://youtu.be/dQw4w9WgXcQ", duration: "31:07" },
  { id: "v4", title: "Cartographie numérique — Partie 2",     youtubeUrl: "https://youtu.be/dQw4w9WgXcQ", duration: "28:53" },
  { id: "v5", title: "TP : Prise en main de QGIS",            youtubeUrl: "https://youtu.be/dQw4w9WgXcQ", duration: "45:20" },
]

export const DEMO_DOCUMENTS: DocumentItem[] = [
  { id: "d1", title: "Cours complet — Chapitre 1", driveUrl: "https://drive.google.com/file/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs/view", fileType: "pdf", size: "3.2 Mo" },
  { id: "d2", title: "TD 1 — Énoncé",              driveUrl: "https://drive.google.com/file/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs/view", fileType: "pdf", size: "0.8 Mo" },
  { id: "d3", title: "TD 1 — Correction",          driveUrl: "https://drive.google.com/file/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs/view", fileType: "pdf", size: "1.1 Mo" },
  { id: "d4", title: "Fiche résumé notions clés",  driveUrl: "https://drive.google.com/file/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs/view", fileType: "doc", size: "0.5 Mo" },
]

export const DEMO_LINKS: LinkItem[] = [
  { id: "l1", title: "QGIS — Documentation officielle", url: "https://docs.qgis.org",           description: "Référence complète du logiciel QGIS",          category: "Documentation" },
  { id: "l2", title: "GeoServer",                       url: "https://geoserver.org",            description: "Serveur de données géographiques open-source",  category: "Outil"         },
  { id: "l3", title: "OpenStreetMap",                   url: "https://openstreetmap.org",        description: "Carte du monde libre et collaborative",         category: "Données"       },
  { id: "l4", title: "IGN — Géoportail",                url: "https://www.geoportail.gouv.fr",  description: "Données géographiques officielles françaises",   category: "Données"       },
]