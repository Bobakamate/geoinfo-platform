"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Search,
  Send,
  ArrowLeft,
  MoreVertical,
} from "lucide-react"
import { cn } from "@/lib/utils"

// Données des contacts (seulement personnes individuelles)
const contacts = [
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
    name: "Prof. Jean Lambert",
    avatar: "/avatars/jean.jpg",
    role: "Geodesy Professor",
    lastMessage: "Your geodesy exam is scheduled for next Monday",
    timestamp: "1 hour ago",
    unread: 0,
    online: true,
  },
  {
    id: "3",
    name: "Sophie Martin",
    avatar: "/avatars/sophie.jpg",
    role: "Remote Sensing",
    lastMessage: "Thanks for sharing those satellite images!",
    timestamp: "3 hours ago",
    unread: 0,
    online: false,
  },
  {
    id: "4",
    name: "Thomas Lefebvre",
    avatar: "/avatars/thomas.jpg",
    role: "Database Specialist",
    lastMessage: "The PostGIS tutorial you requested is ready",
    timestamp: "Yesterday",
    unread: 0,
    online: false,
  },
  {
    id: "5",
    name: "Alex Rousseau",
    avatar: "/avatars/alex.jpg",
    role: "Cartography Student",
    lastMessage: "Can you help me with the map layout?",
    timestamp: "2 days ago",
    unread: 1,
    online: true,
  },
   {
    id: "5",
    name: "Alex Rousseau",
    avatar: "/avatars/alex.jpg",
    role: "Cartography Student",
    lastMessage: "Can you help me with the map layout?",
    timestamp: "2 days ago",
    unread: 1,
    online: true,
  },
   {
    id: "5",
    name: "Alex Rousseau",
    avatar: "/avatars/alex.jpg",
    role: "Cartography Student",
    lastMessage: "Can you help me with the map layout?",
    timestamp: "2 days ago",
    unread: 1,
    online: true,
  },
   {
    id: "5",
    name: "Alex Rousseau",
    avatar: "/avatars/alex.jpg",
    role: "Cartography Student",
    lastMessage: "Can you help me with the map layout?",
    timestamp: "2 days ago",
    unread: 1,
    online: true,
  },
]

// Messages par contact
const messagesByContact: Record<string, Array<{
  id: string
  content: string
  timestamp: string
  isMine: boolean
}>> = {
  "1": [
    {
      id: "1",
      content: "Hi! I reviewed your GIS project submission.",
      timestamp: "10:30 AM",
      isMine: false,
    },
    {
      id: "2",
      content: "Thank you Dr. Dupont! What did you think?",
      timestamp: "10:32 AM",
      isMine: true,
    },
    {
      id: "3",
      content: "Overall it's excellent work! Your spatial analysis methodology is very well explained.",
      timestamp: "10:33 AM",
      isMine: false,
    },
    {
      id: "4",
      content: "However, I noticed a few minor issues with the map projections in chapter 3. Could you double-check those?",
      timestamp: "10:33 AM",
      isMine: false,
    },
    {
      id: "5",
      content: "Absolutely! I'll review that section today and resubmit.",
      timestamp: "10:35 AM",
      isMine: true,
    },
    {
      id: "6",
      content: "Should I use WGS84 or the local coordinate system?",
      timestamp: "10:35 AM",
      isMine: true,
    },
    {
      id: "7",
      content: "For this particular analysis, I'd recommend using the local system (Lambert 93) for better accuracy.",
      timestamp: "10:37 AM",
      isMine: false,
    },
    {
      id: "8",
      content: "Perfect, thank you so much for the guidance!",
      timestamp: "10:40 AM",
      isMine: true,
    },
    {
      id: "9",
      content: "The assignment looks great! Just a few minor adjustments needed.",
      timestamp: "Just now",
      isMine: false,
    },
  ],
  "2": [
    {
      id: "1",
      content: "Your geodesy exam is scheduled for next Monday",
      timestamp: "1 hour ago",
      isMine: false,
    },
  ],
  "3": [
    {
      id: "1",
      content: "Here are the satellite images you needed",
      timestamp: "3 hours ago",
      isMine: true,
    },
    {
      id: "2",
      content: "Thanks for sharing those satellite images!",
      timestamp: "3 hours ago",
      isMine: false,
    },
  ],
  "4": [
    {
      id: "1",
      content: "The PostGIS tutorial you requested is ready",
      timestamp: "Yesterday",
      isMine: false,
    },
  ],
  "5": [
    {
      id: "1",
      content: "Can you help me with the map layout?",
      timestamp: "2 days ago",
      isMine: false,
    },
  ],
}

