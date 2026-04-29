// =============================================================
//  IziTurkish — data.js
//  Словарь, фразы, сценарии, план
// =============================================================

// ─── WORDS — 150 слов (5 групп по 30) ───────────────────────

const WORDS = [
  // Группа 1 (1-30): базовые глаголы
  { id:1,  tr:'olmak',       translation:'быть / стать',   transcription:'ОЛМАК',        example:{ tr:'Ben öğrenci olmak istiyorum.', ru:'Я хочу быть студентом.' } },
  { id:2,  tr:'sahip olmak', translation:'иметь',          transcription:'САХИП ОЛМАК',  example:{ tr:'Arabam var.',                  ru:'У меня есть машина.' } },
  { id:3,  tr:'istemek',     translation:'хотеть',         transcription:'ИСТЕМЕК',      example:{ tr:'Çay istiyorum.',               ru:'Я хочу чай.' } },
  { id:4,  tr:'gitmek',      translation:'идти / ехать',   transcription:'ГИТМЕК',       example:{ tr:'Eve gidiyorum.',               ru:'Я иду домой.' } },
  { id:5,  tr:'konuşmak',    translation:'говорить',       transcription:'КОНУШМАК',     example:{ tr:'Türkçe konuşuyorum.',          ru:'Я говорю по-турецки.' } },
  { id:6,  tr:'anlamak',     translation:'понимать',       transcription:'АНЛАМАК',      example:{ tr:'Seni anlıyorum.',              ru:'Я тебя понимаю.' } },
  { id:7,  tr:'bilmek',      translation:'знать',          transcription:'БИЛМЕК',       example:{ tr:'Bilmiyorum.',                  ru:'Не знаю.' } },
  { id:8,  tr:'görmek',      translation:'видеть',         transcription:'ГЁРМЕК',       example:{ tr:'Seni görüyorum.',              ru:'Я тебя вижу.' } },
  { id:9,  tr:'gelmek',      translation:'приходить',      transcription:'ГЕЛМЕК',       example:{ tr:'Yarın geliyorum.',             ru:'Прихожу завтра.' } },
  { id:10, tr:'vermek',      translation:'давать',         transcription:'ВЕРМЕК',       example:{ tr:'Bana ver.',                    ru:'Дай мне.' } },
  { id:11, tr:'almak',       translation:'брать / купить', transcription:'АЛМАК',        example:{ tr:'Ekmek aldım.',                 ru:'Я купил хлеб.' } },
  { id:12, tr:'yapmak',      translation:'делать',         transcription:'ЯПМАК',        example:{ tr:'Ne yapıyorsun?',               ru:'Что ты делаешь?' } },
  { id:13, tr:'söylemek',    translation:'говорить / сказать', transcription:'СЁЙЛЕМЕК', example:{ tr:'Bana söyle.',                  ru:'Скажи мне.' } },
  { id:14, tr:'düşünmek',    translation:'думать',         transcription:'ДЮШЮНМЕК',     example:{ tr:'Ne düşünüyorsun?',             ru:'Что ты думаешь?' } },
  { id:15, tr:'bakmak',      translation:'смотреть',       transcription:'БАКМАК',       example:{ tr:'Bak!',                         ru:'Смотри!' } },
  { id:16, tr:'gelişmek',    translation:'развиваться',    transcription:'ГЕЛИШМЕК',     example:{ tr:'Türkçem gelişiyor.',           ru:'Мой турецкий улучшается.' } },
  { id:17, tr:'oturmak',     translation:'сидеть / жить',  transcription:'ОТУРМАК',      example:{ tr:'İstanbul\'da oturuyorum.',     ru:'Я живу в Стамбуле.' } },
  { id:18, tr:'çalışmak',    translation:'работать / учиться', transcription:'ЧАЛЫШМАК', example:{ tr:'Çok çalışıyorum.',             ru:'Я много работаю.' } },
  { id:19, tr:'başlamak',    translation:'начинать',       transcription:'БАШЛАМАК',     example:{ tr:'Derse başlıyoruz.',            ru:'Начинаем урок.' } },
  { id:20, tr:'bulmak',      translation:'находить',       transcription:'БУЛМАК',       example:{ tr:'Ev bulamıyorum.',              ru:'Не могу найти квартиру.' } },
  { id:21, tr:'beklemek',    translation:'ждать',          transcription:'БЕКЛЕМЕК',     example:{ tr:'Seni bekliyorum.',             ru:'Жду тебя.' } },
  { id:22, tr:'sevmek',      translation:'любить',         transcription:'СЕВМЕК',       example:{ tr:'Türkiye\'yi seviyorum.',       ru:'Я люблю Турцию.' } },
  { id:23, tr:'öğrenmek',    translation:'учиться / узнать', transcription:'ЁЙРЕНМЕК',   example:{ tr:'Türkçe öğreniyorum.',          ru:'Я учу турецкий.' } },
  { id:24, tr:'dönmek',      translation:'возвращаться',   transcription:'ДЁНМЕК',       example:{ tr:'Eve dönüyorum.',               ru:'Возвращаюсь домой.' } },
  { id:25, tr:'açmak',       translation:'открывать',      transcription:'АЧМАК',        example:{ tr:'Kapıyı aç.',                   ru:'Открой дверь.' } },
  { id:26, tr:'kapatmak',    translation:'закрывать',      transcription:'КАПАТМАК',     example:{ tr:'Pencereyi kapat.',             ru:'Закрой окно.' } },
  { id:27, tr:'çıkmak',      translation:'выходить',       transcription:'ЧИКМАК',       example:{ tr:'Dışarı çıkıyorum.',            ru:'Выхожу на улицу.' } },
  { id:28, tr:'girmek',      translation:'входить',        transcription:'ГИРМЕК',       example:{ tr:'İçeri gir.',                   ru:'Заходи.' } },
  { id:29, tr:'sormak',      translation:'спрашивать',     transcription:'СОРМАК',       example:{ tr:'Bir şey sorabilir miyim?',     ru:'Можно кое-что спросить?' } },
  { id:30, tr:'cevaplamak',  translation:'отвечать',       transcription:'ДЖЕВАПЛАМАК',  example:{ tr:'Soruyu cevapla.',              ru:'Ответь на вопрос.' } },

  // Группа 2 (31-60): глаголы действий
  { id:31, tr:'yemek',       translation:'есть / еда',     transcription:'ЕМЕК',         example:{ tr:'Ne yemek istiyorsun?',         ru:'Что хочешь поесть?' } },
  { id:32, tr:'içmek',       translation:'пить',           transcription:'ИЧМЕК',        example:{ tr:'Çay içiyorum.',                ru:'Я пью чай.' } },
  { id:33, tr:'uyumak',      translation:'спать',          transcription:'УЮМАК',        example:{ tr:'Erken uyudum.',                ru:'Я лёг спать рано.' } },
  { id:34, tr:'koşmak',      translation:'бежать',         transcription:'КОШМАК',       example:{ tr:'Her sabah koşuyorum.',         ru:'Каждое утро я бегаю.' } },
  { id:35, tr:'satın almak', translation:'покупать',       transcription:'САТЫН АЛМАК',  example:{ tr:'Market\'ten aldım.',           ru:'Купил в магазине.' } },
  { id:36, tr:'satmak',      translation:'продавать',      transcription:'САТМАК',       example:{ tr:'Araba satıyorum.',             ru:'Продаю машину.' } },
  { id:37, tr:'ödemek',      translation:'платить',        transcription:'ЁДЕМЕК',       example:{ tr:'Nakit ödeyeceğim.',            ru:'Заплачу наличными.' } },
  { id:38, tr:'aramak',      translation:'звонить / искать', transcription:'АРАМАК',     example:{ tr:'Seni arayacağım.',             ru:'Позвоню тебе.' } },
  { id:39, tr:'göndermek',   translation:'отправлять',     transcription:'ГЁНДЕРМЕК',    example:{ tr:'Mesaj gönderdim.',             ru:'Отправил сообщение.' } },
  { id:40, tr:'okumak',      translation:'читать',         transcription:'ОКУМАК',       example:{ tr:'Kitap okuyorum.',              ru:'Читаю книгу.' } },
  { id:41, tr:'yazmak',      translation:'писать',         transcription:'ЯЗМАК',        example:{ tr:'E-posta yazdım.',              ru:'Написал письмо.' } },
  { id:42, tr:'dinlemek',    translation:'слушать',        transcription:'ДИНЛЕМЕК',     example:{ tr:'Müzik dinliyorum.',            ru:'Слушаю музыку.' } },
  { id:43, tr:'izlemek',     translation:'смотреть (ТВ)',  transcription:'ИЗЛЕМЕК',      example:{ tr:'Dizi izliyorum.',              ru:'Смотрю сериал.' } },
  { id:44, tr:'oynamak',     translation:'играть',         transcription:'ОЙНАМАК',      example:{ tr:'Çocuklar oynuyor.',            ru:'Дети играют.' } },
  { id:45, tr:'temizlemek',  translation:'убирать / чистить', transcription:'ТЕМИЗЛЕМЕК', example:{ tr:'Evi temizliyorum.',           ru:'Убираю дом.' } },
  { id:46, tr:'pişirmek',    translation:'готовить (еду)', transcription:'ПИШИР МЕК',    example:{ tr:'Yemek pişiriyorum.',           ru:'Готовлю еду.' } },
  { id:47, tr:'taşımak',     translation:'переносить / перевозить', transcription:'ТАШИМАК', example:{ tr:'Ev taşıyorum.',            ru:'Переезжаю.' } },
  { id:48, tr:'kiralamak',   translation:'арендовать',     transcription:'КИРАЛАМАК',    example:{ tr:'Araba kiraladım.',             ru:'Я арендовал машину.' } },
  { id:49, tr:'rezervasyon yapmak', translation:'бронировать', transcription:'РЕЗЕРВАСЬОН ЯПМАК', example:{ tr:'Masa rezervasyonu yaptım.', ru:'Забронировал стол.' } },
  { id:50, tr:'şikayet etmek', translation:'жаловаться',   transcription:'ШИКАЕТ ЭТМЕК', example:{ tr:'Şikayet etmek istiyorum.',     ru:'Хочу пожаловаться.' } },
  { id:51, tr:'yardım etmek', translation:'помогать',      transcription:'ЯРДЫМ ЭТМЕК',  example:{ tr:'Yardım eder misin?',           ru:'Поможешь?' } },
  { id:52, tr:'anlaşmak',    translation:'договориться',   transcription:'АНЛАШМАК',     example:{ tr:'Anlaştık!',                   ru:'Договорились!' } },
  { id:53, tr:'unutmak',     translation:'забывать',       transcription:'УНУТМАК',      example:{ tr:'Kimliğimi unuttum.',           ru:'Забыл документ.' } },
  { id:54, tr:'hatırlamak',  translation:'помнить',        transcription:'ХАТИРЛАМАК',   example:{ tr:'Hatırlıyorum.',                ru:'Помню.' } },
  { id:55, tr:'değiştirmek', translation:'менять',         transcription:'ДЕЙИШТИР МЕК', example:{ tr:'Para değiştirmek istiyorum.', ru:'Хочу обменять деньги.' } },
  { id:56, tr:'kontrol etmek', translation:'проверять',    transcription:'КОНТРОЛ ЭТМЕК', example:{ tr:'Pasaportu kontrol ettiler.', ru:'Проверили паспорт.' } },
  { id:57, tr:'imzalamak',   translation:'подписывать',    transcription:'ИМЗАЛАМАК',    example:{ tr:'Sözleşmeyi imzaladım.',        ru:'Подписал договор.' } },
  { id:58, tr:'doldurmak',   translation:'заполнять',      transcription:'ДОЛДУРМАК',    example:{ tr:'Formu doldurun.',              ru:'Заполните форму.' } },
  { id:59, tr:'başvurmak',   translation:'подавать заявление', transcription:'БАШВУРМАК', example:{ tr:'İkametgah başvurusu yaptım.', ru:'Подал заявку на ВНЖ.' } },
  { id:60, tr:'teslim etmek', translation:'сдавать / передавать', transcription:'ТЕСЛИМ ЭТМЕК', example:{ tr:'Belgeleri teslim ettim.', ru:'Сдал документы.' } },

  // Группа 3 (61-90): существительные — жизнь и город
  { id:61, tr:'ev',          translation:'дом / квартира', transcription:'ЭВ',           example:{ tr:'Ev arıyorum.',                 ru:'Ищу квартиру.' } },
  { id:62, tr:'daire',       translation:'квартира',       transcription:'ДАИРЕ',        example:{ tr:'İki artı bir daire.',          ru:'Квартира 2+1.' } },
  { id:63, tr:'kira',        translation:'аренда / арендная плата', transcription:'КИРА', example:{ tr:'Kira ne kadar?',              ru:'Сколько аренда?' } },
  { id:64, tr:'banka',       translation:'банк',           transcription:'БАНКА',        example:{ tr:'Bankaya gidiyorum.',           ru:'Иду в банк.' } },
  { id:65, tr:'para',        translation:'деньги',         transcription:'ПАРА',         example:{ tr:'Param yok.',                   ru:'У меня нет денег.' } },
  { id:66, tr:'hesap',       translation:'счёт',           transcription:'ХЕСАП',        example:{ tr:'Hesap açmak istiyorum.',       ru:'Хочу открыть счёт.' } },
  { id:67, tr:'hastane',     translation:'больница',       transcription:'ХАСТАНЕ',      example:{ tr:'Hastaneye git.',               ru:'Иди в больницу.' } },
  { id:68, tr:'doktor',      translation:'врач',           transcription:'ДОКТОР',       example:{ tr:'Doktora gitmeliyim.',          ru:'Мне нужно к врачу.' } },
  { id:69, tr:'ilaç',        translation:'лекарство',      transcription:'ИЛАЧ',         example:{ tr:'İlaç almam gerekiyor.',        ru:'Мне нужно купить лекарство.' } },
  { id:70, tr:'market',      translation:'магазин / супермаркет', transcription:'МАРКЕТ', example:{ tr:'Markete gidiyorum.',          ru:'Иду в магазин.' } },
  { id:71, tr:'okul',        translation:'школа',          transcription:'ОКУЛ',         example:{ tr:'Çocuğum okula gidiyor.',       ru:'Мой ребёнок ходит в школу.' } },
  { id:72, tr:'iş',          translation:'работа',         transcription:'ИШ',           example:{ tr:'İş arıyorum.',                 ru:'Ищу работу.' } },
  { id:73, tr:'şirket',      translation:'компания',       transcription:'ШИРКЕТ',       example:{ tr:'Şirkette çalışıyorum.',        ru:'Работаю в компании.' } },
  { id:74, tr:'sözleşme',    translation:'договор',        transcription:'СЁЗЛЕШМЕ',     example:{ tr:'Sözleşmeyi okuyun.',           ru:'Прочитайте договор.' } },
  { id:75, tr:'pasaport',    translation:'паспорт',        transcription:'ПАСАПОРТ',     example:{ tr:'Pasaportunuzu gösterin.',      ru:'Покажите паспорт.' } },
  { id:76, tr:'kimlik',      translation:'удостоверение',  transcription:'КИМЛИК',       example:{ tr:'Kimliğiniz var mı?',           ru:'У вас есть удостоверение?' } },
  { id:77, tr:'adres',       translation:'адрес',          transcription:'АДРЕС',        example:{ tr:'Adresiniz nedir?',             ru:'Какой ваш адрес?' } },
  { id:78, tr:'telefon',     translation:'телефон',        transcription:'ТЕЛЕФОН',      example:{ tr:'Telefon numaranız?',           ru:'Ваш номер телефона?' } },
  { id:79, tr:'ulaşım',      translation:'транспорт',      transcription:'УЛАШИМ',       example:{ tr:'Ulaşım nasıl?',                ru:'Как добраться?' } },
  { id:80, tr:'otobüs',      translation:'автобус',        transcription:'ОТОБЮС',       example:{ tr:'Otobüs durağı nerede?',        ru:'Где остановка автобуса?' } },
  { id:81, tr:'metro',       translation:'метро',          transcription:'МЕТРО',        example:{ tr:'Metro ile gidiyorum.',         ru:'Еду на метро.' } },
  { id:82, tr:'taksi',       translation:'такси',          transcription:'ТАКСИ',        example:{ tr:'Taksi çağırır mısınız?',       ru:'Вызовите такси?' } },
  { id:83, tr:'restoran',    translation:'ресторан',       transcription:'РЕСТАРАН',     example:{ tr:'Restorana gidiyoruz.',         ru:'Идём в ресторан.' } },
  { id:84, tr:'yemek',       translation:'еда / блюдо',    transcription:'ЕМЕК',         note:'также "есть" (глагол)', example:{ tr:'Yemek çok lezzetli.', ru:'Еда очень вкусная.' } },
  { id:85, tr:'su',          translation:'вода',           transcription:'СУ',           example:{ tr:'Bir şişe su lütfen.',          ru:'Бутылку воды, пожалуйста.' } },
  { id:86, tr:'çay',         translation:'чай',            transcription:'ЧАЙ',          example:{ tr:'Çay içelim mi?',              ru:'Выпьем чаю?' } },
  { id:87, tr:'kahve',       translation:'кофе',           transcription:'КАХВЕ',        example:{ tr:'Türk kahvesi lütfen.',         ru:'Турецкий кофе, пожалуйста.' } },
  { id:88, tr:'ekmek',       translation:'хлеб',           transcription:'ЭKMEK',        example:{ tr:'Ekmek alır mısınız?',          ru:'Купите хлеб?' } },
  { id:89, tr:'pazar',       translation:'рынок / базар',  transcription:'ПАЗАР',        example:{ tr:'Pazara gidiyorum.',            ru:'Иду на рынок.' } },
  { id:90, tr:'mahalle',     translation:'район',          transcription:'МАХАЛЛЕ',      example:{ tr:'Güzel bir mahalle.',           ru:'Хороший район.' } },

  // Группа 4 (91-120): прилагательные
  { id:91,  tr:'büyük',      translation:'большой',        transcription:'БЮЙЮК',        example:{ tr:'Büyük bir daire istiyorum.',   ru:'Хочу большую квартиру.' } },
  { id:92,  tr:'küçük',      translation:'маленький',      transcription:'КЮЧЮК',        example:{ tr:'Küçük bir oda.',               ru:'Маленькая комната.' } },
  { id:93,  tr:'pahalı',     translation:'дорогой',        transcription:'ПАХАЛЫ',       example:{ tr:'Çok pahalı.',                  ru:'Очень дорого.' } },
  { id:94,  tr:'ucuz',       translation:'дешёвый',        transcription:'УДЖУЗ',        example:{ tr:'Daha ucuz var mı?',            ru:'Есть подешевле?' } },
  { id:95,  tr:'iyi',        translation:'хороший',        transcription:'ИЙИ',          example:{ tr:'İyi iş!',                      ru:'Хорошая работа!' } },
  { id:96,  tr:'kötü',       translation:'плохой',         transcription:'КЁТЮ',         example:{ tr:'Hava kötü.',                   ru:'Погода плохая.' } },
  { id:97,  tr:'yeni',       translation:'новый',          transcription:'ЕНИ',          example:{ tr:'Yeni bir telefon aldım.',      ru:'Купил новый телефон.' } },
  { id:98,  tr:'eski',       translation:'старый',         transcription:'ЭСКИ',         example:{ tr:'Bu bina çok eski.',            ru:'Это здание очень старое.' } },
  { id:99,  tr:'temiz',      translation:'чистый',         transcription:'ТЕМИЗ',        example:{ tr:'Oda temiz mi?',                ru:'Комната чистая?' } },
  { id:100, tr:'kirli',      translation:'грязный',        transcription:'КИРЛИ',        example:{ tr:'Kirli çarşaf var.',            ru:'Грязное бельё.' } },
  { id:101, tr:'sıcak',      translation:'горячий / жаркий', transcription:'СЫДЖАК',     example:{ tr:'Hava çok sıcak.',              ru:'Очень жарко.' } },
  { id:102, tr:'soğuk',      translation:'холодный',       transcription:'СОУК',         example:{ tr:'Su soğuk.',                   ru:'Вода холодная.' } },
  { id:103, tr:'güzel',      translation:'красивый / хорошо', transcription:'ГЮЗЕЛЬ',    example:{ tr:'Çok güzel!',                   ru:'Очень красиво!' } },
  { id:104, tr:'zor',        translation:'трудный',        transcription:'ЗОР',          example:{ tr:'Türkçe zor mu?',               ru:'Турецкий трудный?' } },
  { id:105, tr:'kolay',      translation:'лёгкий',         transcription:'КОЛАЙ',        example:{ tr:'Bu kolay.',                    ru:'Это легко.' } },
  { id:106, tr:'hızlı',      translation:'быстрый',        transcription:'ХЫЗЛЫ',        example:{ tr:'Hızlı konuşma!',              ru:'Не говори так быстро!' } },
  { id:107, tr:'yavaş',      translation:'медленный',      transcription:'ЯВАШ',         example:{ tr:'Yavaş konuş lütfen.',          ru:'Говори медленнее, пожалуйста.' } },
  { id:108, tr:'doğru',      translation:'правильный / прямо', transcription:'ДОРУ',     example:{ tr:'Doğru yoldasın.',              ru:'Ты на правильном пути.' } },
  { id:109, tr:'yanlış',     translation:'неправильный',   transcription:'ЯНЛЫШ',        example:{ tr:'Yanlış numara.',               ru:'Неправильный номер.' } },
  { id:110, tr:'açık',       translation:'открытый',       transcription:'АЧЫК',         example:{ tr:'Market açık mı?',              ru:'Магазин открыт?' } },
  { id:111, tr:'kapalı',     translation:'закрытый',       transcription:'КАПАЛЫ',       example:{ tr:'Dükkan kapalı.',               ru:'Магазин закрыт.' } },
  { id:112, tr:'yakın',      translation:'близкий',        transcription:'ЯКЫН',         example:{ tr:'Metro yakın mı?',              ru:'Метро близко?' } },
  { id:113, tr:'uzak',       translation:'далёкий',        transcription:'УЗАК',         example:{ tr:'Çok uzak.',                    ru:'Очень далеко.' } },
  { id:114, tr:'hazır',      translation:'готовый',        transcription:'ХАЗЫР',        example:{ tr:'Hazır mısın?',                 ru:'Ты готов?' } },
  { id:115, tr:'meşgul',     translation:'занятый',        transcription:'МЕШГУЛ',       example:{ tr:'Şu an meşgulüm.',             ru:'Сейчас занят.' } },
  { id:116, tr:'mümkün',     translation:'возможно',       transcription:'МЮМКЮН',       example:{ tr:'Bu mümkün mü?',               ru:'Это возможно?' } },
  { id:117, tr:'gerekli',    translation:'необходимый',    transcription:'ГЕРЕКЛИ',      example:{ tr:'Vize gerekli mi?',             ru:'Нужна виза?' } },
  { id:118, tr:'önemli',     translation:'важный',         transcription:'ЁНЕМЛИ',       example:{ tr:'Bu çok önemli.',               ru:'Это очень важно.' } },
  { id:119, tr:'farklı',     translation:'разный / отличающийся', transcription:'ФАРКЛЫ', example:{ tr:'Türkçe çok farklı.',          ru:'Турецкий очень отличается.' } },
  { id:120, tr:'aynı',       translation:'одинаковый / тот же', transcription:'АЙНЫ',    example:{ tr:'Aynı şeyi istiyorum.',         ru:'Хочу то же самое.' } },

  // Группа 5 (121-150): наречия, место, время
  { id:121, tr:'evet',       translation:'да',             transcription:'ЭВЕТ',         example:{ tr:'Evet, anlıyorum.',             ru:'Да, понимаю.' } },
  { id:122, tr:'hayır',      translation:'нет',            transcription:'ХАЙЫР',        example:{ tr:'Hayır, teşekkürler.',          ru:'Нет, спасибо.' } },
  { id:123, tr:'lütfen',     translation:'пожалуйста',     transcription:'ЛЮTФEН',       example:{ tr:'Bir dakika lütfen.',           ru:'Одну минуту, пожалуйста.' } },
  { id:124, tr:'teşekkür',   translation:'спасибо',        transcription:'ТЕШЕККЮР',     example:{ tr:'Teşekkür ederim.',             ru:'Спасибо.' } },
  { id:125, tr:'tamam',      translation:'хорошо / ладно', transcription:'ТАМАМ',        example:{ tr:'Tamam, anlaştık.',             ru:'Хорошо, договорились.' } },
  { id:126, tr:'burada',     translation:'здесь',          transcription:'БУРАДА',       example:{ tr:'Ben buradayım.',               ru:'Я здесь.' } },
  { id:127, tr:'orada',      translation:'там',            transcription:'ОРАДА',        example:{ tr:'Banka orada.',                 ru:'Банк там.' } },
  { id:128, tr:'nerede',     translation:'где',            transcription:'НЕРЕДЕ',       example:{ tr:'Tuvalet nerede?',              ru:'Где туалет?' } },
  { id:129, tr:'şimdi',      translation:'сейчас',         transcription:'ШИМДИ',        example:{ tr:'Şimdi gidiyorum.',             ru:'Иду сейчас.' } },
  { id:130, tr:'bugün',      translation:'сегодня',        transcription:'БУГЮН',        example:{ tr:'Bugün çalışmıyorum.',          ru:'Сегодня не работаю.' } },
  { id:131, tr:'yarın',      translation:'завтра',         transcription:'ЯРЫН',         example:{ tr:'Yarın görüşürüz.',             ru:'Увидимся завтра.' } },
  { id:132, tr:'dün',        translation:'вчера',          transcription:'ДЮН',          example:{ tr:'Dün geldi.',                   ru:'Пришёл вчера.' } },
  { id:133, tr:'sabah',      translation:'утро',           transcription:'САБАХ',        example:{ tr:'Günaydın! Sabah napmak?',      ru:'Доброе утро! Что делаешь утром?' } },
  { id:134, tr:'akşam',      translation:'вечер',          transcription:'АКШАМ',        example:{ tr:'Akşam buluşalım.',             ru:'Встретимся вечером.' } },
  { id:135, tr:'gece',       translation:'ночь',           transcription:'ГЕДЖЕ',        example:{ tr:'İyi geceler.',                 ru:'Спокойной ночи.' } },
  { id:136, tr:'çabuk',      translation:'быстро',         transcription:'ЧАБУК',        example:{ tr:'Çabuk gel!',                   ru:'Приходи быстро!' } },
  { id:137, tr:'hemen',      translation:'сразу / немедленно', transcription:'ХЕМЕН',    example:{ tr:'Hemen geliyorum.',             ru:'Иду сразу.' } },
  { id:138, tr:'biraz',      translation:'немного',        transcription:'БИРАЗ',        example:{ tr:'Biraz bekle.',                 ru:'Подожди немного.' } },
  { id:139, tr:'çok',        translation:'много / очень',  transcription:'ЧОК',          example:{ tr:'Çok teşekkürler.',             ru:'Большое спасибо.' } },
  { id:140, tr:'az',         translation:'мало',           transcription:'АЗ',           example:{ tr:'Az kaldı.',                    ru:'Мало осталось.' } },
  { id:141, tr:'hiç',        translation:'никогда / совсем нет', transcription:'ХИЧ',    example:{ tr:'Hiç anlamıyorum.',             ru:'Совсем не понимаю.' } },
  { id:142, tr:'belki',      translation:'может быть',     transcription:'БЕЛКИ',        example:{ tr:'Belki yarın.',                 ru:'Может быть, завтра.' } },
  { id:143, tr:'tabii',      translation:'конечно',        transcription:'ТАБИИ',        example:{ tr:'Tabii ki!',                    ru:'Конечно!' } },
  { id:144, tr:'nasıl',      translation:'как',            transcription:'НАСЫЛ',        example:{ tr:'Nasılsın?',                    ru:'Как дела?' } },
  { id:145, tr:'ne',         translation:'что',            transcription:'НЕ',           example:{ tr:'Ne istiyorsun?',               ru:'Что хочешь?' } },
  { id:146, tr:'kim',        translation:'кто',            transcription:'КИМ',          example:{ tr:'Kim geldi?',                   ru:'Кто пришёл?' } },
  { id:147, tr:'kaç',        translation:'сколько',        transcription:'КАЧ',          example:{ tr:'Kaç lira?',                    ru:'Сколько лир?' } },
  { id:148, tr:'ne zaman',   translation:'когда',          transcription:'НЕ ЗАМАН',     example:{ tr:'Ne zaman geleceksin?',         ru:'Когда придёшь?' } },
  { id:149, tr:'neden',      translation:'почему',         transcription:'НЕДЕН',        example:{ tr:'Neden geç kaldın?',            ru:'Почему опоздал?' } },
  { id:150, tr:'için',       translation:'для / за (ради)', transcription:'ИЧИН',        example:{ tr:'Senin için.',                  ru:'Для тебя.' } },
];

