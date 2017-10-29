class Perceptron {
    constructor(number) {
      this.number = number;
      this.weights = randomWeights();
      this.learningRate = 0.1;
      this.threshold  = 0;
      this.bestLifeTime = 0;
      this.bestClassification = 0;
      this.lifeTime = 0;
      this.pocket = null;
    }

    adjustWeights(){
        
    }

    learn(){
        var examples = [0,1,2,3,4,5,6,7,8,9];
        shuffle(examples);
        var stopCondition = 0;
        while(stopCondition < 100000){
            for(var i = 0; i < 10; i++){
                var example = numbers[examples[i]];
                var expected = examples[i] === this.number ? 1 : -1;
                var result = this.count(example);
                if(result !== expected){
                    this.adjustWeights(expected, example);
                }
                else {
                    this.updatePocket();
                }
            }
            ++stopCondition
        }
        if(this.lifeTime !== this.bestLifeTime){
            this.weights = this.pocket.slice(0);
        }
    }

    updatePocket(){
        this.lifeTime++;
        var currentClassifications = this.countClassifications();
        if(this.lifeTime > this.bestLifeTime && currentClassifications > this.bestClassification){
            this.pocket = this.weights.slice(0);
            this.bestLifeTime = this.lifeTime;
            this.bestClassification = currentClassifications;
        }
    }

    countClassifications(){
        var correctClasifications = 0;
        for(var i = 0; i < 10; i++){
            var expected = i === this.number ? 1 : -1;
            if(this.count(numbers[i]) === expected){
                correctClasifications++;
            }
        }
        return correctClasifications;
    }

    adjustWeights(err, example){
        for(var i = 0; i < 25; i++){
            this.weights[i+1] +=  err * example[i].active;
        }
        this.weights[0] += err;
        this.lifeTime = 0;
    }

    count(x){
        var sum = 0;
        for(var i = 0; i < 25; i++){
            sum += this.weights[i+1] * x[i].active;
        }
        sum += this.weights[0];
        return this.signum(sum);
    }

    signum(val){
        if(val < 0){
            return -1;
        }
        else {
            return 1;
        }

    }

    check(){
        return this.count(grid);
    }
}

var randomWeights = function(){
    var weights = new Array;
    for(var i = 0; i < 26; i++){
        weights.push(Math.random()/100);
    }
    return weights;
}

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
}