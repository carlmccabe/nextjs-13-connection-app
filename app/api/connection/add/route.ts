import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    //Todo save to source/api here
    
    return NextResponse.json({}, {status: 200})
  }