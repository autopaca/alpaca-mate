import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { GraphQLClient } from 'graphql-request';
import { useQuery, UseQueryOptions } from 'react-query';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };

function fetcher<TData, TVariables>(client: GraphQLClient, query: string, variables?: TVariables) {
  return async (): Promise<TData> => client.request<TData, TVariables>(query, variables);
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  BigDecimal: any;
  BigInt: any;
  Bytes: any;
};

export type Block_Height = {
  hash?: Maybe<Scalars['Bytes']>;
  number?: Maybe<Scalars['Int']>;
};

export type DebtOperation = {
  __typename?: 'DebtOperation';
  id: Scalars['ID'];
  position: PositionEntity;
  blockNumber: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  opType: OpType;
  debtShare: Scalars['BigInt'];
};

export type DebtOperation_Filter = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_lt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  position?: Maybe<Scalars['String']>;
  position_not?: Maybe<Scalars['String']>;
  position_gt?: Maybe<Scalars['String']>;
  position_lt?: Maybe<Scalars['String']>;
  position_gte?: Maybe<Scalars['String']>;
  position_lte?: Maybe<Scalars['String']>;
  position_in?: Maybe<Array<Scalars['String']>>;
  position_not_in?: Maybe<Array<Scalars['String']>>;
  position_contains?: Maybe<Scalars['String']>;
  position_not_contains?: Maybe<Scalars['String']>;
  position_starts_with?: Maybe<Scalars['String']>;
  position_not_starts_with?: Maybe<Scalars['String']>;
  position_ends_with?: Maybe<Scalars['String']>;
  position_not_ends_with?: Maybe<Scalars['String']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  blockNumber_not?: Maybe<Scalars['BigInt']>;
  blockNumber_gt?: Maybe<Scalars['BigInt']>;
  blockNumber_lt?: Maybe<Scalars['BigInt']>;
  blockNumber_gte?: Maybe<Scalars['BigInt']>;
  blockNumber_lte?: Maybe<Scalars['BigInt']>;
  blockNumber_in?: Maybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: Maybe<Array<Scalars['BigInt']>>;
  timestamp?: Maybe<Scalars['BigInt']>;
  timestamp_not?: Maybe<Scalars['BigInt']>;
  timestamp_gt?: Maybe<Scalars['BigInt']>;
  timestamp_lt?: Maybe<Scalars['BigInt']>;
  timestamp_gte?: Maybe<Scalars['BigInt']>;
  timestamp_lte?: Maybe<Scalars['BigInt']>;
  timestamp_in?: Maybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: Maybe<Array<Scalars['BigInt']>>;
  opType?: Maybe<OpType>;
  opType_not?: Maybe<OpType>;
  debtShare?: Maybe<Scalars['BigInt']>;
  debtShare_not?: Maybe<Scalars['BigInt']>;
  debtShare_gt?: Maybe<Scalars['BigInt']>;
  debtShare_lt?: Maybe<Scalars['BigInt']>;
  debtShare_gte?: Maybe<Scalars['BigInt']>;
  debtShare_lte?: Maybe<Scalars['BigInt']>;
  debtShare_in?: Maybe<Array<Scalars['BigInt']>>;
  debtShare_not_in?: Maybe<Array<Scalars['BigInt']>>;
};

export enum DebtOperation_OrderBy {
  Id = 'id',
  Position = 'position',
  BlockNumber = 'blockNumber',
  Timestamp = 'timestamp',
  OpType = 'opType',
  DebtShare = 'debtShare'
}

export enum OpType {
  Add = 'Add',
  Remove = 'Remove'
}

export enum OrderDirection {
  Asc = 'asc',
  Desc = 'desc'
}

export type PositionEntity = {
  __typename?: 'PositionEntity';
  /** vault-id */
  id: Scalars['ID'];
  share: Scalars['BigInt'];
  debtShare: Scalars['BigInt'];
  owner?: Maybe<Scalars['String']>;
  vault?: Maybe<VaultEntity>;
  worker?: Maybe<WorkerEntity>;
  debtOperations: Array<DebtOperation>;
  shareOperations: Array<ShareOperation>;
};


export type PositionEntityDebtOperationsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<DebtOperation_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<DebtOperation_Filter>;
};


export type PositionEntityShareOperationsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<ShareOperation_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<ShareOperation_Filter>;
};

