export const recoverPath = {
  post: {
    tags: ['Auth'],
    summary: 'API para enviar email de recuperação de senha',
    description: 'Essa rota pode ser executada por **qualquer usuário**',
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/recoverParams'
          }
        }
      }
    },
    responses: {
      204: {
        $ref: '#/components/noContent'
      },
      400: {
        $ref: '#/components/badRequest'
      },
      500: {
        $ref: '#/components/serverError'
      }
    }
  }
}
