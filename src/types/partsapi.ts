export interface PartsAPICategory {
  id: string;
  name: string;
  level: number;
  parentId?: string;
  children?: PartsAPICategory[];
}

export interface PartsAPIArticle {
  supBrand?: string;
  supId?: number;
  productGroup?: string;
  ptId?: number;
  artSupBrand?: string;
  artArticleNr?: string;
  artId?: string;
}

export interface PartsAPIMedia {
  artMediaType: string;        // Тип медиа: JPEG, PNG, WebP, PDF и т.д.
  artMediaSource: string;      // Полный URL или относительный путь к файлу
  artMediaSupId: number;       // Идентификатор поставщика запчасти
  artMediaKind?: string;       // Вид медиа-материала (может отсутствовать)
  imageUrl?: string;           // Полный URL изображения
}

export type CarType = 'PC' | 'CV' | 'Motorcycle';

export interface PartsAPICategoriesData {
  partsAPICategories: PartsAPICategory[];
}

export interface PartsAPICategoriesVariables {
  carId: number;
  carType: CarType;
}

export interface PartsAPITopLevelCategoriesData {
  partsAPITopLevelCategories: PartsAPICategory[];
}

export interface PartsAPITopLevelCategoriesVariables {
  carId: number;
  carType: CarType;
}

export interface PartsAPIArticlesData {
  partsAPIArticles: PartsAPIArticle[];
}

export interface PartsAPIArticlesVariables {
  strId: number;
  carId: number;
  carType: CarType;
}

export interface PartsAPIMediaData {
  partsAPIMedia: PartsAPIMedia[];
}

export interface PartsAPIMediaVariables {
  artId: string;
  lang?: number;
}

export interface PartsAPIMainImageData {
  partsAPIMainImage: string | null;
}

export interface PartsAPIMainImageVariables {
  artId: string;
} 