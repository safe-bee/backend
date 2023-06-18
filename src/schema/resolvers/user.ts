const userResolvers = {
  Query: {
    users: async (parent, args, { models }, info) => {
      const users = await models.user.all();
      return users;
    },
  },
};

export default userResolvers;
