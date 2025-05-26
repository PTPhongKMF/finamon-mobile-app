import { StyleSheet, Text, View } from 'react-native'
import { StatusBar } from 'expo-status-bar'

const index = () => {
  return (
    <View style={styles.container}>
      <Text>Hello Finamon!!!</Text>
      <StatusBar style="auto" />
    </View>
  )
}

export default index

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})