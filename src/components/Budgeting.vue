<template>
  <div class="budgeting container">
    <Alert v-if="alert" v-bind:message="alert" />
    <h1 class="page-header">Manage Debts</h1>
    <input class="form-control" placeholder="Name, Date, Status and Category" v-model="filterInput">
    <br />
    <table class="table table-striped">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Description</th>
            <th>Value</th>
            <th>Parcel Number</th>
            <th>Due Date</th>
            <th>Pay Date</th>
            <th>Status</th>
            <th>Category</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="budgeting in filterBy(budgeting, filterInput)">
            <td>{{budgeting.id}}</td>
            <td>{{budgeting.name}}</td>
            <td>{{budgeting.description}}</td>
            <td>{{formatCurrency(budgeting.value)}}</td>
            <td>{{budgeting.parcelNumber}}</td>
            <td>{{parseDate(budgeting.dueDate)}}</td>
            <td>{{budgeting.payDate}}</td>
            <td>{{budgeting.status}}</td>
            <td>{{budgeting.category}}</td>
            <td><router-link class="btn btn-default" v-bind:to="'/debt/'+budgeting.id">View</router-link></td>
          </tr>
        </tbody>
    </table>
  </div>
</template>

<script>
  import Alert from './Alert';
  export default {
    name: 'budgeting',
    data () {
      return {
        budgeting: [],
        alert:'',
        filterInput:''
      }
    },
    methods: {
      fetchBudgeting(){
        this.$http.get('http://10.0.0.111:8080/debt')
          .then(function(response){
              //console.log("response", response.body);
              this.budgeting = response.body;
          });
      },
        formatCurrency(value){
          return parseFloat(value).toLocaleString("pt-BR", {
           style: "currency",
           currency: "BRL"
          })
        },
        parseDate(str){
         let _year  = str.substring(0,4)
         let _month = str.substring(4,6)
         let _day   = str.substring(6,8)
  
         return _year + "/" + _month + "/" + _day
      },
      filterBy(list, value){
        value = value.charAt(0).toUpperCase() + value.slice(1);
        return list.filter(function(budgeting){
            return budgeting.name.indexOf(value) > -1 || budgeting.dueDate.indexOf(value) > -1 || budgeting.status.indexOf(value) > -1 || budgeting.category.indexOf(value) > -1;
        });
      }
    },
    created: function(){
      if(this.$route.query.alert){
        this.alert = this.$route.query.alert;
      }
      this.fetchBudgeting();
    },
    updated: function(){
      this.fetchBudgeting();
    },
    components: {
      Alert
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
