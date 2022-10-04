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
function formatJSONDate(date: string): string {
  //helper functions
  const prependZero = (val: number): string => {
    if (String(val).length === 1) {
      return '0' + val
    }
    return String(val)
  }

  const today = new Date()

  const thatTime = new Date(date)

  const hourDifference = today.getHours() - thatTime.getHours()
  const minutesDifference = today.getMinutes() - thatTime.getMinutes()

  //check for hours difference
  if (hourDifference === 0) {
    //check for time in mins
    return minutesDifference + ' mins ago'
  } else if (hourDifference >= 1 && hourDifference <= 12) {
    //hours and minutes passed
    return hourDifference + ' hr ' + Math.abs(minutesDifference) + ' mins ago'
  } else {
    return (
      thatTime.toISOString().slice(0, 10) +
      ' ' +
      prependZero(thatTime.getHours()) +
      ':' +
      prependZero(thatTime.getMinutes()) +
      ':' +
      prependZero(thatTime.getSeconds())
    )
  }
}

export const Card: NextPage<CardProps> = ({ children }) => {
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-slate-100">
      {children}
    </div>
  )
}

export const CardContent: NextPage<CardProps> = ({ children }) => {
  return (
    <div className="bg-white w-5/6 md:w-4/6 lg:w-3/6 xl:w-2/6 rounded-lg drop-shadow-md min-height">
      {children}
    </div>
  )
}

export const CardHeader: NextPage<CardHeaderProps> = ({
  title,
  listLength,
}) => {
  return (
    <div className="flex flex-row items-center justify-between p-3 border-b border-slate-200">
      <div className="flex flex-row items-center justify-between">
        <h1 className="text-base font-medium tracking-wide text-gray-900 mr-2">
          {title}
        </h1>
        <span className="h-5 w-5 bg-blue-200 text-blue-600 flex items-center justify-center rounded-full text-xs">
          {listLength}
        </span>
      </div>
    </div>
  )
}

// Components for the list
export const List: NextPage<CardProps> = ({ children }) => {
  return <div className="overflow-y-auto h-80 ">{children}</div>
}

const ListItemComponent: NextPage<ListItemProps> = ({ item }) => {
  return (
    <div className="box sb2">
      <h2 className="text-gray-600 tracking-wide text-sm">{item.title}</h2>
      <small>
        <sub className="mt-3">{formatJSONDate(item.createdAt)}</sub>
      </small>
    </div>
  )
}

export const ListItem = memo(ListItemComponent)

// Form to add new elements to the list

export const CardForm: NextPage<CardFormProps> = ({
  value,
  onChange,
  submit,
}) => {
  return (
    <div className="bg-white w-5/6 md:w-4/6 lg:w-3/6 xl:w-2/6 rounded-lg drop-shadow-md mt-4">
      <div className="relative">
        <input
          className="w-full py-4 pl-3 pr-16 text-sm rounded-lg typein"
          type="text"
          placeholder="Enter Message..."
          onChange={onChange}
          value={value}
        />
        <button
          className="absolute p-2 text-white -translate-y-1/2 bg-blue-600 rounded-full top-1/2 right-4"
          type="button"
          onClick={submit}
        >
          Send
        </button>
      </div>
    </div>
  )
}
