import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /**
   * The `Date` scalar type represents a Date
   * value as specified by
   * [iso8601](https://en.wikipedia.org/wiki/ISO_8601).
   */
  Date: any;
  /**
   * The `DateTime` scalar type represents a DateTime
   * value as specified by
   * [iso8601](https://en.wikipedia.org/wiki/ISO_8601).
   */
  DateTime: string;
};

export type ActivitiesObject = Node & {
  __typename: 'ActivitiesObject';
  actor?: Maybe<Scalars['String']>;
  collectionId?: Maybe<Scalars['Int']>;
  content?: Maybe<Scalars['String']>;
  databaseId: Scalars['ID'];
  genericItemId?: Maybe<Scalars['Int']>;
  icon?: Maybe<Scalars['String']>;
  /** The ID of the object. */
  id: Scalars['ID'];
  object: Scalars['String'];
  objectEntity?: Maybe<Scalars['String']>;
  offersId?: Maybe<Scalars['Int']>;
  realItemId?: Maybe<Scalars['Int']>;
  target?: Maybe<Scalars['String']>;
  targetEntity?: Maybe<Scalars['String']>;
  timestamp?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['Int']>;
  verb: Scalars['String'];
};

export type BuyRealItemWithCredit = {
  __typename: 'BuyRealItemWithCredit';
  debug?: Maybe<Scalars['String']>;
  ok?: Maybe<Scalars['Boolean']>;
  realItem?: Maybe<RealItemObject>;
  user?: Maybe<UserObject>;
};

export type ConditionsObject = Node & {
  __typename: 'ConditionsObject';
  dateUpdated?: Maybe<Scalars['DateTime']>;
  euCode?: Maybe<Scalars['String']>;
  /** The ID of the object. */
  id: Scalars['ID'];
  sortOrder?: Maybe<Scalars['Int']>;
  type?: Maybe<Scalars['String']>;
  usCode: Scalars['String'];
};

export type CreateGenericItem = {
  __typename: 'CreateGenericItem';
  debug?: Maybe<Scalars['String']>;
  genericItem?: Maybe<GenericItemObject>;
  ok?: Maybe<Scalars['Boolean']>;
};

/** requires name, owner is set to the user that is currently logged in / session user */
export type CreateItemList = {
  __typename: 'CreateItemList';
  debug?: Maybe<Scalars['String']>;
  itemList?: Maybe<ItemListsObject>;
  ok?: Maybe<Scalars['Boolean']>;
};

export type CreateMedia = {
  __typename: 'CreateMedia';
  debug?: Maybe<Scalars['String']>;
  media?: Maybe<MediaObject>;
  ok?: Maybe<Scalars['Boolean']>;
};

/** item_id is genericItemId, sets creator to session user, sets owner to session user. creates activity */
export type CreateRealItem = {
  __typename: 'CreateRealItem';
  debug?: Maybe<Scalars['String']>;
  ok?: Maybe<Scalars['Boolean']>;
  realItem?: Maybe<RealItemObject>;
};

/**
 * should be triggered by user submitting a transaction for review.
 * creates a transaction with PURPLEMANA_REVIEW status
 */
export type CreateTransaction = {
  __typename: 'CreateTransaction';
  debug?: Maybe<Scalars['String']>;
  ok?: Maybe<Scalars['Boolean']>;
  transaction?: Maybe<TransactionsObject>;
};

/** for user/admin to directly submit log to transactionLog - takes transactionId and message as required inputs */
export type CreateTransactionLog = {
  __typename: 'CreateTransactionLog';
  debug?: Maybe<Scalars['String']>;
  ok?: Maybe<Scalars['Boolean']>;
  transactionLogs?: Maybe<TransactionLogObject>;
};

export type CreateUpdateListingFeedback = {
  __typename: 'CreateUpdateListingFeedback';
  debug?: Maybe<Scalars['String']>;
  listingFeedback?: Maybe<ListingFeedbackObject>;
  ok?: Maybe<Scalars['Boolean']>;
};

export type DefectsObject = Node & {
  __typename: 'DefectsObject';
  databaseId: Scalars['ID'];
  defectName?: Maybe<Scalars['String']>;
  /** The ID of the object. */
  id: Scalars['ID'];
  realitem?: Maybe<RealItemObject>;
  realitemId: Scalars['Int'];
};

