function isPalindrome(str) {
    return str.toLowerCase() === str.toLowerCase().split('').reverse().join('');
}

console.log(isPalindrome("lol"));