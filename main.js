let infoContainerName = document.querySelector('.info-container .name span');

document.querySelector('.start-game span').onclick = function() {
    let yourName = prompt("What's Your Name: ");
    document.querySelector('.start-game').remove();
    
    infoContainerName.textContent = (yourName == null || yourName == "") ? "Unknown" : yourName;
}

let duration = 1000;

let blocksContainer = document.querySelector('.memory-game-blocks');

let blocks = Array.from(blocksContainer.children);

let orderRange = Array.from(Array(blocks.length).keys());

// console.log(orderRange);
shuffle(orderRange);
// console.log(orderRange);

blocks.forEach((block, index) => {
    block.style.order = orderRange[index]; 

    block.addEventListener('click', function() {
        flipBlock(block);
    })
});

function shuffle(array) {
    let current = array.length,
        temp,
        random;

    while(current > 0) {
        random = Math.floor(Math.random() * current);
        current--;
        temp = array[current];
        array[current] = array[random];
        array[random] = temp;
    }

    return array;
}

function flipBlock(selectedBlock) {
    selectedBlock.classList.add('is-flipped');

    let allFlippedBlocks = blocks.filter(flippedBlock => flippedBlock.classList.contains('is-flipped'));

    
    if(allFlippedBlocks.length === 2) {        
        stopClicking();

        checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);
    }
}

function stopClicking() {
    blocksContainer.classList.add('no-clicking');

    setTimeout(() => {

        blocksContainer.classList.remove('no-clicking');

    }, duration);
}

function checkMatchedBlocks(firstBlock, secondBlock) {
    let triesElement = document.querySelector('.tries span');

    console.log(firstBlock.dataset.technology);
    console.log(secondBlock.dataset.technology);

    if(firstBlock.dataset.technology === secondBlock.dataset.technology) {
        firstBlock.classList.remove('is-flipped');
        secondBlock.classList.remove('is-flipped');

        firstBlock.classList.add('has-match');
        secondBlock.classList.add('has-match');

        document.getElementById('success').play();
    } else {
        triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;

        setTimeout(() => {

            firstBlock.classList.remove('is-flipped');
            secondBlock.classList.remove('is-flipped');
    
        }, duration);

        document.getElementById('fail').play();

    }
}