import { NextResponse } from 'next/server'
import { Connection } from '../../../../interfaces'
import DataSet from '@/data'

export async function GET(request: Request) {
    // get saved data from source/api here
    let connection: Connection = {
        slug: 'home',
        title: 'Home Commute',
        stops: ['2273', '1071', '31845']
    }

    let data = {
        connection: connection,
        stops: [
            {
                id: "2273",
                mode: "tram",
                title: "Clarendon St/Park St #24",
                direction: "East Coburg",
                departures: [
                    "2019-03-21T02:00:00Z",
                    "2019-03-21T02:12:00Z",
                    "2019-03-21T02:24:00Z"
                ]
            },
            {
                id: "1071",
                mode: "train",
                title: "Flinders Street Station",
                direction: "Werribee",
                departures: [
                    "2019-03-21T02:17:00Z",
                    "2019-03-21T02:21:00Z"
                ]
            },
            {
                id: "31845",
                mode: "bus",
                title: "Footscray Station / Irving St",
                direction: "Sunshine",
                departures: [
                    "2019-03-21T02:16:00Z",
                    "2019-03-21T02:36:00Z",
                    "2019-03-21T02:56:00Z"
                ]
            }
        ]
    }

    return NextResponse.json(data, { status: 200 })
}
