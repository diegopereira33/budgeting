<template>
  <div class="expenses container">
    <Alert v-if="alert" v-bind:message="alert" />
    <h1 class="page-header">Manage Expenses</h1>
    <input
      class="form-control"
      placeholder="Name, Month (Ex: Janeiro = 01) and Category (Ex: Despesa Fixa = DF - Variavel = DV)"
      v-model="filterInput"
    />
    <br />
    <h2>Incomes</h2>
    <br />
    <h4>Total Projected Value: {{ getTotalProjectedIncome() }}</h4>
    <h4>Total Real Value: {{ formatCurrency(getTotalRealIncome()) }}</h4>

    <h2>Expenses</h2>
    <br />
    <h4>Total Projected Value: {{ getTotalProjectedExpenses() }}</h4>
    <h4>Total Real Value: {{ formatCurrency(getTotalRealExpenses()) }}</h4>

    <h2>Balance</h2>
    <br />
    <h4>Total: {{ getTotalBalance() }}</h4>
    

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
          <td>{{ data.id }}</td>
          <td>{{ data.idDebts }}</td>
          <td>{{ data.name }}</td>
          <td>{{ formatCurrency(data.projectedValue) }}</td>
          <td>{{ formatCurrency(data.realValue) }}</td>
          <td>{{ parseDate(data.dateExpenses) }}</td>
          <td>{{ parseCategory(data.category) }}</td>
          <td>
            <router-link
              class="btn btn-default"
              v-bind:to="'/expenses/' + data.id"
              >View</router-link
            >
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
let dateExpenses = "";
let income = [];

