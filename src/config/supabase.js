// Configuração do Supabase
// Credenciais do projeto Supabase
const SUPABASE_URL = 'https://pxqnrrejgjuhtlgarwbf.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB4cW5ycmVqZ2p1aHRsZ2Fyd2JmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA3NzI5MjEsImV4cCI6MjA2NjM0ODkyMX0.-VWCzAvmJdrHXAlfi7Ppb2VaSAsP0xRBMOMlnZ2ZOtM'

// Verificar se as credenciais foram configuradas
const isConfigured = SUPABASE_URL !== 'YOUR_SUPABASE_URL' && SUPABASE_ANON_KEY !== 'YOUR_SUPABASE_ANON_KEY';

if (!isConfigured) {
    console.warn('⚠️ Supabase não configurado. Configure as credenciais em src/config/supabase.js');
}

// Cliente Supabase
let supabaseClient = null;

// Função para obter o cliente Supabase
const getSupabaseClient = () => {
    if (!isConfigured) {
        return null;
    }

    if (!supabaseClient && window.supabase) {
        try {
            supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
            console.log('✅ Supabase configurado com sucesso');
        } catch (error) {
            console.error('❌ Erro ao configurar Supabase:', error);
            return null;
        }
    }

    return supabaseClient;
};

// Aguardar o carregamento do Supabase
const waitForSupabase = () => {
    return new Promise((resolve) => {
        if (window.supabase) {
            resolve();
        } else {
            const checkSupabase = () => {
                if (window.supabase) {
                    resolve();
                } else {
                    setTimeout(checkSupabase, 100);
                }
            };
            checkSupabase();
        }
    });
};

// Exportar cliente
export { supabaseClient as supabase };

// Função para verificar se o usuário está autenticado
export const isAuthenticated = async () => {
    await waitForSupabase();
    const client = getSupabaseClient();
    if (!client) {
        console.warn('Supabase não configurado');
        return false;
    }

    try {
        const { data: { user } } = await client.auth.getUser();
        return user !== null;
    } catch (error) {
        console.error('Erro ao verificar autenticação:', error);
        return false;
    }
}

// Função para fazer login
export const signIn = async (email, password) => {
    await waitForSupabase();
    const client = getSupabaseClient();
    if (!client) {
        throw new Error('Supabase não configurado. Configure as credenciais em src/config/supabase.js');
    }

    const { data, error } = await client.auth.signInWithPassword({
        email: email,
        password: password
    });

    if (error) {
        throw error;
    }

    return data;
}

// Função para fazer logout
export const signOut = async () => {
    await waitForSupabase();
    const client = getSupabaseClient();
    if (!client) {
        throw new Error('Supabase não configurado');
    }

    const { error } = await client.auth.signOut();
    if (error) {
        throw error;
    }
}

// Função para verificar sessão atual
export const getCurrentUser = async () => {
    await waitForSupabase();
    const client = getSupabaseClient();
    if (!client) {
        return null;
    }

    try {
        const { data: { user } } = await client.auth.getUser();
        return user;
    } catch (error) {
        console.error('Erro ao obter usuário atual:', error);
        return null;
    }
}

// Listener para mudanças no estado de autenticação
export const onAuthStateChange = async (callback) => {
    await waitForSupabase();
    const client = getSupabaseClient();
    if (!client) {
        console.warn('Supabase não configurado - listener de autenticação não ativo');
        return () => { }; // Retorna função vazia para cleanup
    }

    return client.auth.onAuthStateChange(callback);
}
