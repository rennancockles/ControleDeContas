# Cadastro

> ## Caso de sucesso

1. Recebe uma requisição do tipo **POST**
2. Valida dados obrigatórios **name**, **lastName**, **birth**, **email**, **password** e **passwordConfirmation**
3. Valida que **password** e **passwordConfirmation** são iguais
4. Valida que o campo **email** é um e-mail válido
4. Valida que o campo **birth** é uma data válida
5. Valida se **já existe** um usuário com o email fornecido
6. Gera uma senha **criptografada** (essa senha não pode ser descriptografada)
7. **Cria** uma conta para o usuário com os dados informados, **substituindo** a senha pela senha criptografada
8. Gera um **token** de acesso a partir do ID do usuário
9. Retorna **200** com o token de acesso e o nome do usuário

> ## Exceções

1. Retorna erro **404** se a API não existir
2. Retorna erro **400** se name, lastName, birth, email, password ou passwordConfirmation não forem fornecidos pelo cliente
3. Retorna erro **400** se password e passwordConfirmation não forem iguais
4. Retorna erro **400** se o campo email for um e-mail inválido
5. Retorna erro **400** se o campo birth for uma data inválida
6. Retorna erro **409** se o email fornecido já estiver em uso
7. Retorna erro **500** se der erro ao tentar gerar uma senha criptografada
8. Retorna erro **500** se der erro ao tentar criar a conta do usuário
9. Retorna erro **500** se der erro ao tentar gerar o token de acesso