export type DefectsObjectConnection = {
  __typename: 'DefectsObjectConnection';
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<DefectsObjectEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

/** A Relay edge containing a `DefectsObject` and its cursor. */
export type DefectsObjectEdge = {
  __typename: 'DefectsObjectEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
  /** The item at the end of the edge */
  node?: Maybe<DefectsObject>;
};

export type DeleteGenericItem = {
  __typename: 'DeleteGenericItem';
  debug?: Maybe<Scalars['String']>;
  ok?: Maybe<Scalars['Boolean']>;
};

export type DeleteItemList = {
  __typename: 'DeleteItemList';
  debug?: Maybe<Scalars['String']>;
  ok?: Maybe<Scalars['Boolean']>;
};

export type DeleteMedia = {
  __typename: 'DeleteMedia';
  debug?: Maybe<Scalars['String']>;
  ok?: Maybe<Scalars['Boolean']>;
};

/** databaseId is realItemId, deletes realItem from database, deletes corresponding activities from database */
export type DeleteRealItem = {
  __typename: 'DeleteRealItem';
  debug?: Maybe<Scalars['String']>;
  ok?: Maybe<Scalars['Boolean']>;
};

/** required transactionId. only the left_owner can delete the transaction. deletes transaction items as well */
export type DeleteTransaction = {
  __typename: 'DeleteTransaction';
  debug?: Maybe<Scalars['String']>;
  ok?: Maybe<Scalars['Boolean']>;
};

export type DeleteTransactionItem = {
  __typename: 'DeleteTransactionItem';
  debug?: Maybe<Scalars['String']>;
  ok?: Maybe<Scalars['Boolean']>;
};

export type EbayListingObject = Node & {
  __typename: 'EbayListingObject';
  auctionType?: Maybe<Scalars['String']>;
  databaseId: Scalars['ID'];
  dateApproved?: Maybe<Scalars['String']>;
  /** The ID of the object. */
  id: Scalars['ID'];
  listingDate?: Maybe<Scalars['String']>;
  numberOfBids?: Maybe<Scalars['Int']>;
  photoFileName?: Maybe<Scalars['String']>;
  photoUrl1?: Maybe<Scalars['String']>;
  photoUrl2?: Maybe<Scalars['String']>;
  photoUrl3?: Maybe<Scalars['String']>;
  photoUrl4?: Maybe<Scalars['String']>;
  photoUrl5?: Maybe<Scalars['String']>;
  predictedGenericId?: Maybe<Scalars['Int']>;
  predictedGenericIdList?: Maybe<Scalars['String']>;
  sellerFeedback?: Maybe<Scalars['Int']>;
  sellerName?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
  userApproved?: Maybe<Scalars['Boolean']>;
  userComment?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['Int']>;
  userSelectedGenericId?: Maybe<Scalars['Int']>;
  winningBid?: Maybe<Scalars['Float']>;
};

export type GenericItemObject = Node & {
  __typename: 'GenericItemObject';
  artist?: Maybe<Scalars['String']>;
  booster?: Maybe<Scalars['String']>;
  borderColor?: Maybe<Scalars['String']>;
  cardBackId?: Maybe<Scalars['String']>;
  cardmarketId?: Maybe<Scalars['String']>;
  cmc?: Maybe<Scalars['Float']>;
  collectorNumber?: Maybe<Scalars['String']>;
  colorIdentity?: Maybe<Scalars['String']>;
  colors?: Maybe<Scalars['String']>;
  etchedfoil?: Maybe<Scalars['Boolean']>;
  flavorName?: Maybe<Scalars['String']>;
  flavorText?: Maybe<Scalars['String']>;
  foil?: Maybe<Scalars['Boolean']>;
  frame?: Maybe<Scalars['String']>;
  fullArt?: Maybe<Scalars['Boolean']>;
  games?: Maybe<Scalars['String']>;
  /** The ID of the object. */
  id: Scalars['ID'];
  illustrationId?: Maybe<Scalars['String']>;
  imageUriLarge?: Maybe<Scalars['String']>;
  imageUriNormal?: Maybe<Scalars['String']>;
  imageUriPng?: Maybe<Scalars['String']>;
  imageUriSmall?: Maybe<Scalars['String']>;
  imageUris?: Maybe<Scalars['String']>;
  itemHash?: Maybe<Scalars['String']>;
  itemIndex?: Maybe<Scalars['String']>;
  keywords?: Maybe<Scalars['String']>;
  lang?: Maybe<Scalars['String']>;
  latestOffers?: Maybe<LatestOfferObjectConnection>;
  layout?: Maybe<Scalars['String']>;
  legalities?: Maybe<Scalars['String']>;
  loyalty?: Maybe<Scalars['String']>;
  manaCost?: Maybe<Scalars['String']>;
  mtgoFoilId?: Maybe<Scalars['String']>;
  mtgoId?: Maybe<Scalars['String']>;
  multiverseIds?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  nonfoil?: Maybe<Scalars['Boolean']>;
  offers?: Maybe<OfferObjectConnection>;
  oracleId?: Maybe<Scalars['String']>;
  oracleText?: Maybe<Scalars['String']>;
  originalName?: Maybe<Scalars['String']>;
  oversized?: Maybe<Scalars['Boolean']>;
  power?: Maybe<Scalars['String']>;
  printedName?: Maybe<Scalars['String']>;
  printedText?: Maybe<Scalars['String']>;
  printedTypeLine?: Maybe<Scalars['String']>;
  producedMana?: Maybe<Scalars['String']>;
  promo?: Maybe<Scalars['Boolean']>;
  purchaseUris?: Maybe<Scalars['String']>;
  rarity?: Maybe<Scalars['String']>;
  releasedAt?: Maybe<Scalars['String']>;
  reserved?: Maybe<Scalars['Boolean']>;
  scryfallCardId?: Maybe<Scalars['String']>;
  scryfallSetId: Scalars['String'];
  scryfallSetUri?: Maybe<Scalars['String']>;
  scryfallUri?: Maybe<Scalars['String']>;
  set?: Maybe<Scalars['String']>;
  setName?: Maybe<Scalars['String']>;
  setSearchUri?: Maybe<Scalars['String']>;
  setType?: Maybe<Scalars['String']>;
  setUri?: Maybe<Scalars['String']>;
  tcgplayerId?: Maybe<Scalars['String']>;
  textless?: Maybe<Scalars['Boolean']>;
  toughness?: Maybe<Scalars['String']>;
  typeLine?: Maybe<Scalars['String']>;
  uri?: Maybe<Scalars['String']>;
  variation?: Maybe<Scalars['String']>;
  variationOf?: Maybe<Scalars['String']>;
};


export type GenericItemObjectLatestOffersArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type GenericItemObjectOffersArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type GenericItemObjectConnection = {
  __typename: 'GenericItemObjectConnection';
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<GenericItemObjectEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

/** A Relay edge containing a `GenericItemObject` and its cursor. */
export type GenericItemObjectEdge = {
  __typename: 'GenericItemObjectEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
  /** The item at the end of the edge */
  node?: Maybe<GenericItemObject>;
};

export type ItemCollectionObject = Node & {
  __typename: 'ItemCollectionObject';
  adminApproved?: Maybe<Scalars['Boolean']>;
  adminComment?: Maybe<Scalars['String']>;
  count?: Maybe<Scalars['Int']>;
  coverPhotoItem?: Maybe<RealItemObjectConnection>;
  databaseId: Scalars['ID'];
  dateCreated?: Maybe<Scalars['DateTime']>;
  dateUpdated?: Maybe<Scalars['DateTime']>;
  /** The ID of the object. */
  id: Scalars['ID'];
  lists?: Maybe<Array<Maybe<Scalars['String']>>>;
  name?: Maybe<Scalars['String']>;
  orderStatus?: Maybe<Scalars['String']>;
  public?: Maybe<Scalars['Boolean']>;
  realItems?: Maybe<RealItemObjectConnection>;
  trashed?: Maybe<Scalars['Boolean']>;
  userId?: Maybe<Scalars['Int']>;
};


export type ItemCollectionObjectCoverPhotoItemArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type ItemCollectionObjectRealItemsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  perPage?: InputMaybe<Scalars['Int']>;
};

export type ItemCollectionObjectConnection = {
  __typename: 'ItemCollectionObjectConnection';
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<ItemCollectionObjectEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

/** A Relay edge containing a `ItemCollectionObject` and its cursor. */
export type ItemCollectionObjectEdge = {
  __typename: 'ItemCollectionObjectEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
  /** The item at the end of the edge */
  node?: Maybe<ItemCollectionObject>;
};

export type ItemListsObject = Node & {
  __typename: 'ItemListsObject';
  count?: Maybe<Scalars['Int']>;
  databaseId: Scalars['ID'];
  dateCreated?: Maybe<Scalars['DateTime']>;
  dateUpdated?: Maybe<Scalars['DateTime']>;
  /** The ID of the object. */
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  realItems?: Maybe<RealItemObjectConnection>;
  userId?: Maybe<Scalars['Int']>;
  value?: Maybe<Scalars['Float']>;
};


export type ItemListsObjectRealItemsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  partialName?: InputMaybe<Scalars['String']>;
  perPage?: InputMaybe<Scalars['Int']>;
  sortKey?: InputMaybe<Scalars['String']>;
  sortReverse?: InputMaybe<Scalars['Boolean']>;
  status?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['Int']>;
};

export type LatestOfferHistoryObject = Node & {
  __typename: 'LatestOfferHistoryObject';
  amount?: Maybe<Scalars['Float']>;
  cardType?: Maybe<Scalars['String']>;
  condition?: Maybe<Scalars['String']>;
  databaseId: Scalars['ID'];
  /** The ID of the object. */
  id: Scalars['ID'];
  lastUpdated?: Maybe<Scalars['DateTime']>;
  merchant?: Maybe<Scalars['String']>;
  offersId?: Maybe<Scalars['Int']>;
  scryfallCardId?: Maybe<Scalars['String']>;
  source?: Maybe<Scalars['String']>;
};

export type LatestOfferHistoryObjectConnection = {
  __typename: 'LatestOfferHistoryObjectConnection';
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<LatestOfferHistoryObjectEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

/** A Relay edge containing a `LatestOfferHistoryObject` and its cursor. */
export type LatestOfferHistoryObjectEdge = {
  __typename: 'LatestOfferHistoryObjectEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
  /** The item at the end of the edge */
  node?: Maybe<LatestOfferHistoryObject>;
};

export type LatestOfferObject = Node & {
  __typename: 'LatestOfferObject';
  condition?: Maybe<Scalars['String']>;
  databaseId: Scalars['ID'];
  genericItems?: Maybe<GenericItemObjectConnection>;
  /** The ID of the object. */
  id: Scalars['ID'];
  item?: Maybe<GenericItemObject>;
  itemId?: Maybe<Scalars['Int']>;
  itemIndex?: Maybe<Scalars['String']>;
  lastUpdated?: Maybe<Scalars['String']>;
  latestOffersHistory?: Maybe<LatestOfferHistoryObjectConnection>;
  scryfallCardId?: Maybe<Scalars['String']>;
  timeSeries?: Maybe<Array<Maybe<OfferHistoryObject>>>;
};


export type LatestOfferObjectGenericItemsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type LatestOfferObjectLatestOffersHistoryArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type LatestOfferObjectConnection = {
  __typename: 'LatestOfferObjectConnection';
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<LatestOfferObjectEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

/** A Relay edge containing a `LatestOfferObject` and its cursor. */
export type LatestOfferObjectEdge = {
  __typename: 'LatestOfferObjectEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
  /** The item at the end of the edge */
  node?: Maybe<LatestOfferObject>;
};

export type ListingFeedbackObject = {
  __typename: 'ListingFeedbackObject';
  databaseId: Scalars['ID'];
  dateCreated?: Maybe<Scalars['DateTime']>;
  isCorrect?: Maybe<Scalars['Boolean']>;
  listingId?: Maybe<Scalars['Int']>;
  userComment?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['Int']>;
  userSelectedGenericId?: Maybe<Scalars['Int']>;
};

export type MediaObject = Node & {
  __typename: 'MediaObject';
  databaseId: Scalars['ID'];
  dateCreated?: Maybe<Scalars['String']>;
  dateUpdated?: Maybe<Scalars['String']>;
  /** The ID of the object. */
  id: Scalars['ID'];
  label?: Maybe<Scalars['String']>;
  mediaUrl?: Maybe<Scalars['String']>;
  realitem?: Maybe<RealItemObject>;
  realitemId: Scalars['Int'];
  type?: Maybe<Scalars['String']>;
};

export type MediaObjectConnection = {
  __typename: 'MediaObjectConnection';
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<MediaObjectEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

/** A Relay edge containing a `MediaObject` and its cursor. */
export type MediaObjectEdge = {
  __typename: 'MediaObjectEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
  /** The item at the end of the edge */
  node?: Maybe<MediaObject>;
};

export type MerchantsConditionMultiplierObject = Node & {
  __typename: 'MerchantsConditionMultiplierObject';
  conditionId?: Maybe<Scalars['String']>;
  databaseId: Scalars['ID'];
  /** The ID of the object. */
  id: Scalars['ID'];
  merchant?: Maybe<Scalars['String']>;
  multiplier?: Maybe<Scalars['Float']>;
};

export type Mutations = {
  __typename: 'Mutations';
  buyRealItemWithCredit?: Maybe<BuyRealItemWithCredit>;
  createGenericItem?: Maybe<CreateGenericItem>;
  /** requires name, owner is set to the user that is currently logged in / session user */
  createItemList?: Maybe<CreateItemList>;
  createMedia?: Maybe<CreateMedia>;
  /** item_id is genericItemId, sets creator to session user, sets owner to session user. creates activity */
  createRealItem?: Maybe<CreateRealItem>;
  /**
   * should be triggered by user submitting a transaction for review.
   * creates a transaction with PURPLEMANA_REVIEW status
   */
  createTransaction?: Maybe<CreateTransaction>;
  /** for user/admin to directly submit log to transactionLog - takes transactionId and message as required inputs */
  createTransactionLog?: Maybe<CreateTransactionLog>;
  createUpdateListingFeedback?: Maybe<CreateUpdateListingFeedback>;
  deleteGenericItem?: Maybe<DeleteGenericItem>;
  deleteItemList?: Maybe<DeleteItemList>;
  deleteMedia?: Maybe<DeleteMedia>;
  /** databaseId is realItemId, deletes realItem from database, deletes corresponding activities from database */
  deleteRealItem?: Maybe<DeleteRealItem>;
  /** required transactionId. only the left_owner can delete the transaction. deletes transaction items as well */
  deleteTransaction?: Maybe<DeleteTransaction>;
  deleteTransactionItem?: Maybe<DeleteTransactionItem>;
  updateGenericItem?: Maybe<UpdateGenericItem>;
  updateItemList?: Maybe<UpdateItemList>;
  updateMedia?: Maybe<UpdateMedia>;
  /** databaseId is realItemId, user must be owner of realItem or admin to update */
  updateRealItem?: Maybe<UpdateRealItem>;
  /**
   * requires transactionId.
   * transaction status is modeled as a finite state machine, status is capitalized string
   * newly created transactions are in PURPLEMANA_REVIEW state
   * admin denies -> CLIENT_REVIEW
   * admin approves -> TRADEIN_ARRIVING
   * admin approves in person -> CREDIT_ISSUED
   * if transaction_items / real_items / transaction is modified -> CLIENT_REVIEW
   * users can submit transactions CLIENT_REVIEW -> PURPLEMANA_REVIEW
   */
  updateRealItemStatus?: Maybe<UpdateRealItemStatus>;
  /**
   * requires transactionId.
   * transaction status is modeled as a finite state machine, status is capitalized string
   * newly created transactions are in PURPLEMANA_REVIEW state
   * admin denies -> CLIENT_REVIEW
   * admin approves -> TRADEIN_ARRIVING
   * admin approves in person -> CREDIT_ISSUED
   * if transaction_items / real_items / transaction is modified -> CLIENT_REVIEW
   * users can submit transactions CLIENT_REVIEW -> PURPLEMANA_REVIEW
   */
  updateTransactionStatus?: Maybe<UpdateTransactionStatus>;
  /** requires id, used for setting user preferences: per_page, view_mode, color_theme */
  updateUser?: Maybe<UpdateUser>;
};


export type MutationsBuyRealItemWithCreditArgs = {
  realItemId: Scalars['Int'];
};


export type MutationsCreateGenericItemArgs = {
  itemIndex: Scalars['String'];
  scryfallSetId: Scalars['String'];
};


export type MutationsCreateItemListArgs = {
  name: Scalars['String'];
  public?: InputMaybe<Scalars['Boolean']>;
};


export type MutationsCreateMediaArgs = {
  label: Scalars['String'];
  mediaUrl: Scalars['String'];
  realItemId: Scalars['Int'];
  type: Scalars['String'];
};


export type MutationsCreateRealItemArgs = {
  condition?: InputMaybe<Scalars['String']>;
  forsalePrice?: InputMaybe<Scalars['Float']>;
  itemId: Scalars['Int'];
  itemListId: Scalars['Int'];
};


export type MutationsCreateTransactionArgs = {
  itemListId: Scalars['Int'];
};


export type MutationsCreateTransactionLogArgs = {
  message: Scalars['String'];
  transactionId: Scalars['Int'];
};


export type MutationsCreateUpdateListingFeedbackArgs = {
  ebaylistingId: Scalars['Int'];
  isCorrect: Scalars['Boolean'];
  userComment?: InputMaybe<Scalars['String']>;
  userSelectedGenericId?: InputMaybe<Scalars['Int']>;
};


export type MutationsDeleteGenericItemArgs = {
  databaseId: Scalars['Int'];
};


export type MutationsDeleteItemListArgs = {
  databaseId: Scalars['Int'];
};


export type MutationsDeleteMediaArgs = {
  databaseId: Scalars['Int'];
};


export type MutationsDeleteRealItemArgs = {
  databaseId: Scalars['Int'];
};


export type MutationsDeleteTransactionArgs = {
  transactionId: Scalars['Int'];
};


export type MutationsDeleteTransactionItemArgs = {
  transactionItemId: Scalars['Int'];
};


export type MutationsUpdateGenericItemArgs = {
  artist?: InputMaybe<Scalars['String']>;
  booster?: InputMaybe<Scalars['String']>;
  borderColor?: InputMaybe<Scalars['String']>;
  cardBackId?: InputMaybe<Scalars['String']>;
  cardmarketId?: InputMaybe<Scalars['String']>;
  cmc?: InputMaybe<Scalars['Float']>;
  collectorNumber?: InputMaybe<Scalars['String']>;
  colorIdentity?: InputMaybe<Scalars['String']>;
  colors?: InputMaybe<Scalars['String']>;
  databaseId: Scalars['Int'];
  etchedfoil?: InputMaybe<Scalars['Boolean']>;
  flavorName?: InputMaybe<Scalars['String']>;
  flavorText?: InputMaybe<Scalars['String']>;
  foil?: InputMaybe<Scalars['Boolean']>;
  frame?: InputMaybe<Scalars['String']>;
  fullArt?: InputMaybe<Scalars['Boolean']>;
  games?: InputMaybe<Scalars['String']>;
  illustrationId?: InputMaybe<Scalars['String']>;
  imageUriLarge?: InputMaybe<Scalars['String']>;
  imageUriNormal?: InputMaybe<Scalars['String']>;
  imageUriPng?: InputMaybe<Scalars['String']>;
  imageUriSmall?: InputMaybe<Scalars['String']>;
  imageUris?: InputMaybe<Scalars['String']>;
  itemIndex?: InputMaybe<Scalars['String']>;
  keywords?: InputMaybe<Scalars['String']>;
  lang?: InputMaybe<Scalars['String']>;
  layout?: InputMaybe<Scalars['String']>;
  legalities?: InputMaybe<Scalars['String']>;
  loyalty?: InputMaybe<Scalars['String']>;
  manaCost?: InputMaybe<Scalars['String']>;
  mtgoFoilId?: InputMaybe<Scalars['String']>;
  mtgoId?: InputMaybe<Scalars['String']>;
  multiverseIds?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  nonfoil?: InputMaybe<Scalars['Boolean']>;
  oracleId?: InputMaybe<Scalars['String']>;
  oracleText?: InputMaybe<Scalars['String']>;
  originalName?: InputMaybe<Scalars['String']>;
  oversized?: InputMaybe<Scalars['Boolean']>;
  power?: InputMaybe<Scalars['String']>;
  printedName?: InputMaybe<Scalars['String']>;
  printedText?: InputMaybe<Scalars['String']>;
  printedTypeLine?: InputMaybe<Scalars['String']>;
  producedMana?: InputMaybe<Scalars['String']>;
  promo?: InputMaybe<Scalars['Boolean']>;
  purchaseUris?: InputMaybe<Scalars['String']>;
  rarity?: InputMaybe<Scalars['String']>;
  releasedAt?: InputMaybe<Scalars['Date']>;
  reserved?: InputMaybe<Scalars['Boolean']>;
  scryfallCardId?: InputMaybe<Scalars['String']>;
  scryfallSetUri?: InputMaybe<Scalars['String']>;
  scryfallUri?: InputMaybe<Scalars['String']>;
  set?: InputMaybe<Scalars['String']>;
  setName?: InputMaybe<Scalars['String']>;
  setSearchUri?: InputMaybe<Scalars['String']>;
  setType?: InputMaybe<Scalars['String']>;
  setUri?: InputMaybe<Scalars['String']>;
  tcgplayerId?: InputMaybe<Scalars['String']>;
  textless?: InputMaybe<Scalars['Boolean']>;
  toughness?: InputMaybe<Scalars['String']>;
  typeLine?: InputMaybe<Scalars['String']>;
  uri?: InputMaybe<Scalars['String']>;
  variation?: InputMaybe<Scalars['String']>;
  variationOf?: InputMaybe<Scalars['String']>;
};


export type MutationsUpdateItemListArgs = {
  databaseId: Scalars['Int'];
  name?: InputMaybe<Scalars['String']>;
  public?: InputMaybe<Scalars['Boolean']>;
  userId?: InputMaybe<Scalars['Int']>;
};


export type MutationsUpdateMediaArgs = {
  databaseId: Scalars['Int'];
  label?: InputMaybe<Scalars['String']>;
  mediaUrl?: InputMaybe<Scalars['String']>;
  realItemId?: InputMaybe<Scalars['Int']>;
  type?: InputMaybe<Scalars['String']>;
};


export type MutationsUpdateRealItemArgs = {
  condition?: InputMaybe<Scalars['String']>;
  databaseId: Scalars['Int'];
  forsalePrice?: InputMaybe<Scalars['Float']>;
  itemId?: InputMaybe<Scalars['Int']>;
  itemListId?: InputMaybe<Scalars['Int']>;
};


export type MutationsUpdateRealItemStatusArgs = {
  adminComment?: InputMaybe<Scalars['String']>;
  realItemId: Scalars['Int'];
  status: Scalars['String'];
};


export type MutationsUpdateTransactionStatusArgs = {
  adminComment?: InputMaybe<Scalars['String']>;
  status: Scalars['String'];
  testing?: InputMaybe<Scalars['Boolean']>;
  transactionId: Scalars['Int'];
};


export type MutationsUpdateUserArgs = {
  city?: InputMaybe<Scalars['String']>;
  colorTheme?: InputMaybe<Scalars['String']>;
  country?: InputMaybe<Scalars['String']>;
  databaseId: Scalars['Int'];
  name?: InputMaybe<Scalars['String']>;
  perPage?: InputMaybe<Scalars['Int']>;
  state?: InputMaybe<Scalars['String']>;
  street1?: InputMaybe<Scalars['String']>;
  street2?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
  viewMode?: InputMaybe<Scalars['String']>;
  zip?: InputMaybe<Scalars['String']>;
};

/** An object with an ID */
export type Node = {
  /** The ID of the object. */
  id: Scalars['ID'];
};

export type OfferHistoryObject = Node & {
  __typename: 'OfferHistoryObject';
  amount?: Maybe<Scalars['Float']>;
  cardType?: Maybe<Scalars['String']>;
  condition?: Maybe<Scalars['String']>;
  /** The ID of the object. */
  id: Scalars['ID'];
  lastUpdated?: Maybe<Scalars['DateTime']>;
  merchant?: Maybe<Scalars['String']>;
  offers?: Maybe<OfferObject>;
  offersId?: Maybe<Scalars['Int']>;
  scryfallCardId?: Maybe<Scalars['String']>;
  source?: Maybe<Scalars['String']>;
};

export type OfferHistoryObjectConnection = {
  __typename: 'OfferHistoryObjectConnection';
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<OfferHistoryObjectEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

/** A Relay edge containing a `OfferHistoryObject` and its cursor. */
export type OfferHistoryObjectEdge = {
  __typename: 'OfferHistoryObjectEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
  /** The item at the end of the edge */
  node?: Maybe<OfferHistoryObject>;
};

export type OfferObject = Node & {
  __typename: 'OfferObject';
  condition?: Maybe<Scalars['String']>;
  genericItems?: Maybe<GenericItemObjectConnection>;
  /** The ID of the object. */
  id: Scalars['ID'];
  item?: Maybe<GenericItemObject>;
  itemId?: Maybe<Scalars['Int']>;
  itemIndex?: Maybe<Scalars['String']>;
  lastUpdated?: Maybe<Scalars['String']>;
  offersHistory?: Maybe<OfferHistoryObjectConnection>;
  scryfallCardId?: Maybe<Scalars['String']>;
};


export type OfferObjectGenericItemsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type OfferObjectOffersHistoryArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type OfferObjectConnection = {
  __typename: 'OfferObjectConnection';
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<OfferObjectEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

/** A Relay edge containing a `OfferObject` and its cursor. */
export type OfferObjectEdge = {
  __typename: 'OfferObjectEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
  /** The item at the end of the edge */
  node?: Maybe<OfferObject>;
};

/** The Relay compliant `PageInfo` type, containing data necessary to paginate this connection. */
export type PageInfo = {
  __typename: 'PageInfo';
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']>;
};

/** perPage pagination argument has a built in hard limit of 1000 */
export type Query = {
  __typename: 'Query';
  activities?: Maybe<Array<Maybe<ActivitiesObject>>>;
  /** list of conditions is small and query simply returns all */
  conditions?: Maybe<Array<Maybe<ConditionsObject>>>;
  countPublished?: Maybe<Scalars['Int']>;
  defects?: Maybe<Array<Maybe<DefectsObject>>>;
  /** Get Ebay listings. Filterable by database_id */
  ebayListing?: Maybe<Array<Maybe<EbayListingObject>>>;
  /** pulls list of all names from genericItems, then removes duplicates */
  genericItemNames?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** filterable by set_code, scryfallCardId, itemIndex, and partialName. partialName finds genericItems with names like %partialName% and is case insensitive */
  genericItems?: Maybe<Array<Maybe<GenericItemObject>>>;
  /** filters by user_id, name, collection_id, trashed, order_status. paginated with page/perPage arguments. if a userId isn't provided, defaults to user determined by session, only admin has access to view other users collection. */
  itemCollections?: Maybe<Array<Maybe<ItemCollectionObject>>>;
  /** filters by user_id, name, collection_id, trashed, order_status. paginated with page/perPage arguments. if a userId isn't provided, defaults to user determined by session, only admin has access to view other users collection. */
  itemLists?: Maybe<Array<Maybe<ItemListsObject>>>;
  /** filters by scryfallCardId and genericItemId if provided. Always returns a single offer */
  latestOffers?: Maybe<Array<Maybe<LatestOfferObject>>>;
  /** filterable by user_id, paginated with page/perPage arguments */
  listingFeedback?: Maybe<Array<Maybe<ListingFeedbackObject>>>;
  /** filter by realItemId */
  media?: Maybe<Array<Maybe<MediaObject>>>;
  merchantsConditionMultiplier?: Maybe<Array<Maybe<MerchantsConditionMultiplierObject>>>;
  /** pulls data from full offers table, custom resolver is implemented to return PM time series through offersHistory subquery */
  offers?: Maybe<Array<Maybe<OfferObject>>>;
  /** filtered by collection_id, userId (owner), paginated with page/perPage. sortKey values are: fmv and item_hash */
  realItems?: Maybe<Array<Maybe<RealItemObject>>>;
  /** filterable by set_code, paginated with page/perPage arguments */
  sets?: Maybe<Array<Maybe<SetObject>>>;
  shippoQuotes?: Maybe<Array<Maybe<ShippoQuoteObject>>>;
  subscriptions?: Maybe<Array<Maybe<SubscriptionsObject>>>;
  /** ordered by total value */
  topItemLists?: Maybe<Array<Maybe<ItemListsObject>>>;
  /** filter by transactionId */
  transactionItems?: Maybe<Array<Maybe<TransactionItemObject>>>;
  /** filter by transactionId, page, perPage */
  transactionLogs?: Maybe<Array<Maybe<TransactionLogObject>>>;
  /** filter by transactionId, userId, collectionId transaction status, sort_option can take on these values: dateCreated, dateUpdated, rightCredit,sort_mode can take on 'asc' or 'desc'  */
  transactions?: Maybe<Array<Maybe<TransactionsObject>>>;
  /** filterable by user_id, can only pull information about other users as admin */
  user?: Maybe<UserObject>;
};


/** perPage pagination argument has a built in hard limit of 1000 */
export type QueryActivitiesArgs = {
  page?: InputMaybe<Scalars['Int']>;
  perPage?: InputMaybe<Scalars['Int']>;
};


/** perPage pagination argument has a built in hard limit of 1000 */
export type QueryDefectsArgs = {
  page?: InputMaybe<Scalars['Int']>;
  perPage?: InputMaybe<Scalars['Int']>;
  realItemId?: InputMaybe<Scalars['Int']>;
};


/** perPage pagination argument has a built in hard limit of 1000 */
export type QueryEbayListingArgs = {
  databaseId?: InputMaybe<Scalars['Int']>;
  hasPrediction?: InputMaybe<Scalars['Boolean']>;
  page?: InputMaybe<Scalars['Int']>;
  perPage?: InputMaybe<Scalars['Int']>;
  winningBidSort?: InputMaybe<Scalars['Boolean']>;
};


/** perPage pagination argument has a built in hard limit of 1000 */
export type QueryGenericItemsArgs = {
  databaseId?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  itemIndex?: InputMaybe<Scalars['String']>;
  page?: InputMaybe<Scalars['Int']>;
  partialName?: InputMaybe<Scalars['String']>;
  perPage?: InputMaybe<Scalars['Int']>;
  scryfallCardId?: InputMaybe<Scalars['String']>;
  setCode?: InputMaybe<Scalars['String']>;
};


/** perPage pagination argument has a built in hard limit of 1000 */
export type QueryItemCollectionsArgs = {
  collectionId?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  orderStatus?: InputMaybe<Scalars['String']>;
  page?: InputMaybe<Scalars['Int']>;
  perPage?: InputMaybe<Scalars['Int']>;
  trashed?: InputMaybe<Scalars['Boolean']>;
  userId?: InputMaybe<Scalars['Int']>;
};


/** perPage pagination argument has a built in hard limit of 1000 */
export type QueryItemListsArgs = {
  itemListId?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  page?: InputMaybe<Scalars['Int']>;
  perPage?: InputMaybe<Scalars['Int']>;
  userId?: InputMaybe<Scalars['Int']>;
};


/** perPage pagination argument has a built in hard limit of 1000 */
export type QueryLatestOffersArgs = {
  genericItemId?: InputMaybe<Scalars['Int']>;
  scryfallCardId?: InputMaybe<Scalars['String']>;
};


/** perPage pagination argument has a built in hard limit of 1000 */
export type QueryListingFeedbackArgs = {
  page?: InputMaybe<Scalars['Int']>;
  perPage?: InputMaybe<Scalars['Int']>;
  userId?: InputMaybe<Scalars['Int']>;
};


/** perPage pagination argument has a built in hard limit of 1000 */
export type QueryMediaArgs = {
  page?: InputMaybe<Scalars['Int']>;
  perPage?: InputMaybe<Scalars['Int']>;
  realItemId?: InputMaybe<Scalars['Int']>;
};


/** perPage pagination argument has a built in hard limit of 1000 */
export type QueryOffersArgs = {
  genericItemId?: InputMaybe<Scalars['Int']>;
  maxEntries?: InputMaybe<Scalars['Int']>;
  scryfallCardId?: InputMaybe<Scalars['String']>;
  startDate?: InputMaybe<Scalars['String']>;
};


/** perPage pagination argument has a built in hard limit of 1000 */
export type QueryRealItemsArgs = {
  collectionId?: InputMaybe<Scalars['Int']>;
  itemListId?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  partialName?: InputMaybe<Scalars['String']>;
  perPage?: InputMaybe<Scalars['Int']>;
  realItemId?: InputMaybe<Scalars['Int']>;
  sortKey?: InputMaybe<Scalars['String']>;
  sortReverse?: InputMaybe<Scalars['Boolean']>;
  status?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['Int']>;
};


/** perPage pagination argument has a built in hard limit of 1000 */
export type QuerySetsArgs = {
  page?: InputMaybe<Scalars['Int']>;
  partialName?: InputMaybe<Scalars['String']>;
  perPage?: InputMaybe<Scalars['Int']>;
  setCode?: InputMaybe<Scalars['String']>;
};


/** perPage pagination argument has a built in hard limit of 1000 */
export type QueryShippoQuotesArgs = {
  userId?: InputMaybe<Scalars['Int']>;
};


/** perPage pagination argument has a built in hard limit of 1000 */
export type QueryTopItemListsArgs = {
  page?: InputMaybe<Scalars['Int']>;
  perPage?: InputMaybe<Scalars['Int']>;
};


/** perPage pagination argument has a built in hard limit of 1000 */
export type QueryTransactionItemsArgs = {
  page?: InputMaybe<Scalars['Int']>;
  perPage?: InputMaybe<Scalars['Int']>;
  transactionId?: InputMaybe<Scalars['Int']>;
};


/** perPage pagination argument has a built in hard limit of 1000 */
export type QueryTransactionLogsArgs = {
  page?: InputMaybe<Scalars['Int']>;
  perPage?: InputMaybe<Scalars['Int']>;
  transactionId?: InputMaybe<Scalars['Int']>;
};


/** perPage pagination argument has a built in hard limit of 1000 */
export type QueryTransactionsArgs = {
  collectionId?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  perPage?: InputMaybe<Scalars['Int']>;
  sortMode?: InputMaybe<Scalars['String']>;
  sortOption?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Scalars['String']>;
  statusArray?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  transactionId?: InputMaybe<Scalars['Int']>;
  userId?: InputMaybe<Scalars['Int']>;
};


/** perPage pagination argument has a built in hard limit of 1000 */
export type QueryUserArgs = {
  userId?: InputMaybe<Scalars['Int']>;
};

export type RealItemObject = Node & {
  __typename: 'RealItemObject';
  condition?: Maybe<Scalars['String']>;
  costBasis?: Maybe<Scalars['Float']>;
  creator?: Maybe<Scalars['Int']>;
  databaseId: Scalars['ID'];
  dateCreated?: Maybe<Scalars['String']>;
  dateUpdated?: Maybe<Scalars['String']>;
  defects?: Maybe<DefectsObjectConnection>;
  fmv?: Maybe<Scalars['Float']>;
  forsalePrice?: Maybe<Scalars['Float']>;
  genericItems?: Maybe<GenericItemObjectConnection>;
  /** The ID of the object. */
  id: Scalars['ID'];
  itemCollectionsId?: Maybe<Scalars['Int']>;
  itemHash?: Maybe<Scalars['String']>;
  itemId?: Maybe<Scalars['Int']>;
  itemListId?: Maybe<Scalars['Int']>;
  media?: Maybe<MediaObjectConnection>;
  mediaCount?: Maybe<Scalars['Int']>;
  owner?: Maybe<Scalars['Int']>;
  qrLabelUrl?: Maybe<Scalars['String']>;
  qrUrl?: Maybe<Scalars['String']>;
  recentTransaction?: Maybe<Scalars['Int']>;
  sku?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  tradeInValue?: Maybe<Scalars['Float']>;
  transactionStatus?: Maybe<Scalars['String']>;
  userList?: Maybe<Scalars['String']>;
  woocommerceProductId?: Maybe<Scalars['Int']>;
  woocommerceUrl?: Maybe<Scalars['String']>;
};


export type RealItemObjectDefectsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type RealItemObjectGenericItemsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type RealItemObjectMediaArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type RealItemObjectConnection = {
  __typename: 'RealItemObjectConnection';
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<RealItemObjectEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

/** A Relay edge containing a `RealItemObject` and its cursor. */
export type RealItemObjectEdge = {
  __typename: 'RealItemObjectEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
  /** The item at the end of the edge */
  node?: Maybe<RealItemObject>;
};

export type SetObject = Node & {
  __typename: 'SetObject';
  arenaCode?: Maybe<Scalars['String']>;
  code?: Maybe<Scalars['String']>;
  digital?: Maybe<Scalars['Boolean']>;
  foilOnly?: Maybe<Scalars['Boolean']>;
  genericItems?: Maybe<GenericItemObjectConnection>;
  iconSvgUri?: Maybe<Scalars['String']>;
  /** The ID of the object. */
  id: Scalars['ID'];
  mtgoCode?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  nonfoilOnly?: Maybe<Scalars['Boolean']>;
  releasedAt?: Maybe<Scalars['String']>;
  scryfallSetId?: Maybe<Scalars['String']>;
  scryfallUri?: Maybe<Scalars['String']>;
  searchUri?: Maybe<Scalars['String']>;
  setType?: Maybe<Scalars['String']>;
  tcgplayerId?: Maybe<Scalars['Int']>;
  uri?: Maybe<Scalars['String']>;
};


export type SetObjectGenericItemsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type ShippoQuoteObject = {
  __typename: 'ShippoQuoteObject';
  amount?: Maybe<Scalars['Float']>;
  estimatedDays?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  provider?: Maybe<Scalars['String']>;
  token?: Maybe<Scalars['String']>;
};

export type SubscriptionsObject = Node & {
  __typename: 'SubscriptionsObject';
  collectionId?: Maybe<Scalars['Int']>;
  databaseId: Scalars['ID'];
  genericItemId?: Maybe<Scalars['Int']>;
  /** The ID of the object. */
  id: Scalars['ID'];
  offersId?: Maybe<Scalars['Int']>;
  realItemId?: Maybe<Scalars['Int']>;
  subscriberId?: Maybe<Scalars['Int']>;
  userId?: Maybe<Scalars['Int']>;
};

export type TransactionItemObject = Node & {
  __typename: 'TransactionItemObject';
  adminPrice?: Maybe<Scalars['Float']>;
  databaseId: Scalars['ID'];
  finalApproval?: Maybe<Scalars['Boolean']>;
  /** The ID of the object. */
  id: Scalars['ID'];
  realItemId?: Maybe<Scalars['Int']>;
  realItems?: Maybe<RealItemObjectConnection>;
  side?: Maybe<Scalars['String']>;
  tradeInValue?: Maybe<Scalars['Float']>;
  tradeInValueNm?: Maybe<Scalars['Float']>;
  transactionId?: Maybe<Scalars['Int']>;
  webApproval?: Maybe<Scalars['Boolean']>;
};


export type TransactionItemObjectRealItemsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type TransactionItemObjectConnection = {
  __typename: 'TransactionItemObjectConnection';
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<TransactionItemObjectEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

/** A Relay edge containing a `TransactionItemObject` and its cursor. */
export type TransactionItemObjectEdge = {
  __typename: 'TransactionItemObjectEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
  /** The item at the end of the edge */
  node?: Maybe<TransactionItemObject>;
};

export type TransactionLogObject = Node & {
  __typename: 'TransactionLogObject';
  databaseId: Scalars['ID'];
  dateCreated?: Maybe<Scalars['String']>;
  /** The ID of the object. */
  id: Scalars['ID'];
  message?: Maybe<Scalars['String']>;
  transactionId?: Maybe<Scalars['Int']>;
};

export type TransactionsObject = Node & {
  __typename: 'TransactionsObject';
  adminComment?: Maybe<Scalars['String']>;
  count?: Maybe<Scalars['Int']>;
  databaseId: Scalars['ID'];
  dateCreated?: Maybe<Scalars['String']>;
  dateUpdated?: Maybe<Scalars['String']>;
  halfClosedSide?: Maybe<Scalars['String']>;
  /** The ID of the object. */
  id: Scalars['ID'];
  leftClose?: Maybe<Scalars['Boolean']>;
  leftConfirm?: Maybe<Scalars['Boolean']>;
  leftCredit?: Maybe<Scalars['Float']>;
  leftOwner?: Maybe<Scalars['Int']>;
  paypalCosts?: Maybe<Scalars['Float']>;
  rightClose?: Maybe<Scalars['Boolean']>;
  rightConfirm?: Maybe<Scalars['Boolean']>;
  rightCredit?: Maybe<Scalars['Float']>;
  rightOwner?: Maybe<Scalars['Int']>;
  shippingAndHandlingCosts?: Maybe<Scalars['Float']>;
  status?: Maybe<Scalars['String']>;
  transactionItems?: Maybe<TransactionItemObjectConnection>;
  user?: Maybe<UserObject>;
  webAdminApproved?: Maybe<Scalars['Boolean']>;
};


export type TransactionsObjectTransactionItemsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type UpdateGenericItem = {
  __typename: 'UpdateGenericItem';
  debug?: Maybe<Scalars['String']>;
  genericItem?: Maybe<GenericItemObject>;
  ok?: Maybe<Scalars['Boolean']>;
};

export type UpdateItemList = {
  __typename: 'UpdateItemList';
  debug?: Maybe<Scalars['String']>;
  itemList?: Maybe<ItemListsObject>;
  ok?: Maybe<Scalars['Boolean']>;
};

export type UpdateMedia = {
  __typename: 'UpdateMedia';
  debug?: Maybe<Scalars['String']>;
  media?: Maybe<MediaObject>;
  ok?: Maybe<Scalars['Boolean']>;
};

/** databaseId is realItemId, user must be owner of realItem or admin to update */
export type UpdateRealItem = {
  __typename: 'UpdateRealItem';
  debug?: Maybe<Scalars['String']>;
  ok?: Maybe<Scalars['Boolean']>;
  realItem?: Maybe<RealItemObject>;
};

/**
 * requires transactionId.
 * transaction status is modeled as a finite state machine, status is capitalized string
 * newly created transactions are in PURPLEMANA_REVIEW state
 * admin denies -> CLIENT_REVIEW
 * admin approves -> TRADEIN_ARRIVING
 * admin approves in person -> CREDIT_ISSUED
 * if transaction_items / real_items / transaction is modified -> CLIENT_REVIEW
 * users can submit transactions CLIENT_REVIEW -> PURPLEMANA_REVIEW
 */
export type UpdateRealItemStatus = {
  __typename: 'UpdateRealItemStatus';
  debug?: Maybe<Scalars['String']>;
  ok?: Maybe<Scalars['Boolean']>;
  realItem?: Maybe<RealItemObject>;
};

/**
 * requires transactionId.
 * transaction status is modeled as a finite state machine, status is capitalized string
 * newly created transactions are in PURPLEMANA_REVIEW state
 * admin denies -> CLIENT_REVIEW
 * admin approves -> TRADEIN_ARRIVING
 * admin approves in person -> CREDIT_ISSUED
 * if transaction_items / real_items / transaction is modified -> CLIENT_REVIEW
 * users can submit transactions CLIENT_REVIEW -> PURPLEMANA_REVIEW
 */
export type UpdateTransactionStatus = {
  __typename: 'UpdateTransactionStatus';
  debug?: Maybe<Scalars['String']>;
  ok?: Maybe<Scalars['Boolean']>;
  transaction?: Maybe<TransactionsObject>;
};

/** requires id, used for setting user preferences: per_page, view_mode, color_theme */
export type UpdateUser = {
  __typename: 'UpdateUser';
  debug?: Maybe<Scalars['String']>;
  ok?: Maybe<Scalars['Boolean']>;
  user?: Maybe<UserObject>;
};

export type UserObject = Node & {
  __typename: 'UserObject';
  addressCity?: Maybe<Scalars['String']>;
  addressCountry?: Maybe<Scalars['String']>;
  addressLineOne?: Maybe<Scalars['String']>;
  addressLineTwo?: Maybe<Scalars['String']>;
  addressState?: Maybe<Scalars['String']>;
  addressZipcode?: Maybe<Scalars['String']>;
  colorTheme?: Maybe<Scalars['String']>;
  credit?: Maybe<Scalars['Float']>;
  databaseId: Scalars['ID'];
  dateCreated?: Maybe<Scalars['DateTime']>;
  dateUpdated?: Maybe<Scalars['DateTime']>;
  email?: Maybe<Scalars['String']>;
  /** The ID of the object. */
  id: Scalars['ID'];
  itemCollections?: Maybe<ItemCollectionObjectConnection>;
  lastLogin?: Maybe<Scalars['DateTime']>;
  perPage?: Maybe<Scalars['Int']>;
  phoneNumber?: Maybe<Scalars['String']>;
  realName?: Maybe<Scalars['String']>;
  securityRole?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
  viewMode?: Maybe<Scalars['String']>;
};


export type UserObjectItemCollectionsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type ConditionNodeFragment = (
  { __typename: 'ConditionsObject' }
  & Pick<ConditionsObject, 'id' | 'usCode' | 'euCode' | 'dateUpdated' | 'type' | 'sortOrder'>
);

export type MultiplierFragment = (
  { __typename: 'MerchantsConditionMultiplierObject' }
  & Pick<MerchantsConditionMultiplierObject, 'databaseId' | 'merchant' | 'conditionId' | 'multiplier' | 'id'>
);

export type RealItemFragment = (
  { __typename: 'RealItemObject' }
  & Pick<RealItemObject, 'id' | 'databaseId' | 'itemCollectionsId' | 'itemId' | 'sku' | 'creator' | 'owner' | 'dateCreated' | 'dateUpdated' | 'condition' | 'costBasis' | 'fmv' | 'tradeInValue' | 'woocommerceUrl' | 'woocommerceProductId' | 'forsalePrice' | 'status'>
);

export type CreateRealItemMutationVariables = Exact<{
  itemId: Scalars['Int'];
  itemListId: Scalars['Int'];
  condition?: InputMaybe<Scalars['String']>;
}>;


export type CreateRealItemMutation = (
  { __typename: 'Mutations' }
  & { createRealItem?: Maybe<(
    { __typename: 'CreateRealItem' }
    & Pick<CreateRealItem, 'ok'>
  )> }
);

export type UpdateRealItemMutationVariables = Exact<{
  condition?: InputMaybe<Scalars['String']>;
  databaseId: Scalars['Int'];
  forsalePrice?: InputMaybe<Scalars['Float']>;
  itemId?: InputMaybe<Scalars['Int']>;
}>;


export type UpdateRealItemMutation = (
  { __typename: 'Mutations' }
  & { updateRealItem?: Maybe<(
    { __typename: 'UpdateRealItem' }
    & Pick<UpdateRealItem, 'ok' | 'debug'>
  )> }
);

export type UpdateRealItemStatusMutationVariables = Exact<{
  adminComment?: InputMaybe<Scalars['String']>;
  realItemId: Scalars['Int'];
  status: Scalars['String'];
}>;


export type UpdateRealItemStatusMutation = (
  { __typename: 'Mutations' }
  & { updateRealItemStatus?: Maybe<(
    { __typename: 'UpdateRealItemStatus' }
    & Pick<UpdateRealItemStatus, 'ok' | 'debug'>
  )> }
);

export type DeleteRealItemMutationVariables = Exact<{
  databaseId: Scalars['Int'];
}>;


export type DeleteRealItemMutation = (
  { __typename: 'Mutations' }
  & { deleteRealItem?: Maybe<(
    { __typename: 'DeleteRealItem' }
    & Pick<DeleteRealItem, 'ok' | 'debug'>
  )> }
);

export type UpdateMediaMutationVariables = Exact<{
  databaseId: Scalars['Int'];
  label?: InputMaybe<Scalars['String']>;
  mediaUrl?: InputMaybe<Scalars['String']>;
  realItemId?: InputMaybe<Scalars['Int']>;
  type?: InputMaybe<Scalars['String']>;
}>;


export type UpdateMediaMutation = (
  { __typename: 'Mutations' }
  & { updateMedia?: Maybe<(
    { __typename: 'UpdateMedia' }
    & Pick<UpdateMedia, 'ok'>
  )> }
);

export type DeleteMediaMutationVariables = Exact<{
  databaseId: Scalars['Int'];
}>;


export type DeleteMediaMutation = (
  { __typename: 'Mutations' }
  & { deleteMedia?: Maybe<(
    { __typename: 'DeleteMedia' }
    & Pick<DeleteMedia, 'ok'>
  )> }
);

export type CreateTransactionMutationVariables = Exact<{
  itemListId: Scalars['Int'];
}>;


export type CreateTransactionMutation = (
  { __typename: 'Mutations' }
  & { createTransaction?: Maybe<(
    { __typename: 'CreateTransaction' }
    & Pick<CreateTransaction, 'ok' | 'debug'>
  )> }
);

export type UpdateTransactionStatusMutationVariables = Exact<{
  adminComment?: InputMaybe<Scalars['String']>;
  status: Scalars['String'];
  transactionId: Scalars['Int'];
}>;


export type UpdateTransactionStatusMutation = (
  { __typename: 'Mutations' }
  & { updateTransactionStatus?: Maybe<(
    { __typename: 'UpdateTransactionStatus' }
    & Pick<UpdateTransactionStatus, 'ok' | 'debug'>
  )> }
);

export type DeleteTransactionItemMutationVariables = Exact<{
  transactionItemId: Scalars['Int'];
}>;


export type DeleteTransactionItemMutation = (
  { __typename: 'Mutations' }
  & { deleteTransactionItem?: Maybe<(
    { __typename: 'DeleteTransactionItem' }
    & Pick<DeleteTransactionItem, 'ok' | 'debug'>
  )> }
);

export type DeleteTransactionMutationVariables = Exact<{
  transactionId: Scalars['Int'];
}>;


export type DeleteTransactionMutation = (
  { __typename: 'Mutations' }
  & { deleteTransaction?: Maybe<(
    { __typename: 'DeleteTransaction' }
    & Pick<DeleteTransaction, 'ok' | 'debug'>
  )> }
);

export type CreateItemListMutationVariables = Exact<{
  name: Scalars['String'];
}>;


export type CreateItemListMutation = (
  { __typename: 'Mutations' }
  & { createItemList?: Maybe<(
    { __typename: 'CreateItemList' }
    & Pick<CreateItemList, 'ok' | 'debug'>
  )> }
);

export type DeleteItemListMutationVariables = Exact<{
  databaseId: Scalars['Int'];
}>;


export type DeleteItemListMutation = (
  { __typename: 'Mutations' }
  & { deleteItemList?: Maybe<(
    { __typename: 'DeleteItemList' }
    & Pick<DeleteItemList, 'ok' | 'debug'>
  )> }
);

export type BuyRealItemWithCreditMutationVariables = Exact<{
  realItemId: Scalars['Int'];
}>;


export type BuyRealItemWithCreditMutation = (
  { __typename: 'Mutations' }
  & { buyRealItemWithCredit?: Maybe<(
    { __typename: 'BuyRealItemWithCredit' }
    & Pick<BuyRealItemWithCredit, 'ok' | 'debug'>
  )> }
);

export type UpdateUserMutationVariables = Exact<{
  colorTheme?: InputMaybe<Scalars['String']>;
  databaseId: Scalars['Int'];
  perPage?: InputMaybe<Scalars['Int']>;
  username?: InputMaybe<Scalars['String']>;
  viewMode?: InputMaybe<Scalars['String']>;
}>;


export type UpdateUserMutation = (
  { __typename: 'Mutations' }
  & { updateUser?: Maybe<(
    { __typename: 'UpdateUser' }
    & Pick<UpdateUser, 'ok' | 'debug'>
  )> }
);

export type UpdateShipInfoMutationVariables = Exact<{
  databaseId: Scalars['Int'];
  name: Scalars['String'];
  street1: Scalars['String'];
  street2?: InputMaybe<Scalars['String']>;
  city: Scalars['String'];
  state: Scalars['String'];
  zip: Scalars['String'];
  country: Scalars['String'];
}>;


export type UpdateShipInfoMutation = (
  { __typename: 'Mutations' }
  & { updateUser?: Maybe<(
    { __typename: 'UpdateUser' }
    & Pick<UpdateUser, 'ok' | 'debug'>
  )> }
);

export type CreateUpdateListingFeedbackMutationVariables = Exact<{
  ebaylistingId: Scalars['Int'];
  isCorrect: Scalars['Boolean'];
  userComment?: InputMaybe<Scalars['String']>;
  userSelectedGenericId?: InputMaybe<Scalars['Int']>;
}>;


export type CreateUpdateListingFeedbackMutation = (
  { __typename: 'Mutations' }
  & { createUpdateListingFeedback?: Maybe<(
    { __typename: 'CreateUpdateListingFeedback' }
    & Pick<CreateUpdateListingFeedback, 'ok' | 'debug'>
    & { listingFeedback?: Maybe<(
      { __typename: 'ListingFeedbackObject' }
      & Pick<ListingFeedbackObject, 'userId' | 'isCorrect' | 'userComment' | 'dateCreated'>
    )> }
  )> }
);

export type CreateTransactionLogMutationVariables = Exact<{
  message: Scalars['String'];
  transactionId: Scalars['Int'];
}>;


export type CreateTransactionLogMutation = (
  { __typename: 'Mutations' }
  & { createTransactionLog?: Maybe<(
    { __typename: 'CreateTransactionLog' }
    & Pick<CreateTransactionLog, 'ok' | 'debug'>
  )> }
);

export type GetUserQueryVariables = Exact<{
  userId?: InputMaybe<Scalars['Int']>;
}>;


export type GetUserQuery = (
  { __typename: 'Query' }
  & { user?: Maybe<(
    { __typename: 'UserObject' }
    & Pick<UserObject, 'username' | 'databaseId' | 'securityRole' | 'credit' | 'email'>
  )> }
);

export type CollectionQueryVariables = Exact<{
  userId?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  collectionId?: InputMaybe<Scalars['Int']>;
  trashed?: InputMaybe<Scalars['Boolean']>;
  orderStatus?: InputMaybe<Scalars['String']>;
  page?: InputMaybe<Scalars['Int']>;
  perPage?: InputMaybe<Scalars['Int']>;
}>;


export type CollectionQuery = (
  { __typename: 'Query' }
  & { itemCollections?: Maybe<Array<Maybe<(
    { __typename: 'ItemCollectionObject' }
    & Pick<ItemCollectionObject, 'name' | 'databaseId' | 'lists' | 'count'>
    & { realItems?: Maybe<(
      { __typename: 'RealItemObjectConnection' }
      & { edges: Array<Maybe<(
        { __typename: 'RealItemObjectEdge' }
        & { node?: Maybe<(
          { __typename: 'RealItemObject' }
          & Pick<RealItemObject, 'databaseId' | 'itemCollectionsId' | 'itemId' | 'sku' | 'condition' | 'forsalePrice' | 'userList'>
          & { genericItems?: Maybe<(
            { __typename: 'GenericItemObjectConnection' }
            & { edges: Array<Maybe<(
              { __typename: 'GenericItemObjectEdge' }
              & { node?: Maybe<(
                { __typename: 'GenericItemObject' }
                & Pick<GenericItemObject, 'imageUriLarge' | 'name' | 'setName'>
              )> }
            )>> }
          )> }
        )> }
      )>> }
    )> }
  )>>> }
);

export type CollectionDataQueryVariables = Exact<{
  userId?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  collectionId?: InputMaybe<Scalars['Int']>;
  trashed?: InputMaybe<Scalars['Boolean']>;
  orderStatus?: InputMaybe<Scalars['String']>;
  page?: InputMaybe<Scalars['Int']>;
  perPage?: InputMaybe<Scalars['Int']>;
}>;


export type CollectionDataQuery = (
  { __typename: 'Query' }
  & { itemCollections?: Maybe<Array<Maybe<(
    { __typename: 'ItemCollectionObject' }
    & Pick<ItemCollectionObject, 'name' | 'databaseId' | 'lists' | 'count'>
  )>>> }
);

export type GetRealItemQueryVariables = Exact<{
  realItemId?: InputMaybe<Scalars['Int']>;
}>;


export type GetRealItemQuery = (
  { __typename: 'Query' }
  & { realItems?: Maybe<Array<Maybe<(
    { __typename: 'RealItemObject' }
    & Pick<RealItemObject, 'databaseId' | 'itemCollectionsId' | 'itemId' | 'sku' | 'creator' | 'owner' | 'dateCreated' | 'dateUpdated' | 'condition' | 'costBasis' | 'fmv' | 'woocommerceUrl' | 'woocommerceProductId' | 'forsalePrice' | 'status' | 'transactionStatus' | 'itemListId'>
    & { genericItems?: Maybe<(
      { __typename: 'GenericItemObjectConnection' }
      & { edges: Array<Maybe<(
        { __typename: 'GenericItemObjectEdge' }
        & { node?: Maybe<(
          { __typename: 'GenericItemObject' }
          & Pick<GenericItemObject, 'imageUriLarge' | 'name' | 'setName' | 'itemIndex'>
        )> }
      )>> }
    )> }
  )>>> }
);

export type GetMediaQueryVariables = Exact<{
  realItemId?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  perPage?: InputMaybe<Scalars['Int']>;
}>;


export type GetMediaQuery = (
  { __typename: 'Query' }
  & { media?: Maybe<Array<Maybe<(
    { __typename: 'MediaObject' }
    & Pick<MediaObject, 'databaseId' | 'type' | 'mediaUrl' | 'label'>
  )>>> }
);

export type GetExchangeRatesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetExchangeRatesQuery = (
  { __typename: 'Query' }
  & { genericItems?: Maybe<Array<Maybe<(
    { __typename: 'GenericItemObject' }
    & Pick<GenericItemObject, 'id' | 'set' | 'name' | 'imageUriLarge' | 'setName' | 'originalName'>
  )>>> }
);

export type GetConditionsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetConditionsQuery = (
  { __typename: 'Query' }
  & { conditions?: Maybe<Array<Maybe<(
    { __typename: 'ConditionsObject' }
    & Pick<ConditionsObject, 'id' | 'usCode' | 'euCode' | 'dateUpdated' | 'type' | 'sortOrder'>
  )>>> }
);

export type GetMultiplierQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMultiplierQuery = (
  { __typename: 'Query' }
  & { merchantsConditionMultiplier?: Maybe<Array<Maybe<(
    { __typename: 'MerchantsConditionMultiplierObject' }
    & Pick<MerchantsConditionMultiplierObject, 'databaseId' | 'merchant' | 'conditionId' | 'multiplier' | 'id'>
  )>>> }
);

export type GetOffersQueryVariables = Exact<{
  genericItemId?: InputMaybe<Scalars['Int']>;
}>;


export type GetOffersQuery = (
  { __typename: 'Query' }
  & { offers?: Maybe<Array<Maybe<(
    { __typename: 'OfferObject' }
    & Pick<OfferObject, 'id' | 'scryfallCardId'>
    & { offersHistory?: Maybe<(
      { __typename: 'OfferHistoryObjectConnection' }
      & { edges: Array<Maybe<(
        { __typename: 'OfferHistoryObjectEdge' }
        & { node?: Maybe<(
          { __typename: 'OfferHistoryObject' }
          & Pick<OfferHistoryObject, 'scryfallCardId' | 'lastUpdated' | 'source' | 'merchant' | 'amount' | 'cardType' | 'condition' | 'offersId' | 'id'>
        )> }
      )>> }
    )> }
  )>>> }
);

export type GetLatestOffersQueryVariables = Exact<{
  genericItemId?: InputMaybe<Scalars['Int']>;
}>;


export type GetLatestOffersQuery = (
  { __typename: 'Query' }
  & { latestOffers?: Maybe<Array<Maybe<(
    { __typename: 'LatestOfferObject' }
    & Pick<LatestOfferObject, 'databaseId' | 'scryfallCardId'>
    & { latestOffersHistory?: Maybe<(
      { __typename: 'LatestOfferHistoryObjectConnection' }
      & { edges: Array<Maybe<(
        { __typename: 'LatestOfferHistoryObjectEdge' }
        & { node?: Maybe<(
          { __typename: 'LatestOfferHistoryObject' }
          & Pick<LatestOfferHistoryObject, 'databaseId' | 'scryfallCardId' | 'lastUpdated' | 'source' | 'merchant' | 'amount' | 'cardType' | 'condition' | 'offersId'>
        )> }
      )>> }
    )> }
  )>>> }
);

export type GetLatestOffersSeriesQueryVariables = Exact<{
  genericItemId?: InputMaybe<Scalars['Int']>;
}>;


export type GetLatestOffersSeriesQuery = (
  { __typename: 'Query' }
  & { latestOffers?: Maybe<Array<Maybe<(
    { __typename: 'LatestOfferObject' }
    & Pick<LatestOfferObject, 'databaseId' | 'scryfallCardId'>
    & { timeSeries?: Maybe<Array<Maybe<(
      { __typename: 'OfferHistoryObject' }
      & Pick<OfferHistoryObject, 'id' | 'merchant' | 'amount' | 'lastUpdated'>
    )>>> }
  )>>> }
);

export type GetTransactionItemsQueryVariables = Exact<{
  transactionId?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  perPage?: InputMaybe<Scalars['Int']>;
}>;


export type GetTransactionItemsQuery = (
  { __typename: 'Query' }
  & { transactionItems?: Maybe<Array<Maybe<(
    { __typename: 'TransactionItemObject' }
    & Pick<TransactionItemObject, 'transactionId' | 'databaseId' | 'realItemId' | 'tradeInValue'>
    & { realItems?: Maybe<(
      { __typename: 'RealItemObjectConnection' }
      & { edges: Array<Maybe<(
        { __typename: 'RealItemObjectEdge' }
        & { node?: Maybe<(
          { __typename: 'RealItemObject' }
          & Pick<RealItemObject, 'databaseId' | 'itemCollectionsId' | 'itemId' | 'sku' | 'condition' | 'forsalePrice' | 'fmv' | 'status'>
          & { genericItems?: Maybe<(
            { __typename: 'GenericItemObjectConnection' }
            & { edges: Array<Maybe<(
              { __typename: 'GenericItemObjectEdge' }
              & { node?: Maybe<(
                { __typename: 'GenericItemObject' }
                & Pick<GenericItemObject, 'imageUriLarge' | 'name' | 'setName'>
              )> }
            )>> }
          )> }
        )> }
      )>> }
    )> }
  )>>> }
);

export type GetTransactionsQueryVariables = Exact<{
  transactionId?: InputMaybe<Scalars['Int']>;
  userId?: InputMaybe<Scalars['Int']>;
  collectionId?: InputMaybe<Scalars['Int']>;
  status?: InputMaybe<Scalars['String']>;
  page?: InputMaybe<Scalars['Int']>;
  perPage?: InputMaybe<Scalars['Int']>;
}>;


export type GetTransactionsQuery = (
  { __typename: 'Query' }
  & { transactions?: Maybe<Array<Maybe<(
    { __typename: 'TransactionsObject' }
    & Pick<TransactionsObject, 'databaseId' | 'status' | 'leftOwner' | 'rightOwner' | 'paypalCosts' | 'id' | 'dateCreated' | 'rightCredit' | 'adminComment' | 'count'>
  )>>> }
);

export type GenericItemsQueryVariables = Exact<{
  partialName?: InputMaybe<Scalars['String']>;
  page?: InputMaybe<Scalars['Int']>;
  perPage?: InputMaybe<Scalars['Int']>;
  databaseId?: InputMaybe<Array<InputMaybe<Scalars['Int']>> | InputMaybe<Scalars['Int']>>;
}>;


export type GenericItemsQuery = (
  { __typename: 'Query' }
  & { genericItems?: Maybe<Array<Maybe<(
    { __typename: 'GenericItemObject' }
    & Pick<GenericItemObject, 'id' | 'name' | 'imageUriPng' | 'imageUriSmall' | 'imageUriNormal' | 'setName' | 'lang'>
  )>>> }
);

export type GetItemListsQueryVariables = Exact<{
  itemListId?: InputMaybe<Scalars['Int']>;
}>;


export type GetItemListsQuery = (
  { __typename: 'Query' }
  & { itemLists?: Maybe<Array<Maybe<(
    { __typename: 'ItemListsObject' }
    & Pick<ItemListsObject, 'databaseId' | 'userId' | 'name' | 'count' | 'value' | 'dateCreated' | 'dateUpdated'>
  )>>> }
);

export type GetRealItemsTradeInfoQueryVariables = Exact<{
  itemListId?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  perPage?: InputMaybe<Scalars['Int']>;
}>;


export type GetRealItemsTradeInfoQuery = (
  { __typename: 'Query' }
  & { itemLists?: Maybe<Array<Maybe<(
    { __typename: 'ItemListsObject' }
    & Pick<ItemListsObject, 'name' | 'value' | 'count'>
    & { realItems?: Maybe<(
      { __typename: 'RealItemObjectConnection' }
      & { edges: Array<Maybe<(
        { __typename: 'RealItemObjectEdge' }
        & { node?: Maybe<(
          { __typename: 'RealItemObject' }
          & Pick<RealItemObject, 'condition' | 'fmv'>
          & { genericItems?: Maybe<(
            { __typename: 'GenericItemObjectConnection' }
            & { edges: Array<Maybe<(
              { __typename: 'GenericItemObjectEdge' }
              & { node?: Maybe<(
                { __typename: 'GenericItemObject' }
                & Pick<GenericItemObject, 'name' | 'setName' | 'itemIndex'>
              )> }
            )>> }
          )> }
        )> }
      )>> }
    )> }
  )>>> }
);

export type GetRealItemsByItemListQueryVariables = Exact<{
  itemListId: Scalars['Int'];
  page: Scalars['Int'];
  perPage: Scalars['Int'];
  partialName?: InputMaybe<Scalars['String']>;
  sortKey?: InputMaybe<Scalars['String']>;
  sortReverse?: InputMaybe<Scalars['Boolean']>;
}>;


export type GetRealItemsByItemListQuery = (
  { __typename: 'Query' }
  & { itemLists?: Maybe<Array<Maybe<(
    { __typename: 'ItemListsObject' }
    & Pick<ItemListsObject, 'databaseId' | 'name' | 'count' | 'value' | 'dateUpdated'>
    & { realItems?: Maybe<(
      { __typename: 'RealItemObjectConnection' }
      & { edges: Array<Maybe<(
        { __typename: 'RealItemObjectEdge' }
        & { node?: Maybe<(
          { __typename: 'RealItemObject' }
          & Pick<RealItemObject, 'databaseId' | 'itemCollectionsId' | 'itemId' | 'sku' | 'condition' | 'forsalePrice' | 'fmv' | 'status' | 'itemListId'>
          & { genericItems?: Maybe<(
            { __typename: 'GenericItemObjectConnection' }
            & { edges: Array<Maybe<(
              { __typename: 'GenericItemObjectEdge' }
              & { node?: Maybe<(
                { __typename: 'GenericItemObject' }
                & Pick<GenericItemObject, 'imageUriLarge' | 'name' | 'setName' | 'itemIndex'>
                & { latestOffers?: Maybe<(
                  { __typename: 'LatestOfferObjectConnection' }
                  & { edges: Array<Maybe<(
                    { __typename: 'LatestOfferObjectEdge' }
                    & { node?: Maybe<(
                      { __typename: 'LatestOfferObject' }
                      & { latestOffersHistory?: Maybe<(
                        { __typename: 'LatestOfferHistoryObjectConnection' }
                        & { edges: Array<Maybe<(
                          { __typename: 'LatestOfferHistoryObjectEdge' }
                          & { node?: Maybe<(
                            { __typename: 'LatestOfferHistoryObject' }
                            & Pick<LatestOfferHistoryObject, 'lastUpdated' | 'merchant' | 'amount'>
                          )> }
                        )>> }
                      )> }
                    )> }
                  )>> }
                )> }
              )> }
            )>> }
          )> }
        )> }
      )>> }
    )> }
  )>>> }
);

export type GetPublishedRealItemsQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']>;
  perPage?: InputMaybe<Scalars['Int']>;
}>;


export type GetPublishedRealItemsQuery = (
  { __typename: 'Query' }
  & { realItems?: Maybe<Array<Maybe<(
    { __typename: 'RealItemObject' }
    & Pick<RealItemObject, 'databaseId' | 'itemCollectionsId' | 'itemId' | 'sku' | 'creator' | 'owner' | 'dateCreated' | 'dateUpdated' | 'condition' | 'costBasis' | 'fmv' | 'woocommerceUrl' | 'woocommerceProductId' | 'forsalePrice' | 'status' | 'transactionStatus' | 'userList'>
    & { genericItems?: Maybe<(
      { __typename: 'GenericItemObjectConnection' }
      & { edges: Array<Maybe<(
        { __typename: 'GenericItemObjectEdge' }
        & { node?: Maybe<(
          { __typename: 'GenericItemObject' }
          & Pick<GenericItemObject, 'imageUriLarge' | 'name' | 'setName'>
        )> }
      )>> }
    )> }
  )>>> }
);

export type CountPublishedQueryVariables = Exact<{ [key: string]: never; }>;


export type CountPublishedQuery = (
  { __typename: 'Query' }
  & Pick<Query, 'countPublished'>
);

export type GetEbayListingQueryVariables = Exact<{
  databaseId?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  perPage?: InputMaybe<Scalars['Int']>;
  hasPrediction?: InputMaybe<Scalars['Boolean']>;
}>;


export type GetEbayListingQuery = (
  { __typename: 'Query' }
  & { ebayListing?: Maybe<Array<Maybe<(
    { __typename: 'EbayListingObject' }
    & Pick<EbayListingObject, 'title' | 'databaseId' | 'photoUrl1' | 'photoUrl2' | 'photoUrl3' | 'photoUrl4' | 'winningBid' | 'predictedGenericIdList' | 'userComment' | 'listingDate' | 'url' | 'dateApproved'>
  )>>> }
);

export type GetListingFeedbackQueryVariables = Exact<{
  userId?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  perPage?: InputMaybe<Scalars['Int']>;
}>;


export type GetListingFeedbackQuery = (
  { __typename: 'Query' }
  & { listingFeedback?: Maybe<Array<Maybe<(
    { __typename: 'ListingFeedbackObject' }
    & Pick<ListingFeedbackObject, 'databaseId' | 'userId' | 'listingId' | 'userComment' | 'userSelectedGenericId' | 'isCorrect' | 'dateCreated'>
  )>>> }
);

export type TransactionLogsQueryVariables = Exact<{
  transactionId?: InputMaybe<Scalars['Int']>;
}>;


export type TransactionLogsQuery = (
  { __typename: 'Query' }
  & { transactionLogs?: Maybe<Array<Maybe<(
    { __typename: 'TransactionLogObject' }
    & Pick<TransactionLogObject, 'databaseId' | 'dateCreated' | 'id' | 'message' | 'transactionId'>
  )>>> }
);

export const ConditionNodeFragmentDoc = gql`
    fragment ConditionNode on ConditionsObject {
  id
  usCode
  euCode
  dateUpdated
  type
  sortOrder
}
    `;
export const MultiplierFragmentDoc = gql`
    fragment Multiplier on MerchantsConditionMultiplierObject {
  databaseId
  merchant
  conditionId
  multiplier
  id
}
    `;
export const RealItemFragmentDoc = gql`
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
export const CreateRealItemDocument = gql`
    mutation createRealItem($itemId: Int!, $itemListId: Int!, $condition: String) {
  createRealItem(itemId: $itemId, itemListId: $itemListId, condition: $condition) {
    ok
  }
}
    `;
export type CreateRealItemMutationFn = Apollo.MutationFunction<CreateRealItemMutation, CreateRealItemMutationVariables>;

/**
 * __useCreateRealItemMutation__
 *
 * To run a mutation, you first call `useCreateRealItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateRealItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createRealItemMutation, { data, loading, error }] = useCreateRealItemMutation({
 *   variables: {
 *      itemId: // value for 'itemId'
 *      itemListId: // value for 'itemListId'
 *      condition: // value for 'condition'
 *   },
 * });
 */
export function useCreateRealItemMutation(baseOptions?: Apollo.MutationHookOptions<CreateRealItemMutation, CreateRealItemMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateRealItemMutation, CreateRealItemMutationVariables>(CreateRealItemDocument, options);
      }
export type CreateRealItemMutationHookResult = ReturnType<typeof useCreateRealItemMutation>;
export type CreateRealItemMutationResult = Apollo.MutationResult<CreateRealItemMutation>;
export type CreateRealItemMutationOptions = Apollo.BaseMutationOptions<CreateRealItemMutation, CreateRealItemMutationVariables>;
export const UpdateRealItemDocument = gql`
    mutation updateRealItem($condition: String, $databaseId: Int!, $forsalePrice: Float, $itemId: Int) {
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
export type UpdateRealItemMutationFn = Apollo.MutationFunction<UpdateRealItemMutation, UpdateRealItemMutationVariables>;

/**
 * __useUpdateRealItemMutation__
 *
 * To run a mutation, you first call `useUpdateRealItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateRealItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateRealItemMutation, { data, loading, error }] = useUpdateRealItemMutation({
 *   variables: {
 *      condition: // value for 'condition'
 *      databaseId: // value for 'databaseId'
 *      forsalePrice: // value for 'forsalePrice'
 *      itemId: // value for 'itemId'
 *   },
 * });
 */
export function useUpdateRealItemMutation(baseOptions?: Apollo.MutationHookOptions<UpdateRealItemMutation, UpdateRealItemMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateRealItemMutation, UpdateRealItemMutationVariables>(UpdateRealItemDocument, options);
      }
export type UpdateRealItemMutationHookResult = ReturnType<typeof useUpdateRealItemMutation>;
export type UpdateRealItemMutationResult = Apollo.MutationResult<UpdateRealItemMutation>;
export type UpdateRealItemMutationOptions = Apollo.BaseMutationOptions<UpdateRealItemMutation, UpdateRealItemMutationVariables>;
export const UpdateRealItemStatusDocument = gql`
    mutation updateRealItemStatus($adminComment: String, $realItemId: Int!, $status: String!) {
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
export type UpdateRealItemStatusMutationFn = Apollo.MutationFunction<UpdateRealItemStatusMutation, UpdateRealItemStatusMutationVariables>;

/**
 * __useUpdateRealItemStatusMutation__
 *
 * To run a mutation, you first call `useUpdateRealItemStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateRealItemStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateRealItemStatusMutation, { data, loading, error }] = useUpdateRealItemStatusMutation({
 *   variables: {
 *      adminComment: // value for 'adminComment'
 *      realItemId: // value for 'realItemId'
 *      status: // value for 'status'
 *   },
 * });
 */
export function useUpdateRealItemStatusMutation(baseOptions?: Apollo.MutationHookOptions<UpdateRealItemStatusMutation, UpdateRealItemStatusMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateRealItemStatusMutation, UpdateRealItemStatusMutationVariables>(UpdateRealItemStatusDocument, options);
      }
export type UpdateRealItemStatusMutationHookResult = ReturnType<typeof useUpdateRealItemStatusMutation>;
export type UpdateRealItemStatusMutationResult = Apollo.MutationResult<UpdateRealItemStatusMutation>;
export type UpdateRealItemStatusMutationOptions = Apollo.BaseMutationOptions<UpdateRealItemStatusMutation, UpdateRealItemStatusMutationVariables>;
export const DeleteRealItemDocument = gql`
    mutation deleteRealItem($databaseId: Int!) {
  deleteRealItem(databaseId: $databaseId) {
    ok
    debug
  }
}
    `;
export type DeleteRealItemMutationFn = Apollo.MutationFunction<DeleteRealItemMutation, DeleteRealItemMutationVariables>;

/**
 * __useDeleteRealItemMutation__
 *
 * To run a mutation, you first call `useDeleteRealItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteRealItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteRealItemMutation, { data, loading, error }] = useDeleteRealItemMutation({
 *   variables: {
 *      databaseId: // value for 'databaseId'
 *   },
 * });
 */
export function useDeleteRealItemMutation(baseOptions?: Apollo.MutationHookOptions<DeleteRealItemMutation, DeleteRealItemMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteRealItemMutation, DeleteRealItemMutationVariables>(DeleteRealItemDocument, options);
      }
export type DeleteRealItemMutationHookResult = ReturnType<typeof useDeleteRealItemMutation>;
export type DeleteRealItemMutationResult = Apollo.MutationResult<DeleteRealItemMutation>;
export type DeleteRealItemMutationOptions = Apollo.BaseMutationOptions<DeleteRealItemMutation, DeleteRealItemMutationVariables>;
export const UpdateMediaDocument = gql`
    mutation updateMedia($databaseId: Int!, $label: String, $mediaUrl: String, $realItemId: Int, $type: String) {
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
export type UpdateMediaMutationFn = Apollo.MutationFunction<UpdateMediaMutation, UpdateMediaMutationVariables>;

/**
 * __useUpdateMediaMutation__
 *
 * To run a mutation, you first call `useUpdateMediaMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateMediaMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateMediaMutation, { data, loading, error }] = useUpdateMediaMutation({
 *   variables: {
 *      databaseId: // value for 'databaseId'
 *      label: // value for 'label'
 *      mediaUrl: // value for 'mediaUrl'
 *      realItemId: // value for 'realItemId'
 *      type: // value for 'type'
 *   },
 * });
 */
export function useUpdateMediaMutation(baseOptions?: Apollo.MutationHookOptions<UpdateMediaMutation, UpdateMediaMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateMediaMutation, UpdateMediaMutationVariables>(UpdateMediaDocument, options);
      }
export type UpdateMediaMutationHookResult = ReturnType<typeof useUpdateMediaMutation>;
export type UpdateMediaMutationResult = Apollo.MutationResult<UpdateMediaMutation>;
export type UpdateMediaMutationOptions = Apollo.BaseMutationOptions<UpdateMediaMutation, UpdateMediaMutationVariables>;
export const DeleteMediaDocument = gql`
    mutation deleteMedia($databaseId: Int!) {
  deleteMedia(databaseId: $databaseId) {
    ok
  }
}
    `;
export type DeleteMediaMutationFn = Apollo.MutationFunction<DeleteMediaMutation, DeleteMediaMutationVariables>;

/**
 * __useDeleteMediaMutation__
 *
 * To run a mutation, you first call `useDeleteMediaMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteMediaMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteMediaMutation, { data, loading, error }] = useDeleteMediaMutation({
 *   variables: {
 *      databaseId: // value for 'databaseId'
 *   },
 * });
 */
export function useDeleteMediaMutation(baseOptions?: Apollo.MutationHookOptions<DeleteMediaMutation, DeleteMediaMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteMediaMutation, DeleteMediaMutationVariables>(DeleteMediaDocument, options);
      }
export type DeleteMediaMutationHookResult = ReturnType<typeof useDeleteMediaMutation>;
export type DeleteMediaMutationResult = Apollo.MutationResult<DeleteMediaMutation>;
export type DeleteMediaMutationOptions = Apollo.BaseMutationOptions<DeleteMediaMutation, DeleteMediaMutationVariables>;
export const CreateTransactionDocument = gql`
    mutation createTransaction($itemListId: Int!) {
  createTransaction(itemListId: $itemListId) {
    ok
    debug
  }
}
    `;
export type CreateTransactionMutationFn = Apollo.MutationFunction<CreateTransactionMutation, CreateTransactionMutationVariables>;

/**
 * __useCreateTransactionMutation__
 *
 * To run a mutation, you first call `useCreateTransactionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTransactionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTransactionMutation, { data, loading, error }] = useCreateTransactionMutation({
 *   variables: {
 *      itemListId: // value for 'itemListId'
 *   },
 * });
 */
export function useCreateTransactionMutation(baseOptions?: Apollo.MutationHookOptions<CreateTransactionMutation, CreateTransactionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTransactionMutation, CreateTransactionMutationVariables>(CreateTransactionDocument, options);
      }
export type CreateTransactionMutationHookResult = ReturnType<typeof useCreateTransactionMutation>;
export type CreateTransactionMutationResult = Apollo.MutationResult<CreateTransactionMutation>;
export type CreateTransactionMutationOptions = Apollo.BaseMutationOptions<CreateTransactionMutation, CreateTransactionMutationVariables>;
export const UpdateTransactionStatusDocument = gql`
    mutation updateTransactionStatus($adminComment: String, $status: String!, $transactionId: Int!) {
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
export type UpdateTransactionStatusMutationFn = Apollo.MutationFunction<UpdateTransactionStatusMutation, UpdateTransactionStatusMutationVariables>;

/**
 * __useUpdateTransactionStatusMutation__
 *
 * To run a mutation, you first call `useUpdateTransactionStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTransactionStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTransactionStatusMutation, { data, loading, error }] = useUpdateTransactionStatusMutation({
 *   variables: {
 *      adminComment: // value for 'adminComment'
 *      status: // value for 'status'
 *      transactionId: // value for 'transactionId'
 *   },
 * });
 */
export function useUpdateTransactionStatusMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTransactionStatusMutation, UpdateTransactionStatusMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateTransactionStatusMutation, UpdateTransactionStatusMutationVariables>(UpdateTransactionStatusDocument, options);
      }
export type UpdateTransactionStatusMutationHookResult = ReturnType<typeof useUpdateTransactionStatusMutation>;
export type UpdateTransactionStatusMutationResult = Apollo.MutationResult<UpdateTransactionStatusMutation>;
export type UpdateTransactionStatusMutationOptions = Apollo.BaseMutationOptions<UpdateTransactionStatusMutation, UpdateTransactionStatusMutationVariables>;
export const DeleteTransactionItemDocument = gql`
    mutation deleteTransactionItem($transactionItemId: Int!) {
  deleteTransactionItem(transactionItemId: $transactionItemId) {
    ok
    debug
  }
}
    `;
export type DeleteTransactionItemMutationFn = Apollo.MutationFunction<DeleteTransactionItemMutation, DeleteTransactionItemMutationVariables>;

/**
 * __useDeleteTransactionItemMutation__
 *
 * To run a mutation, you first call `useDeleteTransactionItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTransactionItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTransactionItemMutation, { data, loading, error }] = useDeleteTransactionItemMutation({
 *   variables: {
 *      transactionItemId: // value for 'transactionItemId'
 *   },
 * });
 */
export function useDeleteTransactionItemMutation(baseOptions?: Apollo.MutationHookOptions<DeleteTransactionItemMutation, DeleteTransactionItemMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteTransactionItemMutation, DeleteTransactionItemMutationVariables>(DeleteTransactionItemDocument, options);
      }
export type DeleteTransactionItemMutationHookResult = ReturnType<typeof useDeleteTransactionItemMutation>;
export type DeleteTransactionItemMutationResult = Apollo.MutationResult<DeleteTransactionItemMutation>;
export type DeleteTransactionItemMutationOptions = Apollo.BaseMutationOptions<DeleteTransactionItemMutation, DeleteTransactionItemMutationVariables>;
export const DeleteTransactionDocument = gql`
    mutation deleteTransaction($transactionId: Int!) {
  deleteTransaction(transactionId: $transactionId) {
    ok
    debug
  }
}
    `;
export type DeleteTransactionMutationFn = Apollo.MutationFunction<DeleteTransactionMutation, DeleteTransactionMutationVariables>;

/**
 * __useDeleteTransactionMutation__
 *
 * To run a mutation, you first call `useDeleteTransactionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTransactionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTransactionMutation, { data, loading, error }] = useDeleteTransactionMutation({
 *   variables: {
 *      transactionId: // value for 'transactionId'
 *   },
 * });
 */
export function useDeleteTransactionMutation(baseOptions?: Apollo.MutationHookOptions<DeleteTransactionMutation, DeleteTransactionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteTransactionMutation, DeleteTransactionMutationVariables>(DeleteTransactionDocument, options);
      }
export type DeleteTransactionMutationHookResult = ReturnType<typeof useDeleteTransactionMutation>;
export type DeleteTransactionMutationResult = Apollo.MutationResult<DeleteTransactionMutation>;
export type DeleteTransactionMutationOptions = Apollo.BaseMutationOptions<DeleteTransactionMutation, DeleteTransactionMutationVariables>;
export const CreateItemListDocument = gql`
    mutation CreateItemList($name: String!) {
  createItemList(name: $name) {
    ok
    debug
  }
}
    `;
export type CreateItemListMutationFn = Apollo.MutationFunction<CreateItemListMutation, CreateItemListMutationVariables>;

/**
 * __useCreateItemListMutation__
 *
 * To run a mutation, you first call `useCreateItemListMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateItemListMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createItemListMutation, { data, loading, error }] = useCreateItemListMutation({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useCreateItemListMutation(baseOptions?: Apollo.MutationHookOptions<CreateItemListMutation, CreateItemListMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateItemListMutation, CreateItemListMutationVariables>(CreateItemListDocument, options);
      }
export type CreateItemListMutationHookResult = ReturnType<typeof useCreateItemListMutation>;
export type CreateItemListMutationResult = Apollo.MutationResult<CreateItemListMutation>;
export type CreateItemListMutationOptions = Apollo.BaseMutationOptions<CreateItemListMutation, CreateItemListMutationVariables>;
export const DeleteItemListDocument = gql`
    mutation DeleteItemList($databaseId: Int!) {
  deleteItemList(databaseId: $databaseId) {
    ok
    debug
  }
}
    `;
export type DeleteItemListMutationFn = Apollo.MutationFunction<DeleteItemListMutation, DeleteItemListMutationVariables>;

/**
 * __useDeleteItemListMutation__
 *
 * To run a mutation, you first call `useDeleteItemListMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteItemListMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteItemListMutation, { data, loading, error }] = useDeleteItemListMutation({
 *   variables: {
 *      databaseId: // value for 'databaseId'
 *   },
 * });
 */
export function useDeleteItemListMutation(baseOptions?: Apollo.MutationHookOptions<DeleteItemListMutation, DeleteItemListMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteItemListMutation, DeleteItemListMutationVariables>(DeleteItemListDocument, options);
      }
export type DeleteItemListMutationHookResult = ReturnType<typeof useDeleteItemListMutation>;
export type DeleteItemListMutationResult = Apollo.MutationResult<DeleteItemListMutation>;
export type DeleteItemListMutationOptions = Apollo.BaseMutationOptions<DeleteItemListMutation, DeleteItemListMutationVariables>;
export const BuyRealItemWithCreditDocument = gql`
    mutation BuyRealItemWithCredit($realItemId: Int!) {
  buyRealItemWithCredit(realItemId: $realItemId) {
    ok
    debug
  }
}
    `;
export type BuyRealItemWithCreditMutationFn = Apollo.MutationFunction<BuyRealItemWithCreditMutation, BuyRealItemWithCreditMutationVariables>;

/**
 * __useBuyRealItemWithCreditMutation__
 *
 * To run a mutation, you first call `useBuyRealItemWithCreditMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBuyRealItemWithCreditMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [buyRealItemWithCreditMutation, { data, loading, error }] = useBuyRealItemWithCreditMutation({
 *   variables: {
 *      realItemId: // value for 'realItemId'
 *   },
 * });
 */
export function useBuyRealItemWithCreditMutation(baseOptions?: Apollo.MutationHookOptions<BuyRealItemWithCreditMutation, BuyRealItemWithCreditMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<BuyRealItemWithCreditMutation, BuyRealItemWithCreditMutationVariables>(BuyRealItemWithCreditDocument, options);
      }
export type BuyRealItemWithCreditMutationHookResult = ReturnType<typeof useBuyRealItemWithCreditMutation>;
export type BuyRealItemWithCreditMutationResult = Apollo.MutationResult<BuyRealItemWithCreditMutation>;
export type BuyRealItemWithCreditMutationOptions = Apollo.BaseMutationOptions<BuyRealItemWithCreditMutation, BuyRealItemWithCreditMutationVariables>;
export const UpdateUserDocument = gql`
    mutation UpdateUser($colorTheme: String, $databaseId: Int!, $perPage: Int, $username: String, $viewMode: String) {
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
export type UpdateUserMutationFn = Apollo.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      colorTheme: // value for 'colorTheme'
 *      databaseId: // value for 'databaseId'
 *      perPage: // value for 'perPage'
 *      username: // value for 'username'
 *      viewMode: // value for 'viewMode'
 *   },
 * });
 */
export function useUpdateUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, options);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;
export const UpdateShipInfoDocument = gql`
    mutation UpdateShipInfo($databaseId: Int!, $name: String!, $street1: String!, $street2: String, $city: String!, $state: String!, $zip: String!, $country: String!) {
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
export type UpdateShipInfoMutationFn = Apollo.MutationFunction<UpdateShipInfoMutation, UpdateShipInfoMutationVariables>;

/**
 * __useUpdateShipInfoMutation__
 *
 * To run a mutation, you first call `useUpdateShipInfoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateShipInfoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateShipInfoMutation, { data, loading, error }] = useUpdateShipInfoMutation({
 *   variables: {
 *      databaseId: // value for 'databaseId'
 *      name: // value for 'name'
 *      street1: // value for 'street1'
 *      street2: // value for 'street2'
 *      city: // value for 'city'
 *      state: // value for 'state'
 *      zip: // value for 'zip'
 *      country: // value for 'country'
 *   },
 * });
 */
export function useUpdateShipInfoMutation(baseOptions?: Apollo.MutationHookOptions<UpdateShipInfoMutation, UpdateShipInfoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateShipInfoMutation, UpdateShipInfoMutationVariables>(UpdateShipInfoDocument, options);
      }
export type UpdateShipInfoMutationHookResult = ReturnType<typeof useUpdateShipInfoMutation>;
export type UpdateShipInfoMutationResult = Apollo.MutationResult<UpdateShipInfoMutation>;
export type UpdateShipInfoMutationOptions = Apollo.BaseMutationOptions<UpdateShipInfoMutation, UpdateShipInfoMutationVariables>;
export const CreateUpdateListingFeedbackDocument = gql`
    mutation CreateUpdateListingFeedback($ebaylistingId: Int!, $isCorrect: Boolean!, $userComment: String, $userSelectedGenericId: Int) {
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
export type CreateUpdateListingFeedbackMutationFn = Apollo.MutationFunction<CreateUpdateListingFeedbackMutation, CreateUpdateListingFeedbackMutationVariables>;

/**
 * __useCreateUpdateListingFeedbackMutation__
 *
 * To run a mutation, you first call `useCreateUpdateListingFeedbackMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUpdateListingFeedbackMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUpdateListingFeedbackMutation, { data, loading, error }] = useCreateUpdateListingFeedbackMutation({
 *   variables: {
 *      ebaylistingId: // value for 'ebaylistingId'
 *      isCorrect: // value for 'isCorrect'
 *      userComment: // value for 'userComment'
 *      userSelectedGenericId: // value for 'userSelectedGenericId'
 *   },
 * });
 */
export function useCreateUpdateListingFeedbackMutation(baseOptions?: Apollo.MutationHookOptions<CreateUpdateListingFeedbackMutation, CreateUpdateListingFeedbackMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUpdateListingFeedbackMutation, CreateUpdateListingFeedbackMutationVariables>(CreateUpdateListingFeedbackDocument, options);
      }
export type CreateUpdateListingFeedbackMutationHookResult = ReturnType<typeof useCreateUpdateListingFeedbackMutation>;
export type CreateUpdateListingFeedbackMutationResult = Apollo.MutationResult<CreateUpdateListingFeedbackMutation>;
export type CreateUpdateListingFeedbackMutationOptions = Apollo.BaseMutationOptions<CreateUpdateListingFeedbackMutation, CreateUpdateListingFeedbackMutationVariables>;
export const CreateTransactionLogDocument = gql`
    mutation createTransactionLog($message: String!, $transactionId: Int!) {
  createTransactionLog(message: $message, transactionId: $transactionId) {
    ok
    debug
  }
}
    `;
export type CreateTransactionLogMutationFn = Apollo.MutationFunction<CreateTransactionLogMutation, CreateTransactionLogMutationVariables>;

/**
 * __useCreateTransactionLogMutation__
 *
 * To run a mutation, you first call `useCreateTransactionLogMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTransactionLogMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTransactionLogMutation, { data, loading, error }] = useCreateTransactionLogMutation({
 *   variables: {
 *      message: // value for 'message'
 *      transactionId: // value for 'transactionId'
 *   },
 * });
 */
export function useCreateTransactionLogMutation(baseOptions?: Apollo.MutationHookOptions<CreateTransactionLogMutation, CreateTransactionLogMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTransactionLogMutation, CreateTransactionLogMutationVariables>(CreateTransactionLogDocument, options);
      }
export type CreateTransactionLogMutationHookResult = ReturnType<typeof useCreateTransactionLogMutation>;
export type CreateTransactionLogMutationResult = Apollo.MutationResult<CreateTransactionLogMutation>;
export type CreateTransactionLogMutationOptions = Apollo.BaseMutationOptions<CreateTransactionLogMutation, CreateTransactionLogMutationVariables>;
export const GetUserDocument = gql`
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

/**
 * __useGetUserQuery__
 *
 * To run a query within a React component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetUserQuery(baseOptions?: Apollo.QueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
      }
export function useGetUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
        }
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserQueryResult = Apollo.QueryResult<GetUserQuery, GetUserQueryVariables>;
export const CollectionDocument = gql`
    query collection($userId: Int, $name: String, $collectionId: Int, $trashed: Boolean, $orderStatus: String, $page: Int, $perPage: Int) {
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

/**
 * __useCollectionQuery__
 *
 * To run a query within a React component, call `useCollectionQuery` and pass it any options that fit your needs.
 * When your component renders, `useCollectionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCollectionQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *      name: // value for 'name'
 *      collectionId: // value for 'collectionId'
 *      trashed: // value for 'trashed'
 *      orderStatus: // value for 'orderStatus'
 *      page: // value for 'page'
 *      perPage: // value for 'perPage'
 *   },
 * });
 */
export function useCollectionQuery(baseOptions?: Apollo.QueryHookOptions<CollectionQuery, CollectionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CollectionQuery, CollectionQueryVariables>(CollectionDocument, options);
      }
export function useCollectionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CollectionQuery, CollectionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CollectionQuery, CollectionQueryVariables>(CollectionDocument, options);
        }
export type CollectionQueryHookResult = ReturnType<typeof useCollectionQuery>;
export type CollectionLazyQueryHookResult = ReturnType<typeof useCollectionLazyQuery>;
export type CollectionQueryResult = Apollo.QueryResult<CollectionQuery, CollectionQueryVariables>;
export const CollectionDataDocument = gql`
    query collectionData($userId: Int, $name: String, $collectionId: Int, $trashed: Boolean, $orderStatus: String, $page: Int, $perPage: Int) {
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

/**
 * __useCollectionDataQuery__
 *
 * To run a query within a React component, call `useCollectionDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useCollectionDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCollectionDataQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *      name: // value for 'name'
 *      collectionId: // value for 'collectionId'
 *      trashed: // value for 'trashed'
 *      orderStatus: // value for 'orderStatus'
 *      page: // value for 'page'
 *      perPage: // value for 'perPage'
 *   },
 * });
 */
