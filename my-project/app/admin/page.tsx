"use client"
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

// ============================================
// TYPES & INTERFACES
// ============================================
interface User {
  id: string
  email: string
  userType: string
}

interface PropertyFeatures {
  interior: string[]
  amenities: string[]
  nearby: string[]
}

interface PropertyFormData {
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

interface Property extends PropertyFormData {
  id: string
}

// ============================================
// CONSTANTS
// ============================================
const INITIAL_FORM_STATE: PropertyFormData = {
  title: '',
  description: '',
  price: '',
  location: '',
  category: 'pre-selling',  // ✅ Fixed: lowercase with hyphens
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

const CATEGORY_OPTIONS = [
  { value: 'pre-selling', label: 'Pre-Selling' },
  { value: 'ready-for-occupancy', label: 'Ready for Occupancy' },
  { value: 'house-and-lot', label: 'House and Lot' },
  { value: 'condominium', label: 'Condominium' },
  { value: 'short-term', label: 'Short Term Rental' },
  { value: 'long-term', label: 'Long Term Rental' }
]

const TYPE_OPTIONS = [
  { value: 'sell', label: 'Sale' },
  { value: 'rent', label: 'Rent' },
  { value: 'buy', label: 'Buy' }
]

// ============================================
// MAIN COMPONENT
// ============================================
export default function AdminPage() {
  const [userData, setUserData] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  const [properties, setProperties] = useState<Property[]>([])
  const [formData, setFormData] = useState<PropertyFormData>(INITIAL_FORM_STATE)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [filterCategory, setFilterCategory] = useState<string>('all')
  const [filterType, setFilterType] = useState<string>('all')
  
  const router = useRouter()

  // ============================================
  // EFFECTS
  // ============================================
  useEffect(() => {
    checkAuth()
    fetchProperties()
  }, [filterCategory, filterType])

  // ============================================
  // AUTHENTICATION
  // ============================================
  const checkAuth = () => {
    try {
      const userDataStr = localStorage.getItem('userData')
      
      if (!userDataStr) {
        router.push('/login')
        return
      }

      const user = JSON.parse(userDataStr)
      
      if (user.userType !== 'admin') {
        router.push('/')
        return
      }

      setUserData(user)
    } catch (error) {
      console.error('Auth check failed:', error)
      router.push('/login')
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('userData')
    localStorage.removeItem('token')
    router.push('/login')
  }

  // ============================================
  // DATA FETCHING
  // ============================================
  const fetchProperties = async () => {
    try {
      let url = '/api/properties'
      const params = new URLSearchParams()
      
      if (filterCategory !== 'all') {
        params.append('category', filterCategory)
      }
      
      if (filterType !== 'all') {
        params.append('type', filterType)
      }
      
      if (params.toString()) {
        url += `?${params.toString()}`
      }
      
      const response = await fetch(url)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      setProperties(data)
    } catch (error) {
      console.error('Failed to fetch properties:', error)
      alert('❌ Failed to load properties. Please refresh the page.')
    }
  }

  // ============================================
  // FORM HANDLERS
  // ============================================
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    try {
      const fileArray = Array.from(files)
      
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
      const invalidFiles = fileArray.filter(file => !validTypes.includes(file.type))
      
      if (invalidFiles.length > 0) {
        alert('❌ Please upload only JPG, PNG, or WebP images')
        return
      }

      const maxSize = 5 * 1024 * 1024
      const oversizedFiles = fileArray.filter(file => file.size > maxSize)
      
      if (oversizedFiles.length > 0) {
        alert('❌ Each image must be less than 5MB')
        return
      }

      const readerPromises = fileArray.map(file => {
        return new Promise<string>((resolve, reject) => {
          const reader = new FileReader()
          reader.onload = () => resolve(reader.result as string)
          reader.onerror = reject
          reader.readAsDataURL(file)
        })
      })

      const images = await Promise.all(readerPromises)
      setFormData(prev => ({ ...prev, images }))
      
    } catch (error) {
      console.error('Error reading images:', error)
      alert('❌ Error processing images. Please try again.')
    }
  }

  const handleSubmit = async () => {
    if (!formData.title.trim()) {
      alert('❌ Please enter a property title')
      return
    }
    
    if (!formData.propertyId.trim()) {
      alert('❌ Please enter a property ID')
      return
    }

    if (!formData.price.trim()) {
      alert('❌ Please enter a price')
      return
    }

    setIsSubmitting(true)

    try {
      const payload = {
        ...formData,
        // Send images as array, not stringified
        images: formData.images.length 
          ? formData.images 
          : ['/property-placeholder.jpg'],
        // Send features as object, not stringified
        features: formData.features,
      }

      console.log('Sending payload:', payload)

      const response = await fetch('/api/properties/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'user-data': JSON.stringify(userData)
        },
        body: JSON.stringify(payload)
      })

      // Check if response has content before parsing
      const contentType = response.headers.get('content-type')
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Server returned non-JSON response')
      }

      const result = await response.json()
      console.log('Server response:', result)

      if (response.ok) {
        alert('✅ Property added successfully!')
        setShowAddForm(false)
        await fetchProperties()
        resetForm()
      } else {
        alert(`❌ Error: ${result.error || 'Failed to add property'}`)
      }
    } catch (error: any) {
      console.error('Error adding property:', error)
      alert(`❌ Error: ${error.message || 'Network error. Please check your connection and try again.'}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetForm = () => {
    setFormData(INITIAL_FORM_STATE)
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement
    if (fileInput) fileInput.value = ''
  }

  const handleDelete = async (id: string, title: string) => {
    const confirmMessage = `Are you sure you want to delete "${title}"? This action cannot be undone.`
    
    if (!confirm(confirmMessage)) return

    try {
      const response = await fetch(`/api/properties/delete?id=${id}`, {
        method: 'DELETE',
        headers: { 'user-data': JSON.stringify(userData) }
      })

      if (response.ok) {
        alert('✅ Property deleted successfully')
        await fetchProperties()
      } else {
        const result = await response.json()
        alert(`❌ Failed to delete: ${result.error || 'Unknown error'}`)
      }
    } catch (error) {
      console.error('Error deleting property:', error)
      alert('❌ Network error. Please try again.')
    }
  }

  const toggleAddForm = () => {
    if (showAddForm) {
      resetForm()
    }
    setShowAddForm(!showAddForm)
  }

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }))
  }

  // ============================================
  // RENDER: LOADING STATE
  // ============================================
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <div className="w-16 h-16 border-4 border-gray-300 border-t-black rounded-full animate-spin mb-4"></div>
        <p className="text-xl text-gray-700">Loading admin panel...</p>
      </div>
    )
  }

  // ============================================
  // RENDER: MAIN UI
  // ============================================
  return (
    <div className="text-black min-h-screen bg-gray-100">
      <main className="container mx-auto px-4 py-8">
        {/* Header with Logout */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        </div>

        {/* Add Property Button */}
        <button
          onClick={toggleAddForm}
          className="mb-6 px-6 py-3 bg-black text-white rounded-lg hover:shadow-[0_0_20px_black] transition font-semibold hover:scale-105"
        >
          {showAddForm ? '✕ Cancel' : '+ Add New Property'}
        </button>

        {/* Add Property Form */}
        {showAddForm && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="cursor-pointer text-2xl font-bold text-gray-900 mb-6">Add New Property</h2>
            
            <div className="space-y-4">
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Basic Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Property Title *"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                  />
                  
                  <input
                    type="text"
                    name="propertyId"
                    value={formData.propertyId}
                    onChange={handleInputChange}
                    placeholder="Property ID *"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="Price (e.g., ₱5,000,000) *"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                  />
                  
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="Location *"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                  >
                    {CATEGORY_OPTIONS.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>

                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                  >
                    {TYPE_OPTIONS.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>

                  <input
                    type="text"
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    placeholder="Status (e.g., Available)"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                  />
                </div>
              </div>

              {/* Property Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Property Details</h3>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <input
                    type="number"
                    name="bedrooms"
                    value={formData.bedrooms}
                    onChange={handleInputChange}
                    placeholder="Bedrooms *"
                    required
                    min="0"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                  />

                  <input
                    type="number"
                    name="bathrooms"
                    value={formData.bathrooms}
                    onChange={handleInputChange}
                    placeholder="Bathrooms *"
                    required
                    min="0"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                  />
                  
                  <input
                    type="text"
                    name="area"
                    value={formData.area}
                    onChange={handleInputChange}
                    placeholder="Area (e.g., 120 sqm) *"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                  />

                  <input
                    type="text"
                    name="floorLevel"
                    value={formData.floorLevel}
                    onChange={handleInputChange}
                    placeholder="Floor Level"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="parking"
                    value={formData.parking}
                    onChange={handleInputChange}
                    placeholder="Parking (e.g., 2 slots)"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                  />

                  <input
                    type="text"
                    name="yearBuilt"
                    value={formData.yearBuilt}
                    onChange={handleInputChange}
                    placeholder="Year Built"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                  />
                </div>
              </div>

              {/* Images */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Images</h3>
                
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Upload Property Images (Multiple allowed)
                  </label>
                  <input
                    type="file"
                    multiple
                    accept="image/jpeg,image/jpg,image/png,image/webp"
                    onChange={handleImageChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-black file:text-white hover:file:bg-gray-800 cursor-pointer"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Accepted formats: JPG, PNG, WebP (Max 5MB per image)
                  </p>
                  
                  {formData.images.length > 0 && (
                    <div className="mt-4">
                      <p className="text-sm font-medium text-gray-700 mb-2">
                        Preview ({formData.images.length} image{formData.images.length !== 1 ? 's' : ''})
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {formData.images.map((img, idx) => (
                          <div key={idx} className="relative group">
                            <img
                              src={img}
                              alt={`Preview ${idx + 1}`}
                              className="w-24 h-24 object-cover rounded-lg border-2 border-gray-200"
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(idx)}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              ✕
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Description */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Description</h3>
                
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Property Description *"
                  required
                  rows={5}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full py-3 bg-black text-white rounded-lg font-semibold hover:shadow-[0_0_20px_black] transition duration-300 hover:scale-102 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isSubmitting ? '⏳ Adding Property...' : '✅ Add Property'}
              </button>
            </div>
          </div>
        )}

        {/* Properties List with Filters */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <h2 className="text-2xl font-bold text-gray-900">
              All Properties ({properties.length})
            </h2>
            
            {/* Filters */}
            <div className="flex flex-wrap gap-3">
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black text-sm"
              >
                <option value="all">All Categories</option>
                {CATEGORY_OPTIONS.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>

              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black text-sm"
              >
                <option value="all">All Types</option>
                {TYPE_OPTIONS.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>

              <button
                onClick={fetchProperties}
                className="cursor-pointer px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition font-medium text-sm"
              >
                🔄 Refresh
              </button>
            </div>
          </div>

          {properties.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-gray-600 text-lg mb-2">No properties found</p>
              <p className="text-sm text-gray-400">
                {filterCategory !== 'all' || filterType !== 'all' 
                  ? 'Try adjusting your filters' 
                  : 'Add your first property to get started'}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b-2 border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Property</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Category</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Type</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Price</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Status</th>
                    <th className="px-4 py-3 text-center font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {properties.map(property => (
                    <tr key={property.id} className="hover:bg-gray-50 transition">
                      <td className="px-4 py-4">
                        <div className="font-medium text-gray-900">{property.title}</div>
                        <div className="text-sm text-gray-500">{property.location}</div>
                        <div className="text-xs text-gray-400 mt-1">ID: {property.propertyId}</div>
                      </td>
                      <td className="px-4 py-4">
                        <span className="inline-block px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full capitalize">
                          {property.category.replace(/-/g, ' ')}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full capitalize ${
                          property.type === 'sell' 
                            ? 'bg-green-100 text-green-800' 
                            : property.type === 'rent'
                            ? 'bg-purple-100 text-purple-800'
                            : 'bg-orange-100 text-orange-800'
                        }`}>
                          {property.type}
                        </span>
                      </td>
                      <td className="px-4 py-4 font-medium text-gray-900">{property.price}</td>
                      <td className="px-4 py-4">
                        <span className="text-sm text-gray-600">{property.status}</span>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <button
                          onClick={() => handleDelete(property.id, property.title)}
                          className="px-3 py-1 text-sm text-white bg-red-600 hover:bg-red-700 rounded-lg transition font-medium"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}