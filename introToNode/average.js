

var scores = [1,3,5,6,8,5,3,3,2,22,4,5,6,77,5,44,3];



function average(scores){
    
    var sum = 0
    
    scores.forEach(function(score){
        sum = sum + score;
    })
    
    return sum / scores.length;
    
}

console.log(Math.round(average(scores)));