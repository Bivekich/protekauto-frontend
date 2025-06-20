export interface LaximoBrand {
  brand: string
  code: string
  icon: string
  name: string
  supportdetailapplicability: boolean
  supportparameteridentification2: boolean
  supportquickgroups: boolean
  supportvinsearch: boolean
  supportframesearch?: boolean
  vinexample?: string
  frameexample?: string
  features: LaximoFeature[]
  extensions?: LaximoExtensions
}

export interface LaximoFeature {
  name: string
  example: string
}

export interface LaximoExtensions {
  operations?: LaximoOperation[]
}

export interface LaximoOperation {
  description: string
  kind: string
  name: string
  fields: LaximoField[]
}

export interface LaximoField {
  description: string
  example?: string
  name: string
  pattern?: string
}

// Новые интерфейсы для поиска автомобилей
export interface LaximoCatalogInfo {
  brand: string
  code: string
  icon: string
  name: string
  supportdetailapplicability: boolean
  supportparameteridentification2: boolean
  supportquickgroups: boolean
  supportvinsearch: boolean
  supportplateidentification?: boolean
  vinexample?: string
  plateexample?: string
  features: LaximoFeature[]
  permissions: string[]
}

export interface LaximoWizardStep {
  allowlistvehicles: boolean
  automatic: boolean
  conditionid: string
  determined: boolean
  name: string
  type: string
  ssd?: string
  value?: string
  valueid?: string
  options: LaximoWizardOption[]
}

export interface LaximoWizardOption {
  key: string
  value: string
}

export interface LaximoVehicleSearchResult {
  vehicleid: string
  name?: string
  brand: string
  catalog?: string
  model: string
  modification: string
  year: string
  bodytype: string
  engine: string
  notes?: string
  ssd?: string
  
  // Дополнительные атрибуты из документации Laximo
  grade?: string
  transmission?: string
  doors?: string
  creationregion?: string
  destinationregion?: string
  date?: string
  manufactured?: string
  framecolor?: string
  trimcolor?: string
  datefrom?: string
  dateto?: string
  frame?: string
  frames?: string
  framefrom?: string
  frameto?: string
  engine1?: string
  engine2?: string
  engine_info?: string
  engineno?: string
  options?: string
  modelyearfrom?: string
  modelyearto?: string
  description?: string
  market?: string
  prodRange?: string
  prodPeriod?: string
  carpet_color?: string
  seat_combination_code?: string
}

export interface LaximoVehicleInfo {
  vehicleid: string
  name: string
  ssd: string
  brand: string
  catalog: string
  attributes: LaximoVehicleAttribute[]
}

export interface LaximoVehicleAttribute {
  key: string
  name: string
  value: string
}

export interface LaximoQuickGroup {
  quickgroupid: string
  name: string
  link: boolean
  children?: LaximoQuickGroup[]
}

export interface LaximoQuickDetail {
  quickgroupid: string
  name: string
  units: LaximoUnit[]
}

export interface LaximoUnit {
  unitid: string
  name: string
  code?: string
  description?: string
  imageurl?: string
  largeimageurl?: string
  details?: LaximoDetail[]
  attributes?: LaximoDetailAttribute[]
}

export interface LaximoDetail {
  detailid: string
  name: string
  oem: string
  formattedoem?: string
  parttype?: string
  filter?: string
  note?: string
  brand?: string
  description?: string
  applicablemodels?: string
  attributes?: LaximoDetailAttribute[]
}

export interface LaximoDetailAttribute {
  key: string
  name?: string
  value: string
}

export interface LaximoOEMResult {
  oemNumber: string
  categories: LaximoOEMCategory[]
}

export interface LaximoOEMCategory {
  categoryid: string
  name: string
  units: LaximoOEMUnit[]
}

export interface LaximoOEMUnit {
  unitid: string
  name: string
  code?: string
  imageurl?: string
  details: LaximoOEMDetail[]
}

export interface LaximoOEMDetail {
  detailid: string
  name: string
  oem: string
  brand?: string
  description?: string
  amount?: string
  range?: string
  attributes?: LaximoVehicleAttribute[]
}

// Новые интерфейсы для поиска деталей по названию
export interface LaximoFulltextSearchResult {
  details: LaximoFulltextDetail[]
}

export interface LaximoFulltextDetail {
  oem: string
  name: string
  brand?: string
  description?: string
}

// Интерфейсы для Doc FindOEM
export interface LaximoDocFindOEMResult {
  details: LaximoDocDetail[]
}

export interface LaximoDocDetail {
  detailid: string
  formattedoem: string
  manufacturer: string
  manufacturerid: string
  name: string
  oem: string
  volume?: string
  weight?: string
  replacements: LaximoDocReplacement[]
}

export interface LaximoDocReplacement {
  type: string
  way: string
  replacementid: string
  rate?: string
  detail: LaximoDocReplacementDetail
}

export interface LaximoDocReplacementDetail {
  detailid: string
  formattedoem: string
  manufacturer: string
  manufacturerid: string
  name: string
  oem: string
  weight?: string
  icon?: string
}

// Интерфейсы для поиска автомобилей по артикулу
export interface LaximoCatalogVehicleResult {
  catalogCode: string
  catalogName: string
  brand: string
  vehicles: LaximoVehicleSearchResult[]
  vehicleCount: number
}

export interface LaximoVehiclesByPartResult {
  partNumber: string
  catalogs: LaximoCatalogVehicleResult[]
  totalVehicles: number
}

// Новые интерфейсы для работы с деталями узлов
export interface LaximoUnitInfo {
  unitid: string
  name: string
  code?: string
  description?: string
  imageurl?: string
  largeimageurl?: string
  attributes?: LaximoDetailAttribute[]
}

export interface LaximoUnitDetail {
  detailid: string
  name: string
  oem?: string
  brand?: string
  codeonimage?: string
  code?: string
  note?: string
  filter?: string
  price?: string
  availability?: string
  description?: string
  applicablemodels?: string
  attributes?: LaximoDetailAttribute[]
}

export interface LaximoUnitImageMap {
  unitid: string
  imageurl?: string
  largeimageurl?: string
  coordinates?: LaximoImageCoordinate[]
}

export interface LaximoImageCoordinate {
  detailid: string
  codeonimage?: string
  x: number
  y: number
  width: number
  height: number
  shape: string
} 