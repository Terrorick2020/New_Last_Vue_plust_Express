<template>
    <div class="book-body">
        <div v-if="getAbilityEdit" class="book-body__text">
            <div class="text__title">
                <div v-if="edit_title"  class="title__form-edit">
                    <textarea v-model="new_title" name="title-editor" id="title-editor" rows="1" maxlength="90" placeholder="Новый заголовок.."></textarea>
                    <button @click="commitEditTitle">Применить</button>
                </div>
                <div v-else class="title__form">
                    <h1 v-if="getTitleTargetBook">{{ getTitleTargetBook }}</h1>
                    <h1 v-else>Пусто!</h1>
                </div>
                <button v-show="!edit_title" class="title__btn edit__btn" @click="editTitle">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"/>
                    </svg>
                </button>
            </div>
            <hr>
            <div class="text__author-info">
                <div v-if="edit_author_info" class="info__book-publication-edit">
                    <h4>Публикация: <textarea v-model="new_author_info.publication" name="publication-editor" id="publication-editor" cols="30" rows="1" maxlength="30" placeholder="Публикация..."></textarea></h4>
                </div>
                <div v-else class="info__book-publication">
                    <h4>Публикация: <span>{{ getAuthorInfor.publication }}</span></h4>
                </div>
                <div v-if="edit_author_info" class="info__book-year-edit">
                    <h4>Год выпуска книги: <textarea v-model="new_author_info.year" name="year-editor" id="year-editor" cols="30" rows="1" maxlength="30" placeholder="Год выпуска..."></textarea></h4>
                </div>
                <div v-else class="info__book-year">
                    <h4>Год выпуска книги: <span>{{ getAuthorInfor.year }}</span></h4>
                </div>
                <div v-if="edit_author_info" class="info__book-author_name-edit">
                    <h4>Автор: <textarea v-model="new_author_info.author_name" name="author_name-editor" id="author_name-editor" cols="30" rows="1" maxlength="30" placeholder="Автор..."></textarea></h4>
                </div>
                <div v-else class="info__book-author_name">
                    <h4>Автор: <span>{{ getAuthorInfor.author_name }}</span></h4>
                </div>
                <button v-if="!edit_author_info" class="author-info__btn edit__btn" @click="editUserInfo">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"/>
                    </svg>
                </button>
                <button v-else @click="commitEditUserInfo" class="author-info__commit-btn">Применить</button>
            </div>
            <hr>
            <div class="text__description" :style="description_style">
                <div v-if="edit_description" class="description__form-edit">
                    <textarea v-model="new_description" name="description-editor" id="description-editor" placeholder="Новое описание книги.."></textarea>
                    <button @click="commitEditDescription">Применить</button>
                </div>
                <div v-else class="description__form">
                    <pre v-if="getDescriptionTargetBook">"{{ getDescriptionTargetBook }}"</pre>
                    <pre v-else></pre>
                </div>
                <button v-show="!edit_description" class="description__btn edit__btn" @click="editDescription">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"/>
                    </svg>
                </button>
            </div>
            <hr>
            <div class="text__bookText" :style="text_style">
                <div v-if="edit_text" class="bookText__form-edit">
                    <textarea v-model="new_text" name="text-editor" id="text-editor" placeholder="Новый текст книги.."></textarea>
                    <button @click="commitEditText">Применить</button>
                </div>
                <div v-else class="bookText__form">
                    <pre v-if="getTextTargetBook">{{ getTextTargetBook }}</pre>
                    <pre v-else>Пусто!</pre>
                </div>
                <button v-show="!edit_text" class="bookText__btn edit__btn" @click="editText">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"/>
                    </svg>
                </button>
            </div>
        </div>
        <div v-else class="book-body__text">
            <div class="text__title">
                <div class="title__form">
                    <h1 v-if="getTitleTargetBook">{{ getTitleTargetBook }}</h1>
                    <h1 v-else>Пусто!</h1>
                </div>
            </div>
            <hr>
            <div class="text__author-info">
                <div class="info__book-publication">
                    <h4>Публикация: <span>{{ getAuthorInfor.publication }}</span></h4>
                </div>
                <div class="info__book-year">
                    <h4>Год выпуска книги: <span>{{ getAuthorInfor.year }}</span></h4>
                </div>
                <div class="info__book-author_name">
                    <h4>Автор: <span>{{ getAuthorInfor.author_name }}</span></h4>
                </div>
            </div>
            <hr>
            <div class="text__description" :style="description_style">
                <div class="description__form">
                    <pre v-if="getDescriptionTargetBook">"{{ getDescriptionTargetBook }}"</pre>
                    <pre v-else>Пусто!</pre>
                </div>
            </div>
            <hr>
            <div class="text__bookText" :style="text_style">
                <div class="bookText__form">
                    <pre v-if="getTextTargetBook">{{ getTextTargetBook }}</pre>
                    <pre v-else>Пусто!</pre>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    computed: {
        getTitleTargetBook() {
            return this.$store.getters.getTitleTargetBook;
        },
        getDescriptionTargetBook() {
            return this.$store.getters.getDescriptionTargetBook;
        },
        getTextTargetBook() {
            return this.$store.getters.getTextTargetBook;
        },
        getAbilityEdit() {
            return this.$store.getters.getAbilityEdit;
        },
        getAuthorInfor() {
            return this.$store.getters.getAuthorInfor;
        }
    },
    data() {
        return {
            description_style: 'padding: 0 40px 0 0',
            text_style: 'padding: 0 40px 0 0',

            edit_title: false,
            new_title: null,

            edit_author_info: false,
            new_author_info: {
                publication: '',
                year: '',
                author_name: ''
            },

            edit_description: false,
            new_description: null,

            edit_text: false,
            new_text: null,
        }
    },
    methods: {
        editTitle() {
            this.new_title = this.getTitleTargetBook;
            this.edit_title = !this.edit_title;
            setTimeout( () => {
                document.getElementById('title-editor').focus();
            }, 200 );
        },
        commitEditTitle() {
            this.$store.dispatch( 'titleEditor', this.new_title );
            this.edit_title = !this.edit_title;
            this.new_title = null;
        },
        editUserInfo() {
            this.new_author_info = this.getAuthorInfor;
            this.edit_author_info = !this.edit_author_info;
            setTimeout( () => {
                document.getElementById('publication-editor').focus();
            }, 200 );
        },
        commitEditUserInfo() {
            this.$store.dispatch( 'authorInfoEditor', this.new_author_info );
            this.edit_author_info = !this.edit_author_info;
            this.new_author_info = {
                publication: '',
                year: '',
                author_name: ''
            }
        },
        editDescription() {
            this.description_style = '';
            this.new_description = this.getDescriptionTargetBook;
            this.edit_description = !this.edit_description;
            setTimeout( () => {
                document.getElementById('description-editor').focus();
            }, 200 );
        },
        commitEditDescription() {
            this.$store.dispatch( 'descriptionEditor', this.new_description );
            this.description_style = 'padding: 0 40px 0 0';
            this.edit_description = !this.edit_description;
            this.new_description = null;
        },
        editText() {
            this.text_style = '';
            this.new_text = this.getTextTargetBook;
            this.edit_text = !this.edit_text;
            setTimeout( () => {
                document.getElementById('text-editor').focus();
            }, 200 );
        },
        commitEditText() {
            this.$store.dispatch( 'textEditor', this.new_text );
            this.text_style = 'padding: 0 40px 0 0';
            this.edit_text = !this.edit_text;
            this.new_text = null;
        }
    }
}
</script>

