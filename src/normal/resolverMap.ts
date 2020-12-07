import { IResolvers } from 'graphql-tools'

const resolverMap: IResolvers = {
  Query: {
    helloWorld(_: void, args: void): string {
      return 'hello world';
    }
  }
}

export default resolverMap;
