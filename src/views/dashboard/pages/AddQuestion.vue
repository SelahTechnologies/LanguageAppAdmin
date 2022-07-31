<template>
  <v-container
    id="user-profile"
    fluid
    tag="section"
  >
    <v-form
      ref="form"
      v-model="valid"
    >
      <v-row justify="center">
        <v-col
          cols="12"
        >
          <base-material-card icon="mdi-ticket">
            <template v-slot:heading>
              <div class="text-h3 font-weight-light">
                General
              </div>
            </template>

            <v-container class="pt-5">
              <v-row>
                <v-col
                  class="d-flex"
                  cols="12"
                  sm="4"
                >
                  <v-select
                    v-model="question.type"
                    :items="types"
                    :rules="rules"
                    label="Type"
                    outlined
                  />
                </v-col>
                <v-col
                  class="d-flex"
                  cols="12"
                  sm="4"
                >
                  <v-select
                    v-model="question.category"
                    :rules="rules"
                    :items="categories"
                    label="Category"
                    outlined
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
                    v-model="question.level"
                    :rules="rules"
                    label="Level"
                    placeholder="Level"
                    class="mb-0"
                    outlined
                    type="Number"
                    required
                  />
                </v-col>

                <v-col
                  class="d-flex"
                  cols="12"
                  sm="4"
                >
                  <v-text-field
                    v-model="question.lesson"
                    :rules="rules"
                    label="Lesson"
                    placeholder="Lesson"
                    class="mb-0"
                    outlined
                    type="Number"
                    required
                  />
                </v-col>
                <v-col
                  class="d-flex"
                  cols="12"
                  sm="4"
                >
                  <v-file-input
                    outlined
                    small-chips
                    label="Image"
                    :rules="fileRules"
                    @change="onAddFiles"
                  />
                </v-col>
                <v-col
                  class="d-flex"
                  cols="12"
                  sm="4"
                >
                  <v-img
                    max-height="100"
                    max-width="100"
                    :src="question.image"
                  />
                </v-col>
              </v-row>
            </v-container>
          </base-material-card>

          <base-material-card
            class="mt-15 px-5"
            icon="mdi-ticket"
          >
            <template v-slot:heading>
              <div class="text-h3 font-weight-light">
                Text
              </div>
            </template>
            <v-card>
              <v-simple-table>
                <thead>
                  <tr>
                    <th class="primary--text">
                      Language
                    </th>
                    <th class="primary--text">
                      Text
                    </th>
                    <th class="primary--text">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  <tr
                    v-for="(text, language) in question.text"
                    :key="language"
                  >
                    <td>{{ languageToTitle[language] }}</td>
                    <td>{{ text }}</td>
                    <td width="30%">
                      <v-btn
                        text
                        color="yellow"
                        class="pa-0 px-0"
                        @click="editQuestionText(language, text)"
                      >
                        <v-icon>mdi-pencil</v-icon>
                      </v-btn>
                      <v-btn
                        text
                        color="red"
                        class="pa-0"
                        @click="deleteText(question, language)"
                      >
                        <v-icon>mdi-delete</v-icon>
                      </v-btn>
                    </td>
                  </tr>
                </tbody>
              </v-simple-table>
            </v-card>
            <v-form
              v-model="textFormValid"
            >
              <v-row class="mt-3">
                <v-col
                  cols="12"
                  md="5"
                >
                  <v-select
                    v-model="newQuestionText.language"
                    :items="languages"
                    item-value="_id"
                    label="Language"
                    outlined
                  >
                    <template
                      slot="selection"
                      slot-scope="data"
                    >
                      {{ data.item.title }}
                    </template>
                    <template
                      slot="item"
                      slot-scope="data"
                    >
                      {{ data.item.title }}
                    </template>
                  </v-select>
                </v-col>
                <v-col
                  cols="12"
                  md="5"
                >
                  <v-text-field
                    v-model="newQuestionText.text"
                    label="Text"
                    placeholder="Text"
                    class="mb-0"
                    outlined
                  />
                </v-col>
                <v-col
                  cols="12"
                  md="2"
                  class="text-right"
                >
                  <v-btn
                    color="success"
                    class="mr-0"
                    :disabled="!textFormValid"
                    @click="addQuestionText()"
                  >
                    Add
                  </v-btn>
                </v-col>
              </v-row>
            </v-form>
          </base-material-card>

          <base-material-card
            class="mt-15 px-5"
            icon="mdi-ticket"
          >
            <template v-slot:heading>
              <div class="text-h3 font-weight-light">
                Choices
              </div>
            </template>
            <v-row>
              <v-col class="text-right">
                <v-btn
                  color="success"
                  class="mr-0"
                  to="/pages/questions/create"
                  @click="addChoice()"
                >
                  Add a new Choice
                </v-btn>
              </v-col>
            </v-row>

            <div
              v-for="(choice, index) in question.choices"
              :key="index"
            >
              <v-card-title class="mb-0 pb-0 px-0">
                Choice {{ index + 1 }}
              </v-card-title>
              <v-row>
                <v-col
                  cols="12"
                  md="3"
                  align-self="center"
                >
                  <v-checkbox
                    v-model="choice.isAnswer"
                    label="Answer"
                    color="success"
                    :value="choice.isAnswer"
                    hide-details
                    class="mt-0"
                  />
                </v-col>
                <v-col
                  cols="12"
                  md="5"
                >
                  <v-file-input
                    v-model="choice.imageFile"
                    dense
                    outlined
                    small-chips
                    label="Image"
                  />
                </v-col>
                <v-col
                  class="d-flex"
                  cols="12"
                  sm="3"
                >
                  <v-img
                    max-height="100"
                    max-width="100"
                    :src="choice.image"
                  />
                </v-col>
              </v-row>
              <div class="text-h4 mt-5 font-weight-bold">
                Text
              </div>
              <v-card class="mt-1">
                <v-simple-table>
                  <thead>
                    <tr>
                      <th class="primary--text">
                        Language
                      </th>
                      <th class="primary--text">
                        Text
                      </th>
                      <th class="primary--text">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr
                      v-for="(text, language) in choice.text"
                      :key="language"
                    >
                      <td>{{ languageToTitle[language] }}</td>
                      <td>{{ text }}</td>
                      <td width="30%">
                        <v-btn
                          text
                          color="yellow"
                          class="pa-0 px-0"
                          @click="editChoiceQuestionText(choice, language, text)"
                        >
                          <v-icon>mdi-pencil</v-icon>
                        </v-btn>
                        <v-btn
                          text
                          color="red"
                          class="pa-0"
                          @click="deleteText(choice, language)"
                        >
                          <v-icon>mdi-delete</v-icon>
                        </v-btn>
                      </td>
                    </tr>
                  </tbody>
                </v-simple-table>
              </v-card>

              <v-row class="mt-3">
                <v-col
                  cols="12"
                  md="5"
                >
                  <v-select
                    v-model="choice.languageModel"
                    :items="languages"
                    item-value="_id"
                    label="Language"
                    outlined
                  >
                    <template
                      slot="selection"
                      slot-scope="data"
                    >
                      {{ data.item.title }}
                    </template>
                    <template
                      slot="item"
                      slot-scope="data"
                    >
                      {{ data.item.title }}
                    </template>
                  </v-select>
                </v-col>
                <v-col
                  cols="12"
                  md="5"
                >
                  <v-text-field
                    v-model="choice.textModel"
                    label="Text"
                    placeholder="Text"
                    class="mb-0"
                    outlined
                  />
                </v-col>
                <v-col
                  cols="12"
                  md="2"
                  class="text-right"
                >
                  <v-btn
                    color="success"
                    class="mr-0"
                    @click="addChoiceText(choice)"
                  >
                    Add
                  </v-btn>
                </v-col>
              </v-row>
            </div>
          </base-material-card>
          <v-alert
            v-if="status.type != null"
            dense
            :type="status.type"
          >
            {{ status.message }}
          </v-alert>
          <v-btn
            color="success"
            class="mr-0 my-7"
            block
            :disabled="!valid"
            @click="addQuestion()"
          >
            Save
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { store } from '@/store/index'
  import ajax from '@/store/ajax'

  export default {
    props: {
      question: {
        type: Object,
        default (rawProps) {
          return {
            type: null,
            category: null,
            level: null,
            lesson: null,
            text: {},
            choices: [],
            file: null,
            image: null,
          }
        },
      },
      isNew: {
        type: Boolean,
        default: true,
      },
    },
    data () {
      return {
        types: ['CHOICE', 'MATCHING'],
        newQuestionText: {
          language: null,
          text: null,
        },
        status: {
          type: null,
          message: null,
        },
        valid: false,
        textFormValid: false,
        rules: [
          v => !!v || 'This field is required',
        ],
        fileRules: [
          this.fileRule,
        ],
      }
    },
    computed: {
      ...mapGetters(['languages']),
      ...mapGetters(['categories']),
      languageToTitle () {
        const map = {}
        this.languages.forEach(language => {
          map[language._id] = language.title
        })
        return map
      },
      langs () {
        return this.question.text
      },
    },
    created () {
      store.dispatch('fetchLanguages')
      store.dispatch('fetchCategories')
    },
    methods: {
      fileRule (val) {
        if (val == null && this.question.image == null) {
          return 'This field is required'
        } else {
          return true
        }
      },
      validateText (textObj, description) {
        // eslint-disable-next-line no-unused-vars
        for (const property in textObj) {
          if (textObj[property] === null || textObj[property] === '') {
            return `There is an empty language entry (${this.languageToTitle[property]}) in the ${description}.`
          }
        }
        return true
      },
      validateAnswer () {
        let count = 0
        for (let i = 0; i < this.question.choices.length; i++) {
          if (this.question.choices[i].isAnswer) {
            count++
          }
        }

        if (this.question.choices.length > 0 && count === 0) {
          return 'Atleast one answer is required'
        } else if (this.question.type === 'CHOICE' && count > 1) {
          return 'A question of type choice can only have one answer'
        } else {
          return true
        }
      },
      addQuestionText () {
        this.question.text[this.newQuestionText.language] = this.newQuestionText.text
        this.newQuestionText.language = null
        this.newQuestionText.text = null
      },
      editQuestionText (language, text) {
        this.newQuestionText.language = language
        this.newQuestionText.text = text
      },
      deleteText (holder, language) {
        const asArray = Object.entries(holder.text)
        const filtered = asArray.filter(([key, value]) => key !== language)
        holder.text = Object.fromEntries(filtered)
      },
      addChoiceText (choice) {
        choice.text[choice.languageModel] = choice.textModel
        choice.languageModel = null
        choice.textModel = null
      },
      editChoiceQuestionText (choice, language, text) {
        choice.languageModel = language
        choice.textModel = text
      },
      onAddFiles (file) {
        this.question.file = file
      },
      async addQuestion () {
        this.status.type = null
        this.status.message = null
        for (let i = 0; i < this.question.choices.length; i++) {
          if (this.question.choices[i].imageFile) {
            await this.uploadFileToCloudinary(this.question.choices[i].imageFile).then((fileResponse) => {
              this.question.choices[i].image = fileResponse.url
            })
          }
        }
        if (this.question.file) {
          await this.uploadFileToCloudinary(this.question.file).then((fileResponse) => {
            this.question.image = fileResponse.url
          })
        }

        const textValidation = this.validateText(this.question.text, 'the question text')
        if (textValidation !== true) {
          this.status.type = 'error'
          this.status.message = textValidation
          return
        }

        for (let i = 0; i < this.question.choices.length; i++) {
          const choiceTextValidation = this.validateText(this.question.choices[i].text, `the text of choice ${i + 1}`)
          console.log(this.question.choices[i].text)
          if (choiceTextValidation !== true) {
            this.status.type = 'error'
            this.status.message = choiceTextValidation
            return
          }
        }

        const answerValidation = this.validateAnswer()
        if (answerValidation !== true) {
          this.status.type = 'error'
          this.status.message = answerValidation
          return
        }

        if (this.isNew) {
          ajax.post(`${process.env.VUE_APP_BASE_API_URL}questions`, this.question).then(
            response => {
              this.question.type = null
              this.question.category = null
              this.question.level = null
              this.question.lesson = null
              this.question.image = null
              this.status.type = 'success'
              this.status.message = 'Successfully Added'
            },
            error => {
              if (error.response.status === 400) {
                this.status.type = 'error'
                this.status.message = error.response.data.message
              } else {
                this.status.type = 'error'
                this.status.message = 'Something went wrong.'
              }
            },
          )
        } else {
          ajax.put(`${process.env.VUE_APP_BASE_API_URL}questions/${this.question._id}`, this.question).then(
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
      addChoice () {
        this.question.choices.push(
          {
            text: {},
            isAnswer: false,
            image: null,
            imageFile: null,
            languageModel: null,
            textModel: null,
          },
        )
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
            reject(err)
          }

          request.send(formData)
        })
      },
    },
  }
</script>
