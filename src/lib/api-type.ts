// api-type.ts

// ─────────────────────────────────────────
// ENUMS
// ─────────────────────────────────────────

export type Role = "USER" | "ADMIN"

export type CourseType = "COURSE" | "RESOURCE"

export type Level = "BEGINNER" | "INTERMEDIATE" | "ADVANCED"

export type ResourceType = "VIDEO" | "PDF" | "TEXT" | "LINK" | "QUIZ"

// ─────────────────────────────────────────
// USER
// ─────────────────────────────────────────

export type User = {
  id: string
  name?: string | null
  email?: string | null
  image?: string | null
  role: Role
  level: Level
  profilDetail: string
  createdAt: Date
}

export type PublicUser = {
  id: string
  name?: string | null
  image?: string | null
}

// ─────────────────────────────────────────
// AUTH
// ─────────────────────────────────────────

export type Account = {
  id: string
  userId: string
  provider: string
}

export type Session = {
  id: string
  userId: string
  expires: Date
}

export type VerificationToken = {
  identifier: string
  token: string
  expires: Date
}

// ─────────────────────────────────────────
// COURSE
// ─────────────────────────────────────────

export type Course = {
  id: string
  title: string
  description?: string | null
  type: CourseType
  level: Level
  link?: string | null
  published: boolean
  createdAt: Date
}

// ─────────────────────────────────────────
// POST
// ─────────────────────────────────────────

export type Post = {
  id: string
  title: string
  content: string
  createdAt: Date
}

export type Comment = {
  id: string
  content: string
  createdAt: Date
  postId: string
  author: PublicUser
}

export type PostLike = {
  postId: string
  userId: string
}

export type PostFull = {
  id: string
  title: string
  content: string
  createdAt: Date
  comments: Comment[]
  likesCount: number
  likedByMe?: boolean
}

// ─────────────────────────────────────────
// MESSAGERIE
// ─────────────────────────────────────────

export type Message = {
  id: string
  content: string
  createdAt: Date
  readAt?: Date | null
  sender: PublicUser
  receiver: PublicUser
}

export type ConversationPreview = {
  user: PublicUser
  lastMessage: Message
  unreadCount: number
}

// ─────────────────────────────────────────
// GENERIC API RESPONSE
// ─────────────────────────────────────────

export interface ApiResponse<T = void> {
  data?: T
  error?: string
  message?: string
}

// ─────────────────────────────────────────
// AUTH PAYLOADS
// ─────────────────────────────────────────

export interface RegisterPayload {
  firstName: string
  lastName: string
  email: string
  password: string
  level?: string
}

export interface RegisterResponse {
  userId: string
  message: string
}

// ─────────────────────────────────────────
// USER DTO
// ─────────────────────────────────────────

export interface UserDTO {
  id: string
  name: string | null
  email: string | null
  image: string | null
  role: Role
  createdAt: string
}

// ─────────────────────────────────────────
// COURSE DTO
//
// Champs actuels en DB : id, title, description, type, level, link, published, createdAt
//
// Champs supplémentaires à ajouter dans Prisma quand prêt :
//   semester    Int?
//   hoursCrs    Int?
//   hoursTd     Int?
//   hoursTp     Int?
//   hoursAp     Int?
//   resourceTypes ResourceType[]  (ou relation vers une table Resource)
//   isEnrolled  Boolean           (calculé côté API selon l'user)
//   progress    Int               (0-100, calculé côté API)
//
// ─────────────────────────────────────────

export interface CourseDTO {
  id: string
  title: string
  description: string | null
  type: CourseType
  level: Level
  link: string | null
  published: boolean
  createdAt: string

  // ── Champs étendus (présents dans le mock, à ajouter en DB) ──
  semester?: number
  hoursCrs?: number
  hoursTd?: number
  hoursTp?: number
  hoursAp?: number
  resourceTypes?: ResourceType[]
  isEnrolled?: boolean
  progress?: number
}

export interface CreateCoursePayload {
  title: string
  description?: string
  type: CourseType
  level: Level
  link?: string
  published?: boolean
  semester?: number
  hoursCrs?: number
  hoursTd?: number
  hoursTp?: number
  hoursAp?: number
}

export interface UpdateCoursePayload extends Partial<CreateCoursePayload> {}

// ─────────────────────────────────────────
// POST DTO
// ─────────────────────────────────────────

export interface PostDTO {
  id: string
  title: string
  content: string
  createdAt: string
  _count?: { comments: number; likes: number }
  likedByCurrentUser?: boolean
}

export interface CreatePostPayload {
  title: string
  content: string
}

// ─────────────────────────────────────────
// COMMENT DTO
// ─────────────────────────────────────────

export interface CommentDTO {
  id: string
  postId: string
  content: string
  createdAt: string
  author: Pick<UserDTO, "id" | "name" | "image">
}

export interface CreateCommentPayload {
  content: string
}

// ─────────────────────────────────────────
// MESSAGE DTO
// ─────────────────────────────────────────

export interface MessageDTO {
  id: string
  content: string
  readAt: string | null
  createdAt: string
  sender: Pick<UserDTO, "id" | "name" | "image">
  receiver: Pick<UserDTO, "id" | "name" | "image">
}

export interface SendMessagePayload {
  receiverId: string
  content: string
}

export interface ConversationDTO {
  partner: Pick<UserDTO, "id" | "name" | "image">
  messages: MessageDTO[]
  unreadCount: number
}