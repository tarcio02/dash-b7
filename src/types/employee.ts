export type EmployeeStatus = "active" | "vacation" | "terminated";
export type TaskStatus = "pending" | "in_progress" | "completed";

export interface Task {
  id: string;
  title: string;
  description: string;
  deadline: string;
  status: TaskStatus;
}

export interface Employee {
  id: string;
  name: string;
  role: string;
  avatar: string;
  status: EmployeeStatus;
  productivity: number;
  email: string;
  phone: string;
  hireDate: string;
  tasks: Task[];
  departement: string
}