export function useCollectionDataQuery(baseOptions?: Apollo.QueryHookOptions<CollectionDataQuery, CollectionDataQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CollectionDataQuery, CollectionDataQueryVariables>(CollectionDataDocument, options);
      }
export function useCollectionDataLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CollectionDataQuery, CollectionDataQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CollectionDataQuery, CollectionDataQueryVariables>(CollectionDataDocument, options);
        }
export type CollectionDataQueryHookResult = ReturnType<typeof useCollectionDataQuery>;
export type CollectionDataLazyQueryHookResult = ReturnType<typeof useCollectionDataLazyQuery>;
export type CollectionDataQueryResult = Apollo.QueryResult<CollectionDataQuery, CollectionDataQueryVariables>;
export const GetRealItemDocument = gql`
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

/**
 * __useGetRealItemQuery__
 *
 * To run a query within a React component, call `useGetRealItemQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRealItemQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRealItemQuery({
 *   variables: {
 *      realItemId: // value for 'realItemId'
 *   },
 * });
 */
export function useGetRealItemQuery(baseOptions?: Apollo.QueryHookOptions<GetRealItemQuery, GetRealItemQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRealItemQuery, GetRealItemQueryVariables>(GetRealItemDocument, options);
      }
export function useGetRealItemLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRealItemQuery, GetRealItemQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRealItemQuery, GetRealItemQueryVariables>(GetRealItemDocument, options);
        }
