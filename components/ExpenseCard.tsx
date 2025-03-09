import { View, Text, StyleSheet } from 'react-native';
import { format } from 'date-fns';
import { Category } from '@/store/expenseStore';
import { ShoppingBag, Car, Pizza, Film, Stethoscope, GraduationCap, Receipt, Plane, ShoppingCart, Dumbbell } from 'lucide-react-native';

interface ExpenseCardProps {
  amount: number;
  category: Category;
  description: string;
  date: string;
}

const getCategoryIcon = (category: Category) => {
  switch (category) {
    case 'Shopping':
      return <ShoppingBag size={24} color="#9333ea" />;
    case 'Transport':
      return <Car size={24} color="#9333ea" />;
    case 'Food':
      return <Pizza size={24} color="#9333ea" />;
    case 'Entertainment':
      return <Film size={24} color="#9333ea" />;
    case 'Healthcare':
      return <Stethoscope size={24} color="#9333ea" />;
    case 'Education':
      return <GraduationCap size={24} color="#9333ea" />;
    case 'Bills':
      return <Receipt size={24} color="#9333ea" />;
    case 'Travel':
      return <Plane size={24} color="#9333ea" />;
    case 'Groceries':
      return <ShoppingCart size={24} color="#9333ea" />;
    case 'Fitness':
      return <Dumbbell size={24} color="#9333ea" />;
  }
};

export function ExpenseCard({ amount, category, description, date }: ExpenseCardProps) {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>{getCategoryIcon(category)}</View>
      <View style={styles.details}>
        <Text style={styles.description}>{description}</Text>
        <Text style={styles.category}>{category}</Text>
      </View>
      <View style={styles.rightContent}>
        <Text style={styles.amount}>-${amount}</Text>
        <Text style={styles.date}>{format(new Date(date), 'yyyy-MM-dd')}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    marginBottom: 8,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#2a2a2a',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  details: {
    flex: 1,
  },
  description: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  category: {
    color: '#666',
    fontSize: 14,
  },
  rightContent: {
    alignItems: 'flex-end',
  },
  amount: {
    color: '#ff4444',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  date: {
    color: '#666',
    fontSize: 12,
  },
});