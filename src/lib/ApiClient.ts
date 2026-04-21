import type {
  ApiResponse,
  RegisterPayload,
  RegisterResponse,
  UserDTO,
  CourseDTO,
  CreateCoursePayload,
  UpdateCoursePayload,
  PostDTO,
  CreatePostPayload,
  CommentDTO,
  CreateCommentPayload,
  MessageDTO,
  SendMessagePayload,
  ConversationDTO,
  User,
  Level,
} from "./api-type"
import { CourseDetailDTO, DEMO_DOCUMENTS, DEMO_LINKS, DEMO_VIDEOS } from "./course-config"

// ─────────────────────────────────────────────────────────────────
// MOCK DATA
// Fallback quand la DB est vide ou inaccessible.
// Toutes les données passent obligatoirement par ApiClient.
// ─────────────────────────────────────────────────────────────────

const MOCK_USER: User = {
  id: "mock-user-1",
  name: "Étudiant Démo",
  email: "demo@geo.ma",
  image: null,
  role: "USER",
  level: "BEGINNER",
  profilDetail: "Étudiant en géomatique",
  createdAt: new Date("2024-09-01"),
}

const MOCK_COURSES: CourseDTO[] = [
  // ── S1 ──
  { id: "b1s1",  title: "Bases physiques de la télédétection / Traitement du signal", description: "Fondements physiques du signal et de la télédétection.", type: "COURSE", level: "BEGINNER",      link: null, published: true, createdAt: "2024-09-01", semester: 1, hoursCrs: 30, hoursTd: 20, hoursTp: 0,  hoursAp: 4,  resourceTypes: ["VIDEO", "PDF", "QUIZ"],       progress: 0 },
  { id: "b2s1",  title: "Statistiques / Analyse de données",                          description: "Méthodes statistiques appliquées aux données géospatiales.",  type: "COURSE", level: "BEGINNER",      link: null, published: true, createdAt: "2024-09-01", semester: 1, hoursCrs: 26, hoursTd: 13, hoursTp: 13, hoursAp: 0,  resourceTypes: ["PDF", "TEXT", "QUIZ"],        progress: 0 },
  { id: "b3s1",  title: "Compléments de mathématiques et Analyse numérique",           description: "Outils mathématiques pour l'analyse numérique.",               type: "COURSE", level: "BEGINNER",      link: null, published: true, createdAt: "2024-09-01", semester: 1, hoursCrs: 36, hoursTd: 20, hoursTp: 0,  hoursAp: 0,  resourceTypes: ["VIDEO", "PDF"],               progress: 0 },
  { id: "b4s1",  title: "Algorithmique et programmation Python",                       description: "Introduction à la programmation et aux algorithmes en Python.", type: "COURSE", level: "BEGINNER",      link: null, published: true, createdAt: "2024-09-01", semester: 1, hoursCrs: 26, hoursTd: 10, hoursTp: 13, hoursAp: 5,  resourceTypes: ["VIDEO", "LINK", "QUIZ"],      progress: 0 },
  { id: "b5s1",  title: "Administration Réseaux / Systèmes Exploitation",              description: "Bases des réseaux informatiques et systèmes d'exploitation.",  type: "COURSE", level: "BEGINNER",      link: null, published: true, createdAt: "2024-09-01", semester: 1, hoursCrs: 20, hoursTd: 13, hoursTp: 13, hoursAp: 10, resourceTypes: ["PDF", "TEXT"],                progress: 0 },
  { id: "b6s1",  title: "Français TEC 1",                                              description: "Communication technique en français.",                          type: "COURSE", level: "BEGINNER",      link: null, published: true, createdAt: "2024-09-01", semester: 1, hoursCrs: 15, hoursTd: 25, hoursTp: 0,  hoursAp: 0,  resourceTypes: ["TEXT", "QUIZ"],               progress: 0 },
  { id: "b7s1",  title: "Compétence Numérique & Intelligence Artificielle",            description: "Initiation aux outils numériques et à l'IA.",                   type: "COURSE", level: "BEGINNER",      link: null, published: true, createdAt: "2024-09-01", semester: 1, hoursCrs: 20, hoursTd: 4,  hoursTp: 20, hoursAp: 12, resourceTypes: ["VIDEO", "LINK", "QUIZ"],      progress: 0 },
  // ── S2 ──
  { id: "b8s2",  title: "Modélisation et Programmation orientée objet",                description: "Concepts de la POO appliqués aux systèmes géomatiques.",       type: "COURSE", level: "BEGINNER",      link: null, published: true, createdAt: "2024-09-01", semester: 2, hoursCrs: 27, hoursTd: 8,  hoursTp: 15, hoursAp: 4,  resourceTypes: ["VIDEO", "PDF", "QUIZ"],       progress: 0 },
  { id: "b9s2",  title: "Géométrie analytique et algorithmique",                       description: "Géométrie appliquée au traitement algorithmique.",              type: "COURSE", level: "BEGINNER",      link: null, published: true, createdAt: "2024-09-01", semester: 2, hoursCrs: 30, hoursTd: 20, hoursTp: 5,  hoursAp: 0,  resourceTypes: ["PDF", "TEXT"],                progress: 0 },
  { id: "b10s2", title: "Optimisation et analyse de systèmes",                         description: "Méthodes d'optimisation pour les systèmes complexes.",          type: "COURSE", level: "BEGINNER",      link: null, published: true, createdAt: "2024-09-01", semester: 2, hoursCrs: 36, hoursTd: 19, hoursTp: 0,  hoursAp: 0,  resourceTypes: ["VIDEO", "PDF"],               progress: 0 },
  { id: "b11s2", title: "Anglais 1",                                                   description: "Anglais technique niveau 1.",                                   type: "COURSE", level: "BEGINNER",      link: null, published: true, createdAt: "2024-09-01", semester: 2, hoursCrs: 15, hoursTd: 25, hoursTp: 0,  hoursAp: 0,  resourceTypes: ["TEXT", "LINK", "QUIZ"],       progress: 0 },
  { id: "b12s2", title: "Développement web / mobile",                                  description: "Conception d'applications web et mobiles.",                     type: "COURSE", level: "BEGINNER",      link: null, published: true, createdAt: "2024-09-01", semester: 2, hoursCrs: 22, hoursTd: 0,  hoursTp: 17, hoursAp: 15, resourceTypes: ["VIDEO", "LINK"],              progress: 0 },
  { id: "b13s2", title: "Culture & Arts & Sport Skills",                               description: "Développement personnel et culturel.",                          type: "COURSE", level: "BEGINNER",      link: null, published: true, createdAt: "2024-09-01", semester: 2, hoursCrs: 28, hoursTd: 24, hoursTp: 0,  hoursAp: 0,  resourceTypes: ["TEXT"],                       progress: 0 },
  { id: "b14s2", title: "Information géographique",                                    description: "Introduction aux systèmes d'information géographique.",         type: "COURSE", level: "BEGINNER",      link: null, published: true, createdAt: "2024-09-01", semester: 2, hoursCrs: 36, hoursTd: 0,  hoursTp: 12, hoursAp: 6,  resourceTypes: ["VIDEO", "PDF", "QUIZ"],       progress: 0 },
  // ── S3 ──
  { id: "i1s3",  title: "Anglais 2",                                                   description: "Anglais technique niveau 2.",                                   type: "COURSE", level: "INTERMEDIATE", link: null, published: true, createdAt: "2024-09-01", semester: 3, hoursCrs: 15, hoursTd: 0,  hoursTp: 0,  hoursAp: 25, resourceTypes: ["TEXT", "LINK", "QUIZ"],       progress: 0 },
  { id: "i2s3",  title: "Méthodes d'analyse spatiale",                                 description: "Techniques d'analyse pour les données spatiales.",              type: "COURSE", level: "INTERMEDIATE", link: null, published: true, createdAt: "2024-09-01", semester: 3, hoursCrs: 30, hoursTd: 18, hoursTp: 3,  hoursAp: 4,  resourceTypes: ["VIDEO", "PDF", "QUIZ"],       progress: 0 },
  { id: "i3s3",  title: "Systèmes d'information géographique",                         description: "Maîtrise des SIG et outils associés.",                          type: "COURSE", level: "INTERMEDIATE", link: null, published: true, createdAt: "2024-09-01", semester: 3, hoursCrs: 17, hoursTd: 0,  hoursTp: 28, hoursAp: 8,  resourceTypes: ["VIDEO", "LINK"],              progress: 0 },
  { id: "i4s3",  title: "Géodésie / Localisation par satellite (GNSS)",                description: "Principes de la géodésie et des systèmes GNSS.",                type: "COURSE", level: "INTERMEDIATE", link: null, published: true, createdAt: "2024-09-01", semester: 3, hoursCrs: 30, hoursTd: 8,  hoursTp: 5,  hoursAp: 10, resourceTypes: ["PDF", "VIDEO", "QUIZ"],       progress: 0 },
  { id: "i5s3",  title: "Bases de données spatiales",                                  description: "Modélisation et gestion de bases de données spatiales.",        type: "COURSE", level: "INTERMEDIATE", link: null, published: true, createdAt: "2024-09-01", semester: 3, hoursCrs: 28, hoursTd: 0,  hoursTp: 26, hoursAp: 0,  resourceTypes: ["VIDEO", "LINK", "TEXT"],      progress: 0 },
  { id: "i6s3",  title: "Compétences Personnelles & Professionnelles",                 description: "Développement des soft skills professionnels.",                  type: "COURSE", level: "INTERMEDIATE", link: null, published: true, createdAt: "2024-09-01", semester: 3, hoursCrs: 15, hoursTd: 0,  hoursTp: 0,  hoursAp: 25, resourceTypes: ["TEXT", "QUIZ"],               progress: 0 },
  { id: "i7s3",  title: "Topographie",                                                 description: "Techniques de levé topographique.",                             type: "COURSE", level: "INTERMEDIATE", link: null, published: true, createdAt: "2024-09-01", semester: 3, hoursCrs: 30, hoursTd: 8,  hoursTp: 10, hoursAp: 6,  resourceTypes: ["VIDEO", "PDF"],               progress: 0 },
  // ── S4 ──
  { id: "i8s4",  title: "Cartographie numérique / Webmapping",                         description: "Création de cartes numériques et webmapping.",                  type: "COURSE", level: "INTERMEDIATE", link: null, published: true, createdAt: "2024-09-01", semester: 4, hoursCrs: 24, hoursTd: 0,  hoursTp: 22, hoursAp: 6,  resourceTypes: ["VIDEO", "LINK", "QUIZ"],      progress: 0 },
  { id: "i9s4",  title: "Droit Marocain du Travail",                                   description: "Cadre juridique du droit du travail au Maroc.",                 type: "COURSE", level: "INTERMEDIATE", link: null, published: true, createdAt: "2024-09-01", semester: 4, hoursCrs: 28, hoursTd: 10, hoursTp: 0,  hoursAp: 4,  resourceTypes: ["PDF", "TEXT"],                progress: 0 },
  { id: "i10s4", title: "Programmation pour les SIG et la télédétection",              description: "Scripts et automatisation pour SIG et télédétection.",          type: "COURSE", level: "INTERMEDIATE", link: null, published: true, createdAt: "2024-09-01", semester: 4, hoursCrs: 15, hoursTd: 7,  hoursTp: 24, hoursAp: 8,  resourceTypes: ["VIDEO", "LINK"],              progress: 0 },
  { id: "i11s4", title: "Geo IA et Big Data",                                          description: "Intelligence artificielle et Big Data appliqués à la géo.",     type: "COURSE", level: "INTERMEDIATE", link: null, published: true, createdAt: "2024-09-01", semester: 4, hoursCrs: 30, hoursTd: 0,  hoursTp: 12, hoursAp: 12, resourceTypes: ["VIDEO", "PDF", "QUIZ"],       progress: 0 },
  { id: "i12s4", title: "Français TEC 2",                                              description: "Communication technique en français niveau 2.",                  type: "COURSE", level: "INTERMEDIATE", link: null, published: true, createdAt: "2024-09-01", semester: 4, hoursCrs: 15, hoursTd: 25, hoursTp: 0,  hoursAp: 0,  resourceTypes: ["TEXT"],                       progress: 0 },
  { id: "i13s4", title: "Télédétection optique et traitement d'images",                description: "Traitement des images satellites et aériennes.",                type: "COURSE", level: "INTERMEDIATE", link: null, published: true, createdAt: "2024-09-01", semester: 4, hoursCrs: 26, hoursTd: 0,  hoursTp: 20, hoursAp: 6,  resourceTypes: ["VIDEO", "PDF"],               progress: 0 },
  { id: "i14s4", title: "Photogrammétrie numérique",                                   description: "Restitution 3D par photogrammétrie.",                           type: "COURSE", level: "INTERMEDIATE", link: null, published: true, createdAt: "2024-09-01", semester: 4, hoursCrs: 24, hoursTd: 2,  hoursTp: 26, hoursAp: 2,  resourceTypes: ["VIDEO", "LINK", "QUIZ"],      progress: 0 },
  // ── S5 ──
  { id: "a1s5",  title: "Gestion des réseaux urbains",                                 description: "Analyse et gestion des réseaux urbains avec les SIG.",          type: "COURSE", level: "ADVANCED",      link: null, published: true, createdAt: "2024-09-01", semester: 5, hoursCrs: 22, hoursTd: 8,  hoursTp: 12, hoursAp: 12, resourceTypes: ["VIDEO", "PDF"],               progress: 0 },
  { id: "a2s5",  title: "Géoinformation et gestion de l'environnement et du territoire",description: "Géoinformation au service de l'environnement.",                type: "COURSE", level: "ADVANCED",      link: null, published: true, createdAt: "2024-09-01", semester: 5, hoursCrs: 8,  hoursTd: 0,  hoursTp: 32, hoursAp: 12, resourceTypes: ["VIDEO", "LINK", "QUIZ"],      progress: 0 },
  { id: "a3s5",  title: "Télédétection Radar / Lidar",                                 description: "Technologies radar et lidar pour la télédétection.",             type: "COURSE", level: "ADVANCED",      link: null, published: true, createdAt: "2024-09-01", semester: 5, hoursCrs: 28, hoursTd: 0,  hoursTp: 26, hoursAp: 0,  resourceTypes: ["VIDEO", "PDF", "QUIZ"],       progress: 0 },
  { id: "a4s5",  title: "SIG 3D et BIM",                                               description: "Modélisation 3D et Building Information Modeling.",              type: "COURSE", level: "ADVANCED",      link: null, published: true, createdAt: "2024-09-01", semester: 5, hoursCrs: 30, hoursTd: 2,  hoursTp: 16, hoursAp: 8,  resourceTypes: ["VIDEO", "LINK"],              progress: 0 },
  { id: "a5s5",  title: "Anglais 3",                                                   description: "Anglais technique avancé.",                                      type: "COURSE", level: "ADVANCED",      link: null, published: true, createdAt: "2024-09-01", semester: 5, hoursCrs: 15, hoursTd: 25, hoursTp: 0,  hoursAp: 0,  resourceTypes: ["TEXT", "QUIZ"],               progress: 0 },
  { id: "a6s5",  title: "Système GéoDécisionnel et Administration des Données Spatiales", description: "Aide à la décision et administration des données spatiales.", type: "COURSE", level: "ADVANCED",      link: null, published: true, createdAt: "2024-09-01", semester: 5, hoursCrs: 30, hoursTd: 10, hoursTp: 8,  hoursAp: 7,  resourceTypes: ["PDF", "VIDEO", "TEXT"],       progress: 0 },
  { id: "a7s5",  title: "Le Management de Projet « Prédictif & Agile »",               description: "Gestion de projet en méthodes prédictive et agile.",             type: "COURSE", level: "ADVANCED",      link: null, published: true, createdAt: "2024-09-01", semester: 5, hoursCrs: 28, hoursTd: 0,  hoursTp: 12, hoursAp: 6,  resourceTypes: ["PDF", "TEXT", "QUIZ"],        progress: 0 },
  // ── S6 ──
  { id: "a8s6",  title: "PFE — Projet de Fin d'Études",                                description: "Projet de fin d'études en entreprise ou laboratoire.",          type: "COURSE", level: "ADVANCED",      link: null, published: true, createdAt: "2024-09-01", semester: 6, hoursCrs: 0,  hoursTd: 0,  hoursTp: 0,  hoursAp: 364, resourceTypes: ["TEXT", "LINK"],              progress: 0 },
]

