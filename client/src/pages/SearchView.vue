<template>
  <main>
    <SearchForm @submit="handleSearch"/>
    <div class="result__wrapper" v-if="results.length">
      <h3 class="result__title">Результат:</h3>
      <ul class="result__list">
        <li class="result__item" v-for="result in results" :key="result.email + result.number">
          {{ result.email }} - {{ result.number }}
        </li>
      </ul>
    </div>
  </main>
</template>

<script setup>
import SearchForm from "../components/SearchForm.vue";
import {ref} from "vue";
import axios from "axios";

// В данную переменную будут записываться данные
const results = ref([])

// Тут мы будем хранить текущий токен, в будущем он понадобится для проверки отмены запроса
let cancelTokenSource = null

const handleSearch = async (searchParams) => {
  // Проверяем существует ли токен. Если есть то отменяем запрос
  if (cancelTokenSource) {
    cancelTokenSource.cancel('Вы отправили новый запрос, предыдущий запрос был отменен!')
  }

  // Создаем новый токен отмены для текущего запроса
  cancelTokenSource = axios.CancelToken.source()

  try {
    const response = await axios.post('http://localhost:3000/search', searchParams, {
      cancelToken: cancelTokenSource.token //Передаем токен отмены в запрос
    })
    results.value = response.data
  } catch (error){
    // Делаем обработку отмены запроса
    if (axios.isCancel(error)) {
      console.log('Запрос отменен', error.message)
    } else {
      // тут мы просто проводим обработку других ошибок
      console.log(error)
    }
  }
}

</script>


<style lang="scss" scoped>
.result {
  &__title {
    font-size: 28px;
  }

  &__list {
    list-style-type: none;
    padding: 0;
  }

  &__item {
    font-size: 18px;
  }
}
</style>