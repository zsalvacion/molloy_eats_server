import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
import mocks from './mocks';
import resolvers from './resolvers';

const typeDefs = `

type Student {
  StudentID: Int
  StudentName: String
  StudentPhone: String
  StudentEmail: String
  Password: String
}

type Store {
  StoreID: Int
  StoreName: String
  StoreLocation: String
}

type Item {
  ItemID: Int
  ItemDescription: String
  StoreName: String
  Price: Int
}

type Order {
  OrderID: Int
  Price: Int
  Quantity: Int
  PaymentMethod: String
  StudentID: Int
  StoreName: String
  Time: String
  ItemID: Int
}

type AuthPayload {
  token: String
  user: String
}

type Query {
  getStudent(StudentName: String): [Student]
  getStore(StoreID: Int): [Store]
  getItem(ItemID: Int): [Item]
  getOrder(OrderID: Int): [Order]
}

type Mutation {
  createStudent(StudentName: String!, StudentPhone: String!): Student
  login(StudentName: String!, Password: String!): AuthPayload
  register(StudentName: String!, Password: String!): Student
  editStudentProfile(StudentPhone: String, StudentEmail: String): Student
}

schema {
  query: Query
  mutation: Mutation
}
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });

// addMockFunctionsToSchema({ schema, mocks });

export default schema;