// ─────────────────────────────────────────────────────────────────
// FLAG MOCK — mettre à false quand la DB est alimentée.
// ─────────────────────────────────────────────────────────────────
const USE_MOCK = true

// ─────────────────────────────────────────────────────────────────
// API CLIENT
// ─────────────────────────────────────────────────────────────────

export class ApiClient {
  private static baseUrl = ""
  private static token?: string

  // ── Token ──────────────────────────────

  static setToken(token: string) { this.token = token }
  static clearToken()            { this.token = undefined }

  // ── Core fetch ─────────────────────────

  private static async request<T>(
    url: string,
    options?: RequestInit
  ): Promise<ApiResponse<T>> {
    try {
      const res = await fetch(this.baseUrl + url, {
        headers: {
          "Content-Type": "application/json",
          ...(this.token && { Authorization: `Bearer ${this.token}` }),
        },
        ...options,
      })
      const json = await res.json()
      if (!res.ok) return { error: json.error ?? "Une erreur est survenue" }
      return { data: json }
    } catch {
      return { error: "Impossible de contacter le serveur" }
    }
  }

  // ── Auth ───────────────────────────────

  static register(payload: RegisterPayload) {
    return this.request<RegisterResponse>("/api/register", {
      method: "POST",
      body: JSON.stringify(payload),
    })
  }

