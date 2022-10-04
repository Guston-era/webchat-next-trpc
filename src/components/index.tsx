import { NextPage } from 'next'
import React, { memo } from 'react'
interface CardProps {
  children: React.ReactNode
}
interface CardHeaderProps {
  title: string
  listLength: number
}
interface ChatMessage {
  _id: object
  title?: string
  createdAt: string
}
interface CardFormProps {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  submit: () => void
}

interface ListItemProps {
  item: ChatMessage
}
