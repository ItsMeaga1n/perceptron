var grid = new Array;
var learned = false;
var perceptrons = new Array;

$(document).ready(function(){ 
    for(var i = 0; i < 25; i++){
        $('.gridContainer').append("<div class='gridBox' id='" + i + "'>");
        grid.push({active: false});
    }

    for(var i = 0; i < 10; i++){
        perceptrons.push(new Perceptron(i));
    }

    $('.gridBox').click(function(){
        var currId = $(this).attr('id');
        if(grid[currId].active){
            grid[currId].active = false;
            $(this).removeClass('activeBox');
        }
        else {
            grid[currId].active = true;
            $(this).addClass('activeBox');
        }
    });

    $('.recognizeButton').click(function(){
        if(!learned) {
            $('.resultText').replaceWith("<p class='resultText'>Need to learn!</p>");
        }
        else {
            var results = new Array;
            for(var i = 0; i < 10; i++){
                if(perceptrons[i].check() === 1){
                    results.push(i);
                }
            }
            if(results.length !== 0){
                var recognizedText = "" + results[0];
                for(var i = 1; i < results.length; i++){
                    recognizedText += ", " + results[i];
                }
                $('.resultText').replaceWith("<p class='resultText'>Recognized " + recognizedText + ".</p>");                                            
            }
            else {
                $('.resultText').replaceWith("<p class='resultText'>Didn't recognize anything.</p>");                            
            }
        }
    });

    $('.learnButton').click(function(){
        for(var i = 0; i < 10; i++){
            perceptrons[i].learn();
        }
        $('.resultText').replaceWith("<p class='resultText'>Learning complete!</p>");
        learned = true;
    });

    $('.clearButton').click(function(){
        for(var i = 0; i < 25; i++){
            if($('#'+i).hasClass('activeBox')){
                $('#'+i).removeClass('activeBox')
            }
            grid[i].active = false;
        }
    });
 });