<template>
  <div class="expenses container">
    <Alert v-if="alert" v-bind:message="alert" />
    <h1 class="page-header">Manage Expenses</h1>
    <input class="form-control" placeholder="Name, Month (Ex: Janeiro = 01) and Category (Ex: Despesa Fixa = DF - Variavel = DV)" v-model="filterInput">
    <br />
    <h4>Total Projected Value: {{totalProjectedValue()}} </h4> 
    <h4>Total Real Value: {{totalRealValue()}} </h4> 
    <table class="table table-striped"> 
        <thead>
          <tr>
            <th>Id</th>
            <th>Id Debts</th>
	          <th>Name</th>
            <th>Projected Value</th>
            <th>Real Value</th>      
            <th>Month</th>
            <th>Category</th>                  
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="data in filterBy(data, filterInput)">
            <td>{{data.id}}</td>
            <td>{{data.idDebts}}</td>
            <td>{{data.name}}</td>
            <td>{{formatCurrency(data.projectedValue)}}</td>
            <td>{{formatCurrency(data.realValue)}}</td>
            <td>{{parseDate(data.dateExpenses)}}</td>
            <td>{{parseCategory(data.category)}}</td>
            <td><router-link class="btn btn-default" v-bind:to="'/expenses/'+data.id">View</router-link></td>
          </tr>
        </tbody>
    </table>
  </div>
</template>

<script>
  import Alert from './Alert';
  export default {
    name: 'data',
    data () {
      return {
        data: [],
        dateExpenses: 'teste',
        alert:'',
        filterInput:''
      }
    },
    methods: {
      fetchData(){
        this.$http.get('http://10.0.0.111:8081/expenses')
          .then(function(response){
              //console.log("response", response.body);
              this.data = response.body;
          });
      },
        formatCurrency(value){
          return parseFloat(value).toLocaleString("pt-BR", {
           style: "currency",
           currency: "BRL"
          })
        },
        totalRealValue(){
          console.log("DateExpenses ", this.dateExpenses)
          let total = 0
    
           this.data.forEach(value => {
             total = value.realValue + total;
          })
          return this.formatCurrency(total)
        },
        totalProjectedValue(){
          let total = 0
    
           this.data.forEach(value => {
             total = value.projectedValue + total;
          })
          return this.formatCurrency(total)
        },
        parseDate(str){
         this.dateExpenses = str
         if(str === '01') return 'Janeiro'
         if(str === '02') return 'Fevereiro'
         if(str === '03') return 'Março'
         if(str === '04') return 'Abril'
         if(str === '05') return 'Maio'
         if(str === '06') return 'Junho'
         if(str === '07') return 'Julho'
         if(str === '08') return 'Agosto'
         if(str === '09') return 'Setembro'
         if(str === '10') return 'Outubro'
         if(str === '11') return 'Novembro'
         if(str === '12') return 'Dezembro'
         
      },
      parseCategory(str){
         if(str === 'DF') return 'Despesa Fixa'
         if(str === 'DV') return 'Despesa Variável'
      },
      filterBy(list, value){
        value = value.charAt(0).toUpperCase() + value.slice(1);
        return list.filter(function(data){
            return data.name.indexOf(value) > -1 || data.dateExpenses.indexOf(value) > -1 || data.category.indexOf(value) > -1 ;
        });
      }
    },
    created: function(){
      if(this.$route.query.alert){
        this.alert = this.$route.query.alert;
      }
      this.fetchData();
    },
    updated: function(){
      this.fetchData();
    },
    components: {
      Alert
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
