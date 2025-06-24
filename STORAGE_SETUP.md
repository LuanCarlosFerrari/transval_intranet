# Configuração do Supabase Storage

## ⚠️ PROBLEMA COMUM: Políticas RLS (Row Level Security)

O Supabase Storage requer configuração de políticas de segurança para funcionar. Por padrão, apenas usuários autenticados com as permissões corretas podem acessar buckets e arquivos.

## 🔧 Soluções:

### 1. **Criar Políticas RLS no Supabase Dashboard**

Acesse: https://supabase.com/dashboard/project/[SEU-PROJECT-ID]/storage/policies

#### Para Buckets (storage.buckets):
```sql
-- Política para listar buckets (usuários autenticados)
CREATE POLICY "Authenticated users can list buckets"
ON storage.buckets
FOR SELECT
TO authenticated
USING (true);
```

#### Para Objetos (storage.objects):
```sql
-- Política para listar arquivos (usuários autenticados)
CREATE POLICY "Authenticated users can list files"
ON storage.objects
FOR SELECT
TO authenticated
USING (true);

-- Política para download de arquivos (usuários autenticados)
CREATE POLICY "Authenticated users can download files"
ON storage.objects
FOR SELECT
TO authenticated
USING (true);
```

### 2. **Alternativa: Desabilitar RLS (NÃO RECOMENDADO PARA PRODUÇÃO)**

⚠️ **CUIDADO**: Isso torna os buckets públicos para todos!

```sql
-- Desabilitar RLS para buckets (cuidado!)
ALTER TABLE storage.buckets DISABLE ROW LEVEL SECURITY;

-- Desabilitar RLS para objetos (cuidado!)
ALTER TABLE storage.objects DISABLE ROW LEVEL SECURITY;
```

### 3. **Configuração Recomendada para Desenvolvimento**

#### Passo 1: Criar um bucket público
1. Vá para Storage → Buckets
2. Clique em "New bucket"
3. Nome: `documentos-publicos`
4. Marque "Public bucket" ✅
5. Clique em "Save"

#### Passo 2: Configurar políticas específicas
```sql
-- Política para bucket específico
CREATE POLICY "Allow authenticated read on documentos bucket"
ON storage.objects
FOR SELECT
TO authenticated
USING (bucket_id = 'documentos-publicos');
```

### 4. **Verificação de Permissões**

#### Testando no SQL Editor:
```sql
-- Verificar se as políticas existem
SELECT * FROM pg_policies WHERE tablename IN ('buckets', 'objects');

-- Testar listagem de buckets
SELECT * FROM storage.buckets;

-- Testar listagem de objetos
SELECT * FROM storage.objects LIMIT 10;
```

## 🚀 Passos para Configurar:

### 1. **Acesse o Supabase Dashboard**
- URL: https://supabase.com/dashboard
- Faça login com sua conta
- Selecione seu projeto

### 2. **Vá para Storage**
- Menu lateral → Storage → Buckets

### 3. **Crie um Bucket de Teste**
```
Nome: documentos-teste
Público: ✅ (marcar como público)
```

### 4. **Configure Políticas**
- Menu lateral → Storage → Policies
- Clique em "New Policy"
- Selecione "For full customization"

### 5. **Política para Buckets:**
```sql
Policy name: authenticated_list_buckets
Allowed operation: SELECT
Target roles: authenticated
USING expression: true
```

### 6. **Política para Objetos:**
```sql
Policy name: authenticated_list_objects
Allowed operation: SELECT
Target roles: authenticated
USING expression: true
```

### 7. **Teste a Configuração**
- Abra: `test-storage.html`
- Execute os testes automáticos
- Verifique se consegue listar buckets

## 📋 Script SQL Completo para Configuração Rápida:

```sql
-- Habilitar RLS (se não estiver habilitado)
ALTER TABLE storage.buckets ENABLE ROW LEVEL SECURITY;
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Política para listar buckets
CREATE POLICY "authenticated_users_list_buckets"
ON storage.buckets
FOR SELECT
TO authenticated
USING (true);

-- Política para listar objetos
CREATE POLICY "authenticated_users_list_objects"
ON storage.objects
FOR SELECT
TO authenticated
USING (true);

-- Política para download de objetos
CREATE POLICY "authenticated_users_download_objects"
ON storage.objects
FOR SELECT
TO authenticated
USING (true);
```

## 🔍 Debugging:

### Verificar Logs no Console:
1. Abra Developer Tools (F12)
2. Vá para Console
3. Procure por erros relacionados a:
   - `403 Forbidden`
   - `401 Unauthorized`
   - `RLS policy violation`

### Testar Manualmente:
```javascript
// No console do browser
const { data, error } = await supabaseClient.storage.listBuckets();
console.log('Buckets:', data);
console.log('Error:', error);
```

## ✅ Solução Rápida:

1. **Execute o arquivo de teste**: `test-storage.html`
2. **Se der erro 403/401**: Configure as políticas RLS
3. **Se não mostrar buckets**: Crie um bucket público de teste
4. **Se ainda não funcionar**: Verifique se o usuário está autenticado

## 📞 Próximos Passos:

1. Abra `test-storage.html` no browser
2. Verifique os logs detalhados
3. Configure as políticas conforme necessário
4. Teste novamente com `documents.html`
