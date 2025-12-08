// User Types
export interface User {
  id: string
  email: string
  name?: string
  userType: string
}

// Property Types
export interface PropertyFeatures {
  interior: string[]
  amenities: string[]
  nearby: string[]
}

export interface PropertyFormData {
  title: string
  description: string
  price: string
  location: string
  category: 'pre-selling' | 'ready-for-occupancy' | 'house-and-lot' | 'condominium' | 'short-term' | 'long-term'
  type: 'sell' | 'rent' | 'buy'
  status: string
  bedrooms: string
  bathrooms: string
  area: string
  floorLevel: string
  parking: string
  yearBuilt: string
  propertyId: string
  images: string[]
  features: PropertyFeatures
}

export interface Property extends PropertyFormData {
  id: string
}