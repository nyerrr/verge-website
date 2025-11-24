"use client"
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import PageTransition from '../components/PageTransition'

export default function AdminPage() {
  const [userData, setUserData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  const [properties, setProperties] = useState<any[]>([])
  const router = useRouter()

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    category: 'lot',
    type: 'sell',
    status: 'For Sale',
    bedrooms: '',
    bathrooms: '',
    area: '',
    floorLevel: '',
    parking: '',
    yearBuilt: '',
    propertyId: '',
    images: [] as string[],
    features: {
      interior: ['Modern kitchen', 'Spacious living room'],
      amenities: ['Swimming pool', '24/7 Security'],
      nearby: ['Schools nearby', 'Shopping malls']
    }
  })

  useEffect(() => {
    checkAuth()
    fetchProperties()
  }, [])

  const checkAuth = () => {
    const userDataStr = localStorage.getItem('userData')
    if (!userDataStr) return router.push('/login')

    const user = JSON.parse(userDataStr)
    if (user.userType !== 'admin') return router.push('/')

    setUserData(user)
    setIsLoading(false)
  }

  const fetchProperties = async () => {
    try {
      const response = await fetch('/api/properties')
      const data = await response.json()
      setProperties(data)
    } catch (error) {
      console.error('Failed to fetch properties:', error)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('userData')
    localStorage.removeItem('token')
    router.push('/login')
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    const files = Array.from(e.target.files)
    const readerPromises = files.map(file => {
      return new Promise<string>((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => resolve(reader.result as string)
        reader.onerror = reject
        reader.readAsDataURL(file) // convert file to base64 string
      })
    })

    Promise.all(readerPromises)
      .then(images => setFormData({ ...formData, images }))
      .catch(err => console.error('Error reading images:', err))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const payload = {
        ...formData,
        images: formData.images.length ? JSON.stringify(formData.images) : JSON.stringify(['/property-placeholder.jpg']),
        features: JSON.stringify(formData.features),
      }

      const response = await fetch('/api/properties/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'user-data': JSON.stringify(userData)
        },
        body: JSON.stringify(payload)
      })

      const result = await response.json()

      if (response.ok) {
        alert('✅ Property added successfully!')
        setShowAddForm(false)
        fetchProperties()
        resetForm()
      } else {
        alert(`❌ Error: ${result.error}`)
      }
    } catch (error) {
      console.error('Error adding property:', error)
      alert('❌ Error adding property')
    }
  }

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      price: '',
      location: '',
      category: 'lot',
      type: 'sell',
      status: 'For Sale',
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
    })
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this property?')) return

    try {
      const response = await fetch(`/api/properties/delete?id=${id}`, {
        method: 'DELETE',
        headers: { 'user-data': JSON.stringify(userData) }
      })
      if (response.ok) fetchProperties()
      else alert('❌ Failed to delete')
    } catch (error) {
      console.error('Error deleting:', error)
      alert('❌ Error deleting property')
    }
  }

  if (isLoading) return <div className="min-h-screen flex items-center justify-center text-xl">Loading...</div>

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-100">
        {/* Header */}
        <header className="bg-white shadow-md">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-black">Admin Dashboard</h1>
              <p className="text-sm text-gray-600">Welcome, {userData?.name}</p>
            </div>
            <button onClick={handleLogout} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">Logout</button>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          {/* Add Property Button */}
          <button onClick={() => setShowAddForm(!showAddForm)} className="mb-6 px-6 py-3 bg-black text-white rounded-lg hover:shadow-[0_0_20px_black] transition font-semibold">
            {showAddForm ? '✕ Cancel' : '+ Add New Property'}
          </button>

          {/* Add Property Form */}
          {showAddForm && (
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Add New Property</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Title */}
                <input type="text" name="title" value={formData.title} onChange={handleInputChange} placeholder="Title" required className="w-full px-4 py-2 border rounded-lg"/>
                
                {/* Property ID */}
                <input type="text" name="propertyId" value={formData.propertyId} onChange={handleInputChange} placeholder="Property ID" required className="w-full px-4 py-2 border rounded-lg"/>

                {/* Price */}
                <input type="text" name="price" value={formData.price} onChange={handleInputChange} placeholder="Price" required className="w-full px-4 py-2 border rounded-lg"/>

                {/* Location */}
                <input type="text" name="location" value={formData.location} onChange={handleInputChange} placeholder="Location" required className="w-full px-4 py-2 border rounded-lg"/>

                {/* Category & Type */}
                <select name="category" value={formData.category} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg">
                  <option value="lot">Lot</option>
                  <option value="condominium">Condominium</option>
                  <option value="short-term">Short Term Rent</option>
                  <option value="long-term">Long Term Rent</option>
                </select>
                <select name="type" value={formData.type} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg">
                  <option value="sell">For Sale</option>
                  <option value="rent">For Rent</option>
                </select>

                {/* Images Upload */}
                <div>
                  <label className="block mb-1 font-medium">Images (You can select multiple)</label>
                  <input type="file" multiple accept="image/*" onChange={handleImageChange} className="w-full"/>
                  <div className="flex gap-2 mt-2">
                    {formData.images.map((img, idx) => (
                      <img key={idx} src={img} className="w-20 h-20 object-cover rounded-md" alt={`preview-${idx}`}/>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <textarea name="description" value={formData.description} onChange={handleInputChange} placeholder="Description" required className="w-full px-4 py-2 border rounded-lg"/>

                <button type="submit" className="w-full py-3 bg-black text-white rounded-lg font-semibold">✅ Add Property</button>
              </form>
            </div>
          )}

          {/* Properties List */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6">All Properties ({properties.length})</h2>
            {properties.length === 0 ? <p className="text-center py-8 text-gray-500">No properties yet.</p> : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left">Property</th>
                      <th className="px-4 py-3 text-left">Page</th>
                      <th className="px-4 py-3 text-left">Price</th>
                      <th className="px-4 py-3 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {properties.map(p => (
                      <tr key={p.id}>
                        <td className="px-4 py-4">
                          <div className="font-medium">{p.title}</div>
                          <div className="text-gray-500">{p.location}</div>
                        </td>
                        <td className="px-4 py-4">{p.category}</td>
                        <td className="px-4 py-4">{p.price}</td>
                        <td className="px-4 py-4">
                          <button onClick={() => handleDelete(p.id)} className="text-red-600 hover:text-red-800">Delete</button>
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
    </PageTransition>
  )
}
