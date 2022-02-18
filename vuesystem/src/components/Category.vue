<template>
  <v-layout align-start>
    <v-flex>
      <v-data-table
        :search="search"
        :headers="headers"
        :items="categories"
        sort-by="calories"
        class="elevation-1"
      >
        <template v-slot:[`item.state`]="{ item }">
          <v-chip :color="getColor(item.state)" dark>
            <div v-if="item.state"><span> Active</span></div>
            <div v-else><span> Inactive</span></div>
          </v-chip>
        </template>
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Categories</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-text-field
              class="text-xs-center"
              v-model="search"
              append-icon="search"
              label="Search"
              single-line
              hide-details
            >
            </v-text-field>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="500px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  dark
                  class="mb-2"
                  v-bind="attrs"
                  v-on="on"
                >
                  New Category
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="text-h5">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="12" md="12">
                        <v-text-field
                          v-model="editedItem.name"
                          label="Name"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="12" md="12">
                        <v-text-field
                          v-model="editedItem.description"
                          label="Description"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="12" md="12" v-show="true">
                        <div
                          class="red--text"
                          v-for="i in validateMessage"
                          :key="i"
                          v-text="i"
                        ></div>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close">
                    Cancel
                  </v-btn>
                  <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-card-title class="text-h5"
                  >Are you sure you want to delete this item?</v-card-title
                >
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="closeDelete"
                    >Cancel</v-btn
                  >
                  <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                    >OK</v-btn
                  >
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)"> edit </v-icon>
          <v-icon small @click="deleteItem(item)"> delete </v-icon>
        </template>
        <template v-slot:no-data>
          <v-btn color="primary" @click="list()"> Reset </v-btn>
        </template>
      </v-data-table>
    </v-flex>
  </v-layout>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      search: "",
      categories: [],
      dialog: false,
      dialogDelete: false,
      headers: [
        { text: "Name", value: "name", sortable: true },
        { text: "Description", value: "description", sortable: false },
        { text: "State", value: "state", sortable: false },
        { text: "Actions", value: "actions", sortable: false },
      ],
      desserts: [],
      editedIndex: -1,
      editedItem: {
        _id: "",
        name: "",
        description: "",
      },
      validated: 0,
      validateMessage: [],
    };
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    this.list();
  },

  methods: {
    getColor(state) {
      if (state) {
        return "green";
      } else {
        return "red";
      }
    },
    list() {
      let me = this;
      axios
        .get("category/list")
        .then(function (response) {
          me.categories = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    editItem(item) {
      this.editedItem._id = item._id;
      this.editedItem.name = item.name;
      this.editedItem.description = item.description;
      this.dialog = true;
      this.editedIndex = 1;
    },

    deleteItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.desserts.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
    },

    closeDelete() {
      this.dialogDelete = false;
    },

    clean() {
      this.editedItem._id = "";
      this.editedItem.name = "";
      this.editedItem.description = "";
      this.validated = 0;
      this.validateMessage = [];
      this.editedIndex =-1
    },

    validate() {
      this.validated = 0;
      this.validateMessage = [];
      if (this.editedItem.name.length < 1 || this.editedItem.name.length > 50) {
        this.validateMessage.push(
          "Name of category must have between 1 and 50 characters"
        );
      }
      if (this.editedItem.description.length > 255) {
        this.validateMessage.push(
          "Description of category must have less than 255 characters"
        );
      }
      if (this.validateMessage.length) {
        this.validated = 1;
      }
      return this.validated;
    },

    save() {
      let me = this;
      if (this.validate()) {
        return;
      }
      if (this.editedIndex > -1) {
        axios
          .put("category/update", {
            '_id': this.editedItem._id,
            'name': this.editedItem.name,
            'description': this.editedItem.description,
          })
          .then(function (response) {
            me.clean();
            me.close();
            me.list();
          })
          .catch(function (error) {
            console.log(error);
          });
      } else {
        axios
          .post("category/add", {
            'name': this.editedItem.name,
            'description': this.editedItem.description,
          })
          .then(function (response) {
            me.clean();
            me.close();
            me.list();
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },
  },
};
</script>
