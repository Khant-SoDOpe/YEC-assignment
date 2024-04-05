function countVowels(str) {
    let vowelCount = 0;
    
    str = str.toLowerCase();
    
    for (let i = 0; i < str.length; i++) {
        if (str[i] == 'a' || str[i] == 'e' || str[i] == 'i' || str[i] == 'o' || str[i] == 'u') {
            vowelCount++;
        }
    }
    
    return vowelCount;
}

console.log(countVowels("aeroplaneus"));