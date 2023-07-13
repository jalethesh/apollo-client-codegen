import { gql } from '@apollo/client';

export const CreateRealItem = gql`
  mutation createRealItem(
    $itemId: Int!
    $itemListId: Int!
    $condition: String
  ) {
    createRealItem(
      itemId: $itemId
      itemListId: $itemListId
      condition: $condition
    ) {
      ok
    }
  }
`;

export const UpdateRealItem = gql`
  mutation updateRealItem(
    $condition: String
    $databaseId: Int!
    $forsalePrice: Float
    $itemId: Int
  ) {
    updateRealItem(
      condition: $condition
      databaseId: $databaseId
      forsalePrice: $forsalePrice
      itemId: $itemId
    ) {
      ok
      debug
    }
  }
`;

export const UpdateRealItemStatus = gql`
  mutation updateRealItemStatus(
    $adminComment: String
    $realItemId: Int!
    $status: String!
  ) {
    updateRealItemStatus(
      adminComment: $adminComment
      realItemId: $realItemId
      status: $status
    ) {
      ok
      debug
    }
  }
`;

export const DeleteRealItem = gql`
  mutation deleteRealItem($databaseId: Int!) {
    deleteRealItem(databaseId: $databaseId) {
      ok
      debug
    }
  }
`;

export const UpdateMedia = gql`
  mutation updateMedia(
    $databaseId: Int!
    $label: String
    $mediaUrl: String
    $realItemId: Int
    $type: String
  ) {
    updateMedia(
      databaseId: $databaseId
      label: $label
      mediaUrl: $mediaUrl
      realItemId: $realItemId
      type: $type
    ) {
      ok
    }
  }
`;

export const DeleteMedia = gql`
  mutation deleteMedia($databaseId: Int!) {
    deleteMedia(databaseId: $databaseId) {
      ok
    }
  }
`;

export const CreateTransaction = gql`
  mutation createTransaction($itemListId: Int!) {
    createTransaction(itemListId: $itemListId) {
      ok
      debug
    }
  }
`;

export const UpdateTransactionStatus = gql`
  mutation updateTransactionStatus(
    $adminComment: String
    $status: String!
    $transactionId: Int!
  ) {
    updateTransactionStatus(
      adminComment: $adminComment
      status: $status
      transactionId: $transactionId
    ) {
      ok
      debug
    }
  }
`;

export const DeleteTransactionItem = gql`
  mutation deleteTransactionItem($transactionItemId: Int!) {
    deleteTransactionItem(transactionItemId: $transactionItemId) {
      ok
      debug
    }
  }
`;

export const DeleteTransaction = gql`
  mutation deleteTransaction($transactionId: Int!) {
    deleteTransaction(transactionId: $transactionId) {
      ok
      debug
    }
  }
`;

export const CreateItemList = gql`
  mutation CreateItemList($name: String!) {
    createItemList(name: $name) {
      ok
      debug
    }
  }
`;

export const DeleteItemList = gql`
  mutation DeleteItemList($databaseId: Int!) {
    deleteItemList(databaseId: $databaseId) {
      ok
      debug
    }
  }
`;

export const BuyRealItemWithCredit = gql`
  mutation BuyRealItemWithCredit($realItemId: Int!) {
    buyRealItemWithCredit(realItemId: $realItemId) {
      ok
      debug
    }
  }
`;

export const UpdateUser = gql`
  mutation UpdateUser(
    $colorTheme: String
    $databaseId: Int!
    $perPage: Int
    $username: String
    $viewMode: String
  ) {
    updateUser(
      colorTheme: $colorTheme
      databaseId: $databaseId
      perPage: $perPage
      username: $username
      viewMode: $viewMode
    ) {
      ok
      debug
    }
  }
`;

export const UpdateShipInfo = gql`
  mutation UpdateShipInfo(
    $databaseId: Int!
    $name: String!
    $street1: String!
    $street2: String
    $city: String!
    $state: String!
    $zip: String!
    $country: String!
  ) {
    updateUser(
      databaseId: $databaseId
      name: $name
      street1: $street1
      street2: $street2
      city: $city
      state: $state
      zip: $zip
      country: $country
    ) {
      ok
      debug
    }
  }
`;

export const CreateListingFeedback = gql`
  mutation CreateUpdateListingFeedback(
    $ebaylistingId: Int!
    $isCorrect: Boolean!
    $userComment: String
    $userSelectedGenericId: Int
  ) {
    createUpdateListingFeedback(
      ebaylistingId: $ebaylistingId
      isCorrect: $isCorrect
      userComment: $userComment
      userSelectedGenericId: $userSelectedGenericId
    ) {
      ok
      debug
      listingFeedback {
        userId
        isCorrect
        userComment
        dateCreated
      }
    }
  }
`;

export const CreateTransactionLog = gql`
  mutation createTransactionLog($message: String!, $transactionId: Int!) {
    createTransactionLog(message: $message, transactionId: $transactionId) {
      ok
      debug
    }
  }
`;
