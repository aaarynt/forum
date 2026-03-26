export type TComment = {
  id: number //Timestamp
  name: string
  located:string
  heading: string
  content?: string
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
