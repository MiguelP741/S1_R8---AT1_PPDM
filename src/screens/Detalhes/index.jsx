import React from "react";
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DetalhesScreen() {
    
    const navigation = useNavigation();
    const route = useRoute();
    
    const personagem = route.params?.personagem;
    
    let text = "Personagem não encontrado.";
    
    if (personagem) {
        text = "Informações do personagem:";
    }
    
    function formatarNome(nome) {
    
        return nome
            .replace(/_/g, " ")
            .replace(/\b\w/g, letra => letra.toUpperCase());
    
    }
    
    function formatarValor(valor) {
    
        if (valor === null || valor === undefined) {
            return "Não informado";
        }
    
        if (typeof valor === "object") {
            return JSON.stringify(valor);
        }
    
        return String(valor);
    
    }

    return (
        <SafeAreaView style={styles.safeArea}>

            <View style={styles.header}>

                <Text
                    style={styles.voltar}
                    onPress={() => navigation.goBack()}
                >
                    Voltar
                </Text>

                <Text style={styles.titulo}>
                    Detalhes
                </Text>

            </View>

            <ScrollView>

                <View style={styles.container}>

                    {personagem ? (

                        <View>

                            <Text style={styles.name}>
                                {personagem.name}
                            </Text>

                            <View style={styles.imageContainer}>

                                <Image
                                    source={{
                                        uri: `https://pvz-2-api.vercel.app${personagem.image}`,
                                    }}
                                    style={styles.image}
                                    resizeMode="contain"
                                />

                            </View>

                            <Text style={styles.paragraph}>
                                {text}
                            </Text>

                            {Object.entries(personagem).map(
                                ([chave, valor]) => {

                                    if (
                                        chave === "name" ||
                                        chave === "image"
                                    ) {
                                        return null;
                                    }

                                    return (
                                        <View
                                            key={chave}
                                            style={styles.info}
                                        >

                                            <Text style={styles.label}>
                                                {formatarNome(chave)}:
                                            </Text>

                                            <Text style={styles.value}>
                                                {formatarValor(valor)}
                                            </Text>

                                        </View>
                                    );
                                }
                            )}

                        </View>

                    ) : (

                        <Text style={styles.paragraph}>
                            {text}
                        </Text>

                    )}

                </View>

            </ScrollView>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({

    safeArea: {
        flex: 1,
        backgroundColor: "#6B4636",
    },

    container: {
        flex: 1,
        padding: 15,
    },

    header: {
        backgroundColor: "#4a3025",
        paddingHorizontal: 15,
        paddingTop: 8,
        paddingBottom: 12,
    },

    voltar: {
        color: "#c24a4a",
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 8,
    },

    titulo: {
        color: "#FFFFFF",
        fontSize: 22,
        fontWeight: "bold",
    },

    name: {
        color: "#FFFFFF",
        fontSize: 26,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 15,
    },

    imageContainer: {
        width: "100%",
        height: 220,
        backgroundColor: "#915239",
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 15,
    },

    image: {
        width: "90%",
        height: "90%",
    },

    paragraph: {
        color: "#FFFFFF",
        fontSize: 16,
        marginBottom: 10,
    },

    info: {
        backgroundColor: "#D8C1B7",
        borderRadius: 10,
        padding: 12,
        marginBottom: 8,
    },

    label: {
        color: "#70402E",
        fontSize: 15,
        fontWeight: "bold",
        marginBottom: 3,
    },

    value: {
        color: "#2F211C",
        fontSize: 16,
    },

});

