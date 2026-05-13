import { useState, useEffect } from "react";
import { supabase } from "./supabase";

// ─── Tiered Word Banks ────────────────────────────────────────────────────────
const WORDS = {
  easy: [
    { word: "Happy", emoji: "😊", definition: "Feeling really good and full of joy!", visual: "Picture a puppy wagging its tail so fast it wiggles its whole body!", example: "She felt happy when she got a big hug from her mom." },
    { word: "Brave", emoji: "🦁", definition: "Doing something even when you feel a little scared.", visual: "Think of a tiny mouse standing up to a big cat!", example: "He was brave and tried the new food at dinner." },
    { word: "Gentle", emoji: "🕊️", definition: "Being soft and careful — not rough.", visual: "Think of someone petting a sleeping kitten very softly.", example: "She was gentle holding the tiny baby bunny." },
    { word: "Huge", emoji: "🐘", definition: "Really, really BIG!", visual: "Picture an elephant that can barely fit through a door!", example: "The huge pizza covered the whole table." },
    { word: "Cozy", emoji: "🧸", definition: "Warm and comfortable — like a big hug.", visual: "Imagine snuggling under the fluffiest blanket ever!", example: "Reading with dad felt so cozy." },
    { word: "Silly", emoji: "🤪", definition: "Funny and a little goofy!", visual: "Picture a clown with a giant red nose doing a funny dance!", example: "The silly monkey made everyone laugh at the zoo." },
    { word: "Shiny", emoji: "✨", definition: "Bright and sparkly — catches the light!", visual: "Imagine a pile of glittery stars twinkling in the sunshine!", example: "She loved her shiny new shoes." },
    { word: "Tiny", emoji: "🐜", definition: "Very, very small — teeny tiny!", visual: "Think of an ant trying to carry a giant crumb three times its size!", example: "The tiny puppy fit in the palm of his hand." },
    { word: "Fast", emoji: "⚡", definition: "Moving really quickly!", visual: "Picture a cheetah zooming past so quickly it's just a blur!", example: "The fast rabbit won the race." },
    { word: "Quiet", emoji: "🤫", definition: "Making very little or no sound.", visual: "Imagine a whole library full of people all whispering at once.", example: "The quiet mouse tiptoed past the sleeping cat." },
    { word: "Fluffy", emoji: "☁️", definition: "Soft and light — like a cloud!", visual: "Picture the softest, puffiest pillow you've ever seen.", example: "The fluffy bunny hopped across the yard." },
    { word: "Yummy", emoji: "😋", definition: "Tasting really, really good!", visual: "Imagine a giant ice cream sundae with all your favorite toppings!", example: "The yummy cookies made the whole house smell amazing." },
    { word: "Muddy", emoji: "🌧️", definition: "Covered in wet, sticky mud.", visual: "Picture a puppy who jumped in every puddle on the street!", example: "His muddy boots left tracks all over the floor." },
    { word: "Wiggly", emoji: "🪱", definition: "Moving around a lot — hard to keep still!", visual: "Think of a bowl of jello that bounces every time someone walks by!", example: "The wiggly puppy kept squirming out of her arms." },
    { word: "Grumpy", emoji: "😤", definition: "Feeling cranky and a little annoyed.", visual: "Picture a bear who just woke up from a nap to find someone ate his honey!", example: "He was grumpy before breakfast but cheered up after pancakes." },
    { word: "Sparkle", emoji: "💫", definition: "To shine with little flashes of light.", visual: "Imagine a disco ball spinning and sending tiny lights everywhere!", example: "Her fairy wand would sparkle every time she waved it." },
    { word: "Wobbly", emoji: "🍮", definition: "Shaking side to side — hard to keep steady.", visual: "Think of a tower of jello wiggling when someone walks nearby!", example: "His first try on the balance beam was very wobbly." },
    { word: "Chilly", emoji: "🥶", definition: "A little bit cold.", visual: "Picture your breath making little puffs of steam on a cold morning!", example: "It was chilly outside so she put on her favorite sweater." },
    { word: "Proud", emoji: "🏆", definition: "Feeling really good about something you did.", visual: "Imagine standing on a podium with a gold medal around your neck!", example: "He felt proud when he learned to ride his bike." },
    { word: "Loud", emoji: "📢", definition: "Making a lot of noise — hard to ignore!", visual: "Picture a trumpet player blasting right next to your ear!", example: "The loud thunder made the dog hide under the bed." },
  ],
  justRight: [
    { word: "Peculiar", emoji: "🔍", definition: "Something strange or different in an interesting way.", visual: "Imagine a dog wearing tiny sunglasses and reading a newspaper!", example: "That peculiar sound under my bed was just my toy robot." },
    { word: "Enormous", emoji: "🐘", definition: "Really, really BIG — much bigger than usual.", visual: "Picture an elephant so huge it can barely fit through your front door!", example: "The enormous pizza covered the whole kitchen table." },
    { word: "Radiant", emoji: "✨", definition: "Glowing with bright light — or looking very happy!", visual: "Picture the sun bursting through clouds after rain.", example: "His face was radiant when he saw his birthday present!" },
    { word: "Curious", emoji: "🔭", definition: "Wanting to learn — always asking why and how!", visual: "Imagine a little explorer with a giant magnifying glass peering into every flower.", example: "She was so curious she followed the butterflies all afternoon." },
    { word: "Ancient", emoji: "🏛️", definition: "Incredibly old — from a very, very long time ago.", visual: "Imagine a dinosaur skeleton so old your great-great-grandparents never saw it alive.", example: "The ancient tree was already huge when great-grandma was born!" },
    { word: "Generous", emoji: "🎁", definition: "Loving to share and give — having a very kind heart.", visual: "Picture someone with a basket of cookies handing them out to everyone they pass.", example: "She was so generous she shared her snack even though she was hungry." },
    { word: "Magnificent", emoji: "🌅", definition: "So amazing and beautiful it makes you gasp and say WOW!", visual: "Picture a golden castle rising above a rainbow waterfall with flags waving.", example: "The fireworks were so magnificent everyone said ooooh at the same time!" },
    { word: "Shimmer", emoji: "💎", definition: "To shine with soft flickering light — like little sparkles.", visual: "Imagine sunlight on a lake making thousands of tiny dancing diamonds.", example: "Her costume made her shimmer like a real star when she twirled." },
    { word: "Dazzle", emoji: "🌟", definition: "To amaze someone so much they can barely believe it.", visual: "Picture a magician pulling star after star out of a hat filling the room with light!", example: "Her volcano project dazzled the whole class with pink foam!" },
    { word: "Murmur", emoji: "🌊", definition: "A soft, low, gentle sound — like quiet voices or a tiny stream.", visual: "Imagine a brook whispering over pebbles in a quiet forest.", example: "He heard the murmur of his parents talking as he fell asleep." },
    { word: "Towering", emoji: "🗼", definition: "So tall you have to tip your head all the way back to see the top.", visual: "Imagine pancakes so tall they poke right through the ceiling!", example: "The towering giraffe could look right into the second floor windows." },
    { word: "Plunge", emoji: "🏊", definition: "To jump or dive quickly and deeply into something.", visual: "Think of a penguin cannonballing off an ice cliff — SPLASH!", example: "He plunged into the pool and swam all the way to the other side." },
    { word: "Whirl", emoji: "🌀", definition: "To spin around very fast — like a top or leaf in the wind.", visual: "Picture a ballerina spinning so fast she becomes a blur of sparkles!", example: "She loved to whirl in the fallen leaves until she got dizzy." },
    { word: "Delicate", emoji: "🦋", definition: "Very fragile — needing to be handled with great care.", visual: "Think of a soap bubble floating in the air — one touch and it vanishes.", example: "The delicate butterfly sat on her finger without making a sound." },
    { word: "Snug", emoji: "🐣", definition: "Fitting perfectly — warm and tucked in just right.", visual: "Think of a baby chick tucked under its mama's warm wing.", example: "The sleeping bag was so snug it felt like being hugged all night." },
    { word: "Cozy", emoji: "🧸", definition: "Warm, comfortable, and safe — like the best hug ever.", visual: "Imagine the fluffiest blanket and stuffed animals while rain patters on the window.", example: "Reading with dad in the big armchair felt so cozy." },
    { word: "Grumpy", emoji: "😤", definition: "Feeling cranky and annoyed — not in a happy mood.", visual: "Picture a bear who woke up to find someone ate all his honey!", example: "He was grumpy before breakfast but cheered up after pancakes." },
    { word: "Brave", emoji: "🦁", definition: "Doing something even when you feel scared — having courage!", visual: "Think of a tiny knight saying hello to a fire-breathing dragon.", example: "He was brave enough to try the new food, and it was delicious!" },
    { word: "Gentle", emoji: "🕊️", definition: "Being soft, careful, and kind — not rough or loud.", visual: "Think of someone tiptoeing through a room of sleeping kittens.", example: "She was gentle holding the tiny baby bunny." },
    { word: "Shimmer", emoji: "💎", definition: "To shine with soft flickering light.", visual: "Imagine sunlight on a lake making thousands of tiny dancing diamonds.", example: "Her costume made her shimmer like a real star when she twirled." },
  ],
  challenge: [
    { word: "Resilient", emoji: "💪", definition: "Being able to bounce back after something hard — like a rubber ball!", visual: "Imagine a tree in a huge storm — it bends way over but springs right back up!", example: "She was resilient after falling off her bike — she got right back on." },
    { word: "Elaborate", emoji: "🏰", definition: "Very detailed and complicated — with lots of parts.", visual: "Picture the most incredible sandcastle ever built with towers, bridges, and tiny flags!", example: "He made an elaborate plan to surprise his mom for her birthday." },
    { word: "Luminous", emoji: "🌙", definition: "Giving off a beautiful, soft glow of light.", visual: "Imagine the full moon on a clear night making everything look silver and magical.", example: "The luminous stars filled the whole sky on their camping trip." },
    { word: "Tenacious", emoji: "💪", definition: "Never giving up — holding on tight no matter what!", visual: "Picture a tiny puppy playing tug of war with a giant dog and absolutely refusing to let go!", example: "She was tenacious about learning to swim — she practiced every single day." },
    { word: "Persevere", emoji: "🏔️", definition: "To keep going even when things get really hard.", visual: "Picture a mountain climber who keeps climbing even when the wind is howling and it's freezing cold.", example: "He had to persevere through many mistakes before finally solving the puzzle." },
    { word: "Exquisite", emoji: "💎", definition: "Extremely beautiful — so perfect it takes your breath away.", visual: "Imagine the most detailed, colorful butterfly you've ever seen, with wings like stained glass.", example: "The exquisite painting looked so real she almost reached out to touch it." },
    { word: "Melancholy", emoji: "🌧️", definition: "A deep, quiet kind of sadness — like a rainy afternoon feeling.", visual: "Picture sitting by a window watching rain drops race each other down the glass.", example: "She felt melancholy at the end of summer knowing school was starting soon." },
    { word: "Audacious", emoji: "🚀", definition: "Super bold and daring — willing to try things most people wouldn't!", visual: "Imagine someone deciding to jump over a canyon on a motorcycle just because they thought they could!", example: "It was audacious of him to challenge the chess champion on his first day of playing." },
    { word: "Tranquil", emoji: "🏞️", definition: "Perfectly calm and peaceful — no stress, no noise, just quiet.", visual: "Picture a glassy still lake at dawn with mist rising and not a single ripple.", example: "The tranquil garden made everyone feel relaxed the moment they walked in." },
    { word: "Voracious", emoji: "📚", definition: "Having a huge appetite for something — wanting more and more!", visual: "Imagine someone who reads so fast they finish a whole book before lunch and immediately grabs another!", example: "She was a voracious reader who went through three books every week." },
    { word: "Inevitable", emoji: "⏳", definition: "Something that is certain to happen — no way to avoid it.", visual: "Picture a giant snowball rolling down a hill getting bigger and bigger — there's no stopping it now!", example: "After staying up so late, it was inevitable that he would be tired in the morning." },
    { word: "Eloquent", emoji: "🎤", definition: "Able to express ideas in a clear, powerful, and beautiful way.", visual: "Imagine words flowing out of someone like music — every sentence perfectly chosen.", example: "Her eloquent speech made the whole audience feel moved." },
    { word: "Diligent", emoji: "📝", definition: "Working hard and carefully — never cutting corners.", visual: "Picture a student who erases and rewrites every letter until their handwriting is absolutely perfect.", example: "Her diligent studying every night helped her ace the test." },
    { word: "Bewildered", emoji: "😵", definition: "Completely confused — not sure what just happened.", visual: "Imagine walking into a room and forgetting why you came — multiplied by a hundred!", example: "He was bewildered when he walked out and his bike had completely disappeared." },
    { word: "Formidable", emoji: "🏋️", definition: "So impressive or powerful that it makes you feel a little intimidated.", visual: "Picture the tallest, steepest roller coaster you've ever seen — exciting but also a little scary.", example: "The formidable opponent had never lost a single chess match in three years." },
    { word: "Serendipity", emoji: "🍀", definition: "Finding something wonderful without even looking for it.", visual: "Imagine reaching into your coat pocket and finding a twenty dollar bill you forgot was there!", example: "It was pure serendipity that they both showed up at the same bookstore and became best friends." },
    { word: "Exhilarating", emoji: "🎢", definition: "Making you feel wildly excited and full of energy!", visual: "Picture the feeling of the very first drop on the tallest roller coaster — stomach flying, wind roaring!", example: "Surfing her first big wave was the most exhilarating thing she had ever done." },
    { word: "Conspicuous", emoji: "👀", definition: "Standing out so much that everyone notices you.", visual: "Picture someone wearing a bright neon orange suit at a party where everyone else is in black.", example: "The bright red barn was conspicuous in the middle of the snowy white field." },
    { word: "Ambiguous", emoji: "🤔", definition: "When something could mean more than one thing — not totally clear.", visual: "Imagine a picture that looks like a duck from one angle and a rabbit from another!", example: "The directions were ambiguous so they weren't sure which way to turn." },
    { word: "Peculiar", emoji: "🔍", definition: "Strange or unusual in a way that makes you curious.", visual: "Imagine finding a door in the middle of a forest that leads to a completely different world!", example: "The peculiar old house on the hill had lights that flickered on their own." },
  ],
};

