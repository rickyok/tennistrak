<template>
  <f7-page>
    <f7-navbar sliding :title="title" back-link="Back">
      <f7-nav-right>
        <f7-link icon="icon-bars" open-panel="left"></f7-link>
      </f7-nav-right>
    </f7-navbar>
    <f7-list form>
      <f7-list-item>
        <f7-label>ID</f7-label>
        <f7-input type="text" placeholder="ID" v-model="personData['.key']" readonly />
      </f7-list-item>
      <f7-list-item>
        <f7-label>Name</f7-label>
        <f7-input type="text" placeholder="Name" v-model="personData.name" />
      </f7-list-item>
    </f7-list>
    <f7-buttons>
      <f7-button back color="red">Cancel</f7-button>
      <f7-button @click="deletePerson(personData)" color="red">Delete</f7-button>
      <f7-button @click="saveData(personData)">Save</f7-button>
    </f7-buttons>
  </f7-page>
</template>

<script>
  import firebase from '../lib/firebase.js';
  let db = firebase.database();
  let persons = db.ref('person');

  export default {
    name: 'PersonEdit',
    data () {
      return {
        title: 'Personel Edit'
      };
    },
    methods: {
      saveData (data) {
        let item = {...data};
        delete item['.key'];
        persons.child(data['.key']).set(item);
        this.$router.back();
      },
      deletePerson (person) {
        if (confirm('Are you sure?')) {
          persons.child(person['.key']).remove();
          this.$router.back();
        }
      }
    },
    firebase () {
      return {
        personData: {
          source: persons.child(this.$route.params.id),
          asObject: true
        }
      };
    }
  };
</script>
