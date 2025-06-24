import { gql } from '@apollo/client';

// Запросы для поиска автомобиля
export const GET_LAXIMO_BRANDS = gql`
  query GetLaximoBrands {
    laximoBrands {
      code
      name
      brand
      icon
      supportdetailapplicability
      supportparameteridentification2
      supportquickgroups
      supportvinsearch
      supportframesearch
      vinexample
      frameexample
      features {
        name
        example
      }
    }
  }
`;

export const GET_LAXIMO_CATALOG_INFO = gql`
  query GetLaximoCatalogInfo($catalogCode: String!) {
    laximoCatalogInfo(catalogCode: $catalogCode) {
      code
      brand
      name
      features {
        name
        example
      }
    }
  }
`;

export const GET_LAXIMO_VEHICLE_INFO = gql`
  query GetLaximoVehicleInfo($catalogCode: String!, $vehicleId: String!, $ssd: String) {
    laximoVehicleInfo(catalogCode: $catalogCode, vehicleId: $vehicleId, ssd: $ssd) {
      vehicleid
      name
      ssd
      brand
      catalog
      attributes {
        key
        name
        value
      }
    }
  }
`;

// Запросы для поиска запчастей
export const GET_LAXIMO_CATEGORIES = gql`
  query GetLaximoCategories($catalogCode: String!, $vehicleId: String, $ssd: String) {
    laximoCategories(catalogCode: $catalogCode, vehicleId: $vehicleId, ssd: $ssd) {
      quickgroupid
      name
      link
      children {
        quickgroupid
        name
        link
        children {
          quickgroupid
          name
          link
        }
      }
    }
  }
`;

export const GET_LAXIMO_UNITS = gql`
  query GetLaximoUnits($catalogCode: String!, $vehicleId: String, $ssd: String, $categoryId: String) {
    laximoUnits(catalogCode: $catalogCode, vehicleId: $vehicleId, ssd: $ssd, categoryId: $categoryId) {
      quickgroupid
      name
      link
      code
      imageurl
      largeimageurl
      children {
        quickgroupid
        name
        link
        code
        imageurl
        largeimageurl
        children {
          quickgroupid
          name
          link
          code
          imageurl
          largeimageurl
        }
      }
    }
  }
`;

export const GET_LAXIMO_QUICK_GROUPS = gql`
  query GetLaximoQuickGroups($catalogCode: String!, $vehicleId: String!, $ssd: String) {
    laximoQuickGroups(catalogCode: $catalogCode, vehicleId: $vehicleId, ssd: $ssd) {
      quickgroupid
      name
      link
      children {
        quickgroupid
        name
        link
        children {
          quickgroupid
          name
          link
        }
      }
    }
  }
`;

export const GET_LAXIMO_QUICK_DETAIL = gql`
  query GetLaximoQuickDetail($catalogCode: String!, $vehicleId: String!, $quickGroupId: String!, $ssd: String!) {
    laximoQuickDetail(catalogCode: $catalogCode, vehicleId: $vehicleId, quickGroupId: $quickGroupId, ssd: $ssd) {
      quickgroupid
      name
      units {
        unitid
        name
        code
        imageurl
        largeimageurl
        details {
          detailid
          name
          oem
          formattedoem
          parttype
          filter
          note
          attributes {
            key
            name
            value
          }
        }
      }
    }
  }
`;

// Поиск по OEM и тексту
export const SEARCH_LAXIMO_OEM = gql`
  query SearchLaximoOEM($catalogCode: String!, $vehicleId: String!, $oemNumber: String!, $ssd: String!) {
    laximoOEMSearch(catalogCode: $catalogCode, vehicleId: $vehicleId, oemNumber: $oemNumber, ssd: $ssd) {
      categories {
        categoryid
        name
        units {
          unitid
          name
          details {
            codeonimage
            code
            name
            note
            filter
            oem
            price
            availability
          }
        }
      }
    }
  }
`;

export const SEARCH_LAXIMO_FULLTEXT = gql`
  query SearchLaximoFulltext($catalogCode: String!, $vehicleId: String!, $searchText: String!, $ssd: String!) {
    laximoFulltextSearch(catalogCode: $catalogCode, vehicleId: $vehicleId, searchText: $searchText, ssd: $ssd) {
      details {
        codeonimage
        code
        name
        note
        filter
        oem
        price
        availability
      }
    }
  }
`;

export const GET_LAXIMO_FULLTEXT_SEARCH = gql`
  query GetLaximoFulltextSearch($catalogCode: String!, $vehicleId: String!, $searchQuery: String!, $ssd: String!) {
    laximoFulltextSearch(catalogCode: $catalogCode, vehicleId: $vehicleId, searchQuery: $searchQuery, ssd: $ssd) {
      details {
        detailid
        name
        oem
        formattedoem
        parttype
        filter
        note
        attributes {
          key
          name
          value
        }
      }
    }
  }
`; 