import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView
} from 'react-native';

export default function ProntuarioScreen() {
  const [selecionados, setSelecionados] = useState([]);
  const [alerta, setAlerta] = useState(false);
   const dataAtual = new Date().toLocaleDateString("pt-BR");

  useEffect(() => {
  
    if (selecionados.length > 2 && !selecionados.includes("Nenhum sintoma")) {
    setAlerta(true);
    } else {
      setAlerta(false);
    }

  }, [selecionados]);

  const sintomas = [
    { nome: "Dor de cabeça", acao: "Tente descansar, beber água e, se necessário, use analgésico leve.", estavel: true },
    { nome: "Náuseas", acao: "Evite alimentos pesados e mantenha-se hidratado. Procure ajuda se persistir.", estavel: true },
    { nome: "Febre", acao: "Tome antitérmico e monitore. Se passar de 38.5°C, procure atendimento.", estavel: true },
    { nome: "Tontura", acao: "Sente-se, respire fundo e evite movimentos bruscos.", estavel: true },
    { nome: "Falta de ar", acao: "Procure atendimento médico imediatamente.", critico: true },
    { nome: "Cansaço extremo", acao: "Descanse e hidrate-se. Se persistir, consulte um médico.", estavel: true },
    { nome: "Dor no peito", acao: "Procure um hospital imediatamente.", critico: true },
    { nome: "Nenhum sintoma", acao: "Tudo certo. Fico feliz em saber disso", positivo: true }
  
  ];

  const selecionarSintoma = (sintoma) => {
  // Se clicou em "Nenhum sintoma"
  if (sintoma.nome === "Nenhum sintoma") {
    setSelecionados(["Nenhum sintoma"]);
    return;
  }
  

  // Se "Nenhum sintoma" já está selecionado, ignore
  if (selecionados.includes("Nenhum sintoma")) return;

  // Caso seja sintoma normal → adiciona normalmente
  setSelecionados(prev => [...prev, sintoma.nome]);
  };

 const alternarSelecao = (sintoma) => {

  // Se clicou em "Nenhum sintoma"
  if (sintoma === "Nenhum sintoma") {
    // Se já está selecionado → desmarca
    if (selecionados.includes("Nenhum sintoma")) {
      setSelecionados([]);
      return;
    }

    // Se NÃO está selecionado → seleciona apenas ele
    setSelecionados(["Nenhum sintoma"]);
    return;
  }

  // Se outro sintoma foi clicado e "Nenhum sintoma" está marcado → remove ele
  if (selecionados.includes("Nenhum sintoma")) {
    setSelecionados([sintoma]);
    return;
  }

  // Alternar sintomas normais
  if (selecionados.includes(sintoma)) {
    setSelecionados(selecionados.filter(item => item !== sintoma));
  } else {
    setSelecionados([...selecionados, sintoma]);
  }
};

  return (

    <View style={Estilo.container}>

      {/* Cabeçalho */}
      <View style={Estilo.header}>
        <Text style={Estilo.headerText}>Sintomas Diários</Text>
      </View>

      {/* Conteúdo */}
     <ScrollView style={Estilo.content}>

  <View style={Estilo.linhaTitulo}>
    <Text style={Estilo.labelLista}>Selecione seus sintomas:</Text>
    <Text style={Estilo.data}>Data: {dataAtual}</Text>
  </View>

  {sintomas.map((s, index) => (
    <View key={index} style={Estilo.item}>

      <TouchableOpacity 
        style={Estilo.checkboxArea}
        onPress={() => alternarSelecao(s.nome)}
      >
        <View style={Estilo.checkbox}>
          {selecionados.includes(s.nome) && <View style={Estilo.checkboxMarcado} />}
        </View>

        <Text style={Estilo.itemText}>{s.nome}</Text>
      </TouchableOpacity>

      {selecionados.includes(s.nome) && (
        <Text 
          style={[
            Estilo.acaoText,
            s.critico && Estilo.acaoCritica,
            s.positivo && Estilo.acaoPositiva,
            s.estavel && Estilo.acaoEstavel,
          ]}
        >
          {s.acao}
        </Text>
      )}

    </View>
  ))}

  {alerta && (
    <Text style={Estilo.alertaTexto}>
      ⚠️ Você selecionou vários sintomas. Procure atendimento imediatamente.</Text>
  )}

</ScrollView>
    </View>
  );
}

const Estilo = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    backgroundColor: '#37758a',
    paddingVertical: 20,
    alignItems: 'center',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    marginBottom: 10,
  },
  headerText: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: '700',
  },
  content: {
    padding: 20,
  },
  labelLista: {
    color: '#2b6b87',
    fontSize: 17,
    marginBottom: 10,
    fontWeight: '600',
  },
  item: {
    backgroundColor: '#d9e3e8',
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
  },
  itemText: {
    color: '#2b6b87',
    fontSize: 16,
    marginLeft: 10,
  },
  checkboxArea: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#2b6b87',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxMarcado: {
    width: 12,
    height: 12,
    backgroundColor: '#2b6b87',
    borderRadius: 3,
  },
  acaoText: {
    marginTop: 8,
    color: '#2b6b87',
    backgroundColor: '#ffffff',
    padding: 8,
    borderRadius: 8,
    fontSize: 18,
  },

  linhaTitulo: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 10,
},

data: {
  color: "#2b6b87",
  fontSize: 16,
  fontWeight: "600",
},

acaoCritica: {
  color: "red",
  fontWeight: "bold",
},

acaoPositiva: {
  color: "green",
  fontWeight: "bold",
},

acaoEstavel: {
  color: "blue",
  fontWeight: "bold",
},

alertaTexto: {
  marginTop: 20,
  padding: 15,
  backgroundColor: "#ffdddd",
  borderLeftWidth: 6,
  borderLeftColor: "red",
  color: "red",
  fontWeight: "bold",
  borderRadius: 8,
  fontSize: 16,
},


});

