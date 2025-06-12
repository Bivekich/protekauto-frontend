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
  details?: LaximoDetail[]
}

export interface LaximoDetail {
  detailid: string
  name: string
  oem: string
  formattedoem?: string
  parttype?: string
  filter?: string
  note?: string
  attributes?: LaximoVehicleAttribute[]
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
  attributes?: LaximoDetailAttribute[]
}

// Новые интерфейсы для поиска деталей по названию
export interface LaximoFulltextSearchResult {
  details: LaximoDetail[]
}

export interface LaximoFulltextDetail {
  oem: string
  name: string
  brand?: string
  description?: string
} 