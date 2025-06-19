import { gql } from '@apollo/client';

// Queries
export const GET_USER_VEHICLES = gql`
  query GetUserVehicles {
    userVehicles {
      id
      name
      vin
      frame
      licensePlate
      brand
      model
      modification
      year
      mileage
      comment
      createdAt
      updatedAt
    }
  }
`;

export const GET_VEHICLE_SEARCH_HISTORY = gql`
  query GetVehicleSearchHistory {
    vehicleSearchHistory {
      id
      vin
      brand
      model
      searchDate
      searchQuery
    }
  }
`;

export const SEARCH_VEHICLE_BY_VIN = gql`
  query SearchVehicleByVin($vin: String!) {
    searchVehicleByVin(vin: $vin) {
      vin
      brand
      model
      modification
      year
      bodyType
      engine
      transmission
      drive
      fuel
    }
  }
`;

// Mutations
export const CREATE_USER_VEHICLE = gql`
  mutation CreateUserVehicle($input: UserVehicleInput!) {
    createUserVehicle(input: $input) {
      id
      name
      vin
      frame
      licensePlate
      brand
      model
      modification
      year
      mileage
      comment
      createdAt
    }
  }
`;

export const UPDATE_USER_VEHICLE = gql`
  mutation UpdateUserVehicle($id: ID!, $input: UserVehicleInput!) {
    updateUserVehicle(id: $id, input: $input) {
      id
      name
      vin
      frame
      licensePlate
      brand
      model
      modification
      year
      mileage
      comment
      updatedAt
    }
  }
`;

export const DELETE_USER_VEHICLE = gql`
  mutation DeleteUserVehicle($id: ID!) {
    deleteUserVehicle(id: $id)
  }
`;

export const ADD_VEHICLE_FROM_SEARCH = gql`
  mutation AddVehicleFromSearch($vin: String!, $comment: String) {
    addVehicleFromSearch(vin: $vin, comment: $comment) {
      id
      name
      vin
      brand
      model
      comment
      createdAt
    }
  }
`;

export const DELETE_SEARCH_HISTORY_ITEM = gql`
  mutation DeleteSearchHistoryItem($id: ID!) {
    deleteSearchHistoryItem(id: $id)
  }
`;

export const CREATE_VEHICLE_FROM_VIN = gql`
  mutation CreateVehicleFromVin($vin: String!, $comment: String) {
    createVehicleFromVin(vin: $vin, comment: $comment) {
      id
      name
      vin
      brand
      model
      modification
      year
      mileage
      comment
      createdAt
    }
  }
`;

// Types
export interface UserVehicle {
  id: string;
  name: string;
  vin?: string;
  frame?: string;
  licensePlate?: string;
  brand?: string;
  model?: string;
  modification?: string;
  year?: number;
  mileage?: number;
  comment?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface UserVehicleInput {
  name: string;
  vin?: string;
  frame?: string;
  licensePlate?: string;
  brand?: string;
  model?: string;
  modification?: string;
  year?: number;
  mileage?: number;
  comment?: string;
}

export interface VehicleSearchHistory {
  id: string;
  vin: string;
  brand?: string;
  model?: string;
  searchDate: string;
  searchQuery?: string;
}

export interface VehicleSearchResult {
  vin: string;
  brand?: string;
  model?: string;
  modification?: string;
  year?: number;
  bodyType?: string;
  engine?: string;
  transmission?: string;
  drive?: string;
  fuel?: string;
} 