// ─── PHRASES — разговорник по категориям ────────────────────

const PHRASES = [
  {
    id: 'greetings', category: 'Приветствия', icon: '👋', color: '#E30A17',
    phrases: [
      { tr: 'Merhaba!',             ru: 'Привет!',                transcription: 'МЕРХАБА' },
      { tr: 'Günaydın!',            ru: 'Доброе утро!',           transcription: 'ГЮНАЙДЫН' },
      { tr: 'İyi akşamlar!',        ru: 'Добрый вечер!',          transcription: 'ИЙИ АКШАМЛАР' },
      { tr: 'Nasılsınız?',          ru: 'Как вы поживаете?',      transcription: 'НАСЫЛСЫНЫЗ' },
      { tr: 'İyiyim, teşekkürler.', ru: 'Хорошо, спасибо.',       transcription: 'ИЙИЙИМ, ТЕШЕККЮРЛЕР' },
      { tr: 'Görüşürüz!',           ru: 'До свидания!',           transcription: 'ГЁРЮШЮРЮЗ' },
      { tr: 'Hoşça kal!',           ru: 'Пока!',                  transcription: 'ХОШЧА КАЛ' },
      { tr: 'Kolay gelsin!',        ru: 'Удачи в работе!',        transcription: 'КОЛАЙ ГЕЛСИН', note: 'говорят тому, кто работает' },
    ]
  },
  {
    id: 'intro', category: 'О себе', icon: '🙋', color: '#2563EB',
    phrases: [
      { tr: 'Benim adım ...',       ru: 'Меня зовут ...',         transcription: 'БЕНИМ АДЫМ' },
      { tr: 'Rusya\'dan geliyorum.',ru: 'Я из России.',            transcription: 'РУСЬЯДАН ГЕЛИЙОРУМ' },
      { tr: 'Türkçe öğreniyorum.', ru: 'Я учу турецкий.',         transcription: 'ТЮРКЧЕ ЁЙРЕНИЙОРУМ' },
      { tr: 'Biraz Türkçe biliyorum.', ru: 'Я немного знаю турецкий.', transcription: 'БИРАЗ ТЮРКЧЕ БИЛИЙОРУМ' },
      { tr: 'Anlamıyorum.',         ru: 'Не понимаю.',             transcription: 'АНЛАМИЙОРУМ' },
      { tr: 'Tekrar söyler misiniz?', ru: 'Повторите, пожалуйста.', transcription: 'ТЕКРАР СЁЙЛЕР МИСИНИЗ' },
      { tr: 'Yavaş konuşur musunuz?', ru: 'Говорите медленнее?',  transcription: 'ЯВАШ КОНУШУР МУСУНУЗ' },
    ]
  },
  {
    id: 'shop', category: 'Покупки', icon: '🛍️', color: '#7C3AED',
    phrases: [
      { tr: 'Bu ne kadar?',         ru: 'Сколько это стоит?',     transcription: 'БУ НЕ КАДАР' },
      { tr: 'Çok pahalı.',          ru: 'Очень дорого.',          transcription: 'ЧОК ПАХАЛЫ' },
      { tr: 'İndirim var mı?',      ru: 'Есть скидка?',           transcription: 'ИНДИРИМ ВАР МЫ' },
      { tr: 'Bunu alıyorum.',       ru: 'Беру это.',              transcription: 'БУНУ АЛИЙОРУМ' },
      { tr: 'Nakit / Kart.',        ru: 'Наличными / Картой.',     transcription: 'НАКИТ / КАРТ' },
      { tr: 'Makbuz lütfen.',       ru: 'Чек, пожалуйста.',        transcription: 'МАКБУЗ ЛЮTФEН' },
      { tr: 'Başka renk var mı?',   ru: 'Есть другой цвет?',      transcription: 'БАШКА РЕНК ВАР МЫ' },
      { tr: 'Değiştirmek istiyorum.', ru: 'Хочу обменять.',       transcription: 'ДЕЙИШТИРМЕК ИСТИЙОРУМ' },
    ]
  },
  {
    id: 'transport', category: 'Транспорт', icon: '🚌', color: '#059669',
    phrases: [
      { tr: '... nerede?',          ru: 'Где находится ...?',     transcription: 'НЕРЕДЕ' },
      { tr: 'Metro durağı nerede?', ru: 'Где станция метро?',     transcription: 'МЕТРО ДУРАГЫ НЕРЕДЕ' },
      { tr: '... gider mi?',        ru: 'Едет до ...?',           transcription: 'ГИДЕР МИ' },
      { tr: 'Bilet ne kadar?',      ru: 'Сколько стоит билет?',   transcription: 'БИЛЕТ НЕ КАДАР' },
      { tr: 'İstanbulkart nereden alabilirim?', ru: 'Где купить İstanbulkart?', transcription: 'ИСТАНБУЛКАРТ НЕРЕДЕН АЛАБИЛИРИМ' },
      { tr: 'Taksi çağırır mısınız?', ru: 'Вызовете такси?',      transcription: 'ТАКСИ ЧАЙЫРЫР МЫСЫНЫЗ' },
      { tr: '... kaç dakika?',      ru: 'Сколько минут до ...?',  transcription: 'КАЧ ДАКИКА' },
      { tr: 'Burada dur lütfen.',   ru: 'Остановите здесь.',      transcription: 'БУРАДА ДУР ЛЮТFЕН' },
    ]
  },
  {
    id: 'restaurant', category: 'Ресторан', icon: '🍽️', color: '#D97706',
    phrases: [
      { tr: 'Masa var mı?',         ru: 'Есть свободный столик?', transcription: 'МАСА ВАР МЫ' },
      { tr: 'Menü lütfen.',         ru: 'Меню, пожалуйста.',      transcription: 'МЕНЮ ЛЮТFЕН' },
      { tr: 'Tavsiye eder misiniz?', ru: 'Что посоветуете?',      transcription: 'ТАВСИЕ ЭДЕР МИСИНИЗ' },
      { tr: 'Alerji var.',          ru: 'У меня аллергия.',       transcription: 'АLERЖИ ВАР' },
      { tr: 'Hesap lütfen.',        ru: 'Счёт, пожалуйста.',      transcription: 'ХЕСАП ЛЮТFЕН' },
      { tr: 'Çok lezzetliydi!',     ru: 'Было очень вкусно!',     transcription: 'ЧОК ЛЕЗЗЕТЛИЙДИ' },
      { tr: 'Paket yapar mısınız?', ru: 'Можно взять с собой?',   transcription: 'ПАКЕТ ЯПАР МЫСЫНЫЗ' },
    ]
  },
  {
    id: 'bank', category: 'Банк', icon: '🏦', color: '#1E40AF',
    phrases: [
      { tr: 'Hesap açmak istiyorum.',  ru: 'Хочу открыть счёт.',    transcription: 'ХЕСАП АЧМАК ИСТИЙОРУМ' },
      { tr: 'Para yatırmak istiyorum.', ru: 'Хочу внести деньги.',  transcription: 'ПАРА ЯТЫРМАК ИСТИЙОРУМ' },
      { tr: 'Havale yapabilir miyim?', ru: 'Могу сделать перевод?', transcription: 'ХАВАЛЕ ЯПАБИЛИР МИЙИМ' },
      { tr: 'Döviz kuru nedir?',       ru: 'Какой курс валюты?',    transcription: 'ДЁВИЗ КУРУ НЕДИР' },
      { tr: 'ATM nerede?',             ru: 'Где банкомат?',          transcription: 'ATM НЕРЕДЕ' },
      { tr: 'Kartım çalışmıyor.',      ru: 'Моя карта не работает.', transcription: 'КАРТЫМ ЧАЛЫШМИЙОР' },
      { tr: 'Şifre mi gerekiyor?',     ru: 'Нужен ПИН-код?',        transcription: 'ШИФРЕ МИ ГЕРЕКИЙОР' },
    ]
  },
  {
    id: 'doctor', category: 'Врач', icon: '🏥', color: '#DC2626',
    phrases: [
      { tr: 'Randevu almak istiyorum.', ru: 'Хочу записаться к врачу.', transcription: 'РАНДЕВУ АЛМАК ИСТИЙОРУМ' },
      { tr: 'Başım ağrıyor.',         ru: 'У меня болит голова.',  transcription: 'БАШЫМ АГРИЙОР' },
      { tr: 'Midem ağrıyor.',         ru: 'У меня болит живот.',   transcription: 'МИДЕМ АГРИЙОР' },
      { tr: 'Ateşim var.',            ru: 'У меня температура.',    transcription: 'АТЕШИМ ВАР' },
      { tr: 'Reçete yazar mısınız?',  ru: 'Выпишете рецепт?',      transcription: 'РЕЧЕТЕ ЯЗАР МЫСЫНЫЗ' },
      { tr: 'Bu ilacı nerede alabilirim?', ru: 'Где купить это лекарство?', transcription: 'БУ ИЛАДЖЫ НЕРЕДЕН АЛАБИЛИРИМ' },
      { tr: 'Sigortam var.',          ru: 'У меня есть страховка.', transcription: 'СИГОРТАМ ВАР' },
      { tr: 'Acil!',                  ru: 'Срочно!',               transcription: 'АДЖИЛ' },
    ]
  },
  {
    id: 'apartment', category: 'Жильё', icon: '🏠', color: '#7C3AED',
    phrases: [
      { tr: 'Daire kiralamak istiyorum.', ru: 'Хочу снять квартиру.',  transcription: 'ДАИРЕ КИРАЛАМАК ИСТИЙОРУМ' },
      { tr: 'Kira bedeli ne kadar?',  ru: 'Сколько стоит аренда?', transcription: 'КИРА БЕДЕЛИ НЕ КАДАР' },
      { tr: 'Depozito ne kadar?',     ru: 'Какой депозит?',         transcription: 'ДЕПОЗИТО НЕ КАДАР' },
      { tr: 'Aidat dahil mi?',        ru: 'Коммунальные включены?', transcription: 'АЙДАТ ДАХИЛ МИ' },
      { tr: 'Evcil hayvan var.',      ru: 'У меня есть питомец.',   transcription: 'ЕВДЖИЛ ХАЙВАН ВАР' },
      { tr: 'Sözleşme imzalamak istiyorum.', ru: 'Хочу подписать договор.', transcription: 'СЁЗЛЕШМЕ ИМЗАЛАМАК ИСТИЙОРУМ' },
      { tr: 'Isıtma nasıl çalışıyor?', ru: 'Как работает отопление?', transcription: 'ЫСЫТМА НАСЫЛ ЧАЛЫШИЙОР' },
    ]
  },
  {
    id: 'work', category: 'Работа', icon: '💼', color: '#0369A1',
    phrases: [
      { tr: 'İş başvurusu yapmak istiyorum.', ru: 'Хочу подать заявку на работу.', transcription: 'ИШ БАШВУРУСУ ЯПМАК ИСТИЙОРУМ' },
      { tr: 'Özgeçmişim burada.',    ru: 'Вот моё резюме.',        transcription: 'ЁЗГЕЧМИШИМ БУРАДА' },
      { tr: 'Maaş ne kadar?',        ru: 'Какая зарплата?',        transcription: 'МАASH НЕ КАДАР' },
      { tr: 'Saat kaçta başlıyoruz?', ru: 'В котором часу начинаем?', transcription: 'СААT КАЧТА БАШЛИЙОРУЗ' },
      { tr: 'İzin alabilir miyim?',  ru: 'Могу взять отгул?',      transcription: 'ИЗИН АЛАБИЛИР МИЙИМ' },
      { tr: 'Toplantı ne zaman?',    ru: 'Когда встреча?',          transcription: 'ТОПЛАНТЫ НЕ ЗАМАН' },
      { tr: 'Rapor hazır.',          ru: 'Отчёт готов.',            transcription: 'РАПОР ХАЗЫР' },
    ]
  },
  {
    id: 'emergency', category: 'Срочно', icon: '🆘', color: '#991B1B',
    phrases: [
      { tr: 'İmdat!',               ru: 'На помощь!',             transcription: 'ИМДАТ' },
      { tr: 'Polis çağırın!',        ru: 'Вызовите полицию!',      transcription: 'ПОЛИС ЧАЙЫРЫН' },
      { tr: 'Ambulans çağırın!',     ru: 'Вызовите скорую!',       transcription: 'АМБУЛАНС ЧАЙЫРЫН' },
      { tr: 'Kayboldum.',            ru: 'Я потерялся.',           transcription: 'КАЙБОЛДУМ' },
      { tr: 'Çantam çalındı.',       ru: 'У меня украли сумку.',   transcription: 'ЧАНТАМ ЧАЛЫНДЫ' },
      { tr: 'Acil yardım lazım.',    ru: 'Нужна срочная помощь.',  transcription: 'АДЖИЛ ЯРДЫМ ЛАЗЫМ' },
      { tr: 'Büyükelçilik nerede?',  ru: 'Где посольство?',        transcription: 'БЮЙЮКЕЛЧИЛИК НЕРЕДЕ' },
    ]
  },
];

