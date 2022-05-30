<template>
  <div class="home">
  <v-card
      class="mx-auto"
    >
      <v-card-text>
        <div v-if="$store.state.todo.tasks.length > 0">
          <v-list
            class="pt-0"
            flat
          >
          <div
              v-for="task in $store.state.todo.tasks"
              :key="task.id"
              class="h-100 overflow-auto"
          >
            <v-list-item
              @click="doneTask(task)"
              :class="{'blue lighten-5' : task.done}"
            >
              <template v-slot:default>
                <v-list-item-action>
                  <v-checkbox :input-value="task.done"></v-checkbox>
                </v-list-item-action>

                <v-list-item-content>
                  <v-list-item-title
                    :class="{'text-decoration-line-through' : task.done}"
                  >
                    {{ task.title }}
                  </v-list-item-title>
                </v-list-item-content>
                <v-list-item-action>
                  <v-btn icon
                    @click.stop="deleteTask(task)"
                  >
                    <v-icon color="primary">mdi-delete</v-icon>
                  </v-btn>
              </v-list-item-action>
              </template>
            </v-list-item>
            <v-divider></v-divider>
          </div>
          </v-list>
        </div>
        <div v-else class="d-flex justify-center align-row overflow-hidden">
          <div>
            <v-icon size="200px">mdi-check</v-icon>
            <h1 class="text-center">No tasks</h1>
          </div>
        </div>
      </v-card-text>
  </v-card>
    </div>
</template>

<script>

export default {
  name: 'Todo',
  data(){
    return{
      
    }
  },
  methods:{
    doneTask(task){
     this.$store.dispatch('todo/doneTask',task)
    },
    deleteTask(task){
      this.$store.dispatch('todo/deleteTask',task)
    },
    // addTask(){
    //   this.tasks.push({
    //       id:this.tasks[this.tasks.length - 1].id + 1,
    //       title: this.newTaskName,
    //       done: false
    //   })
    //   this.newTaskName = ''
    // },
    // doneTask(id){
    //   let task = this.tasks.filter(f => f.id === id)[0]
    //   task.done = !task.done
    //   console.log(id)
    // },
    // deleteTask(id){
    //   this.tasks = this.tasks.filter(f => f.id !== id)
    // },
  },
}
</script>
