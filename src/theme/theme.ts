export interface AppTheme {
  // Colors principales
  background: string;
  text: string;
  secondary: string;
  card: string;
  primary: string;
  onPrimary: string;
  success: string;
  danger: string;
}

export const lightTheme: AppTheme = {
  background: '#FFFFFF',
  text: '#111827',
  secondary: '#6B7280',
  card: '#F3F4F6',
  primary: '#4F46E5',
  onPrimary: '#FFFFFF',
  success: '#059669',
  danger: '#DC2626',
};

export const darkTheme: AppTheme = {
  background: '#1F2937',
  text: '#F9FAFB',
  secondary: '#9CA3AF',
  card: '#374151',
  primary: '#6366F1',
  onPrimary: '#FFFFFF',
  success: '#10B981',
  danger: '#EF4444',
};
