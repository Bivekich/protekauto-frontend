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

// Создаём кэш с правильными настройками
const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        // Кэшируем изображения по artId
        partsAPIMainImage: {
          keyArgs: ['artId'],
        },
        // Кэшируем статьи по параметрам категории
        partsAPIArticles: {
          keyArgs: ['strId', 'carId', 'carType'],
        },
        // Кэшируем избранное
        favorites: {
          merge(existing = [], incoming: any[]) {
            return incoming;
          }
        }
      },
    },
    Mutation: {
      fields: {
        addToFavorites: {
          merge: false,
        },
        removeFromFavorites: {
          merge: false,
        },
        clearFavorites: {
          merge: false,
        }
      }
    }
  },
});

export const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
  defaultOptions: {
    watchQuery: {
      errorPolicy: 'all',
      fetchPolicy: 'cache-first', // Сначала ищем в кэше
    },
    query: {
      errorPolicy: 'all',
      fetchPolicy: 'cache-first', // Сначала ищем в кэше
    },
  },
})

// Очищаем кэш только в режиме разработки при первой загрузке
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  // Очищаем кэш только один раз при первой загрузке страницы
  const cacheCleared = sessionStorage.getItem('apollo-cache-cleared');
  if (!cacheCleared) {
    apolloClient.clearStore().catch(console.error);
    sessionStorage.setItem('apollo-cache-cleared', 'true');
    console.log('Apollo Client: очистка кэша в режиме разработки');
  }
} 