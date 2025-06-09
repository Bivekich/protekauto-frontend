import { ApolloClient, InMemoryCache, createHttpLink, FetchPolicy } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

const graphqlUri = process.env.NEXT_PUBLIC_CMS_GRAPHQL_URL || 'http://localhost:3000/api/graphql';
console.log('Apollo Client: используется GraphQL URI:', graphqlUri);

const httpLink = createHttpLink({
  uri: graphqlUri,
})

const authLink = setContext((_, { headers }) => {
  // Получаем данные пользователя из localStorage только на клиенте
  let token = null;
  if (typeof window !== 'undefined') {
    const userData = localStorage.getItem('userData');
    console.log('Apollo Client: проверяем localStorage userData:', userData);
    
    if (userData) {
      try {
        const user = JSON.parse(userData);
        // Создаем токен в формате, который ожидает CMS
        token = `client_${user.id}`;
        console.log('Apollo Client: создан токен:', token);
        console.log('Apollo Client: user data:', user);
        console.log('Apollo Client: заголовки:', { authorization: `Bearer ${token}` });
      } catch (error) {
        console.error('Apollo Client: ошибка парсинга userData:', error);
        localStorage.removeItem('userData');
        localStorage.removeItem('authToken');
      }
    } else {
      console.log('Apollo Client: userData не найден в localStorage');
    }
  }
  
  return {
    headers: {
      ...headers,
      ...(token && { authorization: `Bearer ${token}` }),
    }
  }
});

export const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      errorPolicy: 'all',
      fetchPolicy: 'no-cache', // Принудительная перезагрузка
    },
    query: {
      errorPolicy: 'all',
      fetchPolicy: 'no-cache', // Принудительная перезагрузка
    },
  },
})

// Принудительная очистка кэша при создании клиента
if (typeof window !== 'undefined') {
  apolloClient.clearStore().catch(console.error);
} 