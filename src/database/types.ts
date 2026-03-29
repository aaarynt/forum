// src/database/types.ts
export type TComment = {
  id: number //Timestamp
  name: string
  located: string
  heading: string
  content: string
  likes: number
  comments: number
  liked: boolean
}

export type TNotification = {
  id: number
  type: 'like' | 'reply' | 'follow' | 'system'
  title: string
  content: string
  createdAt: string
  read: boolean
  from?: {
    name: string
    avatarId: number
  }
}

export type TFriendMessage = {
  id: number
  from: 'me' | 'friend'
  text: string
  time: string
}

export type TFriendChat = {
  id: number
  name: string
  status: string
  avatarId: number
  messages: TFriendMessage[]
}

export type TCommentComment = {
  name: string
  time: string
  text: string
}

export type TmeProfile = {
  name: string
  handle: string
  avatarId: number
  located: string
  bio: string
  joinedAt: string
}
