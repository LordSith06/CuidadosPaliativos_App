import streamlit as st
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.neighbors import KNeighborsClassifier
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder

st.title("📊 Cuidados Paliativos")
st.write("Envie seu arquivo CSV para análise")

# Upload do CSV
arquivo = st.file_uploader("Selecione um arquivo CSV", type="csv")

if arquivo:
    dados = pd.read_csv(arquivo)
    st.subheader("Visualização dos dados")
    st.dataframe(dados)

    # Preencher valores ausentes
    dados = dados.fillna(dados.median(numeric_only=True))  # NaNs numéricos
    dados = dados.fillna(0)  # outros NaNs

    # Transformar colunas categóricas em numéricas
    for col in dados.select_dtypes(include='object').columns:
        le = LabelEncoder()
        dados[col] = le.fit_transform(dados[col].astype(str))

    # Medidas estatísticas
    st.subheader("Medidas Estatísticas")
    colunas_numericas = dados.select_dtypes(include="number").columns.tolist()

    if colunas_numericas:
        coluna = st.selectbox("Escolha uma coluna numérica para estatísticas:", colunas_numericas)
        st.write(f"**Mediana:** {dados[coluna].median()}")
        st.write(f"**Variância:** {dados[coluna].var()}")
        st.write(f"**Desvio Padrão:** {dados[coluna].std()}")

        # Histograma
        st.subheader(f"Histograma de {coluna}")
        plt.hist(dados[coluna], bins=20, color='skyblue', edgecolor='black')
        plt.title(f"Distribuição de {coluna}")
        st.pyplot(plt)
        plt.clf()

    # Modelo KNN
    st.subheader("Modelo Supervisionado – KNN")
    alvo = st.selectbox("Escolha a coluna alvo (classe):", dados.columns)

    if len(colunas_numericas) >= 2:
        X = dados[colunas_numericas]  # todas as colunas numéricas
        y = dados[alvo]

        # Treino/teste
        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=0.2, random_state=42
        )

        knn = KNeighborsClassifier(n_neighbors=3)
        knn.fit(X_train, y_train)

        # Predições para plot
        y_pred = knn.predict(X)

        st.subheader("Gráfico de KNN (2 primeiras colunas)")
        plt.figure(figsize=(6,4))
        for classe in y.unique():
            plt.scatter(
                X[y_pred == classe].iloc[:,0],
                X[y_pred == classe].iloc[:,1],
                label=classe
            )
        plt.xlabel(X.columns[0])
        plt.ylabel(X.columns[1])
        plt.title("Distribuição do KNN")
        plt.legend()
        st.pyplot(plt)
        plt.clf()

    else:
        st.warning("Precisa de pelo menos 2 colunas numéricas para o gráfico do KNN.")

else:
    st.info("Aguardando envio do arquivo CSV...")