export type PositionEntity_Filter = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_lt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  share?: Maybe<Scalars['BigInt']>;
  share_not?: Maybe<Scalars['BigInt']>;
  share_gt?: Maybe<Scalars['BigInt']>;
  share_lt?: Maybe<Scalars['BigInt']>;
  share_gte?: Maybe<Scalars['BigInt']>;
  share_lte?: Maybe<Scalars['BigInt']>;
  share_in?: Maybe<Array<Scalars['BigInt']>>;
  share_not_in?: Maybe<Array<Scalars['BigInt']>>;
  debtShare?: Maybe<Scalars['BigInt']>;
  debtShare_not?: Maybe<Scalars['BigInt']>;
  debtShare_gt?: Maybe<Scalars['BigInt']>;
  debtShare_lt?: Maybe<Scalars['BigInt']>;
  debtShare_gte?: Maybe<Scalars['BigInt']>;
  debtShare_lte?: Maybe<Scalars['BigInt']>;
  debtShare_in?: Maybe<Array<Scalars['BigInt']>>;
  debtShare_not_in?: Maybe<Array<Scalars['BigInt']>>;
  owner?: Maybe<Scalars['String']>;
  owner_not?: Maybe<Scalars['String']>;
  owner_gt?: Maybe<Scalars['String']>;
  owner_lt?: Maybe<Scalars['String']>;
  owner_gte?: Maybe<Scalars['String']>;
  owner_lte?: Maybe<Scalars['String']>;
  owner_in?: Maybe<Array<Scalars['String']>>;
  owner_not_in?: Maybe<Array<Scalars['String']>>;
  owner_contains?: Maybe<Scalars['String']>;
  owner_not_contains?: Maybe<Scalars['String']>;
  owner_starts_with?: Maybe<Scalars['String']>;
  owner_not_starts_with?: Maybe<Scalars['String']>;
  owner_ends_with?: Maybe<Scalars['String']>;
  owner_not_ends_with?: Maybe<Scalars['String']>;
  vault?: Maybe<Scalars['String']>;
  vault_not?: Maybe<Scalars['String']>;
  vault_gt?: Maybe<Scalars['String']>;
  vault_lt?: Maybe<Scalars['String']>;
  vault_gte?: Maybe<Scalars['String']>;
  vault_lte?: Maybe<Scalars['String']>;
  vault_in?: Maybe<Array<Scalars['String']>>;
  vault_not_in?: Maybe<Array<Scalars['String']>>;
  vault_contains?: Maybe<Scalars['String']>;
  vault_not_contains?: Maybe<Scalars['String']>;
  vault_starts_with?: Maybe<Scalars['String']>;
  vault_not_starts_with?: Maybe<Scalars['String']>;
  vault_ends_with?: Maybe<Scalars['String']>;
  vault_not_ends_with?: Maybe<Scalars['String']>;
  worker?: Maybe<Scalars['String']>;
  worker_not?: Maybe<Scalars['String']>;
  worker_gt?: Maybe<Scalars['String']>;
  worker_lt?: Maybe<Scalars['String']>;
  worker_gte?: Maybe<Scalars['String']>;
  worker_lte?: Maybe<Scalars['String']>;
  worker_in?: Maybe<Array<Scalars['String']>>;
  worker_not_in?: Maybe<Array<Scalars['String']>>;
  worker_contains?: Maybe<Scalars['String']>;
  worker_not_contains?: Maybe<Scalars['String']>;
  worker_starts_with?: Maybe<Scalars['String']>;
  worker_not_starts_with?: Maybe<Scalars['String']>;
  worker_ends_with?: Maybe<Scalars['String']>;
  worker_not_ends_with?: Maybe<Scalars['String']>;
};

export enum PositionEntity_OrderBy {
  Id = 'id',
  Share = 'share',
  DebtShare = 'debtShare',
  Owner = 'owner',
  Vault = 'vault',
  Worker = 'worker',
  DebtOperations = 'debtOperations',
  ShareOperations = 'shareOperations'
}

export type Query = {
  __typename?: 'Query';
  vaultEntity?: Maybe<VaultEntity>;
  vaultEntities: Array<VaultEntity>;
  workerEntity?: Maybe<WorkerEntity>;
  workerEntities: Array<WorkerEntity>;
  positionEntity?: Maybe<PositionEntity>;
  positionEntities: Array<PositionEntity>;
  debtOperation?: Maybe<DebtOperation>;
  debtOperations: Array<DebtOperation>;
  shareOperation?: Maybe<ShareOperation>;
  shareOperations: Array<ShareOperation>;
  reinvestEntity?: Maybe<ReinvestEntity>;
  reinvestEntities: Array<ReinvestEntity>;
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
};


export type QueryVaultEntityArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};


export type QueryVaultEntitiesArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<VaultEntity_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<VaultEntity_Filter>;
  block?: Maybe<Block_Height>;
};


export type QueryWorkerEntityArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};


export type QueryWorkerEntitiesArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<WorkerEntity_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<WorkerEntity_Filter>;
  block?: Maybe<Block_Height>;
};


export type QueryPositionEntityArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};


export type QueryPositionEntitiesArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<PositionEntity_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<PositionEntity_Filter>;
  block?: Maybe<Block_Height>;
};


export type QueryDebtOperationArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};


export type QueryDebtOperationsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<DebtOperation_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<DebtOperation_Filter>;
  block?: Maybe<Block_Height>;
};


export type QueryShareOperationArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};


export type QueryShareOperationsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<ShareOperation_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<ShareOperation_Filter>;
  block?: Maybe<Block_Height>;
};


export type QueryReinvestEntityArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};


export type QueryReinvestEntitiesArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<ReinvestEntity_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<ReinvestEntity_Filter>;
  block?: Maybe<Block_Height>;
};


export type Query_MetaArgs = {
  block?: Maybe<Block_Height>;
};

export type ReinvestEntity = {
  __typename?: 'ReinvestEntity';
  id: Scalars['ID'];
  worker: WorkerEntity;
  caller: Scalars['String'];
  reward: Scalars['BigInt'];
  bounty: Scalars['BigInt'];
  totalBalance?: Maybe<Scalars['BigInt']>;
  totalShare?: Maybe<Scalars['BigInt']>;
  blockNumber: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
};

