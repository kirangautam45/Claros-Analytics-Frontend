import { vi } from 'vitest'

/**
 * Mock data factories for dashboard components.
 * Use these to create consistent test data across all tests.
 */

// ============================================================================
// Types
// ============================================================================

export interface UserActivity {
  id: number
  name: string
  email: string
  posts: number
  comments: number
  todos: number
  completedTodos: number
}

export interface ChartDataItem {
  name: string
  value: number
}

export interface DonutDataItem {
  label: string
  value: number
  color: string
}

export interface PaginationProps {
  currentPage: number
  totalPages: number
  itemsPerPage: number
  totalItems: number
  onPageChange: (page: number) => void
  onItemsPerPageChange: (itemsPerPage: number) => void
}

// ============================================================================
// Factory Functions
// ============================================================================

let activityIdCounter = 1

export function createMockActivity(
  overrides: Partial<UserActivity> = {}
): UserActivity {
  const id = overrides.id ?? activityIdCounter++
  return {
    id,
    name: `User ${id}`,
    email: `user${id}@example.com`,
    posts: 10,
    comments: 25,
    todos: 20,
    completedTodos: 15,
    ...overrides,
  }
}

export function createMockActivities(
  count: number,
  overrides: Partial<UserActivity>[] = []
): UserActivity[] {
  return Array.from({ length: count }, (_, i) =>
    createMockActivity(overrides[i] || {})
  )
}

export function createMockChartData(
  overrides: Partial<ChartDataItem>[] = []
): ChartDataItem[] {
  const defaults: ChartDataItem[] = [
    { name: 'User A', value: 100 },
    { name: 'User B', value: 75 },
    { name: 'User C', value: 50 },
    { name: 'User D', value: 25 },
    { name: 'User E', value: 10 },
  ]
  return defaults.map((item, i) => ({ ...item, ...overrides[i] }))
}

export function createMockDonutData(
  overrides: Partial<DonutDataItem>[] = []
): DonutDataItem[] {
  const defaults: DonutDataItem[] = [
    { label: 'Completed', value: 70, color: '#10b981' },
    { label: 'Pending', value: 30, color: '#f59e0b' },
  ]
  return defaults.map((item, i) => ({ ...item, ...overrides[i] }))
}

export function createMockPaginationProps(
  overrides: Partial<PaginationProps> = {}
): PaginationProps {
  return {
    currentPage: 1,
    totalPages: 10,
    itemsPerPage: 10,
    totalItems: 100,
    onPageChange: vi.fn(),
    onItemsPerPageChange: vi.fn(),
    ...overrides,
  }
}

// ============================================================================
// Preset Data Sets
// ============================================================================

/**
 * Standard activity data set with varied values for testing sorting and display.
 */
export const MOCK_ACTIVITIES: UserActivity[] = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    posts: 10,
    comments: 25,
    todos: 20,
    completedTodos: 15,
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    posts: 15,
    comments: 30,
    todos: 25,
    completedTodos: 20,
  },
  {
    id: 3,
    name: 'Bob Wilson',
    email: 'bob@example.com',
    posts: 5,
    comments: 10,
    todos: 15,
    completedTodos: 5,
  },
]

/**
 * Standard chart data set for bar charts.
 */
export const MOCK_CHART_DATA: ChartDataItem[] = [
  { name: 'User A', value: 100 },
  { name: 'User B', value: 75 },
  { name: 'User C', value: 50 },
  { name: 'User D', value: 25 },
  { name: 'User E', value: 10 },
]

/**
 * Standard donut chart data set.
 */
export const MOCK_DONUT_DATA: DonutDataItem[] = [
  { label: 'Completed', value: 70, color: '#10b981' },
  { label: 'Pending', value: 30, color: '#f59e0b' },
]

// ============================================================================
// Reset Utilities
// ============================================================================

/**
 * Reset the activity ID counter. Call this in beforeEach if you need predictable IDs.
 */
export function resetActivityIdCounter() {
  activityIdCounter = 1
}