export type GetRealItemQueryHookResult = ReturnType<typeof useGetRealItemQuery>;
export type GetRealItemLazyQueryHookResult = ReturnType<typeof useGetRealItemLazyQuery>;
export type GetRealItemQueryResult = Apollo.QueryResult<GetRealItemQuery, GetRealItemQueryVariables>;
export const GetMediaDocument = gql`
    query GetMedia($realItemId: Int, $page: Int, $perPage: Int) {
  media(realItemId: $realItemId, page: $page, perPage: $perPage) {
    databaseId
    type
    mediaUrl
    label
  }
}
    `;

/**
 * __useGetMediaQuery__
 *
 * To run a query within a React component, call `useGetMediaQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMediaQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMediaQuery({
 *   variables: {
 *      realItemId: // value for 'realItemId'
 *      page: // value for 'page'
 *      perPage: // value for 'perPage'
 *   },
 * });
 */
export function useGetMediaQuery(baseOptions?: Apollo.QueryHookOptions<GetMediaQuery, GetMediaQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMediaQuery, GetMediaQueryVariables>(GetMediaDocument, options);
      }
export function useGetMediaLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMediaQuery, GetMediaQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMediaQuery, GetMediaQueryVariables>(GetMediaDocument, options);
        }
export type GetMediaQueryHookResult = ReturnType<typeof useGetMediaQuery>;
export type GetMediaLazyQueryHookResult = ReturnType<typeof useGetMediaLazyQuery>;
export type GetMediaQueryResult = Apollo.QueryResult<GetMediaQuery, GetMediaQueryVariables>;
export const GetExchangeRatesDocument = gql`
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

/**
 * __useGetExchangeRatesQuery__
 *
 * To run a query within a React component, call `useGetExchangeRatesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetExchangeRatesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetExchangeRatesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetExchangeRatesQuery(baseOptions?: Apollo.QueryHookOptions<GetExchangeRatesQuery, GetExchangeRatesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetExchangeRatesQuery, GetExchangeRatesQueryVariables>(GetExchangeRatesDocument, options);
      }
