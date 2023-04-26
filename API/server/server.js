const express = require("express");
const fs = require("fs");
const app = express();
const { ApolloServer } = require("apollo-server-express");
const dbConnect = require("../db/db");
const employeeModel = require("../models/employee");
app.use(express.static("public"));
const enableCors = (process.env.ENABLE_CORS || "true") == "true";

const typdef_graphql = ``;

const resolvers = {
  Query: {
    employeeList: async () => {
      return employeeModel.find();
    },
    employeeById: async (_, { id }) => {
      return employeeModel.findById(id);
    },
  },
  Mutation: {
    addEmployee: async (_, { employee }) => {
      const addEmployee = new employeeModel(employee);
      await addEmployee.save();
      return addEmployee;
    },
    updateEmployee: async (_, { id, employee }) => {
      const updatedEmployee = await employeeModel.findByIdAndUpdate(
        id,
        employee,
        { new: true }
      );
      return updatedEmployee;
    },
    deleteEmployee: async (_, { id }) => {
      const deleteEmployee = await employeeModel.findByIdAndDelete(id);
      return deleteEmployee;
    },
  },
};

const server = new ApolloServer({
  typeDefs: fs.readFileSync("./server/qlschema", "utf-8"),
  resolvers,
});

server.start().then((res) => {
  server.applyMiddleware({ app, path: "/graphql", cors: enableCors });
  app.listen(3000, () => {
    dbConnect();
    console.log("now browse to http://localhost:3000" + server.graphqlPath);
  });
});
