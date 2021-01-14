<template>
  <div class="edit container">
    <Alert v-if="alert" v-bind:message="alert" />
    <h1 class="page-header">Edit Expenses</h1>
    <form v-on:submit="update">
        <div class="well">
            <h4>Expenses Info</h4>
            
            <div class="form-group">
                <label>Id Debts</label>
                <input type="number" class="form-control" placeholder="Id Debts" v-model="data.idDebts">
            </div>
            
            <div class="form-group">
                <label>Name</label>
                <input type="text" class="form-control" placeholder="Name" v-model="data.name">
            </div>
            
            <div class="form-group">
               <label>Month</label>
               <input type="text" class="form-control" placeholder="Month" v-model="data.dateExpenses">
            </div>

            <div class="form-group">
                <label>Projected Value</label>
                <input type="number" class="form-control" placeholder="Projected Value" v-model="data.projectedValue">
            </div>

            <div class="form-group">
                <label>Real Value</label>
                <input type="number" class="form-control" placeholder="Real Value" v-model="data.realValue">
            </div>
            <div class="form-group">
               <label>Category</label>
               <input type="text" class="form-control" placeholder="Category" v-model="data.category">
            </div>

        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script>
    import Alert from './Alert'
    export default {
    name: 'add',
    data () {
        return {
        data: {},
        alert:''
        }
    },
    methods: {
        async fetchData(id){
            const response = await fetch('http://localhost:8081/expenses/'+id);
            const data = await response.json();
            this.data = data;
        },
        update(e){
            if(!this.data.name){
                this.alert = 'Please fill in all required fields';
            } else {
                let newData = {
                    idDebts: this.data.idDebts,
                    name: this.data.name,
                    projectedValue: this.data.projectedValue,
                    realValue: this.data.realValue,
                    dateExpenses: this.data.dateExpenses,
                    category: this.data.category
                }

                this.$http.put('http://localhost:8081/expenses/'+this.$route.params.id, newData)
                    .then(function(response){
                        this.$router.push({path: '/expenses', query: {alert: 'Updated'}});
                    });

                e.preventDefault();
            }
            e.preventDefault();
        }
    },
    created: function(){
        this.fetchData(this.$route.params.id);
    },
    components:{
        Alert
    }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
