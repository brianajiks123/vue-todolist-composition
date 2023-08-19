<script setup>
    import { ref } from 'vue'
    import { useListStore } from '@store/lists'
    // Import Component
    import BaseInput from '@comp/BaseInput.vue';

    // Store Container
    const store = useListStore();
    // Default Input
    const defaultInput = {
        name: '',
        desc: '',
        completed: false,
    }
    // Ref Input with Spread Syntax
    const input = ref({ ...defaultInput })
    const editing = ref(false)
    // Function Reset Form
    const resetForm = () => {
        Object.assign(input.value, defaultInput)
        editing.value = false
    }
    // Function Submit Form
    function onSubmit() {
        // event.preventDefault();
        const data = { ...input.value }
        if (editing.value === false) {
            // Store List
            store.addList(data)
        } else {
            store.editList(editing.value, data)
        }
        // Reset Form
        resetForm()
    }
    // Function Get Detail
    function detailList(index) {
        const detail = store.getDetail(index)
        input.value = { ...detail.value }
        editing.value = index
    }
    // Function Toggle Complete
    function toggleComplete(index) {
        const detail = store.getDetail(index)
        store.editList(index, {
            ...detail.value,
            completed: !detail.value.completed
        })
    }
</script>

<template>
    <div class="container">
        <h1>To do List {{ $route.params?.id }}</h1>
        <!-- add v-model to integrate data binding with ref -->
        <!-- method handler with addList function -->
        <!-- event modifier .enter .prevent -->
        <form class="form" @submit.prevent="onSubmit" @reset="resetForm">
            <BaseInput class="input" v-model="input.name" name="name" placeholder="task name" required />
            <br>
            <BaseInput class="input" v-model="input.desc" type="text" name="description" placeholder="task description"/>
            <br>
            <input class="check" v-model="input.completed" type="checkbox" name="completed"> Completed
            <br />
            <button type="reset">Cancel</button> <button type="submit">{{ editing !== false ? 'Save' : 'Submit' }}</button>
        </form>
        <br />
        <h1>Tasks</h1>
        <ol class="list">
            <!-- (item, index) -->
            <template v-for="(item, index) in store.getList" :key="index">
                <!-- null chaining (?.), nullish coalescing (??); ternary operator; not operator -->
                <li :class="{ strike: item?.completed }" @dblclick="toggleComplete(index)">
                    {{ item?.name }} -
                    {{ !!item?.desc ? item.desc : 'description?' }}
                    <button class="orange" @click="detailList(index)" :disabled="editing !== false">&#9998;</button>
                    <button class="red" @click="store.removeList(index)" :disabled="editing !== false">&times;</button>
                    <!-- <button class="remove" @click="() => store.removeList(index)" :style="{ backgroundColor: item.completed !== 'Completed' ? 'red' : 'green' }">{{ item.completed === 'Not Completed' ? '&#10006;' : '&#10004;' }}</button>
                    {{ item.name }} - {{ item.desc }} - {{ item.completed }}
                    {{ item.name }} - {{ item.desc }} ({{ !!item?.completed ? item.completed: 'Not Completed.' }}) -->
                </li>
            </template>
        </ol>
        <!-- <br />
        <span>&#10006; : Not Completed</span>
        <br>
        <span>&#10004; : Completed</span> -->
    </div>
</template>

<!-- Scoped untuk melimitasi hanya di komponen -->
<!-- Menggunakan SASS -> npm i sass -->
<style scoped lang="scss">
    form {
        margin: 1rem;
    }
    .check {
        margin-bottom: 1rem;
    }
    .submit {
        width: 50%;
        font-size: 1rem;
        background-color: green;
        color: aliceblue;
    }
    .list {
        padding-block: 1rem;

        & > .underline {
            font-weight: 200;
        }

        & > li {
            padding: 5px;
        }

        & > .strike {
            text-decoration: line-through;
        }
    }
    .red {
        background-color: red;
        color: azure;
        height: 1.5rem;
    }
    .orange {
        background-color: orange;
        color: azure;
        margin-right: 5px;
    }
    // span {
    //     font-size: xx-small;
    // }
</style>