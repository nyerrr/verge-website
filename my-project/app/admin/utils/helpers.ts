import type { PropertyFeatures } from './types'
import { CATEGORY_OPTIONS } from './constants'

export const parseImages = (images: any): string[] => {
  try {
    if (Array.isArray(images)) return images
    if (typeof images === 'string') return JSON.parse(images)
    return []
  } catch {
    return []
  }
}

export const parseFeatures = (features: any): PropertyFeatures => {
  const defaultFeatures = {
    interior: ['Modern kitchen', 'Spacious living room'],
    amenities: ['Swimming pool', '24/7 Security'],
    nearby: ['Schools nearby', 'Shopping malls']
  }
  try {
    if (typeof features === 'string') return JSON.parse(features)
    if (features) return features
    return defaultFeatures
  } catch {
    return defaultFeatures
  }
}

export const isCategoryAvailable = (categoryValue: string, currentType: string): boolean => {
  const category = CATEGORY_OPTIONS.find(opt => opt.value === categoryValue)
  return category ? (category.types as readonly string[]).includes(currentType) : false
}