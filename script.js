let listWords = [
    "apple", "banana", "grape", "orange", "mango", "pineapple", "watermelon", "blueberry", "strawberry", "kiwi",
    "carrot", "broccoli", "spinach", "potato", "tomato", "onion", "lettuce", "cucumber", "celery", "garlic",
    "dog", "cat", "rabbit", "elephant", "tiger", "lion", "zebra", "giraffe", "kangaroo", "panda",
    "sun", "moon", "star", "planet", "galaxy", "universe", "blackhole", "comet", "asteroid", "meteor",
    "rainbow", "cloud", "thunder", "lightning", "earthquake", "volcano", "hurricane", "tornado", "tsunami", "blizzard",
    "computer", "keyboard", "monitor", "mouse", "programming", "coding", "algorithm", "software", "hardware", "internet",
    "pizza", "hamburger", "pasta", "sushi", "steak", "chicken", "burger", "fries", "salad", "soup",
    "soccer", "basketball", "football", "volleyball", "tennis", "baseball", "swimming", "running", "cycling", "boxing",
    "python", "javascript", "html", "css", "java", "swift", "c++", "ruby", "php", "rust", "apple", "banana", "cherry", "dog", 
    "elephant", "fish", "grape", "hat", "ice", "jacket", "kite", "lemon", "mountain", "night", "orange", "parrot", "queen", "rose",
     "snake", "tree", "umbrella", "vulture", "water", "xylophone", "yellow", "zebra", "airplane", "book", "cat", "dragon", "egg", 
     "frog", "guitar", "house", "ink", "joker", "king", "lighthouse", "mouse", "necklace", "octopus", "piano", "quilt", "rocket", 
     "sun", "train", "unicorn", "vase", "whale", "x-ray", "yarn", "zoo", "actor", "ball", "clock", "door", "engine", "fire", "grapevine", 
     "hammer", "icecream", "juice", "koala", "lamp", "magnet", "notebook", "octagon", "pizza", "quicksand", "rosebush", "snow", "telescope",
      "umbrella", "vaccine", "window", "yoga", "ant", "butterfly", "car", "dolphin", "elephant", "flute", "garden", "hummingbird", "illusion", 
      "jellyfish", "keyboard", "lizard", "mirror", "noodle", "octopus", "penguin", "quiver", "raccoon", "scooter", "tiger", "universe", "vampire", 
      "waterfall", "xenon", "yacht", "zipper", "asparagus", "balloon", "castle", "diamond", "eggplant", "fox", "goose", "hamster", "island", "jaguar",
       "key", "lemonade", "monkey", "needle", "owl", "puzzle", "quiz", "robot", "seagull", "tooth", "utensil", "vegetable", "wheel", "xylophonist", "yell",
        "zigzag", "avocado", "bicycle", "cactus", "dandelion", "elephant", "feather", "grapefruit", "highway", "iceberg", "jaguar", "kingfisher", "leprechaun", 
        "meteor", "neutron", "oak", "pirate", "queenbee", "rocketship", "sunflower", "tornado", "underwater", "volcano", "whistle", "xmas", "yawning", "zeppelin", 
        "algae", "butter", "caterpillar", "duck", "earth", "fruit", "gator", "horizon", "inkling", "jewel", "kangaroo", "lipstick", "moose", "napkin", "obstacle", 
        "pineapple", "quickstep", "rabbit", "silk", "tissue", "universe", "vine", "wildlife", "xerox", "yeti", "zinc", "antelope", "blossom", "clover", "daisy", "elephant", 
        "fiddle", "grapevines", "helium", "idea", "jalapeno", "kiwi", "lamp", "magnolia", "nightingale", "octopus", "puzzle", "quaint", "riddle", "sundial", "thunder", "unicorn", 
        "viper", "windmill", "xander", "yak", "zebra"];


let currentWord = "";
let score = 0;
let lives = 10;
let Start = false;
let movingWords = [];
let spawnInterval = null ;

const wordsContainer = document.getElementById("words"); 
const scoreSpan = document.getElementById("score");
const livesSpan = document.getElementById("lives");
const typedInput = document.getElementById("typed-input");
const startButton = document.getElementById("start-button");

function getRandomWord() {
    let randomIndex = Math.floor(Math.random() * listWords.length);
    return listWords[randomIndex];
}

function moveWord(){
    let randomWord = getRandomWord();

    let wordElement = document.createElement("div");
    wordElement.classList.add("moving-word");
    wordElement.innerText = randomWord;
    wordsContainer.appendChild(wordElement);

    let containerWidth = wordsContainer.offsetWidth;
    let containerHeight = wordsContainer.offsetHeight;

    let randomLeft = Math.floor(Math.random() * (containerWidth - wordElement.offsetWidth));
    wordElement.style.left = randomLeft + "px" ;

    let topPosition = 0;
    wordElement.style.top = topPosition + "px";


    let wordFall = setInterval(()=>{
        topPosition += 3;
        wordElement.style.top = topPosition+"px";

        if (topPosition > containerHeight) {
            clearInterval(wordFall);
            wordElement.remove();
            movingWords = movingWords.filter((obj) => obj.element !== wordElement);

            loseLife();
        }
    }, 30);
    movingWords.push({
        element: wordElement,
        word: randomWord,
        intervalId: wordFall
      });
}

typedInput.addEventListener("keydown", function (event) {
    if (!Start) return;


    if (event.key === "Enter") {
        event.preventDefault();
        checkTypedWord();
      }
});

function checkTypedWord() {
    let typedValue = typedInput.value.trim();
    if (!typedValue) return;
  

    let foundIndex = movingWords.findIndex(
        (obj) => obj.word === typedValue);
  
    if (foundIndex !== -1) {
      let foundObj = movingWords[foundIndex];
      clearInterval(foundObj.intervalId);
  
      foundObj.element.remove();
  
 
      movingWords.splice(foundIndex, 1);
  
      increaseScore();
    }
    typedInput.value = "";
}


function increaseScore() {
    score += 10;
    scoreSpan.innerText = score;
}

function loseLife() {
    if (!Start) return;
    lives -= 1;
    livesSpan.innerText = lives;

    if (lives <= 0) {

        lives = 0;
        livesSpan.innerText = 0;

        GameOver();
        resetGame();
    }
}

function GameOver(){
  const finalScoreSpan = document.getElementById("final-score");
  finalScoreSpan.innerText = score; 

  const gameOverwindow = document.getElementById("game-over-window");
  gameOverwindow.style.display = "flex"; 
}

const playAgainBtn = document.getElementById("Restart");
playAgainBtn.addEventListener("click", function() {
document.getElementById("game-over-window").style.display = "none";  
  startGame();
});

function resetGame() {
    Start = false;
    clearInterval(spawnInterval);

    score = 0;
    lives = 10;
    scoreSpan.innerText = score;
    livesSpan.innerText = lives;

    movingWords.forEach((obj) =>{
        clearInterval(obj.intervalId);
        obj.element.remove();
      });

    movingWords = []; 
    typedInput.value = "";
}

function startGame() {
    if (!Start) {
      Start = true;
      spawnInterval = setInterval(() => {
        if (Start) {
          moveWord();
        } else {
            clearInterval(spawnInterval);
        }
      }, 2000); 
    }
  }


startButton.addEventListener("click", startGame);