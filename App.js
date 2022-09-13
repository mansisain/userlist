import React, {useState} from 'react';
import {View, StyleSheet, FlatList, Button} from 'react-native';
import GoalItem from './components/goalItem';
import GoalInput from './components/goalInput';

export default function App() {
  const [courseGoals, setCourseGoals] = useState([]);
  const [isAddMode, setIsAddMode] = useState(false);

  function addGoalHandler(goalTitle) {
    // console.log(enteredGoal);
    setCourseGoals(currentGoals => [
      ...courseGoals,
      {id: Math.random().toString(), value: goalTitle},
    ]);
    setIsAddMode(false);
  }

  function removeGoalHandler(goalId) {
    setCourseGoals(currentGoals => {
      return currentGoals.filter(goal => goal.id !== goalId);
    });
  }
  function cancelGoalHandler() {
    setIsAddMode(false);
  }

  return (
    <View style={styles.screen}>
      <Button title="Add new goal" onPress={() => setIsAddMode(true)} />
      <GoalInput
        visible={isAddMode}
        onAddGoal={addGoalHandler}
        onCancel={cancelGoalHandler}
      />
      <FlatList
        data={courseGoals}
        keyExtractor={item => item.id}
        renderItem={itemData => (
          <GoalItem
            id={itemData.item.id}
            title={itemData.item.value}
            onDelete={removeGoalHandler}
          />
        )}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  screen: {
    padding: 50,
  },
});
