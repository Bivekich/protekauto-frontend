import { gql } from '@apollo/client'

export const GET_FAVORITES = gql`
  query GetFavorites {
    favorites {
      id
      clientId
      productId
      offerKey
      name
      brand
      article
      price
      currency
      image
      createdAt
    }
  }
`

export const ADD_TO_FAVORITES = gql`
  mutation AddToFavorites($input: FavoriteInput!) {
    addToFavorites(input: $input) {
      id
      clientId
      productId
      offerKey
      name
      brand
      article
      price
      currency
      image
      createdAt
    }
  }
`

export const REMOVE_FROM_FAVORITES = gql`
  mutation RemoveFromFavorites($id: ID!) {
    removeFromFavorites(id: $id)
  }
`

export const CLEAR_FAVORITES = gql`
  mutation ClearFavorites {
    clearFavorites
  }
` 