export function useGetExchangeRatesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetExchangeRatesQuery, GetExchangeRatesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetExchangeRatesQuery, GetExchangeRatesQueryVariables>(GetExchangeRatesDocument, options);
        }
export type GetExchangeRatesQueryHookResult = ReturnType<typeof useGetExchangeRatesQuery>;
export type GetExchangeRatesLazyQueryHookResult = ReturnType<typeof useGetExchangeRatesLazyQuery>;
export type GetExchangeRatesQueryResult = Apollo.QueryResult<GetExchangeRatesQuery, GetExchangeRatesQueryVariables>;
export const GetConditionsDocument = gql`
    query GetConditions {
  conditions {
    ...ConditionNode
  }
}
    ${ConditionNodeFragmentDoc}`;

/**
 * __useGetConditionsQuery__
 *
 * To run a query within a React component, call `useGetConditionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetConditionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetConditionsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetConditionsQuery(baseOptions?: Apollo.QueryHookOptions<GetConditionsQuery, GetConditionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetConditionsQuery, GetConditionsQueryVariables>(GetConditionsDocument, options);
      }
export function useGetConditionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetConditionsQuery, GetConditionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetConditionsQuery, GetConditionsQueryVariables>(GetConditionsDocument, options);
        }
export type GetConditionsQueryHookResult = ReturnType<typeof useGetConditionsQuery>;
export type GetConditionsLazyQueryHookResult = ReturnType<typeof useGetConditionsLazyQuery>;
export type GetConditionsQueryResult = Apollo.QueryResult<GetConditionsQuery, GetConditionsQueryVariables>;
export const GetMultiplierDocument = gql`
    query GetMultiplier {
  merchantsConditionMultiplier {
    ...Multiplier
  }
}
    ${MultiplierFragmentDoc}`;

/**
 * __useGetMultiplierQuery__
 *
 * To run a query within a React component, call `useGetMultiplierQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMultiplierQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMultiplierQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMultiplierQuery(baseOptions?: Apollo.QueryHookOptions<GetMultiplierQuery, GetMultiplierQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMultiplierQuery, GetMultiplierQueryVariables>(GetMultiplierDocument, options);
      }
export function useGetMultiplierLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMultiplierQuery, GetMultiplierQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMultiplierQuery, GetMultiplierQueryVariables>(GetMultiplierDocument, options);
        }
export type GetMultiplierQueryHookResult = ReturnType<typeof useGetMultiplierQuery>;
export type GetMultiplierLazyQueryHookResult = ReturnType<typeof useGetMultiplierLazyQuery>;
export type GetMultiplierQueryResult = Apollo.QueryResult<GetMultiplierQuery, GetMultiplierQueryVariables>;
export const GetOffersDocument = gql`
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

/**
 * __useGetOffersQuery__
 *
 * To run a query within a React component, call `useGetOffersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOffersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOffersQuery({
 *   variables: {
 *      genericItemId: // value for 'genericItemId'
 *   },
 * });
 */
