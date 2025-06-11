import { gql } from '@apollo/client'

export const CHECK_CLIENT_BY_PHONE = gql`
  mutation CheckClientByPhone($phone: String!) {
    checkClientByPhone(phone: $phone) {
      exists
      client {
        id
        clientNumber
        name
        phone
        email
      }
      sessionId
    }
  }
`

export const SEND_SMS_CODE = gql`
  mutation SendSMSCode($phone: String!, $sessionId: String) {
    sendSMSCode(phone: $phone, sessionId: $sessionId) {
      success
      sessionId
      code
    }
  }
`

export const VERIFY_CODE = gql`
  mutation VerifyCode($phone: String!, $code: String!, $sessionId: String!) {
    verifyCode(phone: $phone, code: $code, sessionId: $sessionId) {
      success
      client {
        id
        clientNumber
        name
        phone
        email
      }
      token
    }
  }
`

export const REGISTER_NEW_CLIENT = gql`
  mutation RegisterNewClient($phone: String!, $name: String!, $sessionId: String!) {
    registerNewClient(phone: $phone, name: $name, sessionId: $sessionId) {
      success
      client {
        id
        clientNumber
        name
        phone
        email
      }
      token
    }
  }
`

// Запросы для профиля пользователя
export const GET_CLIENT_ME = gql`
  query GetClientMe {
    clientMe {
      id
      name
      email
      phone
      emailNotifications
      smsNotifications
      pushNotifications
      legalEntities {
        id
        shortName
        fullName
        form
        legalAddress
        actualAddress
        taxSystem
        responsiblePhone
        responsiblePosition
        responsibleName
        accountant
        signatory
        registrationReasonCode
        ogrn
        inn
        vatPercent
        bankDetails {
          id
          name
          accountNumber
          bankName
          bik
          correspondentAccount
        }
      }
    }
  }
`

export const UPDATE_CLIENT_PERSONAL_DATA = gql`
  mutation UpdateClientMe($input: ClientInput!) {
    updateClientMe(input: $input) {
      id
      name
      email
      phone
      emailNotifications
      smsNotifications
      pushNotifications
    }
  }
`

export const CREATE_CLIENT_LEGAL_ENTITY = gql`
  mutation CreateClientLegalEntityMe($input: ClientLegalEntityInput!) {
    createClientLegalEntityMe(input: $input) {
      id
      shortName
      fullName
      form
      legalAddress
      actualAddress
      taxSystem
      responsiblePhone
      responsiblePosition
      responsibleName
      accountant
      signatory
      registrationReasonCode
      ogrn
      inn
      vatPercent
      bankDetails {
        id
        name
        accountNumber
        bankName
        bik
        correspondentAccount
      }
    }
  }
`

export const UPDATE_CLIENT_LEGAL_ENTITY = gql`
  mutation UpdateClientLegalEntity($id: ID!, $input: ClientLegalEntityInput!) {
    updateClientLegalEntity(id: $id, input: $input) {
      id
      shortName
      fullName
      form
      legalAddress
      actualAddress
      taxSystem
      responsiblePhone
      responsiblePosition
      responsibleName
      accountant
      signatory
      registrationReasonCode
      ogrn
      inn
      vatPercent
      bankDetails {
        id
        name
        accountNumber
        bankName
        bik
        correspondentAccount
      }
    }
  }
`

export const DELETE_CLIENT_LEGAL_ENTITY = gql`
  mutation DeleteClientLegalEntity($id: ID!) {
    deleteClientLegalEntity(id: $id)
  }
`

// Банковские реквизиты
export const CREATE_CLIENT_BANK_DETAILS = gql`
  mutation CreateClientBankDetails($legalEntityId: ID!, $input: ClientBankDetailsInput!) {
    createClientBankDetails(legalEntityId: $legalEntityId, input: $input) {
      id
      legalEntityId
      name
      accountNumber
      bankName
      bik
      correspondentAccount
      legalEntity {
        id
        shortName
        inn
      }
    }
  }
`

export const UPDATE_CLIENT_BANK_DETAILS = gql`
  mutation UpdateClientBankDetails($id: ID!, $input: ClientBankDetailsInput!) {
    updateClientBankDetails(id: $id, input: $input) {
      id
      legalEntityId
      name
      accountNumber
      bankName
      bik
      correspondentAccount
      legalEntity {
        id
        shortName
        inn
      }
    }
  }
`

export const DELETE_CLIENT_BANK_DETAILS = gql`
  mutation DeleteClientBankDetails($id: ID!) {
    deleteClientBankDetails(id: $id)
  }
`

// Laximo интеграция
export const GET_LAXIMO_BRANDS = gql`
  query GetLaximoBrands {
    laximoBrands {
      brand
      code
      icon
      name
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
      extensions {
        operations {
          description
          kind
          name
          fields {
            description
            example
            name
            pattern
          }
        }
      }
    }
  }
`

