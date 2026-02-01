"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
  Search,
  Send,
  Paperclip,
  MoreVertical,
  Phone,
  Video,
  Smile,
  Image as ImageIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"

// Données de conversations
const conversations = [
  {
    id: "1",
    name: "Dr. Marie Dupont",
    avatar: "/avatars/marie.jpg",
    role: "GIS Expert",
    lastMessage: "The assignment looks great! Just a few minor adjustments needed.",
    timestamp: "2 min ago",
    unread: 2,
    online: true,
  },
  {
    id: "2",
    name: "Study Group - SIG Advanced",
    avatar: "/avatars/group.jpg",
    role: "12 members",
    lastMessage: "Alex: Who wants to meet this weekend for the project?",
    timestamp: "15 min ago",
    unread: 5,
    online: false,
    isGroup: true,
  },
  {
    id: "3",
    name: "Prof. Jean Lambert",
    avatar: "/avatars/jean.jpg",
    role: "Geodesy Professor",
    lastMessage: "Your geodesy exam is scheduled for next Monday",
    timestamp: "1 hour ago",
    unread: 0,
    online: true,
  },
  {
    id: "4",
    name: "Sophie Martin",
    avatar: "/avatars/sophie.jpg",
    role: "Remote Sensing",
    lastMessage: "Thanks for sharing those satellite images!",
    timestamp: "3 hours ago",
    unread: 0,
    online: false,
  },
  {
    id: "5",
    name: "Topography Team",
    avatar: "/avatars/group2.jpg",
    role: "8 members",
    lastMessage: "Maria: Field work tomorrow at 8 AM sharp!",
    timestamp: "Yesterday",
    unread: 1,
    online: false,
    isGroup: true,
  },
  {
    id: "6",
    name: "Thomas Lefebvre",
    avatar: "/avatars/thomas.jpg",
    role: "Database Specialist",
    lastMessage: "The PostGIS tutorial you requested is ready",
    timestamp: "Yesterday",
    unread: 0,
    online: false,
  },
]

const messages = [
  {
    id: "1",
    senderId: "marie",
    senderName: "Dr. Marie Dupont",
    content: "Hi! I reviewed your GIS project submission.",
    timestamp: "10:30 AM",
    isMine: false,
  },
  {
    id: "2",
    senderId: "me",
    content: "Thank you Dr. Dupont! What did you think?",
    timestamp: "10:32 AM",
    isMine: true,
  },
  {
    id: "3",
    senderId: "marie",
    senderName: "Dr. Marie Dupont",
    content:
      "Overall it's excellent work! Your spatial analysis methodology is very well explained.",
    timestamp: "10:33 AM",
    isMine: false,
  },
  {
    id: "4",
    senderId: "marie",
    senderName: "Dr. Marie Dupont",
    content:
      "However, I noticed a few minor issues with the map projections in chapter 3. Could you double-check those?",
    timestamp: "10:33 AM",
    isMine: false,
  },
  {
    id: "5",
    senderId: "me",
    content: "Absolutely! I'll review that section today and resubmit.",
    timestamp: "10:35 AM",
    isMine: true,
  },
  {
    id: "6",
    senderId: "me",
    content: "Should I use WGS84 or the local coordinate system?",
    timestamp: "10:35 AM",
    isMine: true,
  },
  {
    id: "7",
    senderId: "marie",
    senderName: "Dr. Marie Dupont",
    content:
      "For this particular analysis, I'd recommend using the local system (Lambert 93) for better accuracy.",
    timestamp: "10:37 AM",
    isMine: false,
  },
  {
    id: "8",
    senderId: "me",
    content: "Perfect, thank you so much for the guidance!",
    timestamp: "10:40 AM",
    isMine: true,
  },
  {
    id: "9",
    senderId: "marie",
    senderName: "Dr. Marie Dupont",
    content:
      "The assignment looks great! Just a few minor adjustments needed.",
    timestamp: "Just now",
    isMine: false,
  },
]

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState(
    conversations[0]
  )
  const [searchQuery, setSearchQuery] = useState("")
  const [messageInput, setMessageInput] = useState("")

  const filteredConversations = conversations.filter((conv) =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      // Logique d'envoi de message
      console.log("Sending:", messageInput)
      setMessageInput("")
    }
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Messages</h1>
        <p className="text-muted-foreground">
          Communicate with teachers and classmates
        </p>
      </div>

      <Card className="overflow-hidden h-[calc(100vh-220px)]">
        <div className="grid grid-cols-12 h-full">
          {/* Conversations List */}
          <div className="col-span-12 md:col-span-4 border-r flex flex-col">
            {/* Search */}
            <div className="p-4 border-b">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search conversations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Conversation Items */}
            <ScrollArea className="flex-1">
              <div className="p-2">
                {filteredConversations.map((conversation) => (
                  <button
                    key={conversation.id}
                    onClick={() => setSelectedConversation(conversation)}
                    className={cn(
                      "w-full p-3 rounded-lg flex items-start gap-3 hover:bg-accent transition-colors mb-1",
                      selectedConversation.id === conversation.id &&
                        "bg-accent"
                    )}
                  >
                    <div className="relative">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={conversation.avatar} />
                        <AvatarFallback>
                          {conversation.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      {conversation.online && (
                        <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-background" />
                      )}
                    </div>
                    <div className="flex-1 text-left overflow-hidden">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold text-sm truncate">
                          {conversation.name}
                        </h3>
                        <span className="text-xs text-muted-foreground">
                          {conversation.timestamp}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mb-1">
                        {conversation.role}
                      </p>
                      <p className="text-sm text-muted-foreground truncate">
                        {conversation.lastMessage}
                      </p>
                    </div>
                    {conversation.unread > 0 && (
                      <Badge className="bg-purple-600 hover:bg-purple-700">
                        {conversation.unread}
                      </Badge>
                    )}
                  </button>
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* Chat Area */}
          <div className="col-span-12 md:col-span-8 flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={selectedConversation.avatar} />
                  <AvatarFallback>
                    {selectedConversation.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">
                    {selectedConversation.name}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {selectedConversation.online ? "Online" : "Offline"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon">
                  <Phone className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Video className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      "flex gap-3",
                      message.isMine && "flex-row-reverse"
                    )}
                  >
                    {!message.isMine && (
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={selectedConversation.avatar} />
                        <AvatarFallback>
                          {message.senderName
                            ?.split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                    )}
                    <div
                      className={cn(
                        "max-w-[70%] space-y-1",
                        message.isMine && "items-end"
                      )}
                    >
                      {!message.isMine && (
                        <p className="text-xs text-muted-foreground">
                          {message.senderName}
                        </p>
                      )}
                      <div
                        className={cn(
                          "rounded-lg p-3",
                          message.isMine
                            ? "bg-purple-600 text-white"
                            : "bg-accent"
                        )}
                      >
                        <p className="text-sm">{message.content}</p>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {message.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Message Input */}
            <div className="p-4 border-t">
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon">
                  <Paperclip className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <ImageIcon className="h-5 w-5" />
                </Button>
                <Input
                  placeholder="Type a message..."
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault()
                      handleSendMessage()
                    }
                  }}
                  className="flex-1"
                />
                <Button variant="ghost" size="icon">
                  <Smile className="h-5 w-5" />
                </Button>
                <Button
                  onClick={handleSendMessage}
                  className="bg-linear-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Send
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}