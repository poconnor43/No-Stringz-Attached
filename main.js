//defines the object for the graded 1-100 string
const inputedString = {
    power: 0,
    spin:0,
    comfort: 0,
    control: 0,
    feel: 0,
    playabilityDuration:0,
    durability: 0
}
//defines the object for the importance of each of these areas of information
const importanceRanking = {
    power: 0,
    spin: 0,
    comfort: 0,
    control: 0,
    feel: 0,
    playabilityDuration: 0,
    durability: 0
};

// this portion of the code makes it so the users input from the importance ranking can be acsessed 
// updated below in a visual display on screen 
for(let i =1; i <=7; i++){
    let sliderId ='myRange' + i + i;
    let outputId = 'value' + i + i;
    setupSlider(sliderId, outputId);
}

// this portion of the code makes it so the users input from the inputed string can be acsessed 
// updated below in a visual display on screen 
for (let i = 1; i <= 7; i++) {
    let sliderId = "myRange" + i;
    let outputId = "value" + i;
    setupSlider(sliderId, outputId);
}


// this function updates the range value, but everytime therange changes, it updated teh string that is outputed
function setupSlider(sliderId, outputId) {
    let slider = document.getElementById(sliderId);
    let output = document.getElementById(outputId);

    output.innerHTML = slider.value;

    slider.oninput = function () {
        output.innerHTML = this.value;
        updateInputedStrings();
        updateImportanceRanking();
        const closestRacket1 = findClosestRacketString(inputedString);
        document.getElementById("showAnswer").innerHTML = closestRacket1;
    }
}

function updateInputedStrings(){
    inputedString.power = parseInt(document.getElementById("value1").innerHTML);
    inputedString.spin = parseInt(document.getElementById("value2").innerHTML);
    inputedString.comfort = parseInt(document.getElementById("value3").innerHTML);
    inputedString.control = parseInt(document.getElementById("value4").innerHTML);
    inputedString.feel = parseInt(document.getElementById("value5").innerHTML);
    inputedString.playabilityDuration = parseInt(document.getElementById("value6").innerHTML);
    inputedString.durability = parseInt(document.getElementById("value7").innerHTML);
}

function updateImportanceRanking(){
    importanceRanking.power = parseInt(document.getElementById("value11").innerHTML);
    importanceRanking.spin = parseInt(document.getElementById("value22").innerHTML);
    importanceRanking.comfort = parseInt(document.getElementById("value33").innerHTML);
    importanceRanking.control = parseInt(document.getElementById("value44").innerHTML);
    importanceRanking.feel = parseInt(document.getElementById("value55").innerHTML);
    importanceRanking.playabilityDuration = parseInt(document.getElementById("value66").innerHTML);
    importanceRanking.durability = parseInt(document.getElementById("value77").innerHTML); 
}


//remeber inputedString is actually an object!!!!
    function findClosestRacketString(inputedString){
    let minimumDistance = Number.MAX_VALUE;
    let closestRacket = null;
   
    for(let i =0; i < racketStrings.length; i++){
        let racket = racketStrings[i];
        let stringName = racketStrings[i].name;
        //we take in the current index we are working on and calcuated
        //the distance to find the node of minimum distance from the input
        let distance = calculateEuclideanDistance(inputedString,{
            power: racket.power,
            spin: racket.spin,
            comfort: racket.comfort,
            control: racket.control,
            feel: racket.feel,
            playabilityDuration: racket.playabilityDuration,
            durability: racket.durability
        });
        console.log("here past euclidean");
        if(distance < minimumDistance){
            minimumDistance = distance;
            closestRacket = stringName;
        }
    }
    return closestRacket;
}