// Новые запросы для поиска автомобилей
export const GET_LAXIMO_CATALOG_INFO = gql`
  query GetLaximoCatalogInfo($catalogCode: String!) {
    laximoCatalogInfo(catalogCode: $catalogCode) {
      brand
      code
      icon
      name
      supportdetailapplicability
      supportparameteridentification2
      supportquickgroups
      supportvinsearch
      vinexample
      features {
        name
        example
      }
      permissions
    }
  }
`

export const GET_LAXIMO_WIZARD2 = gql`
  query GetLaximoWizard2($catalogCode: String!, $ssd: String) {
    laximoWizard2(catalogCode: $catalogCode, ssd: $ssd) {
      allowlistvehicles
      automatic
      conditionid
      determined
      name
      type
      options {
        key
        value
      }
    }
  }
`

export const FIND_LAXIMO_VEHICLE = gql`
  query FindLaximoVehicle($catalogCode: String!, $vin: String!) {
    laximoFindVehicle(catalogCode: $catalogCode, vin: $vin) {
      vehicleid
      name
      brand
      catalog
      model
      modification
      year
      bodytype
      engine
      notes
      ssd
    }
  }
`;

export const FIND_LAXIMO_VEHICLE_BY_WIZARD = gql`
  query FindLaximoVehicleByWizard($catalogCode: String!, $ssd: String!) {
    laximoFindVehicleByWizard(catalogCode: $catalogCode, ssd: $ssd) {
      vehicleid
      brand
      model
      modification
      year
      bodytype
      engine
      notes
      ssd
    }
  }
`;

export const FIND_LAXIMO_VEHICLE_BY_PLATE = gql`
  query FindLaximoVehicleByPlate($catalogCode: String!, $plateNumber: String!) {
    laximoFindVehicleByPlate(catalogCode: $catalogCode, plateNumber: $plateNumber) {
      vehicleid
      brand
      model
      modification
      year
      bodytype
      engine
      notes
      ssd
    }
  }
`;

export const FIND_LAXIMO_PART_REFERENCES = gql`
  query FindLaximoPartReferences($partNumber: String!) {
    laximoFindPartReferences(partNumber: $partNumber)
  }
`;

export const FIND_LAXIMO_APPLICABLE_VEHICLES = gql`
  query FindLaximoApplicableVehicles($catalogCode: String!, $partNumber: String!) {
    laximoFindApplicableVehicles(catalogCode: $catalogCode, partNumber: $partNumber) {
      vehicleid
      brand
      model
      modification
      year
      bodytype
      engine
      notes
      ssd
    }
  }
`;

export const GET_LAXIMO_VEHICLE_INFO = gql`
  query GetLaximoVehicleInfo($catalogCode: String!, $vehicleId: String!, $ssd: String, $localized: Boolean!) {
    laximoVehicleInfo(catalogCode: $catalogCode, vehicleId: $vehicleId, ssd: $ssd, localized: $localized) {
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
`

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
`

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
`

export const GET_LAXIMO_UNITS = gql`
  query GetLaximoUnits($catalogCode: String!, $vehicleId: String, $ssd: String) {
    laximoUnits(catalogCode: $catalogCode, vehicleId: $vehicleId, ssd: $ssd) {
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
`

export const GET_LAXIMO_QUICK_DETAIL = gql`
  query GetLaximoQuickDetail($catalogCode: String!, $vehicleId: String!, $quickGroupId: String!, $ssd: String!) {
    laximoQuickDetail(catalogCode: $catalogCode, vehicleId: $vehicleId, quickGroupId: $quickGroupId, ssd: $ssd) {
      quickgroupid
      name
      units {
        unitid
        name
        code
        description
        details {
          detailid
          name
          oem
          brand
          description
          applicablemodels
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
`

export const SEARCH_LAXIMO_OEM = gql`
  query SearchLaximoOEM($catalogCode: String!, $vehicleId: String!, $oemNumber: String!, $ssd: String!) {
    laximoOEMSearch(catalogCode: $catalogCode, vehicleId: $vehicleId, oemNumber: $oemNumber, ssd: $ssd) {
      oemNumber
      categories {
        categoryid
        name
        units {
          unitid
          name
          code
          imageurl
          details {
            detailid
            name
            oem
            brand
            amount
            range
            attributes {
              key
              name
              value
            }
          }
        }
      }
    }
  }
`

export const SEARCH_LAXIMO_FULLTEXT = gql`
  query SearchLaximoFulltext($catalogCode: String!, $vehicleId: String!, $searchQuery: String!, $ssd: String!) {
    laximoFulltextSearch(catalogCode: $catalogCode, vehicleId: $vehicleId, searchQuery: $searchQuery, ssd: $ssd) {
      searchQuery
      details {
        oem
        name
        brand
        description
      }
    }
  }
`

export const TEST_LAXIMO_OEM = gql`
  query TestLaximoOEM($catalogCode: String!, $vehicleId: String!, $oemNumber: String!, $ssd: String!) {
    laximoOEMSearch(catalogCode: $catalogCode, vehicleId: $vehicleId, oemNumber: $oemNumber, ssd: $ssd) {
      oemNumber
    }
  }
`