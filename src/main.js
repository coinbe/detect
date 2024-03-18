import Vue from 'vue';
import App from './App.vue';

import * as VueGoogleMaps from 'vue2-google-maps';

Vue.config.productionTip = false;

Vue.use(VueGoogleMaps, {
	load: {
		key: 'AIzaSyAtt0rSUFoNehHH_2vDJUAVAzoau4zy8Uc',
		libraries: 'places',
		region: 'KR',
	},
});

new Vue({
	render: h => h(App),
}).$mount('#app');
