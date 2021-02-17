import { GraphQLDateTime } from 'graphql-iso-date'
import { GraphQLScalarType } from 'graphql'

export default {
  DateTime: GraphQLDateTime,
  Void: new GraphQLScalarType({
    name: 'Void',
    description: 'Represents NULL values',
    serialize: () => null,
    parseValue: () => null,
    parseLiteral: () => null
  })
}
