<template>
  <div class="income container">
    <Alert v-if="alert" v-bind:message="alert" />
    <h1 class="page-header">Manage Incomes</h1>
    <input
      class="form-control"
      placeholder="Name, Month (Ex: Janeiro = 01) and Category (Ex: Receita Fixa = RF - Variavel = RV)"
      v-model="filterInput"
    />
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Projected Value</th>
          <th>Real Value</th>
          <th>Month</th>
          <th>Category</th>
          <th>Description</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="data in filterBy(data, filterInput)">
          <td>{{ data.id }}</td>
          <td>{{ data.name }}</td>
          <td>{{ formatCurrency(data.projectedValue) }}</td>
          <td>{{ formatCurrency(data.realValue) }}</td>
          <td>{{ parseDate(data.dateIncome) }}</td>
          <td>{{ parseCategory(data.category) }}</td>
          <td>{{ data.description }}</td>
          <td>
            <router-link
              class="btn btn-default"
              v-bind:to="'/income/' + data.id"
              >View</router-link
            >
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>

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
    async fetchIncome() {
      const response = await fetch("http://localhost:8082/income");
      const data = await response.json();
      this.data = data;
    },
    formatCurrency(value) {
      return parseFloat(value).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
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
      if (str === "RF") return "Receita Fixa";
      if (str === "RV") return "Receita Variável";
    },
    filterBy(list, value) {
      value = value.charAt(0).toUpperCase() + value.slice(1);

      return list.filter(function (data) {
        return (
          data.name.indexOf(value) > -1 ||
          data.dateIncome.indexOf(value) > -1 ||
          data.category.indexOf(value) > -1
        );
      });
    },
  },
  created: function () {
    if (this.$route.query.alert) {
      this.alert = this.$route.query.alert;
    }
    this.fetchIncome();
  },
  updated: function () {
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