// ─── SCENARIOS — 10 сценариев ────────────────────────────────

const SCENARIOS = [
  {
    id: 'bank',
    title: 'В банке',
    icon: '🏦',
    description: 'Открываем счёт и получаем карту',
    steps: [
      { type: 'info', text: '💡 В турецком банке для открытия счёта нужны: паспорт, ИНН иностранца (yabancı kimlik no) и турецкий номер телефона.' },
      { type: 'dialog', speaker: 'Банкир', text: 'Merhaba! Size nasıl yardımcı olabilirim?', translation: 'Здравствуйте! Чем могу помочь?',
        options: ['Hesap açmak istiyorum.', 'ATM nerede?', 'Günaydın!'], correct: 0, explanation: '"Hesap açmak" — открыть счёт' },
      { type: 'phrase', tr: 'Pasaportunuzu görebilir miyim?', ru: 'Могу увидеть ваш паспорт?', transcription: 'ПАСАПОРТУНУЗУ ГЁРЕБИЛИР МИЙИМ' },
      { type: 'dialog', speaker: 'Банкир', text: 'Türkiye\'de kaç aydır ikamet ediyorsunuz?', translation: 'Сколько месяцев вы живёте в Турции?',
        options: ['Altı aydır.', 'Tamam.', 'Bilmiyorum.'], correct: 0, explanation: '"Altı ay" — шесть месяцев; "-dır" — суффикс длительности' },
      { type: 'info', text: '💳 Первую дебетовую карту выдадут на месте. Кредитная карта — через 1–3 месяца при наличии ВНЖ.' },
      { type: 'dialog', speaker: 'Банкир', text: 'İnternet bankacılığı için şifre ister misiniz?', translation: 'Хотите пароль для интернет-банка?',
        options: ['Evet, lütfen.', 'Hayır, iyi.', 'Anlamıyorum.'], correct: 0, explanation: '"Evet, lütfen" — Да, пожалуйста' },
    ]
  },
  {
    id: 'doctor',
    title: 'У врача',
    icon: '🏥',
    description: 'Записываемся и рассказываем о симптомах',
    steps: [
      { type: 'info', text: '📱 В Турции запись к врачу через приложение MHRS (mhrs.gov.tr) или по телефону 182.' },
      { type: 'dialog', speaker: 'Регистратура', text: 'Randevunuz var mı?', translation: 'У вас есть запись?',
        options: ['Evet, saat 10\'da.', 'Hayır, acil.', 'Bilmiyorum.'], correct: 0, explanation: '"Randevu" — запись/запись к врачу, "saat 10\'da" — в 10 часов' },
      { type: 'phrase', tr: 'Başım çok ağrıyor.', ru: 'У меня очень болит голова.', transcription: 'БАШЫМ ЧОК АГРИЙОР' },
      { type: 'dialog', speaker: 'Доктор', text: 'Ne zaman başladı?', translation: 'Когда началось?',
        options: ['Dünden beri.', 'İyiyim.', 'Tamam.'], correct: 0, explanation: '"Dünden beri" — с вчерашнего дня' },
      { type: 'info', text: '💊 Рецепт в Турции называется "reçete". Без него многие лекарства не продадут в аптеке.' },
      { type: 'dialog', speaker: 'Доктор', text: 'İlaçlara alerjiniz var mı?', translation: 'Есть ли у вас аллергия на лекарства?',
        options: ['Hayır, yok.', 'Evet, çok.', 'Belki.'], correct: 0, explanation: '"Alerji yok" — аллергии нет' },
    ]
  },
  {
    id: 'apartment',
    title: 'Снимаем жильё',
    icon: '🏠',
    description: 'Договариваемся с хозяином квартиры',
    steps: [
      { type: 'info', text: '🏠 В Турции квартиры нумеруют как 1+1 (студия+кухня), 2+1, 3+1. Первая цифра — количество спален.' },
      { type: 'dialog', speaker: 'Арендодатель', text: 'Ne tür bir daire arıyorsunuz?', translation: 'Какую квартиру вы ищете?',
        options: ['İki artı bir daire.', 'Büyük ev.', 'Bilmiyorum.'], correct: 0, explanation: '"İki artı bir" — две комнаты + кухня (2+1)' },
      { type: 'phrase', tr: 'Kira bedeli ne kadar?', ru: 'Сколько стоит аренда?', transcription: 'КИРА БЕДЕЛИ НЕ КАДАР' },
      { type: 'dialog', speaker: 'Арендодатель', text: 'İki ay depozito istiyorum.', translation: 'Я прошу два месяца депозита.',
        options: ['Peki, anlaştık.', 'Çok pahalı!', 'Hayır.'], correct: 0, explanation: '"Anlaştık" — договорились' },
      { type: 'info', text: '📋 Обязательно проверьте: входит ли "aidat" (коммунальные на обслуживание) в стоимость аренды.' },
      { type: 'dialog', speaker: 'Арендодатель', text: 'Ne zaman taşınmak istiyorsunuz?', translation: 'Когда хотите въехать?',
        options: ['Hemen, mümkünse.', 'Bilmiyorum.', 'Yarın.'], correct: 0, explanation: '"Hemen, mümkünse" — Сразу, если возможно' },
    ]
  },
  {
    id: 'transport',
    title: 'В транспорте',
    icon: '🚌',
    description: 'Добираемся по городу',
    steps: [
      { type: 'info', text: '🚌 В Турции для оплаты транспорта используют İstanbulkart (Стамбул) или местные аналоги. Наличными в автобус не сядешь.' },
      { type: 'dialog', speaker: 'Прохожий', text: 'Merhaba! Bir şey sorabilir miyim?', translation: 'Здравствуйте! Могу кое-что спросить?',
        options: ['Tabii, buyurun.', 'Hayır.', 'Bilmiyorum.'], correct: 0, explanation: '"Tabii, buyurun" — конечно, пожалуйста' },
      { type: 'phrase', tr: 'Merkeze nasıl gidebilirim?', ru: 'Как доехать до центра?', transcription: 'МЕРKEZЕ НАСЫЛ ГИДЕБИЛИРИМ' },
      { type: 'dialog', speaker: 'Прохожий', text: '28 numaralı otobüsle gidin.', translation: 'Езжайте на автобусе номер 28.',
        options: ['Teşekkür ederim!', 'Peki.', 'Tamam.'], correct: 0, explanation: '"Teşekkür ederim" — самый вежливый вариант "спасибо"' },
      { type: 'info', text: '🗺️ Приложение Moovit или Google Maps покажет актуальные маршруты турецкого транспорта.' },
      { type: 'dialog', speaker: 'Водитель', text: 'Nereye gideceksiniz?', translation: 'Куда вы едете?',
        options: ['Taksim\'e lütfen.', 'Bilmiyorum.', 'Tamam.'], correct: 0, explanation: '"Taksim\'e" — направление в Таксим, суффикс -e/-a = "в/на"' },
    ]
  },
  {
    id: 'restaurant',
    title: 'В ресторане',
    icon: '🍽️',
    description: 'Делаем заказ и платим',
    steps: [
      { type: 'info', text: '☕ В Турции чай (çay) подают бесплатно во многих заведениях. Турецкий кофе (Türk kahvesi) всегда варят в джезве.' },
      { type: 'dialog', speaker: 'Официант', text: 'Hoş geldiniz! Kaç kişisiniz?', translation: 'Добро пожаловать! Вас сколько?',
        options: ['İki kişiyiz.', 'Merhaba.', 'Evet.'], correct: 0, explanation: '"İki kişiyiz" — нас двое; "kişi" — человек' },
      { type: 'phrase', tr: 'Menüyü görebilir miyim?', ru: 'Могу увидеть меню?', transcription: 'МЕНЮЙЮ ГЁРЕБИЛИР МИЙИМ' },
      { type: 'dialog', speaker: 'Официант', text: 'Ne içmek istersiniz?', translation: 'Что хотите выпить?',
        options: ['Çay lütfen.', 'Hayır.', 'Bilmiyorum.'], correct: 0, explanation: '"Çay lütfen" — чай, пожалуйста' },
      { type: 'info', text: '💰 Чаевые в Турции: 10–15% в ресторане, 5–10 лир таксисту. Сервисный сбор (servis ücreti) иногда уже включён в счёт.' },
      { type: 'dialog', speaker: 'Официант', text: 'Başka bir şey ister misiniz?', translation: 'Желаете что-нибудь ещё?',
        options: ['Hesap lütfen.', 'Evet, çay.', 'Tamam.'], correct: 0, explanation: '"Hesap lütfen" — счёт, пожалуйста' },
    ]
  },
  {
    id: 'supermarket',
    title: 'В магазине',
    icon: '🛒',
    description: 'Покупаем продукты и торгуемся',
    steps: [
      { type: 'info', text: '🛒 Крупные сети в Турции: Migros, CarrefourSA, BİM, A101, Şok. BİM и A101 — самые бюджетные.' },
      { type: 'dialog', speaker: 'Продавец', text: 'Yardımcı olabilir miyim?', translation: 'Могу помочь?',
        options: ['Evet, lütfen.', 'Hayır.', 'Belki.'], correct: 0, explanation: '"Evet, lütfen" — Да, пожалуйста' },
      { type: 'phrase', tr: 'Ekmek nerede?', ru: 'Где хлеб?', transcription: 'ЭKMEK НЕРЕДЕ' },
      { type: 'dialog', speaker: 'Продавец', text: 'Plastik poşet ister misiniz?', translation: 'Хотите пластиковый пакет?',
        options: ['Hayır, teşekkürler.', 'Evet, ver.', 'Tamam.'], correct: 0, explanation: 'В Турции пакеты платные, поэтому часто отказываются' },
      { type: 'info', text: '💳 Карта Türkiye Kart даёт кэшбэк в государственных магазинах. Можно оформить онлайн.' },
      { type: 'dialog', speaker: 'Кассир', text: 'Toplam yüz lira.', translation: 'Итого сто лир.',
        options: ['Kredi kartıyla ödeyebilir miyim?', 'Tamam.', 'Pahalı!'], correct: 0, explanation: '"Kredi kartıyla" — картой, суффикс -yla = "с помощью"' },
    ]
  },
  {
    id: 'vnj',
    title: 'ВНЖ / Икамет',
    icon: '📋',
    description: 'Оформляем вид на жительство',
    steps: [
      { type: 'info', text: '📋 Türkiye\'de oturma izni = ikamet izni (икамет). Записаться можно через e-ikamet.goc.gov.tr.' },
      { type: 'dialog', speaker: 'Инспектор', text: 'Neden Türkiye\'de kalmak istiyorsunuz?', translation: 'Почему вы хотите остаться в Турции?',
        options: ['Çalışmak için.', 'Bilmiyorum.', 'Tamam.'], correct: 0, explanation: '"İçin" = для/ради. "Çalışmak için" — чтобы работать' },
      { type: 'phrase', tr: 'Tüm belgeler hazır.', ru: 'Все документы готовы.', transcription: 'ТЮМ БЕЛГЕЛЕР ХАЗЫР' },
      { type: 'dialog', speaker: 'Инспектор', text: 'Pasaportunuzun geçerlilik süresi var mı?', translation: 'Паспорт действителен?',
        options: ['Evet, iki yıl geçerli.', 'Hayır.', 'Bilmiyorum.'], correct: 0, explanation: '"Geçerli" — действительный; "iki yıl" — два года' },
      { type: 'info', text: '📸 Для икамет нужны: паспорт, 4 фото, договор аренды (нотариально), страховка, квитанция об оплате сбора.' },
      { type: 'dialog', speaker: 'Инспектор', text: 'Sonuç 30 gün içinde bildirilecek.', translation: 'Результат сообщат в течение 30 дней.',
        options: ['Teşekkür ederim.', 'Tamam.', 'Anlamıyorum.'], correct: 0, explanation: '"Teşekkür ederim" — Спасибо' },
    ]
  },
  {
    id: 'school',
    title: 'Дети в школе',
    icon: '🏫',
    description: 'Записываем ребёнка и общаемся с учителем',
    steps: [
      { type: 'info', text: '🏫 Государственные школы в Турции бесплатные. Иностранные дети могут учиться при наличии ВНЖ и документов.' },
      { type: 'dialog', speaker: 'Директор', text: 'Çocuğunuz kaç yaşında?', translation: 'Сколько лет вашему ребёнку?',
        options: ['Sekiz yaşında.', 'Bilmiyorum.', 'Tamam.'], correct: 0, explanation: '"Sekiz" — восемь; "-yaşında" — в возрасте ...' },
      { type: 'phrase', tr: 'Hangi belgelere ihtiyacımız var?', ru: 'Какие нужны документы?', transcription: 'ХАНГИ БЕЛГЕЛЕРЕ ИХТИЙАДЖЫМЫЗ ВАР' },
      { type: 'dialog', speaker: 'Учитель', text: 'Türkçesi nasıl?', translation: 'Как его турецкий?',
        options: ['Başlangıç seviyesinde.', 'İyi.', 'Bilmiyorum.'], correct: 0, explanation: '"Başlangıç seviyesinde" — на начальном уровне' },
      { type: 'info', text: '📚 В первый месяц ребёнку назначают "uyum sınıfı" — адаптационный класс для изучения турецкого.' },
      { type: 'dialog', speaker: 'Учитель', text: 'Veli toplantısı Cuma günü.', translation: 'Родительское собрание в пятницу.',
        options: ['Geleceğim, teşekkürler.', 'Tamam.', 'Hayır.'], correct: 0, explanation: '"Geleceğim" — я приду; "-ceğim" — будущее время' },
    ]
  },
  {
    id: 'work',
    title: 'Работа',
    icon: '💼',
    description: 'Проходим собеседование',
    steps: [
      { type: 'info', text: '💼 Иностранцам в Турции нужно разрешение на работу (çalışma izni). Его оформляет работодатель через Министерство труда.' },
      { type: 'dialog', speaker: 'HR', text: 'Kendinizden bahseder misiniz?', translation: 'Расскажите о себе.',
        options: ['Ben yazılımcıyım, 5 yıllık deneyimim var.', 'Bilmiyorum.', 'Tamam.'], correct: 0, explanation: '"Deneyimim var" — у меня есть опыт' },
      { type: 'phrase', tr: 'Maaş beklentim ... lira.', ru: 'Мои ожидания по зарплате ... лир.', transcription: 'МАASH БЕКЛЕНТИМ ... ЛИРА' },
      { type: 'dialog', speaker: 'HR', text: 'Türkçeniz nasıl?', translation: 'Как ваш турецкий?',
        options: ['Orta seviye, gelişiyor.', 'Çok iyi.', 'Yok.'], correct: 0, explanation: '"Orta seviye" — средний уровень; "gelişiyor" — развивается' },
      { type: 'info', text: '📋 Испытательный срок (deneme süresi) в Турции обычно 2 месяца. Увольнение в этот период — без выходного пособия.' },
      { type: 'dialog', speaker: 'HR', text: 'Ne zaman işe başlayabilirsiniz?', translation: 'Когда можете приступить к работе?',
        options: ['İki hafta sonra.', 'Yarın.', 'Bilmiyorum.'], correct: 0, explanation: '"İki hafta sonra" — через две недели' },
    ]
  },
  {
    id: 'emergency',
    title: 'Срочная ситуация',
    icon: '🆘',
    description: 'Обращаемся за помощью',
    steps: [
      { type: 'info', text: '🆘 Экстренные номера в Турции: 112 — скорая/пожарные, 155 — полиция, 156 — жандармерия, 110 — пожарные.' },
      { type: 'dialog', speaker: 'Прохожий', text: 'İyi misiniz? Yardım lazım mı?', translation: 'Вы в порядке? Нужна помощь?',
        options: ['Yardım edin lütfen!', 'İyiyim.', 'Tamam.'], correct: 0, explanation: '"Yardım edin" — помогите; "-in" — повелительная форма множества' },
      { type: 'phrase', tr: 'Ambulans çağırın, lütfen!', ru: 'Вызовите скорую, пожалуйста!', transcription: 'АМБУЛАНС ЧАЙЫРЫН, ЛЮТFЕН' },
      { type: 'dialog', speaker: 'Оператор 112', text: 'Neredesiniz?', translation: 'Где вы находитесь?',
        options: ['Kapalıçarşı yakınında.', 'Bilmiyorum.', 'Tamam.'], correct: 0, explanation: 'Назовите ближайший ориентир. "Yakınında" — рядом с ...' },
      { type: 'info', text: '🏥 Иностранцам с турецской страховкой (SGK или частная) скорая помощь оказывается бесплатно.' },
      { type: 'dialog', speaker: 'Полиция', text: 'Pasaportunuzu görebilir miyim?', translation: 'Могу увидеть ваш паспорт?',
        options: ['Tabii, buyurun.', 'Hayır.', 'Bilmiyorum.'], correct: 0, explanation: '"Tabii, buyurun" — конечно, пожалуйста' },
    ]
  },
];

