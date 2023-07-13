interface offersType {
  scryfallCardId?: string;
  offersHistory: offersHistoryConnection;
  genericItems: genericItemsConnection;
}

interface offersHistoryConnection {
  edges: offersHistoryEdge[];
}

interface offersHistoryEdge {
  node: offersHistory;
}

interface offersHistory {
  id?: string;
  scryfall_card_id?: string;
  last_updated?: string;
  source?: string;
  merchant: string;
  amount: number;
  card_type: string;
  condition: string;
  offers_id: number;
}

interface genericItemsConnection {
  edges: genericItemsEdge[];
}

interface genericItemsEdge {
  node: genericItem;
}

interface genericItem {
  id?: string;
  oracle_id?: string;
  multiverse_ids?: string;
  mtgo_id?: string;
  produced_mana?: string;
  mtgo_foil_id?: string;
  scryfall_card_id?: string;
  legalities?: string;
  full_art?: boolean;
  textless?: boolean;
  loyalty?: string;
  oversized?: boolean;
  card_back_id?: string;
  games?: string;
  lang?: string;
  name?: string;
  uri?: string;
  rarity?: string;
  variation?: string;
  variation_of?: string;
  layout?: string;
  scryfall_uri?: string;
  cmc?: number;
  cardmarket_id?: string;
  tcgplayer_id?: string;
  color_identity?: string;
  colors?: string;
  keywords?: string;
  image_uris?: string;
  foil?: boolean;
  nonfoil?: boolean;
  etchedfoil?: boolean;
  mana_cost?: string;
  oracle_text?: string;
  power?: string;
  reserved?: boolean;
  toughness?: string;
  type_line?: string;
  artist?: string;
  booster?: string;
  border_color?: string;
  collector_number?: string;
  flavor_name?: string;
  flavor_text?: string;
  frame?: string;
  printed_name?: string;
  printed_text?: string;
  printed_type_line?: string;
  illustration_id?: string;
  promo: boolean;
  purchase_uris?: string;
  released_at?: string;
  scryfall_set_uri?: string;
  set_name?: string;
  set_search_uri?: string;
  set_type?: string;
  set_uri?: string;
  set?: string;
  image_uri_small?: string;
  image_uri_normal?: string;
  image_uri_large?: string;
  image_uri_png?: string;
  item_index?: string;
  scryfall_set_id?: string;
  original_name?: string;
}

interface realItem {
  databaseId: string;
  itemCollectionsId: number;
  itemId: number;
  sku: string;
  userId: number;
  imageUriPng?: string;
  imageUriSmall?: string;
  name?: string;
  price?: number;
}

interface itemCollection {
  realItems: realItem[];
  name: string;
  userId: number;
  databaseId: string;
}

interface ChartData {
  price: number;
  y_position: number;
  time: number | string;
}

export type { offersType, genericItem, realItem, itemCollection, ChartData };
