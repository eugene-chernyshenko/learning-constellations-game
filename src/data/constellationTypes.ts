export type Star = {
  x: number
  y: number
  label?: string
}

export type Constellation = {
  id: string
  nameRu: string
  nameLat: string
  fact: string
  stars: Star[]
  edges: [number, number][]
  connectOrder: number[]
}
