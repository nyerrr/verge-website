"use client"

import { useState, useEffect, useCallback } from 'react'
import type { User } from '@/app/admin/utils/types'

interface UsersPageProps {
  userData: User
  onNavigate?: (page: string) => void
}

interface UserData {
  id: string
  name: string
  email: string
  userType: 'admin' | 'user'
  status: 'active' | 'inactive'
  joinedDate: string
  photoURL?: string
}

interface UserFormData {
  name: string
  email: string
  userType: 'admin' | 'user'
  status: 'active' | 'inactive'
  password:  string
  confirmPassword: string
}

const INITIAL_FORM_STATE: UserFormData = {
  name: '',
  email: '',
  userType: 'user',
  status: 'active',
  password: '',
  confirmPassword: ''
}

const BUTTON_STYLES = {
  primary: "cursor-pointer px-6 py-3 bg-black text-white rounded-lg hover:shadow-[0_0_20px_black] transition duration-200 hover:scale-105 font-semibold disabled:opacity-50 disabled:cursor-not-allowed",
  secondary: "cursor-pointer px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition duration-200 hover:scale-105 font-semibold",
  edit: "cursor-pointer px-3 py-1.5 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition font-medium shadow-sm hover:shadow-md",
  danger: "cursor-pointer px-3 py-1.5 text-sm text-white bg-red-600 hover:bg-red-700 rounded-lg transition font-medium shadow-sm hover:shadow-md"
}