export type ReinvestEntity_Filter = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_lt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  worker?: Maybe<Scalars['String']>;
  worker_not?: Maybe<Scalars['String']>;
  worker_gt?: Maybe<Scalars['String']>;
  worker_lt?: Maybe<Scalars['String']>;
  worker_gte?: Maybe<Scalars['String']>;
  worker_lte?: Maybe<Scalars['String']>;
  worker_in?: Maybe<Array<Scalars['String']>>;
  worker_not_in?: Maybe<Array<Scalars['String']>>;
  worker_contains?: Maybe<Scalars['String']>;
  worker_not_contains?: Maybe<Scalars['String']>;
  worker_starts_with?: Maybe<Scalars['String']>;
  worker_not_starts_with?: Maybe<Scalars['String']>;
  worker_ends_with?: Maybe<Scalars['String']>;
  worker_not_ends_with?: Maybe<Scalars['String']>;
  caller?: Maybe<Scalars['String']>;
  caller_not?: Maybe<Scalars['String']>;
  caller_gt?: Maybe<Scalars['String']>;
  caller_lt?: Maybe<Scalars['String']>;
  caller_gte?: Maybe<Scalars['String']>;
  caller_lte?: Maybe<Scalars['String']>;
  caller_in?: Maybe<Array<Scalars['String']>>;
  caller_not_in?: Maybe<Array<Scalars['String']>>;
  caller_contains?: Maybe<Scalars['String']>;
  caller_not_contains?: Maybe<Scalars['String']>;
  caller_starts_with?: Maybe<Scalars['String']>;
  caller_not_starts_with?: Maybe<Scalars['String']>;
  caller_ends_with?: Maybe<Scalars['String']>;
  caller_not_ends_with?: Maybe<Scalars['String']>;
  reward?: Maybe<Scalars['BigInt']>;
  reward_not?: Maybe<Scalars['BigInt']>;
  reward_gt?: Maybe<Scalars['BigInt']>;
  reward_lt?: Maybe<Scalars['BigInt']>;
  reward_gte?: Maybe<Scalars['BigInt']>;
  reward_lte?: Maybe<Scalars['BigInt']>;
  reward_in?: Maybe<Array<Scalars['BigInt']>>;
  reward_not_in?: Maybe<Array<Scalars['BigInt']>>;
  bounty?: Maybe<Scalars['BigInt']>;
  bounty_not?: Maybe<Scalars['BigInt']>;
  bounty_gt?: Maybe<Scalars['BigInt']>;
  bounty_lt?: Maybe<Scalars['BigInt']>;
  bounty_gte?: Maybe<Scalars['BigInt']>;
  bounty_lte?: Maybe<Scalars['BigInt']>;
  bounty_in?: Maybe<Array<Scalars['BigInt']>>;
  bounty_not_in?: Maybe<Array<Scalars['BigInt']>>;
  totalBalance?: Maybe<Scalars['BigInt']>;
  totalBalance_not?: Maybe<Scalars['BigInt']>;
  totalBalance_gt?: Maybe<Scalars['BigInt']>;
  totalBalance_lt?: Maybe<Scalars['BigInt']>;
  totalBalance_gte?: Maybe<Scalars['BigInt']>;
  totalBalance_lte?: Maybe<Scalars['BigInt']>;
  totalBalance_in?: Maybe<Array<Scalars['BigInt']>>;
  totalBalance_not_in?: Maybe<Array<Scalars['BigInt']>>;
  totalShare?: Maybe<Scalars['BigInt']>;
  totalShare_not?: Maybe<Scalars['BigInt']>;
  totalShare_gt?: Maybe<Scalars['BigInt']>;
  totalShare_lt?: Maybe<Scalars['BigInt']>;
  totalShare_gte?: Maybe<Scalars['BigInt']>;
  totalShare_lte?: Maybe<Scalars['BigInt']>;
  totalShare_in?: Maybe<Array<Scalars['BigInt']>>;
  totalShare_not_in?: Maybe<Array<Scalars['BigInt']>>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  blockNumber_not?: Maybe<Scalars['BigInt']>;
  blockNumber_gt?: Maybe<Scalars['BigInt']>;
  blockNumber_lt?: Maybe<Scalars['BigInt']>;
  blockNumber_gte?: Maybe<Scalars['BigInt']>;
  blockNumber_lte?: Maybe<Scalars['BigInt']>;
  blockNumber_in?: Maybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: Maybe<Array<Scalars['BigInt']>>;
  timestamp?: Maybe<Scalars['BigInt']>;
  timestamp_not?: Maybe<Scalars['BigInt']>;
  timestamp_gt?: Maybe<Scalars['BigInt']>;
  timestamp_lt?: Maybe<Scalars['BigInt']>;
  timestamp_gte?: Maybe<Scalars['BigInt']>;
  timestamp_lte?: Maybe<Scalars['BigInt']>;
  timestamp_in?: Maybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: Maybe<Array<Scalars['BigInt']>>;
};

export enum ReinvestEntity_OrderBy {
  Id = 'id',
  Worker = 'worker',
  Caller = 'caller',
  Reward = 'reward',
  Bounty = 'bounty',
  TotalBalance = 'totalBalance',
  TotalShare = 'totalShare',
  BlockNumber = 'blockNumber',
  Timestamp = 'timestamp'
}

