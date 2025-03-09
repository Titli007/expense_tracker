import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useExpenseStore, Category } from '@/store/expenseStore';
import { VictoryPie } from 'victory-native';

const COLORS = [
  '#9333ea', // Purple
  '#3b82f6', // Blue
  '#ef4444', // Red
  '#22c55e', // Green
  '#f59e0b', // Yellow
  '#ec4899', // Pink
  '#14b8a6', // Teal
  '#f97316', // Orange
  '#6366f1', // Indigo
  '#8b5cf6', // Violet
];

export default function AnalyticsScreen() {
  const expenses = useExpenseStore((state) => state.expenses);

  const categoryTotals = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {} as Record<Category, number>);

  const totalSpent = Object.values(categoryTotals).reduce((sum, amount) => sum + amount, 0);

  const getPercentage = (amount: number) => {
    return ((amount / totalSpent) * 100).toFixed(1);
  };

  const pieData = Object.entries(categoryTotals).map(([category, amount], index) => ({
    x: category,
    y: amount,
    color: COLORS[index % COLORS.length],
  }));

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Spending Analytics</Text>

      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Spending by Category</Text>
        
        <View style={styles.pieChartContainer}>
          <VictoryPie
            data={pieData}
            width={300}
            height={300}
            colorScale={pieData.map(d => d.color)}
            innerRadius={70}
            labelRadius={({ innerRadius }) => (innerRadius as number) + 35}
            style={{
              labels: {
                fill: '#fff',
                fontSize: 12,
                fontWeight: 'bold',
              },
            }}
            labels={({ datum }) => `${getPercentage(datum.y)}%`}
          />
        </View>

        <ScrollView style={styles.legendContainer}>
          {Object.entries(categoryTotals).map(([category, amount], index) => (
            <View key={category} style={styles.categoryRow}>
              <View style={styles.categoryInfo}>
                <View style={[styles.colorIndicator, { backgroundColor: COLORS[index % COLORS.length] }]} />
                <Text style={styles.categoryName}>{category}</Text>
                <Text style={styles.categoryAmount}>${amount.toFixed(2)}</Text>
              </View>
              <View style={styles.barContainer}>
                <View
                  style={[
                    styles.bar,
                    { 
                      width: `${getPercentage(amount)}%`,
                      backgroundColor: COLORS[index % COLORS.length],
                    },
                  ]}
                />
              </View>
              <Text style={styles.percentage}>{getPercentage(amount)}%</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 24,
  },
  chartContainer: {
    backgroundColor: '#1a1a1a',
    borderRadius: 16,
    padding: 24,
    flex: 1,
  },
  chartTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 24,
  },
  pieChartContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  legendContainer: {
    flex: 1,
  },
  categoryRow: {
    marginBottom: 16,
  },
  categoryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  colorIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  categoryName: {
    color: '#fff',
    fontSize: 16,
    flex: 1,
  },
  categoryAmount: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  barContainer: {
    height: 8,
    backgroundColor: '#2a2a2a',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 4,
  },
  bar: {
    height: '100%',
    borderRadius: 4,
  },
  percentage: {
    color: '#666',
    fontSize: 14,
    textAlign: 'right',
  },
});