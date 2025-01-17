import axios from 'axios';


export default {
    actions: {
        bookToFavorite( context, id ) {
            context.commit( 'changeFavMarker', id );
        },
        async loadBooks( context ) {
            try {
                const response = await axios.get( 'http://localhost:3000/books', {
                    responseType: 'json'
                } );

                if( response.status === 200 && response.data.result === 'success' ) {
                    context.commit( 'getBookList', response.data.data );
                }
            } catch ( error ) {
                console.error( `Возникла ошибка при получении списка книг` );
                console.info( error );
            }
        },
        async getFullBook(context, book_id) {
            try {
                const response = await axios.get( `http://localhost:3000/books/${book_id}`, {
                    responseType: 'json'
                } );

                if( response.status === 200 && response.data ) {
                    context.commit( 'getTargetBook', response.data.book_text )
                }
            } catch ( error ) {
                console.error( `Возникла ошибка при загрузкетекста книги!` );
                console.info( error );
            }
        },
        titleEditor( context, new_title ) {
            try {
                const response = axios.put( `http://localhost:3000/books/${context.getters.getIdTargetBook}`,{
                    "title": String( new_title )
                });
                if( response.status === 200 ) {
                    context.commit( 'editTitle', new_title );
                }
                // context.commit( 'editTitle', new_title );

            } catch ( error ) {
                console.error( `Возникла ошибка при изменении заглавия книги` );
                console.log( error );
            }
        },
        authorInfoEditor( context, new_author_info ) {
            try {
                const response = axios.put( `http://localhost:3000/books/${context.getters.getIdTargetBook}`, new_author_info );
                if( response.status === 200 ) {
                    context.commit( 'editInfo', new_author_info );
                }
                // context.commit( 'editInfo', new_author_info );

            } catch ( error ) {
                console.error( `Возникла ошибка при изменении информации об авторе книги` );
                console.log( error );
            }
        },
        descriptionEditor( context, new_description ) {
            try {
                const response = axios.put( `http://localhost:3000/books/${context.getters.getIdTargetBook}`,{
                    "description": String( new_description )
                });
                if( response.status === 200 ) {
                    context.commit( 'editDescription', new_description );
                }
                // context.commit( 'editDescription', new_description );

            } catch ( error ) {
                console.error( `Возникла ошибка при изменении описания книги` );
                console.log( error );
            }
        },
        textEditor( context, new_text ) {
            try {
                context.commit( 'editText', new_text );

            } catch ( error ) {
                console.error( `Возникла ошибка при изменении текста книги` );
                console.log( error );
            }
        },
        addBookInList( context ) {
            try {
                const response = axios.post( `http://localhost:3000/books/${context.getters.getIdTargetBook}`,{
                    "title": "",
                    "publication": 3,
                    "year": 1987,
                    "author_name": "А. Плющев",
                    "description": "",
                    "user_id": context.getters.getUserId
                });
                if( response.status === 200 ) {
                    context.commit( 'addBook' );
                }
                // context.commit( 'addBook' );

            } catch ( error ) {
                console.error( `Возникла ошибка при создании новой книги` );
                console.log( error );
            }
        },
        deleteBook( context, book_id ) {
            try {
                const response = axios.delete( `http://localhost:3000/books/${book_id}` );
                if( response.status === 200 ) {
                    context.commit( 'delBook', book_id );
                }
                // context.commit( 'delBook', book_id );
            } catch ( error ) {
                console.error( `Возникла ошибка при удалении книги` );
                console.log( error );
            }
        },
        exitInSys( context ) {
            context.commit( 'delData' );
        }
    },
    mutations: {
        changeFavMarker( state, id ) {
            state.book_list = state.book_list.map( book => book.id === id ? { ...book, is_favorite: !book.is_favorite } : book );
        },
        getBookList( state, paload ) {
            state.book_list = paload.map( elem => ({ ...elem, is_favorite: false }) );
        },
        getTargetBook( state, paload ) {
            state.target_book = paload;
        },
        delData( state ) {
            state.book_list = [];
            target_book = {};
        },
        editTitle( state, new_title ) {
            state.target_book.title = new_title;
        },
        editInfo( state, new_author_info ) {
            state.target_book.publication = new_author_info.publication;
            state.target_book.year = new_author_info.year;
            state.target_book.author_name = new_author_info.author_name;
        },
        editDescription( state, new_description ) {
            state.target_book.description = new_description;
        },
        editText( state, new_text ) {
            state.target_book.text = new_text;
        },
        addBook( state ) {
            const sorted_array = state.book_list.sort((a, b) => a.id - b.id);
            const last_array_index = sorted_array.length -1;
            const new_id = sorted_array[ last_array_index ].id + 1;
            state.book_list.push( 
                {
                    id: new_id,
                    is_favorite: false,
                    title: '',
                    author_name: '',
                    description: ''
                }
            );
            state.target_book = {
                id: new_id,
                title: '',
                description: '',
                text: ''
            }
        },
        delBook( state, book_id ) {
            state.book_list = state.book_list.filter(elem => elem.id !== book_id)
        }
    },
    state: {
        book_list: [
            {
                id: 0,
                is_favorite: true,
                title: `Сети для самых маленьких`,
                publication: 3,
                year: 1987,
                author_name: "А. Смурф",
                description: `"Сети для самых маленьких" – это увлекательное введение в мир интернет-технологий, написанное специально для детей. Книга объясняет основы работы веб-сайтов, электронной почты, социальных сетей и многое другое в понятной и интересной форме. Читатели познакомятся с основными терминами и принципами, которые помогут им понять, как работают компьютеры и интернет.`,
            },
            {
                id: 1,
                is_favorite: false,
                title: `Гнев человеческий`,
                publication: 3,
                year: 1987,
                author_name: "А. Смурф",
                description: `"Сети для самых маленьких" – это увлекательное введение в мир интернет-технологий, написанное специально для детей. Книга объясняет основы работы веб-сайтов, электронной почты, социальных сетей и многое другое в понятной и интересной форме. Читатели познакомятся с основными терминами и принципами, которые помогут им понять, как работают компьютеры и интернет.`,
            },
            {
                id: 2,
                is_favorite: true,
                title: `Сети для самых маленьких`,
                publication: 3,
                year: 1987,
                author_name: "А. Смурф",
                description: `"Сети для самых маленьких" – это увлекательное введение в мир интернет-технологий, написанное специально для детей. Книга объясняет основы работы веб-сайтов, электронной почты, социальных сетей и многое другое в понятной и интересной форме. Читатели познакомятся с основными терминами и принципами, которые помогут им понять, как работают компьютеры и интернет.`,
            },
            {
                id: 3,
                is_favorite: false,
                title: `Сети для самых маленьких`,
                publication: 3,
                year: 1987,
                author_name: "А. Смурф",
                description: `"Сети для самых маленьких" – это увлекательное введение в мир интернет-технологий, написанное специально для детей. Книга объясняет основы работы веб-сайтов, электронной почты, социальных сетей и многое другое в понятной и интересной форме. Читатели познакомятся с основными терминами и принципами, которые помогут им понять, как работают компьютеры и интернет.`,
            },
            {
                id: 4,
                is_favorite: true,
                title: `Сети для самых маленьких`,
                publication: 3,
                year: 1987,
                author_name: "А. Смурф",
                description: `"Сети для самых маленьких" – это увлекательное введение в мир интернет-технологий, написанное специально для детей. Книга объясняет основы работы веб-сайтов, электронной почты, социальных сетей и многое другое в понятной и интересной форме. Читатели познакомятся с основными терминами и принципами, которые помогут им понять, как работают компьютеры и интернет.`,
            },
            {
                id: 5,
                is_favorite: false,
                title: `Сети для самых маленьких`,
                publication: 3,
                year: 1987,
                author_name: "А. Смурф",
                description: `"Сети для самых маленьких" – это увлекательное введение в мир интернет-технологий, написанное специально для детей. Книга объясняет основы работы веб-сайтов, электронной почты, социальных сетей и многое другое в понятной и интересной форме. Читатели познакомятся с основными терминами и принципами, которые помогут им понять, как работают компьютеры и интернет.`,
            },
            {
                id: 6,
                is_favorite: false,
                title: `Сети для самых маленьких`,
                publication: 3,
                year: 1987,
                author_name: "А. Смурф",
                description: `"Сети для самых маленьких" – это увлекательное введение в мир интернет-технологий, написанное специально для детей. Книга объясняет основы работы веб-сайтов, электронной почты, социальных сетей и многое другое в понятной и интересной форме. Читатели познакомятся с основными терминами и принципами, которые помогут им понять, как работают компьютеры и интернет.`,
            }
        ],
        target_book: {
            id: 2,
            title: `Война и мир`,
            publication: 3,
            year: 1987,
            author_name: "А. Смурф",
            description: `Война — это вооруженный конфликт между двумя или более группами людей, обычно государствами, с целью достижения политических, экономических или идеологических целей. Войны могут происходить на различных уровнях — от межличностных стычек до глобальных войн, охватывающих множество стран и народов. Они приводят к большим человеческим потерям, разрушению инфраструктуры и долгосрочным последствиям для обществ и окружающей среды.
Мир — это состояние мира, гармонии и согласия между людьми и нациями. Мир подразумевает отсутствие военных действий, конфликтов и напряженности. Цель многих международных организаций и инициатив, таких как Организация Объединенных Наций (ООН), состоит в поддержании мира и предотвращении войн. Мир также связан с развитием международного сотрудничества, взаимопонимания и уважения прав человека.`,
            text: `Лев Толстой
ВОЙНА И МИР
ТОМ ПЕРВЫЙ
ЧАСТЬ ПЕРВАЯ
I
— Eh bien, mon prince. Gênes et Lucques ne sont plus que des apanages, des поместья, de la famille Buonaparte. Non, je vous préviens que si vous ne me dites pas que nous avons la guerre, si vous vous permettez encore de pallier toutes les infamies, toutes les atrocités de cet Antichrist (ma parole, j'y crois) — je ne vous connais plus, vous n'êtes plus mon ami, vous n'êtes plus мой верный раб, comme vous dites 1. Ну, здравствуйте, здравствуйте. Je vois que je vous fais peur 2, садитесь и рассказывайте.
Так говорила в июле 1805 года известная Анна Павловна Шерер, фрейлина и приближенная императрицы Марии Феодоровны, встречая важного и чиновного князя Василия, первого приехавшего на ее вечер. Анна Павловна кашляла несколько дней, у нее был грипп, как она говорила (грипп был тогда новое слово, употреблявшееся только редкими). В записочках, разосланных утром с красным лакеем, было написано без различия во всех:
«Si vous n'avez rien de mieux à faire, Monsieur le comte (или mon prince), et si la perspective de passer la soirée chez une pauvre malade ne vous effraye pas trop, je serai charmée de vous voir chez moi entre 7 et 10 heures. Annette Scherer» 3.
— Dieu, quelle virulente sortie! 4 — отвечал, нисколько не смутясь такою встречей, вошедший князь, в придворном, шитом мундире, в чулках, башмаках и звездах, с светлым выражением плоского лица.
Он говорил на том изысканном французском языке, на котором не только говорили, но и думали наши деды, и с теми, тихими, покровительственными интонациями, которые свойственны состаревшемуся в свете и при дворе значительному человеку. Он подошел к Анне Павловне, поцеловал ее руку, подставив ей свою надушенную и сияющую лысину, и покойно уселся на диване.
— Avant tout dites-moi, comment vous allez, chère amie? 5 Успокойте меня, — сказал он, не изменяя голоса и тоном, в котором из-за приличия и участия просвечивало равнодушие и даже насмешка.
— Как можно быть здоровой... когда нравственно страдаешь? Разве можно, имея чувство, оставаться спокойною в наше время? — сказала Анна Павловна. — Вы весь вечер у меня, надеюсь?
— А праздник английского посланника? Нынче середа. Мне надо показаться там, — сказал князь. — Дочь заедет за мной и повезет меня.
— Я думала, что нынешний праздник отменен, Je vous avoue que toutes ces fêtes et tous ces feux d'artifice commencent à devenir insipides 6.
— Ежели бы знали, что вы этого хотите, праздник бы отменили, — сказал князь по привычке, как заведенные часы, говоря вещи, которым он и не хотел, чтобы верили.
— Ne me tourmentez pas. Eh bien, qu'a-t-on décidé par rapport à la dépêche de Novosilzoff? Vous savez tout 7.
— Как вам сказать? — сказал князь холодным, скучающим тоном. — Qu'a-t-on décidé? On a décidé que Buonaparte a brûlé ses vaisseaux, et je crois que nous sommes en train de brûler les nôtres 8.
Князь Василий говорил всегда лениво, как актер говорит роль старой пиесы. Анна Павловна Шерер, напротив, несмотря на свои сорок лет, была преисполнена оживления и порывов.
Быть энтузиасткой сделалось ее общественным положением, и иногда, когда ей даже того не хотелось, она, чтобы не обмануть ожиданий людей, знавших ее, делалась энтузиасткой. Сдержанная улыбка, игравшая постоянно на лице Анны Павловны, хотя и не шла к ее отжившим чертам, выражала, как у избалованных детей, постоянное сознание своего милого недостатка, от которого она не хочет, не может и не находит нужным исправляться.
В середине разговора про политические действия Анна Павловна разгорячилась.
— Ах, не говорите мне про Австрию! Я ничего не понимаю, может быть, но Австрия никогда не хотела и не хочет войны. Она предает нас. Россия одна должна быть спасительницей Европы. Наш благодетель знает свое высокое призвание и будет верен ему. Вот одно, во что я верю. Нашему доброму и чудному государю предстоит величайшая роль в мире, и он так добродетелен и хорош, что Бог не оставит его, и он исполнит свое призвание задавить гидру революции, которая теперь еще ужаснее в лице этого убийцы и злодея. Мы одни должны искупить кровь праведника. На кого нам надеяться, я вас спрашиваю?.. Англия с своим коммерческим духом не поймет и не может понять всю высоту души императора Александра. Она отказалась очистить Мальту. Она хочет видеть, ищет заднюю мысль наших действий. Что они сказали Новосильцеву? Ничего. Они не поняли, они не могли понять самоотвержения нашего императора, который ничего не хочет для себя и все хочет для блага мира. И что они обещали? Ничего. И что обещали, и того не будет! Пруссия уже объявила, что Бонапарте непобедим и что вся Европа ничего не может против него... И я не верю ни в одном слове ни Гарденбергу, ни Гаугвицу. Cette fameuse neutralité prussienne, ce n'est qu'un piège 9. Я верю в одного Бога и в высокую судьбу нашего милого императора. Он спасет Европу!.. — Она вдруг остановилась с улыбкой насмешки над своею горячностью.
— Я думаю, — сказал князь, улыбаясь, — что, ежели бы вас послали вместо нашего милого Винценгероде, вы бы взяли приступом согласие прусского короля. Вы так красноречивы. Вы дадите мне чаю?
— Сейчас. A propos, — прибавила она, опять успокоиваясь, — нынче у меня два очень интересные человека, le vicomte de Mortemart, il est allié aux Montmorency par les Rohans 10, одна из лучших фамилий Франции. Это один из хороших эмигрантов, из настоящих. И потом l'abbé Morio; 11 вы знаете этот глубокий ум? Он был принят государем. Вы знаете?
— А! Я очень рад буду, — сказал князь. — Скажите, — прибавил он, как будто только что вспомнив что-то и особенно-небрежно, тогда как то, о чем он спрашивал, было главной целью его посещения, — правда, что l'impératrice-mère 12 желает назначения барона Функе первым секретарем в Вену? C'est un pauvre sire, ce baron, à ce qu'il paraît 13. — Князь Василий желал определить сына на это место, которое через императрицу Марию Феодоровну старались доставить барону.
Анна Павловна почти закрыла глаза в знак того, что ни она, ни кто другой не могут судить про то, что угодно или нравится императрице.
— Monsieur le baron de Funke a été recommandé à l'impératrice-mère par sa soeur 14, — только сказала она грустным, сухим тоном. В то время как Анна Павловна назвала императрицу, лицо ее вдруг представило глубокое и искреннее выражение преданности и уважения, соединенное с грустью, что с ней бывало каждый раз, когда она в разговоре упоминала о своей высокой покровительнице. Она сказала, что ее величество изволила оказать барону Функе beaucoup d'estime 15, и опять взгляд ее подернулся грустью.
Князь равнодушно замолк, Анна Павловна, с свойственною ей придворною и женскою ловкостью и быстротою такта, захотела и щелкануть князя за то, что он дерзнул так отозваться о лице, рекомендованном императрице, и в то же время утешить его.
— Mais à propos de votre famille, — сказала она, — знаете ли, что ваша дочь, с тех пор как выезжает, fait les délices de tout le monde. On la trouve belle comme le jour 16.
Князь наклонился в знак уважения и признательности.
— Я часто думаю, — продолжала Анна Павловна после минутного молчания, придвигаясь к князю и ласково улыбаясь ему, как будто выказывая этим, что политические и светские разговоры кончены и теперь начинается задушевный, — я часто думаю, как иногда несправедливо распределяется счастие жизни. За что вам дала судьба таких двух славных детей (исключая Анатоля, вашего меньшого, я его не люблю, — вставила она безапелляционно, приподняв брови), — таких прелестных детей? А вы, право, менее всех цените их и потому их не сто́ите.
И она улыбнулась своею восторженной улыбкой.
— Que voulez-vous? Lafater aurait dit que je n'ai pas la bosse de la paternité 17, — сказал князь.
— Перестаньте шутить. Я хотела серьезно поговорить с вами. Знаете, я недовольна вашим меньшим сыном. Между нами будь сказано (лицо ее приняло грустное выражение), о нем говорили у ее величества и жалеют вас...
Князь не отвечал, но она молча, значительно глядя на него, ждала ответа. Князь Василий поморщился.
— Что ж мне делать? — сказал он наконец. — Вы знаете, я сделал для их воспитания все, что может отец, и оба вышли des imbéciles 18. Ипполит, по крайней мере, покойный дурак, а Анатоль — беспокойный. Вот одно различие, — сказал он, улыбаясь более неестественно и одушевленно, чем обыкновенно, и при этом особенно резко выказывая в сложившихся около его рта морщинах что-то неожиданно-грубое и неприятное.
— И зачем родятся дети у таких людей, как вы? Ежели бы вы не были отец, я бы ни в чем не могла упрекнуть вас, — сказала Анна Павловна, задумчиво поднимая глаза.
— Je suis votre верный раб, et à vous seule je puis l'avouer. Мои дети — ce sont les entraves de mon existence 19. Это мой крест. Я так себе объясняю. Que voulez-vous?.. 20 — Он помолчал, выражая жестом свою покорность жестокой судьбе.
Анна Павловна задумалась.
— Вы никогда не думали о том, чтобы женить вашего блудного сына Анатоля. Говорят, — сказала она, — что старые девицы ont la manie des mariages 21. Я еще не чувствую за собою этой слабости, но у меня есть одна petite personne, которая очень несчастлива с отцом, une parente à nous, une princesse 22 Болконская. — Князь Василий не отвечал, хотя с свойственной светским людям быстротой соображения и памятью движением головы показал, что он принял к соображению это сведенье.
— Нет, вы знаете ли, что этот Анатоль мне стоит сорок тысяч в год, — сказал он, видимо не в силах удерживать печальный ход своих мыслей. Он помолчал.
— Что будет через пять лет, ежели это пойдет так? Voilà l'avantage d'être père 23. Она богата, ваша княжна?
— Отец очень богат и скуп. Он живет в деревне. Знаете, этот известный князь Болконский, отставленный еще при покойном императоре и прозванный прусским королем. Он очень умный человек, но со странностями и тяжелый. La pauvre petite est malheureuse comme les pierres 24. У нее брат, вот что недавно женился на Lise Мейнен, адъютант Кутузова. Он будет нынче у меня.
— Ecoutez, chère Annette 25, — сказал князь, взяв вдруг свою собеседницу за руку и пригибая ее почему-то книзу. — Arrangez-moi cette affaire et je suis votre вернейший раб à tout jamais (рап — comme mon староста m'écrit des 26 донесенья: покой-ер-п). Она хорошей фамилии и богата. Все, что мне нужно.
И он с теми свободными и фамильярными грациозными движениями, которые его отличали, взял за руку фрейлину, поцеловал ее и, поцеловав, помахал фрейлинскою рукой, развалившись на креслах и глядя в сторону.
— Attendez 27, — сказала Анна Павловна, соображая. — Я нынче же поговорю Lise (la femme du jeune Болконский) 28. И, может быть, это уладится. Ce sera dans votre famille que je ferai mon apprentissage de vieille fille 29.`
        }
    },
    getters: {
        getBookList: ( state ) => {
            const isFavoriteItem = state.book_list.filter( item => item.is_favorite );
            const isNotFavoriteItem = state.book_list.filter( item => !item.is_favorite );
            return isFavoriteItem.concat( isNotFavoriteItem ).reverse()
        },
        getTitleTargetBook: state => state.target_book.title,
        getDescriptionTargetBook: state => state.target_book.description,
        getTextTargetBook: state => state.target_book.text,
        getIdTargetBook: state => state.target_book.id,
        getAuthorInfor: state => ({
            'publication': state.target_book.publication,
            'year': state.target_book.year,
            'author_name': state.target_book.author_name,
        })
    }
}