export default function UsersPage({ userData }: UsersPageProps) {
  // State
  const [users, setUsers] = useState<UserData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterType, setFilterType] = useState<string>('all')
  const [showAddForm, setShowAddForm] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [editingUserId, setEditingUserId] = useState<string | null>(null)
  const [formData, setFormData] = useState<UserFormData>(INITIAL_FORM_STATE)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // ============================================
  // DATA FETCHING
  // ============================================
  const fetchUsers = useCallback(async () => {
    if (!userData) return

    try {
      setIsLoading(true)
      const response = await fetch('/api/users', {
        headers: {
          'user-data': JSON.stringify(userData)
        }
      })
      
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
      
      const data = await response.json()
      setUsers(data.users || [])
    } catch (error) {
      console.error('Failed to fetch users:', error)
      alert('❌ Failed to load users. Please refresh the page.')
      setUsers([])
    } finally {
      setIsLoading(false)
    }
  }, [userData])

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  // ============================================
  // VALIDATION
  // ============================================
  const validateForm = useCallback(() => {
  const validations = [
    { condition: !formData.name.trim(), message: 'Please enter a name' },
    { condition: !formData.email.trim(), message: 'Please enter an email' },
    { condition: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email), message: 'Please enter a valid email address' },
    { condition: !isEditMode && !formData.password, message: 'Please enter a password' },
    { condition: !isEditMode && formData.password.length < 6, message: 'Password must be at least 6 characters' },
    { condition: !isEditMode && formData.password !== formData.confirmPassword, message: 'Passwords do not match' },
  ]
  
  for (const { condition, message } of validations) {
    if (condition) {
      alert(`❌ ${message}`)
      return false
    }
  }
  return true
}, [formData.name, formData.email, formData.password, formData.confirmPassword, isEditMode])

  // ============================================
  // FORM HANDLERS
  // ============================================
  const handleInputChange = useCallback((
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }, [])

  const resetForm = useCallback(() => {
    setFormData(INITIAL_FORM_STATE)
    setIsEditMode(false)
    setEditingUserId(null)
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
      const payload = {
        ...(isEditMode && editingUserId ? { id: editingUserId } : {}),
        ...formData,
      }

      const endpoint = isEditMode ? '/api/users/update' : '/api/users/create'
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
        alert(`✅ User ${isEditMode ? 'updated' : 'added'} successfully!`)
        handleFormToggle(true)
        await fetchUsers()
      } else {
        alert(`❌ Error: ${result.error || `Failed to ${isEditMode ? 'update' : 'add'} user`}`)
      }
    } catch (error: any) {
      console.error(`Error ${isEditMode ? 'updating' : 'adding'} user:`, error)
      alert(`❌ Error: ${error.message || 'Network error. Please try again.'}`)
    } finally {
      setIsSubmitting(false)
    }
  }, [formData, userData, fetchUsers, isEditMode, editingUserId, validateForm, handleFormToggle])

  const handleEdit = useCallback((user: UserData) => {
    setFormData({
      name: user.name,
      email: user.email,
      userType: user.userType,
      status: user.status,
      password: '',
      confirmPassword: ''
    })
    setEditingUserId(user.id)
    setIsEditMode(true)
    setShowAddForm(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const handleDeleteUser = useCallback(async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete user "${name}"? This action cannot be undone.`)) {
      return
    }

    try {
      const response = await fetch(`/api/users/delete?id=${id}`, {
        method: 'DELETE',
        headers: { 'user-data': JSON.stringify(userData) }
      })

      const result = await response.json()

      if (response.ok) {
        alert(`✅ User "${name}" deleted successfully`)
        await fetchUsers()
      } else {
        alert(`❌ Failed to delete: ${result.error || 'Unknown error'}`)
      }
    } catch (error) {
      console.error('Error deleting user:', error)
      alert('❌ Network error. Please try again.')
    }
  }, [userData, fetchUsers])

  // ============================================
  // FILTERING
  // ============================================
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = filterType === 'all' || user.userType === filterType
    return matchesSearch && matchesFilter
  })

  // ============================================
  // LOADING STATE
  // ============================================
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
    )
  }

  // ============================================
  // RENDER
  // ============================================
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-600 mt-1">Manage platform users and permissions</p>
        </div>
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
              <span>Add User</span>
            </>
          )}
        </button>
      </div>

      {/* Add/Edit User Form */}
      {showAddForm && (
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 text-black">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
              <span>{isEditMode ? '✏️' : '➕'}</span>
              <span>{isEditMode ? 'Edit User' : 'Add New User'}</span>
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

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g., John Doe"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="e.g., john@example.com"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  User Type <span className="text-red-500">*</span>
                </label>
                <select
                  name="userType"
                  value={formData.userType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition cursor-pointer"
                >
                  <option value="user">Regular User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status <span className="text-red-500">*</span>
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition cursor-pointer"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>

            {!isEditMode && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password <span className="text-red-500">*</span>
                    </label>
                    <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter password (min. 6 characters)"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Confirm Password <span className="text-red-500">*</span>
                        </label>
                        <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        placeholder="Re-enter password"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        />
                        </div>
                        </div>
                      )}
                      {isEditMode && (
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                          <p className="text-sm text-blue-800">
                            <span className="font-semibold">ℹ️ Note:</span> Password cannot be changed here. User must reset their password through the login page.
                            </p>
                            </div>
                          )}
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
                                  <span>{isEditMode ? 'Update User' : 'Add User'}</span>
                                  </>
                                )}
                                </button>
                                </div>
                              </div>
                            </div>
                          )}

      {/* Filters */}
      <div className="text-black bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search users by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="text-black px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 cursor-pointer"
        >
          <option value="all">All Users</option>
          <option value="admin">Admins</option>
          <option value="user">Regular Users</option>
        </select>
        <button
          onClick={fetchUsers}
          className="cursor-pointer px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition font-medium text-sm shadow-sm flex items-center space-x-2"
        >
          <span>🔄</span>
          <span>Refresh</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <p className="text-sm text-gray-600">Total Users</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{users.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <p className="text-sm text-gray-600">Active Users</p>
          <p className="text-2xl font-bold text-green-600 mt-1">
            {users.filter(u => u.status === 'active').length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <p className="text-sm text-gray-600">Admins</p>
          <p className="text-2xl font-bold text-blue-600 mt-1">
            {users.filter(u => u.userType === 'admin').length}
          </p>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Joined
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <div className="text-gray-400">
                      <div className="text-6xl mb-4">👥</div>
                      <p className="text-lg mb-2 font-medium">No users found</p>
                      <p className="text-sm">
                        {searchQuery || filterType !== 'all'
                          ? 'Try adjusting your search or filters'
                          : 'Add your first user to get started'}
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900">{user.name}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="text-sm text-gray-600">{user.email}</p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                        user.userType === 'admin' 
                          ? 'bg-purple-100 text-purple-800' 
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {user.userType}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                        user.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {user.joinedDate ? new Date(user.joinedDate).toLocaleDateString() : 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="flex gap-2 justify-center">
                        <button 
                          onClick={() => handleEdit(user)}
                          className={BUTTON_STYLES.edit}
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => handleDeleteUser(user.id, user.name)}
                          className={BUTTON_STYLES.danger}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}