  static login(payload: { email: string; password: string }) {
    return this.request<{ token: string; user: UserDTO }>("/api/login", {
      method: "POST",
      body: JSON.stringify(payload),
    })
  }

  static logout() { this.clearToken() }

  // ── Users ──────────────────────────────

  /**
   * Retourne l'utilisateur connecté.
   * Fallback mock si USE_MOCK = true.
   */
  static async getMe(): Promise<ApiResponse<User>> {
    if (USE_MOCK) return { data: MOCK_USER }
    return this.request<User>("/api/users/me")
  }

  /** Alias pour compatibilité avec l'existant. */
  static getUser(): Promise<ApiResponse<User>> {
    return this.getMe()
  }

  static getUserById(id: string) {
    return this.request<UserDTO>(`/api/users/${id}`)
  }

  static updateMe(payload: Partial<Pick<UserDTO, "name" | "image">>) {
    return this.request<UserDTO>("/api/users/me", {
      method: "PATCH",
      body: JSON.stringify(payload),
    })
  }

  static deleteUser(id: string) {
    return this.request<void>(`/api/users/${id}`, { method: "DELETE" })
  }

  // ── Courses ────────────────────────────
  //
  // Tous les cours sont accessibles à tous les utilisateurs, quel que soit
  // leur level. Pas d'inscription — seule la progression est trackée.
  //
  // TODO quand DB alimentée :
  //  - Ajouter semester, hoursCrs, hoursTd, hoursTp, hoursAp, resourceTypes,
  //    progress dans le schéma Prisma et dans CourseDTO.
  //  - Retirer USE_MOCK.

