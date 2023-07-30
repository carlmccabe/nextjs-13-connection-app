import { NextResponse } from 'next/server'
import { Connection } from '../../../interfaces'

export async function GET(request: Request) {
    //Todo get from external source/api here
    let connections: Connection[] = [
        {
            slug: 'home',
            title: 'Home Commute',
            stops: ['2273', '1071', '31845']
        },
        {
            slug: 'work',
            title: 'Work Commute',
            stops: ['2273', '1071', '31845']
        }
    ]

    return NextResponse.json(connections)
  }