export type ShareOperation = {
  __typename?: 'ShareOperation';
  id: Scalars['ID'];
  position: PositionEntity;
  blockNumber: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  opType: OpType;
  share: Scalars['BigInt'];
};

export type ShareOperation_Filter = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_lt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  position?: Maybe<Scalars['String']>;
  position_not?: Maybe<Scalars['String']>;
  position_gt?: Maybe<Scalars['String']>;
  position_lt?: Maybe<Scalars['String']>;
  position_gte?: Maybe<Scalars['String']>;
  position_lte?: Maybe<Scalars['String']>;
  position_in?: Maybe<Array<Scalars['String']>>;
  position_not_in?: Maybe<Array<Scalars['String']>>;
  position_contains?: Maybe<Scalars['String']>;
  position_not_contains?: Maybe<Scalars['String']>;
  position_starts_with?: Maybe<Scalars['String']>;
  position_not_starts_with?: Maybe<Scalars['String']>;
  position_ends_with?: Maybe<Scalars['String']>;
  position_not_ends_with?: Maybe<Scalars['String']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  blockNumber_not?: Maybe<Scalars['BigInt']>;
  blockNumber_gt?: Maybe<Scalars['BigInt']>;
  blockNumber_lt?: Maybe<Scalars['BigInt']>;
  blockNumber_gte?: Maybe<Scalars['BigInt']>;
  blockNumber_lte?: Maybe<Scalars['BigInt']>;
  blockNumber_in?: Maybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: Maybe<Array<Scalars['BigInt']>>;
  timestamp?: Maybe<Scalars['BigInt']>;
  timestamp_not?: Maybe<Scalars['BigInt']>;
  timestamp_gt?: Maybe<Scalars['BigInt']>;
  timestamp_lt?: Maybe<Scalars['BigInt']>;
  timestamp_gte?: Maybe<Scalars['BigInt']>;
  timestamp_lte?: Maybe<Scalars['BigInt']>;
  timestamp_in?: Maybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: Maybe<Array<Scalars['BigInt']>>;
  opType?: Maybe<OpType>;
  opType_not?: Maybe<OpType>;
  share?: Maybe<Scalars['BigInt']>;
  share_not?: Maybe<Scalars['BigInt']>;
  share_gt?: Maybe<Scalars['BigInt']>;
  share_lt?: Maybe<Scalars['BigInt']>;
  share_gte?: Maybe<Scalars['BigInt']>;
  share_lte?: Maybe<Scalars['BigInt']>;
  share_in?: Maybe<Array<Scalars['BigInt']>>;
  share_not_in?: Maybe<Array<Scalars['BigInt']>>;
};

export enum ShareOperation_OrderBy {
  Id = 'id',
  Position = 'position',
  BlockNumber = 'blockNumber',
  Timestamp = 'timestamp',
  OpType = 'opType',
  Share = 'share'
}

export type Subscription = {
  __typename?: 'Subscription';
  vaultEntity?: Maybe<VaultEntity>;
  vaultEntities: Array<VaultEntity>;
  workerEntity?: Maybe<WorkerEntity>;
  workerEntities: Array<WorkerEntity>;
  positionEntity?: Maybe<PositionEntity>;
  positionEntities: Array<PositionEntity>;
  debtOperation?: Maybe<DebtOperation>;
  debtOperations: Array<DebtOperation>;
  shareOperation?: Maybe<ShareOperation>;
  shareOperations: Array<ShareOperation>;
  reinvestEntity?: Maybe<ReinvestEntity>;
  reinvestEntities: Array<ReinvestEntity>;
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
};


export type SubscriptionVaultEntityArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};


export type SubscriptionVaultEntitiesArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<VaultEntity_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<VaultEntity_Filter>;
  block?: Maybe<Block_Height>;
};


export type SubscriptionWorkerEntityArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};


export type SubscriptionWorkerEntitiesArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<WorkerEntity_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<WorkerEntity_Filter>;
  block?: Maybe<Block_Height>;
};


export type SubscriptionPositionEntityArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};


export type SubscriptionPositionEntitiesArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<PositionEntity_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<PositionEntity_Filter>;
  block?: Maybe<Block_Height>;
};


export type SubscriptionDebtOperationArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};


export type SubscriptionDebtOperationsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<DebtOperation_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<DebtOperation_Filter>;
  block?: Maybe<Block_Height>;
};


export type SubscriptionShareOperationArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};


export type SubscriptionShareOperationsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<ShareOperation_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<ShareOperation_Filter>;
  block?: Maybe<Block_Height>;
};


export type SubscriptionReinvestEntityArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};


export type SubscriptionReinvestEntitiesArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<ReinvestEntity_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<ReinvestEntity_Filter>;
  block?: Maybe<Block_Height>;
};


export type Subscription_MetaArgs = {
  block?: Maybe<Block_Height>;
};

export type VaultEntity = {
  __typename?: 'VaultEntity';
  /** hex string address of vault */
  id: Scalars['ID'];
  name: Scalars['String'];
  vaultDebtShare: Scalars['BigInt'];
  positions: Array<PositionEntity>;
};


export type VaultEntityPositionsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<PositionEntity_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<PositionEntity_Filter>;
};