  /**
   * Retourne tous les cours (tous semestres, tous levels).
   * Fallback mock si USE_MOCK = true ou si la DB est vide.
   */
  static async getCourses(type?: "COURSE" | "RESOURCE"): Promise<ApiResponse<CourseDTO[]>> {
    if (USE_MOCK) {
      const filtered = type ? MOCK_COURSES.filter((c) => c.type === type) : MOCK_COURSES
      return { data: filtered }
    }

    const params = type ? `?type=${type}` : ""
    const result = await this.request<CourseDTO[]>(`/api/courses${params}`)

    // Fallback si la DB est vide
    if (!result.data?.length) {
      const filtered = type ? MOCK_COURSES.filter((c) => c.type === type) : MOCK_COURSES
      return { data: filtered }
    }
    return result
  }

  /**
   * Retourne un cours par ID avec ses ressources (vidéos, docs, liens).
   * Fallback mock si USE_MOCK = true ou si introuvable en DB.
   */
  static async getCourseById(id: string): Promise<ApiResponse<CourseDetailDTO>> {
  const base = MOCK_COURSES.find((c) => c.id === id)

  if (USE_MOCK) {
    if (!base) return { error: "Cours introuvable" }

    // On injecte les données d'exemple selon les resourceTypes déclarés
    const detail: CourseDetailDTO = {
      ...base,
      videos:    base.resourceTypes?.includes("VIDEO") ? DEMO_VIDEOS    : [],
      documents: base.resourceTypes?.includes("PDF")   ? DEMO_DOCUMENTS : [],
      links:     base.resourceTypes?.includes("LINK")  ? DEMO_LINKS     : [],
    }
    return { data: detail }
  }

  const result = await this.request<CourseDetailDTO>(`/api/courses/${id}`)
  if (result.error) {
    if (!base) return result
    return {
      data: {
        ...base,
        videos:    base.resourceTypes?.includes("VIDEO") ? DEMO_VIDEOS    : [],
        documents: base.resourceTypes?.includes("PDF")   ? DEMO_DOCUMENTS : [],
        links:     base.resourceTypes?.includes("LINK")  ? DEMO_LINKS     : [],
      },
    }
  }
  return result
}

