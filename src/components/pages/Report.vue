<template>
  <f7-page>
    <f7-navbar sliding :title="title">
      <f7-nav-right>
        <f7-link icon="icon-bars" open-panel="left"></f7-link>
      </f7-nav-right>
    </f7-navbar>
    <f7-block>
      <vue-chart
        :columns="columns"
        :rows="rows"
        :options="options"
        ref="reportchart"
      ></vue-chart>
    </f7-block>
  </f7-page>
</template>

<script>
  import firebase from '../lib/firebase.js';
  let db = firebase.database();

  let sessions = db.ref('session');
  let players = db.ref('person');

  export default {
    name: 'Report',
    data () {
      return {
        title: 'Report',
        players: [], // Hack,
        sessionData: [],
        columns: [],
        rows: [
        ],
        options: {
          title: 'Laporan In Percent',
          hAxis: {
            title: 'Tanggal'
          },
          vAxis: {
            title: 'In Percent (%)',
            minValue: 0,
            maxValue: 100
          },
          width: 900,
          height: 500
        }
      };
    },
    computed: {
    },
    methods: {
    },
    mounted () {
      let that = this;
      let playerMap = {};
      let index = 0;
      let data = {};
      let columns = [{
        'type': 'string',
        'label': 'Tanggal'
      }];
      // Ambil players
      players.once('value').then(snapshot => {
        snapshot.forEach(snapshot => {
          let player = snapshot.val();
          player['index'] = index++;
          playerMap[snapshot.key] = player;

          // push column
          columns.push({
            'type': 'number',
            'label': player.name
          });
        });
        // Compile supaya bisa group
        sessions.once('value').then(snapshot => {
          snapshot.forEach(snapshot => {
            let session = snapshot.val();
            let _index = -1;
            if (session.player_id in playerMap) {
              session.player_name = playerMap[session.player_id].name;
              _index = playerMap[session.player_id].index;
            } else {
              _index = index++;
              playerMap[session.player_id] = {
                'name': session.player_name,
                'index': _index
              };
              that.columns.push({
                'type': 'number',
                'label': session.player_name
              });
            }
            if (session.feeder_id in playerMap) {
              session.feeder_name = playerMap[session.feeder_id].name;
            }
            if (!(session.date in data)) {
              data[session.date] = [];
            }
            data[session.date][_index] = session;
            // console.log(session);
          });
          // console.log(data);
          console.log(columns);
          for (let tanggal in data) {
            let row1 = data[tanggal];
            // console.log('tanggal' + tanggal);
            let colData = [];
            colData.push(tanggal);
            // isi dulu dengan seluruh player
            for (let _p in playerMap) {
              colData[parseInt(playerMap[_p].index) + 1] = 0;
            }
            for (let _index in row1) {
              colData[parseInt(_index) + 1] = row1[_index].in_percent;
            }
            that.rows.push(colData);
          }
          // console.log(that.columns);
          console.log(that.rows);
          // Tampilkan
          console.log(that.$refs.reportchart);
          // Kudu di set sekali jalan, ga bisa di push2 realtime begitu
          that.columns = columns;
          // that.$refs.reportchart.drawChart();
        });
      });
    }
  };
</script>