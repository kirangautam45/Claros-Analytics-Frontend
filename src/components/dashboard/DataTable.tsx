import type { ReactNode } from 'react'

export interface Column<T> {
  key: string
  header: string
  className?: string
  hideOnMobile?: boolean
  render?: (item: T) => ReactNode
}

interface DataTableProps<T> {
  data: T[]
  columns: Column<T>[]
  keyField: keyof T
  onRowClick?: (item: T) => void
  emptyMessage?: string
}

export function DataTable<T>({
  data,
  columns,
  keyField,
  onRowClick,
  emptyMessage = 'No data found',
}: DataTableProps<T>) {
  const getValue = (item: T, key: string): unknown => {
    return key.split('.').reduce((obj: unknown, k) => {
      if (obj && typeof obj === 'object') {
        return (obj as Record<string, unknown>)[k]
      }
      return undefined
    }, item)
  }

  return (
    <div className='bg-white rounded-lg border border-gray-200 overflow-hidden'>
      <div className='overflow-x-auto'>
        <table className='w-full'>
          <thead>
            <tr className='border-b border-gray-200'>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider ${
                    column.className || ''
                  } ${column.hideOnMobile ? 'hidden md:table-cell' : ''}`}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className='px-6 py-8 text-center text-gray-500'
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((item) => (
                <tr
                  key={String(item[keyField])}
                  onClick={() => onRowClick?.(item)}
                  className={`border-b border-gray-100 hover:bg-gray-50 ${
                    onRowClick ? 'cursor-pointer' : ''
                  }`}
                >
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className={`px-6 py-4 ${column.className || ''} ${
                        column.hideOnMobile ? 'hidden md:table-cell' : ''
                      }`}
                    >
                      {column.render ? (
                        column.render(item)
                      ) : (
                        <span className='text-sm text-gray-600'>
                          {String(getValue(item, column.key) ?? '')}
                        </span>
                      )}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
