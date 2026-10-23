import { BeerBottle, Sauce, CommunityComment, Milestone } from '../types';

export const INITIAL_BEERS: BeerBottle[] = [
  {
    id: 1,
    name: '«Мужская Солидарность» IPA',
    style: 'Double Dry-Hopped IPA',
    abv: '6.8%',
    opened: true,
    color: 'from-amber-500 to-amber-700',
    description: 'Настоено на 10 000 братских лайках. Хмелевой удар прямо в сердце скептицизма.',
    tagline: 'Первая открытая бутылка за победу!',
    toast: 'За тех, кто лайкнул не глядя в 3 часа ночи!'
  },
  {
    id: 2,
    name: '«Обещание Сдержано» Pilsner',
    style: 'Classic Bohemian Pilsner',
    abv: '4.9%',
    opened: false,
    color: 'from-yellow-400 to-amber-600',
    description: 'Кристально чистый вкус честного семейного договора. Горчинка сглажена любовью.',
    tagline: 'Жена сказала — жена купила.',
    toast: 'За золотых жён, которые держат слово!'
  },
  {
    id: 3,
    name: '«Та Самая Картошка» Golden Ale',
    style: 'Crispy Blonde Ale',
    abv: '5.2%',
    opened: false,
    color: 'from-amber-400 to-orange-500',
    description: 'Идеальный аккомпанемент к горячей хрустящей картошечке фри на заднем плане.',
    tagline: 'Соль, масло, пенное и счастье.',
    toast: 'За картошку фри, затмившую ящик пива!'
  },
  {
    id: 4,
    name: '«Ударный Лайкопад» Wheat Beer',
    style: 'Bavarian Hefeweizen',
    abv: '5.4%',
    opened: false,
    color: 'from-yellow-300 to-amber-500',
    description: 'Ноты банана, гвоздики и внезапного осознания, что пост залетел в топ.',
    tagline: 'Мы думали наберем 20 лайков...',
    toast: 'За алгоритмы рекомендаций и силу братства!'
  },
  {
    id: 5,
    name: '«Святая Женщина» Stout',
    style: 'Imperial Oatmeal Stout',
    abv: '8.2%',
    opened: false,
    color: 'from-amber-900 to-stone-900',
    description: 'Глубокий шоколадно-кофейный бархат. Редчайший экземпляр в семейной фауне.',
    tagline: 'Береги её как зеницу ока!',
    toast: 'Поднимите бокалы за понимание и уют в доме!'
  },
  {
    id: 6,
    name: '«Сырный Соус» Amber Lager',
    style: 'Vienna Amber Lager',
    abv: '5.0%',
    opened: false,
    color: 'from-orange-500 to-red-700',
    description: 'Карамельный солод с легкой корочкой, созданный для макания фри прямо в кадр.',
    tagline: 'Двойная порция соуса одобрена.',
    toast: 'За тех, кто всегда берет дополнительный соус!'
  },
  {
    id: 7,
    name: '«Пятничный Релакс» APA',
    style: 'American Pale Ale',
    abv: '5.5%',
    opened: false,
    color: 'from-amber-500 to-yellow-600',
    description: 'Цитрусовый аромат свободы, когда рабочий день закрыт, а ящик уже дома.',
    tagline: 'Никаких созвонов до понедельника.',
    toast: 'За выходные без будильников!'
  },
  {
    id: 8,
    name: '«Взгляд Жены на Кассе» Sour Ale',
    style: 'Raspberry Kettle Sour',
    abv: '4.5%',
    opened: false,
    color: 'from-rose-500 to-pink-700',
    description: 'Кисло-сладкий баланс: с одной стороны удивление от чека, с другой — улыбка.',
    tagline: '«Ладно, тащи свой ящик...»',
    toast: 'За моменты, когда любовь побеждает жабу!'
  },
  {
    id: 9,
    name: '«Диванный Эксперт» Trappist',
    style: 'Belgian Dubbel',
    abv: '7.0%',
    opened: false,
    color: 'from-amber-800 to-amber-950',
    description: 'Насыщенный вкус многовековых традиций комментирования чужих постов в интернете.',
    tagline: 'Одобрено советом мужиков.',
    toast: 'За тех, кто поддержал в комментариях!'
  },
  {
    id: 10,
    name: '«Хруст на Весь Дом» Cider',
    style: 'Crisp Apple Craft Cider',
    abv: '5.1%',
    opened: false,
    color: 'from-lime-500 to-amber-500',
    description: 'Освежающий яблочный хруст, повторяющий звон первой фришки из фритюра.',
    tagline: 'Слышно даже соседям.',
    toast: 'За свежесть и громкий аппетитный хруст!'
  },
  {
    id: 11,
    name: '«Второй Заход» Red Ale',
    style: 'Irish Red Ale',
    abv: '5.3%',
    opened: false,
    color: 'from-red-600 to-amber-800',
    description: '«А может теперь на Playstation налайкаем?» — вопрос, повисший в воздухе.',
    tagline: 'Главное вовремя остановиться (нет).',
    toast: 'За смелость идти дальше!'
  },
  {
    id: 12,
    name: '«Братский Репост» Kolsch',
    style: 'Cologne Style Kolsch',
    abv: '4.8%',
    opened: false,
    color: 'from-amber-300 to-yellow-500',
    description: 'Легкое, питкое, распространяющееся со скоростью ссылки в семейный чат.',
    tagline: 'Скинул другу — помог мужику.',
    toast: 'За настоящую дружбу и солидарность!'
  }
];