const JOKES = {
  easy: [
    { setup: "Why did the teddy bear say no to dessert?", punchline: "Because she was already stuffed! 🧸" },
    { setup: "What do you call a sleeping dinosaur?", punchline: "A dino-snore! 🦕" },
    { setup: "Why did the cookie go to the doctor?", punchline: "Because it was feeling crummy! 🍪" },
    { setup: "What do you call a fish without eyes?", punchline: "A fsh! 🐟" },
    { setup: "Why did the bicycle fall over?", punchline: "Because it was two-tired! 🚲" },
    { setup: "What do you call a bear with no teeth?", punchline: "A gummy bear! 🐻" },
    { setup: "Why do bees have sticky hair?", punchline: "Because they use a honeycomb! 🐝" },
    { setup: "What has ears but cannot hear?", punchline: "A cornfield! 🌽" },
    { setup: "Why did the math book look so sad?", punchline: "Because it had too many problems! 📚" },
    { setup: "What do you call a magic dog?", punchline: "A labracadabrador! 🐕" },
    { setup: "Why can't Elsa have a balloon?", punchline: "Because she'll let it go! ❄️" },
    { setup: "What do elves learn in school?", punchline: "The elf-abet! 🧝" },
    { setup: "What do you call cheese that isn't yours?", punchline: "Nacho cheese! 🧀" },
    { setup: "Why did the scarecrow win an award?", punchline: "Because he was outstanding in his field! 🌾" },
    { setup: "What do you call a lazy kangaroo?", punchline: "A pouch potato! 🦘" },
    { setup: "Why did the golfer bring extra socks?", punchline: "In case he got a hole in one! ⛳" },
    { setup: "What did the ocean say to the beach?", punchline: "Nothing, it just waved! 🌊" },
    { setup: "Why did the superhero flush the toilet?", punchline: "Because it was his doody! 🦸" },
    { setup: "What do you call a magic owl?", punchline: "Hoo-dini! 🦉" },
    { setup: "Why did the banana go to the doctor?", punchline: "Because it wasn't peeling well! 🍌" },
  ],
  justRight: [
    { setup: "Why don't scientists trust atoms?", punchline: "Because they make up everything! ⚛️" },
    { setup: "What do you call a sleeping dinosaur?", punchline: "A dino-snore! 🦕" },
    { setup: "Why did the math book look so sad?", punchline: "Because it had too many problems! 📚" },
    { setup: "What has ears but cannot hear?", punchline: "A cornfield! 🌽" },
    { setup: "Why did the scarecrow win an award?", punchline: "Because he was outstanding in his field! 🌾" },
    { setup: "What do you call a lazy kangaroo?", punchline: "A pouch potato! 🦘" },
    { setup: "Why do bees have sticky hair?", punchline: "Because they use a honeycomb! 🐝" },
    { setup: "What do you call a magic dog?", punchline: "A labracadabrador! 🐕" },
    { setup: "Why did the golfer bring extra socks?", punchline: "In case he got a hole in one! ⛳" },
    { setup: "What did the ocean say to the beach?", punchline: "Nothing, it just waved! 🌊" },
    { setup: "Why did the cookie go to the doctor?", punchline: "Because it was feeling crummy! 🍪" },
    { setup: "What do you call a bear with no teeth?", punchline: "A gummy bear! 🐻" },
    { setup: "Why can't Elsa have a balloon?", punchline: "Because she'll let it go! ❄️" },
    { setup: "What do elves learn in school?", punchline: "The elf-abet! 🧝" },
    { setup: "What do you call cheese that isn't yours?", punchline: "Nacho cheese! 🧀" },
    { setup: "Why did the bicycle fall over?", punchline: "Because it was two-tired! 🚲" },
    { setup: "What do you call a fish without eyes?", punchline: "A fsh! 🐟" },
    { setup: "Why did the superhero flush the toilet?", punchline: "Because it was his doody! 🦸" },
    { setup: "What do you call a lazy kangaroo?", punchline: "A pouch potato! 🦘" },
    { setup: "Why did the golfer bring extra socks?", punchline: "In case he got a hole in one! ⛳" },
  ],
  challenge: [
    { setup: "Why did the physics teacher break up with the biology teacher?", punchline: "There was no chemistry! 🧪" },
    { setup: "What do you call a factory that makes okay products?", punchline: "A satisfactory! 🏭" },
    { setup: "I told my doctor I broke my arm in two places.", punchline: "He told me to stop going to those places! 💀" },
    { setup: "Why can't you trust an atom?", punchline: "They make up literally everything! ⚛️" },
    { setup: "What do you call a dinosaur that crashes their car?", punchline: "Tyrannosaurus wrecks! 🦖" },
    { setup: "Why did the scarecrow get promoted?", punchline: "Because he was outstanding in his field! 🌾" },
    { setup: "What do you call a fish wearing a crown?", punchline: "King of the sea-bass! 👑" },
    { setup: "Why did the bicycle keep falling over?", punchline: "It was two-tired of standing up! 🚲" },
    { setup: "What do Alexander the Great and Kermit the Frog have in common?", punchline: "The same middle name! 🐸" },
    { setup: "Why don't scientists trust stairs?", punchline: "Because they're always up to something! 🪜" },
    { setup: "What's the difference between a cat and a comma?", punchline: "One has claws at the end of its paws, the other is a pause at the end of a clause! 🐱" },
    { setup: "Why did the student eat his homework?", punchline: "Because the teacher told him it was a piece of cake! 🎂" },
    { setup: "What do you call an alligator in a vest?", punchline: "An investigator! 🐊" },
    { setup: "Why don't oysters share?", punchline: "Because they're shellfish! 🦪" },
    { setup: "What do you call a fake noodle?", punchline: "An impasta! 🍝" },
    { setup: "Why did the calendar go to therapy?", punchline: "Because it had too many dates! 📅" },
    { setup: "What do you call a boomerang that won't come back?", punchline: "A stick! 🪃" },
    { setup: "Why did the invisible man turn down the job?", punchline: "He couldn't see himself doing it! 👻" },
    { setup: "What do you call a parade of rabbits hopping backwards?", punchline: "A receding hare-line! 🐰" },
    { setup: "Why did the golfer wear two pairs of pants?", punchline: "In case he got a hole in one! ⛳" },
  ],
};

