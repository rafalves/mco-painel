import { defineNuxtPlugin } from "#app";
import PrimeVue from "primevue/config";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel'; 
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Checkbox from 'primevue/checkbox';
import ColumnGroup from 'primevue/columngroup';   // optional
import Row from 'primevue/row';                   // optional 
import Toolbar from 'primevue/toolbar';
import InputNumber from 'primevue/inputnumber';
import RadioButton from 'primevue/radiobutton';
import Tooltip from 'primevue/tooltip';


export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(PrimeVue, { ripple: true },);
    nuxtApp.vueApp.directive('tooltip', Tooltip);
    nuxtApp.vueApp.component("Button", Button);
    nuxtApp.vueApp.component("InputText", InputText);
    nuxtApp.vueApp.component("TabView", TabView); 
    nuxtApp.vueApp.component("TabPanel", TabPanel);  
    nuxtApp.vueApp.component("DataTable", DataTable);  
    nuxtApp.vueApp.component("Column", Column);  
    nuxtApp.vueApp.component("ColumnGroup", ColumnGroup);  
    nuxtApp.vueApp.component("Row", Row);  
    nuxtApp.vueApp.component("Checkbox", Checkbox);    
    nuxtApp.vueApp.component("Toolbar", Toolbar);    
    nuxtApp.vueApp.component("InputNumber", InputNumber);    
    nuxtApp.vueApp.component("RadioButton", RadioButton);    
    //other components that you need
});