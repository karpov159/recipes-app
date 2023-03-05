import { createStore, Store as BaseStore } from 'vuex';

import type { RecipesState } from './modules/recipes/recipes.model';
import type { Store } from './store.model';

import recipes from './modules/recipes/recipes';

const store: BaseStore<RecipesState> = createStore({
	modules: {
		recipes,
	},
});

export function useStore() {
	return store as unknown as Store;
}

export default store;