// ─── PLAN_30 — 30-дневный план ───────────────────────────────

const PLAN_30 = [
  {
    week: 1,
    theme: 'Выживаю в Турции',
    color: '#E30A17',
    days: [
      { day: 1,  topic: 'Приветствия и знакомство',    type: 'vocab',    focus: 'Группа 5 (merhaba, evet, hayır, lütfen)' },
      { day: 2,  topic: 'Цифры 1–20',                  type: 'vocab',    focus: 'Числа, цены, возраст' },
      { day: 3,  topic: 'Базовые глаголы',              type: 'vocab',    focus: 'Группа 1 (olmak, istemek, gitmek)' },
      { day: 4,  topic: 'В магазине',                   type: 'scenario', focus: 'Сценарий: В магазине' },
      { day: 5,  topic: 'Прилагательные',               type: 'vocab',    focus: 'Группа 4 (büyük, pahalı, iyi)' },
      { day: 6,  topic: 'Повторение недели',             type: 'review',   focus: 'SRS: слова 1–30' },
      { day: 7,  topic: 'Аудит прогресса',              type: 'audit',    focus: 'Проверяем статистику' },
    ]
  },
  {
    week: 2,
    theme: 'Обустраиваю жизнь',
    color: '#D97706',
    days: [
      { day: 8,  topic: 'Транспорт',                    type: 'vocab',    focus: 'otobüs, metro, taksi + сценарий' },
      { day: 9,  topic: 'Жильё',                        type: 'scenario', focus: 'Сценарий: Снимаем квартиру' },
      { day: 10, topic: 'Глаголы действий',             type: 'vocab',    focus: 'Группа 2 (yemek, içmek, ödemek)' },
      { day: 11, topic: 'В банке',                      type: 'scenario', focus: 'Сценарий: В банке' },
      { day: 12, topic: 'Существительные — город',      type: 'vocab',    focus: 'Группа 3 (banka, hastane, market)' },
      { day: 13, topic: 'Повторение недели',             type: 'review',   focus: 'SRS: слова 31–90' },
      { day: 14, topic: 'Аудит прогресса',              type: 'audit',    focus: 'Отмечаем достижения' },
    ]
  },
  {
    week: 3,
    theme: 'Работаю и общаюсь',
    color: '#059669',
    days: [
      { day: 15, topic: 'У врача',                      type: 'scenario', focus: 'Сценарий: У врача' },
      { day: 16, topic: 'Фразы разговорника',           type: 'vocab',    focus: 'Категория: Работа' },
      { day: 17, topic: 'Собеседование',                type: 'scenario', focus: 'Сценарий: Работа' },
      { day: 18, topic: 'В ресторане',                  type: 'scenario', focus: 'Сценарий: В ресторане' },
      { day: 19, topic: 'Наречия и время',              type: 'vocab',    focus: 'Группа 5 (bugün, yarın, şimdi)' },
      { day: 20, topic: 'Повторение недели',             type: 'review',   focus: 'SRS: слова 91–150' },
      { day: 21, topic: 'Аудит прогресса',              type: 'audit',    focus: 'Половина пути!' },
    ]
  },
  {
    week: 4,
    theme: 'Чувствую себя как дома',
    color: '#7C3AED',
    days: [
      { day: 22, topic: 'ВНЖ / Икамет',                type: 'scenario', focus: 'Сценарий: ВНЖ' },
      { day: 23, topic: 'Дети в школе',                 type: 'scenario', focus: 'Сценарий: Школа' },
      { day: 24, topic: 'Все разговорные фразы',        type: 'vocab',    focus: 'Срочные и экстренные' },
      { day: 25, topic: 'Срочная ситуация',             type: 'scenario', focus: 'Сценарий: Помощь' },
      { day: 26, topic: 'Финальный квиз',               type: 'review',   focus: 'Все 150 слов' },
      { day: 27, topic: 'Слабые места',                 type: 'review',   focus: 'Урок на ошибки' },
      { day: 28, topic: 'Все сценарии',                 type: 'scenario', focus: 'Любой пропущенный' },
      { day: 29, topic: 'Финальный аудит',              type: 'audit',    focus: 'Полная статистика' },
      { day: 30, topic: '🎉 Финиш!',                    type: 'audit',    focus: 'Праздник и новые цели' },
    ]
  },
];