export function useGetOffersQuery(baseOptions?: Apollo.QueryHookOptions<GetOffersQuery, GetOffersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOffersQuery, GetOffersQueryVariables>(GetOffersDocument, options);
      }
export function useGetOffersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOffersQuery, GetOffersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOffersQuery, GetOffersQueryVariables>(GetOffersDocument, options);
        }
export type GetOffersQueryHookResult = ReturnType<typeof useGetOffersQuery>;
export type GetOffersLazyQueryHookResult = ReturnType<typeof useGetOffersLazyQuery>;
export type GetOffersQueryResult = Apollo.QueryResult<GetOffersQuery, GetOffersQueryVariables>;
export const GetLatestOffersDocument = gql`
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

/**
 * __useGetLatestOffersQuery__
 *
 * To run a query within a React component, call `useGetLatestOffersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLatestOffersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLatestOffersQuery({
 *   variables: {
 *      genericItemId: // value for 'genericItemId'
 *   },
 * });
 */
export function useGetLatestOffersQuery(baseOptions?: Apollo.QueryHookOptions<GetLatestOffersQuery, GetLatestOffersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetLatestOffersQuery, GetLatestOffersQueryVariables>(GetLatestOffersDocument, options);
      }
export function useGetLatestOffersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetLatestOffersQuery, GetLatestOffersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetLatestOffersQuery, GetLatestOffersQueryVariables>(GetLatestOffersDocument, options);
        }