  static createCourse(payload: CreateCoursePayload) {
    return this.request<CourseDTO>("/api/courses", {
      method: "POST",
      body: JSON.stringify(payload),
    })
  }

  static updateCourse(id: string, payload: UpdateCoursePayload) {
    return this.request<CourseDTO>(`/api/courses/${id}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    })
  }

  static deleteCourse(id: string) {
    return this.request<void>(`/api/courses/${id}`, { method: "DELETE" })
  }

  // ── Progression ────────────────────────
  //
  // Remplace le système d'inscription. La progression est trackée
  // ressource par ressource. Pas d'enrollInCourse / unenrollFromCourse.

  /**
   * Met à jour la progression d'une ressource dans un cours.
   */
  static updateProgress(courseId: string, resourceId: string, completed: boolean) {
    if (USE_MOCK) {
      // En mode mock, on simule une mise à jour optimiste côté client.
      // Le vrai appel sera activé avec USE_MOCK = false.
      return Promise.resolve<ApiResponse<void>>({ data: undefined })
    }
    return this.request<void>(`/api/courses/${courseId}/progress`, {
      method: "PATCH",
      body: JSON.stringify({ resourceId, completed }),
    })
  }

  /**
   * Récupère la progression globale de l'utilisateur sur tous les cours.
   * En mock : retourne un objet vide (toutes les progressions à 0).
   */
  static async getAllProgress(): Promise<ApiResponse<Record<string, number>>> {
    if (USE_MOCK) return { data: {} }
    return this.request<Record<string, number>>("/api/users/me/progress")
  }

  // ── Posts ──────────────────────────────

  static getPosts() {
    return this.request<PostDTO[]>("/api/posts")
  }

  static getPostById(id: string) {
    return this.request<PostDTO>(`/api/posts/${id}`)
  }

  static createPost(payload: CreatePostPayload) {
    return this.request<PostDTO>("/api/posts", {
      method: "POST",
      body: JSON.stringify(payload),
    })
  }

  static deletePost(id: string) {
    return this.request<void>(`/api/posts/${id}`, { method: "DELETE" })
  }

  static toggleLikePost(id: string) {
    return this.request<{ liked: boolean }>(`/api/posts/${id}/like`, { method: "POST" })
  }

  // ── Comments ───────────────────────────

  static getComments(postId: string) {
    return this.request<CommentDTO[]>(`/api/posts/${postId}/comments`)
  }

  static createComment(postId: string, payload: CreateCommentPayload) {
    return this.request<CommentDTO>(`/api/posts/${postId}/comments`, {
      method: "POST",
      body: JSON.stringify(payload),
    })
  }

  static deleteComment(postId: string, commentId: string) {
    return this.request<void>(`/api/posts/${postId}/comments/${commentId}`, {
      method: "DELETE",
    })
  }

  // ── Messages ───────────────────────────

  static getConversations() {
    return this.request<ConversationDTO[]>("/api/messages")
  }

  static getConversation(partnerId: string) {
    return this.request<MessageDTO[]>(`/api/messages/${partnerId}`)
  }

  static sendMessage(payload: SendMessagePayload) {
    return this.request<MessageDTO>("/api/messages", {
      method: "POST",
      body: JSON.stringify(payload),
    })
  }

  static markAsRead(partnerId: string) {
    return this.request<void>(`/api/messages/${partnerId}/read`, { method: "PATCH" })
  }
}