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
      <f7-button @click="addData()">Add</f7-button>
      <f7-list>
        <f7-list-item :link="'/session/' + p['.key'] + '/'" :title="p.player_name" v-for="p in sessions">
          Good: {{ p.good }} <br />
          In: {{ p.in }} <br />
          Out: {{ p.out }} <br />
        </f7-list-item>
      </f7-list>
    </f7-block>
  </f7-page>
</template>

<script>
  import firebase from '../lib/firebase.js';
  let db = firebase.database();
  let sessions = db.ref('session');

  export default {
    name: 'Session',
    data () {
      return {
        title: 'Session',
        loading: true
      };
    },
    methods: {
      addData () {
        let newData = sessions.push({
          player_id: '',
          player_name: '',
          good: 0,
          in: 0,
          out: 0,
          stroke: 0,
          in_percent: 0,
          good_percent: 0,
          date: '', // YYYY-mm-dd
          type: '', // Spin / Control
          feeder_id: '', // Salah satu person
          feeder_name: '', // Salah satu person
          photo: '' // Url location
        });
        this.$router.load({url: '/session/' + newData.key + '/'});
      }
    },
    firebase () {
      return {
        sessions: {
          source: sessions,
          readyCallback () {
            this.loading = false;
          }
        }
      };
    }
  };
</script>
