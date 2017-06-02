<template>
  <f7-page>
    <f7-navbar sliding :title="title">
      <f7-nav-right>
        <f7-link icon="icon-bars" open-panel="left"></f7-link>
      </f7-nav-right>
    </f7-navbar>
    <f7-block-title>{{ title }}</f7-block-title>
    <f7-block inner>
      Created by Frederick &copy; 2017<br />
      rickyok@gmail.com
    </f7-block>
  </f7-page>
</template>

<script>
  export default {
    name: 'About',
    data () {
      return {
        title: 'About'
      };
    }
  };
</script>
