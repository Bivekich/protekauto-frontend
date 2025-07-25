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
      contracts {
        id
        contractNumber
        contractDate
        name
        ourLegalEntity
        clientLegalEntity
        balance
        currency
        isActive
        isDefault
        contractType
        relationship
        paymentDelay
        creditLimit
        delayDays
        fileUrl
        createdAt
        updatedAt
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
  mutation UpdateClientBankDetails($id: ID!, $input: ClientBankDetailsInput!, $legalEntityId: ID) {
    updateClientBankDetails(id: $id, input: $input, legalEntityId: $legalEntityId) {
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

// Мутации для заказов и платежей
export const CREATE_ORDER = gql`
  mutation CreateOrder($input: CreateOrderInput!) {
    createOrder(input: $input) {
      id
      orderNumber
      clientId
      client {
        id
        name
        email
        phone
      }
      clientEmail
      clientPhone
      clientName
      status
      totalAmount
      discountAmount
      finalAmount
      currency
      items {
        id
        productId
        product {
          id
          name
          article
        }
        externalId
        name
        article
        brand
        price
        quantity
        totalPrice
      }
      deliveryAddress
      comment
      createdAt
      updatedAt
    }
  }
`

export const CREATE_PAYMENT = gql`
  mutation CreatePayment($input: CreatePaymentInput!) {
    createPayment(input: $input) {
      payment {
        id
        orderId
        yookassaPaymentId
        status
        amount
        currency
        description
        confirmationUrl
        createdAt
      }
      confirmationUrl
    }
  }
`

export const GET_ORDERS = gql`
  query GetOrders($clientId: String, $status: OrderStatus, $search: String, $limit: Int, $offset: Int) {
    orders(clientId: $clientId, status: $status, search: $search, limit: $limit, offset: $offset) {
      orders {
        id
        orderNumber
        clientId
        client {
          id
          name
          email
          phone
        }
        clientEmail
        clientPhone
        clientName
        status
        totalAmount
        discountAmount
        finalAmount
        currency
        items {
          id
          productId
          product {
            id
            name
            article
          }
          externalId
          name
          article
          brand
          price
          quantity
          totalPrice
        }
        deliveryAddress
        comment
        createdAt
        updatedAt
        payments {
          id
          yookassaPaymentId
          status
          amount
          currency
          description
          confirmationUrl
          createdAt
          updatedAt
        }
      }
      total
      hasMore
    }
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
      transmission
      date
      manufactured
      framecolor
      trimcolor
      engine_info
      engineno
      market
      prodRange
      prodPeriod
      destinationregion
      creationregion
      datefrom
      dateto
      modelyearfrom
      modelyearto
      options
      description
      grade
    }
  }
`;

export const FIND_LAXIMO_VEHICLE_GLOBAL = gql`
  query FindLaximoVehicleGlobal($vin: String!) {
    laximoFindVehicleGlobal(vin: $vin) {
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
      transmission
      date
      manufactured
      framecolor
      trimcolor
      engine_info
      engineno
      market
      prodRange
      prodPeriod
      destinationregion
      creationregion
      datefrom
      dateto
      modelyearfrom
      modelyearto
      options
      description
      grade
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
      transmission
      date
      manufactured
      framecolor
      trimcolor
      engine_info
      engineno
      market
      prodRange
      prodPeriod
      destinationregion
      creationregion
      datefrom
      dateto
      modelyearfrom
      modelyearto
      options
      description
      grade
    }
  }
`;

export const FIND_LAXIMO_VEHICLE_BY_PLATE_GLOBAL = gql`
  query FindLaximoVehicleByPlateGlobal($plateNumber: String!) {
    laximoFindVehicleByPlateGlobal(plateNumber: $plateNumber) {
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
      transmission
      date
      manufactured
      framecolor
      trimcolor
      engine_info
      engineno
      market
      prodRange
      prodPeriod
      destinationregion
      creationregion
      datefrom
      dateto
      modelyearfrom
      modelyearto
      options
      description
      grade
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
      transmission
      date
      manufactured
      framecolor
      trimcolor
      engine_info
      engineno
      market
      prodRange
      prodPeriod
      destinationregion
      creationregion
      datefrom
      dateto
      modelyearfrom
      modelyearto
      options
      description
      grade
    }
  }
`;

export const FIND_LAXIMO_VEHICLES_BY_PART_NUMBER = gql`
  query FindLaximoVehiclesByPartNumber($partNumber: String!) {
    laximoFindVehiclesByPartNumber(partNumber: $partNumber) {
      partNumber
      totalVehicles
      catalogs {
        catalogCode
        catalogName
        brand
        vehicleCount
        vehicles {
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

export const GET_LAXIMO_QUICK_GROUPS_WITH_XML = gql`
  query GetLaximoQuickGroupsWithXML($catalogCode: String!, $vehicleId: String!, $ssd: String) {
    laximoQuickGroupsWithXML(catalogCode: $catalogCode, vehicleId: $vehicleId, ssd: $ssd) {
      groups {
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
      rawXML
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
        imageurl
        largeimageurl
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

export const DOC_FIND_OEM = gql`
  query DocFindOEM($oemNumber: String!, $brand: String, $replacementTypes: String) {
    laximoDocFindOEM(oemNumber: $oemNumber, brand: $brand, replacementTypes: $replacementTypes) {
      details {
        detailid
        formattedoem
        manufacturer
        manufacturerid
        name
        oem
        volume
        weight
        replacements {
          type
          way
          replacementid
          rate
          detail {
            detailid
            formattedoem
            manufacturer
            manufacturerid
            name
            oem
            weight
            icon
          }
        }
      }
    }
  }
`

// Запросы для работы с деталями узлов
export const GET_LAXIMO_UNIT_INFO = gql`
  query GetLaximoUnitInfo($catalogCode: String!, $vehicleId: String!, $unitId: String!, $ssd: String!) {
    laximoUnitInfo(catalogCode: $catalogCode, vehicleId: $vehicleId, unitId: $unitId, ssd: $ssd) {
      unitid
      name
      code
      description
      imageurl
      largeimageurl
      attributes {
        key
        name
        value
      }
    }
  }
`

export const GET_LAXIMO_UNIT_DETAILS = gql`
  query GetLaximoUnitDetails($catalogCode: String!, $vehicleId: String!, $unitId: String!, $ssd: String!) {
    laximoUnitDetails(catalogCode: $catalogCode, vehicleId: $vehicleId, unitId: $unitId, ssd: $ssd) {
      detailid
      name
      oem
      brand
      codeonimage
      code
      note
      filter
      price
      availability
      description
      applicablemodels
      attributes {
        key
        name
        value
      }
    }
  }
`

export const GET_LAXIMO_UNIT_IMAGE_MAP = gql`
  query GetLaximoUnitImageMap($catalogCode: String!, $vehicleId: String!, $unitId: String!, $ssd: String!) {
    laximoUnitImageMap(catalogCode: $catalogCode, vehicleId: $vehicleId, unitId: $unitId, ssd: $ssd) {
      unitid
      imageurl
      largeimageurl
      coordinates {
        detailid
        codeonimage
        x
        y
        width
        height
        shape
      }
    }
  }
`

export const SEARCH_PRODUCT_OFFERS = gql`
  query SearchProductOffers($articleNumber: String!, $brand: String!) {
    searchProductOffers(articleNumber: $articleNumber, brand: $brand) {
      articleNumber
      brand
      name
      hasInternalStock
      totalOffers
      internalOffers {
        id
        productId
        price
        quantity
        warehouse
        deliveryDays
        available
        rating
        supplier
      }
      externalOffers {
        offerKey
        brand
        code
        name
        price
        currency
        deliveryTime
        deliveryTimeMax
        quantity
        warehouse
        supplier
        comment
        weight
        volume
        canPurchase
      }
      analogs {
        brand
        articleNumber
        name
        type
      }
    }
  }
`

export const GET_ANALOG_OFFERS = gql`
  query GetAnalogOffers($analogs: [AnalogOfferInput!]!) {
    getAnalogOffers(analogs: $analogs) {
      brand
      articleNumber
      name
      type
      internalOffers {
        id
        productId
        price
        quantity
        warehouse
        deliveryDays
        available
        rating
        supplier
      }
      externalOffers {
        offerKey
        brand
        code
        name
        price
        currency
        deliveryTime
        deliveryTimeMax
        quantity
        warehouse
        supplier
        canPurchase
      }
    }
  }
`

// PartsAPI категории
export const GET_PARTSAPI_CATEGORIES = gql`
  query GetPartsAPICategories($carId: Int!, $carType: CarType) {
    partsAPICategories(carId: $carId, carType: $carType) {
      id
      name
      level
      parentId
      children {
        id
        name
        level
        parentId
        children {
          id
          name
          level
          parentId
        }
      }
    }
  }
`

export const GET_PARTSAPI_TOP_LEVEL_CATEGORIES = gql`
  query GetPartsAPITopLevelCategories($carId: Int!, $carType: CarType) {
    partsAPITopLevelCategories(carId: $carId, carType: $carType) {
      id
      name
      level
      parentId
    }
  }
`

export const GET_PARTSAPI_ARTICLES = gql`
  query GetPartsAPIArticles($strId: Int!, $carId: Int!, $carType: CarType) {
    partsAPIArticles(strId: $strId, carId: $carId, carType: $carType) {
      supBrand
      supId
      productGroup
      ptId
      artSupBrand
      artArticleNr
      artId
    }
  }
`

export const GET_PARTSAPI_MEDIA = gql`
  query GetPartsAPIMedia($artId: String!, $lang: Int) {
    partsAPIMedia(artId: $artId, lang: $lang) {
      artMediaType
      artMediaSource
      artMediaSupId
      artMediaKind
      imageUrl
    }
  }
`;

export const GET_PARTSAPI_MAIN_IMAGE = gql`
  query GetPartsAPIMainImage($artId: String!) {
    partsAPIMainImage(artId: $artId)
  }
`;

// Query для получения истории поиска запчастей
export const GET_PARTS_SEARCH_HISTORY = gql`
  query GetPartsSearchHistory {
    partsSearchHistory {
      id
      searchQuery
      searchType
      brand
      articleNumber
      vehicleInfo {
        brand
        model
        year
      }
      createdAt
    }
  }
`;

// Мутации для адресов доставки
export const CREATE_CLIENT_DELIVERY_ADDRESS = gql`
  mutation CreateClientDeliveryAddress($input: ClientDeliveryAddressInput!) {
    createClientDeliveryAddressMe(input: $input) {
      id
      name
      address
      deliveryType
      comment
      entrance
      floor
      apartment
      intercom
      deliveryTime
      contactPhone
      createdAt
      updatedAt
    }
  }
`

export const UPDATE_CLIENT_DELIVERY_ADDRESS = gql`
  mutation UpdateClientDeliveryAddress($id: ID!, $input: ClientDeliveryAddressInput!) {
    updateClientDeliveryAddressMe(id: $id, input: $input) {
      id
      name
      address
      deliveryType
      comment
      entrance
      floor
      apartment
      intercom
      deliveryTime
      contactPhone
      createdAt
      updatedAt
    }
  }
`

export const DELETE_CLIENT_DELIVERY_ADDRESS = gql`
  mutation DeleteClientDeliveryAddress($id: ID!) {
    deleteClientDeliveryAddressMe(id: $id)
  }
`

// Запросы для адресов доставки
export const GET_CLIENT_DELIVERY_ADDRESSES = gql`
  query GetClientDeliveryAddresses {
    clientMe {
      id
      deliveryAddresses {
        id
        name
        address
        deliveryType
        comment
        entrance
        floor
        apartment
        intercom
        deliveryTime
        contactPhone
        createdAt
        updatedAt
      }
    }
  }
`

// Автокомплит адресов
export const GET_ADDRESS_SUGGESTIONS = gql`
  query GetAddressSuggestions($query: String!) {
    addressSuggestions(query: $query)
  }
`

export const UPDATE_CONTRACT_BALANCE = gql`
  mutation UpdateContractBalance($contractId: ID!, $amount: Float!, $comment: String) {
    updateContractBalance(contractId: $contractId, amount: $amount, comment: $comment) {
      id
      balance
      updatedAt
    }
  }
`

export const CREATE_BALANCE_INVOICE = gql`
  mutation CreateBalanceInvoice($contractId: String!, $amount: Float!) {
    createBalanceInvoice(contractId: $contractId, amount: $amount) {
      id
      invoiceNumber
      amount
      status
      createdAt
    }
  }
`

export const GET_INVOICE_PDF = gql`
  mutation GetInvoicePDF($invoiceId: String!) {
    getInvoicePDF(invoiceId: $invoiceId) {
      success
      pdfBase64
      filename
      error
    }
  }
`

// Мутация для получения офферов доставки
export const GET_DELIVERY_OFFERS = gql`
  mutation GetDeliveryOffers($input: DeliveryOffersInput!) {
    getDeliveryOffers(input: $input) {
      success
      message
      error
      offers {
        id
        name
        deliveryDate
        deliveryTime
        cost
        description
        type
        expiresAt
      }
    }
  }
`

export const GET_BRANDS_BY_CODE = gql`
  query GetBrandsByCode($code: String!) {
    getBrandsByCode(code: $code) {
      success
      error
      brands {
        brand
        code
        name
      }
    }
  }
`