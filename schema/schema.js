/* eslint-disable no-unused-vars */
const graphql = require('graphql');
const models = require('../models');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
} = graphql;
const TodoType = new GraphQLObjectType({
  name: 'Todo',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
  }),
});
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    todo: {
      type: TodoType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return models.todos.findOne({
          where: {
            id: args.id,
          },
        });
      },
    },
    todos: {
      type: new GraphQLList(TodoType),
      resolve(parent, args) {
        return models.todos.findAll();
      },
    },
  },
});
const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addTodo: {
      type: TodoType,
      args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        const todo = {
          title: args.title,
          description: args.description,
        };
        return models.todos.create(todo);// to get the data back as well after adding
      },
    },
    deleteTodo: {
      type: new GraphQLList(TodoType),
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      async resolve(parent, args) {
        await models.todos.destroy({
          where: {
            id: args.id,
          },
        });
        return models.todos.findAll();
      },
    },
    updateTodo: {
      type: TodoType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        title: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: new GraphQLNonNull(GraphQLString) },

      },
      async resolve(parent, args) {
        await models.todos.update({ title: args.title, description: args.description }, {
          where: {
            id: args.id,
          },
        });
        return models.todos.findOne({
          where: {
            id: args.id,
          },
        });
      },
    },
  },
});
module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
