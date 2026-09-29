import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const options = [
    {
        title: "🌱 PLANTAS",
        route: "ListScreenPlantas",
        style: "botaoPlantas",
    },
    {
        title: "🧟 ZUMBIS",
        route: "ListScreenZumbis",
        style: "botaoZumbis",
    },
];

export default function HomeScreen() {
    const navigation = useNavigation();

    return (
        <ImageBackground
            source={require("../../../assets/632054916_834722026281522_6824342774948341255_n.jpg")}
            style={styles.background}
            resizeMode="cover"
        >
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.container}>

                    <Image
                        source={require("../../../assets/999ba052-6bf6-4929-8684-fa47d47024c8.png")}
                        style={styles.logo}
                        resizeMode="contain"
                    />

                    <Text style={styles.titulo}>
                        Almanac Plants vs. Zombies
                    </Text>

                    <Text style={styles.descricao}>
                        Explore personagens de Plants vs. Zombies 2,
                        descubra suas características principais!
                    </Text>

                    <View style={styles.lista}>
                        {options.map((option) => (
                            <TouchableOpacity
                                key={option.route}
                                activeOpacity={0.8}
                                style={[
                                    styles.botao,
                                    styles[option.style],
                                ]}
                                onPress={() =>
                                    navigation.navigate(option.route)
                                }
                            >
                                <Text style={styles.botaoTexto}>
                                    {option.title}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                </View>
            </SafeAreaView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
    },

    safeArea: {
        flex: 1,
    },

    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 25,
    },

    logo: {
        width: "100%",
        height: 220,
        marginBottom: 10,
    },

    titulo: {
        color: "#E8F5B8",
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 10,

        textShadowColor: "#263B25",
        textShadowOffset: {
            width: 2,
            height: 3,
        },
        textShadowRadius: 2,
    },

    descricao: {
        color: "#D7DFD5",
        fontSize: 16,
        fontWeight: "500",
        textAlign: "center",
        lineHeight: 23,
        marginBottom: 30,

        textShadowColor: "#263652",
        textShadowOffset: {
            width: 1,
            height: 2,
        },
        textShadowRadius: 2,
    },

    lista: {
        width: "100%",
        gap: 8,
    },

    botao: {
        width: "90%",
        alignSelf: "center",

        paddingVertical: 18,
        borderRadius: 12,

        alignItems: "center",

        elevation: 6,

        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.35,
        shadowRadius: 4,
    },

    botaoPlantas: {
        backgroundColor: "#4F8A3D",
    },

    botaoZumbis: {
        backgroundColor: "#69418C",
    },

    botaoTexto: {
        color: "#FFFFFF",
        fontSize: 20,
        fontWeight: "bold",

        textShadowColor: "#253025",
        textShadowOffset: {
            width: 1,
            height: 2,
        },
        textShadowRadius: 2,
    },
});