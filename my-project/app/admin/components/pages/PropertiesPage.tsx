"use client"

import { useState, useEffect, useCallback } from 'react'
import type { User, Property, PropertyFormData } from '@/app/admin/utils/types'
import { INITIAL_FORM_STATE, CATEGORY_OPTIONS, TYPE_OPTIONS } from '@/app/admin/utils/constants'
import { parseImages, parseFeatures, isCategoryAvailable } from '@/app/admin/utils/helpers'

interface PropertiesPageProps {
  userData: User
  onNavigate?: (page: string) => void
}

// Button style constants
const BUTTON_STYLES = {
  primary: "cursor-pointer px-6 py-3 bg-black text-white rounded-lg font-semibold hover:shadow-[0_0_20px_black] transition duration-200 shadow-md hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none",
  secondary: "cursor-pointer px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition duration-200 hover:scale-105",
  small: "cursor-pointer px-3 py-1.5 text-sm text-white rounded-lg transition font-medium shadow-sm hover:shadow-md",
  danger: "cursor-pointer px-3 py-1.5 text-sm text-white bg-red-600 hover:bg-red-700 rounded-lg transition font-medium shadow-sm hover:shadow-md",
  edit: "cursor-pointer px-3 py-1.5 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition font-medium shadow-sm hover:shadow-md"
}