export type VaultEntity_Filter = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_lt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  name?: Maybe<Scalars['String']>;
  name_not?: Maybe<Scalars['String']>;
  name_gt?: Maybe<Scalars['String']>;
  name_lt?: Maybe<Scalars['String']>;
  name_gte?: Maybe<Scalars['String']>;
  name_lte?: Maybe<Scalars['String']>;
  name_in?: Maybe<Array<Scalars['String']>>;
  name_not_in?: Maybe<Array<Scalars['String']>>;
  name_contains?: Maybe<Scalars['String']>;
  name_not_contains?: Maybe<Scalars['String']>;
  name_starts_with?: Maybe<Scalars['String']>;
  name_not_starts_with?: Maybe<Scalars['String']>;
  name_ends_with?: Maybe<Scalars['String']>;
  name_not_ends_with?: Maybe<Scalars['String']>;
  vaultDebtShare?: Maybe<Scalars['BigInt']>;
  vaultDebtShare_not?: Maybe<Scalars['BigInt']>;
  vaultDebtShare_gt?: Maybe<Scalars['BigInt']>;
  vaultDebtShare_lt?: Maybe<Scalars['BigInt']>;
  vaultDebtShare_gte?: Maybe<Scalars['BigInt']>;
  vaultDebtShare_lte?: Maybe<Scalars['BigInt']>;
  vaultDebtShare_in?: Maybe<Array<Scalars['BigInt']>>;
  vaultDebtShare_not_in?: Maybe<Array<Scalars['BigInt']>>;
};

export enum VaultEntity_OrderBy {
  Id = 'id',
  Name = 'name',
  VaultDebtShare = 'vaultDebtShare',
  Positions = 'positions'
}

export type WorkerEntity = {
  __typename?: 'WorkerEntity';
  /** hex string address of worker */
  id: Scalars['ID'];
  /** pcs or wault */
  type: Scalars['String'];
  name: Scalars['String'];
  totalShare: Scalars['BigInt'];
  totalDebtShare?: Maybe<Scalars['BigInt']>;
  positions: Array<PositionEntity>;
  reinvests: Array<ReinvestEntity>;
};


export type WorkerEntityPositionsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<PositionEntity_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<PositionEntity_Filter>;
};


export type WorkerEntityReinvestsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<ReinvestEntity_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<ReinvestEntity_Filter>;
};

export type WorkerEntity_Filter = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_lt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  type?: Maybe<Scalars['String']>;
  type_not?: Maybe<Scalars['String']>;
  type_gt?: Maybe<Scalars['String']>;
  type_lt?: Maybe<Scalars['String']>;
  type_gte?: Maybe<Scalars['String']>;
  type_lte?: Maybe<Scalars['String']>;
  type_in?: Maybe<Array<Scalars['String']>>;
  type_not_in?: Maybe<Array<Scalars['String']>>;
  type_contains?: Maybe<Scalars['String']>;
  type_not_contains?: Maybe<Scalars['String']>;
  type_starts_with?: Maybe<Scalars['String']>;
  type_not_starts_with?: Maybe<Scalars['String']>;
  type_ends_with?: Maybe<Scalars['String']>;
  type_not_ends_with?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  name_not?: Maybe<Scalars['String']>;
  name_gt?: Maybe<Scalars['String']>;
  name_lt?: Maybe<Scalars['String']>;
  name_gte?: Maybe<Scalars['String']>;
  name_lte?: Maybe<Scalars['String']>;
  name_in?: Maybe<Array<Scalars['String']>>;
  name_not_in?: Maybe<Array<Scalars['String']>>;
  name_contains?: Maybe<Scalars['String']>;
  name_not_contains?: Maybe<Scalars['String']>;
  name_starts_with?: Maybe<Scalars['String']>;
  name_not_starts_with?: Maybe<Scalars['String']>;
  name_ends_with?: Maybe<Scalars['String']>;
  name_not_ends_with?: Maybe<Scalars['String']>;
  totalShare?: Maybe<Scalars['BigInt']>;
  totalShare_not?: Maybe<Scalars['BigInt']>;
  totalShare_gt?: Maybe<Scalars['BigInt']>;
  totalShare_lt?: Maybe<Scalars['BigInt']>;
  totalShare_gte?: Maybe<Scalars['BigInt']>;
  totalShare_lte?: Maybe<Scalars['BigInt']>;
  totalShare_in?: Maybe<Array<Scalars['BigInt']>>;
  totalShare_not_in?: Maybe<Array<Scalars['BigInt']>>;
  totalDebtShare?: Maybe<Scalars['BigInt']>;
  totalDebtShare_not?: Maybe<Scalars['BigInt']>;
  totalDebtShare_gt?: Maybe<Scalars['BigInt']>;
  totalDebtShare_lt?: Maybe<Scalars['BigInt']>;
  totalDebtShare_gte?: Maybe<Scalars['BigInt']>;
  totalDebtShare_lte?: Maybe<Scalars['BigInt']>;
  totalDebtShare_in?: Maybe<Array<Scalars['BigInt']>>;
  totalDebtShare_not_in?: Maybe<Array<Scalars['BigInt']>>;
};

