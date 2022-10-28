export interface TableHead {
  id: string;
  name: string;
}

export interface TableData {
  headId: string;
  data: string;
}

export interface TableBody {
  id: string;
  content: TableData[];
}
