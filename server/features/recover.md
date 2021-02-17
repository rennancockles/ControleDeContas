# Recuperar Senha

> ## Caso de sucesso

1. ✅ Recebe uma requisição do tipo **POST**
2. ✅ Valida dado obrigatório **email**
3. ✅ Valida que o campo **email** é um e-mail válido
4. ✅ **Busca** o usuário com o email informado
5. ✅ **Envia** um email com link para recuperar senha para o endereço informado caso o usuário exista
6. ✅ Retorna **204** 

> ## Exceções

1. ✅ Retorna erro **404** se a API não existir
2. ✅ Retorna erro **400** se email não for fornecido pelo cliente
3. ✅ Retorna erro **400** se o campo email for um e-mail inválido
4. ✅ Retorna erro **500** se der erro ao enviar o email