const FACTS = {
  easy: [
    "Dogs have wet noses to help them smell better! 🐶",
    "Butterflies taste with their feet! 🦋",
    "A group of flamingos is called a flamboyance! 🦩",
    "Elephants are the only animals that can't jump! 🐘",
    "Sea otters hold hands while sleeping so they don't drift apart! 🦦",
    "Cows have best friends and get sad when separated from them! 🐄",
    "A snail can sleep for 3 years! 🐌",
    "Penguins propose to their mates with a pebble! 🐧",
    "Octopuses have three hearts! 🐙",
    "Honey never spoils — it lasts forever! 🍯",
    "A group of cats is called a clowder! 🐱",
    "Polar bears have black skin under their white fur! 🐻‍❄️",
    "A group of owls is called a parliament! 🦉",
    "Pigs can get sunburned just like people! 🐷",
    "Dolphins have names for each other! 🐬",
    "A baby kangaroo is called a joey! 🦘",
    "Starfish don't have brains! ⭐",
    "Cows moo in different accents depending on where they live! 🐄",
    "A group of pandas is called an embarrassment! 🐼",
    "Wombats make cube-shaped poop! 🐨",
  ],
  justRight: [
    "A group of flamingos is called a flamboyance! 🦩",
    "Honey never spoils — archaeologists found 3,000 year old honey in Egyptian tombs and it was still good! 🍯",
    "Butterflies taste with their feet! 🦋",
    "A snail can sleep for 3 years! 🐌",
    "Octopuses have three hearts and blue blood! 🐙",
    "Cows have best friends and get stressed when separated from them! 🐄",
    "Sharks are older than trees — they've been around for 450 million years! 🦈",
    "A group of owls is called a parliament! 🦉",
    "Sea otters hold hands while sleeping so they don't drift apart! 🦦",
    "Elephants are the only animals that can't jump! 🐘",
    "A bolt of lightning is five times hotter than the surface of the sun! ⚡",
    "Wombats are the only animals that produce cube-shaped poop! 🐨",
    "The Eiffel Tower grows 6 inches taller in summer because metal expands in heat! 🗼",
    "Penguins propose to their mates with a pebble! 🐧",
    "A group of cats is called a clowder! 🐱",
    "Trees can communicate with each other through underground fungus networks! 🌳",
    "A shrimp's heart is in its head! 🦐",
    "Polar bears have black skin under their white fur to absorb heat from the sun! 🐻‍❄️",
    "A group of pandas is called an embarrassment! 🐼",
    "A day on Venus is longer than a year on Venus! 🪐",
  ],
  challenge: [
    "There are more possible iterations of a game of chess than there are atoms in the observable universe! ♟️",
    "Cleopatra lived closer in time to the Moon landing than to the construction of the Great Pyramid! 🏛️",
    "The human brain generates about 20 watts of power — enough to power a dim light bulb! 🧠",
    "Oxford University is older than the Aztec Empire — it started teaching in 1096! 📚",
    "A day on Mercury lasts longer than a year on Mercury! ☿",
    "Honey badgers have been documented using tools, planning escapes, and even rolling logs to use as steps! 🦡",
    "The inventor of the Pringles can was buried in one when he died! 🥫",
    "Nintendo was founded in 1889 — they started by making playing cards! 🎮",
    "A group of crows is called a murder, a group of ravens is called an unkindness! 🐦‍⬛",
    "The shortest war in history lasted 38 to 45 minutes — between Britain and Zanzibar in 1896! ⚔️",
    "Humans share 60% of their DNA with bananas! 🍌",
    "The average person walks the equivalent of five times around the Earth in their lifetime! 🌍",
    "The total weight of all ants on Earth is greater than the total weight of all humans! 🐜",
    "A single strand of spaghetti is called a spaghetto! 🍝",
    "The mantis shrimp can punch with the force of a bullet and sees 16 types of color! 🦐",
    "There are more stars in the universe than grains of sand on all of Earth's beaches! 🌟",
    "The longest hiccuping spree lasted 68 years! 😮",
    "Woolly mammoths were still alive when the Great Pyramid of Giza was being built! 🦣",
    "Vending machines kill more people per year than sharks! 🦈",
    "Oxford University is older than the Aztec Empire! 📚",
  ],
};

const AVATARS = [
  { id: "lion",      label: "Super Lion",      category: "Super Animals",    emoji: "🦁", color: "#FF6B35", bg: "#FFF3E0" },
  { id: "eagle",     label: "Super Eagle",     category: "Super Animals",    emoji: "🦅", color: "#1565C0", bg: "#E3F2FD" },
  { id: "dragon",    label: "Super Dragon",    category: "Super Creatures",  emoji: "🐉", color: "#6A1B9A", bg: "#F3E5F5" },
  { id: "phoenix",   label: "Super Phoenix",   category: "Super Creatures",  emoji: "🔥", color: "#E53935", bg: "#FFEBEE" },
  { id: "hero",      label: "Super Hero",      category: "Super Heroes",     emoji: "🦸", color: "#1976D2", bg: "#E3F2FD" },
  { id: "heroine",   label: "Super Heroine",   category: "Super Heroes",     emoji: "🦸‍♀️", color: "#C2185B", bg: "#FCE4EC" },
  { id: "astronaut", label: "Super Astronaut", category: "Super Astronauts", emoji: "🚀", color: "#00838F", bg: "#E0F7FA" },
  { id: "alien",     label: "Super Alien",     category: "Super Astronauts", emoji: "👾", color: "#2E7D32", bg: "#E8F5E9" },
  { id: "champion",  label: "Super Champion",  category: "Super Athletes",   emoji: "🏆", color: "#F57F17", bg: "#FFFDE7" },
  { id: "ninja",     label: "Super Ninja",     category: "Super Athletes",   emoji: "🥷", color: "#37474F", bg: "#ECEFF1" },
  { id: "explorer",  label: "Super Explorer",  category: "Super Adventure",  emoji: "🗺️", color: "#4E342E", bg: "#EFEBE9" },
  { id: "pirate",    label: "Super Pirate",    category: "Super Adventure",  emoji: "🏴‍☠️", color: "#212121", bg: "#F5F5F5" },
];

const DEFAULT_PRIZES = [
  { id: "1", emoji: "🍦", label: "Ice Cream Trip", cost: 10 },
  { id: "2", emoji: "🎮", label: "30 Min Extra Screen Time", cost: 15 },
  { id: "3", emoji: "🎬", label: "Movie Night Pick", cost: 20 },
  { id: "4", emoji: "🧸", label: "New Toy", cost: 50 },
];

const CONFETTI_COLORS = ["#FFD700","#FF6B6B","#4ECDC4","#45B7D1","#96CEB4","#FFEAA7","#DDA0DD"];

const HERO_STATES = ["🦸","🦸","🦸","🦸","🦸","😵","💀"];
const HERO_LABELS = ["Full power!","Cape lost!","Mask gone!","Belt off!","One boot!","Barely standing!","Game over!"];

function getTodayContent(difficulty = "justRight") {
  const now = new Date();
  const day = Math.floor((now - new Date(now.getFullYear(), 0, 0)) / 86400000);
  const wordBank = WORDS[difficulty] || WORDS.justRight;
  const jokeBank = JOKES[difficulty] || JOKES.justRight;
  const factBank = FACTS[difficulty] || FACTS.justRight;
  return {
    word: wordBank[day % wordBank.length],
    joke: jokeBank[day % jokeBank.length],
    fact: factBank[day % factBank.length],
  };
}

function playSound(type) {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    if (type === "award") {
      [523,659,784,1047,1319].forEach((freq,i) => {
        const o=ctx.createOscillator(),g=ctx.createGain();
        o.connect(g);g.connect(ctx.destination);o.frequency.value=freq;o.type="square";
        g.gain.setValueAtTime(0,ctx.currentTime+i*0.1);
        g.gain.linearRampToValueAtTime(0.3,ctx.currentTime+i*0.1+0.05);
        g.gain.exponentialRampToValueAtTime(0.001,ctx.currentTime+i*0.1+0.3);
        o.start(ctx.currentTime+i*0.1);o.stop(ctx.currentTime+i*0.1+0.3);
      });
    } else if (type === "deduct") {
      [{freq:392,start:0,dur:0.2},{freq:349,start:0.22,dur:0.2},{freq:294,start:0.44,dur:0.6}].forEach(({freq,start,dur}) => {
        const o=ctx.createOscillator(),g=ctx.createGain();
        o.connect(g);g.connect(ctx.destination);o.type="triangle";
        o.frequency.setValueAtTime(freq,ctx.currentTime+start);
        o.frequency.linearRampToValueAtTime(freq*0.95,ctx.currentTime+start+dur);
        g.gain.setValueAtTime(0,ctx.currentTime+start);
        g.gain.linearRampToValueAtTime(0.4,ctx.currentTime+start+0.03);
        g.gain.setValueAtTime(0.4,ctx.currentTime+start+dur-0.1);
        g.gain.linearRampToValueAtTime(0,ctx.currentTime+start+dur);
        o.start(ctx.currentTime+start);o.stop(ctx.currentTime+start+dur+0.05);
      });
    } else if (type === "redeem") {
      [523,659,784,659,1047].forEach((freq,i) => {
        const o=ctx.createOscillator(),g=ctx.createGain();
        o.connect(g);g.connect(ctx.destination);o.frequency.value=freq;o.type=i%2===0?"square":"sine";
        g.gain.setValueAtTime(0,ctx.currentTime+i*0.1);
        g.gain.linearRampToValueAtTime(0.3,ctx.currentTime+i*0.1+0.05);
        g.gain.exponentialRampToValueAtTime(0.001,ctx.currentTime+i*0.1+0.35);
        o.start(ctx.currentTime+i*0.1);o.stop(ctx.currentTime+i*0.1+0.35);
      });
    }
  } catch(e) {}
}

function Confetti({ active }) {
  const [pieces] = useState(() => Array.from({length:40},(_,i) => ({
    left:Math.random()*100,size:8+Math.random()*8,color:CONFETTI_COLORS[i%7],
    round:Math.random()>.5,dur:1.5+Math.random()*2,delay:Math.random()*.8,rot:Math.random()*360,
  })));
  if (!active) return null;
  return (
    <div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:1000}}>
      {pieces.map((p,i) => (
        <div key={i} style={{position:"absolute",left:`${p.left}%`,top:"-10px",width:p.size,height:p.size,backgroundColor:p.color,borderRadius:p.round?"50%":"2px",animation:`fall ${p.dur}s ease-in forwards`,animationDelay:`${p.delay}s`,transform:`rotate(${p.rot}deg)`}} />
      ))}
    </div>
  );
}

