import { StyleSheet, TextInput, Button, FlatList } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function TabOneScreen() {


  const [servico, setServico] = useState<string>("")
  const [cliente, setCliente] = useState<string>("")
  const [lista, setLista] = useState<string[]>([])
  const [isAdditionalSectionVisible, setIsAdditionalSectionVisible] = useState(false);

  const STORAGE_KEY = '@relatorios';

  const adicionarNaLista = () => {
    setLista([...lista, servico]);
    setServico('');
  };

  const verificaCliente = () => {
    if (cliente.trim().length > 0) {
      setIsAdditionalSectionVisible(true)
    } else {
      alert('Por favor, preencha o campo de cliente')
    }
  }

  const alteraCliente = () => {
    setIsAdditionalSectionVisible(false)
  }

  const salvarRelatorio = async () => {
    try {
      const relatorio = { cliente, lista}
      const relatoriosString = await AsyncStorage.getItem(STORAGE_KEY)
      const relatorios = relatoriosString ? JSON.parse(relatoriosString) : []
      relatorios.push(relatorio)
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(relatorios))
      alert('Relatório salvo com sucesso!')
      setLista([])
      setServico('')
      setIsAdditionalSectionVisible(false)

    } catch (e) {
      alert('Falha ao salvar o relatório.')
    }
  }

  return (
    <SafeAreaView style={styles.container}>



            <Text style={styles.title}>Tab One</Text>
      


      {!isAdditionalSectionVisible && (
        <View>
          <Text style={styles.title}>Informe o Cliente</Text>
          <TextInput style={styles.input} value={cliente} onChangeText={setCliente} placeholder='Informe o código do cliente' placeholderTextColor={'#908a8a'} keyboardType='numeric' />
          <Button title="Selecionar" onPress={verificaCliente}></Button>
        </View>
      )}



      {isAdditionalSectionVisible && (
        <View style={styles.container}>
          <View style={styles.row}>
            <Text style={styles.text}>Código: {cliente}</Text>
            <Button title="Alterar" onPress={alteraCliente}></Button>
          </View>
          <TextInput style={styles.input} value={servico} onChangeText={setServico} placeholder='Insira a OS aqui!' placeholderTextColor={'#908a8a'} keyboardType='numeric' />
          <Button title="Adicionar" onPress={adicionarNaLista}></Button>
          <Button title="Salvar Relatório" onPress={salvarRelatorio}></Button>
          <Text style={styles.text}>OS anotada: {servico}</Text>


          <FlatList
            data={lista}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => <Text style={styles.item}>{item}</Text>}
          />
        </View>
      )}

      {/* <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="app/(tabs)/index.tsx" /> */}
    </SafeAreaView>
  );
}



const styles = StyleSheet.create({
  container: {
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
  input: {
    borderColor: '#ff5733',
    alignContent: 'center',
    height: 40,
    width: 200,
    margin: 12,
    padding: 10,
    borderWidth: 1,
    color: '#fefefe',
  },
  text: {
    fontSize: 30,
    padding: 10,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 40,
  },
});
