import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type Category =
  | 'Food'
  | 'Transport'
  | 'Shopping'
  | 'Entertainment'
  | 'Healthcare'
  | 'Education'
  | 'Bills'
  | 'Travel'
  | 'Groceries'
  | 'Fitness';

export interface Expense {
  id: string;
  amount: number;
  category: Category;
  description: string;
  date: string;
}

interface ThemeState {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

interface ExpenseState extends ThemeState {
  expenses: Expense[];
  monthlyBudget: number;
  addExpense: (expense: Omit<Expense, 'id'>) => void;
  setMonthlyBudget: (amount: number) => void;
}

export const useExpenseStore = create<ExpenseState>((set) => ({
  expenses: [
    {
      id: '1',
      amount: 45,
      category: 'Food',
      description: 'Lunch at Italian Restaurant',
      date: '2025-03-06',
    },
    {
      id: '2',
      amount: 28,
      category: 'Transport',
      description: 'Uber to Downtown',
      date: '2025-03-06',
    },
    {
      id: '3',
      amount: 199,
      category: 'Shopping',
      description: 'New Headphones',
      date: '2025-03-05',
    },
    {
      id: '4',
      amount: 32,
      category: 'Entertainment',
      description: 'Cinema Tickets',
      date: '2025-03-05',
    },
    {
      id: '5',
      amount: 150,
      category: 'Healthcare',
      description: 'Annual Checkup',
      date: '2025-03-04',
    },
    {
      id: '6',
      amount: 299,
      category: 'Education',
      description: 'Online Course',
      date: '2025-03-04',
    },
  ],
  monthlyBudget: 2000,
  isDarkMode: true,
  addExpense: (expense) =>
    set((state) => ({
      expenses: [
        {
          ...expense,
          id: Math.random().toString(36).substr(2, 9),
        },
        ...state.expenses,
      ],
    })),
  setMonthlyBudget: (amount) => set({ monthlyBudget: amount }),
  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
}));