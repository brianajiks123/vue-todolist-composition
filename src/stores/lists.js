import { reactive, computed } from 'vue'
import { defineStore } from 'pinia'

export const useListStore = defineStore('list', () => {
    // State
    const list = reactive([
        {
        name: 'First',
        desc: 'First List',
        // completed: 'Not Completed',
        },
        {
        name: 'Second',
        desc: 'Second List',
        // completed: 'Completed',
        }
    ])

    // Getter
    const getList = computed(() => list)
    // Getter with Params
    const getDetail = (index) => computed(() => list[index])

    // Function Add List
    function addList(params) {
        if (params) {
            list.push(params)
        }
        // if (params !== '') {
        //     if (params.completed === true) {
        //         params.completed = 'Completed'
        //     } else {
        //         params.completed = 'Not Compeleted'
        //     }

        //     list.push(params)
        // }
    }
    // Function Remove List
    const removeList = (index) => {
        // Splice to delete instead of filter then assign to existing reactive state
        list.splice(index, 1)
    }
    // Function Edit List
    const editList = (index, data) => {
        list[index] = data
    }
    
    return { list, getList, getDetail, addList, removeList, editList }
})