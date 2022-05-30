import axios from 'axios'

// import Swal from 'sweetalert2/dist/sweetalert2.js'
// import 'sweetalert2/src/sweetalert2.scss'

const API = 'https://nikisu-laravel-vue.herokuapp.com/api/'

const state = {
    // items: []
        tasks:[],
        alertSuccess:false,
        alertError:false,
        alertTitle: '',
    }

const getters = {}

const actions = {
    addTask: (store, payload) => {
        console.log(payload)
        const item = {
            name: payload.title
        }

        axios.post(API+'item/store', {
            item
        })
        .then(res => {
            if (res.status == 201) {
                store.commit('setAlertSuccess')
                store.commit('setAlertTitle', `'${payload.title}' is saved successfully!`)
                store.dispatch('getList');
            }
        })
        .catch( error => {
            console.log( error );
        })

    },
    doneTask: (store, payload) => {
        const item = { completed: !payload.done };
        axios.put(API+'item/'+payload.id , {
            item
        })
        .then(res => {
            if (res.status == 200) {
                // console.log(res)
                store.commit('setAlertSuccess')
                store.commit('setAlertTitle', `'${payload.title}' is updated successfully!`)
                store.dispatch('getList');
            }
        })
        .catch( error => {
            console.log( error );
        })
    },
    deleteTask: (store, payload) => {
        console.log(payload)
        const title = payload.title
        axios.delete(API+'item/'+payload.id , {
            payload
        })
        .then(res => {
            if (res.status == 200) {
                // console.log(res)
                store.commit('setAlertSuccess')
                store.commit('setAlertTitle', `'${title}' is deleted successfully!`)
                store.dispatch('getList');
            }
        })
        .catch( error => {
            console.log( error );
        })
    },
    getList: store => {
        // Swal.fire({
        //     title: 'Please wait...',
        //     didOpen: () => {
        //         Swal.showLoading()
        //     },
        // })
        axios.get(API+'items')
        .then(result => {
            // Swal.close()
            // state.commit('setItems', result.data)
            // console.log( result.data.map(task => ({ id: task.id, title: task.name, done: task.completed })))
            store.commit('setTasks',result.data.map(task => ({ id: task.id, title: task.name, done: task.completed }))) 
        })
        .catch(err => {
            console.log( err )
        });
    }
}

const mutations = {
    setTasks:(store,payload) => store.tasks = payload,
    setAlertSuccess:store => store.alertSuccess = true,
    setAlertError:store => store.alertError = true,
    setAlertTitle:(store, payload) => store.alertTitle = payload,
    doneTask: (store, id) => {
        const index = store.tasks.findIndex(task => task.id === id)
        store.tasks[index].done = !store.tasks[index].done
    },
    deleteTask: (store, id) => {
        store.tasks = store.tasks.filter(task => task.id !== id)
    },
    
    addTask(store, payload){
        const task = {
                        id:Date.now(),
                        title: payload.title,
                        done: false
                    }
        store.tasks.push(task)
    },
}


export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}