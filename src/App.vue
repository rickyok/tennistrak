<template>
  <!-- App -->
  <div id="app">

    <!-- Statusbar -->
    <f7-statusbar />

    <f7-panel left layout="light">
      <f7-navbar title="Menu"></f7-navbar>
      <f7-list>
        <f7-list-button href="/person/" close-panel>Personel</f7-list-button>
        <f7-list-button href="/session/" close-panel>Session</f7-list-button>
        <f7-list-button href="/report/" close-panel>Report</f7-list-button>
        <f7-list-button href="/about/" close-panel>About</f7-list-button>
        <f7-list-button href="/" close-panel>Home</f7-list-button>
      </f7-list>

    </f7-panel>


    <!-- Main Views -->
    <f7-views>
      <f7-view id="main-view" url="/" :init="true" :dynamic-navbar="true" navbar-through main>
        <!-- Pages -->
        <f7-pages />
      </f7-view>
    </f7-views>
  </div>
</template>

<script>
  export default {
    name: 'App',
    computed: {
      isiOS () {
        return window.isiOS;
      }
    }
  };
</script>
