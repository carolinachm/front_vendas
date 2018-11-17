<template>
    <div>
        <v-toolbar flat>
    
            <v-toolbar-title>{{ title }}</v-toolbar-title>
    
            <v-spacer></v-spacer>
    
            <v-dialog v-model="dialog" max-width="700px">
    
                <v-btn slot="activator" color="primary" dark flat fab title="Pesquisar"> {{ buttonTitle }}
                </v-btn>
    
                <v-card>
                    <v-card-title>
                        <span class="headline">{{ formTitle }}</span>
                    </v-card-title>
                </v-card>
    
    
                <v-card-text>
                    <v-container grid-list-xl>
                        <v-layout wrap row>
                            <v-flex xs12 sm6>
                                <v-text-field label="Data inicial"></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6>
                                <v-text-field label="Data final"></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6>
                                <v-checkbox v-model="checkbox" label="Venda x Produto" required></v-checkbox>
                            </v-flex>
                            <v-flex xs12 sm6>
                                <v-checkbox v-model="checkbox" label="Venda x Produto" required></v-checkbox>
    
                            </v-flex>
                            <v-flex xs12 sm6>
                                <v-checkbox v-model="checkbox" label="Venda x Produto" required></v-checkbox>
    
                            </v-flex>
                            <v-flex xs12 sm6>
                                <v-checkbox v-model="checkbox" label="Venda x Produto" required></v-checkbox>
    
                            </v-flex>
                            <v-flex xs12 sm6>
                                <v-checkbox v-model="checkbox" label="Venda x Produto" required></v-checkbox>
    
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card-text>
    
    
    
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat @click="geraRelatorio()">Gerar Relatorio</v-btn>
                </v-card-actions>
                </v-card>
            </v-dialog>
    
            <v-dialog v-model="dialogRelatorio"></v-dialog>
        </v-toolbar>
    
    
    </div>
</template>

<script>
    import VueCharts from 'vue-chartjs'
    import Bar from 'vue-chartjs'
    import ClienteService from "../service/ClienteService";
    import ProdutoService from "../service/ProdutoService";
    import MarcaService from "../service/MarcaService";
    
    
    export default {
        data: () => ({
            datacollection: null,
            extends: Bar,
            alert: false,
            msgAlert: "",
            title: "Relatorio",
            buttonTitle: "Pesquisar",
            dialog: false,
            dialogRelatorio: false,
            footerText: "Total de registros: ",
            emptyRecordsText: "Nenhum registro encontrado",
            records: 0,
            clientes: [{
                marca: {},
                produto: []
            }],
            cliente: {},
            tipoVeiculos: [],
            tipoVeiculo: {
    
            },
            marcas: [],
            marca: {
    
            },
            produtos: [],
            produto: {},
            headers: [{
                    text: "Nome",
                    align: "center",
                    value: "name"
                },
                {
                    text: "E-mail",
                    align: "center",
                    value: "email"
                },
                {
                    text: "Telefone",
                    align: "center",
                    value: "telefone"
                },
                {
                    text: "Rede Social",
                    align: "center",
                    value: "redeSocial"
                },
                {
                    text: "Ações",
                    value: "id",
                    sortable: false
                },
                {}
            ]
        }),
    
        computed: {
            formTitle() {
                return this.cliente._id ? "" : "Pesquisar Relatorio";
            }
        },
    
        watch: {
            dialog(val) {
                val || this.initialize();
            }
        },
    
        created() {
            this.initialize();
        },
    
        methods: {
            calculateRecords() {
                let amount = 0;
                for (let i = 0; i < this.clientes.length; i++) {
                    amount++;
                }
                this.records = amount;
            },
    
            async initialize() {
                this.marcas = await MarcaService.getAll();
                this.produtos = await ProdutoService.getAll();
                console.log(this.produtos)
                this.clientes = await ClienteService.getAll();
                console.log(this.clientes)
                this.cliente = {};
                this.dialog = false;
                this.dialogRelatorio
                this.calculateRecords();
    
    
            },
            async mounted() {
                this.renderChart({
                    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                    datasets: [{
                        label: 'GitHub Commits',
                        backgroundColor: '#f87979',
                        data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11]
                    }]
                })
            },
    
            edit(p) {
                this.cliente = p;
                this.dialog = true;
            },
    
    
            async geraRelatorio() {
                console.log("relatorio")
                this.datacollection = {
                    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                    datasets: [{
                        label: 'Data One',
                        backgroundColor: '#f87979',
                        data: [this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt()]
                    }]
                }
            },
            getRandomInt() {
                return Math.floor(Math.random() * (50 - 5 + 1)) + 5
            }
    
        },
    
        async clear() {
            this.cliente = {};
        }
    }
</script>

<style>
    
</style>
