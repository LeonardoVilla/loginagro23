import {
    SafeAreaView,
    Text,
    TouchableOpacity,
    StyleSheet,
    TextInput,
    View,
} from 'react-native';

import { useState } from "react";
import { supabase } from "../../src/supabaseClient";
import Toast from "react-native-toast-message";

export default function App() {

    const [textUsuario, setUsuario] = useState('');
    const [textSenha, setSenha] = useState('');

    const dados = {
        usuario: textUsuario,
        senha: textSenha,
    }

    const enviarDados = async () => {
        const { data, error } = await supabase
            .from('usuarios')
            .insert([{ nome: dados.usuario, senha: dados.senha }])
            .select();

        if (error) {
            Toast.show({
                type: "error",
                text1: "Erro!",
                text2: "Erro ao cadastrar",
            });
        } else {
            Toast.show({
                type: "success",
                text1: "Sucesso!",
                text2: "Usuário gravado com sucesso!",
            });
            setUsuario("");
            setSenha("");
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.titulo}>Cadastro de Tipo de Usuário</Text>

            <TextInput
                style={styles.campoTexto}
                value={textUsuario}
                onChangeText={setUsuario}
                placeholder='Informe seu Usuário'
                placeholderTextColor="#888"
                autoFocus
            />

            <TextInput
                style={styles.campoTexto}
                value={textSenha}
                onChangeText={setSenha}
                placeholder='Informe sua Senha'
                placeholderTextColor="#888"
                secureTextEntry
            />

            <TouchableOpacity style={styles.botao} onPress={enviarDados}>
                <Text style={styles.botaoTexto}>Cadastrar Usuário</Text>
            </TouchableOpacity>

            <Toast />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    titulo: {
        fontSize: 36,
        fontWeight: 'bold',
        marginBottom: 40,
        textAlign: 'center',
        color: '#000',
    },
    campoTexto: {
        backgroundColor: '#f5f5f5',
        color: '#000',
        width: '100%',
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 20,
        paddingHorizontal: 15,
        fontSize: 16,
    },
    botao: {
        backgroundColor: '#21468c',
        width: '60%',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10,
    },
    botaoTexto: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },
});