export enum WorkerEntity_OrderBy {
  Id = 'id',
  Type = 'type',
  Name = 'name',
  TotalShare = 'totalShare',
  TotalDebtShare = 'totalDebtShare',
  Positions = 'positions',
  Reinvests = 'reinvests'
}

export type _Block_ = {
  __typename?: '_Block_';
  /** The hash of the block */
  hash?: Maybe<Scalars['Bytes']>;
  /** The block number */
  number: Scalars['Int'];
};

/** The type for the top-level _meta field */
export type _Meta_ = {
  __typename?: '_Meta_';
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: _Block_;
  /** The deployment ID */
  deployment: Scalars['String'];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean'];
};

export enum _SubgraphErrorPolicy_ {
  /** Data will be returned even if the subgraph has indexing errors */
  Allow = 'allow',
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  Deny = 'deny'
}



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  BigDecimal: ResolverTypeWrapper<Scalars['BigDecimal']>;
  BigInt: ResolverTypeWrapper<Scalars['BigInt']>;
  Block_height: Block_Height;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Bytes: ResolverTypeWrapper<Scalars['Bytes']>;
  DebtOperation: ResolverTypeWrapper<DebtOperation>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  DebtOperation_filter: DebtOperation_Filter;
  String: ResolverTypeWrapper<Scalars['String']>;
  DebtOperation_orderBy: DebtOperation_OrderBy;
  OpType: OpType;
  OrderDirection: OrderDirection;
  PositionEntity: ResolverTypeWrapper<PositionEntity>;
  PositionEntity_filter: PositionEntity_Filter;
  PositionEntity_orderBy: PositionEntity_OrderBy;
  Query: ResolverTypeWrapper<{}>;
  ReinvestEntity: ResolverTypeWrapper<ReinvestEntity>;
  ReinvestEntity_filter: ReinvestEntity_Filter;
  ReinvestEntity_orderBy: ReinvestEntity_OrderBy;
  ShareOperation: ResolverTypeWrapper<ShareOperation>;
  ShareOperation_filter: ShareOperation_Filter;
  ShareOperation_orderBy: ShareOperation_OrderBy;
  Subscription: ResolverTypeWrapper<{}>;
  VaultEntity: ResolverTypeWrapper<VaultEntity>;
  VaultEntity_filter: VaultEntity_Filter;
  VaultEntity_orderBy: VaultEntity_OrderBy;
  WorkerEntity: ResolverTypeWrapper<WorkerEntity>;
  WorkerEntity_filter: WorkerEntity_Filter;
  WorkerEntity_orderBy: WorkerEntity_OrderBy;
  _Block_: ResolverTypeWrapper<_Block_>;
  _Meta_: ResolverTypeWrapper<_Meta_>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  _SubgraphErrorPolicy_: _SubgraphErrorPolicy_;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  BigDecimal: Scalars['BigDecimal'];
  BigInt: Scalars['BigInt'];
  Block_height: Block_Height;
  Int: Scalars['Int'];
  Bytes: Scalars['Bytes'];
  DebtOperation: DebtOperation;
  ID: Scalars['ID'];
  DebtOperation_filter: DebtOperation_Filter;
  String: Scalars['String'];
  PositionEntity: PositionEntity;
  PositionEntity_filter: PositionEntity_Filter;
  Query: {};
  ReinvestEntity: ReinvestEntity;
  ReinvestEntity_filter: ReinvestEntity_Filter;
  ShareOperation: ShareOperation;
  ShareOperation_filter: ShareOperation_Filter;
  Subscription: {};
  VaultEntity: VaultEntity;
  VaultEntity_filter: VaultEntity_Filter;
  WorkerEntity: WorkerEntity;
  WorkerEntity_filter: WorkerEntity_Filter;
  _Block_: _Block_;
  _Meta_: _Meta_;
  Boolean: Scalars['Boolean'];
};

export type DerivedFromDirectiveArgs = {   field?: Maybe<Scalars['String']>; };

export type DerivedFromDirectiveResolver<Result, Parent, ContextType = any, Args = DerivedFromDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type EntityDirectiveArgs = {  };

export type EntityDirectiveResolver<Result, Parent, ContextType = any, Args = EntityDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type SubgraphIdDirectiveArgs = {   id?: Maybe<Scalars['String']>; };

export type SubgraphIdDirectiveResolver<Result, Parent, ContextType = any, Args = SubgraphIdDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export interface BigDecimalScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['BigDecimal'], any> {
  name: 'BigDecimal';
}

export interface BigIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['BigInt'], any> {
  name: 'BigInt';
}

export interface BytesScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Bytes'], any> {
  name: 'Bytes';
}

