<template>
  <v-container
    id="dashboard"
    fluid
    tag="section"
    class="px-5"
  >
    <v-row class="px-5">
      <v-col
        cols="12"
        sm="6"
        lg="3"
      >
        <base-material-stats-card
          color="info"
          icon="mdi-account"
          title="Users"
          :value="usersCount.toString()"
        />
      </v-col>

      <v-col
        cols="12"
        sm="6"
        lg="3"
      >
        <base-material-stats-card
          color="primary"
          icon="mdi-translate"
          title="Languages"
          :value="languagesCount.toString()"
        />
      </v-col>

      <v-col
        cols="12"
        sm="6"
        lg="3"
      >
        <base-material-stats-card
          color="pink"
          icon="mdi-ticket"
          title="Questions"
          :value="questionsCount.toString()"
        />
      </v-col>

      <v-col
        cols="12"
        sm="6"
        lg="3"
      >
        <base-material-stats-card
          color="orange"
          icon="mdi-shape"
          title="Categories"
          :value="categoriesCount.toString()"
        />
      </v-col>
      <v-col cols="12">
        <base-material-card
          color="warning"
          class="px-5 py-3"
        >
          <template v-slot:heading>
            <div class="text-h3 font-weight-light">
              Languages
            </div>
          </template>
          <v-card-text>
            <v-data-table
              :headers="headers"
              :items="languages"
            >
              <template
                v-slot:[`item.actions`]="{ item }"
                width="30%"
              >
                <v-btn
                  text
                  icon
                  color="yellow"
                  @click="onLanguageEdit(item)"
                >
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-btn
                  text
                  icon
                  color="red"
                  @click="deleteLanguage(item._id)"
                >
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </template>
            </v-data-table>
          </v-card-text>
        </base-material-card>
        <v-card class="mt-0 px-5 pt-3">
          <v-alert
            v-if="languageStatus.type != null"
            dense
            :type="languageStatus.type"
          >
            {{ languageStatus.message }}
          </v-alert>
          <v-card-subtitle class="pb-0">
            <div class="text-overline mb-0 pb-0">
              {{ isLanguageEdit ? 'Edit this Language' : 'Add a new Language' }}
            </div>
          </v-card-subtitle>
          <v-card-text class="mt-0">
            <v-row>
              <v-col
                cols="12"
                md="9"
                class="pb-0"
                align-self="center"
              >
                <v-text-field
                  v-model="newLanguage"
                  label="Language Name"
                  placeholder="Language Name"
                  class="mt-3 mb-0"
                  outlined
                />
              </v-col>
              <v-col
                cols="12"
                md="3"
                class="text-right"
                align-self="center"
              >
                <v-btn
                  color="orange"
                  class="mr-0"
                  @click="isLanguageEdit ? editLanguage() : addLanguage()"
                >
                  {{ isLanguageEdit ? 'Edit' : 'Add' }}
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12">
        <base-material-card
          color="green"
          class="px-5 py-3"
        >
          <template v-slot:heading>
            <div class="text-h3 font-weight-light">
              Categories
            </div>
          </template>
          <v-card-text>
            <v-data-table
              :headers="categoryHeaders"
              :items="categories"
              sort-by="rank"
              group-by="unit"
            >
              <template v-slot:[`group.header`]="{items, isOpen, toggle}">
                <th colspan="4">
                  <v-icon
                    @click="toggle"
                  >
                    {{ isOpen ? 'mdi-minus' : 'mdi-plus' }}
                  </v-icon>
                  Unit: {{ items[0].unit }}
                </th>
              </template>
              <template v-slot:[`item.image`]="{ item }">
                <v-img
                  max-height="50"
                  max-width="50"
                  :src="item.image"
                />
              </template>
              <template
                v-slot:[`item.actions`]="{ item }"
                width="30%"
              >
                <v-btn
                  text
                  icon
                  color="yellow"
                  @click="onCategoryEdit(item)"
                >
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-btn
                  text
                  icon
                  color="red"
                  @click="deleteCategory(item._id)"
                >
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </template>
            </v-data-table>
          </v-card-text>
        </base-material-card>
        <v-card class="mt-0 px-5 pt-3">
          <v-alert
            v-if="categoryStatus.type != null"
            dense
            :type="categoryStatus.type"
          >
            {{ categoryStatus.message }}
          </v-alert>
          <v-card-subtitle class="pb-0">
            <div class="text-overline mb-0 pb-0">
              {{ isCategoryEdit ? 'Edit this Category' : 'Add a new Category' }}
            </div>
          </v-card-subtitle>
          <v-card-text class="mt-0">
            <v-row>
              <v-col
                cols="12"
                md="3"
                class="pb-0"
              >
                <v-text-field
                  v-model="newCategory.title"
                  label="Category Name"
                  placeholder="Category Name"
                  class="mt-3 mb-0"
                  outlined
                />
              </v-col>
              <v-col
                cols="12"
                md="2"
                class="pb-0"
              >
                <v-text-field
                  v-model="newCategory.unit"
                  label="Unit"
                  placeholder="Unit"
                  class="mt-3 mb-0"
                  outlined
                  type="number"
                />
              </v-col>
              <v-col
                cols="12"
                md="2"
                class="pb-0"
              >
                <v-text-field
                  v-model="newCategory.rank"
                  label="Rank"
                  placeholder="Rank"
                  class="mt-3 mb-0"
                  outlined
                  type="number"
                />
              </v-col>
              <v-col
                cols="12"
                md="3"
                class="pb-0"
              >
                <v-file-input
                  small-chips
                  label="Image"
                  outlined
                  class="mt-3 mb-0"
                  @change="onAddFiles"
                />
              </v-col>
              <v-col
                cols="12"
                md="2"
                class="text-right"
                align-self="center"
              >
                <v-btn
                  color="success"
                  class="mr-0"
                  @click="isCategoryEdit ? editCategory() : addCategory()"
                >
                  {{ isCategoryEdit ? 'Edit' : 'Add' }}
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { store } from '@/store/index'
  import ajax from '@/store/ajax'
  export default {
    name: 'DashboardDashboard',

    data () {
      return {
        headers: [
          {
            sortable: false,
            text: 'Language',
            value: 'title',
          },
          {
            sortable: false,
            text: 'Actions',
            value: 'actions',
            width: '120px',
          },
        ],
        categoryHeaders: [
          {
            sortable: false,
            text: 'Title',
            value: 'title',
          },
          {
            sortable: false,
            text: 'Unit',
            value: 'unit',
          },
          {
            sortable: false,
            text: 'Rank',
            value: 'rank',
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
            width: '120px',
          },
        ],
        newLanguage: '',
        newCategory: {
          title: '',
          unit: '',
          rank: '',
          image: '',
          file: '',
        },
        categoryStatus: {
          type: null,
          message: null,
        },
        languageStatus: {
          type: null,
          message: null,
        },
        isLanguageEdit: false,
        languageEditModel: {},
        isCategoryEdit: false,
        categoryEditModel: {},
      }
    },
    computed: {
      ...mapGetters(['languages']),
      ...mapGetters(['categories']),
      ...mapGetters(['languagesCount']),
      ...mapGetters(['categoriesCount']),
      ...mapGetters(['usersCount']),
      ...mapGetters(['questionsCount']),
    },
    created () {
      store.dispatch('fetchLanguages')
      store.dispatch('fetchCategories')
      store.dispatch('fetchLanguagesCount')
      store.dispatch('fetchCategoriesCount')
      store.dispatch('fetchUsersCount')
      store.dispatch('fetchQuestionsCount')
    },
    methods: {
      complete (index) {
        this.list[index] = !this.list[index]
      },
      addLanguage () {
        this.languageStatus.type = null
        this.languageStatus.message = null
        if (this.newLanguage === null || this.newLanguage === '') {
          this.languageStatus.type = 'error'
          this.languageStatus.message = 'Language can not be empty.'
          return
        }
        ajax.post(`${process.env.VUE_APP_BASE_API_URL}general/languages`, { title: this.newLanguage }).then(
          response => {
            store.dispatch('fetchLanguages')
            this.newLanguage = ''
            this.languageStatus.type = 'success'
            this.languageStatus.message = 'Successfully Added'
          },
          error => {
            console.log(error.response)
            if (error.response.status === 400) {
              this.languageStatus.type = 'error'
              this.languageStatus.message = 'A language with this name already exists.'
            } else {
              this.languageStatus.type = 'error'
              this.languageStatus.message = 'Something went wrong.'
            }
          },
        )
      },
      onLanguageEdit (language) {
        this.languageStatus.type = null
        this.languageStatus.message = null
        this.isLanguageEdit = true
        this.languageEditModel = language
        this.newLanguage = language.title
      },
      editLanguage () {
        ajax.put(`${process.env.VUE_APP_BASE_API_URL}general/language/${this.languageEditModel._id}`, { title: this.newLanguage }).then(
          response => {
            store.dispatch('fetchLanguages')
            this.languageStatus.type = 'success'
            this.languageStatus.message = 'Successfully Edited'
            this.isLanguageEdit = false
            this.newLanguage = ''
          },
          error => {
            console.log(error)
            this.languageStatus.type = 'error'
            this.languageStatus.message = 'Something went wrong'
          },
        )
      },
      onAddFiles (file) {
        this.newCategory.file = file
      },
      async addCategory () {
        this.categoryStatus.type = null
        this.categoryStatus.message = null
        if (this.newCategory.title === null || this.newCategory.title === '') {
          this.categoryStatus.type = 'error'
          this.categoryStatus.message = 'Category Name can not be empty.'
          return
        }
        if (this.newCategory.unit === null || this.newCategory.unit === '') {
          this.categoryStatus.type = 'error'
          this.categoryStatus.message = 'Unit can not be empty.'
          return
        }
        if (this.newCategory.rank === null || this.newCategory.rank === '') {
          this.categoryStatus.type = 'error'
          this.categoryStatus.message = 'Rank can not be empty.'
          return
        }
        if (this.newCategory.file === null || this.newCategory.file === '') {
          this.categoryStatus.type = 'error'
          this.categoryStatus.message = 'Image can not be empty.'
          return
        }
        await this.uploadFileToCloudinary(this.newCategory.file).then((fileResponse) => {
          this.newCategory.image = fileResponse.url
        })
        console.log(this.newCategory.image)
        ajax.post(`${process.env.VUE_APP_BASE_API_URL}general/categories`, this.newCategory).then(
          response => {
            store.dispatch('fetchCategories')
            this.newCategory.title = ''
            this.newCategory.unit = ''
            this.newCategory.rank = ''
            this.categoryStatus.type = 'success'
            this.categoryStatus.message = 'Successfully Added'
          },
          error => {
            console.log(error)
            if (error.response.status === 400) {
              this.categoryStatus.type = 'error'
              this.categoryStatus.message = error.response.data.message
            } else {
              this.categoryStatus.type = 'error'
              this.categoryStatus.message = 'Something went wrong'
            }
          },
        )
      },
      onCategoryEdit (category) {
        this.categoryStatus.type = null
        this.categoryStatus.message = null
        this.isCategoryEdit = true
        this.categoryEditModel = category
        this.newCategory = {
          title: category.title,
          unit: category.unit,
          rank: category.rank,
          image: category.image,
        }
      },
      editCategory () {
        ajax.put(`${process.env.VUE_APP_BASE_API_URL}general/category/${this.categoryEditModel._id}`, this.newCategory).then(
          response => {
            store.dispatch('fetchCategories')
            this.categoryStatus.type = 'success'
            this.categoryStatus.message = 'Successfully Edited'
            this.isCategoryEdit = false
            this.newCategory = {
              title: '',
              unit: '',
              rank: '',
              image: '',
              file: '',
            }
          },
          error => {
            console.log(error)
            this.categoryStatus.type = 'error'
            this.categoryStatus.message = 'Something went wrong'
          },
        )
      },
      deleteLanguage (id) {
        if (confirm('Are you sure you want delete this language, remove the entry from questions and remove related user history?')) {
          ajax.delete(`${process.env.VUE_APP_BASE_API_URL}general/language/${id}`).then(
            response => {
              store.dispatch('fetchLanguages')
              this.languageStatus.type = 'success'
              this.languageStatus.message = 'Successfully Deleted'
            },
            error => {
              console.log(error)
              this.languageStatus.type = 'error'
              this.languageStatus.message = 'Something went wrong'
            },
          )
        }
      },
      deleteCategory (id) {
        if (confirm('Are you sure you want delete this category and all related questions and user history?')) {
          ajax.delete(`${process.env.VUE_APP_BASE_API_URL}general/category/${id}`).then(
            response => {
              store.dispatch('fetchCategories')
              this.categoryStatus.type = 'success'
              this.categoryStatus.message = 'Successfully Deleted'
            },
            error => {
              console.log(error)
              this.categoryStatus.type = 'error'
              this.categoryStatus.message = 'Something went wrong'
            },
          )
        }
      },
      uploadFileToCloudinary (file) {
        return new Promise(function (resolve, reject) {
          const formData = new FormData()
          formData.append('upload_preset', process.env.VUE_APP_CLOUDINARY_UPLOAD_PRESET)
          formData.append('folder', 'LanguageApp')
          formData.append('file', file)

          const request = new XMLHttpRequest()
          request.open('POST', process.env.VUE_APP_CLOUDINARY_URL, true)
          request.setRequestHeader('X-Requested-With', 'XMLHttpRequest')

          request.onreadystatechange = () => {
            if (request.readyState === 4 && request.status === 200) {
              const response = JSON.parse(request.responseText)
              resolve(response)
            }

            if (request.status !== 200) {
              // const response = JSON.parse(request.responseText)
              const error = request.responseText
              alert('error, status code not 200 ' + error)
              console.log('error, status code not 200 ' + error)
              console.log(error)
              reject(error)
            }
          }

          request.onerror = (err) => {
            alert('error: ' + err)
            // console.log(err.message)
            reject(err)
          }

          request.send(formData)
        })
      },
    },
  }
</script>
