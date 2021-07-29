import express, { request, response } from 'express';
import cors from 'cors';
import {ApolloServer, gql} from 'apollo-server-express';
import typeDefs from './graphql/typeDefs';
import resolvers from './graphql/resolvers';


async function startApolloServer() {

    const server = new ApolloServer({
        typeDefs,
        resolvers,
    });

    await server.start();

    const app = express();
    server.applyMiddleware({
        app,
        /*cors: {
            origin: 'http://localhost:8000',
        }*/
        bodyParserConfig: true,
    });

    const PORT = process.env.PORT ? parseInt(process.env.PORT) : 8000;
    const HOSTNAME = process.env.HOSTNAME || '127.0.0.1';

    await new Promise(resolve => app.listen({ port: PORT }, resolve));
    console.log(`🚀 Server ready at http://${HOSTNAME}:${PORT}${server.graphqlPath}`);
    return { server, app };
}

startApolloServer();