export type DebtOperationResolvers<ContextType = any, ParentType extends ResolversParentTypes['DebtOperation'] = ResolversParentTypes['DebtOperation']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  position?: Resolver<ResolversTypes['PositionEntity'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  opType?: Resolver<ResolversTypes['OpType'], ParentType, ContextType>;
  debtShare?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PositionEntityResolvers<ContextType = any, ParentType extends ResolversParentTypes['PositionEntity'] = ResolversParentTypes['PositionEntity']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  share?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  debtShare?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  owner?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  vault?: Resolver<Maybe<ResolversTypes['VaultEntity']>, ParentType, ContextType>;
  worker?: Resolver<Maybe<ResolversTypes['WorkerEntity']>, ParentType, ContextType>;
  debtOperations?: Resolver<Array<ResolversTypes['DebtOperation']>, ParentType, ContextType, RequireFields<PositionEntityDebtOperationsArgs, 'skip' | 'first'>>;
  shareOperations?: Resolver<Array<ResolversTypes['ShareOperation']>, ParentType, ContextType, RequireFields<PositionEntityShareOperationsArgs, 'skip' | 'first'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  vaultEntity?: Resolver<Maybe<ResolversTypes['VaultEntity']>, ParentType, ContextType, RequireFields<QueryVaultEntityArgs, 'id'>>;
  vaultEntities?: Resolver<Array<ResolversTypes['VaultEntity']>, ParentType, ContextType, RequireFields<QueryVaultEntitiesArgs, 'skip' | 'first'>>;
  workerEntity?: Resolver<Maybe<ResolversTypes['WorkerEntity']>, ParentType, ContextType, RequireFields<QueryWorkerEntityArgs, 'id'>>;
  workerEntities?: Resolver<Array<ResolversTypes['WorkerEntity']>, ParentType, ContextType, RequireFields<QueryWorkerEntitiesArgs, 'skip' | 'first'>>;
  positionEntity?: Resolver<Maybe<ResolversTypes['PositionEntity']>, ParentType, ContextType, RequireFields<QueryPositionEntityArgs, 'id'>>;
  positionEntities?: Resolver<Array<ResolversTypes['PositionEntity']>, ParentType, ContextType, RequireFields<QueryPositionEntitiesArgs, 'skip' | 'first'>>;
  debtOperation?: Resolver<Maybe<ResolversTypes['DebtOperation']>, ParentType, ContextType, RequireFields<QueryDebtOperationArgs, 'id'>>;
  debtOperations?: Resolver<Array<ResolversTypes['DebtOperation']>, ParentType, ContextType, RequireFields<QueryDebtOperationsArgs, 'skip' | 'first'>>;
  shareOperation?: Resolver<Maybe<ResolversTypes['ShareOperation']>, ParentType, ContextType, RequireFields<QueryShareOperationArgs, 'id'>>;
  shareOperations?: Resolver<Array<ResolversTypes['ShareOperation']>, ParentType, ContextType, RequireFields<QueryShareOperationsArgs, 'skip' | 'first'>>;
  reinvestEntity?: Resolver<Maybe<ResolversTypes['ReinvestEntity']>, ParentType, ContextType, RequireFields<QueryReinvestEntityArgs, 'id'>>;
  reinvestEntities?: Resolver<Array<ResolversTypes['ReinvestEntity']>, ParentType, ContextType, RequireFields<QueryReinvestEntitiesArgs, 'skip' | 'first'>>;
  _meta?: Resolver<Maybe<ResolversTypes['_Meta_']>, ParentType, ContextType, RequireFields<Query_MetaArgs, never>>;
};

