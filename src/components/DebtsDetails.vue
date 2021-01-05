<template>
  <div class="details container">
    <router-link to="/">Back</router-link>
    <h1 class="page-header">{{debt.name}}
        <span class="pull-right">
            <router-link class="btn btn-primary" v-bind:to="'/editdebt/'+debt.id">Edit</router-link>
            <button class="btn btn-danger" v-on:click="deleteDebt(debt.id)">Delete</button>
            </span>
    </h1>
<br>

        <ul class="list-group">
            <li class="list-group-item"> {{debt.id}}</li>
            <li class="list-group-item">{{debt.name}}</li>
            <li class="list-group-item">{{debt.description}}</li>
            <li class="list-group-item"> {{formatCurrency(debt.value)}}</li>
            <li class="list-group-item">{{debt.parcelNumber}}</li>
            <li class="list-group-item">{{parseDate(debt.dueDate)}}</li>
            <li class="list-group-item"> {{debt.payDate}}</li>
            <li class="list-group-item">{{debt.status}}</li>
            <li class="list-group-item">{{debt.category}}</li>
        </ul>
  </div>
</template>

<script>
export default {
  name: 'debtdetails',
  data () {
    return {
      debt: ''
    }
  },
  methods:{
      fetchDebt(id){
          this.$http.get('http://10.0.0.111:8080/debt/'+id)
          .then(function(response){
            this.debt = response.body;
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
      deleteDebt(id){
          this.$http.delete('http://10.0.0.111:8080/debt/'+id)
          .then(function(response){
            this.$router.push({path: '/', query: {alert: 'Debt Deleted'}});
          });
      }
  },
  created: function(){
      this.fetchDebt(this.$route.params.id);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
