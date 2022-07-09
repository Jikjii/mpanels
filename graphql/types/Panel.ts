// /graphql/types/Link.ts
import { objectType, extendType } from 'nexus'
import { User } from './User'

export const Panel = objectType({
  name: 'Panel',
  definition(t) {
    t.string('id')
    t.string('title')
    t.string('url')
    t.string('description')
    t.string('imageUrl')
    t.string('category')
    t.list.field('users', {
      type: User,
      async resolve(_parent, _args, ctx) {
        return await ctx.prisma.panel
          .findUnique({
            where: {
              id: _parent.id,
            },
          })
          .users()
      },
    })
  },
})

export const PanelsQuery = extendType({
    type: 'Query',
    definition(t) {
      t.nonNull.list.field('panels', {
        type: 'Panel',
        resolve(_parent, _args, ctx) {
          return ctx.prisma.panel.findMany()
        },
      })
    },
  })