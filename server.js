import express from 'express';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import bodyParser from 'body-parser';
import schema from './data/schema';
import cors from 'cors';
import passport from 'passport';

const GRAPHQL_PORT = 3000;

const graphQLServer = express();

//graphQLServer.use(passport.initialize());
graphQLServer.use(cors());
graphQLServer.use('/graphql', 
	bodyParser.json(), 
	graphqlExpress(req => {
		return { 
			schema,
			context: {
				authorization: req.header('authorization'),
			},
		}; 
	}),
);
graphQLServer.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

graphQLServer.listen(GRAPHQL_PORT, () =>
  console.log(
    `GraphiQL is now running on http://localhost:${GRAPHQL_PORT}/graphiql`
  )
);