export const SAUCES: Sauce[] = [
  {
    id: 'cheese',
    name: 'Теплый Сырный Чеддер',
    color: 'bg-amber-400 text-amber-950 border-amber-300',
    description: 'Густой, тягучий, как вечер пятницы.',
    icon: '🧀'
  },
  {
    id: 'garlic',
    name: 'Чесночно-Сливочный с Зеленью',
    color: 'bg-emerald-100 text-emerald-950 border-emerald-300',
    description: 'Аромат, отпугивающий плохие мысли.',
    icon: '🧄'
  },
  {
    id: 'truffle',
    name: 'Трюфельный Айоли',
    color: 'bg-stone-200 text-stone-900 border-stone-300',
    description: 'Премиальный дип для ценителей высокой кухни на диване.',
    icon: '🍄'
  },
  {
    id: 'bbq',
    name: 'Копченый Барбекю',
    color: 'bg-red-800 text-white border-red-900',
    description: 'Дымок костра и сладковатая пикантность.',
    icon: '🔥'
  },
  {
    id: 'ketchup',
    name: 'Классический Кетчуп с Травами',
    color: 'bg-red-500 text-white border-red-400',
    description: 'База, проверенная поколениями.',
    icon: '🍅'
  }
];

export const INITIAL_COMMENTS: CommunityComment[] = [
  {
    id: 'c1',
    author: 'Алексей_Сварщик',
    avatar: '👨‍🏭',
    timeAgo: '12 минут назад',
    text: 'Мужик, жму руку! Моя на 500 лайков обещала только суп разогреть. Твоя жена — золото высшей пробы, береги её!',
    likes: 342,
    badge: 'Топ-комментатор'
  },
  {
    id: 'c2',
    author: 'Картофельный_Барон',
    avatar: '🍟',
    timeAgo: '28 минут назад',
    text: 'Я смотрю не на пиво, а на эту картошечку на заднем плане... Она там лежит, хрустит, манит! За фриху отдельный лайкос! 🤤',
    likes: 519,
    badge: 'Истинный гурман'
  },
  {
    id: 'c3',
    author: 'Сергей_Гараж_77',
    avatar: '🔧',
    timeAgo: '1 час назад',
    text: 'Ребята, мы в гараже всем кооперативом проголосовали! Пиво заслужил честно. Теперь ждём пост «Лайкните, чтоб отпустила на рыбалку на 3 дня» 😂',
    likes: 890,
    badge: 'Братский союз'
  },
  {
    id: 'c4',
    author: 'Екатерина (Жена)',
    avatar: '👑',
    timeAgo: '2 часа назад',
    text: 'Ребята, я честно не ожидала, что вы так оперативно накидаете! Пришлось тащить ящик из багажника. Но картошку из тарелки я ему не всю отдам, половина моя! 😉',
    likes: 2450,
    badge: 'Героиня дня'
  },
  {
    id: 'c5',
    author: 'Дмитрий_IT',
    avatar: '💻',
    timeAgo: '3 часа назад',
    text: 'Написал скрипт, накрутил ещё 100 лайков на будущее. Мужская солидарность не знает багов и ограничений!',
    likes: 204
  }
];

export const MILESTONES: Milestone[] = [
  {
    likesRequired: 100,
    title: 'Первые сомнения жены',
    description: 'Жена заглянула в телефон: «Хм, неужели наберут?»',
    icon: '👀',
    unlocked: true
  },
  {
    likesRequired: 500,
    title: 'Поход в гипермаркет',
    description: 'Жена берет большую тележку и направляется в пивной отдел.',
    icon: '🛒',
    unlocked: true
  },
  {
    likesRequired: 1000,
    title: 'ЯЩИК КУПЛЕН!',
    description: 'Тот самый момент триумфа! 20 бутылок холодного пенного доставлены на базу.',
    icon: '🍻',
    unlocked: true
  },
  {
    likesRequired: 2500,
    title: 'Картошка фри в кадре!',
    description: 'Свежеобжаренная золотистая картошечка прибыла в качестве бонуса.',
    icon: '🍟',
    unlocked: false
  },
  {
    likesRequired: 5000,
    title: 'Статус: «Золотая Семья»',
    description: 'История вошла в анналы интернета. Приз зрительских симпатий.',
    icon: '🏆',
    unlocked: false
  }
];

export const FUNNY_TOASTS = [
  'За любовь, которая измеряется не словами, а литрами!',
  'За картошку с идеальным хрустом и пиво с правильной пеной!',
  'За интернет, который иногда объединяет ради по-настоящему великих дел!',
  'За жену с чувством юмора и стальными нервами!',
  'Пусть холодильник никогда не пустеет, а фритюрница не остывает!'
];
