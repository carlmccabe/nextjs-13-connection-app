'use client'
import { Avatar, Spinner, Table } from 'flowbite-react'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Connection } from '../../../interfaces'
import { BiBus, BiTrain } from 'react-icons/bi'
import { MdTram } from 'react-icons/md'

interface Data {
  connection: Connection
  stops: Stop[]
}

interface Stop {
  id: string,
  mode: string,
  title: string,
  direction: string,
  departures: string[]
}

export default function Page() {
  const params = useParams()
  const [data, setData] = useState<Data>()

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/api/connection/${params.slug}`)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const result = await response.json()
      setData(result)
    }

    fetchData().catch((e) => {
      console.error('An error occurred while fetching the data: ', e)
    })
  }, [])

  function getIcon(mode: string): import("react").ReactNode {
    switch (mode) {
      case 'bus':
        return (
          <Avatar
            alt="Bus"
            img={BiBus}
            rounded
          />)
      case 'train':
        return (
          <Avatar
            alt="Train"
            img={BiTrain}
            rounded
          />)
      case 'tram':
        return (
          <Avatar
            alt="Tram"
            img={MdTram}
            rounded
          />)
      default:
        return null
    }

  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-20">
      {data != undefined || data != null ? (
        <div>
          <h1>{data.connection.title}</h1>
          <Table>
            <Table.Body className="divide-y">
              {data.stops.map(stop => (
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell>{getIcon(stop.mode)}</Table.Cell>
                  <Table.Cell >
                    <h2 className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{stop.title}</h2>
                    <p>towards {stop.direction}</p>
                  </Table.Cell>
                  <Table.Cell>
                    {stop.departures?.map(time => (
                      <span>{new Date(time).toLocaleTimeString('en-US', { hour: "2-digit", minute: "2-digit" })} | </span>))
                    }
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      )
        :
        <Spinner></Spinner>
      }
    </main>
  )
}