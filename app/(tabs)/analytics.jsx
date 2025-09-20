import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import {
  BarChart,
  PieChart,
  LineChart,
  ContributionGraph,
} from 'react-native-chart-kit';
import Entypo from '@expo/vector-icons/Entypo';
const screenWidth = Dimensions.get('window').width;

const AnalyticsPage = ({openanalytics,setopenanalytics}) => {
  // Fake data
  const applicationsData = [
    { month: 'Jan', applications: 5, success: 1 },
    { month: 'Feb', applications: 8, success: 2 },
    { month: 'Mar', applications: 12, success: 3 },
    { month: 'Apr', applications: 15, success: 4 },
    { month: 'May', applications: 10, success: 2 },
    { month: 'Jun', applications: 20, success: 6 },
  ];

  const skillData = [
    { name: 'JavaScript', level: 85, color: '#FF6384' },
    { name: 'React Native', level: 90, color: '#36A2EB' },
    { name: 'Python', level: 75, color: '#FFCE56' },
    { name: 'SQL', level: 70, color: '#4BC0C0' },
    { name: 'UI/UX', level: 80, color: '#9966FF' },
  ];

  const successRateData = {
    labels: applicationsData.map(d => d.month),
    datasets: [
      {
        data: applicationsData.map(d => d.success / d.applications * 100),
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  };

  const industryData = [
    { name: 'Tech', applications: 45, color: '#FF6384', legendFontColor: '#7F7F7F', legendFontSize: 15 },
    { name: 'Finance', applications: 25, color: '#36A2EB', legendFontColor: '#7F7F7F', legendFontSize: 15 },
    { name: 'Marketing', applications: 20, color: '#FFCE56', legendFontColor: '#7F7F7F', legendFontSize: 15 },
    { name: 'Healthcare', applications: 10, color: '#4BC0C0', legendFontColor: '#7F7F7F', legendFontSize: 15 },
  ];

  const chartConfig = {
    backgroundGradientFrom: '#fff',
    backgroundGradientTo: '#fff',
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
  };

  const contributionData = [
    { date: '2025-01-01', count: 8 },
    { date: '2025-01-02', count: 4 },
    { date: '2025-01-03', count: 12 },
    { date: '2025-01-04', count: 6 },
    { date: '2025-01-05', count: 9 },
    { date: '2025-01-06', count: 3 },
    { date: '2025-01-07', count: 15 },
    // Add more fake data for a week or month
  ];

  return (
    <>

     <View style={{width:"100%",height:"100%",backgroundColor:"white",position:"absolute",top:0,left:0,zIndex:10,display:openanalytics?"flex":"none"}}>
       <TouchableOpacity style={{marginTop:50,padding:15,backgroundColor:"whitesmoke",borderRadius:100,alignSelf:"flex-start",marginLeft:30}} onPress={()=>setopenanalytics(false)}>
     <Entypo name="cross" size={27} color="black" />

             </TouchableOpacity>
         
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Internship Analytics Dashboard</Text>

      {/* Total Applications Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Total Applications</Text>
        <Text style={styles.cardValue}>85</Text>
        <Text style={styles.cardSubtitle}>+15% from last month</Text>
      </View>

      {/* Success Rate Line Chart */}
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Success Rate Over Time (%)</Text>
        <LineChart
          data={successRateData}
          width={screenWidth - 40}
          height={220}
          chartConfig={chartConfig}
          bezier
        />
      </View>

      {/* Skill Levels Bar Chart */}
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Skill Proficiency Levels</Text>
        <BarChart
          data={{
            labels: skillData.map(s => s.name),
            datasets: [
              {
                data: skillData.map(s => s.level),
                colors: [
                  () => skillData[0].color,
                  () => skillData[1].color,
                  () => skillData[2].color,
                  () => skillData[3].color,
                  () => skillData[4].color,
                ],
              },
            ],
          }}
          width={screenWidth - 40}
          height={220}
          chartConfig={chartConfig}
          showValuesOnTopOfBars
          fromZero
        />
      </View>

      {/* Industry Applications Pie Chart */}
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Applications by Industry</Text>
        <PieChart
          data={industryData}
          width={screenWidth - 40}
          height={220}
          chartConfig={chartConfig}
          accessor="applications"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
        />
      </View>

      {/* Application Activity Heatmap */}
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Weekly Application Activity</Text>
        <ContributionGraph
          values={contributionData}
          endDate={new Date('2025-01-07')}
          numDays={7}
          width={screenWidth - 40}
          height={220}
          chartConfig={chartConfig}
          squareSize={10}
          gutterSize={2}
        />
      </View>

      {/* Additional Feature: Peer Comparison */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Peer Comparison</Text>
        <Text style={styles.cardValue}>You're in the top 20%</Text>
        <Text style={styles.cardSubtitle}>Based on success rate and skills</Text>
      </View>
    </ScrollView></View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffffff',
    padding: 20,
  },
  header: {
    fontSize: 28,
  
    textAlign: 'center',
    marginBottom: 20,
    fontFamily:"lexend",
    color: '#333',
    marginTop:20
  },
  card: {
    backgroundColor: '#ffffffff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffffff',
    marginBottom: 5,
    fontFamily:"lexend",
    padding:15,
    backgroundColor:"dodgerblue",
    borderRadius:100
  },
  cardValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4A90E2',
    marginBottom: 5,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#999',
    fontFamily:"lexend"
  },
  chartContainer: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
    fontFamily:"lexend"
  },
}

);

export default AnalyticsPage;