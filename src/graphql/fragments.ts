import { gql } from '@apollo/client';

export const ConditionFragment = gql`
  fragment ConditionNode on ConditionsObject {
    id
    usCode
    euCode
    dateUpdated
    type
    sortOrder
  }
`;

export const MultiplierFragment = gql`
  fragment Multiplier on MerchantsConditionMultiplierObject {
    databaseId
    merchant
    conditionId
    multiplier
    id
  }
`;

export const RealItemFragment = gql`
  fragment RealItem on RealItemObject {
    id
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
    tradeInValue
    woocommerceUrl
    woocommerceProductId
    forsalePrice
    status
  }
`;
