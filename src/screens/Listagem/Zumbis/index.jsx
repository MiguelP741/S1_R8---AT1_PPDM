import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Image, ActivityIndicator, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import api from "../../../api/api";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ListScreenZumbis() {

    const navigation = useNavigation();

    const [zumbis, setZumbis] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        carregarZumbis();
    }, []);

    async function carregarZumbis() {

        try {

            const response = await api.get("/zombies");

            const nomes = response.data;

            const respostas = await Promise.all(
                nomes.map((nome) =>
                    api.get(`/zombies/${encodeURIComponent(nome)}`)
                )
            );

            const dados = respostas.map(
                (resposta) => resposta.data
            );

            setZumbis(dados);

        } catch (error) {

            console.log("Erro ao carregar zumbis:", error);

        } finally {

            setLoading(false);

        }
    }

    if (loading) {

        return (
            <SafeAreaView style={styles.safeArea}>

                <View style={styles.loading}>

                    <ActivityIndicator
                        size="large"
                        color="#8E5BB7"
                    />

                    <Text style={styles.loadingText}>
                        Carregando zumbis...
                    </Text>

                </View>

            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.safeArea}>

            <View style={styles.header}>

                <Text
                    style={styles.voltar}
                    onPress={() => navigation.goBack()}
                >
                    ← Voltar
                </Text>

                <Text style={styles.titulo}>
                    🧟 Zumbis
                </Text>

            </View>

            <View style={styles.container}>

                <FlatList
                    key="duas-colunas"
                    data={zumbis}
                    keyExtractor={(item) => item.name}
                    numColumns={2}
                    columnWrapperStyle={styles.row}
                    contentContainerStyle={styles.list}

                    renderItem={({ item }) => (

                        <TouchableOpacity
                            style={styles.card}
                            activeOpacity={0.8}
                            onPress={() =>
                                navigation.navigate("DetalhesScreen", {
                                    personagem: item
                                })
                            }
                        >

                            <Image
                                source={{
                                    uri: `https://pvz-2-api.vercel.app${item.image}`,
                                }}
                                style={styles.image}
                                resizeMode="contain"
                            />

                            <Text style={styles.name}>
                                {item.name}
                            </Text>

                        </TouchableOpacity>

                    )}
                />

            </View>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({

    safeArea: {
        flex: 1,
        backgroundColor: "#4B3263",
    },

    container: {
        flex: 1,
        backgroundColor: "#4B3263",
        padding: 10,
    },

    list: {
        paddingBottom: 10,
    },

    row: {
        justifyContent: "space-between",
    },

    card: {
        width: "48%",
        aspectRatio: 1,
        backgroundColor: "#D9D0E0",
        borderRadius: 15,
        marginBottom: 12,
        padding: 10,
        alignItems: "center",
        justifyContent: "space-between",
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },

    image: {
        width: "85%",
        height: "75%",
    },

    name: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#422653",
        textAlign: "center",
        textShadowColor: "#FFFFFF",
        textShadowOffset: {
            width: 1,
            height: 1,
        },
        textShadowRadius: 1,
        marginBottom: 3,
    },

    loading: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#4B3263",
    },

    loadingText: {
        marginTop: 10,
        color: "#FFFFFF",
        fontSize: 16,
    },

    header: {
        backgroundColor: "#4B3263",
        paddingHorizontal: 15,
        paddingTop: 8,
        paddingBottom: 12,
    },

    voltar: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 8,
    },

    titulo: {
        color: "#FFFFFF",
        fontSize: 22,
        fontWeight: "bold",
    },

});
