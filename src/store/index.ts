import { createStore, Store as BaseStore } from 'vuex';
import recipes, {
	type RecipesState,
	type Store as RecipesStore,
} from './recipesModule';

const store: BaseStore<RecipesState> = createStore({
	modules: {
		recipes,
	},
});

type State = {
	recipes: RecipesState;
};

type Store = RecipesStore<Pick<State, 'recipes'>>;

export function useStore() {
	return store as unknown as Store;
}

export default store;
