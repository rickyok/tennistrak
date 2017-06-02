<template>
  <f7-page>
    <f7-navbar sliding :title="title" back-link="Back">
      <f7-nav-right>
        <f7-link icon="icon-bars" open-panel="left"></f7-link>
      </f7-nav-right>
    </f7-navbar>
    <f7-block>
    <f7-buttons>
      <f7-button big raised @click="addGood()">GOOD</f7-button>
      <f7-button big raised @click="addIn()">IN</f7-button>
      <f7-button big raised @click="addOut()">OUT</f7-button>
    </f7-buttons>
    </f7-block>
    <f7-list form>
      <f7-list-item>
        <f7-label>ID</f7-label>
        <f7-input type="text" placeholder="ID" v-model="sessionData['.key']" readonly />
      </f7-list-item>
      <f7-list-item>
        <f7-label>Good</f7-label>
        <f7-input type="text" placeholder="Good" v-model="sessionData.good" />
      </f7-list-item>
      <f7-list-item>
        <f7-label>In</f7-label>
        <f7-input type="text" placeholder="In" v-model="sessionData.in" />
      </f7-list-item>
      <f7-list-item>
        <f7-label>Out</f7-label>
        <f7-input type="text" placeholder="Out" v-model="sessionData.out" />
      </f7-list-item>
      <f7-list-item smart-select smart-select-back-on-select title="Player">
        <select v-model="sessionData.player_id">
          <option v-for="p in players" :value="p['.key']">{{ p.name }}</option>
        </select>
      </f7-list-item>
      <f7-list-item smart-select smart-select-back-on-select title="Feeder">
        <select v-model="sessionData.feeder_id">
          <option v-for="p in players" :value="p['.key']">{{ p.name }}</option>
        </select>
      </f7-list-item>
      <f7-list-item smart-select smart-select-back-on-select title="Track Type">
        <select v-model="sessionData.type">
          <option value="spin">Spin</option>
          <option value="control">Control</option>
        </select>
      </f7-list-item>
      <f7-list-item title="Stroke">{{ stroke }}</f7-list-item>
      <f7-list-item title="In %">{{ in_percent }}</f7-list-item>
      <f7-list-item title="Good %">{{ good_percent }}</f7-list-item>
      <f7-list-item title="Photo">
        <div v-if="uploadingImage">
          Uploading Image
          <f7-preloader></f7-preloader>
        </div>
        <div v-if="!uploadingImage">
          <img :src="sessionData.photo" />
        </div>
        <f7-buttons>
          <f7-button raised @click="takePic(1)">Camera</f7-button>
          <f7-button raised @click="takePic(2)">Albums</f7-button>
        </f7-buttons>
      </f7-list-item>
    </f7-list>
    <f7-buttons>
      <f7-button raised back color="red">Cancel</f7-button>
      <f7-button raised @click="deleteSession(sessionData)" color="red">Delete</f7-button>
      <f7-button raised @click="saveData(sessionData)">Save</f7-button>
    </f7-buttons>
  </f7-page>
</template>

<script>
  import firebase from '../lib/firebase.js';
  let db = firebase.database();
  import mysqlDate from '../lib/MysqlDate.js';
  import uuid4 from 'uuid/v4';

  let sessions = db.ref('session');
  let players = db.ref('person');
  let storage = firebase.storage().ref('images');

  export default {
    name: 'SessionEdit',
    data () {
      return {
        title: 'Session Edit',
        players: [], // Hack,
        uploadingImage: false,
        sessionData: {}
      };
    },
    computed: {
      stroke () {
        return parseInt(this.sessionData.in) + parseInt(this.sessionData.out) + parseInt(this.sessionData.good);
      },
      in_percent () {
        return parseFloat(parseInt(this.sessionData.in) + parseInt(this.sessionData.good)) / parseFloat(this.stroke) * 100;
      },
      good_percent () {
        return parseFloat(this.sessionData.good) / parseFloat(this.stroke) * 100;
      }
    },
    methods: {
      takePic (sourceType) {
        sourceType = sourceType || navigator.camera.PictureSourceType.CAMERA;

        let that = this;

        navigator.camera.getPicture(function (imageData) {
          // upload to firebase
          let id = uuid4();
          let fileName = id + '.jpg';
          let firebaseImage = storage.child(fileName);
          that.uploadingImage = true;
          firebaseImage.putString(imageData, 'base64').then((snapshot) => {
            that.uploadingImage = false;
            console.log('Berhasil ambil gambar');
            let downloadURL = snapshot.downloadURL;
            that.sessionData.photo = downloadURL;
          });
        }, (message) => {
          alert('Tidak berhasil ambil gambar');
        }, {
          quality: 75,
          destinationType: navigator.camera.DestinationType.DATA_URL,
          encodingType: navigator.camera.EncodingType.JPEG,
          targetWidth: 200,
          targetHeight: 200,
          sourceType: sourceType,
          allowEdit: false,
          saveToPhotoAlbum: false,
          correctOrientation: true,
          cameraDirection: navigator.camera.Direction.BACK
        });
      },
      addIn () {
        this.sessionData.in = parseInt(this.sessionData.in) + 1;
      },
      addGood () {
        this.sessionData.good = parseInt(this.sessionData.good) + 1;
      },
      addOut () {
        this.sessionData.out = parseInt(this.sessionData.out) + 1;
      },
      saveData (data) {
        let item = {...data};
        for (var i = 0; i < this.players.length; i++) {
          if (item.player_id === this.players[i]['.key']) {
            item.player_name = this.players[i].name;
          }
          if (item.feeder_id === this.players[i]['.key']) {
            item.feeder_name = this.players[i].name;
          }
        }
        // Set tanggal
        item.date = mysqlDate.getDate();
        item.stroke = this.stroke;
        item.in_percent = this.in_percent;
        item.good_percent = this.good_percent;
        delete item['.key'];
        sessions.child(data['.key']).set(item);
        this.$router.back();
      },
      deleteSession (session) {
        if (confirm('Are you sure?')) {
          sessions.child(session['.key']).remove();
          this.$router.back();
        }
      }
    },
    firebase () {
      return {
        sessionData: {
          source: sessions.child(this.$route.params.id),
          asObject: true
        },
        players: {
          source: players,
          asArray: true
        }
      };
    }
  };
</script>