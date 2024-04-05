function convertTemperature(degree, type) {
    if (type === "C") {
        return (degree - 32) * 5/9;
    } 
    else if (type === "F") {
        return (degree * 9/5) + 32;
    }
    else {
        return "Invalid temperature type";
    }
}