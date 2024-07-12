export default {
  co2disclaimer: `Благодаря этому заказу вы сэкономите <strong>{{ co2 }}\xa0кг</strong> выбросов CO2, <strong>{{ ch4 }}\xa0кг</strong> выбросов CH4 и <strong>{{ water }}\xa0л</strong> воды`,
  co2disclaimerShort: `Благодаря этому заказу вы сэкономите <strong>{{ co2 }}\xa0кг</strong> выбросов CO2 и <strong>{{ water }}\xa0л</strong> воды`,
  placeholder: {
    title: 'Ваша корзина пуста',
    text: 'Не торопитесь и изучите наш каталог, чтобы найти подходящие для вас ткани',
    visitCatalog: 'Перейти в каталог',
    visitOrders: 'К списку заказов',
  },
  card: {
    total: 'Сумма',
    delete: 'Удалить из корзины',
    edit: 'Редактировать',
    sold: 'Нет в наличии',
    disclaimer: 'Обратите внимание, эта ткань состоит из нескольких отрезов:',
    sample: 'Образец',
  },
  titles: {
    main: 'Корзина',
    changed: 'Есть изменения',
    sold: 'Нет в наличии',
    samples: 'Образцы',
    delivery: 'Расчет доставки',
  },
  promoCode: {
    found:
      'Данный промокод дает вам скидку в <strong>{{ currentDiscount }}</strong>. Финальная цена будет сформирована менеджером, он свяжется с вами после подтверждений заказа</strong>',
    placeholder: 'Введите промокод',
    applyPromo: 'Применить промокод',
    removePromo: 'Удалить промокод',
    error: 'Промокод не действителен',
    info: 'Промокод применен. Финальная цена будет сформирована менеджером, он свяжется с вами после подтверждения заказа',
  },
  checkout: {
    placeholder: {
      title: 'Заказ не найден или уже обрабатывается',
      text: 'Попробуйте найти его в списке заказов или обратитесь к менеджеру',
    },
    title: 'Ваш заказ',
    count: 'Всего тканей',
    cutsCount: 'Всего отрезов',
    cutsDisclaimer: 'Обратите внимание, в вашей корзине есть ткань, состоящая из нескольких отрезов',
    meters: 'Всего метров',
    weight: 'Вес',
    total: 'Итого',
    confirm: 'Подтвердить заказ',
    manager: 'Связаться с менеджером',
    delivery: 'Стоимость доставки',
    minimumOrder: 'Минимальная сумма заказа',
    save: 'Оформить заказ',

    deliveryData: {
      title: 'Оформление заказа',
      label: 'Параметры доставки',
    },
    warehouse: 'Адрес склада: 144 Allée des Caillotières, 69400 Gleizé, France',
    dimensions: 'Габариты',
    offer: 'Транспортная компания',
    offerNotFound: 'Варианты доставки не найдены',
    backToCart: 'Назад в корзину',
    next: 'Далее',
    pay: 'Оплатить',
  },
  info: `К сожалению, некоторые из добавленных вами тканей в настоящее время недоступны для заказа или изменилось их доступное наличие. Если у вас возникли вопросы или проблемы, пожалуйста, обращайтесь в нашу службу поддержки клиентов.`,
  clearCart: 'Очистить корзину',
  thanks: {
    title: `Спасибо за заказ!`,
    text: `Ваш заказ был успешно подтверждён. В ближайшее время с вами свяжется наш менеджер для согласования деталей.`,
  },
  confirmation: {
    title: 'Ваш заказ принят',
    text: 'Для оперативного выставления счета заполните форму ниже.',
    manager: 'Связаться с менеджером',
    toOrders: 'К списку заказов',
    toCatalog: 'В каталог',
    firstName: {
      label: 'Имя',
    },
    secondName: {
      label: 'Фамилия',
    },
    delivery: {
      label: 'Доставка',
      description: 'Укажите страну, город, адрес и индекс на который будет осуществляться доставка',
      country: {
        label: 'Страна доставки',
      },
      city: {
        label: 'Город доставки',
      },
      address: {
        label: 'Адрес доставки',
      },
      zipCode: {
        label: 'Индекс',
      },
    },
    invoice: {
      label: 'Адрес выставления счета',
      description: 'Укажите страну, город, адрес и индекс на который будет выставлен счёт',
      country: {
        label: 'Страна',
      },
      city: {
        label: 'Город',
      },
      address: {
        label: 'Адрес',
      },
      zipCode: {
        label: 'Индекс',
      },
      sameAddress: 'Совпадает с адресом доставки',
    },
    paymentMethod: {
      label: 'Способ оплаты',
      description: 'Выберите предпочтительный способ оплаты заказа',
    },
    deliveryMethod: {
      label: 'Способ доставки',
    },
    packageType: {
      label: 'Вид упаковки',
    },
    companyName: {
      label: 'Название компании(если она есть)',
    },
    vat: {
      label: 'Номер НДС',
      description: 'Введите ваш номер НДС здесь, если он есть',
    },
    saveButton: 'Сохранить',
  },
};