// ─── ACHIEVEMENTS ─────────────────────────────────────────────

const ACHIEVEMENTS = [
  { id: 'first_lesson',   icon: '🎯', title: 'Первый шаг',      desc: 'Завершить первый урок' },
  { id: 'perfect_lesson', icon: '💎', title: 'Идеальный урок',  desc: 'Пройти урок без ошибок' },
  { id: 'lessons_5',      icon: '📚', title: '5 уроков',        desc: 'Завершить 5 уроков' },
  { id: 'lessons_10',     icon: '🔟', title: '10 уроков',       desc: 'Завершить 10 уроков' },
  { id: 'lessons_30',     icon: '🏆', title: '30 уроков',       desc: 'Завершить 30 уроков' },
  { id: 'streak_3',       icon: '🔥', title: '3 дня подряд',    desc: 'Учиться 3 дня без перерыва' },
  { id: 'streak_7',       icon: '⚡', title: 'Неделя!',         desc: '7 дней стрика' },
  { id: 'streak_30',      icon: '🌟', title: 'Месяц!',          desc: '30 дней стрика' },
  { id: 'scenario_first', icon: '🎭', title: 'Актёр',           desc: 'Пройти первый сценарий' },
  { id: 'scenarios_all',  icon: '🎪', title: 'Все сценарии',    desc: 'Пройти все сценарии' },
  { id: 'vnj_done',       icon: '🏛️', title: 'Икамет',          desc: 'Пройти сценарий "ВНЖ"' },
  { id: 'weak_conquered', icon: '💪', title: 'Преодоление',     desc: 'Пройти урок на слабые места' },
  { id: 'xp_500',         icon: '⭐', title: '500 XP',          desc: 'Набрать 500 очков опыта' },
  { id: 'xp_2000',        icon: '🥇', title: '2000 XP',         desc: 'Набрать 2000 очков опыта' },
  { id: 'level_5',        icon: '🚀', title: 'Уровень 5',       desc: 'Достичь 5 уровня' },
];

// ─── FEEDBACK PHRASES (при верном ответе) ─────────────────────

const CORRECT_PHRASES = [
  'Doğru! Правильно!',
  'Bravo! Молодец!',
  'Harika! Отлично!',
  'Süper! Супер!',
  'Evet! Да, верно!',
  'Mükemmel! Превосходно!',
  'Çok iyi! Очень хорошо!',
];

// Compatibility alias: app.js uses VERBS, data uses WORDS
const VERBS = WORDS.map(w => ({
  ...w,
  infinitive: w.tr,
  example: w.example ? { greek: w.example.tr, ru: w.example.ru } : undefined
}));

// Empty stubs for Greek-specific structures not used in Turkish
const VOCAB_CATEGORIES = [];
const QUIZ_CATEGORIES  = [];
