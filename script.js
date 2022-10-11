const IMAGES = [
    '/img/fox.jpg',
    '/img/wolf.jpg',
    '/img/pig.jpg',
    '/img/hedgehog.jpg',
    '/img/calf.jpg',
    '/img/horse.jpg',
    '/img/bear.jpg',
    '/img/rabbit.jpg',
    '/img/puppy.jpg',
    '/img/cat.jpg',
    '/img/pigin.jpg',
    '/img/squirrel.jpg',
]


const cardContentClicked = 'card-content__clicked';
const cardClicked = 'card__clicked'
const cardDisabled = 'card__disabled';
const allCards = document.querySelector('.cards');

let firstCard, secondCard;
let firstCardContent, secondCardContent;
let cardCounter = 0;
let matchedPairs = 0;
let firstClick = true;





const renderCardItems = () => {
    timer.innerHTML = '00 : 00';
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('click', () => {

            card.classList.add(cardClicked)
            if (firstClick) {
                firstClick = false;

            }
            card.querySelector('.card-content').classList.add(cardContentClicked);

            if (cardCounter === 0) {
                firstCard = card;
                firstCardContent = card.querySelector('.card-content');
                console.log(firstCard);
                cardCounter++;
            } else if (firstCard != card) {
                secondCard = card;
                secondCardContent = card.querySelector('.card-content');
                if (firstCardContent.getAttribute('data-num') === secondCardContent.getAttribute('data-num')) {

                    firstCard.classList.add(cardDisabled);
                    secondCard.classList.add(cardDisabled);
                    matchedPairs++;

                    if (matchedPairs === cards.length / 2) {
                        clearInterval(startTicking);
                        timer.classList.add('timer__stop');
                        setTimeout(function () {
                            alert('Игра закончена. Поздравляем!');
                            window.location.reload();
                        }, 1000);
                    }

                } else {

                    allCards.style.pointerEvents = "none";
                    setTimeout(function remove() {
                        firstCardContent.classList.remove(cardContentClicked);
                        secondCardContent.classList.remove(cardContentClicked);
                        firstCard.classList.remove(cardClicked);
                        secondCard.classList.remove(cardClicked);
                        allCards.style.pointerEvents = "auto";
                    }, 800)




                }

                cardCounter = 0;
            }
        })
    })




}




/* timer */
const timer = document.querySelector('.timer');
let seconds = 0;
let minutes = 0;
const startTicking = setInterval(function () {
    if (firstClick) {
        return;
    }

    if (seconds === 59) {
        minutes++;
        seconds = 0;
    } else {
        seconds++;
    }
    timer.innerHTML = `${addZero(minutes)} : ${addZero(seconds)} `;
}, 1000);





/*Prepare items*/

const renderMemoItems = (num) => {
    let items = [];
    let pairCount = 0;
    let pairNumbers = 0;
    for (i = 0; i < num; i++) {

        if (pairCount === 0) {
            items.push(`<div class="card"><img class="card-content" src=".${IMAGES[pairNumbers]}" data-num=${pairNumbers}"></div>`)
            pairCount++;
        } else {
            items.push(`<div class="card"><img class="card-content" src=".${IMAGES[pairNumbers]}" data-num=${pairNumbers}"></div>`)
            pairCount = 0;
            pairNumbers++;
        }

    }

    items.sort(() => Math.random() - 0.5);
    allCards.innerHTML = '';
    allCards.innerHTML = items.join('');

}

function addZero(num) {
    return num < 10 ? '0' + num : num;
}

const mediaQuery = window.matchMedia('(min-width: 768px)')

const cards = document.querySelectorAll('.card');


cards.forEach(card => {

    card.addEventListener('click', () => {

        let i = card.querySelector('.card-start').getAttribute('data-num');
        if (i == 16) {
            if (mediaQuery.matches) {

                document.body.style.setProperty('--cols', 4)
            } else {
                document.body.style.setProperty('--cols', 3)
            }
        }

        if (i == 20) {
            if (mediaQuery.matches) {

                document.body.style.setProperty('--cols', 5)
            } else {
                document.body.style.setProperty('--cols', 3)
            }
        }
        if (i == 24) {
            if (mediaQuery.matches) {

                document.body.style.setProperty('--cols', 6)
            } else {
                document.body.style.setProperty('--cols', 4)
            }
        }
        renderMemoItems(i);
        renderCardItems();
    })
})