export type ReinvestEntityResolvers<ContextType = any, ParentType extends ResolversParentTypes['ReinvestEntity'] = ResolversParentTypes['ReinvestEntity']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  worker?: Resolver<ResolversTypes['WorkerEntity'], ParentType, ContextType>;
  caller?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  reward?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  bounty?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  totalBalance?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  totalShare?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ShareOperationResolvers<ContextType = any, ParentType extends ResolversParentTypes['ShareOperation'] = ResolversParentTypes['ShareOperation']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  position?: Resolver<ResolversTypes['PositionEntity'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  opType?: Resolver<ResolversTypes['OpType'], ParentType, ContextType>;
  share?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubscriptionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = {
  vaultEntity?: SubscriptionResolver<Maybe<ResolversTypes['VaultEntity']>, "vaultEntity", ParentType, ContextType, RequireFields<SubscriptionVaultEntityArgs, 'id'>>;
  vaultEntities?: SubscriptionResolver<Array<ResolversTypes['VaultEntity']>, "vaultEntities", ParentType, ContextType, RequireFields<SubscriptionVaultEntitiesArgs, 'skip' | 'first'>>;
  workerEntity?: SubscriptionResolver<Maybe<ResolversTypes['WorkerEntity']>, "workerEntity", ParentType, ContextType, RequireFields<SubscriptionWorkerEntityArgs, 'id'>>;
  workerEntities?: SubscriptionResolver<Array<ResolversTypes['WorkerEntity']>, "workerEntities", ParentType, ContextType, RequireFields<SubscriptionWorkerEntitiesArgs, 'skip' | 'first'>>;
  positionEntity?: SubscriptionResolver<Maybe<ResolversTypes['PositionEntity']>, "positionEntity", ParentType, ContextType, RequireFields<SubscriptionPositionEntityArgs, 'id'>>;
  positionEntities?: SubscriptionResolver<Array<ResolversTypes['PositionEntity']>, "positionEntities", ParentType, ContextType, RequireFields<SubscriptionPositionEntitiesArgs, 'skip' | 'first'>>;
  debtOperation?: SubscriptionResolver<Maybe<ResolversTypes['DebtOperation']>, "debtOperation", ParentType, ContextType, RequireFields<SubscriptionDebtOperationArgs, 'id'>>;
  debtOperations?: SubscriptionResolver<Array<ResolversTypes['DebtOperation']>, "debtOperations", ParentType, ContextType, RequireFields<SubscriptionDebtOperationsArgs, 'skip' | 'first'>>;
  shareOperation?: SubscriptionResolver<Maybe<ResolversTypes['ShareOperation']>, "shareOperation", ParentType, ContextType, RequireFields<SubscriptionShareOperationArgs, 'id'>>;
  shareOperations?: SubscriptionResolver<Array<ResolversTypes['ShareOperation']>, "shareOperations", ParentType, ContextType, RequireFields<SubscriptionShareOperationsArgs, 'skip' | 'first'>>;
  reinvestEntity?: SubscriptionResolver<Maybe<ResolversTypes['ReinvestEntity']>, "reinvestEntity", ParentType, ContextType, RequireFields<SubscriptionReinvestEntityArgs, 'id'>>;
  reinvestEntities?: SubscriptionResolver<Array<ResolversTypes['ReinvestEntity']>, "reinvestEntities", ParentType, ContextType, RequireFields<SubscriptionReinvestEntitiesArgs, 'skip' | 'first'>>;
  _meta?: SubscriptionResolver<Maybe<ResolversTypes['_Meta_']>, "_meta", ParentType, ContextType, RequireFields<Subscription_MetaArgs, never>>;
};

export type VaultEntityResolvers<ContextType = any, ParentType extends ResolversParentTypes['VaultEntity'] = ResolversParentTypes['VaultEntity']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  vaultDebtShare?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  positions?: Resolver<Array<ResolversTypes['PositionEntity']>, ParentType, ContextType, RequireFields<VaultEntityPositionsArgs, 'skip' | 'first'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WorkerEntityResolvers<ContextType = any, ParentType extends ResolversParentTypes['WorkerEntity'] = ResolversParentTypes['WorkerEntity']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  totalShare?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  totalDebtShare?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  positions?: Resolver<Array<ResolversTypes['PositionEntity']>, ParentType, ContextType, RequireFields<WorkerEntityPositionsArgs, 'skip' | 'first'>>;
  reinvests?: Resolver<Array<ResolversTypes['ReinvestEntity']>, ParentType, ContextType, RequireFields<WorkerEntityReinvestsArgs, 'skip' | 'first'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type _Block_Resolvers<ContextType = any, ParentType extends ResolversParentTypes['_Block_'] = ResolversParentTypes['_Block_']> = {
  hash?: Resolver<Maybe<ResolversTypes['Bytes']>, ParentType, ContextType>;
  number?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type _Meta_Resolvers<ContextType = any, ParentType extends ResolversParentTypes['_Meta_'] = ResolversParentTypes['_Meta_']> = {
  block?: Resolver<ResolversTypes['_Block_'], ParentType, ContextType>;
  deployment?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  hasIndexingErrors?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  BigDecimal?: GraphQLScalarType;
  BigInt?: GraphQLScalarType;
  Bytes?: GraphQLScalarType;
  DebtOperation?: DebtOperationResolvers<ContextType>;
  PositionEntity?: PositionEntityResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  ReinvestEntity?: ReinvestEntityResolvers<ContextType>;
  ShareOperation?: ShareOperationResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  VaultEntity?: VaultEntityResolvers<ContextType>;
  WorkerEntity?: WorkerEntityResolvers<ContextType>;
  _Block_?: _Block_Resolvers<ContextType>;
  _Meta_?: _Meta_Resolvers<ContextType>;
};

export type DirectiveResolvers<ContextType = any> = {
  derivedFrom?: DerivedFromDirectiveResolver<any, any, ContextType>;
  entity?: EntityDirectiveResolver<any, any, ContextType>;
  subgraphId?: SubgraphIdDirectiveResolver<any, any, ContextType>;
};

export type GetPositionsByOwnerQueryVariables = Exact<{
  owner?: Maybe<Scalars['String']>;
}>;


export type GetPositionsByOwnerQuery = { __typename?: 'Query', positionEntities: Array<{ __typename?: 'PositionEntity', id: string, share: any, worker?: Maybe<{ __typename?: 'WorkerEntity', id: string, name: string, reinvests: Array<{ __typename?: 'ReinvestEntity', totalShare?: Maybe<any>, totalBalance?: Maybe<any>, timestamp: any }> }>, shareOperations: Array<{ __typename?: 'ShareOperation', opType: OpType, share: any, timestamp: any }> }> };


export const GetPositionsByOwnerDocument = `
    query getPositionsByOwner($owner: String) {
  positionEntities(where: {owner: $owner, share_gt: 0}, first: 1) {
    id
    share
    worker {
      id
      name
      reinvests {
        totalShare
        totalBalance
        timestamp
      }
    }
    shareOperations {
      opType
      share
      timestamp
    }
  }
}
    `;
export const useGetPositionsByOwnerQuery = <
      TData = GetPositionsByOwnerQuery,
      TError = unknown
    >(
      client: GraphQLClient, 
      variables?: GetPositionsByOwnerQueryVariables, 
      options?: UseQueryOptions<GetPositionsByOwnerQuery, TError, TData>
    ) => 
    useQuery<GetPositionsByOwnerQuery, TError, TData>(
      ['getPositionsByOwner', variables],
      fetcher<GetPositionsByOwnerQuery, GetPositionsByOwnerQueryVariables>(client, GetPositionsByOwnerDocument, variables),
      options
    );