export type GetLatestOffersQueryHookResult = ReturnType<typeof useGetLatestOffersQuery>;
export type GetLatestOffersLazyQueryHookResult = ReturnType<typeof useGetLatestOffersLazyQuery>;
export type GetLatestOffersQueryResult = Apollo.QueryResult<GetLatestOffersQuery, GetLatestOffersQueryVariables>;
export const GetLatestOffersSeriesDocument = gql`
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

/**
 * __useGetLatestOffersSeriesQuery__
 *
 * To run a query within a React component, call `useGetLatestOffersSeriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLatestOffersSeriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLatestOffersSeriesQuery({
 *   variables: {
 *      genericItemId: // value for 'genericItemId'
 *   },
 * });
 */
export function useGetLatestOffersSeriesQuery(baseOptions?: Apollo.QueryHookOptions<GetLatestOffersSeriesQuery, GetLatestOffersSeriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetLatestOffersSeriesQuery, GetLatestOffersSeriesQueryVariables>(GetLatestOffersSeriesDocument, options);
      }
export function useGetLatestOffersSeriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetLatestOffersSeriesQuery, GetLatestOffersSeriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetLatestOffersSeriesQuery, GetLatestOffersSeriesQueryVariables>(GetLatestOffersSeriesDocument, options);
        }
