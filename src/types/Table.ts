export interface TableHead {
  id: string;
  name: string;
}

export interface TableData {
  headId: string;
  data: string | number;
}

export interface TableBody {
  id: number;
  content: TableData[];
}
