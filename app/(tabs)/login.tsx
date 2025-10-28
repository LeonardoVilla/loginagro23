import {
    View, 
    Text, 
    StyleSheet,
    Button,
    TextInput
} from 'react-native';

import { supabase } from "../../src/supabaseClient";

//npm install react-native-toast-message
import Toast  from 'react-native-toast-message';

import { useState} from 'react';

export default function Login(){

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [mode, setModo] = useState('');

    const autenticar = async () => {

        Toast.show({
            type: 'success',
            text1: 'Sucesso!',
            text2: 'Login Efetuado com Sucesso!',
        })

    }

    return(
        <View style={ style.container}>

            <Text style={ style.titulo}>
                Login
            </Text>

            <TextInput
                style={ style.caixaTexto}
                placeholder="E-mail"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={ style.caixaTexto}
                placeholder="Senha"
                value={senha}
                secureTextEntry
                onChangeText={setSenha}
            />

            <View style={ style.botao}>
                <Button
                    title='Login'
                    onPress={autenticar}
                />
            </View>

            <Toast />

        </View>
    )
}
const style = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: "#b53434ff",
        justifyContent: "center",
        paddingHorizontal: 20
    },

    titulo:{
        fontSize:25,
        fontWeight: "bold",
        textAlign:"center",
        marginBottom: 15,
        color: "#fff",
    },

    caixaTexto: {
        backgroundColor: "#fafafaff",
        color: "#000",
        padding: 10,
        borderRadius:6,
        borderWidth:1,
        borderColor: "#CCC",
        marginBottom: 10,
    },

    botao: {
        marginTop: 10,
        borderRadius: 10,
        overflow: "hidden",
    }


});