'use client'
import { Button, Spinner, Table } from 'flowbite-react'
import { Connection } from '../../interfaces'
import { useEffect, useState } from 'react'

export default function Home() {
    const [connections, setConnections] = useState<Connection[]>([])

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('/api/connections')
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }
            const result = await response.json()
            setConnections(result)
        }

        fetchData().catch((e) => {
            console.error('An error occurred while fetching the data: ', e)
        })
    }, [])

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <h1>Welcome to the app</h1>
            {connections != null ? (
                <Table>
                    <Table.Head>
                        <Table.HeadCell>
                            Connection
                        </Table.HeadCell>
                        <Table.HeadCell>
                            Action
                        </Table.HeadCell>
                    </Table.Head>
                    <Table.Body>
                        {connections.map(connection => (
                            <Table.Row>
                                <Table.Cell>{connection.title}</Table.Cell>
                                <Table.Cell>
                                    <a
                                        className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                                        href={`/connection/${connection.slug}`}
                                    >
                                        <p>View/Edit</p>
                                    </a>
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            )
            :
            <Spinner></Spinner>
            }
            <div>
                <Button href="connection/add">Add New</Button>
            </div>
        </main>
    )
}