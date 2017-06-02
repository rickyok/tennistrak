<template>
  <f7-page>
    <f7-navbar sliding :title="title">
      <f7-nav-right>
        <f7-link icon="icon-bars" open-panel="left"></f7-link>
      </f7-nav-right>
    </f7-navbar>
    <f7-block inner>
      Belum tau mau di isi apa. Menu ada di kanan atas sono
    </f7-block>
  </f7-page>
</template>

<script>
  export default {
    name: 'Home',
    data () {
      return {
        title: 'Tennistrak'
      };
    }
  };
</script>
