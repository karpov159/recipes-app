import { createApp } from 'vue';
import App from '@/App.vue';
import router from '@/core/router';
import store from '@/core/store';
import directives from '@/directives';
import components from '@/components/UI';

const app = createApp(App);

directives.forEach((directive) => {
	app.directive(directive.name, directive);
});

components.forEach((component) => {
	app.component(component.name, component);
});

app.use(router).use(store).mount('#app');