<style lang="scss" scoped>
.edit__btn {
    border: 0;
    outline: 0;
    background: transparent;
    position: absolute;
    top: 0;
    right: 0;
    width: 30px;
    height: auto;
    z-index: 100;


}

textarea {
    width: 100%;
    background: transparent;
    border: none;
    outline: none;
    resize: vertical;
}

.book-body {
    margin-top: 250px;

    .book-body__text {
        border-radius: 10px;
        padding: 10px 20px 30px 20px;
        border: 2px solid black;
        background-blend-mode: multiply;
        background: rgba(255, 255, 255, 0.75);

        .text__title {
            position: relative;
            min-height: 4lvh;
            margin: 20px;

            .title__form-edit {
                padding: 10px 20px;
                display: flex;
                justify-content: space-between;

                textarea {
                    height: 30px;
                    overflow: hidden;
                    font-size: 20px;
                    resize: none;
                }

                button {
                    width: 100px;
                    height: 30px;
                    border-radius: 5px;
                    transition: all 0.4s ease;
                    background: transparent;

                    &:hover {
                        background: rgb(40, 134, 101);
                        color: white;
                        translate: 5px -3px;
                    }
                }
            }

            .title__form {

                h1 {
                    font-size: 50px;
                    text-align: center;
                    text-decoration: underline;
                    letter-spacing: 2px;
                    margin-bottom: 10px;
                }
            }
        }

        .text__author-info {
            position: relative;
            padding: 20px;

            .author-info__btn {
                right: 20px;
                top: 20px;
            }

            .author-info__commit-btn {
                position: absolute;
                top: 20px;
                right: 40px;
                padding: 5px 10px;
                border-radius: 5px;
                transition: all 0.4s ease;
                background: transparent;

                &:hover {
                    background: rgb(40, 134, 101);
                    color: white;
                    translate: 5px -3px;
                }
            }

            textarea {
                resize: none;
                margin: 10px 0 15px 0;
                overflow: hidden;
                height: 30px;
                border-bottom: 1px solid black;
            }
        }

        .text__description {
            position: relative;
            min-height: 8lvh;
            margin: 20px;

            .description__form-edit {

                textarea {
                    font-size: 16px;
                    min-height: 20lvh;
                    max-height: 30lvh;
                }

                button {
                    width: 120px;
                    height: 30px;
                    border-radius: 5px;
                    transition: all 0.4s ease;
                    background: transparent;
                    margin: 30px 0;
                    
                    &:hover {
                        background: rgb(40, 134, 101);
                        color: white;
                        translate: 5px -3px;
                    }
                }
            }

            .description__form {


                pre {
                    margin-top: 20px;
                    font-size: 23px;
                    font-weight: 600;
                    padding-bottom: 10px;
                    text-wrap: wrap;
                }
            }
        }

        .text__bookText {
            position: relative;
            min-height: 8lvh;
            margin: 20px;

            .bookText__form-edit {

                textarea {
                    width: 100%;
                    min-height: 40lvh;
                    max-height: 70lvh;
                }

                button {
                    width: 100px;
                    height: 30px;
                    border-radius: 5px;
                    transition: all 0.4s ease;
                    background: transparent;
                    margin: 20px 0;

                    &:hover {
                        background: rgb(40, 134, 101);
                        color: white;
                        translate: 5px -3px;
                    }
                }
            }

            .bookText__form {

                pre {
                    margin-top: 50px;
                    font-size: 15px;
                    text-wrap: wrap;
                    
                }
            }
        } 
    }
}
</style>