export default function PropertiesPage({ userData }: PropertiesPageProps) {
  // UI State
  const [showAddForm, setShowAddForm] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [editingPropertyId, setEditingPropertyId] = useState<string | null>(null)

  // Data State
  const [properties, setProperties] = useState<Property[]>([])
  const [formData, setFormData] = useState<PropertyFormData>(INITIAL_FORM_STATE)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Filter State
  const [filterCategory, setFilterCategory] = useState<string>('all')
  const [filterType, setFilterType] = useState<string>('all')

  // ============================================
  // VALIDATION
  // ============================================
  const validateForm = useCallback(() => {
    const validations = [
      { condition: !formData.title.trim(), message: 'Please enter a property title' },
      { condition: !formData.propertyId.trim(), message: 'Please enter a property ID' },
      { condition: !formData.price.trim(), message: 'Please enter a price' },
    ]
    
    for (const { condition, message } of validations) {
      if (condition) {
        alert(`❌ ${message}`)
        return false
      }
    }
    return true
  }, [formData.title, formData.propertyId, formData.price])

  // ============================================
  // DATA FETCHING
  // ============================================
  const fetchProperties = useCallback(async () => {
    if (!userData) return

    try {
      const params = new URLSearchParams()
      if (filterCategory !== 'all') params.append('category', filterCategory)
      if (filterType !== 'all') params.append('type', filterType)
      
      const url = `/api/properties${params.toString() ? `?${params}` : ''}`
      const response = await fetch(url)
      
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
      
      const data = await response.json()
      setProperties(data.properties || [])
    } catch (error) {
      console.error('Failed to fetch properties:', error)
      alert('❌ Failed to load properties. Please refresh the page.')
      setProperties([])
    }
  }, [userData, filterCategory, filterType])

  useEffect(() => {
    fetchProperties()
  }, [fetchProperties])

  // ============================================
  // FORM HANDLERS
  // ============================================
  const handleInputChange = useCallback((
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    
    setFormData(prev => {
      if (name === 'type') {
        const newType = value as PropertyFormData['type']
        let newCategory = prev.category
        
        if (newType === 'sell' && !['house-and-lot', 'condominium'].includes(prev.category)) {
          newCategory = 'house-and-lot'
        } else if (newType === 'rent' && !['short-term', 'long-term'].includes(prev.category)) {
          newCategory = 'short-term'
        } else if (newType === 'buy' && !['pre-selling', 'ready-for-occupancy'].includes(prev.category)) {
          newCategory = 'pre-selling'
        }
        
        return { ...prev, type: newType, category: newCategory }
      }
      
      return { ...prev, [name]: value }
    })
  }, [])

  const handleImageChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
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
  }, [])

  const removeImage = useCallback((index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }))
  }, [])

  const resetForm = useCallback(() => {
    setFormData(INITIAL_FORM_STATE)
    setIsEditMode(false)
    setEditingPropertyId(null)
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement
    if (fileInput) fileInput.value = ''
  }, [])  

  const handleFormToggle = useCallback((forceClose = false) => {
    if (showAddForm || forceClose) {
      resetForm()
    }
    setShowAddForm(prev => forceClose ? false : !prev)
  }, [showAddForm, resetForm])

  const handleSubmit = useCallback(async () => {
    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      const imagesToSend = formData.images.length ? formData.images : ['/property-placeholder.jpg']
      
      const payload = {
        ...(isEditMode && editingPropertyId ? { id: editingPropertyId } : {}),
        ...formData,
        images: imagesToSend,              // remove JSON.stringify
        features: formData.features,       // remove JSON.stringify
      }

      const endpoint = isEditMode ? '/api/properties/update' : '/api/properties/create'
      const method = isEditMode ? 'PUT' : 'POST'

      const response = await fetch(endpoint, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'user-data': JSON.stringify(userData)
        },
        body: JSON.stringify(payload)
      })

      const contentType = response.headers.get('content-type')
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Server returned non-JSON response')
      }

      const result = await response.json()

      if (response.ok) {
        alert(`✅ Property ${isEditMode ? 'updated' : 'added'} successfully!`)
        handleFormToggle(true)
        await fetchProperties()
      } else {
        alert(`❌ Error: ${result.error || `Failed to ${isEditMode ? 'update' : 'add'} property`}`)
      }
    } catch (error: any) {
      console.error(`Error ${isEditMode ? 'updating' : 'adding'} property:`, error)
      alert(`❌ Error: ${error.message || 'Network error. Please try again.'}`)
    } finally {
      setIsSubmitting(false)
    }
  }, [formData, userData, fetchProperties, isEditMode, editingPropertyId, validateForm, handleFormToggle])

  const handleEdit = useCallback((property: Property) => {
    setFormData({
      title: property.title,
      description: property.description,
      price: property.price,
      location: property.location,
      category: property.category,
      type: property.type,
      status: property.status,
      bedrooms: property.bedrooms,
      bathrooms: property.bathrooms,
      area: property.area,
      floorLevel: property.floorLevel || '',
      parking: property.parking || '',
      yearBuilt: property.yearBuilt || '',
      propertyId: property.propertyId,
      images: parseImages(property.images),
      features: parseFeatures(property.features)
    })

    setEditingPropertyId(property.id)
    setIsEditMode(true)
    setShowAddForm(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const handleDelete = useCallback(async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"? This action cannot be undone.`)) {
      return
    }

    try {
      const response = await fetch(`/api/properties/delete?id=${id}`, {
        method: 'DELETE',
        headers: { 'user-data': JSON.stringify(userData) }
      })

      const result = await response.json()

      if (response.ok) {
        alert('✅ Property deleted successfully')
        await fetchProperties()
      } else {
        alert(`❌ Failed to delete: ${result.error || 'Unknown error'}`)
      }
    } catch (error) {
      console.error('Error deleting property:', error)
      alert('❌ Network error. Please try again.')
    }
  }, [userData, fetchProperties])

  // ============================================
  // RENDER
  // ============================================
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Property Management</h1>
        <p className="text-gray-600">Add, edit, and manage your real estate listings</p>
      </div>

      {/* Add Property Button */}
      <button
        onClick={() => handleFormToggle()}
        className={`${BUTTON_STYLES.primary} flex items-center space-x-2`}
      >
        {showAddForm ? (
          <>
            <span>✕</span>
            <span>Cancel</span>
          </>
        ) : (
          <>
            <span>+</span>
            <span>Add New Property</span>
          </>
        )}
      </button>

      {/* Add/Edit Property Form */}
      {showAddForm && (
        <div className="bg-white p-6 rounded-xl shadow-lg mb-8 border border-gray-200 text-black">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
              <span>{isEditMode ? '✏️' : '➕'}</span>
              <span>{isEditMode ? 'Edit Property' : 'Add New Property'}</span>
            </h2>
            {isEditMode && (
              <button
                onClick={() => handleFormToggle(true)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition font-medium text-sm"
              >
                Cancel Edit
              </button>
            )}
          </div>
          
          <div className="space-y-6 text-black">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2 flex items-center space-x-2">
                <span>📋</span>
                <span>Basic Information</span>
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Property Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="e.g., Luxury 3BR Condo in Makati"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Property ID <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="propertyId"
                    value={formData.propertyId}
                    onChange={handleInputChange}
                    placeholder="e.g., PROP-2024-001"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="e.g., ₱5,000,000"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="e.g., Makati City, Metro Manila"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition cursor-pointer"
                  >
                    {TYPE_OPTIONS.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition cursor-pointer"
                  >
                    {CATEGORY_OPTIONS.map(option => (
                      <option 
                        key={option.value} 
                        value={option.value}
                        disabled={!isCategoryAvailable(option.value, formData.type)}
                      >
                        {option.label}
                        {!isCategoryAvailable(option.value, formData.type) && ' (Not available)'}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <input
                    type="text"
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    placeholder="e.g., Available"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  />
                </div>
              </div>
            </div>

            {/* Property Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2 flex items-center space-x-2">
                <span>🏠</span>
                <span>Property Details</span>
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Bedrooms <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="bedrooms"
                    value={formData.bedrooms}
                    onChange={handleInputChange}
                    placeholder="0"
                    required
                    min="0"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Bathrooms <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="bathrooms"
                    value={formData.bathrooms}
                    onChange={handleInputChange}
                    placeholder="0"
                    required
                    min="0"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Area <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="area"
                    value={formData.area}
                    onChange={handleInputChange}
                    placeholder="120 sqm"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Floor Level
                  </label>
                  <input
                    type="text"
                    name="floorLevel"
                    value={formData.floorLevel}
                    onChange={handleInputChange}
                    placeholder="e.g., 5th Floor"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Parking
                  </label>
                  <input
                    type="text"
                    name="parking"
                    value={formData.parking}
                    onChange={handleInputChange}
                    placeholder="e.g., 2 slots"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Year Built
                  </label>
                  <input
                    type="text"
                    name="yearBuilt"
                    value={formData.yearBuilt}
                    onChange={handleInputChange}
                    placeholder="e.g., 2020"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  />
                </div>
              </div>
            </div>

            {/* Images */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2 flex items-center space-x-2">
                <span>📸</span>
                <span>Images</span>
              </h3>
              
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Upload Property Images (Multiple allowed)
                </label>
                <input
                  type="file"
                  multiple
                  accept="image/jpeg,image/jpg,image/png,image/webp"
                  onChange={handleImageChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-black file:text-white file:duration-300 hover:file:shadow-[0_0_20px_black] hover:file:scale-105 file:cursor-pointer transition"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Accepted formats: JPG, PNG, WebP (Max 5MB per image)
                </p>
                
                {formData.images.length > 0 && (
                  <div className="mt-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">
                      Preview ({formData.images.length} image{formData.images.length !== 1 ? 's' : ''})
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                      {formData.images.map((img, idx) => (
                        <div key={idx} className="relative group">
                          <img
                            src={img}
                            alt={`Preview ${idx + 1}`}
                            className="w-full h-24 object-cover rounded-lg border-2 border-gray-200 shadow-sm"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(idx)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md hover:bg-red-600"
                            title="Remove image"
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
              <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2 flex items-center space-x-2">
                <span>📝</span>
                <span>Description</span>
              </h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Property Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Describe the property in detail..."
                  required
                  rows={5}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
              <button
                onClick={() => handleFormToggle(true)}
                type="button"
                className={BUTTON_STYLES.secondary}
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={`${BUTTON_STYLES.primary} flex items-center space-x-2`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>{isEditMode ? 'Updating...' : 'Adding...'}</span>
                  </>
                ) : (
                  <>
                    <span>{isEditMode ? '💾' : '✅'}</span>
                    <span>{isEditMode ? 'Update Property' : 'Add Property'}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Properties List with Filters */}
      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">
              All Properties
            </h2>
            <p className="text-sm text-gray-600">
              {properties.length} {properties.length === 1 ? 'property' : 'properties'} found
            </p>
          </div>
          
          {/* Filters */}
          <div className="flex flex-wrap gap-3">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-2 border text-black cursor-pointer border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm bg-white shadow-sm hover:border-gray-400 transition"
            >
              <option value="all">All Categories</option>
              {CATEGORY_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>

            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2 border text-black cursor-pointer border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm bg-white shadow-sm hover:border-gray-400 transition"
            >
              <option value="all">All Types</option>
              {TYPE_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>

            <button
              onClick={fetchProperties}
              className="cursor-pointer px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition font-medium text-sm shadow-sm flex items-center space-x-2"
            >
              <span>🔄</span>
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {properties.length === 0 ? (
          <div className="text-center py-16 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
            <div className="text-6xl mb-4">🏢</div>
            <p className="text-gray-600 text-lg mb-2 font-medium">No properties found</p>
            <p className="text-sm text-gray-400">
              {filterCategory !== 'all' || filterType !== 'all' 
                ? 'Try adjusting your filters or add a new property' 
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
                      <div className="text-sm text-gray-500 flex items-center space-x-1">
                        <span>📍</span>
                        <span>{property.location}</span>
                      </div>
                      <div className="text-xs text-gray-400 mt-1">ID: {property.propertyId}</div>
                    </td>
                    <td className="px-4 py-4">
                      <span className="inline-block px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full capitalize">
                        {property.category.replace(/-/g, ' ')}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full capitalize ${
                        property.type === 'sell' 
                          ? 'bg-green-100 text-green-800' 
                          : property.type === 'rent'
                          ? 'bg-purple-100 text-purple-800'
                          : 'bg-orange-100 text-orange-800'
                      }`}>
                        {property.type}
                      </span>
                    </td>
                    <td className="px-4 py-4 font-semibold text-gray-900">{property.price}</td>
                    <td className="px-4 py-4">
                      <span className="text-sm text-gray-600">{property.status}</span>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <div className="flex gap-2 justify-center">
                        <button
                          onClick={() => handleEdit(property)}
                          className="cursor-pointer px-3 py-1.5 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition font-medium shadow-sm hover:shadow-md"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(property.id, property.title)}
                          className="cursor-pointer px-3 py-1.5 text-sm text-white bg-red-600 hover:bg-red-700 rounded-lg transition font-medium shadow-sm hover:shadow-md"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}