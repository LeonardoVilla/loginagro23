//npm install @supabase/supabase-js
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from "@supabase/supabase-js";

//verifica qual plataforma esta em uso
import { Platform } from 'react-native';

//Lendo as variavis do .env
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

const supabasePublishableKey = supabaseAnonKey;

export const supabase = createClient(supabaseUrl, supabasePublishableKey, {
  auth: {
    // storage: typeof window !== "undefined" ? window.localStorage : undefined ,
    storage: Platform.OS === 'web' ? undefined : AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})
