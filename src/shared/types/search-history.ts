export interface SearchHistoryItem {
  id: string;
  date: string;
  manufacturer: string;
  articleNumber: string;
  name: string;
}

export interface SearchHistoryFilters {
  period: 'today' | 'yesterday' | 'earlier' | 'archive';
  manufacturer: string | null;
  search: string;
}