import Alert from "./Alert";
export default {
  name: "data",
  data() {
    return {
      data: [],
      alert: "",
      filterInput: "",
    };
  },
  methods: {
    async fetchExpenses() {
      const response = await fetch("http://localhost:8081/expenses");
      const data = await response.json();
      this.data = data;
    },
    async fetchIncome() {
      const response = await fetch("http://localhost:8082/income");
      const data = await response.json();
      income = data;
    },
    formatCurrency(value) {
      return parseFloat(value).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
    },
    getTotalBalance(){

      //console.log("Income", (this.getTotalRealIncome()))
      //console.log("Expenses", parseFloat(expenses))

      return this.formatCurrency(this.getTotalRealIncome() - this.getTotalRealExpenses())
    },
    getTotalRealExpenses() {
      let total = 0;

      this.data.forEach((value) => {
        if (dateExpenses === "01" && value.dateExpenses === "01")
          total = value.realValue + total;
        if (dateExpenses === "02" && value.dateExpenses === "02")
          total = value.realValue + total;
        if (dateExpenses === "03" && value.dateExpenses === "03")
          total = value.realValue + total;
        if (dateExpenses === "04" && value.dateExpenses === "04")
          total = value.realValue + total;
        if (dateExpenses === "05" && value.dateExpenses === "05")
          total = value.realValue + total;
        if (dateExpenses === "06" && value.dateExpenses === "06")
          total = value.realValue + total;
        if (dateExpenses === "07" && value.dateExpenses === "07")
          total = value.realValue + total;
        if (dateExpenses === "08" && value.dateExpenses === "08")
          total = value.realValue + total;
        if (dateExpenses === "09" && value.dateExpenses === "09")
          total = value.realValue + total;
        if (dateExpenses === "10" && value.dateExpenses === "10")
          total = value.realValue + total;
        if (dateExpenses === "11" && value.dateExpenses === "11")
          total = value.realValue + total;
        if (dateExpenses === "12" && value.dateExpenses === "12")
          total = value.realValue + total;
      });
      return total;
      //return this.formatCurrency(total);
    },
    getTotalProjectedExpenses() {
      let total = 0;

      this.data.forEach((value) => {
        if (dateExpenses === "01" && value.dateExpenses === "01")
          total = value.projectedValue + total;
        if (dateExpenses === "02" && value.dateExpenses === "02")
          total = value.projectedValue + total;
        if (dateExpenses === "03" && value.dateExpenses === "03")
          total = value.projectedValue + total;
        if (dateExpenses === "04" && value.dateExpenses === "04")
          total = value.projectedValue + total;
        if (dateExpenses === "05" && value.dateExpenses === "05")
          total = value.projectedValue + total;
        if (dateExpenses === "06" && value.dateExpenses === "06")
          total = value.projectedValue + total;
        if (dateExpenses === "07" && value.dateExpenses === "07")
          total = value.projectedValue + total;
        if (dateExpenses === "08" && value.dateExpenses === "08")
          total = value.projectedValue + total;
        if (dateExpenses === "09" && value.dateExpenses === "09")
          total = value.projectedValue + total;
        if (dateExpenses === "10" && value.dateExpenses === "10")
          total = value.projectedValue + total;
        if (dateExpenses === "11" && value.dateExpenses === "11")
          total = value.projectedValue + total;
        if (dateExpenses === "12" && value.dateExpenses === "12")
          total = value.projectedValue + total;
      });

      return this.formatCurrency(total);
    },
    getTotalRealIncome() {
      let total = 0;

      income.forEach((value) => {
        if (dateExpenses === "01" && value.dateIncome === "01")
          total = value.realValue + total;
        if (dateExpenses === "02" && value.dateIncome === "02")
          total = value.realValue + total;
        if (dateExpenses === "03" && value.dateIncome === "03")
          total = value.realValue + total;
        if (dateExpenses === "04" && value.dateIncome === "04")
          total = value.realValue + total;
        if (dateExpenses === "05" && value.dateIncome === "05")
          total = value.realValue + total;
        if (dateExpenses === "06" && value.dateIncome === "06")
          total = value.realValue + total;
        if (dateExpenses === "07" && value.dateIncome === "07")
          total = value.realValue + total;
        if (dateExpenses === "08" && value.dateIncome === "08")
          total = value.realValue + total;
        if (dateExpenses === "09" && value.dateIncome === "09")
          total = value.realValue + total;
        if (dateExpenses === "10" && value.dateIncome === "10")
          total = value.realValue + total;
        if (dateExpenses === "11" && value.dateIncome === "11")
          total = value.realValue + total;
        if (dateExpenses === "12" && value.dateIncome === "12")
          total = value.realValue + total;
      });
      return total;
      //return this.formatCurrency(total);
    },
    getTotalProjectedIncome() {
      let total = 0;

      income.forEach((value) => {
        if (dateExpenses === "01" && value.dateIncome === "01")
          total = value.projectedValue + total;
        if (dateExpenses === "02" && value.dateIncome === "02")
          total = value.projectedValue + total;
        if (dateExpenses === "03" && value.dateIncome === "03")
          total = value.projectedValue + total;
        if (dateExpenses === "04" && value.dateIncome === "04")
          total = value.projectedValue + total;
        if (dateExpenses === "05" && value.dateIncome === "05")
          total = value.projectedValue + total;
        if (dateExpenses === "06" && value.dateIncome === "06")
          total = value.projectedValue + total;
        if (dateExpenses === "07" && value.dateIncome === "07")
          total = value.projectedValue + total;
        if (dateExpenses === "08" && value.dateIncome === "08")
          total = value.projectedValue + total;
        if (dateExpenses === "09" && value.dateIncome === "09")
          total = value.projectedValue + total;
        if (dateExpenses === "10" && value.dateIncome === "10")
          total = value.projectedValue + total;
        if (dateExpenses === "11" && value.dateIncome === "11")
          total = value.projectedValue + total;
        if (dateExpenses === "12" && value.dateIncome === "12")
          total = value.projectedValue + total;
      });

      return this.formatCurrency(total);
    },
    parseDate(str) {
      if (str === "01") return "Janeiro";
      if (str === "02") return "Fevereiro";
      if (str === "03") return "Março";
      if (str === "04") return "Abril";
      if (str === "05") return "Maio";
      if (str === "06") return "Junho";
      if (str === "07") return "Julho";
      if (str === "08") return "Agosto";
      if (str === "09") return "Setembro";
      if (str === "10") return "Outubro";
      if (str === "11") return "Novembro";
      if (str === "12") return "Dezembro";
    },
    parseCategory(str) {
      if (str === "DF") return "Despesa Fixa";
      if (str === "DV") return "Despesa Variável";
    },
    filterBy(list, value) {
      value = value.charAt(0).toUpperCase() + value.slice(1);

      if (value === "01") dateExpenses = value;
      if (value === "02") dateExpenses = value;
      if (value === "03") dateExpenses = value;
      if (value === "04") dateExpenses = value;
      if (value === "05") dateExpenses = value;
      if (value === "06") dateExpenses = value;
      if (value === "07") dateExpenses = value;
      if (value === "08") dateExpenses = value;
      if (value === "09") dateExpenses = value;
      if (value === "10") dateExpenses = value;
      if (value === "11") dateExpenses = value;
      if (value === "12") dateExpenses = value;

      return list.filter(function (data) {
        return (
          data.name.indexOf(value) > -1 ||
          data.dateExpenses.indexOf(value) > -1 ||
          data.category.indexOf(value) > -1
        );
      });
    },
  },
  created: function () {
    if (this.$route.query.alert) {
      this.alert = this.$route.query.alert;
    }

    this.fetchExpenses();
    this.fetchIncome();
  },
  updated: function () {
    this.fetchExpenses();
    this.fetchIncome();
  },
  components: {
    Alert,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
