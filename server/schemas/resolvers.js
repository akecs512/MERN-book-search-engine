const { User, Book } = require("../models");
const { AuthenticationError } = require("../utils/auth");

const resolvers = {
    Query: {
       me: async (parent, args, context) => {
              if (context.user) {
                return User.findOne({ _id: context.user._id })
                .populate("books");
              }
              throw new AuthenticationError("Not logged in");
         }
        },
    
    Mutation: {
        login: async (parent, { email, password }) => {
            const user = await user.isCorrectPassword(password);

            if (!correctPW) {
                throw new AuthenticationError;
            }
            const token = signToken(user);
            return { token, user };
        },
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return { token, user };
        },
        saveBook: async (parent, { bookData }, context) => {
            if (context.user) {
                const updateUser = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $push: { savedBooks: bookData } },
                    { new: true }
                );
                return updateUser;
            }
            throw new AuthenticationError("You need to be logged in!");
        },
        removeBook: async (parent, { bookId }, context) => {
            if (context.user) {
                const updateUser = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedBooks: {bookId} } },
                    { new: true }
                );
                return updateUser;
            }
            throw new AuthenticationError("You need to be logged in!");
            }








}
}


module.exports = resolvers;
