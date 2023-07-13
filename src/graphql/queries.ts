import { gql } from '@apollo/client';
import { ConditionFragment } from './fragments';
import { MultiplierFragment } from './fragments';

export const GET_USER = gql`
  query getUser($userId: Int) {
    user(userId: $userId) {
      username
      databaseId
      securityRole
      credit
      email
    }
  }
`;

export const GET_COLLECTIONS = gql`
  query collection(
    $userId: Int
    $name: String
    $collectionId: Int
    $trashed: Boolean
    $orderStatus: String
    $page: Int
    $perPage: Int
  ) {
    itemCollections(
      collectionId: $collectionId
      userId: $userId
      name: $name
      trashed: $trashed
      orderStatus: $orderStatus
    ) {
      name
      databaseId
      lists
      count
      realItems(page: $page, perPage: $perPage) {
        edges {
          node {
            databaseId
            itemCollectionsId
            itemId
            sku
            condition
            forsalePrice
            userList
            genericItems {
              edges {
                node {
                  imageUriLarge
                  name
                  setName
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const GET_COLLECTION_DATA = gql`
  query collectionData(
    $userId: Int
    $name: String
    $collectionId: Int
    $trashed: Boolean
    $orderStatus: String
    $page: Int
    $perPage: Int
  ) {
    itemCollections(
      collectionId: $collectionId
      userId: $userId
      name: $name
      trashed: $trashed
      orderStatus: $orderStatus
      page: $page
      perPage: $perPage
    ) {
      name
      databaseId
      lists
      count
    }
  }
`;

export const GET_REAL_ITEM = gql`
  query GetRealItem($realItemId: Int) {
    realItems(realItemId: $realItemId) {
      databaseId
      itemCollectionsId
      itemId
      sku
      creator
      owner
      dateCreated
      dateUpdated
      condition
      costBasis
      fmv
      woocommerceUrl
      woocommerceProductId
      forsalePrice
      status
      transactionStatus
      itemListId
      genericItems {
        edges {
          node {
            imageUriLarge
            name
            setName
            itemIndex
          }
        }
      }
    }
  }
`;

export const GET_REAL_ITEM_MEDIAS = gql`
  query GetMedia($realItemId: Int, $page: Int, $perPage: Int) {
    media(realItemId: $realItemId, page: $page, perPage: $perPage) {
      databaseId
      type
      mediaUrl
      label
    }
  }
`;

export const ITEM_COLLECTIONS = gql`
  query GetExchangeRates {
    genericItems(page: 1, perPage: 10) {
      id
      set
      name
      imageUriLarge
      setName
      originalName
    }
  }
`;

export const GET_CONDITIONS = gql`
  query GetConditions {
    conditions {
      ...ConditionNode
    }
  }
  ${ConditionFragment}
`;

export const GET_MULTIPLIER = gql`
  query GetMultiplier {
    merchantsConditionMultiplier {
      ...Multiplier
    }
  }
  ${MultiplierFragment}
`;

export const GET_OFFERS = gql`
  query GetOffers($genericItemId: Int) {
    offers(genericItemId: $genericItemId) {
      id
      scryfallCardId
      offersHistory {
        edges {
          node {
            scryfallCardId
            lastUpdated
            source
            merchant
            amount
            cardType
            condition
            offersId
            id
          }
        }
      }
    }
  }
`;

export const GET_LATEST_OFFERS = gql`
  query GetLatestOffers($genericItemId: Int) {
    latestOffers(genericItemId: $genericItemId) {
      databaseId
      scryfallCardId
      latestOffersHistory {
        edges {
          node {
            databaseId
            scryfallCardId
            lastUpdated
            source
            merchant
            amount
            cardType
            condition
            offersId
          }
        }
      }
    }
  }
`;

export const GET_LATEST_OFFERS_SERIES = gql`
  query GetLatestOffersSeries($genericItemId: Int) {
    latestOffers(genericItemId: $genericItemId) {
      databaseId
      scryfallCardId
      timeSeries {
        id
        merchant
        amount
        lastUpdated
      }
    }
  }
