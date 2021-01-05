<template>
  <div class="edit container">
    <Alert v-if="alert" v-bind:message="alert" />
    <h1 class="page-header">Edit Debt</h1>
    <form v-on:submit="updateDebt">
        <div class="well">
            <h4>Debt Info</h4>
            <div class="form-group">
                <label>Name</label>
                <input type="text" class="form-control" placeholder="Name" v-model="debt.name">
            </div>
            <div class="form-group">
               <label>Description</label>
               <input type="text" class="form-control" placeholder="Description" v-model="debt.description">
            </div>


            <div class="form-group">
                <label>Value</label>
                <input type="number" class="form-control" placeholder="Value" v-model="debt.value">
            </div>

            <div class="form-group">
                <label>Parcel Number</label>
                <input type="number" class="form-control" placeholder="Parcel Number" v-model="debt.parcelNumber">
            </div>
            <div class="form-group">
               <label>Due Date</label>
               <input type="text" class="form-control" placeholder="Due Date" v-model="debt.dueDate">
            </div>

            <div class="form-group">
                <label>Pay Date</label>
                <input type="text" class="form-control" placeholder="Pay Date" v-model="debt.payDate">
            </div>

            <div class="form-group">
                <label>Status</label>
                <input type="text" class="form-control" placeholder="Status" v-model="debt.status">
            </div>
            <div class="form-group">
               <label>Category</label>
               <input type="text" class="form-control" placeholder="Category" v-model="debt.category">
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
        debt: {},
        alert:''
        }
    },
    methods: {
        fetchDebt(id){
            this.$http.get('http://10.0.0.111:8080/debt/'+id)
            .then(function(response){
                this.debt = response.body;
            });
        },
        updateDebt(e){
            if(!this.debt.dueDate || !this.debt.name || !this.debt.status || !this.debt.value){
                this.alert = 'Please fill in all required fields';
            } else {
                let newDebt = {
                    name: this.debt.name,
                    description: this.debt.description,
                    value: this.debt.value,
                    parcelNumber: this.debt.parcelNumber,
                    dueDate: this.debt.dueDate,
                    payDate: this.debt.payDate,
                    status: this.debt.status,
                    category: this.debt.category
                }

                this.$http.put('http://10.0.0.111:8080/debt/'+this.$route.params.id, newDebt)
                    .then(function(response){
                        this.$router.push({path: '/', query: {alert: 'Debt Updated'}});
                    });

                e.preventDefault();
            }
            e.preventDefault();
        }
    },
    created: function(){
        this.fetchDebt(this.$route.params.id);
    },
    components:{
        Alert
    }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
