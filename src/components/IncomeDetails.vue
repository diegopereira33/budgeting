<template>
  <div class="details container">
    <router-link to="/income">Back</router-link>
    <h1 class="page-header">
      {{ data.name }}
      <span class="pull-right">
        <router-link
          class="btn btn-primary"
          v-bind:to="'/editincome/' + data.id"
          >Edit</router-link
        >
        <button class="btn btn-danger" v-on:click="deleteData(data.id)">
          Delete
        </button>
      </span>
    </h1>
    <br />

    <ul class="list-group">
      <li class="list-group-item">{{ data.id }}</li>
      <li class="list-group-item">{{ data.name }}</li>
      <li class="list-group-item">{{ formatCurrency(data.projectedValue) }}</li>
      <li class="list-group-item">{{ formatCurrency(data.realValue) }}</li>
      <li class="list-group-item">{{ parseDate(data.dateIncome) }}</li>
      <li class="list-group-item">{{ parseCategory(data.category) }}</li>
      <li class="list-group-item">{{ data.description }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "data",
  data() {
    return {
      data: "",
    };
  },
  methods: {
    async fetchData(id) {
      const response = await fetch('http://localhost:8082/income/'+id);
      const data = await response.json();
      this.data = data;
    },
    parseCategory(str) {
      if (str === "RF") return "Receita Fixa";
      if (str === "RV") return "Receita Variável";
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
    deleteData(id) {
      this.$http
        .delete("http://localhost:8082/income/" + id)
        .then(function (response) {
          this.$router.push({ path: "/income", query: { alert: "Deleted" } });
        });
    },
  },
  created: function () {
    this.fetchData(this.$route.params.id);
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
