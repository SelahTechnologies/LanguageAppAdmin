<template>
  <v-container
    id="regular-tables"
    fluid
    tag="section"
  >
    <v-row>
      <v-col class="text-right">
        <v-btn
          color="success"
          class="mr-0"
          @click="openQuestion(undefined, true)"
        >
          Add a new Question
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        class="d-flex"
        cols="12"
        sm="4"
      >
        <v-select
          v-model="filters.categoryModel"
          :items="categories"
          label="Category"
          solo
          @change="filter()"
          @submit="filter()"
        >
          <template
            slot="selection"
            slot-scope="data"
          >
            {{ data.item.title }} ( Unit {{ data.item.unit }} )
          </template>
          <template
            slot="item"
            slot-scope="data"
          >
            {{ data.item.title }} ( Unit {{ data.item.unit }} )
          </template>
        </v-select>
      </v-col>

      <v-col
        class="d-flex"
        cols="12"
        sm="4"
      >
        <v-text-field
          v-model="filters.level"
          label="Level"
          placeholder="Level"
          class="mb-0"
          solo
          type="Number"
          @change="filter()"
        />
      </v-col>
      <v-col
        class="d-flex"
        cols="12"
        sm="4"
      >
        <v-text-field
          v-model="filters.lesson"
          label="Lesson"
          placeholder="Lesson"
          class="mb-0"
          solo
          type="Number"
          @change="filter()"
          @submit="filter()"
        />
      </v-col>
    </v-row>

    <base-material-card
      icon="mdi-clipboard-text"
      title="Simple Table"
      class="px-5 py-3"
    >
      <v-data-table
        :headers="questionHeaders"
        :items="questions"
      >
        <template v-slot:[`item.text`]="{ item }">
          {{ item.text[Object.keys(item.text)[0]] }} ( {{ languageToTitle[Object.keys(item.text)[0]] }} )
        </template>
        <template v-slot:[`item.category`]="{ item }">
          {{ item.category.title }}
        </template>
        <template v-slot:[`item.image`]="{ item }">
          <v-img
            max-height="50"
            max-width="50"
            :src="item.image"
          />
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-btn
            text
            color="yellow"
            class="pa-0"
            @click="openQuestion(item, false)"
          >
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-btn
            text
            color="red"
            class="pa-0"
            @click="deleteQuestion(item._id)"
          >
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </base-material-card>
  </v-container>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { store } from '@/store/index'
  import ajax from '@/store/ajax'

  export default {
    name: 'Questions',

    data () {
      return {
        questionHeaders: [
          {
            sortable: false,
            text: 'Type',
            value: 'type',
          },
          {
            sortable: false,
            text: 'Text',
            value: 'text',
          },
          {
            sortable: false,
            text: 'Category',
            value: 'category',
          },
          {
            sortable: false,
            text: 'Level',
            value: 'level',
          },
          {
            sortable: false,
            text: 'Lesson',
            value: 'lesson',
          },
          {
            sortable: false,
            text: 'Image',
            value: 'image',
          },
          {
            sortable: false,
            text: 'Actions',
            value: 'actions',
            width: '5%',
          },
        ],
        filters: {
          categoryModel: null,
          level: null,
          lesson: null,
        },
      }
    },
    computed: {
      ...mapGetters(['languages']),
      ...mapGetters(['categories']),
      ...mapGetters(['questions']),
      languageToTitle () {
        const map = {}
        this.languages.forEach(language => {
          map[language._id] = language.title
        })
        return map
      },
    },
    created () {
      store.dispatch('fetchQuestions', this.filters)
      store.dispatch('fetchLanguages')
      store.dispatch('fetchCategories')
    },
    methods: {
      filter () {
        if (this.filters.categoryModel) {
          this.filters.category = this.filters.categoryModel._id
        }
        if (this.filters.level === '') {
          this.filters.level = null
        }
        if (this.filters.lesson === '') {
          this.filters.lesson = null
        }
        store.dispatch('fetchQuestions', this.filters)
      },
      openQuestion (question) {
        const isNew = question == null
        this.$router.push({ name: 'Add Question', params: { question, isNew } })
      },
      deleteQuestion (id) {
        if (confirm('Are you sure you want delete this question?')) {
          ajax.delete(`${process.env.VUE_APP_BASE_API_URL}questions/${id}`).then(
            response => {
              this.status.type = 'success'
              this.status.message = 'Successfully Added'
            },
            error => {
              console.log(error)
              this.status.type = 'error'
              this.status.message = 'Something went wrong'
            },
          )
        }
      },
    },
  }
</script>
