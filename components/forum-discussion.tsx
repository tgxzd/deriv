import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { X, Send, ThumbsUp, MessageSquare } from "lucide-react"

interface ForumDiscussionProps {
  isOpen: boolean
  onClose: () => void
  traderName: string
}

interface Comment {
  id: string
  user: string
  avatar: string
  content: string
  likes: number
  time: string
  isLiked?: boolean
}

export function ForumDiscussion({ isOpen, onClose, traderName }: ForumDiscussionProps) {
  const [newComment, setNewComment] = useState("")
  const [comments, setComments] = useState<Comment[]>([
    {
      id: "1",
      user: "Alex",
      avatar: "/avatars/1.png",
      content: "Great trading strategy! What's your take on the recent market volatility?",
      likes: 12,
      time: "2h ago"
    },
    {
      id: "2",
      user: "Sarah",
      avatar: "/avatars/2.png",
      content: "I've been following your trades. The risk management is impressive.",
      likes: 8,
      time: "1h ago"
    }
  ])

  if (!isOpen) return null

  const handleLike = (commentId: string) => {
    setComments(comments.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
          isLiked: !comment.isLiked
        }
      }
      return comment
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim()) return

    const newCommentObj: Comment = {
      id: Date.now().toString(),
      user: "You",
      avatar: "/avatars/you.png",
      content: newComment,
      likes: 0,
      time: "Just now"
    }

    setComments([...comments, newCommentObj])
    setNewComment("")
  }

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-card rounded-lg shadow-lg w-full max-w-md mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">Discussion - {traderName}</h3>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Comments Section */}
        <div className="max-h-[400px] overflow-y-auto p-4 space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className="flex gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={comment.avatar} />
                <AvatarFallback>{comment.user[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm">{comment.user}</span>
                    <span className="text-xs text-muted-foreground">{comment.time}</span>
                  </div>
                </div>
                <p className="text-sm text-foreground/90">{comment.content}</p>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 px-2 text-muted-foreground hover:text-primary"
                    onClick={() => handleLike(comment.id)}
                  >
                    <ThumbsUp className={`h-4 w-4 mr-1 ${comment.isLiked ? 'fill-primary text-primary' : ''}`} />
                    {comment.likes}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Comment Input */}
        <form onSubmit={handleSubmit} className="p-4 border-t">
          <div className="flex gap-2">
            <Input
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a comment..."
              className="flex-1"
            />
            <Button type="submit" size="icon">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
} 