function calculateEuclideanDistance(arr1, arr2){
    let sum = 0;
    // we use the object.value to conver the objects into workable arrays
    const valuesArr1 = Object.values(arr1);
    const valuesArr2 = Object.values(arr2);

    //condition to see if the arrays are the same, usually are due to defualt values
    if (valuesArr1.length !== valuesArr2.length) {
        throw new Error("Input arrays must have the same length");
    }

    // we calculate to see what string is the closest to our array of objects through a method simaler
    //to euclidean distance found in geometry and 3d method in calc 3, only we adjust it to a bigger dimension
    for(let i = 0; i < valuesArr1.length;i++){
        const squaredDifference = Math.pow(valuesArr1[i] - valuesArr2[i], 2);
        sum += squaredDifference * Math.pow(importanceRanking[Object.keys(inputedString)[i]], 2);
    }
    return Math.sqrt(sum);
}

// this is the portion of the JS code which we will use to find the tension of best fit on every button click
document.addEventListener('DOMContentLoaded', function() {
    let pAndCButton = document.getElementById('pAndCButton');
    let fAndSButton = document.getElementById('fAndSButton');
    let desiredTensionResult = document.getElementById('desiredTensionResult');
    let tensionInput = document.getElementById('tensionInput');

    //updates the power and control to decrement tension by 2 lb
    pAndCButton.addEventListener('click', function() {
        updateTension(-2);
    });

    //updates the spin and feel to increment tension by 2lb
    fAndSButton.addEventListener('click', function() {
        updateTension(2);
    });

    tensionInput.addEventListener('input', function() {
        updateTension(0); // Pass 0 to keep the tension unchanged when input changes
    });

// we check to see if the text being passed in is still valid for the tension
    function updateTension(change) {
        let inputValue = tensionInput.value.trim();
        if (inputValue === '') {
            desiredTensionResult.textContent = 'Please enter a valid number';
            return;
        }
        let parsedValue = parseInt(inputValue);
        if (isNaN(parsedValue)) {
            desiredTensionResult.textContent = 'Please enter a valid number';
            return;
        }
        //not possible to have negative tension
        if (parsedValue <= 0){
            desiredTensionResult.textContent = 'Please enter a valid tension. It is to low';
            return;
        }
        //tension adjustments on anything above 60 lb can dammage the racket
        if( parsedValue >= 60){
            desiredTensionResult.textContent = 'Please enter a valid tension. It is to high';
            return;
        }
        desiredTensionResult.textContent = (parsedValue + change).toString();
    }
});

