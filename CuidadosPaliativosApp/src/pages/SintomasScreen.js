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

  const alternarSelecao = (sintoma) => {
    if (sintoma === "Nenhum sintoma") {
      if (selecionados.includes("Nenhum sintoma")) {
        setSelecionados([]);
      } else {
        setSelecionados(["Nenhum sintoma"]);
      }
      return;
    }

    if (selecionados.includes("Nenhum sintoma")) {
      setSelecionados([sintoma]);
      return;
    }

    if (selecionados.includes(sintoma)) {
      setSelecionados(selecionados.filter(item => item !== sintoma));
    } else {
      setSelecionados([...selecionados, sintoma]);
    }
  };

  return (
    <View style={Estilo.container}>

    

      <ScrollView style={Estilo.content}>

        <Text style={Estilo.sectionTitle}>📋 Verificação de Sintomas Diários</Text>

        <View style={Estilo.card}>

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
                  {selecionados.includes(s.nome) && (
                    <View style={Estilo.checkboxMarcado} />
                  )}
                </View>

                <Text style={Estilo.itemText}>{s.nome}</Text>
              </TouchableOpacity>

              {/* AÇÃO SÓ APARECE SE NÃO HOUVER ALERTA */}
              {!alerta && selecionados.includes(s.nome) && (
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

        </View>

        {alerta && (
          <Text style={Estilo.alertaTexto}>
            ⚠️ Você selecionou vários sintomas. Procure atendimento imediatamente.
          </Text>
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
  },
  headerText: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: '700',
  },

  content: {
    padding: 20,
  },

  sectionTitle: {
    color: '#37758a',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 10,
  },

  card: {
    backgroundColor: '#d9e3e8',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
  },

  labelLista: {
    color: '#37758a',
    fontSize: 17,
    fontWeight: '600',
  },

  linhaTitulo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },

  data: {
    color: "#37758a",
    fontSize: 16,
    fontWeight: "600",
  },

  item: {
    backgroundColor: '#ffffff',
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#b6c4cc'
  },

  itemText: {
    color: '#37758a',
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
    borderColor: '#37758a',
    justifyContent: 'center',
    alignItems: 'center',
  },

  checkboxMarcado: {
    width: 12,
    height: 12,
    backgroundColor: '#37758a',
    borderRadius: 3,
  },

  acaoText: {
    marginTop: 8,
    color: '#2b6b87',
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 8,
    fontSize: 17,
    borderWidth: 1,
    borderColor: '#b6c4cc'
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
    color: "#1d4e89",
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
