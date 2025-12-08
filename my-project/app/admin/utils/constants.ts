import type { PropertyFormData } from './types'

export const INITIAL_FORM_STATE: PropertyFormData = {
  title: '',
  description: '',
  price: '',
  location: '',
  category: 'pre-selling',
  type: 'sell',
  status: 'Available',
  bedrooms: '',
  bathrooms: '',
  area: '',
  floorLevel: '',
  parking: '',
  yearBuilt: '',
  propertyId: '',
  images: [],
  features: {
    interior: ['Modern kitchen', 'Spacious living room'],
    amenities: ['Swimming pool', '24/7 Security'],
    nearby: ['Schools nearby', 'Shopping malls']
  }
}

export const CATEGORY_OPTIONS = [
  { value: 'pre-selling', label: 'Pre-Selling', types: ['buy'] },
  { value: 'ready-for-occupancy', label: 'Ready for Occupancy', types: ['buy'] },
  { value: 'house-and-lot', label: 'House and Lot', types: ['sell'] },
  { value: 'condominium', label: 'Condominium', types: ['sell'] },
  { value: 'short-term', label: 'Short Term Rental', types: ['rent'] },
  { value: 'long-term', label: 'Long Term Rental', types: ['rent'] }
] as const

export const TYPE_OPTIONS = [
  { value: 'sell', label: 'For Sale' },
  { value: 'rent', label: 'For Rent' },
  { value: 'buy', label: 'For Purchase' }
] as const