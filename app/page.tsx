'use client'
import { Button } from 'flowbite-react'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Welcome to the app</h1>

      <Button href='/connections'>Let's go!</Button>
    </main>
  )
}