// this is a large array of objects which waas derived from a manual scrape of the tennis warehouse string rankings
// we reference this to figure out the string o best fit, the most complicated portion of this code.
const racketStrings = [
    {name:'Yonex Polytour Air' , power: 77  ,spin: 88, comfort: 87, control:84 ,feel: 88, playabilityDuration: 79 , durability:84 },
    {name: 'Luxilon ECO Power', power: 55 ,spin: 84, comfort:65 , control:93 ,feel: 82,  playabilityDuration:78 , durability:92 },
    {name:'Tecnifibre Razor Soft' , power:67 ,spin:82 , comfort:79 , control:89 ,feel: 90, playabilityDuration:80 , durability:88 },
    {name: 'Yonex Polytour Drive', power:67 ,spin:93 , comfort:77 , control:90 ,feel:90, playabilityDuration: 75, durability:85 },
    {name:'Head Hawk Power' , power:69 ,spin:85 , comfort:80 , control: 90,feel:88 , playabilityDuration:68 , durability:87 },
    {name: 'Head Lynx Spin2 Hybrid', power:67 ,spin:90 , comfort:80 , control:89 ,feel:86 , playabilityDuration:73 , durability:86 },
    {name:'Head Lynx Tour' , power:65 ,spin:89 , comfort:74 , control:93 ,feel:81 , playabilityDuration:83 , durability:91 },
    {name:'Babolat RPM Blast Orange' , power:55 ,spin:95 , comfort:73 , control:94 ,feel:84 , playabilityDuration:78 , durability:78 },
    {name:'Luxilon ALU Power' , power:58 ,spin:86 , comfort:77 , control:90 ,feel:97 , playabilityDuration:81 , durability:94 },
    {name: 'Solinco Hyper-G', power:51 ,spin:92 , comfort:73 , control:96 ,feel: 90, playabilityDuration:73 , durability:87 },
    {name: 'Solinco Hyper-G Soft', power:57 ,spin:92 , comfort:79 , control:93 ,feel:88 , playabilityDuration:69 , durability:86 },
    {name:'Babolat RPM Rough' , power:62 ,spin:90 , comfort:66 , control:65 ,feel: 59, playabilityDuration:40 , durability:79 },
    {name:'Solinco Tour Bite 16L' , power:54 ,spin:94 , comfort:54 , control:91 ,feel:68 , playabilityDuration:75 , durability:85 },
    {name:'Head Lynx Touch' , power:65 ,spin:60 , comfort:84 , control:89 ,feel:84 , playabilityDuration:82 , durability:84 },
    {name:'Yonex Polytour Rev' , power:60 ,spin:85 , comfort:74 , control:88 ,feel:79 , playabilityDuration:74 , durability:91 },
    {name:'Solinco Tour Bite 19' , power:66 ,spin:91 , comfort: 59 , control: 75 ,feel:80 , playabilityDuration: 72 , durability:68 },
    {name:'ISOSPEED Cream String 16L' , power:65 ,spin:84 , comfort:77 , control:87 ,feel:82 , playabilityDuration:79 , durability:79 },
    {name:'Kirschbaum Flash' , power:60 ,spin:89 , comfort:73 , control:93 ,feel:85 , playabilityDuration: 78, durability:87 },
    {name:'Luxilon Element Rough' , power:55 ,spin:93 , comfort:77 , control:87 ,feel:86 , playabilityDuration:70 , durability:90 },
    {name:'Babolat RPM blast black' , power:43 ,spin:97 , comfort:61 , control:90 ,feel:85 , playabilityDuration:74 , durability: 90},
    {name:'Volkl Cyclone 16g' , power:67 ,spin:92 , comfort:83 , control:93 ,feel:81 , playabilityDuration:78 , durability:89 },
    {name:'Solinco Confidential' , power: 42,spin:90 , comfort:63 , control:93 ,feel:83 , playabilityDuration:88 , durability:91 },
    {name:'Yonex Poly Tour Strike ' , power: 60 ,spin:75 , comfort:69 , control:89 ,feel:78 , playabilityDuration:76 , durability:90 },
    {name:'Yonex Polytour PRO' , power:45 ,spin:79 , comfort:72 , control:86 ,feel:75 , playabilityDuration:83 , durability:85 },
    {name:'Diadem Solstice Black' , power:69 ,spin:90 , comfort:76 , control:76 ,feel:75 , playabilityDuration:48 , durability:75 },
    {name:'Signum Pro X-perience' , power:57 ,spin:85 , comfort:70 , control:87 ,feel:80 , playabilityDuration:79 , durability:82 },
    {name:'Prince Vortex', power:70 ,spin:88 , comfort:80 , control:71 ,feel:75 , playabilityDuration:73 , durability:83 },
    {name:'Prince Vortex Triad' , power: 63,spin:95 , comfort:70 , control:82 ,feel:83 , playabilityDuration:62 , durability:62 },
    {name:'Kirschbaum Xplosive Speed', power:62 ,spin:83 , comfort:66 , control:77 ,feel:77 , playabilityDuration:73 , durability:73 },
    {name:'Tecnifibre Ice Code', power: 62 ,spin:92 , comfort:76 , control:95 ,feel:77 , playabilityDuration:84 , durability:84 },
    {name:'Weiss Cannon Ultra Cable' , power:54 ,spin:95 , comfort:68 , control:95 ,feel:88 , playabilityDuration:81 , durability:90 },
    {name:'head hawk 16', power:37 ,spin:85 , comfort:56 , control:84 ,feel:82 , playabilityDuration:82 , durability:90 },
    {name:'Ytex Quadro Twist' , power:64 ,spin:95 , comfort:73 , control:89 ,feel:88 , playabilityDuration:80 , durability:90 },
    {name:'Solinco Tour Bite And Vanquish Hybrid' , power: 72,spin:85 , comfort:85 , control:89 ,feel:83 , playabilityDuration:78 , durability:86 },
    {name:'Volkl V-Square' , power:59 ,spin:97 , comfort:68 , control:89 ,feel:84 , playabilityDuration: 75 , durability:91 },
    {name:'Prince Diablo Prism' , power:38 ,spin:85 , comfort:53 , control:90 ,feel:79 , playabilityDuration:75 , durability:87 },
    {name:'Signum Pro Yellow Jacket' , power:56 ,spin:87 , comfort:64 , control:90 ,feel:86 , playabilityDuration:72 , durability:89 },
    {name:'Tourna Big HitteR Silver 7 Tour' , power:45 ,spin:90 , comfort:59 , control:93 ,feel:84 , playabilityDuration:83 , durability:88 },
    {name:'Diadem Solstice Power' , power:67 ,spin:95 , comfort:77 , control:80 ,feel:81 , playabilityDuration: 60, durability: 80 },
    {name:'Gamma Moto ' , power: 50 ,spin: 85 , comfort: 58 , control: 85 ,feel: 80 , playabilityDuration: 88 , durability: 87 },
    {name:'Gosen Polylon' , power:44 ,spin: 87 , comfort:65 , control:92 ,feel:83 , playabilityDuration:70 , durability:90 },
    {name:'Luxilon Big Banger' , power:35 ,spin:69 , comfort:55 , control:95 ,feel:79 , playabilityDuration:83 , durability:93 },
    {name:'Head Lynx ', power:70 ,spin:88 , comfort:82 , control:75 ,feel:68 , playabilityDuration:85 , durability: 65 },
    {name:'Head Sonic Pro' , power: 58 ,spin:78 , comfort:61, control:80 ,feel:73, playabilityDuration:73 , durability:82 },
    {name:'ISOSPEED Black Fire' , power:33 ,spin:74 , comfort:70 , control:95 ,feel:82 , playabilityDuration:72 , durability:85 },
    {name:'ISOSPEED Pyramid', power: 46 ,spin:92 , comfort: 73 , control:88 ,feel:83 , playabilityDuration:73 , durability:94 },
    {name:'Kirschbaum Max Power' , power:38 ,spin:86 , comfort:64 , control:96 ,feel:86 , playabilityDuration:89 , durability:93 },
    {name:'Kirschbaum Pro ' , power:61 ,spin:92 , comfort:68 , control:92 ,feel:92 , playabilityDuration:80 , durability:93 },
    {name:'Kirschbaum Pro Line  II' , power: 45 ,spin:68 , comfort:63 , control:88 ,feel:80 , playabilityDuration:86 , durability:84 },
    {name:'Kirschbaum Spiky Black Shark', power:25 ,spin:93 , comfort:55 , control:83 ,feel:73 , playabilityDuration:85 , durability:88 },
    {name:'Luxilon 4G' , power:65 ,spin:86 , comfort:78 , control:88 ,feel:87 , playabilityDuration:82 , durability:86 },
    {name:'Luxilon 4G Rough' , power: 48,spin:85 , comfort:60 , control:78 ,feel:79 , playabilityDuration:68 , durability:93 },
    {name:'Luxilon 4G Soft' , power:57 ,spin:85 , comfort:75 , control:94 ,feel:86 , playabilityDuration:85 , durability:91 },
    {name:'Luxilon Adrenaline' , power:66 ,spin:69 , comfort:70 , control:75 ,feel:71 , playabilityDuration:78 , durability:83 },
    {name:'Luxilon ALU Power Rough' , power:60 ,spin:92 , comfort:73 , control:90 ,feel:86 , playabilityDuration:87 , durability:92 },
    {name:'Luxilon ALU Power Soft' , power:61 ,spin:88 , comfort:72 , control:91 ,feel:87 , playabilityDuration:90 , durability:90 },
    {name:'Luxilon ALU Power Spin' , power:58 ,spin:58 , comfort:93 , control:60 ,feel:87 , playabilityDuration:75 , durability:76 },
    {name:'Luxilon Element' , power:64,spin:85 , comfort:73 , control:83 ,feel:89 , playabilityDuration:75, durability:81 },
    {name:'Prince Tour XC' , power:45,spin:79 , comfort:55 , control:85 ,feel:65 , playabilityDuration:76 , durability:89 },
    {name:'Volkl V-Star', power:67 ,spin:87 , comfort:81 , control:80 ,feel:82 , playabilityDuration:70 , durability:84 },
    {name:'Wilson Revolve ' , power:58 ,spin:87 , comfort:77 , control:88 ,feel:83 , playabilityDuration:83 , durability:93 },
    {name:'Signum Pro Firestorm' , power:70 ,spin:78 , comfort:73 , control:79 ,feel:86 , playabilityDuration:73 , durability:80 },
    {name:'Signum Pro Poly Plasma' , power:33 ,spin:65 , comfort:58 , control:85 ,feel:80 , playabilityDuration:78 , durability:92 },
    {name:'Solinco Revolution' , power:67 ,spin:94 , comfort:71 , control:93 ,feel:87 , playabilityDuration:86 , durability:95 },
    {name:'Solinco Tour Bite Soft' , power:40 ,spin:84 , comfort:78 , control:80 ,feel:50 , playabilityDuration:53 , durability:70 },
    {name:'Tecnifibre Razor Code' , power:65 ,spin:86, comfort:65 , control:84 ,feel:83 , playabilityDuration:69 , durability:95 },
    {name:'Tecnifibre Black Code' , power:40 ,spin:83 , comfort:55 , control:80 ,feel:65 , playabilityDuration:80 , durability:83 },
    {name:'Tecnifibre 4S ' , power:40 ,spin:87 , comfort:56 , control:90 ,feel:84 , playabilityDuration:82 , durability:88 },
    {name:'Wilson Revolve Spin' , power:44 ,spin:92 , comfort:73 , control:93 ,feel:78 , playabilityDuration:76 , durability:90 },
    {name:'Tecnifibre Pro Red Code' , power:47 ,spin:74 , comfort:60 , control:89 ,feel:78 , playabilityDuration:80 , durability:93 },
    {name:'Topsin Cyber Flash String' , power:59 ,spin:80 , comfort:75 , control:75 ,feel:83 , playabilityDuration:78 , durability:83 },
    {name:'Tourna Black Zone' , power:59 ,spin:87 , comfort:72 , control:94 ,feel:91 , playabilityDuration:78 , durability:91 },
    {name:'Tourna Big Hitter Black' , power:74 ,spin:93 , comfort:83 , control:79 ,feel:82 , playabilityDuration:60 , durability:88 },
    {name:'Tourna Big Hitter Silver' , power:68 ,spin:60 , comfort:54 , control:66 ,feel:52 , playabilityDuration:70 , durability:92 },
    {name:'Volkl Cyclone 19' , power:69 ,spin:98 , comfort:72 , control:73 ,feel:78 , playabilityDuration:83 , durability:80 },
    {name:'Volkl V-Torque' , power:38,spin:97 , comfort:65 , control:97 ,feel:89 , playabilityDuration:72 , durability:80 },
    {name:'Weiss Cannon Black 5 Edge' , power:57 ,spin:90 , comfort:78 , control:83 ,feel:82, playabilityDuration:82 , durability:82 },
    {name:'MSV Focus Hex' , power: 69,spin:80 , comfort:77 , control:85 ,feel:85 , playabilityDuration:78, durability:93 },
    {name:'Prince Vortex Triad' , power:65 ,spin:75 , comfort:78 , control:84 ,feel:73 , playabilityDuration:75 , durability:60 },
    {name:'Prince Premier Control' , power:87 ,spin:75 , comfort:91 , control:76 ,feel:87 , playabilityDuration:82 , durability:71 },
    {name:'Babolat Xcel', power:82 ,spin: 70, comfort:86 , control:73 ,feel:80 , playabilityDuration:77 , durability:64 },
    {name:'Tecnifibre X-One Biphase' , power:90 ,spin:66 , comfort:86 , control:72 ,feel:80 , playabilityDuration:78 , durability:73 },
    {name:'Tecnifibre Triax', power:80, spin:76 , comfort:85 , control:81 ,feel:86 , playabilityDuration:86 , durability:79 },
    {name:'Head Reflex MLT' , power:85 ,spin:77 , comfort:91 , control:75 ,feel:80, playabilityDuration:80 , durability: 71 },
    {name:'Tecnifibre Multifeel' , power:84 ,spin:78 , comfort:86 , control:80 ,feel:82, playabilityDuration:81 , durability:69 },
    {name:'Alpha Gut 2000' , power:79 ,spin:75 , comfort:92 , control:78 ,feel:86 , playabilityDuration:75 , durability:71 },
    {name:'Gamma Ocho XP' , power:86 ,spin:75 , comfort:89 , control:73 ,feel: 78, playabilityDuration:74 , durability:76 },
    {name:'Head RIP Control' , power:68 ,spin:72 , comfort:84 , control:85 ,feel:80 , playabilityDuration:78 , durability:80 },
    {name:'Prince Premier Touch' , power:88 ,spin: 53 , comfort:97 , control:71 ,feel: 75 , playabilityDuration: 78, durability:70 },
    {name:'Wilson NXT Control' , power:75 ,spin: 76, comfort: 84, control: 83,feel: 84, playabilityDuration: 83, durability: 74 },
    {name:'Volkl Power Fiber Pro' , power: 83, spin: 63, comfort: 87, control: 79,feel: 72, playabilityDuration: 78, durability: 70},
    {name:'Wilson NXT' , power:86 ,spin:74 , comfort: 89, control: 76,feel: 79, playabilityDuration: 65, durability:64 },
    {name:'Babolat Touch VS Natural Gut' , power: 100 ,spin:74 , comfort:100 , control:74 ,feel:96 , playabilityDuration:95 , durability:72 },
    {name:'Luxilon Natural Gut', power: 94 ,spin: 79 , comfort: 98, control:80 ,feel: 92, playabilityDuration: 95, durability: 70},
    {name:'Prince Tournament Nylon' , power:65 ,spin: 75, comfort: 78, control: 84, feel:73 , playabilityDuration:75 , durability:70 },
    {name:'Prince ProBlend Duraflex' , power:23 ,spin:78 , comfort:47 , control:93 ,feel:62 , playabilityDuration:92 , durability:93 },
    {name:'Solinco Tour Bite 17 & Vanquish 16 Hybrid' , power:72 ,spin:85 , comfort:85 , control: 89 ,feel:83 , playabilityDuration: 84, durability: 78},
    {name:'Wilson Champions Choice Hybrid' , power: 86 ,spin:84 , comfort:89 , control:81 ,feel:81 , playabilityDuration: 83, durability: 82},
    {name:'Ashaway Crossfire ZX' , power: 50 ,spin: 88, comfort: 85, control: 88,feel: 75, playabilityDuration: 75, durability: 85},
    {name:'Volkl V-Fuse Hybrid' , power: 87 ,spin: 82, comfort: 89, control: 83,feel: 91, playabilityDuration: 87, durability: 80 },
    {name:'Prince Lightning Pro' , power: 83 ,spin: 63, comfort: 82, control: 73,feel: 75, playabilityDuration: 73, durability: 73 },
    {name:'Ashaway MonoGut ZX' , power: 85,spin: 80, comfort: 80, control: 73,feel: 77, playabilityDuration: 69, durability: 83},
    {name:'Gosen OG Sheep Micro' , power: 64 ,spin: 74, comfort: 85, control: 66, feel: 78, playabilityDuration: 75, durability: 70},
    {name:'Prince Synthetic Gut' , power:79 ,spin:75 , comfort:85 , control: 70,feel: 73, playabilityDuration: 75, durability: 60},
    {name:'Volkl Psycho Hybrid' , power: 74,spin: 71, comfort: 83, control: 88,feel: 89, playabilityDuration: 89, durability: 85},
    {name:'Prince Vortex Triad Hybrid' , power: 63,spin: 95, comfort: 70, control: 82,feel: 83, playabilityDuration: 62, durability:88 },
    {name:'Prince Vortex Triad Hybrid' , power: 63,spin: 95, comfort: 70, control: 82,feel: 83, playabilityDuration: 62, durability: 88},
    ];
    