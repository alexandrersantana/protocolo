import { StyleSheet, FlatList } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';


const STORAGE_KEY = '@relatorios';

export default function TabTwoScreen() {

  const [relatorios, setRelatorios] = useState<any[]>([])

  useFocusEffect(
    useCallback(() => {
      const loadRelatorios = async () => {
        try {
          const relatoriosString = await AsyncStorage.getItem(STORAGE_KEY);
          const relatorios = relatoriosString ? JSON.parse(relatoriosString) : [];
          console.log('Relatórios carregados:', relatorios);
          setRelatorios(relatorios);
        } catch (e) {
          alert('Falha ao carregar os relatórios.');
          console.error(e);
        }
      };

      loadRelatorios();
    }, [])
  );

  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Relatórios</Text> */}
      <FlatList
        data={relatorios}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemText}>Cliente: {item.cliente}</Text>
            <Text style={styles.itemText}>OS:</Text>
            {item.lista.map((os: string, index: number) => (
              <Text key={index} style={styles.subItemText}>
                {os}
              </Text>
            ))}
          </View>
        )}
      />






      {/* <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="app/(tabs)/two.tsx" /> */}
    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flexDirection: 'row',
    margin: 20,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  item: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemText: {
    fontSize: 18,
  },
  subItemText: {
    fontSize: 16,
    marginLeft: 10,
  },
});
