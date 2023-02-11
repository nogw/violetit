export interface DataLoaders {
  UserLoader: ReturnType<typeof import('../user/UserLoader').getLoader>;
  PostLoader: ReturnType<typeof import('../post/PostLoader').getLoader>;
  VoteLoader: ReturnType<typeof import('../vote/VoteLoader').getLoader>;
  CommunityLoader: ReturnType<typeof import('../community/CommunityLoader').getLoader>;
}

type Loaders = { [Name in keyof DataLoaders]: () => DataLoaders[Name] } | Record<string, () => unknown>;

const loaders: Loaders = {};

const registerLoader = <Name extends keyof DataLoaders>(key: Name, getLoader: () => DataLoaders[Name]) => {
  loaders[key] = getLoader;
};

const getDataloaders = (): DataLoaders =>
  (Object.keys(loaders) as (keyof DataLoaders)[]).reduce(
    (prev, loaderKey) => ({
      ...prev,
      [loaderKey]: loaders[loaderKey](),
    }),
    {},
  ) as DataLoaders;

export { registerLoader, getDataloaders };
