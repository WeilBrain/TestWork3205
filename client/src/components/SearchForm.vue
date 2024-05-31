<template>
 <div class="search__wrapper">
   <form @submit.prevent="onSubmit">
     <div class="search__email">
       <label class="search__name" for="email">Email:</label>
       <input class="search__input" v-model="email" type="email" required>
     </div>
     <div class="search__number">
       <label class="search__name" for="number">Number:</label>
       <input class="search__input" v-model="number" v-maska data-maska="##-##-##" id="number" type="text">
     </div>
     <button class="search__button" type="submit">Поиск</button>
   </form>
 </div>
</template>

<script setup>
import {ref} from "vue";
import { vMaska } from "maska"

const email = ref('')
const number = ref('')

const emit = defineEmits(['submit'])

const onSubmit = () => {
  // тут мы ловим нажатие на кнопку, после чего отправляем запрос из страницы (pages/SearchView.vue)
  emit('submit', {email: email.value, number: number.value.replace(/-/g, '')})
}
</script>

<style lang="scss" scoped>
.search {
  &__email, &__number {
    display: flex;
    flex-direction: column;
    padding-bottom: 20px;
  }

  &__name {
    padding-bottom: 10px;
    font-size: 24px;
  }

  &__input {
    padding: 10px;
  }

  &__button {
    padding: 10px 20px;
  }
}
</style>