export type GetLatestOffersSeriesQueryHookResult = ReturnType<typeof useGetLatestOffersSeriesQuery>;
export type GetLatestOffersSeriesLazyQueryHookResult = ReturnType<typeof useGetLatestOffersSeriesLazyQuery>;
export type GetLatestOffersSeriesQueryResult = Apollo.QueryResult<GetLatestOffersSeriesQuery, GetLatestOffersSeriesQueryVariables>;
export const GetTransactionItemsDocument = gql`
    query GetTransactionItems($transactionId: Int, $page: Int, $perPage: Int) {
  transactionItems(transactionId: $transactionId, page: $page, perPage: $perPage) {
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

/**
 * __useGetTransactionItemsQuery__
 *
 * To run a query within a React component, call `useGetTransactionItemsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTransactionItemsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTransactionItemsQuery({
 *   variables: {
 *      transactionId: // value for 'transactionId'
 *      page: // value for 'page'
 *      perPage: // value for 'perPage'
 *   },
 * });
 */
export function useGetTransactionItemsQuery(baseOptions?: Apollo.QueryHookOptions<GetTransactionItemsQuery, GetTransactionItemsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTransactionItemsQuery, GetTransactionItemsQueryVariables>(GetTransactionItemsDocument, options);
      }
export function useGetTransactionItemsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTransactionItemsQuery, GetTransactionItemsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTransactionItemsQuery, GetTransactionItemsQueryVariables>(GetTransactionItemsDocument, options);
        }
export type GetTransactionItemsQueryHookResult = ReturnType<typeof useGetTransactionItemsQuery>;
export type GetTransactionItemsLazyQueryHookResult = ReturnType<typeof useGetTransactionItemsLazyQuery>;
export type GetTransactionItemsQueryResult = Apollo.QueryResult<GetTransactionItemsQuery, GetTransactionItemsQueryVariables>;
export const GetTransactionsDocument = gql`
    query GetTransactions($transactionId: Int, $userId: Int, $collectionId: Int, $status: String, $page: Int, $perPage: Int) {
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

/**
 * __useGetTransactionsQuery__
 *
 * To run a query within a React component, call `useGetTransactionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTransactionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTransactionsQuery({
 *   variables: {
 *      transactionId: // value for 'transactionId'
 *      userId: // value for 'userId'
 *      collectionId: // value for 'collectionId'
 *      status: // value for 'status'
 *      page: // value for 'page'
 *      perPage: // value for 'perPage'
 *   },
 * });
 */
export function useGetTransactionsQuery(baseOptions?: Apollo.QueryHookOptions<GetTransactionsQuery, GetTransactionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTransactionsQuery, GetTransactionsQueryVariables>(GetTransactionsDocument, options);
      }
export function useGetTransactionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTransactionsQuery, GetTransactionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTransactionsQuery, GetTransactionsQueryVariables>(GetTransactionsDocument, options);
        }
export type GetTransactionsQueryHookResult = ReturnType<typeof useGetTransactionsQuery>;
export type GetTransactionsLazyQueryHookResult = ReturnType<typeof useGetTransactionsLazyQuery>;
export type GetTransactionsQueryResult = Apollo.QueryResult<GetTransactionsQuery, GetTransactionsQueryVariables>;
export const GenericItemsDocument = gql`
    query genericItems($partialName: String, $page: Int, $perPage: Int, $databaseId: [Int]) {
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

/**
 * __useGenericItemsQuery__
 *
 * To run a query within a React component, call `useGenericItemsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGenericItemsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGenericItemsQuery({
 *   variables: {
 *      partialName: // value for 'partialName'
 *      page: // value for 'page'
 *      perPage: // value for 'perPage'
 *      databaseId: // value for 'databaseId'
 *   },
 * });
 */
export function useGenericItemsQuery(baseOptions?: Apollo.QueryHookOptions<GenericItemsQuery, GenericItemsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GenericItemsQuery, GenericItemsQueryVariables>(GenericItemsDocument, options);
      }
export function useGenericItemsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GenericItemsQuery, GenericItemsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GenericItemsQuery, GenericItemsQueryVariables>(GenericItemsDocument, options);
        }
export type GenericItemsQueryHookResult = ReturnType<typeof useGenericItemsQuery>;
export type GenericItemsLazyQueryHookResult = ReturnType<typeof useGenericItemsLazyQuery>;
export type GenericItemsQueryResult = Apollo.QueryResult<GenericItemsQuery, GenericItemsQueryVariables>;
export const GetItemListsDocument = gql`
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

/**
 * __useGetItemListsQuery__
 *
 * To run a query within a React component, call `useGetItemListsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetItemListsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetItemListsQuery({
 *   variables: {
 *      itemListId: // value for 'itemListId'
 *   },
 * });
 */
export function useGetItemListsQuery(baseOptions?: Apollo.QueryHookOptions<GetItemListsQuery, GetItemListsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetItemListsQuery, GetItemListsQueryVariables>(GetItemListsDocument, options);
      }
export function useGetItemListsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetItemListsQuery, GetItemListsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetItemListsQuery, GetItemListsQueryVariables>(GetItemListsDocument, options);
        }
export type GetItemListsQueryHookResult = ReturnType<typeof useGetItemListsQuery>;
export type GetItemListsLazyQueryHookResult = ReturnType<typeof useGetItemListsLazyQuery>;
export type GetItemListsQueryResult = Apollo.QueryResult<GetItemListsQuery, GetItemListsQueryVariables>;
export const GetRealItemsTradeInfoDocument = gql`
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

/**
 * __useGetRealItemsTradeInfoQuery__
 *
 * To run a query within a React component, call `useGetRealItemsTradeInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRealItemsTradeInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRealItemsTradeInfoQuery({
 *   variables: {
 *      itemListId: // value for 'itemListId'
 *      page: // value for 'page'
 *      perPage: // value for 'perPage'
 *   },
 * });
 */
export function useGetRealItemsTradeInfoQuery(baseOptions?: Apollo.QueryHookOptions<GetRealItemsTradeInfoQuery, GetRealItemsTradeInfoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRealItemsTradeInfoQuery, GetRealItemsTradeInfoQueryVariables>(GetRealItemsTradeInfoDocument, options);
      }
export function useGetRealItemsTradeInfoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRealItemsTradeInfoQuery, GetRealItemsTradeInfoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRealItemsTradeInfoQuery, GetRealItemsTradeInfoQueryVariables>(GetRealItemsTradeInfoDocument, options);
        }
export type GetRealItemsTradeInfoQueryHookResult = ReturnType<typeof useGetRealItemsTradeInfoQuery>;
export type GetRealItemsTradeInfoLazyQueryHookResult = ReturnType<typeof useGetRealItemsTradeInfoLazyQuery>;
export type GetRealItemsTradeInfoQueryResult = Apollo.QueryResult<GetRealItemsTradeInfoQuery, GetRealItemsTradeInfoQueryVariables>;
export const GetRealItemsByItemListDocument = gql`
    query GetRealItemsByItemList($itemListId: Int!, $page: Int!, $perPage: Int!, $partialName: String, $sortKey: String, $sortReverse: Boolean) {
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

/**
 * __useGetRealItemsByItemListQuery__
 *
 * To run a query within a React component, call `useGetRealItemsByItemListQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRealItemsByItemListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRealItemsByItemListQuery({
 *   variables: {
 *      itemListId: // value for 'itemListId'
 *      page: // value for 'page'
 *      perPage: // value for 'perPage'
 *      partialName: // value for 'partialName'
 *      sortKey: // value for 'sortKey'
 *      sortReverse: // value for 'sortReverse'
 *   },
 * });
 */
export function useGetRealItemsByItemListQuery(baseOptions: Apollo.QueryHookOptions<GetRealItemsByItemListQuery, GetRealItemsByItemListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRealItemsByItemListQuery, GetRealItemsByItemListQueryVariables>(GetRealItemsByItemListDocument, options);
      }
export function useGetRealItemsByItemListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRealItemsByItemListQuery, GetRealItemsByItemListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRealItemsByItemListQuery, GetRealItemsByItemListQueryVariables>(GetRealItemsByItemListDocument, options);
        }
export type GetRealItemsByItemListQueryHookResult = ReturnType<typeof useGetRealItemsByItemListQuery>;
export type GetRealItemsByItemListLazyQueryHookResult = ReturnType<typeof useGetRealItemsByItemListLazyQuery>;
export type GetRealItemsByItemListQueryResult = Apollo.QueryResult<GetRealItemsByItemListQuery, GetRealItemsByItemListQueryVariables>;
export const GetPublishedRealItemsDocument = gql`
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

/**
 * __useGetPublishedRealItemsQuery__
 *
 * To run a query within a React component, call `useGetPublishedRealItemsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPublishedRealItemsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPublishedRealItemsQuery({
 *   variables: {
 *      page: // value for 'page'
 *      perPage: // value for 'perPage'
 *   },
 * });
 */
export function useGetPublishedRealItemsQuery(baseOptions?: Apollo.QueryHookOptions<GetPublishedRealItemsQuery, GetPublishedRealItemsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPublishedRealItemsQuery, GetPublishedRealItemsQueryVariables>(GetPublishedRealItemsDocument, options);
      }
export function useGetPublishedRealItemsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPublishedRealItemsQuery, GetPublishedRealItemsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPublishedRealItemsQuery, GetPublishedRealItemsQueryVariables>(GetPublishedRealItemsDocument, options);
        }
export type GetPublishedRealItemsQueryHookResult = ReturnType<typeof useGetPublishedRealItemsQuery>;
export type GetPublishedRealItemsLazyQueryHookResult = ReturnType<typeof useGetPublishedRealItemsLazyQuery>;
export type GetPublishedRealItemsQueryResult = Apollo.QueryResult<GetPublishedRealItemsQuery, GetPublishedRealItemsQueryVariables>;
export const CountPublishedDocument = gql`
    query CountPublished {
  countPublished
}
    `;

/**
 * __useCountPublishedQuery__
 *
 * To run a query within a React component, call `useCountPublishedQuery` and pass it any options that fit your needs.
 * When your component renders, `useCountPublishedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCountPublishedQuery({
 *   variables: {
 *   },
 * });
 */
export function useCountPublishedQuery(baseOptions?: Apollo.QueryHookOptions<CountPublishedQuery, CountPublishedQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CountPublishedQuery, CountPublishedQueryVariables>(CountPublishedDocument, options);
      }
export function useCountPublishedLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CountPublishedQuery, CountPublishedQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CountPublishedQuery, CountPublishedQueryVariables>(CountPublishedDocument, options);
        }
export type CountPublishedQueryHookResult = ReturnType<typeof useCountPublishedQuery>;
export type CountPublishedLazyQueryHookResult = ReturnType<typeof useCountPublishedLazyQuery>;
export type CountPublishedQueryResult = Apollo.QueryResult<CountPublishedQuery, CountPublishedQueryVariables>;
export const GetEbayListingDocument = gql`
    query GetEbayListing($databaseId: Int, $page: Int, $perPage: Int, $hasPrediction: Boolean) {
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

/**
 * __useGetEbayListingQuery__
 *
 * To run a query within a React component, call `useGetEbayListingQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEbayListingQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEbayListingQuery({
 *   variables: {
 *      databaseId: // value for 'databaseId'
 *      page: // value for 'page'
 *      perPage: // value for 'perPage'
 *      hasPrediction: // value for 'hasPrediction'
 *   },
 * });
 */
export function useGetEbayListingQuery(baseOptions?: Apollo.QueryHookOptions<GetEbayListingQuery, GetEbayListingQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetEbayListingQuery, GetEbayListingQueryVariables>(GetEbayListingDocument, options);
      }
export function useGetEbayListingLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetEbayListingQuery, GetEbayListingQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetEbayListingQuery, GetEbayListingQueryVariables>(GetEbayListingDocument, options);
        }
export type GetEbayListingQueryHookResult = ReturnType<typeof useGetEbayListingQuery>;
export type GetEbayListingLazyQueryHookResult = ReturnType<typeof useGetEbayListingLazyQuery>;
export type GetEbayListingQueryResult = Apollo.QueryResult<GetEbayListingQuery, GetEbayListingQueryVariables>;
export const GetListingFeedbackDocument = gql`
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

/**
 * __useGetListingFeedbackQuery__
 *
 * To run a query within a React component, call `useGetListingFeedbackQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetListingFeedbackQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetListingFeedbackQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *      page: // value for 'page'
 *      perPage: // value for 'perPage'
 *   },
 * });
 */
export function useGetListingFeedbackQuery(baseOptions?: Apollo.QueryHookOptions<GetListingFeedbackQuery, GetListingFeedbackQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetListingFeedbackQuery, GetListingFeedbackQueryVariables>(GetListingFeedbackDocument, options);
      }
export function useGetListingFeedbackLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetListingFeedbackQuery, GetListingFeedbackQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetListingFeedbackQuery, GetListingFeedbackQueryVariables>(GetListingFeedbackDocument, options);
        }
export type GetListingFeedbackQueryHookResult = ReturnType<typeof useGetListingFeedbackQuery>;
export type GetListingFeedbackLazyQueryHookResult = ReturnType<typeof useGetListingFeedbackLazyQuery>;
export type GetListingFeedbackQueryResult = Apollo.QueryResult<GetListingFeedbackQuery, GetListingFeedbackQueryVariables>;
export const TransactionLogsDocument = gql`
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

/**
 * __useTransactionLogsQuery__
 *
 * To run a query within a React component, call `useTransactionLogsQuery` and pass it any options that fit your needs.
 * When your component renders, `useTransactionLogsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTransactionLogsQuery({
 *   variables: {
 *      transactionId: // value for 'transactionId'
 *   },
 * });
 */
export function useTransactionLogsQuery(baseOptions?: Apollo.QueryHookOptions<TransactionLogsQuery, TransactionLogsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TransactionLogsQuery, TransactionLogsQueryVariables>(TransactionLogsDocument, options);
      }
export function useTransactionLogsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TransactionLogsQuery, TransactionLogsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TransactionLogsQuery, TransactionLogsQueryVariables>(TransactionLogsDocument, options);
        }
export type TransactionLogsQueryHookResult = ReturnType<typeof useTransactionLogsQuery>;
export type TransactionLogsLazyQueryHookResult = ReturnType<typeof useTransactionLogsLazyQuery>;
export type TransactionLogsQueryResult = Apollo.QueryResult<TransactionLogsQuery, TransactionLogsQueryVariables>;