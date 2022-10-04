import type { NextPage } from 'next'
import Head from 'next/head'
import { useCallback, useState, useEffect } from 'react'
import { trpc } from '../utils/trpc'

const Home: NextPage = () => {
  const [itemName, setItemName] = useState<string>('')

  const { data: list, refetch, isLoading } = trpc.useQuery(['msg.list'])

  const insertMutation = trpc.useMutation(['msg.add'], {
    onSuccess: () => refetch(),
  })

  const insertOne = useCallback(() => {
    if (itemName === '') return

    insertMutation.mutate({
      title: itemName,
    })

    setItemName('')
  }, [itemName, insertMutation])

  return (
    <>
      <Head>
        <title>Chat Room</title>
        <meta name="description" content="Chat app" />
      </Head>

      <main></main>
    </>
  )
}

export default Home
