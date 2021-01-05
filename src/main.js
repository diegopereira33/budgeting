// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import Budgeting from './components/Budgeting'
import About from './components/About'
import AddDebt from './components/AddDebts'
import DebtDetails from './components/DebtsDetails'
import EditDebt    from './components/EditDebts'
import Expenses from './components/Expenses'

Vue.use(VueResource)
Vue.use(VueRouter)

const router = new VueRouter({
 mode: 'history',
 base: __dirname,
 routes: [
   {path:'/', component: Budgeting},
   {path: '/about', component: About},
   {path: '/addDebts', component: AddDebt},
   {path: '/debt/:id', component: DebtDetails},
   {path: '/editdebt/:id', component: EditDebt},
   {path:'/expenses', component: Expenses}
  ]
})

/* eslint-disable no-new */
new Vue({
  router,
  template: ` <div id="app">
      <nav class="navbar navbar-default">
      <div class="container">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="#">Budgeting</a>
        </div>
        <div id="navbar" class="collapse navbar-collapse">
          <ul class="nav navbar-nav">
            <li><router-link to="/">Home</router-link></li>
            <li><router-link to="/about">About</router-link></li>
            <li><router-link to="/addDebts">Add Debt</router-link></li>
            <li><router-link to="/expenses">Expenses</router-link></li>
          </ul>
        </div><!--/.nav-collapse -->
      </div>
    </nav>
      <router-view></router-view>
    </div>
  `
}).$mount('#app')

