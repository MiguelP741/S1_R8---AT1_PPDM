import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Image, ActivityIndicator, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import api from "../../../api/api";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ListScreenPlantas() {

    const navigation = useNavigation();

    const [plantas, setPlantas] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        carregarPlantas();
    }, []);

    async function carregarPlantas() {

        try {

            const response = await api.get("/plants");

            const nomes = response.data;

            const respostas = await Promise.all(
                nomes.map((nome) =>
                    api.get(`/plants/${encodeURIComponent(nome)}`)
                )
            );

            const dados = respostas.map(
                (resposta) => resposta.data
            );

            setPlantas(dados);

        } catch (error) {

            console.log("Erro ao carregar plantas:", error);

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
                        color="#4F8A3D"
                    />

                    <Text style={styles.loadingText}>
                        Carregando plantas...
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
                    🌱 Plantas
                </Text>

            </View>

            <View style={styles.container}>

                <FlatList
                    key="duas-colunas"
                    data={plantas}
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
        backgroundColor: "#49683F",
    },

    container: {
        flex: 1,
        backgroundColor: "#49683F",
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
        backgroundColor: "#D7DFD5",
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
        color: "#263B25",
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
        backgroundColor: "#49683F",
    },

    loadingText: {
        marginTop: 10,
        color: "#FFFFFF",
        fontSize: 16,
    },

    header: {
        backgroundColor: "#49683F",
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