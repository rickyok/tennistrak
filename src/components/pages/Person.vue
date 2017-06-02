<template>
  <f7-page>
    <f7-navbar sliding :title="title">
      <f7-nav-right>
        <f7-link icon="icon-bars" open-panel="left"></f7-link>
      </f7-nav-right>
    </f7-navbar>
    <f7-block v-if="loading">
      <h2>Loading...</h2>
      <f7-preloader></f7-preloader>
    </f7-block>
    <f7-block v-if="!loading">
      <f7-list>
        <f7-list-item :link="'/person/' + p['.key'] + '/'" :title="p.name" v-for="p in persons"></f7-list-item>
      </f7-list>
      <f7-button @click="addPerson()">Add</f7-button>
    </f7-block>
  </f7-page>
</template>

<script>
  import firebase from '../lib/firebase.js';
  let db = firebase.database();
  let persons = db.ref('person');

  export default {
    name: 'Person',
    data () {
      return {
        title: 'Person',
        loading: true
      };
    },
    methods: {
      addPerson () {
        let newPerson = persons.push({
          name: ''
        });
        this.$router.load({url: '/person/' + newPerson.key + '/'});
      }
    },
    firebase () {
      return {
        persons: {
          source: persons,
          readyCallback () {
            this.loading = false;
          }
        }
      };
    }
  };
</script>
