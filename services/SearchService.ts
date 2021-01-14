import algoliasearch from 'algoliasearch'

// const searchClient = algoliasearch(
//   'B1G2GM9NG0',
//   'aadef574be1f9252bb48d4ea09b5cfe5'
// )

export default class SearchService {
  static searchClient = algoliasearch(
    'YQ0F8086LS',
    '388026844dc825c3cfeb902b6ab4ff4a'
  )

  static getCeleb() {}
}
