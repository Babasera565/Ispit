export interface FlightsModel {
  content: FlightModel[]
  pageable: Pageable
  totalPages: number
  totalElements: number
  last: boolean
  size: number
  number: number
  sort: Sort
  numberOfElements: number
  first: boolean
  empty: boolean
}

interface Pageable {
  sort: Sort
  pageNumber: number
  pageSize: number
  offset: number
  unpaged: boolean
  paged: boolean
}

interface Sort {
  sorted: boolean
  empty: boolean
  unsorted: boolean
}

export interface FlightModel {
    id: number
    type: {
        id: number
        name: string
    }
    flightKey: string
    flightNumber: string
    destination: string
    scheduledAt: string
    estimatedAt: null | string
    connectedType: string
    connectedFlight: string,
    plane: string
    gate: null | string
    terminal: string
    temperature: null | number
}
