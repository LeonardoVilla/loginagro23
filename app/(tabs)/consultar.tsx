import { SafeAreaView, StyleSheet, Text, View, FlatList } from "react-native";
import { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { supabase } from "../../src/supabaseClient";

type Usuario = {
    id: number;
    nome: string;
    senha: string;
};

export default function ConsultarContato() {
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [carregar, setCarregar] = useState(true);

    const carregarUsuarios = async () => {
        setCarregar(true);
        const { data, error } = await supabase
            .from("usuarios")
            .select("*")
            .order("id", { ascending: false });

        if (error) {
            console.error("Erro ao consultar dados: ", error.message);
            setUsuarios([]);
        } else {
            setUsuarios(data || []);
        }

        setCarregar(false);
    };

    useFocusEffect(useCallback(() => { carregarUsuarios(); }, []));

    const gerarItem = ({ item }: { item: Usuario }) => (
        <View style={styles.item}>
            <Text style={styles.nome}>{item.nome}</Text>
            <Text style={styles.senha}>{item.senha}</Text>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            {carregar ? (
                <View style={styles.mensagemContainer}>
                    <Text style={styles.mensagem}>Carregando dados...</Text>
                </View>
            ) : usuarios.length === 0 ? (
                <View style={styles.mensagemContainer}>
                    <Text style={styles.mensagem}>Nenhum contato encontrado</Text>
                </View>
            ) : (
                <FlatList
                    data={usuarios}
                    renderItem={gerarItem}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={{ paddingBottom: 20 }}
                />
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 20,
    },
    item: {
        backgroundColor: "#f9f9f9",
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: "#ddd",
    },
    nome: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
    },
    senha: {
        fontSize: 14,
        color: "#666",
        marginTop: 5,
    },
    mensagemContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    mensagem: {
        fontSize: 16,
        color: "#999",
    },
});
