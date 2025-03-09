import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useExpenseStore } from '@/store/expenseStore';
import { ExpenseCard } from '@/components/ExpenseCard';
import { AddExpenseModal } from '@/components/AddExpenseModal';
import { Plus, Moon, Sun } from 'lucide-react-native';

export default function HomeScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const { expenses, monthlyBudget, isDarkMode, toggleDarkMode } = useExpenseStore();

  const totalSpent = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const remaining = monthlyBudget - totalSpent;

  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <SafeAreaView style={[styles.container, theme.container]}>
      <View style={styles.header}>
        <Text style={[styles.title, theme.text]}>My Expenses</Text>
        <TouchableOpacity onPress={toggleDarkMode}>
          {isDarkMode ? (
            <Sun color={theme.text.color} size={24} />
          ) : (
            <Moon color={theme.text.color} size={24} />
          )}
        </TouchableOpacity>
      </View>

      <View style={[styles.summaryContainer, theme.card]}>
        <View style={styles.summaryItem}>
          <Text style={[styles.summaryLabel, theme.textSecondary]}>Total Spent in March</Text>
          <Text style={[styles.summaryAmount, theme.text]}>${totalSpent.toFixed(2)}</Text>
        </View>

        <View style={styles.summaryRow}>
          <View style={styles.summaryItem}>
            <Text style={[styles.summaryLabel, theme.textSecondary]}>Monthly Budget</Text>
            <Text style={[styles.budgetAmount, theme.text]}>${monthlyBudget.toFixed(2)}</Text>
          </View>

          <View style={styles.summaryItem}>
            <Text style={[styles.summaryLabel, theme.textSecondary]}>Remaining</Text>
            <Text style={[styles.remainingAmount, remaining < 0 && styles.negative]}>
              ${remaining.toFixed(2)}
            </Text>
          </View>
        </View>
      </View>

      <Text style={[styles.sectionTitle, theme.text]}>Recent Transactions</Text>

      <ScrollView style={styles.expensesList}>
        {expenses.map((expense) => (
          <ExpenseCard key={expense.id} {...expense} />
        ))}
      </ScrollView>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}>
        <Plus color="#fff" size={24} />
      </TouchableOpacity>

      <AddExpenseModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </SafeAreaView>
  );
}

const darkTheme = {
  container: {
    backgroundColor: '#000',
  },
  card: {
    backgroundColor: '#1a1a1a',
  },
  text: {
    color: '#fff',
  },
  textSecondary: {
    color: '#666',
  },
};

const lightTheme = {
  container: {
    backgroundColor: '#f5f5f5',
  },
  card: {
    backgroundColor: '#fff',
  },
  text: {
    color: '#000',
  },
  textSecondary: {
    color: '#666',
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
  },
  summaryContainer: {
    padding: 24,
    marginHorizontal: 24,
    borderRadius: 16,
    marginBottom: 24,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  summaryItem: {
    flex: 1,
  },
  summaryLabel: {
    fontSize: 14,
    marginBottom: 4,
  },
  summaryAmount: {
    fontSize: 32,
    fontWeight: '600',
  },
  budgetAmount: {
    fontSize: 20,
    fontWeight: '600',
  },
  remainingAmount: {
    color: '#4CAF50',
    fontSize: 20,
    fontWeight: '600',
  },
  negative: {
    color: '#ff4444',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
    paddingHorizontal: 24,
  },
  expensesList: {
    flex: 1,
    paddingHorizontal: 24,
  },
  addButton: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#9333ea',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#9333ea',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
  },
});