export default function MessagesPage() {
  const [selectedContact, setSelectedContact] = useState<typeof contacts[0] | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [messageInput, setMessageInput] = useState("")
  const [allMessages, setAllMessages] = useState(messagesByContact)

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleSendMessage = () => {
    if (messageInput.trim() && selectedContact) {
      // Créer le nouveau message
      const newMessage = {
        id: Date.now().toString(),
        content: messageInput,
        timestamp: new Date().toLocaleTimeString('fr-FR', { 
          hour: '2-digit', 
          minute: '2-digit' 
        }),
        isMine: true,
      }

      // Ajouter le message à la conversation actuelle
      setAllMessages(prev => ({
        ...prev,
        [selectedContact.id]: [
          ...(prev[selectedContact.id] || []),
          newMessage
        ]
      }))

      // Vider l'input
      setMessageInput("")

      // TODO: Ici vous ajouterez l'appel API réel
      // Example:
      // await sendMessageToAPI({
      //   contactId: selectedContact.id,
      //   content: messageInput,
      //   timestamp: new Date().toISOString()
      // })
    }
  }

  const handleBackToContacts = () => {
    setSelectedContact(null)
  }

  // Vue Liste des contacts
  if (!selectedContact) {
    return (
      <div className="h-full flex flex-col">
        

        <div className="flex-1 flex flex-col border rounded-lg overflow-hidden">
          {/* Search */}
          <div className="p-4 border-b shrink-0">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search contacts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Contact List */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-2">
              {filteredContacts.map((contact) => (
                <button
                  key={contact.id}
                  onClick={() => setSelectedContact(contact)}
                  className="w-full p-4 rounded-lg flex items-start gap-3 hover:bg-accent transition-colors mb-1"
                >
                  <div className="relative">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={contact.avatar} />
                      <AvatarFallback>
                        {contact.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    {contact.online && (
                      <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-background" />
                    )}
                  </div>
                  <div className="flex-1 text-left overflow-hidden">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-sm truncate">
                        {contact.name}
                      </h3>
                      <span className="text-xs text-muted-foreground">
                        {contact.timestamp}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mb-1">
                      {contact.role}
                    </p>
                    <p className="text-sm text-muted-foreground truncate">
                      {contact.lastMessage}
                    </p>
                  </div>
                  {contact.unread > 0 && (
                    <Badge className="bg-purple-600 hover:bg-purple-700 text-white">
                      {contact.unread}
                    </Badge>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Vue Conversation
  const currentMessages = allMessages[selectedContact.id] || []

  return (
    <div className="h-full flex flex-col">
      {/* Chat Header */}
      <div className="p-4 border-b flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleBackToContacts}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <Avatar className="h-10 w-10">
            <AvatarImage src={selectedContact.avatar} />
            <AvatarFallback>
              {selectedContact.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold">{selectedContact.name}</h3>
            <p className="text-xs text-muted-foreground">
              {selectedContact.online ? "Online" : "Offline"}
            </p>
          </div>
        </div>
        <Button variant="ghost" size="icon">
          <MoreVertical className="h-5 w-5" />
        </Button>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {currentMessages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex gap-3",
                message.isMine && "flex-row-reverse"
              )}
            >
              {!message.isMine && (
                <Avatar className="h-8 w-8 shrink-0">
                  <AvatarImage src={selectedContact.avatar} />
                  <AvatarFallback>
                    {selectedContact.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              )}
              <div
                className={cn(
                  "max-w-[70%] space-y-1 flex flex-col",
                  message.isMine && "items-end"
                )}
              >
                <div
                  className={cn(
                    "rounded-lg p-3 wrap-break-word",
                    message.isMine
                      ? "bg-purple-600 text-white"
                      : "bg-accent"
                  )}
                >
                  <p className="text-sm whitespace-pre-wrap wrap-break-word">{message.content}</p>
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
      <div className="p-4 border-t shrink-0">
        <div className="flex items-end gap-2">
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
          <Button
            onClick={handleSendMessage}
            disabled={!messageInput.trim()}
            className="bg-purple-600 hover:bg-purple-700 text-white shrink-0"
          >
            <Send className="h-4 w-4 mr-2" />
            Send
          </Button>
        </div>
      </div>
    </div>
  )
}