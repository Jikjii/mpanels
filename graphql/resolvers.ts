export const resolvers = {
  Query: {
    panels: (_parent, _args, ctx) => {
      return ctx.prisma.link.findMany();
    },
  },
};
