<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            Vuetify Todo
          </v-list-item-title>
          <v-list-item-subtitle>
            <!-- subtext -->
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list
        dense
        nav
      >
        <v-list-item
          v-for="item in items"
          :key="item.title"
          :to="item.to"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Application</v-toolbar-title>
    </v-app-bar> -->
  <!-- <v-app-bar
      app
      color="primary"
      dark
      src="https://picsum.photos/1920/1080?random"
      prominent
    > -->
      <v-app-bar
      app
      color="primary"
      dark
      src="mountains.jpg"
      prominent
    >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(19,84,122,.5), rgba(128,208,199,.8)"
        ></v-img>
      </template>

      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <!-- <v-app-bar-title class="mb-2">Vuetify Todo</v-app-bar-title> -->

      <v-spacer></v-spacer>
      


      <!-- <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn> -->

      <!-- <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn> -->

      <template v-slot:extension class="">
      <v-text-field
        v-model="title"
        outlined
        label="Add Task"
        append-icon="mdi-plus"
        class="pa-3 mb-5 "
        hide-details
        clearable
        @click:append="addTask"
        @keyup.enter="addTask"
      ></v-text-field>
      </template>
    </v-app-bar>

    <v-main>
      <div class="overflow-auto h-auto">
        <router-view></router-view>
      </div>
    </v-main>
      <!-- alert success  -->
      <v-snackbar
        app
        v-model="$store.state.todo.alertSuccess"
        :timeout="2000"
        :value="true"
        bottom
        color="success"
      >
        {{ $store.state.todo.alertTitle }}
      </v-snackbar>
      
      <!-- alert error  -->
      <v-snackbar
        app
        v-model="$store.state.todo.alertError"
        :timeout="2000"
        :value="true"
        bottom
        color="red accent-2"
      >
      <div text-center>
        {{ $store.state.todo.alertTitle }}
      </div>
      </v-snackbar>
  </v-app>
</template>

<script>
  export default {
    data: () => ({ 
      drawer: null,
      items: [
          { title: 'Todo', icon: 'mdi-format-list-checks', to:'/'},
          { title: 'About', icon: 'mdi-help-box', to:'/about'},
        ],
        title:'',
    }),
    beforeMount(){
      this.$store.dispatch('todo/getList')
    },
    methods:{
      addTask(){
        if(this.title !== ""){
          this.$store.dispatch('todo/addTask',{ title:this.title })
          this.title = ''
        }
      },
    }
    
  }
</script>