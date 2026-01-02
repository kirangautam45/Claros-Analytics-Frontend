import { useState } from 'react'
import { Header } from '@/components/Header'
import { DataTable, SearchInput } from '@/components/dashboard'
import { LoadingSpinner, ErrorMessage, Modal } from '@/components/common'
import { useDashboard } from '@/hooks'
import type { User } from '@/@types'
import type { Column } from '@/components/dashboard'
import {
  Mail,
  Phone,
  Globe,
  Building,
  MapPin,
} from 'lucide-react'

export function UsersPage() {
  const {
    filteredUsers,
    searchTerm,
    isLoading,
    error,
    handleSearch,
    handleClearError,
    handleRetry,
  } = useDashboard()

  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  const columns: Column<User>[] = [
    { key: 'id', header: 'ID', className: 'w-16', hideOnMobile: true },
    {
      key: 'name',
      header: 'Name',
      render: (user: User) => <span className="font-semibold text-gray-900">{user.name}</span>,
    },
    {
      key: 'username',
      header: 'Username',
      hideOnMobile: true,
      render: (user: User) => (
        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
          {user.username}
        </span>
      ),
    },
    { key: 'email', header: 'Email' },
    {
      key: 'company.name',
      header: 'Company',
      render: (user: User) => <span className="text-gray-600">{user.company.name}</span>,
      hideOnMobile: true,
    },
    {
      key: 'address.city',
      header: 'City',
      render: (user: User) => <span className="text-gray-600">{user.address.city}</span>,
      hideOnMobile: true,
    },
  ]

  return (
    <div className="flex flex-col h-full">
      <Header title="Users" />
      <div className="flex-1 p-6 overflow-auto">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Search */}
          <div className="flex flex-col sm:flex-row gap-3 sm:justify-between sm:items-center">
            <SearchInput
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Search users..."
            />
            <span className="text-sm text-gray-500">
              {filteredUsers.length} users found
            </span>
          </div>

          {/* Error State */}
          {error && (
            <ErrorMessage
              error={error}
              onDismiss={handleClearError}
              onRetry={handleRetry}
            />
          )}

          {/* Loading State */}
          {isLoading && <LoadingSpinner size="lg" text="Loading users..." />}

          {/* Table */}
          {!isLoading && !error && (
            <DataTable
              data={filteredUsers}
              columns={columns}
              keyField="id"
              onRowClick={setSelectedUser}
              emptyMessage="No users found"
            />
          )}
        </div>
      </div>

      {/* User Details Modal */}
      <Modal
        isOpen={!!selectedUser}
        onClose={() => setSelectedUser(null)}
        title="User Details"
        size="lg"
      >
        {selectedUser && (
          <div className="space-y-6">
            {/* User Header */}
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-2xl font-bold text-blue-600">
                  {selectedUser.name.charAt(0)}
                </span>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-gray-900">{selectedUser.name}</h4>
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                  @{selectedUser.username}
                </span>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-3">
              <h5 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Contact</h5>
              <div className="space-y-2">
                <a
                  href={`mailto:${selectedUser.email}`}
                  className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition-colors"
                >
                  <Mail className="w-5 h-5 text-gray-400" />
                  {selectedUser.email}
                </a>
                <a
                  href={`tel:${selectedUser.phone}`}
                  className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition-colors"
                >
                  <Phone className="w-5 h-5 text-gray-400" />
                  {selectedUser.phone}
                </a>
                <a
                  href={`https://${selectedUser.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition-colors"
                >
                  <Globe className="w-5 h-5 text-gray-400" />
                  {selectedUser.website}
                </a>
              </div>
            </div>

            {/* Company Info */}
            <div className="space-y-3">
              <h5 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Company</h5>
              <div className="flex items-start gap-3">
                <Building className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">{selectedUser.company.name}</p>
                  <p className="text-sm text-gray-500 italic">"{selectedUser.company.catchPhrase}"</p>
                  <p className="text-sm text-gray-400">{selectedUser.company.bs}</p>
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="space-y-3">
              <h5 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Address</h5>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-gray-700">
                    {selectedUser.address.street}, {selectedUser.address.suite}
                  </p>
                  <p className="text-gray-700">
                    {selectedUser.address.city}, {selectedUser.address.zipcode}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}

export default UsersPage
