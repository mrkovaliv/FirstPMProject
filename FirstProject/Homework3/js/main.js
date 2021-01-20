window.addEventListener('DOMContentLoaded', () => {
    let currentOfPage = 'UAH';
    if (CURRENCY && isString(CURRENCY)) {
        if (CURRENCY == 'RUB') {
            currentOfPage = 'RUB'
        }
        else if (CURRENCY == 'USD') {
            currentOfPage = 'USD'
        }
    }
    function exchangeMoney(from, money) {
        let usd = 1,
        rub = 1,
        uan = 1;
    if (typeof CURRENCY_EXCHANGE != "undefined" && !isEmpty(CURRENCY_EXCHANGE)) {
                for (key in  CURRENCY_EXCHANGE) {
                    if (key == 'USD' && typeof(CURRENCY_EXCHANGE[key])  == 'number' && typeof(CURRENCY_EXCHANGE[key])  == 'number' && !isNaN(CURRENCY_EXCHANGE[key])) {
                        usd = CURRENCY_EXCHANGE[key];
                    }
                    if (key == 'RUB' && typeof(CURRENCY_EXCHANGE[key])  == 'number' && typeof(CURRENCY_EXCHANGE[key])  == 'number' && !isNaN(CURRENCY_EXCHANGE[key])) {
                        rub = CURRENCY_EXCHANGE[key];
                    }
                    if (key == 'UAH' && typeof(CURRENCY_EXCHANGE[key])  == 'number' && typeof(CURRENCY_EXCHANGE[key])  == 'number' && !isNaN(CURRENCY_EXCHANGE[key])) {
                        uan = CURRENCY_EXCHANGE[key];
                    }
                }   
    }
    if (from == 'USD') {
        return (money*usd).toFixed(1);
    }
    else if (from == 'UAH') {
        return (money*uan).toFixed(1);
        
    }
    else if (from == 'RUB') {
        return (money*rub).toFixed(1);
        
    } else {
        return money;
    }


    }

    // block 1
    function isEmpty(obj) {
        for (let key in obj) {
            return false;
        }
        return true;
    }

    function isString(str) {
        if (typeof str === 'string' || str instanceof String) {
            return true;
        } else {
            return false;
        }
    }

    function isCorectDate(date) {
        if (date.length == 10) {
            let rez = date.match(/20[12][0-9]\/((0[1-9])|(1[0-2]))\/((0[1-9])|([12][0-9])|(3[01]))/g);
            if (rez) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }


    function showHeader() {

        function closeBlock() {
            headerTop.style.display = 'none';
        }
        const menuBlock = document.querySelector('.menu-list');
        const headerTop = document.querySelector('.header');


        if (typeof TOP_MENU != "undefined" && !isEmpty(TOP_MENU)) {
            let topMenuCount = 0;
            let cond = true;
            for (key in TOP_MENU) {
                //тут я задаю деяким елементам дефолтні значення
                let order,
                    title = 'default',
                    submenu,
                    url = '#';

                if (!isEmpty(TOP_MENU[key])) {
                    for (i in TOP_MENU[key]) {
                        if (i == 'order') {
                            order = TOP_MENU[key][i];
                        }
                        if (i == 'title' && TOP_MENU[key][i] != '' && isString(TOP_MENU[key][i])) {
                            title = TOP_MENU[key][i];

                        }
                        if (i == 'submenu') {
                            submenu = TOP_MENU[key][i];

                        }
                        if (i == 'url' && TOP_MENU[key][i] != '' && isString(TOP_MENU[key][i])) {
                            url = TOP_MENU[key][i];
                        }
                    }

                    if (topMenuCount == 9) {
                        break;
                    }

                    cond = false;
                    createTopMenuElement(order, title, submenu, url);
                    topMenuCount++;
                }
            }
            if (cond) {
                closeBlock();
            }

        } else {
            closeBlock();
        }

        function createTopMenuElement(order, title, submenu, url) {
            const elemLi = document.createElement('li');
            const elemA = document.createElement('a');
            elemLi.classList.add('menu-list__item');
            elemA.classList.add('menu-list__link');
            elemA.href = url;
            elemA.innerHTML = title;
            if (order && Number.isInteger(order)) {
                elemLi.style.order = order;
            }
            if (submenu && submenu.length > 0) {
                elemLi.classList.add('menu-list__catalog');
                const catalogList = document.createElement('ul');
                catalogList.classList.add('catalog-list');
                //тут я задаю деяким елементам дефолтні значення
                let catalogOrder,
                    catalogTitle = 'default',
                    catalogUrl = '#';
                for (cItem of submenu) {
                    if (!isEmpty(cItem)) {
                        for (i in cItem) {
                            if (i == 'order') {
                                catalogOrder = cItem[i];
                            }
                            if (i == 'title' && cItem[i] != '' && isString(cItem[i])) {
                                catalogTitle = cItem[i];

                            }
                            if (i == 'url' && cItem[i] != '' && isString(cItem[i])) {
                                catalogUrl = cItem[i];
                            }
                        }
                        const catalogLi = document.createElement('li');
                        const catalogA = document.createElement('a');
                        catalogA.innerHTML = catalogTitle;
                        catalogA.url = catalogUrl;
                        catalogLi.classList.add('catalog-list__item');
                        catalogA.classList.add('catalog-list__link');
                        if (catalogOrder && Number.isInteger(order)) {
                            catalogLi.style.order = catalogOrder;
                        }
                        catalogLi.append(catalogA);
                        catalogList.append(catalogLi);
                        elemLi.append(catalogList);
                    }
                }
            }
            elemLi.append(elemA);
            menuBlock.append(elemLi);

        }
    }
    showHeader();
    // block 3

    function showBlock3() {
        menuBlock = document.querySelector('.extra-list__menu');
        if (typeof MENU != "undefined" && MENU.length > 0) {

            for (key in MENU) {
                //тут я задаю деяким елементам дефолтні значення
                let order,
                    title = 'default',
                    url = '#';

                if (!isEmpty(MENU[key])) {
                    for (i in MENU[key]) {
                        if (i == 'order') {
                            order = MENU[key][i];
                        }
                        if (i == 'title' && MENU[key][i] != '' && isString(MENU[key][i])) {
                            title = MENU[key][i];

                        }
                        if (i == 'url' && MENU[key][i] != '' && isString(MENU[key][i])) {
                            url = MENU[key][i];
                        }
                    }

                    createExtraElement(order, title, url);
                }
            }

        } else {
            extraBlock = document.querySelector('.extra-list');
            extraBlock.style.display = 'none';

        }

        function createExtraElement(order, title, url) {
            const elemLi = document.createElement('li');
            const elemA = document.createElement('a');
            elemLi.classList.add('extra-list__item');
            elemA.classList.add('extra-list__link');
            elemA.href = url;
            elemA.innerHTML = title;
            if (order && Number.isInteger(order)) {
                elemLi.style.order = order;
            }
            elemLi.append(elemA);
            menuBlock.append(elemLi);

        }



    }
    showBlock3();

    // show block 4
    function showNews() {

        function getMonth(month) {
            switch (month) {
                case '01':
                    return 'Января';
                case '02':
                    return 'Февраля';
                case '03':
                    return 'Марта';
                case '04':
                    return 'Апреля';
                case '05':
                    return 'Мая';
                case '06':
                    return 'Июня';
                case '07':
                    return 'Июля';
                case '08':
                    return 'Августа';
                case '09':
                    return 'Сентября';
                case '10':
                    return 'Октября';
                case '11':
                    return 'Ноября';
                case '12':
                    return 'Декабря';
            }
        }

        let newsBlock = document.querySelector('.news');

        function closeBlock() {
            newsBlock.style.display = 'none';
        }
        if (typeof NEWS != "undefined" && NEWS.length > 0) {

            let cond = true;
            for (key in NEWS) {
                //тут я задаю деяким елементам дефолтні значення
                let date = '2021/01/01',
                    title = 'default',
                    description = '',
                    img = './images/news-img1.jpg',
                    url = '#';

                if (!isEmpty(NEWS[key])) {
                    for (i in NEWS[key]) {
                        if (i == 'date' && NEWS[key][i] != '' && isString(NEWS[key][i]) && isCorectDate(NEWS[key][i])) {
                            date = NEWS[key][i];
                        }
                        if (i == 'title' && NEWS[key][i] != '' && isString(NEWS[key][i])) {
                            title = NEWS[key][i];

                        }
                        if (i == 'url' && NEWS[key][i] != '' && isString(NEWS[key][i])) {
                            url = NEWS[key][i];
                        }
                        if (i == 'description' && NEWS[key][i] != '' && isString(NEWS[key][i])) {
                            description = NEWS[key][i];
                        }
                        if (i == 'img' && NEWS[key][i] != '' && isString(NEWS[key][i])) {
                            img = NEWS[key][i];
                        }
                    }
                    cond = false;
                    createNewsElement(date, title, description, img, url);
                }
            }
            if (cond) {
                closeBlock();
            }

        } else {
            closeBlock();
        }

        function createNewsElement(date, title, description, img, url) {
            const newsList = document.querySelector('.news__list');
            const elemLi = document.createElement('li');
            const left = document.createElement('div');
            const leftDate = document.createElement('div');
            const leftDay = document.createElement('span');
            const leftImg = document.createElement('img');
            const right = document.createElement('div');
            const rightLink = document.createElement('a');
            const rightDescr = document.createElement('p');

            elemLi.classList.add('news__list-item');
            left.classList.add('news__list-left')
            leftDate.classList.add('news__list-date')
            leftImg.classList.add('news__list-img')
            right.classList.add('news__list-right')
            rightLink.classList.add('news__list-link')
            rightDescr.classList.add('news__list-text')
            leftDay.innerHTML = date[8] + date[9];
            leftDate.innerHTML = getMonth(date[5] + date[6]);
            leftDate.prepend(leftDay);

            leftImg.src = img;
            leftImg.alt = 'foto'
            rightLink.href = url;
            rightLink.innerHTML = title;
            rightDescr.innerHTML = description;
            right.append(rightLink);
            right.append(rightDescr);
            left.append(leftImg);
            left.append(leftDate);
            elemLi.append(left);
            elemLi.append(right);
            newsList.append(elemLi);
        }

        function getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min; //Включаючи мінімум та максимум
        }

        function showRandomNews() {
            newsElement = document.querySelectorAll('.news__list-item');
            if (newsElement.length > 3) {
                let index1 = getRandomInt(0, newsElement.length - 1);
                let index2 = index1;
                let index3 = index1;
                while (index1 == index2) {
                    index2 = getRandomInt(0, newsElement.length - 1);
                }
                while (index1 == index3 || index2 == index3) {
                    index3 = getRandomInt(0, newsElement.length - 1);
                }

                newsElement.forEach((item) => item.style.display = 'none');
                newsElement[index1].style.display = 'flex';
                newsElement[index2].style.display = 'flex';
                newsElement[index3].style.display = 'flex';
            }
        }
        showRandomNews();
    }
    showNews();

    //block 6
function showBanner() {

    const rightBotom = document.querySelector('.right-bottom');

    function closeBlock() {
        rightBotom.style.display = 'none';
    }
    if (typeof BANNER!= "undefined" && BANNER.length > 0) {

        let cond = true;
        for (key in BANNER) {
            //тут я задаю деяким елементам дефолтні значення
            let order,
                img = 'images/default-bg.png',
                url = '#';

            if (!isEmpty(BANNER[key])) {
                for (i in BANNER[key]) {
                    if (i == 'order') {
                        order = BANNER[key][i];
                    }
                    if (i == 'url' && BANNER[key][i] != '' && isString(BANNER[key][i])) {
                        url = BANNER[key][i];
                    }
                    if (i == 'img' && BANNER[key][i] != '' && isString(BANNER[key][i])) {
                        img = BANNER[key][i];
                    }
                }
                cond = false;
                createBannerElement(order, img, url);
            }
        }
        if (cond) {
            closeBlock();
        }
    } else {
        closeBlock();
    }

    function createBannerElement(order, img, url) {
        const bannerList = document.querySelector('.right__slider'),
              dotsList = document.querySelector('.right__slider-dots'),
              elem = document.createElement('div'),
              blockLink = document.createElement('a');
              blockImg = document.createElement('img');
              blockDot = document.createElement('li');
              blockBtn = document.createElement('button');
              if (order && Number.isInteger(order)) {
                elem.style.order = order;
            }

              elem.classList.add('right__slider-item');
              blockDot.classList.add('right__slider-dot');
              blockBtn.classList.add('right__slider-btn');
              blockDot.append(blockBtn);
              dotsList.append(blockDot);
              blockLink.href = url;
              blockImg.alt = 'banner';
              blockImg.src =  img 
              blockLink.append(blockImg);
              elem.append(blockLink);
              bannerList.prepend(elem);

    }
}
showBanner();



    //blocks 7 8 9
    function getTypeArray(typeArray) {
        let rezult = [];
        if (typeof ITEMS != "undefined" && ITEMS.length > 0) {

            for (key in ITEMS) {
                if (!isEmpty(ITEMS[key])) {
                    for (i in ITEMS[key]) {
                        if (i == 'type' && ITEMS[key][i] == typeArray) {
                            rezult.push(ITEMS[key]);
                        }
                    }
                }
            }
            return rezult;
        } else {
            return rezult;
        }
    }

    function showNewGoods(type) {
        let goods = getTypeArray(type);
        goods = sortGoods(goods, type);
        if (goods.length > 0) {
            for (key in goods) {
                let date = '2029/01/01',
                    description = '',
                    img = './images/slider-img1.jpg',
                    url = '#',
                    price = '0',
                    oldPrice = '0',
                    currency = currentOfPage;
                for (i in goods[key]) {
                    if (i == 'date' && goods[key][i] != '' && isString(goods[key][i]) && isCorectDate(goods[key][i])) {
                        date = goods[key][i];
                    }
                    if (i == 'currency' && goods[key][i] != '' && isString(goods[key][i])) {
                        currency = goods[key][i];
                    }
                    if (i == 'url' && goods[key][i] != '' && isString(goods[key][i])) {
                        url = goods[key][i];
                    }
                    if (i == 'description' && goods[key][i] != '' && isString(goods[key][i])) {
                        description = goods[key][i];
                    }
                    if (i == 'img' && goods[key][i] != '' && isString(goods[key][i])) {
                        img = goods[key][i];
                    }
                    if (i == 'price' && goods[key][i] != '' && isString(goods[key][i])) {
                        price = goods[key][i];
                    }
                    if (i == 'oldPrice' && goods[key][i] != '' && isString(goods[key][i])) {
                        oldPrice = goods[key][i];
                    }
                }
                createGoodsElement(date, currency, url, description, img, price, oldPrice)
            }
        } else {
            if (type == 'new') {
                newBlock = document.querySelector('.new');
                newBlock.style.display = 'none';
            } else if (type == 'recommended') {
                recomBlock = document.querySelector('.recomendation');
                recomBlock.style.display = 'none';
            } else if (type == 'sale') {
                saleBlock = document.querySelector('.sale-product');
                saleBlock.style.display = 'none';
            }

        }

        function createGoodsElement(date, currency, url, description, img, price, oldPrice) {
            const elem = document.createElement('div');
            const iconImg = document.createElement('img');
            const blockImg = document.createElement('div');
            const goodsImg = document.createElement('img');
            const elemLink = document.createElement('a');
            const blockPrice = document.createElement('div');
            const elemNewPrice = document.createElement('span');
            const elemOldPrice = document.createElement('span');
            const lineOldPrice = document.createElement('s');
            const buyBtn = document.createElement('button');
            const moreLink = document.createElement('a');
            let money = '';
            if (currentOfPage == 'UAH') {
                money = 'грн. ';
            } else if (currentOfPage == 'RUB') {
                money = 'p. ';
            } else if (currentOfPage == 'USD') {
                money = 'дол. ';
            } else {
                money = 'грн. ';
            }

            elem.classList.add('slider__item');
            iconImg.classList.add('slider__item-icon');
            blockImg.classList.add('slider__item-img');
            elemLink.classList.add('slider__item-link');
            blockPrice.classList.add('slider__item-price');
            elemNewPrice.classList.add('new-price');
            elemOldPrice.classList.add('old-price');
            buyBtn.classList.add('slider__item-buy');
            moreLink.classList.add('slider__item-more');

            if (!isNaN(+price) && (+price) > 0) {
                price = exchangeMoney(currency, +price);
                elemNewPrice.innerHTML = price + money;
                blockPrice.innerHTML = 'Цена: ';
                blockPrice.append(elemNewPrice);
                if (!isNaN(+oldPrice) && (+oldPrice) > 0) {
                    oldPrice = exchangeMoney(currency, +oldPrice);
                    lineOldPrice.innerHTML = oldPrice + money;
                    elemOldPrice.append(lineOldPrice);
                    blockPrice.append(elemOldPrice);
                } else {
                    oldPrice = price
                }
            } else {
                buyBtn.style.display = 'none';
            }
            buyBtn.addEventListener('click', () => {
                let basketElement = document.querySelector('.top__right-name a');
                let basketPrice = document.querySelector('.top__right-name .money-span');
                let mobileBasket = document.querySelector('.top__right-basket--num');
                let currentValue = '';
                if (currentOfPage == 'UAH') {
                    currentValue = ' грн.'
            
                } 
                else if (currentOfPage == 'RUB') {
                    currentValue = ' р.'
            
                }
                else if (currentOfPage == 'USD') {
                    currentValue = ' дол.'
            
                }

                let numberOfElement = +basketElement.innerHTML;
                let priceOfElement = basketPrice.innerHTML;
                priceOfElement = parseInt(priceOfElement.replace(/\D+/g,"")) + +price;
                numberOfElement++;
                basketElement.innerHTML = numberOfElement;
                mobileBasket.innerHTML = numberOfElement;
                basketPrice.innerHTML = '/ ' + priceOfElement + currentValue; 
                
            });
            goodsImg.src = img;
            goodsImg.alt = "slider-img";
            elemLink.innerHTML = description;
            elemLink.href = url;
            moreLink.href = url;
            buyBtn.innerHTML = 'Купить';
            moreLink.innerHTML = 'Подробнее';
            blockImg.append(goodsImg);

            elem.append(iconImg);
            elem.append(blockImg);
            elem.append(elemLink);
            elem.append(blockPrice);
            elem.append(buyBtn);
            elem.append(moreLink);
            if (type == 'new') {
                iconImg.src = "./images/new-icon.png";
                document.querySelector('.new .slider-product').append(elem);

            } else if (type == 'recommended') {
                iconImg.src = "./images/like-icon.png";
                document.querySelector('.recomendation .slider-product').append(elem);
            } else if (type == 'sale') {
                iconImg.src = "./images/percent-icon.png";
                document.querySelector('.sale-product .slider-product').append(elem);
            }

        }




    }

    showNewGoods('new');
    showNewGoods('recommended');
    showNewGoods('sale');

    function sortGoods(arrayofElement, type) {
        function comparePrice(a1, a2) {
            d1 = +a1['price'];
            d2 = +a2['price'];
            if (isNaN(d1)) { 
                d1 = Infinity; 
            } else {
                d1 = exchangeMoney(a1['currency'], +a1['price']);
            }
            if (isNaN(d2)) { 
                d2 = Infinity; 
            } else {
                d2 = exchangeMoney(a2['currency'], +a2['price']);
            }
            return (d1 - d2);
        }
        function compareDiference(a1, a2) {
            d1 = (+a1['oldPrice']) - (+a1['price']); 
            d2 = +a2['oldPrice'] - +a2['price'];
            if (isNaN(d1)) { 
                d1 = 0; 
            } else {
                d1 = exchangeMoney(a1['currency'], +a1['oldPrice']) - exchangeMoney(a1['currency'], +a1['price']);
            }
            if (isNaN(d2)) {
                 d2 = 0; 
            } else {
                d2 = exchangeMoney(a2['currency'], +a2['oldPrice']) - exchangeMoney(a2['currency'], +a2['price']);
            }
            return (d2 - d1);
        }
        function compareDate(a1, a2) {
            d1 = a1['date'];
            d2 = a2['date']
            function clearData(i1) {
                if (+i1[0] == 0) {
                    return +i1[1];
                } else {
                    return +i1;
                }
            }
            const year1 = +(d1[0] + d1[1] + d1[2] + d1[3]),
                year2 = +(d2[0] + d2[1] + d2[2] + d2[3]),
                month1 = clearData(d1[5] + d1[6]),
                month2 = clearData(d2[5] + d2[6]),
                day1 = clearData(d1[8] + d1[9]),
                day2 = clearData(d2[8] + d2[9]);
            if (year1 != year2) {
                return year1 - year2;
            } else {
                if (month1 != month2) {
                    return month1 - month2;
                } else {
                    return day1 - day2;
                }
            }
        }
        if (arrayofElement.length > 0) {
            for (key in arrayofElement) {
                let date = '2029/01/01',
                    price = '0',
                    oldPrice = '0';
                for (i in arrayofElement[key]) {
                    if (i == 'date' && arrayofElement[key][i] != '' && isString(arrayofElement[key][i]) && isCorectDate(arrayofElement[key][i])) {
                        date = arrayofElement[key][i];
                    }
                    if (i == 'price' && arrayofElement[key][i] != '' && isString(arrayofElement[key][i])) {
                        price = arrayofElement[key][i];
                    }
                    if (i == 'oldPrice' && arrayofElement[key][i] != '' && isString(arrayofElement[key][i])) {
                        oldPrice = arrayofElement[key][i];
                    }
                }
            }
        } else {
            return [];
        }
        if (type == 'new') {
            arrayofElement = arrayofElement.sort(compareDate);
        } else if (type == 'recommended') {
            arrayofElement = arrayofElement.sort(comparePrice);
        } else if (type == 'sale') {
            arrayofElement = arrayofElement.sort(compareDiference);
        }
        return arrayofElement;
    }
    
    //show block 10

    function showAction() {

        actionBlock = document.querySelector('.action');

        function closeBlock() {
            actionBlock.style.display = 'none';
        }
        if (typeof PROMOTIONS != "undefined" && PROMOTIONS.length > 0) {

            let cond = true;
            for (key in PROMOTIONS) {
                //тут я задаю деяким елементам дефолтні значення
                let title = 'Название акции',
                    description = '',
                    img = 'images/action-img1.jpg',
                    url = '#',
                    time_action = 'Infinity';

                if (!isEmpty(PROMOTIONS[key])) {
                    for (i in PROMOTIONS[key]) {
                        if (i == 'title' && PROMOTIONS[key][i] != '' && isString(PROMOTIONS[key][i])) {
                            title = PROMOTIONS[key][i];
                        }
                        if (i == 'url' && PROMOTIONS[key][i] != '' && isString(PROMOTIONS[key][i])) {
                            url = PROMOTIONS[key][i];
                        }
                        if (i == 'description' && PROMOTIONS[key][i] != '' && isString(PROMOTIONS[key][i])) {
                            description = PROMOTIONS[key][i];
                        }
                        if (i == 'img' && PROMOTIONS[key][i] != '' && isString(PROMOTIONS[key][i])) {
                            img = PROMOTIONS[key][i];
                        }
                        if (i == 'time_action' && PROMOTIONS[key][i] != '' && isString(PROMOTIONS[key][i])) {
                            time_action = PROMOTIONS[key][i];
                        }
                    }
                    cond = false;
                    createActionElement(title, description, img, url, time_action);
                }
            }
            if (cond) {
                closeBlock();
            }
        } else {
            closeBlock();
        }
        function isCorectTime(date) {
                let rez = date.match(/^\d+d \d+h \d+m$/g);
                if (rez) {
                    return true;
                } else {
                    return false;
                }
        }
        function createActionElement(title, description, img, url, time_action) {
            const actionList = document.querySelector('.action .slider-product');
            const elem = document.createElement('div');
            const elemTitle = document.createElement('a');
            const blockImg = document.createElement('div');
            const actionImg = document.createElement('img');
            const descr = document.createElement('div');
            const timerBlock = document.createElement('div');
            const timerInner = document.createElement('div');
            const timerNumber = document.createElement('div');

            const timerInfinity = document.createElement('div');
            const timerMore = document.createElement('a');

            elem.classList.add('slider__item');
            elem.classList.add('action-item');
            elemTitle.classList.add('slider__item-link');
            blockImg.classList.add('slider__item-img'); 
            descr.classList.add('slider__item-text');
            timerBlock.classList.add('slider__item-timer');
            timerInner.classList.add('timer-block');
            timerNumber.classList.add('timer-block__numbers');
            
            timerInfinity.classList.add('timer-noterm');
            timerMore.classList.add('slider__item-more');
            actionImg.src = img;
            actionImg.alt = "slider-img";
            elemTitle.innerHTML = title;
            descr.innerHTML = description;
            elemTitle.href = url;
            timerMore.href = url; 
            timerMore.innerHTML = 'Подробнее';
            timerInfinity.innerHTML = 'бессрочно';

            function createTimeElement(typeClass, dateValue) {
                let timerDay = document.createElement('span');
                timerDay.classList.add(typeClass);
                timerDay.innerHTML = dateValue;
                return timerDay;
            }

            if (isCorectTime(time_action)) {
                let count = 0; 
                let step = 0;

                let blockTimer = [];
                for(i in time_action) {
                    if (time_action[i] =='d') {
                        break;
                    }
                    count++;
                    timerNumber.append(createTimeElement('days', time_action[i]));

                }
                if (count == 1) {
                    timerNumber.prepend(createTimeElement('days', '0'));
                    count++;
                }
                timerNumber.innerHTML += ":";
                count++;
                for(i = count; i < time_action.length; i++) {
                    if (time_action[i] =='h') {
                        break;
                    }
                    count++;
                    
                    if (time_action[i] != ' ') { 
                    blockTimer.push(time_action[i]);
                    step++;
                }
                }
                if (step == 1) {
                    timerNumber.append(createTimeElement('hours', '0'));
                    count++;
                }
                for (j = 0; j < blockTimer.length; j++) {
                    timerNumber.append(createTimeElement('hours', blockTimer[j]));
                }
                timerNumber.innerHTML += ":";
                step = 0;
                blockTimer = [];
                count++;
                for(i = count; i < time_action.length; i++){
                    if (time_action[i] =='m') {
                        break;
                    }
                    if (time_action[i] != ' ') { 
                    blockTimer.push(time_action[i]);
                    step++;
                }
                    count++;
                }
                
                if (step == 1) {
                    timerNumber.append(createTimeElement('minutes', '0'));   
                    count++;
                }
                for (j = 0; j < blockTimer.length; j++) {
                    timerNumber.append(createTimeElement('minutes', blockTimer[j]));
                }

                timerInner.append(timerNumber);
                timerBlock.append(timerInner);
                timerBlock.innerHTML += `<div class="timer-block__names">
                <span>дней</span><span>часов</span><span>минут</span></div>`;

            } else {
                timerBlock.append(timerInfinity);

            }
            blockImg.append(actionImg);
            elem.append(elemTitle);
            elem.append(blockImg);
            elem.append(descr);
            elem.append(timerBlock);
            elem.append(timerMore);
            actionList.append(elem)           
    }
}
showAction();

// show 11 block
function showRightBuy() {
    const RightBuyBlock = document.querySelector('.what-by-now__wrap');

    function closeBlock() {
        RightBuyBlock.style.display = 'none';
    }
    if (typeof BUYING_RIGHT_NOW != "undefined" && BUYING_RIGHT_NOW.length > 0) {

        let cond = true;
        for (key in BUYING_RIGHT_NOW) {
            //тут я задаю деяким елементам дефолтні значення
            let title = 'Название товара',
                img = './images/img-block2.png',
                url = '#';

            if (!isEmpty(BUYING_RIGHT_NOW[key])) {
                for (i in BUYING_RIGHT_NOW[key]) {
                    if (i == 'title' && BUYING_RIGHT_NOW[key][i] != '' && isString(BUYING_RIGHT_NOW[key][i])) {
                        title = BUYING_RIGHT_NOW[key][i];
                    }
                    if (i == 'url' && BUYING_RIGHT_NOW[key][i] != '' && isString(BUYING_RIGHT_NOW[key][i])) {
                        url = BUYING_RIGHT_NOW[key][i];
                    }
                    if (i == 'img' && BUYING_RIGHT_NOW[key][i] != '' && isString(BUYING_RIGHT_NOW[key][i])) {
                        img = BUYING_RIGHT_NOW[key][i];
                    }
                }
                cond = false;
                createRightBuyElement(title, img, url);
            }
        }
        if (cond) {
            closeBlock();
        }
    } else {
        closeBlock();
    }
    function createRightBuyElement(title, img, url) {
        const actionList = document.querySelector('.blocks'),
              elem = document.createElement('div'),
              blockLink = document.createElement('a'),
              blockImg = document.createElement('img'),
              blockTitle = document.createElement('p'),
              blockTitleLink = document.createElement('a');
              elem.classList.add('block'),
              blockLink.classList.add('block-link');
              blockLink.href = url;
              blockImg.src = img;
              blockImg.alt = "buy-img";
              blockTitleLink.innerHTML = title;
              blockTitleLink.href = url;
              blockTitle.append(blockTitleLink);
              blockLink.append(blockImg);
              blockLink.append(blockTitle);
              elem.append(blockLink);
              actionList.append(elem)
    
    }
}
showRightBuy();

function showBasket() {
    const basketElement = document.querySelector('.top__right-name a');
    const basketPrice = document.querySelector('.top__right-name .money-span');
    const mobileBasket = document.querySelector('.top__right-basket--num');
    let elements = 0,
        price = 0,
        currentValue = '';
    
    if (typeof BASKET != "undefined" && !isEmpty(BASKET)) {
                for (key in  BASKET) {
                    if (key == 'elements' && Number.isInteger(BASKET[key])) {
                        elements =  BASKET[key];
                    }
                    if (key == 'price' && typeof(BASKET[key])  == 'number' && typeof(BASKET[key])  == 'number' && !isNaN(BASKET[key])) {
                        price = BASKET[key];
                    }
                }
    }
    if (currentOfPage == 'UAH') {
        currentValue = ' грн.'

    } 
    else if (currentOfPage == 'RUB') {
        currentValue = ' р.'

    }
    else if (currentOfPage == 'USD') {
        currentValue = ' дол.'

    }
    mobileBasket.innerHTML = elements;
    basketElement.innerHTML = elements;
    basketPrice.innerHTML = '/ ' + price + currentValue;
}
showBasket();
    // burger menu + sub menu 
    const menuBurger = document.querySelector('.menu__burgger');
    const menuClose = document.querySelector('.menu__close-btn');
    const menuList = document.querySelector('.menu-list');
    const submenuCatalog = document.querySelectorAll('.menu-list__catalog')
    menuBurger.addEventListener('click', () => {
        menuList.classList.add('menu-list--active');
        menuBurger.classList.remove('active-burgger');
        menuClose.classList.add('active-close');

    });
    menuClose.addEventListener('click', () => {
        menuList.classList.remove('menu-list--active');
        menuBurger.classList.add('active-burgger');
        menuClose.classList.remove('active-close');

    });
    submenuCatalog.forEach((element) => {
        element.addEventListener('click', () => {

            if (element.classList.contains('active')) {
                element.classList.remove('active');
            } else {
                element.classList.add('active');
            }
        });
    });
    // slider for blocks 7 8 9 10 12
    let newSlides = document.querySelectorAll('.new .slider__item'),
        newPrev = document.querySelector('.new .arrow-prev'),
        newNext = document.querySelector('.new .arrow-next'),
        recomSlides = document.querySelectorAll('.recomendation .slider__item'),
        recomPrev = document.querySelector('.recomendation .arrow-prev'),
        recomNext = document.querySelector('.recomendation .arrow-next'),
        saleSlides = document.querySelectorAll('.sale-product .slider__item'),
        salePrev = document.querySelector('.sale-product .arrow-prev'),
        saleNext = document.querySelector('.sale-product .arrow-next'),
        actionSlides = document.querySelectorAll('.action .slider__item'),
        actionPrev = document.querySelector('.action .arrow-prev'),
        actionNext = document.querySelector('.action .arrow-next'),
        brendSlides = document.querySelectorAll('.brend'),
        brendPrev = document.querySelector('.brends .arrow-prev'),
        brendNext = document.querySelector('.brends .arrow-next'),
        brendStart = 1,
        newStart = 1,
        recomStart = 1,
        saleStart = 1,
        actionStart = 1;
    function getNumberSlides() {
        w = (window.innerWidth > 0) ? window.innerWidth : screen.width;
        if (w < 750) {
            return 1;
        } else if (w >= 750 && w < 980) {
            return 3;
        } else {
            return 4;
        }
    }
    function getNumberBrends() {
        w = (window.innerWidth > 0) ? window.innerWidth : screen.width;
        if (w >= 750 && w < 980) {
            return 5;
        } else if (w >= 980 && w < 1140) {
            return 7;
        } else if (w >= 1140) {
            return 9;
        }
    }
    function getNumberBuyRight() {
        w = (window.innerWidth > 0) ? window.innerWidth : screen.width;
        if (w >= 750 && w < 980) {
            return 3;
        } else if (w >= 980 ) {
            return 4;
        }
    }
    function showRightElement() {
        rightElements = document.querySelectorAll('.blocks .block');
        if (rightElements.length > getNumberBuyRight()) {
        rightElements.forEach((item) => item.style.display = 'none');
        for (let i = 0; i < getNumberBuyRight(); i++) {
            rightElements[i].style.display = 'block';
        }
    }
    }
    showRightElement();

    function showSlides(n = 1, num, slides, prev, next) {

        if ((n + num - 1) > slides.length) {
            n = slides.length - num + 1;
        }
        if (n < 1) {
            n = 1;
        }

        if (slides.length <= num) {
            prev.style.display = 'none';
            next.style.display = 'none';
        } else {
            prev.style.display = 'flex';
            next.style.display = 'flex';
        }

        slides.forEach((item) => item.style.display = 'none');
        if (num > slides.length) {
            slides.forEach((item) => item.style.display = 'block');
        } else {
            for (let i = n; i < (n + num); i++) {
                slides[i - 1].style.display = 'block';
            }
        }
    }
    showSlides(1, getNumberSlides(), newSlides, newPrev, newNext);
    showSlides(1, getNumberSlides(), recomSlides, recomPrev, recomNext);
    showSlides(1, getNumberSlides(), saleSlides, salePrev, saleNext);
    showSlides(1, getNumberSlides(), actionSlides, actionPrev, actionNext);
    showSlides(1, getNumberBrends(), brendSlides, brendPrev, brendNext);

    function changeSlides(n, pos, id) {
        if (id == 1) {
            newStart = pos + n;
            showSlides(newStart, getNumberSlides(), newSlides, newPrev, newNext);
        } else if (id == 2) {
            recomStart = pos + n;
            showSlides(recomStart, getNumberSlides(), recomSlides, recomPrev, recomNext);

        } else if (id == 3) {
            saleStart = pos + n;
            showSlides(saleStart, getNumberSlides(), saleSlides, salePrev, saleNext);

        } else if (id == 4) {
            actionStart = pos + n;
            showSlides(actionStart, getNumberSlides(), actionSlides, actionPrev, actionNext);
        } else if (id == 5) {
            brendStart = pos + n;
            showSlides(brendStart, getNumberBrends(), brendSlides, brendPrev, brendNext);

        }
    }
    newPrev.addEventListener('click', function () {
        if (newStart > 1) {
            changeSlides(-1, newStart, 1);
        }
    });
    newNext.addEventListener('click', function () {
        if ((newStart + getNumberSlides() - 1) < newSlides.length) {
            changeSlides(1, newStart, 1)
        }
    });
    recomPrev.addEventListener('click', function () {
        if (recomStart > 1) {
            changeSlides(-1, recomStart, 2);
        }
    });
    recomNext.addEventListener('click', function () {
        if ((recomStart + getNumberSlides() - 1) < recomSlides.length) {
            changeSlides(1, recomStart, 2)
        }
    });
    salePrev.addEventListener('click', function () {
        if (saleStart > 1) {
            changeSlides(-1, saleStart, 3);
        }
    });
    saleNext.addEventListener('click', function () {
        if ((saleStart + getNumberSlides() - 1) < saleSlides.length) {
            changeSlides(1, saleStart, 3)
        }
    });
    actionPrev.addEventListener('click', function () {
        if (actionStart > 1) {
            changeSlides(-1, actionStart, 4);
        }
    });
    actionNext.addEventListener('click', function () {
        if ((actionStart + getNumberSlides() - 1) < actionSlides.length) {
            changeSlides(1, actionStart, 4)
        }
    });
    brendPrev.addEventListener('click', function () {
        if (brendStart > 1) {
            changeSlides(-1, brendStart, 5);
        }
    });
    brendNext.addEventListener('click', function () {
        if ((brendStart + getNumberBrends() - 1) < brendSlides.length) {
            changeSlides(1, brendStart, 5)
        }
    });

    window.addEventListener("resize", () => {
        showSlides(newStart, getNumberSlides(), newSlides, newPrev, newNext);
        showSlides(recomStart, getNumberSlides(), recomSlides, recomPrev, recomNext);
        showSlides(saleStart, getNumberSlides(), saleSlides, salePrev, saleNext);
        showSlides(actionStart, getNumberSlides(), actionSlides, actionPrev, actionNext);
        showSlides(brendStart, getNumberBrends(), brendSlides, brendPrev, brendNext);
        showRightElement();

    });

    // slider for block 3
    const extraSlides = document.querySelectorAll('.extra-list__item'),
        extraPrev = document.querySelector('.extra-list__prev'),
        extraNext = document.querySelector('.extra-list__next'),
        extraNumberShow = 10;
    let extraStart = 1;
    function showExtraSlides(n = 1) {
        if ((n + extraNumberShow - 1) >= extraSlides.length) {
            n = extraSlides.length - extraNumberShow + 1;
            extraNext.style.display = 'none';
        } else {
            extraNext.style.display = 'block';
        }

        if (n <= 1) {
            n = 1;
            extraPrev.style.display = 'none';
        } else {
            extraPrev.style.display = 'block';
        }

        if (extraSlides.length <= extraNumberShow) {
            extraPrev.style.display = 'none';
            extraNext.style.display = 'none';
        }
        extraSlides.forEach((item) => item.style.display = 'none');
        if (extraNumberShow > extraSlides.length) {
            extraSlides.forEach((item) => item.style.display = 'block');
        } else {
            for (let i = n; i < (n + extraNumberShow); i++) {
                extraSlides[i - 1].style.display = 'block';
            }
        }
    }
    showExtraSlides();

    function changeExtraSlides(n, pos) {
        extraStart = pos + n;
        showExtraSlides(extraStart);
    }

    extraPrev.addEventListener('click', function () {
        if (extraStart > 1) {
            changeExtraSlides(-1, extraStart);
        }
    });
    extraNext.addEventListener('click', function () {
        if ((extraStart + extraNumberShow - 1) < extraSlides.length) {
            changeExtraSlides(1, extraStart);
        }
    });
    //slider for block 6
    const bannerSlides = document.querySelectorAll('.right__slider-item'),
        bannerPrev = document.querySelector('.right__slider-prev'),
        bannerNext = document.querySelector('.right__slider-next'),
        bannerDotsWrap = document.querySelector('.right__slider-dots'),
        bannerDots = document.querySelectorAll('.right__slider-btn');
    let bannerIndex = 1;

    function showBannerSlides(n) {

        if (n > bannerSlides.length) {
            bannerIndex = 1;
        }
        if (n < 1) {
            bannerIndex = bannerSlides.length;
        }

        bannerSlides.forEach((item) => item.style.display = 'none');
        bannerDots.forEach((item) => item.classList.remove('active'));

        bannerSlides[bannerIndex - 1].style.display = 'block';
        bannerDots[bannerIndex - 1].classList.add('active');
    }
    showBannerSlides(1);

    function plusBannerSlides() {
        showBannerSlides(bannerIndex += 1);
    }
    function minusBannerSlides() {
        showBannerSlides(bannerIndex -= 1);
    }

    function currentSlide(n) {
        showBannerSlides(bannerIndex = n);
    }
    bannerPrev.addEventListener('click', function () {
        minusBannerSlides();
        clearInterval(timer);
    });
    bannerNext.addEventListener('click', function () {
        plusBannerSlides();
        clearInterval(timer);
    });
    bannerDotsWrap.addEventListener('click', function (event) {
        for (let i = 0; i < bannerDots.length; i++) {
            if (event.target.classList.contains('right__slider-btn') && event.target == bannerDots[i]) {
                clearInterval(timer);
                currentSlide(i + 1);
            }
        }
    });
    let timer = setInterval(plusBannerSlides, 2000);

    document.querySelectorAll('.how-work__tabs-link').forEach((item) => {
        item.addEventListener('click', function (e) {
            e.preventDefault();
            let id = e.target.getAttribute('href').replace('#', '');

            document.querySelectorAll('.how-work__tabs-link').forEach((child) => child.classList.remove('active'));
            document.querySelectorAll('.how-work__item').forEach((child) => child.classList.remove('active'));

            item.classList.add("active");
            document.getElementById(id).classList.add('active');
        });
    });

});