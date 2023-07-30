export interface Connection {
    slug: string,
    title: string,
    stops: string[] // a list of stop IDs
}

export interface Stop {
    id: string
    title: string
    direction: string
    departures: string[]
}