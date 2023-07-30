import { NextResponse } from 'next/server'
import { Connection } from '../../../../interfaces'

export async function POST(request: Request) {
    //save to source/api here
    
    return NextResponse.json({}, {status: 200})
  }