function AvatarPicker({ selected, onSelect }) {
  const categories = [...new Set(AVATARS.map(a => a.category))];
  return (
    <div>
      {categories.map(cat => (
        <div key={cat} style={{marginBottom:16}}>
          <div style={{color:"rgba(255,255,255,0.5)",fontSize:11,textTransform:"uppercase",letterSpacing:1.5,marginBottom:8}}>{cat}</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
            {AVATARS.filter(a => a.category===cat).map(a => (
              <button key={a.id} onClick={() => onSelect(a.id)} style={{background:selected===a.id?`linear-gradient(135deg,${a.color}44,${a.color}22)`:"rgba(255,255,255,0.08)",border:selected===a.id?`2px solid ${a.color}`:"2px solid rgba(255,255,255,0.1)",borderRadius:14,padding:"12px 8px",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:6}}>
                <div style={{fontSize:36,background:a.bg,borderRadius:"50%",width:56,height:56,display:"flex",alignItems:"center",justifyContent:"center"}}>{a.emoji}</div>
                <div style={{color:selected===a.id?"white":"rgba(255,255,255,0.6)",fontSize:12,fontWeight:"bold",textAlign:"center"}}>{a.label}</div>
                {selected===a.id && <div style={{fontSize:10,color:a.color,fontWeight:"bold"}}>✓ Selected</div>}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function AvatarDisplay({ avatarId, size=48 }) {
  const avatar = AVATARS.find(a => a.id===avatarId) || AVATARS[0];
  return (
    <div style={{width:size,height:size,borderRadius:"50%",background:avatar.bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:size*0.55,border:`3px solid ${avatar.color}`,flexShrink:0}}>
      {avatar.emoji}
    </div>
  );
}

function LoginScreen({ onLogin }) {
  const [code,setCode]=useState("");
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState("");
  async function handleLogin() {
    const c=code.trim().toUpperCase();
    if (!c) return;
    setLoading(true);setError("");
    try {
      const {data,error}=await supabase.from("profiles").select("*").eq("family_code",c).single();
      if (error && error.code==="PGRST116") {
        const {data:newData,error:insertError}=await supabase.from("profiles").insert({family_code:c,points:0,log:[],prizes:DEFAULT_PRIZES,word_history:[],used_date:"",kids:[]}).select().single();
        if (insertError) throw insertError;
        onLogin(c,newData);
      } else if (error) { throw error; } else { onLogin(c,data); }
    } catch(e) { setError("Something went wrong. Try again!"); }
    setLoading(false);
  }
  return (
    <div style={{minHeight:"100vh",background:"linear-gradient(160deg,#1a1a6e,#2d1b69 40%,#11998e 75%,#38ef7d)",display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
      <div style={{background:"rgba(255,255,255,0.12)",borderRadius:24,padding:36,width:"100%",maxWidth:380,textAlign:"center",border:"2px solid rgba(255,255,255,0.2)"}}>
        <div style={{fontSize:64,marginBottom:8}}>⭐</div>
        <h1 style={{color:"white",fontWeight:"bold",fontSize:32,marginBottom:8}}>SuperKid</h1>
        <p style={{color:"rgba(255,255,255,0.6)",fontSize:14,marginBottom:28}}>Enter your family code to get started!</p>
        <input value={code} onChange={e=>setCode(e.target.value.toUpperCase())} onKeyDown={e=>e.key==="Enter"&&handleLogin()} placeholder="FAMILY CODE" maxLength={10}
          style={{width:"100%",background:"rgba(255,255,255,0.15)",border:"2px solid rgba(255,255,255,0.3)",borderRadius:14,padding:"14px 16px",color:"white",fontSize:22,textAlign:"center",outline:"none",letterSpacing:4,fontWeight:"bold",marginBottom:12}} />
        {error && <p style={{color:"#FF6B6B",fontSize:13,marginBottom:10}}>{error}</p>}
        <button onClick={handleLogin} disabled={loading} style={{width:"100%",background:"linear-gradient(135deg,#FF6B6B,#FF8E53)",border:"none",borderRadius:14,padding:"16px",color:"white",fontWeight:"bold",fontSize:20,cursor:"pointer"}}>
          {loading?"Loading...":"Let's Go! 🚀"}
        </button>
        <p style={{color:"rgba(255,255,255,0.4)",fontSize:12,marginTop:16}}>Same code on any device = shared profile.</p>
      </div>
    </div>
  );
}

function AddKidScreen({ onSave, onCancel, existing }) {
  const [name,setName]=useState(existing?.name||"");
  const [age,setAge]=useState(existing?.age||"");
  const [avatarId,setAvatarId]=useState(existing?.avatarId||"lion");
  const [difficulty,setDifficulty]=useState(existing?.difficulty||"justRight");
  function handleSave() { if (!name.trim()) return; onSave({name:name.trim(),age:parseInt(age)||5,avatarId,difficulty}); }
  const diffOptions=[{id:"easy",label:"🐣 Easy",desc:"Ages 3-5"},{id:"justRight",label:"⭐ Just Right",desc:"Age appropriate"},{id:"challenge",label:"🚀 Challenge Me!",desc:"Advanced"}];
  return (
    <div style={{minHeight:"100vh",background:"linear-gradient(160deg,#1a1a6e,#2d1b69 40%,#11998e 75%,#38ef7d)",padding:"24px 16px 40px"}}>
      <div style={{maxWidth:460,margin:"0 auto"}}>
        <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:24}}>
          <button onClick={onCancel} style={{background:"rgba(255,255,255,0.15)",border:"none",borderRadius:10,padding:"8px 14px",color:"white",fontSize:16,cursor:"pointer"}}>← Back</button>
          <div style={{color:"white",fontWeight:"bold",fontSize:20}}>{existing?"Edit Kid":"Add a Kid"}</div>
        </div>
        <div style={{background:"rgba(255,255,255,0.12)",borderRadius:20,padding:20,marginBottom:16,border:"2px solid rgba(255,255,255,0.2)"}}>
          <div style={{color:"rgba(255,255,255,0.6)",fontSize:12,marginBottom:8,textTransform:"uppercase",letterSpacing:1}}>Name</div>
          <input value={name} onChange={e=>setName(e.target.value)} placeholder="e.g. Crew" style={{width:"100%",background:"rgba(255,255,255,0.1)",border:"2px solid rgba(255,255,255,0.2)",borderRadius:12,padding:"12px 14px",color:"white",fontSize:18,outline:"none",marginBottom:14}} />
          <div style={{color:"rgba(255,255,255,0.6)",fontSize:12,marginBottom:8,textTransform:"uppercase",letterSpacing:1}}>Age</div>
          <input type="number" value={age} onChange={e=>setAge(e.target.value)} placeholder="5" style={{width:"100%",background:"rgba(255,255,255,0.1)",border:"2px solid rgba(255,255,255,0.2)",borderRadius:12,padding:"12px 14px",color:"white",fontSize:18,outline:"none"}} />
        </div>
        <div style={{background:"rgba(255,255,255,0.12)",borderRadius:20,padding:20,marginBottom:16,border:"2px solid rgba(255,255,255,0.2)"}}>
          <div style={{color:"rgba(255,255,255,0.6)",fontSize:12,marginBottom:12,textTransform:"uppercase",letterSpacing:1}}>Content Difficulty</div>
          <div style={{display:"flex",flexDirection:"column",gap:8}}>
            {diffOptions.map(d => (
              <button key={d.id} onClick={()=>setDifficulty(d.id)} style={{background:difficulty===d.id?"rgba(255,215,0,0.2)":"rgba(255,255,255,0.08)",border:difficulty===d.id?"2px solid rgba(255,215,0,0.5)":"2px solid rgba(255,255,255,0.1)",borderRadius:12,padding:"12px 16px",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <span style={{color:"white",fontWeight:"bold",fontSize:15}}>{d.label}</span>
                <span style={{color:"rgba(255,255,255,0.5)",fontSize:12}}>{d.desc}</span>
                {difficulty===d.id && <span style={{color:"#FFD700",fontSize:14}}>✓</span>}
              </button>
            ))}
          </div>
        </div>
        <div style={{background:"rgba(255,255,255,0.12)",borderRadius:20,padding:20,marginBottom:20,border:"2px solid rgba(255,255,255,0.2)"}}>
          <div style={{color:"rgba(255,255,255,0.6)",fontSize:12,marginBottom:14,textTransform:"uppercase",letterSpacing:1}}>Choose Avatar</div>
          <AvatarPicker selected={avatarId} onSelect={setAvatarId} />
        </div>
        <button onClick={handleSave} style={{width:"100%",background:"linear-gradient(135deg,#FF6B6B,#FF8E53)",border:"none",borderRadius:14,padding:"16px",color:"white",fontWeight:"bold",fontSize:20,cursor:"pointer"}}>
          {existing?"Save Changes ✓":"Add to Family! 🎉"}
        </button>
      </div>
    </div>
  );
}

// ─── Hangman Game ─────────────────────────────────────────────────────────────
function HangmanGame({ word, definition, onWin, onLose, soundEnabled }) {
  const letters = word.toUpperCase().split("");
  const [guessed, setGuessed] = useState(new Set());
  const [wrong, setWrong] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const maxWrong = 6;

  const solved = letters.every(l => l === " " || guessed.has(l));

  useEffect(() => {
    if (solved && !gameOver) { setWon(true); setGameOver(true); onWin(); }
  }, [guessed]);

  function guess(letter) {
    if (gameOver || guessed.has(letter)) return;
    const newGuessed = new Set(guessed);
    newGuessed.add(letter);
    setGuessed(newGuessed);
    if (!letters.includes(letter)) {
      const newWrong = wrong + 1;
      setWrong(newWrong);
      if (newWrong >= maxWrong) { setGameOver(true); onLose(); }
    }
  }

  const heroEmojis = ["🦸","🦸","🦸","🦸","😰","😵","💀"];
  const heroColors = ["#FFD700","#FFD700","#FFA500","#FF6B35","#FF4444","#CC0000","#880000"];

  return (
    <div style={{background:"rgba(255,255,255,0.11)",borderRadius:22,padding:22,border:"2px solid rgba(255,255,255,0.2)"}}>
      {/* Header */}
      <div style={{textAlign:"center",marginBottom:16}}>
        <div style={{fontSize:10,color:"rgba(255,255,255,0.45)",textTransform:"uppercase",letterSpacing:2,marginBottom:4}}>Daily Hangman</div>
        <div style={{fontSize:56,transition:"all 0.3s"}}>{heroEmojis[wrong]}</div>
        <div style={{color:heroColors[wrong],fontSize:13,fontWeight:"bold",marginTop:4}}>{HERO_LABELS[wrong]}</div>
        {/* Wrong counter */}
        <div style={{display:"flex",justifyContent:"center",gap:6,marginTop:8}}>
          {Array.from({length:maxWrong}).map((_,i) => (
            <div key={i} style={{width:12,height:12,borderRadius:"50%",background:i<wrong?"#e74c3c":"rgba(255,255,255,0.2)",transition:"background 0.3s"}} />
          ))}
        </div>
      </div>

      {/* Word display */}
      <div style={{display:"flex",justifyContent:"center",gap:8,marginBottom:20,flexWrap:"wrap"}}>
        {letters.map((l,i) => (
          <div key={i} style={{minWidth:28,textAlign:"center"}}>
            {l === " " ? (
              <div style={{width:28,height:2}} />
            ) : (
              <>
                <div style={{fontSize:24,fontWeight:"bold",color:guessed.has(l)?"#FFD700":"transparent",textShadow:guessed.has(l)?"0 0 8px rgba(255,215,0,0.4)":"none",minHeight:32,transition:"all 0.3s"}}>{l}</div>
                <div style={{height:3,background:guessed.has(l)?"#FFD700":"rgba(255,255,255,0.4)",borderRadius:2,marginTop:2,transition:"background 0.3s"}} />
              </>
            )}
          </div>
        ))}
      </div>

      {/* Hint */}
      {!gameOver && (
        <div style={{marginBottom:14}}>
          {!showHint ? (
            <button onClick={()=>setShowHint(true)} style={{width:"100%",background:"rgba(255,255,255,0.08)",border:"2px solid rgba(255,255,255,0.15)",borderRadius:11,padding:"9px",color:"rgba(255,255,255,0.6)",fontSize:13,cursor:"pointer"}}>
              💡 Show Hint (-1 pt)
            </button>
          ) : (
            <div style={{background:"rgba(78,205,196,0.1)",borderRadius:11,padding:"10px 14px",border:"1px solid rgba(78,205,196,0.2)",textAlign:"center"}}>
              <span style={{color:"#4ECDC4",fontSize:13}}>{definition}</span>
            </div>
          )}
        </div>
      )}

      {/* Game over states */}
      {gameOver && (
        <div style={{background:won?"linear-gradient(135deg,#96CEB4,#4ECDC4)":"linear-gradient(135deg,#e74c3c,#c0392b)",borderRadius:14,padding:"16px",textAlign:"center",marginBottom:14}}>
          {won ? (
            <div>
              <div style={{fontSize:32,marginBottom:4}}>🎉</div>
              <div style={{color:"white",fontWeight:"bold",fontSize:18}}>Amazing! You got it! +3 pts!</div>
            </div>
          ) : (
            <div>
              <div style={{fontSize:32,marginBottom:4}}>💀</div>
              <div style={{color:"white",fontWeight:"bold",fontSize:16}}>The word was: <span style={{color:"#FFD700"}}>{word.toUpperCase()}</span></div>
              <div style={{color:"rgba(255,255,255,0.8)",fontSize:13,marginTop:4}}>{definition}</div>
            </div>
          )}
        </div>
      )}

      {/* Keyboard */}
      {!gameOver && (
        <div>
          {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").reduce((rows,l,i) => {
            const row = Math.floor(i/9);
            if (!rows[row]) rows[row]=[];
            rows[row].push(l);
            return rows;
          },[]).map((row,ri) => (
            <div key={ri} style={{display:"flex",justifyContent:"center",gap:5,marginBottom:5}}>
              {row.map(l => {
                const isGuessed = guessed.has(l);
                const isCorrect = isGuessed && letters.includes(l);
                const isWrong = isGuessed && !letters.includes(l);
                return (
                  <button key={l} onClick={()=>guess(l)} disabled={isGuessed}
                    style={{width:32,height:36,borderRadius:8,border:"none",cursor:isGuessed?"default":"pointer",fontWeight:"bold",fontSize:14,transition:"all 0.2s",
                      background:isCorrect?"linear-gradient(135deg,#2ecc71,#27ae60)":isWrong?"rgba(231,76,60,0.3)":"rgba(255,255,255,0.15)",
                      color:isCorrect?"white":isWrong?"rgba(255,255,255,0.3)":"white",
                      opacity:isGuessed?0.6:1,
                    }}>
                    {l}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Puzzle Tab ───────────────────────────────────────────────────────────────
function PuzzleTab({ word, onEarn, puzzleDone, kidName, onSkip }) {
  const [playing, setPlaying] = useState(false);
  const [result, setResult] = useState(null);

  function handleWin() { setResult("won"); onEarn("hangman_win"); }
  function handleLose() { setResult("lost"); onEarn("hangman_lose"); }

  if (puzzleDone) {
    return (
      <div style={{ background: "rgba(255,255,255,0.11)", borderRadius: 22, padding: 28, border: "2px solid rgba(255,255,255,0.2)", textAlign: "center" }}>
        <div style={{ fontSize: 56, marginBottom: 12 }}>{result === "won" ? "🏆" : "💪"}</div>
        <div style={{ color: "#FFD700", fontWeight: "bold", fontSize: 22, marginBottom: 8 }}>
          {result === "won" ? "Puzzle Complete!" : "Good try!"}
        </div>
        <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 14 }}>Come back tomorrow for a new word!</div>
      </div>
    );
  }

  return (
    <div>
      {!playing ? (
        <div style={{ background: "rgba(255,255,255,0.11)", borderRadius: 22, padding: 28, border: "2px solid rgba(255,255,255,0.2)", textAlign: "center" }}>
          <div style={{ fontSize: 64, marginBottom: 12 }}>🎮</div>
          <div style={{ color: "white", fontWeight: "bold", fontSize: 22, marginBottom: 8 }}>Daily Hangman</div>
          <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, marginBottom: 8 }}>
            Can {kidName} guess today's word?
          </div>
          <div style={{ background: "rgba(255,215,0,0.1)", borderRadius: 14, padding: "12px 16px", marginBottom: 20, border: "1px solid rgba(255,215,0,0.2)" }}>
            <div style={{ color: "#FFD700", fontWeight: "bold", fontSize: 16 }}>🏆 Win = +3 pts</div>
            <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 12, marginTop: 4 }}>6 wrong guesses allowed • Use hint for a clue</div>
          </div>
          <button onClick={() => setPlaying(true)} style={{ width: "100%", background: "linear-gradient(135deg,#FF6B6B,#FF8E53)", border: "none", borderRadius: 14, padding: "16px", color: "white", fontWeight: "bold", fontSize: 20, cursor: "pointer", marginBottom: 12 }}>
            🎯 Play Hangman!
          </button>
          <button onClick={onSkip} style={{ width: "100%", background: "transparent", border: "none", color: "rgba(255,255,255,0.35)", fontSize: 13, cursor: "pointer", padding: "8px" }}>
            Skip — Go to Word of the Day →
          </button>
        </div>
      ) : (
        <HangmanGame word={word.word} definition={word.definition} onWin={handleWin} onLose={handleLose} />
      )}
    </div>
  );
}

function WordTab({ word, onUsed, used, kidName }) {
  return (
    <div style={{background:"rgba(255,255,255,0.11)",borderRadius:22,padding:20,border:"2px solid rgba(255,255,255,0.2)"}}>
      <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:14}}>
        <span style={{fontSize:36}}>{word.emoji}</span>
        <div>
          <div style={{fontSize:10,color:"rgba(255,255,255,0.45)",textTransform:"uppercase",letterSpacing:2}}>Word of the Day</div>
          <div style={{fontSize:32,color:"#FFD700",fontWeight:"bold",lineHeight:1}}>{word.word}</div>
        </div>
      </div>
      {[["Means","#4ECDC4",word.definition,false],["🌟 Picture","#96CEB4",word.visual,false],["💬 Example","#FFEAA7",`"${word.example}"`,true]].map(([lbl,col,txt,ital]) => (
        <div key={lbl} style={{background:"rgba(255,255,255,0.09)",borderRadius:12,padding:"11px 13px",marginBottom:9}}>
          <p style={{color:"white",fontSize:14,margin:0,lineHeight:1.55,fontStyle:ital?"italic":"normal"}}>
            <strong style={{color:col,fontStyle:"normal"}}>{lbl}: </strong>{txt}
          </p>
        </div>
      ))}
      {used
        ? <div style={{background:"linear-gradient(135deg,#96CEB4,#4ECDC4)",borderRadius:13,padding:"13px 18px",textAlign:"center",marginTop:6}}>
            <span style={{color:"white",fontWeight:"bold",fontSize:17}}>🎉 {kidName} used it today! +2 pts!</span>
          </div>
        : <button onClick={onUsed} style={{width:"100%",background:"linear-gradient(135deg,#FF6B6B,#FF8E53)",border:"none",borderRadius:13,padding:"15px 20px",color:"white",fontWeight:"bold",fontSize:18,cursor:"pointer",marginTop:6}}>
            🗣️ {kidName} used it in a sentence! +2 pts
          </button>
      }
    </div>
  );
}

function PointsTab({ log, onAdd, onEditLog, soundEnabled, kidName }) {
  const [reason,setReason]=useState("");
  const [amt,setAmt]=useState(1);
  const [editingIdx,setEditingIdx]=useState(null);
  const [editReason,setEditReason]=useState("");
  const [editAmt,setEditAmt]=useState(1);
  function startEdit(i){setEditingIdx(i);setEditReason(log[i].reason);setEditAmt(Math.abs(log[i].delta));}
  function saveEdit(){const orig=log[editingIdx];const nd=orig.delta>0?Math.abs(editAmt):-Math.abs(editAmt);onEditLog(editingIdx,{...orig,reason:editReason,delta:nd});setEditingIdx(null);}
  return (
    <div>
      <div style={{background:"rgba(255,255,255,0.1)",borderRadius:20,padding:18,border:"2px solid rgba(255,255,255,0.18)",marginBottom:13}}>
        <div style={{fontSize:11,color:"rgba(255,255,255,0.5)",textTransform:"uppercase",letterSpacing:1,textAlign:"center",marginBottom:12}}>PARENT CONTROLS</div>
        <input value={reason} onChange={e=>setReason(e.target.value)} placeholder={`Reason (e.g. ${kidName} helped set the table)`}
          style={{width:"100%",background:"rgba(255,255,255,0.1)",border:"2px solid rgba(255,255,255,0.18)",borderRadius:11,padding:"10px 12px",color:"white",fontSize:14,outline:"none",marginBottom:10}} />
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:13}}>
          <div style={{flex:1,display:"flex",alignItems:"center",background:"rgba(255,255,255,0.1)",border:"2px solid rgba(255,255,255,0.18)",borderRadius:11,overflow:"hidden"}}>
            <button onClick={()=>setAmt(a=>Math.max(1,a-1))} style={{background:"none",border:"none",color:"white",fontSize:22,padding:"8px 14px",cursor:"pointer"}}>−</button>
            <span style={{flex:1,textAlign:"center",fontSize:22,color:"#FFD700",fontWeight:"bold"}}>{amt}</span>
            <button onClick={()=>setAmt(a=>a+1)} style={{background:"none",border:"none",color:"white",fontSize:22,padding:"8px 14px",cursor:"pointer"}}>+</button>
          </div>
          <span style={{fontSize:12,color:"rgba(255,255,255,0.4)"}}>pts</span>
        </div>
        <div style={{display:"flex",gap:9}}>
          <button onClick={()=>{onAdd(amt,reason.trim()||"Good behavior 🌟",soundEnabled);setReason("");}} style={{flex:1,background:"linear-gradient(135deg,#2ecc71,#27ae60)",border:"none",borderRadius:12,padding:"14px 0",color:"white",fontWeight:"bold",fontSize:17,cursor:"pointer"}}>✅ Award</button>
          <button onClick={()=>{onAdd(-amt,reason.trim()||"Behavior reminder",soundEnabled);setReason("");}} style={{flex:1,background:"linear-gradient(135deg,#e74c3c,#c0392b)",border:"none",borderRadius:12,padding:"14px 0",color:"white",fontWeight:"bold",fontSize:17,cursor:"pointer"}}>❌ Deduct</button>
        </div>
      </div>
      <div style={{background:"rgba(255,255,255,0.07)",borderRadius:18,padding:15,border:"2px solid rgba(255,255,255,0.1)"}}>
        <div style={{fontSize:17,color:"white",fontWeight:"bold",marginBottom:10}}>📋 Activity Log</div>
        {log.length===0
          ? <div style={{color:"rgba(255,255,255,0.35)",fontSize:13,textAlign:"center",padding:"10px 0"}}>No activity yet!</div>
          : log.slice(0,20).map((e,i) => (
            <div key={i} style={{background:e.delta>0?"rgba(46,204,113,0.1)":"rgba(231,76,60,0.1)",borderRadius:10,padding:"9px 12px",marginBottom:7,borderLeft:`3px solid ${e.delta>0?"#2ecc71":"#e74c3c"}`}}>
              {editingIdx===i ? (
                <div>
                  <input value={editReason} onChange={e=>setEditReason(e.target.value)} style={{width:"100%",background:"rgba(255,255,255,0.1)",border:"2px solid rgba(255,255,255,0.2)",borderRadius:8,padding:"7px 10px",color:"white",fontSize:13,outline:"none",marginBottom:8}} />
                  <div style={{display:"flex",alignItems:"center",gap:8}}>
                    <div style={{display:"flex",alignItems:"center",background:"rgba(255,255,255,0.1)",borderRadius:8,overflow:"hidden"}}>
                      <button onClick={()=>setEditAmt(a=>Math.max(1,a-1))} style={{background:"none",border:"none",color:"white",fontSize:18,padding:"4px 10px",cursor:"pointer"}}>−</button>
                      <span style={{fontSize:16,color:"#FFD700",fontWeight:"bold",padding:"0 8px"}}>{editAmt}</span>
                      <button onClick={()=>setEditAmt(a=>a+1)} style={{background:"none",border:"none",color:"white",fontSize:18,padding:"4px 10px",cursor:"pointer"}}>+</button>
                    </div>
                    <button onClick={saveEdit} style={{background:"linear-gradient(135deg,#2ecc71,#27ae60)",border:"none",borderRadius:8,padding:"6px 14px",color:"white",fontWeight:"bold",fontSize:13,cursor:"pointer"}}>Save</button>
                    <button onClick={()=>setEditingIdx(null)} style={{background:"rgba(255,255,255,0.1)",border:"none",borderRadius:8,padding:"6px 14px",color:"white",fontSize:13,cursor:"pointer"}}>Cancel</button>
                    <button onClick={()=>{onEditLog(i,null);setEditingIdx(null);}} style={{background:"rgba(231,76,60,0.2)",border:"none",borderRadius:8,padding:"6px 10px",color:"#e74c3c",fontSize:13,cursor:"pointer"}}>🗑️</button>
                  </div>
                </div>
              ) : (
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <div style={{flex:1}}>
                    <div style={{fontSize:13,fontWeight:700,color:"white"}}>{e.reason}</div>
                    <div style={{fontSize:10,color:"rgba(255,255,255,0.35)"}}>{e.d}</div>
                  </div>
                  <div style={{display:"flex",alignItems:"center",gap:8}}>
                    <div style={{fontSize:18,fontWeight:"bold",color:e.delta>0?"#2ecc71":"#e74c3c"}}>{e.delta>0?"+":""}{e.delta}</div>
                    <button onClick={()=>startEdit(i)} style={{background:"rgba(255,255,255,0.1)",border:"none",borderRadius:7,padding:"4px 8px",color:"rgba(255,255,255,0.6)",fontSize:12,cursor:"pointer"}}>✏️</button>
                  </div>
                </div>
              )}
            </div>
          ))
        }
      </div>
    </div>
  );
}

function PrizesTab({ pts, prizes, onSave, onRedeem }) {
  const [editing,setEditing]=useState(false);
  const [draft,setDraft]=useState(prizes);
  const [em,setEm]=useState("🎁");
  const [lbl,setLbl]=useState("");
  const [cost,setCost]=useState(10);
  function add(){if(!lbl.trim())return;setDraft(d=>[...d,{id:Date.now()+"",emoji:em,label:lbl.trim(),cost:parseInt(cost)||10}]);setLbl("");setEm("🎁");setCost(10);}
  function save(){onSave(draft);setEditing(false);}
  const sorted=[...(editing?draft:prizes)].sort((a,b)=>a.cost-b.cost);
  const inp={background:"rgba(255,255,255,0.1)",border:"2px solid rgba(255,255,255,0.18)",borderRadius:10,padding:"9px 11px",color:"white",fontSize:14,outline:"none"};
  return (
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
        <div style={{fontSize:19,color:"white",fontWeight:"bold"}}>🎁 Prize Board</div>
        {!editing
          ? <button onClick={()=>{setDraft(prizes);setEditing(true);}} style={{background:"rgba(255,255,255,0.12)",border:"2px solid rgba(255,255,255,0.2)",borderRadius:9,padding:"6px 13px",color:"white",fontWeight:"bold",fontSize:12,cursor:"pointer"}}>✏️ Edit</button>
          : <button onClick={save} style={{background:"linear-gradient(135deg,#2ecc71,#27ae60)",border:"none",borderRadius:9,padding:"6px 13px",color:"white",fontWeight:"bold",fontSize:14,cursor:"pointer"}}>💾 Save</button>
        }
      </div>
      {sorted.map(p => {
        const ok=pts>=p.cost;
        return (
          <div key={p.id} style={{display:"flex",alignItems:"center",gap:12,borderRadius:15,padding:"12px 14px",marginBottom:8,background:ok?"rgba(255,215,0,0.15)":"rgba(255,255,255,0.07)",border:ok?"2px solid rgba(255,215,0,0.4)":"2px solid rgba(255,255,255,0.1)"}}>
            <span style={{fontSize:28}}>{p.emoji}</span>
            <div style={{flex:1}}>
              <div style={{fontSize:16,fontWeight:"bold",color:ok?"#FFD700":"white"}}>{p.label}</div>
              <div style={{fontSize:11,color:"rgba(255,255,255,0.4)"}}>{p.cost} pts needed</div>
            </div>
            {ok ? <button onClick={()=>onRedeem(p)} style={{background:"linear-gradient(135deg,#FFD700,#FFA500)",border:"none",borderRadius:10,padding:"8px 14px",color:"white",fontWeight:"bold",fontSize:13,cursor:"pointer"}}>🎁 Redeem</button>
                : <div style={{fontSize:11,color:"rgba(255,255,255,0.3)"}}>{p.cost-pts} to go</div>}
            {editing && <button onClick={()=>setDraft(d=>d.filter(x=>x.id!==p.id))} style={{background:"rgba(231,76,60,0.2)",border:"none",borderRadius:7,padding:"5px 8px",color:"#e74c3c",cursor:"pointer"}}>✕</button>}
          </div>
        );
      })}
      {editing && (
        <div style={{background:"rgba(255,255,255,0.08)",borderRadius:15,padding:15,border:"2px dashed rgba(255,255,255,0.2)",marginTop:10}}>
          <div style={{fontSize:12,color:"rgba(255,255,255,0.45)",marginBottom:10}}>Add a prize:</div>
          <div style={{display:"flex",gap:7,marginBottom:8}}>
            <input value={em} onChange={e=>setEm(e.target.value)} style={{...inp,width:46,textAlign:"center",fontSize:20,padding:"8px 4px"}} />
            <input value={lbl} onChange={e=>setLbl(e.target.value)} placeholder="Prize name" style={{...inp,flex:1}} />
          </div>
          <div style={{display:"flex",gap:8,alignItems:"center"}}>
            <input type="number" value={cost} onChange={e=>setCost(e.target.value)} style={{...inp,width:75,color:"#FFD700",fontWeight:"bold",fontSize:18}} />
            <span style={{fontSize:12,color:"rgba(255,255,255,0.4)"}}>pts</span>
            <button onClick={add} style={{marginLeft:"auto",background:"linear-gradient(135deg,#4ECDC4,#45B7D1)",border:"none",borderRadius:9,padding:"9px 16px",color:"white",fontWeight:"bold",fontSize:15,cursor:"pointer"}}>+ Add</button>
          </div>
        </div>
      )}
    </div>
  );
}

function ExtrasTab({ joke, fact, onEarn, jokeShared, factShared, kidName }) {
  const [showPunchline,setShowPunchline]=useState(false);
  return (
    <div>
      <div style={{background:"rgba(255,255,255,0.11)",borderRadius:22,padding:22,border:"2px solid rgba(255,255,255,0.2)",marginBottom:16}}>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}>
          <div style={{fontSize:36,background:"rgba(255,220,0,0.15)",borderRadius:"50%",width:56,height:56,display:"flex",alignItems:"center",justifyContent:"center"}}>😄</div>
          <div>
            <div style={{fontSize:10,color:"rgba(255,255,255,0.45)",textTransform:"uppercase",letterSpacing:2}}>Joke of the Day</div>
            <div style={{fontSize:18,color:"white",fontWeight:"bold"}}>Make someone laugh!</div>
          </div>
        </div>
        <div style={{background:"rgba(255,255,255,0.09)",borderRadius:14,padding:"14px 16px",marginBottom:12}}>
          <p style={{color:"white",fontSize:16,margin:0,lineHeight:1.5,fontWeight:"600"}}>{joke.setup}</p>
        </div>
        {!showPunchline ? (
          <button onClick={()=>setShowPunchline(true)} style={{width:"100%",background:"linear-gradient(135deg,#FFD700,#FFA500)",border:"none",borderRadius:13,padding:"13px 20px",color:"white",fontWeight:"bold",fontSize:16,cursor:"pointer"}}>
            🥁 Tap for the Punchline!
          </button>
        ) : (
          <div>
            <div style={{background:"rgba(255,215,0,0.15)",borderRadius:14,padding:"14px 16px",marginBottom:12,border:"2px solid rgba(255,215,0,0.3)"}}>
              <p style={{color:"#FFD700",fontSize:16,margin:0,fontWeight:"bold",textAlign:"center"}}>{joke.punchline}</p>
            </div>
            {jokeShared
              ? <div style={{background:"linear-gradient(135deg,#96CEB4,#4ECDC4)",borderRadius:13,padding:"12px 18px",textAlign:"center"}}><span style={{color:"white",fontWeight:"bold",fontSize:15}}>🎉 {kidName} told the joke! +1 pt!</span></div>
              : <button onClick={()=>onEarn("joke")} style={{width:"100%",background:"linear-gradient(135deg,#FF6B6B,#FF8E53)",border:"none",borderRadius:13,padding:"13px 20px",color:"white",fontWeight:"bold",fontSize:16,cursor:"pointer"}}>🗣️ {kidName} told someone the joke! +1 pt</button>
            }
          </div>
        )}
      </div>
      <div style={{background:"rgba(255,255,255,0.11)",borderRadius:22,padding:22,border:"2px solid rgba(255,255,255,0.2)"}}>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}>
          <div style={{fontSize:36,background:"rgba(78,205,196,0.15)",borderRadius:"50%",width:56,height:56,display:"flex",alignItems:"center",justifyContent:"center"}}>🌍</div>
          <div>
            <div style={{fontSize:10,color:"rgba(255,255,255,0.45)",textTransform:"uppercase",letterSpacing:2}}>Fun Fact of the Day</div>
            <div style={{fontSize:18,color:"white",fontWeight:"bold"}}>Did you know?</div>
          </div>
        </div>
        <div style={{background:"rgba(78,205,196,0.1)",borderRadius:14,padding:"16px 16px",marginBottom:12,border:"1px solid rgba(78,205,196,0.2)"}}>
          <p style={{color:"white",fontSize:16,margin:0,lineHeight:1.6,textAlign:"center"}}>{fact}</p>
        </div>
        {factShared
          ? <div style={{background:"linear-gradient(135deg,#96CEB4,#4ECDC4)",borderRadius:13,padding:"12px 18px",textAlign:"center"}}><span style={{color:"white",fontWeight:"bold",fontSize:15}}>🎉 {kidName} shared the fact! +1 pt!</span></div>
          : <button onClick={()=>onEarn("fact")} style={{width:"100%",background:"linear-gradient(135deg,#4ECDC4,#45B7D1)",border:"none",borderRadius:13,padding:"13px 20px",color:"white",fontWeight:"bold",fontSize:16,cursor:"pointer"}}>🗣️ {kidName} shared this fact! +1 pt</button>
        }
      </div>
    </div>
  );
}

function HistoryTab({ history }) {
  if (!history.length) return (
    <div style={{textAlign:"center",padding:36}}>
      <div style={{fontSize:44,marginBottom:10}}>📭</div>
      <div style={{color:"rgba(255,255,255,0.4)"}}>No words yet — start today!</div>
    </div>
  );
  return (
    <div style={{background:"rgba(255,255,255,0.07)",borderRadius:20,padding:16,border:"2px solid rgba(255,255,255,0.1)"}}>
      <div style={{fontSize:18,color:"white",fontWeight:"bold",marginBottom:12}}>📚 Words Learned</div>
      <div style={{display:"flex",flexWrap:"wrap",gap:7}}>
        {history.map((x,i) => (
          <span key={i} style={{background:x.used?"rgba(78,205,196,0.18)":"rgba(255,255,255,0.07)",border:x.used?"1px solid rgba(78,205,196,0.35)":"1px solid rgba(255,255,255,0.1)",borderRadius:18,padding:"5px 12px",display:"inline-flex",alignItems:"center",gap:5,fontSize:13,color:"white"}}>
            {x.emoji} {x.word} {x.used&&"✅"}
          </span>
        ))}
      </div>
    </div>
  );
}

function SettingsTab({ familyCode, soundEnabled, onToggleSound, puzzleEnabled, onTogglePuzzle, kids, activeKidId, onAddKid, onEditKid, onSwitchKid, onSignOut }) {
  return (
    <div>
      <div style={{background:"rgba(255,255,255,0.1)",borderRadius:20,padding:18,border:"2px solid rgba(255,255,255,0.18)",marginBottom:14}}>
        <div style={{fontSize:15,color:"white",fontWeight:"bold",marginBottom:14}}>👨‍👩‍👧‍👦 Kids Profiles</div>
        {kids.map(kid => (
          <div key={kid.id} style={{display:"flex",alignItems:"center",gap:12,background:kid.id===activeKidId?"rgba(255,215,0,0.15)":"rgba(255,255,255,0.07)",borderRadius:14,padding:"12px 14px",marginBottom:8,border:kid.id===activeKidId?"2px solid rgba(255,215,0,0.4)":"2px solid transparent"}}>
            <AvatarDisplay avatarId={kid.avatarId} size={44} />
            <div style={{flex:1}}>
              <div style={{color:"white",fontWeight:"bold",fontSize:15}}>{kid.name}</div>
              <div style={{color:"rgba(255,255,255,0.4)",fontSize:12}}>Age {kid.age} · {kid.points||0} pts · {kid.difficulty==="easy"?"🐣 Easy":kid.difficulty==="challenge"?"🚀 Challenge":"⭐ Just Right"}</div>
            </div>
            {kid.id===activeKidId
              ? <div style={{color:"#FFD700",fontSize:12,fontWeight:"bold"}}>Active ✓</div>
              : <button onClick={()=>onSwitchKid(kid.id)} style={{background:"rgba(255,255,255,0.15)",border:"none",borderRadius:8,padding:"6px 12px",color:"white",fontSize:12,cursor:"pointer"}}>Switch</button>
            }
            <button onClick={()=>onEditKid(kid)} style={{background:"rgba(255,255,255,0.1)",border:"none",borderRadius:8,padding:"6px 10px",color:"rgba(255,255,255,0.5)",fontSize:12,cursor:"pointer"}}>✏️</button>
          </div>
        ))}
        <button onClick={onAddKid} style={{width:"100%",background:"linear-gradient(135deg,#4ECDC4,#45B7D1)",border:"none",borderRadius:12,padding:"12px 0",color:"white",fontWeight:"bold",fontSize:15,cursor:"pointer",marginTop:4}}>
          + Add Another Kid
        </button>
      </div>
      <div style={{background:"rgba(255,255,255,0.1)",borderRadius:20,padding:18,border:"2px solid rgba(255,255,255,0.18)",marginBottom:14}}>
        <div style={{ background: "rgba(255,255,255,0.1)", borderRadius: 20, padding: 18, border: "2px solid rgba(255,255,255,0.18)", marginBottom: 14 }}>
  <div style={{ fontSize: 15, color: "white", fontWeight: "bold", marginBottom: 14 }}>🎮 Daily Puzzle</div>
  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
    <div>
      <div style={{ color: "white", fontSize: 14 }}>Hangman Puzzle</div>
      <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 12 }}>Show daily puzzle tab</div>
    </div>
    <button onClick={onTogglePuzzle} style={{ width: 52, height: 30, borderRadius: 15, border: "none", cursor: "pointer", background: puzzleEnabled ? "linear-gradient(135deg,#2ecc71,#27ae60)" : "rgba(255,255,255,0.2)", position: "relative", transition: "background 0.3s" }}>
      <div style={{ position: "absolute", top: 3, left: puzzleEnabled ? 24 : 3, width: 24, height: 24, borderRadius: "50%", background: "white", transition: "left 0.3s", boxShadow: "0 2px 4px rgba(0,0,0,0.3)" }} />
    </button>
  </div>
</div>
        <div style={{fontSize:15,color:"white",fontWeight:"bold",marginBottom:14}}>🔊 Sound</div>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div>
            <div style={{color:"white",fontSize:14}}>Sound Effects</div>
            <div style={{color:"rgba(255,255,255,0.4)",fontSize:12}}>Award, deduct and redeem sounds</div>
          </div>
          <button onClick={onToggleSound} style={{width:52,height:30,borderRadius:15,border:"none",cursor:"pointer",background:soundEnabled?"linear-gradient(135deg,#2ecc71,#27ae60)":"rgba(255,255,255,0.2)",position:"relative",transition:"background 0.3s"}}>
            <div style={{position:"absolute",top:3,left:soundEnabled?24:3,width:24,height:24,borderRadius:"50%",background:"white",transition:"left 0.3s",boxShadow:"0 2px 4px rgba(0,0,0,0.3)"}} />
          </button>
        </div>
      </div>
      <div style={{background:"rgba(255,255,255,0.1)",borderRadius:20,padding:18,border:"2px solid rgba(255,255,255,0.18)",marginBottom:14}}>
        <div style={{fontSize:15,color:"white",fontWeight:"bold",marginBottom:8}}>🔑 Family Code</div>
        <div style={{background:"rgba(255,255,255,0.1)",borderRadius:12,padding:"12px 16px",textAlign:"center"}}>
          <div style={{color:"#FFD700",fontSize:28,fontWeight:"bold",letterSpacing:6}}>{familyCode}</div>
          <div style={{color:"rgba(255,255,255,0.4)",fontSize:11,marginTop:4}}>Share with your partner to sync devices</div>
        </div>
      </div>
      <button onClick={onSignOut} style={{width:"100%",background:"rgba(231,76,60,0.2)",border:"2px solid rgba(231,76,60,0.3)",borderRadius:14,padding:"13px",color:"#e74c3c",fontWeight:"bold",fontSize:15,cursor:"pointer"}}>
        Sign Out
      </button>
    </div>
  );
}

export default function App() {
  const today = new Date().toDateString();
  const [familyCode,setFamilyCode]=useState(()=>localStorage.getItem("sk_code")||"");
  const [profile,setProfile]=useState(null);
  const [kids,setKids]=useState([]);
  const [activeKidId,setActiveKidId]=useState(()=>localStorage.getItem("sk_kid")||"");
  const [pts,setPts]=useState(0);
  const [log,setLog]=useState([]);
  const [used,setUsed]=useState(false);
  const [jokeShared,setJokeShared]=useState(false);
  const [factShared,setFactShared]=useState(false);
  const [puzzleDone,setPuzzleDone]=useState(false);
  const [history,setHistory]=useState([]);
  const [prizes,setPrizes]=useState(DEFAULT_PRIZES);
  const [soundEnabled,setSoundEnabled]=useState(()=>localStorage.getItem("sk_sound")!=="false");
  const [confetti,setConfetti]=useState(false);
  const [tab,setTab]=useState("word");
  const [saving,setSaving]=useState(false);
  const [showAddKid,setShowAddKid]=useState(false);
  const [editingKid,setEditingKid]=useState(null);

  useEffect(()=>{if(familyCode)loadProfile(familyCode);},[]);

  const activeKid=kids.find(k=>k.id===activeKidId)||kids[0];
  const difficulty=activeKid?.difficulty||"justRight";
  const todayContent=getTodayContent(difficulty);

  async function loadProfile(code) {
    const {data}=await supabase.from("profiles").select("*").eq("family_code",code).single();
    if (data) {
      setProfile(data);
      const kidsData=data.kids||[];
      setKids(kidsData);
      const kidId=localStorage.getItem("sk_kid")||kidsData[0]?.id||"";
      setActiveKidId(kidId);
      const kid=kidsData.find(k=>k.id===kidId)||kidsData[0];
      if (kid) {
        setPts(kid.points||0);setLog(kid.log||[]);
        setHistory(kid.word_history||[]);setPrizes(kid.prizes||DEFAULT_PRIZES);
        setUsed(kid.used_date===today);
        setJokeShared(kid.joke_date===today);
        setFactShared(kid.fact_date===today);
        setPuzzleDone(kid.puzzle_date===today);
      }
      if (kidsData.length===0) setShowAddKid(true);
    }
  }

  async function updateActiveKid(updates) {
    setSaving(true);
    const updatedKids=kids.map(k=>k.id===activeKidId?{...k,...updates}:k);
    await supabase.from("profiles").update({kids:updatedKids}).eq("family_code",familyCode);
    setKids(updatedKids);setSaving(false);
  }

  function handleLogin(code,data) {
    localStorage.setItem("sk_code",code);
    setFamilyCode(code);setProfile(data);
    const kidsData=data.kids||[];setKids(kidsData);
    if (kidsData.length===0){setShowAddKid(true);return;}
    const kid=kidsData[0];
    setActiveKidId(kid.id);localStorage.setItem("sk_kid",kid.id);
    setPts(kid.points||0);setLog(kid.log||[]);
    setHistory(kid.word_history||[]);setPrizes(kid.prizes||DEFAULT_PRIZES);
    setUsed(kid.used_date===today);
    setJokeShared(kid.joke_date===today);
    setFactShared(kid.fact_date===today);
    setPuzzleDone(kid.puzzle_date===today);
  }

  async function handleAddKid(kidData) {
    const newKid={...kidData,id:Date.now()+"",points:0,log:[],word_history:[],prizes:DEFAULT_PRIZES,used_date:"",joke_date:"",fact_date:"",puzzle_date:""};
    const updatedKids=[...kids,newKid];
    setSaving(true);
    await supabase.from("profiles").update({kids:updatedKids}).eq("family_code",familyCode);
    setKids(updatedKids);setSaving(false);
    setActiveKidId(newKid.id);localStorage.setItem("sk_kid",newKid.id);
    setPts(0);setLog([]);setHistory([]);setPrizes(DEFAULT_PRIZES);
    setUsed(false);setJokeShared(false);setFactShared(false);setPuzzleDone(false);
    setShowAddKid(false);
  }

  async function handleEditKid(kidData) {
    const updatedKids=kids.map(k=>k.id===editingKid.id?{...k,...kidData}:k);
    setSaving(true);
    await supabase.from("profiles").update({kids:updatedKids}).eq("family_code",familyCode);
    setKids(updatedKids);setSaving(false);setEditingKid(null);
  }

  function handleSwitchKid(kidId) {
    const kid=kids.find(k=>k.id===kidId);if(!kid)return;
    setActiveKidId(kidId);localStorage.setItem("sk_kid",kidId);
    setPts(kid.points||0);setLog(kid.log||[]);
    setHistory(kid.word_history||[]);setPrizes(kid.prizes||DEFAULT_PRIZES);
    setUsed(kid.used_date===today);
    setJokeShared(kid.joke_date===today);
    setFactShared(kid.fact_date===today);
    setPuzzleDone(kid.puzzle_date===today);
    setTab("word");
  }

  async function addPoints(delta,reason,withSound=true) {
    const next=Math.max(0,pts+delta);
    const entry={delta,reason,d:new Date().toLocaleString("en-US",{month:"short",day:"numeric",hour:"numeric",minute:"2-digit"})};
    const newLog=[entry,...log];
    setPts(next);setLog(newLog);
    await updateActiveKid({points:next,log:newLog});
    if(withSound&&soundEnabled){
      if(delta>0){playSound("award");setConfetti(true);setTimeout(()=>setConfetti(false),2000);}
      else{playSound("deduct");}
    } else if(delta>0){setConfetti(true);setTimeout(()=>setConfetti(false),2000);}
  }

  async function handleWordUsed() {
    const next=Math.max(0,pts+2);
    const entry={delta:2,reason:`Said "${todayContent.word.word}" in a sentence`,d:new Date().toLocaleString("en-US",{month:"short",day:"numeric",hour:"numeric",minute:"2-digit"})};
    const newLog=[entry,...log];
    const newHistory=[{word:todayContent.word.word,emoji:todayContent.word.emoji,used:true},...history.filter(x=>x.word!==todayContent.word.word)];
    setPts(next);setLog(newLog);setUsed(true);setHistory(newHistory);
    await updateActiveKid({points:next,log:newLog,word_history:newHistory,used_date:today});
    if(soundEnabled)playSound("award");
    setConfetti(true);setTimeout(()=>setConfetti(false),2000);
  }

  async function handleEditLog(idx,updated) {
    let newLog;let newPts=pts;
    if(updated===null){const removed=log[idx];newPts=Math.max(0,pts-removed.delta);newLog=log.filter((_,i)=>i!==idx);}
    else{newPts=Math.max(0,pts-log[idx].delta+updated.delta);newLog=log.map((e,i)=>i===idx?updated:e);}
    setPts(newPts);setLog(newLog);await updateActiveKid({points:newPts,log:newLog});
  }

  async function handleSavePrizes(p){setPrizes(p);await updateActiveKid({prizes:p});}

  async function handleRedeem(prize) {
    const next=Math.max(0,pts-prize.cost);
    const entry={delta:-prize.cost,reason:`🎁 Redeemed: ${prize.label}`,d:new Date().toLocaleString("en-US",{month:"short",day:"numeric",hour:"numeric",minute:"2-digit"})};
    const newLog=[entry,...log];setPts(next);setLog(newLog);
    await updateActiveKid({points:next,log:newLog});
    if(soundEnabled)playSound("redeem");
    setConfetti(true);setTimeout(()=>setConfetti(false),2500);
  }

  async function handleExtrasEarn(type) {
    if(type==="joke"){setJokeShared(true);await updateActiveKid({joke_date:today});}
    if(type==="fact"){setFactShared(true);await updateActiveKid({fact_date:today});}
    await addPoints(1,type==="joke"?"😄 Told today's joke!":"🌍 Shared today's fun fact!");
  }

  async function handlePuzzleEarn(type) {
    setPuzzleDone(true);
    await updateActiveKid({puzzle_date:today});
    if(type==="hangman_win"){await addPoints(3,"🎯 Won today's Hangman! +3 pts");}
  }

  function handleToggleSound(){const next=!soundEnabled;setSoundEnabled(next);localStorage.setItem("sk_sound",next.toString());}
  function handleSignOut(){localStorage.removeItem("sk_code");localStorage.removeItem("sk_kid");setFamilyCode("");setProfile(null);setKids([]);}

  if(!familyCode||!profile)return <LoginScreen onLogin={handleLogin}/>;
  if(showAddKid)return <AddKidScreen onSave={handleAddKid} onCancel={()=>kids.length>0&&setShowAddKid(false)} existing={null}/>;
  if(editingKid)return <AddKidScreen onSave={handleEditKid} onCancel={()=>setEditingKid(null)} existing={editingKid}/>;

  const TABS=[
    {id:"word",label:"📖",title:"Word"},
    {id:"extras",label:"🎉",title:"Extras"},
    {id:"puzzle",label:"🎮",title:"Puzzle"},
    {id:"points",label:"⭐",title:"Points"},
    {id:"settings",label:"⚙️",title:"Settings"},
  ];

  return (
    <>
      <style>{`*{box-sizing:border-box;margin:0;padding:0;font-family:sans-serif;}body{background:linear-gradient(160deg,#1a1a6e,#2d1b69 40%,#11998e 75%,#38ef7d);min-height:100vh;}input::placeholder{color:rgba(255,255,255,0.3);}input[type=number]::-webkit-inner-spin-button{-webkit-appearance:none;}@keyframes fall{to{transform:translateY(110vh) rotate(720deg);opacity:0;}}`}</style>
      <Confetti active={confetti}/>
      <div style={{paddingBottom:80}}>
        <div style={{padding:"18px 16px 14px",background:"rgba(0,0,0,0.2)",marginBottom:14}}>
          <div style={{maxWidth:460,margin:"0 auto",display:"flex",alignItems:"center",gap:12}}>
            {activeKid&&<AvatarDisplay avatarId={activeKid.avatarId} size={44}/>}
            <div style={{flex:1}}>
              <div style={{color:"white",fontWeight:"bold",fontSize:18}}>{activeKid?`${activeKid.name}'s SuperKid`:"SuperKid"}</div>
              <div style={{color:"rgba(255,255,255,0.5)",fontSize:11}}>{new Date().toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric"})}{saving&&" · saving..."}</div>
            </div>
            <div style={{background:"rgba(255,255,255,0.15)",borderRadius:12,padding:"6px 14px",textAlign:"center"}}>
              <div style={{color:"#FFD700",fontWeight:"bold",fontSize:22,lineHeight:1}}>{pts}</div>
              <div style={{color:"rgba(255,255,255,0.5)",fontSize:9,textTransform:"uppercase",letterSpacing:1}}>points</div>
            </div>
          </div>
        </div>
        <div style={{maxWidth:460,margin:"0 auto",padding:"0 13px"}}>
          {tab==="word"     && <WordTab     word={todayContent.word} onUsed={handleWordUsed} used={used} kidName={activeKid?.name||"He"}/>}
          {tab==="extras"   && <ExtrasTab   joke={todayContent.joke} fact={todayContent.fact} onEarn={handleExtrasEarn} jokeShared={jokeShared} factShared={factShared} kidName={activeKid?.name||"He"}/>}
          {tab==="puzzle"   && <PuzzleTab   word={todayContent.word} definition={todayContent.word.definition} onEarn={handlePuzzleEarn} puzzleDone={puzzleDone} kidName={activeKid?.name||"He"}/>}
          {tab==="points"   && <PointsTab   log={log} onAdd={addPoints} onEditLog={handleEditLog} soundEnabled={soundEnabled} kidName={activeKid?.name||"Kid"}/>}
          {tab==="settings" && <SettingsTab familyCode={familyCode} soundEnabled={soundEnabled} onToggleSound={handleToggleSound} kids={kids} activeKidId={activeKidId} onAddKid={()=>setShowAddKid(true)} onEditKid={k=>setEditingKid(k)} onSwitchKid={handleSwitchKid} onSignOut={handleSignOut}/>}
        </div>
      </div>
      <div style={{position:"fixed",bottom:0,left:0,right:0,background:"rgba(15,15,40,0.95)",backdropFilter:"blur(20px)",borderTop:"1px solid rgba(255,255,255,0.1)",padding:"8px 0 12px",zIndex:100}}>
        <div style={{maxWidth:460,margin:"0 auto",display:"flex",justifyContent:"space-around"}}>
          {TABS.map(t => (
            <button key={t.id} onClick={()=>setTab(t.id)} style={{background:"none",border:"none",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:3,padding:"4px 12px",borderRadius:12}}>
              <div style={{fontSize:22,filter:tab===t.id?"none":"grayscale(60%) opacity(0.6)"}}>{t.label}</div>
              <div style={{fontSize:10,color:tab===t.id?"#FFD700":"rgba(255,255,255,0.4)",fontWeight:tab===t.id?"bold":"normal",letterSpacing:0.5}}>{t.title}</div>
              {tab===t.id&&<div style={{width:4,height:4,borderRadius:"50%",background:"#FFD700"}}/>}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}