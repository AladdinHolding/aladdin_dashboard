export type Category={
    id:number,
    categoryTranslations:CategoryTranslation[]
}

export type CategoryTranslation={
    languageCode: string,
    name: string
}