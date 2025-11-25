import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Modal, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProntuarioScreen() {
  const BASE_URL = "http://10.136.133.229:3000/";
  const [selecionados, setSelecionados] = useState([]);
  const [alerta, setAlerta] = useState(false);
  const [modalSucesso, setModalSucesso] = useState(false);
  const [modalErro, setModalErro] = useState(false);
  const [loading, setLoading] = useState(false);
  

  const dataAtual = new Date().toISOString(); // formato ISO

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

  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  };

  const alternarSelecao = (sintoma) => {
    if (sintoma === "Nenhum sintoma") {
      setSelecionados(selecionados.includes("Nenhum sintoma") ? [] : ["Nenhum sintoma"]);
      return;
    }
    if (selecionados.includes("Nenhum sintoma")) {
      setSelecionados([sintoma]);
      return;
    }
    setSelecionados(selecionados.includes(sintoma)
      ? selecionados.filter(item => item !== sintoma)
      : [...selecionados, sintoma]);
  };

  const enviarProntuario = async () => {
    if (selecionados.length === 0) {
      setModalErro(true);
      return;
    }

    try {
      setLoading(true);

      const token = await AsyncStorage.getItem("TOKEN");
      if (!token) {
        setModalErro(true);
        return;
      }

      const decoded = parseJwt(token);
      if (!decoded || !decoded.id) {
        setModalErro(true);
        return;
      }

      const pacienteId = decoded.id;

      const res = await fetch(`${BASE_URL}prontuario`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          pacienteId,
          sintomas: selecionados.map(nome => {
            const s = sintomas.find(item => item.nome === nome);
            return { nome: s.nome, acao: s.acao };
          }),
          data: dataAtual
        })
      });

      const json = await res.json();

      if (!res.ok) {
        console.error(json);
        setModalErro(true);
      } else {
        setModalSucesso(true);
        setSelecionados([]);
      }

    } catch (error) {
      console.error(error);
      setModalErro(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={Estilo.container}>
      <ScrollView contentContainerStyle={Estilo.scrollContent} showsVerticalScrollIndicator={true}>
        <Text style={Estilo.sectionTitle}>😷 Verificação de Sintomas Diários</Text>

        <View style={Estilo.card}>
          <View style={Estilo.linhaTitulo}>
            <Text style={Estilo.labelLista}>Selecione seus sintomas:</Text>
            <Text style={Estilo.data}>Data: {new Date().toLocaleDateString("pt-BR")}</Text>
          </View>

          {sintomas.map((s, index) => (
            <View key={index} style={Estilo.item}>
              <TouchableOpacity style={Estilo.checkboxArea} onPress={() => alternarSelecao(s.nome)}>
                <View style={Estilo.checkbox}>
                  {selecionados.includes(s.nome) && <View style={Estilo.checkboxMarcado} />}
                </View>
                <Text style={Estilo.itemText}>{s.nome}</Text>
              </TouchableOpacity>

              {!alerta && selecionados.includes(s.nome) && (
                <Text style={[
                  Estilo.acaoText,
                  s.critico && Estilo.acaoCritica,
                  s.positivo && Estilo.acaoPositiva,
                  s.estavel && Estilo.acaoEstavel,
                ]}>
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

        <TouchableOpacity style={Estilo.btnEnviar} onPress={enviarProntuario} disabled={loading}>
          {loading ? <ActivityIndicator color="#fff" /> : <Text style={Estilo.txtEnviar}>Enviar Prontuário</Text>}
        </TouchableOpacity>

      </ScrollView>

      {/* Modal Sucesso */}
      <Modal animationType="fade" transparent visible={modalSucesso}>
        <View style={Estilo.modalOverlay}>
          <View style={[Estilo.modalContent, Estilo.modalSucessoBox]}>
            <Text style={Estilo.modalSucessoMessage}>Prontuário enviado com sucesso!</Text>
            <TouchableOpacity style={Estilo.modalButton} onPress={() => setModalSucesso(false)}>
              <Text style={Estilo.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal Erro */}
      <Modal animationType="fade" transparent visible={modalErro}>
        <View style={Estilo.modalOverlay}>
          <View style={[Estilo.modalContent, Estilo.modalErrorBox]}>
            <Text style={Estilo.modalTitle}>Atenção</Text>
            <Text style={Estilo.modalErrorMessage}>Selecione pelo menos um sintoma ou verifique sua autenticação.</Text>
            <TouchableOpacity style={Estilo.modalButton} onPress={() => setModalErro(false)}>
              <Text style={Estilo.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const Estilo = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#ffffff' 
  },

  scrollContent: { 
    padding: 20, 
    paddingBottom: 40, 
    flexGrow: 1 
  },

  sectionTitle: { 
    color: '#37758a', 
    fontSize: 18, 
    fontWeight: '700', 
    marginBottom: 12, 
    marginTop: 10 
  },

  card: { 
    backgroundColor: '#d9e3e8', 
    borderRadius: 15, 
    padding: 15, 
    marginBottom: 15 
  },

  labelLista: { 
    color: '#37758a', 
    fontSize: 17, 
    fontWeight: '600' 
  },

  linhaTitulo: { 
    flexDirection: "row", 
    justifyContent: "space-between", 
    alignItems: "center", 
    marginBottom: 10 
  },

  data: { 
    color: "#37758a", 
    fontSize: 16, 
    fontWeight: "600" 
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
    marginLeft: 10 
  },

  checkboxArea: { 
    flexDirection: 'row', 
    alignItems: 'center' 
  },

  checkbox: { 
    width: 22, 
    height: 22, 
    borderRadius: 6, 
    borderWidth: 2, 
    borderColor: '#37758a', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },

  checkboxMarcado: { 
    width: 12, 
    height: 12, 
    backgroundColor: '#37758a', 
    borderRadius: 3 
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
    fontWeight: "bold" 
  },

  acaoPositiva: { 
    color: "green", 
    fontWeight: "bold" 
  },

  acaoEstavel: { 
    color: "#1d4e89", 
    fontWeight: "bold" 
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
    fontSize: 16 
  },

  btnEnviar: { 
    backgroundColor: '#37758a', 
    padding: 15, 
    borderRadius: 15, 
    alignItems: 'center', 
    marginTop: 10 
  },

  txtEnviar: { 
    color: '#ffffff', 
    fontSize: 18, 
    fontWeight: '700' 
  },

  modalOverlay: { 
    flex: 1, 
    backgroundColor: 'rgba(0,0,0,0.6)', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },

  modalContent: { 
    width: '80%', 
    borderRadius: 20, 
    padding: 25, 
    alignItems: 'center', 
    backgroundColor: '#fff' 
  },

  modalTitle: { 
    fontSize: 22, 
    fontWeight: '700', 
    color: '#37758a', 
    textAlign: 'center', 
    marginBottom: 15 
  },

  modalButton: { 
    backgroundColor: '#37758a', 
    borderRadius: 20, 
    paddingVertical: 10, 
    paddingHorizontal: 30, 
    marginTop: 10 
  },

  modalButtonText: { 
    color: '#fff', 
    fontSize: 16, 
    fontWeight: '700' 
  },

  modalErrorBox: { 
    backgroundColor: "#ffebee", 
    borderRadius: 20, 
    padding: 25, 
    alignItems: "center", 
    paddingTop: 25 
  },

  modalErrorMessage: { 
    fontSize: 17, 
    color: '#555', 
    textAlign: 'center', 
    marginBottom: 20 
  },

  modalSucessoBox: { 
    backgroundColor: "#e8f5e9", 
    borderRadius: 20, 
    padding: 25, 
    alignItems: "center", 
    paddingTop: 25 
  },

  modalSucessoMessage: { 
    fontSize: 18, 
    color: "#2e7d32", 
    textAlign: "center", 
    marginBottom: 20, 
    fontWeight: "600" 
  }
});
