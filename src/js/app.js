'use strict';
window.addEventListener('DOMContentLoaded', () => {
    const modal = document.querySelector('.rules__modal'),
    rulesBtn = document.querySelector('.rules'),
    closeBtn = document.querySelector('.close_btn'),
    score = document.querySelector('.score__counter'),
    handsParent = document.querySelector('.footer__items'),
    hands = document.querySelectorAll('.footer__items-item'),
    resultContent = document.querySelector('.result__content'),
    userHand = document.querySelector('.user__hand-item'),
    comHand = document.querySelector('.house__hand-item'),
    userHandImg = document.querySelector('.user__hand-item img'),
    comHandImg = document.querySelector('.house__hand-item img'),
    resultTxt = document.querySelector('.result__text'),
    playAgain = document.querySelector('.play_again'),
    resultItems = document.querySelector('.result__items');
    let counter = parseInt(localStorage.getItem('user')) || 0;
    let timer;
    rulesBtn.addEventListener('click', () => {
        modal.style.display = 'flex';
    });
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });
    document.addEventListener("keydown", (e) => {
        if (e.code == "Escape" && modal.style.display == 'flex') {
            modal.style.display = 'none';
        }
    });
    handsParent.addEventListener('click', (ev) => {
        const target = ev.target;
        if (target.classList.contains('footer__items-item') || target.tagName === 'IMG') {
            hands.forEach((item, idx) => {
                if (target == item || target.parentNode == item) {
                    handsParent.style.display = 'none';
                    resultContent.style.display = 'grid';
                    const itemImg = item.querySelector('img').src;
                    userHandImg.src = itemImg;
                    const arrClasses = ['paper', 'scissors', 'rock'];
                    const imagesArr = [
                        "./images/icon-paper.svg",
                        "./images/icon-scissors.svg",
                        "./images/icon-rock.svg",
                    ];
                    appearClass(arrClasses, idx, userHand)
                    const compRandom = Math.floor(Math.random() * arrClasses.length);
                    comHandImg.src = imagesArr[compRandom];
                    appearClass(arrClasses, compRandom, comHand);
                    checkClass({
                        comphand: comHand,
                        userhand: userHand,
                        result: resultTxt,
                        scoreEl: score,
                        paperCls: arrClasses[0],
                        scissorsCls: arrClasses[1],
                        rockCls: arrClasses[2],
                    })
                    timer = setTimeout(appearElements, 100)
                }
            })
        }
    })
    playAgain.addEventListener('click', () => {
        clearTimeout(timer);
        disappearElements();
    });
    function appearElements() {
        resultItems.style.display = 'block';
        resultContent.style.width = '100%'
    }
    function disappearElements() {
        handsParent.style.display = 'grid';
        resultContent.style.display = 'none';
        resultItems.style.display = 'none';
        resultContent.style.width = '100%';
    }
    function appearClass(arr, idx, element) {
        arr.forEach((cls, index) => {
            if (idx !== index) {
                element.classList.remove(cls);
            } else {
                element.classList.add(arr[idx]);
            }
        });
    }
    function checkClass({ userhand, comphand, paperCls, scissorsCls, rockCls, result, scoreEl }) {
        if ((userhand.classList.contains(paperCls) && comphand.classList.contains(rockCls)) ||
            (userhand.classList.contains(scissorsCls) && comphand.classList.contains(paperCls)) ||
            (userhand.classList.contains(rockCls) && comphand.classList.contains(scissorsCls))) {
            result.innerHTML = 'YOU WIN';
            counter++;
            localStorage.setItem('user', counter);
            scoreEl.innerHTML = counter;
        } else if ((userhand.classList.contains(paperCls) && comphand.classList.contains(scissorsCls)) ||
            (userhand.classList.contains(scissorsCls) && comphand.classList.contains(rockCls)) ||
            (userhand.classList.contains(rockCls) && comphand.classList.contains(paperCls))) {
            result.innerHTML = 'YOU LOSE';
        } else {
            result.innerHTML = "IT'S A TIE";
        }
    }
    score.innerHTML = counter;
});