`;

export const GET_TRANSACTION_ITEMS = gql`
  query GetTransactionItems($transactionId: Int, $page: Int, $perPage: Int) {
    transactionItems(
      transactionId: $transactionId
      page: $page
      perPage: $perPage
    ) {
      transactionId
      databaseId
      realItemId
      tradeInValue
      realItems {
        edges {
          node {
            databaseId
            itemCollectionsId
            itemId
            sku
            condition
            forsalePrice
            fmv
            status
            genericItems {
              edges {
                node {
                  imageUriLarge
                  name
                  setName
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const GET_TRANSACTIONS = gql`
  query GetTransactions(
    $transactionId: Int
    $userId: Int
    $collectionId: Int
    $status: String
    $page: Int
    $perPage: Int
  ) {
    transactions(
      transactionId: $transactionId
      userId: $userId
      collectionId: $collectionId
      status: $status
      page: $page
      perPage: $perPage
    ) {
      databaseId
      status
      leftOwner
      rightOwner
      paypalCosts
      id
      dateCreated
      rightCredit
      adminComment
      count
    }
  }
`;

export const GET_GENERIC_ITEMS = gql`
  query genericItems(
    $partialName: String
    $page: Int
    $perPage: Int
    $databaseId: [Int]
  ) {
    genericItems(
      partialName: $partialName
      page: $page
      perPage: $perPage
      databaseId: $databaseId
    ) {
      id
      name
      imageUriPng
      imageUriSmall
      imageUriNormal
      setName
      lang
    }
  }
`;

export const GET_ITEM_LISTS = gql`
  query GetItemLists($itemListId: Int) {
    itemLists(itemListId: $itemListId) {
      databaseId
      userId
      name
      count
      value
      dateCreated
      dateUpdated
    }
  }
`;

export const GET_REAL_ITEMS_TRADE_INFO = gql`
  query GetRealItemsTradeInfo($itemListId: Int, $page: Int, $perPage: Int) {
    itemLists(itemListId: $itemListId) {
      name
      value
      count
      realItems(page: $page, perPage: $perPage) {
        edges {
          node {
            condition
            fmv
            genericItems {
              edges {
                node {
                  name
                  setName
                  itemIndex
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const GET_REAL_ITEMS_IN_ITEM_LIST = gql`
  query GetRealItemsByItemList(
    $itemListId: Int!
    $page: Int!
    $perPage: Int!
    $partialName: String
    $sortKey: String
    $sortReverse: Boolean
  ) {
    itemLists(itemListId: $itemListId) {
      databaseId
      name
      count
      value
      dateUpdated
      realItems(
        page: $page
        perPage: $perPage
        partialName: $partialName
        sortKey: $sortKey
        sortReverse: $sortReverse
      ) {
        edges {
          node {
            databaseId
            itemCollectionsId
            itemId
            sku
            condition
            forsalePrice
            fmv
            status
            itemListId
            genericItems {
              edges {
                node {
                  imageUriLarge
                  name
                  setName
                  itemIndex
                  latestOffers {
                    edges {
                      node {
                        latestOffersHistory {
                          edges {
                            node {
                              lastUpdated
                              merchant
                              amount
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const GET_PUBLISHED_REAL_ITEMS = gql`
  query GetPublishedRealItems($page: Int, $perPage: Int) {
    realItems(status: "PUBLISH", page: $page, perPage: $perPage, userId: 12) {
      databaseId
      itemCollectionsId
      itemId
      sku
      creator
      owner
      dateCreated
      dateUpdated
      condition
      costBasis
      fmv
      woocommerceUrl
      woocommerceProductId
      forsalePrice
      status
      transactionStatus
      userList
      genericItems {
        edges {
          node {
            imageUriLarge
            name
            setName
          }
        }
      }
    }
  }
`;

export const GET_PUBLISHED_COUNT = gql`
  query CountPublished {
    countPublished
  }
`;

export const GET_EBAY_LISTING = gql`
  query GetEbayListing(
    $databaseId: Int
    $page: Int
    $perPage: Int
    $hasPrediction: Boolean
  ) {
    ebayListing(
      databaseId: $databaseId
      page: $page
      perPage: $perPage
      hasPrediction: $hasPrediction
    ) {
      title
      databaseId
      photoUrl1
      photoUrl2
      photoUrl3
      photoUrl4
      winningBid
      predictedGenericIdList
      userComment
      listingDate
      url
      dateApproved
    }
  }
`;

export const LISTING_FEEDBACK = gql`
  query GetListingFeedback($userId: Int, $page: Int, $perPage: Int) {
    listingFeedback(userId: $userId, page: $page, perPage: $perPage) {
      databaseId
      userId
      listingId
      userComment
      userSelectedGenericId
      isCorrect
      dateCreated
    }
  }
`;

export const GET_TRANSACTION_LOGS = gql`
  query transactionLogs($transactionId: Int) {
    transactionLogs(transactionId: $transactionId) {
      databaseId
      dateCreated
      id
      message
      transactionId
    }
  }
`;
