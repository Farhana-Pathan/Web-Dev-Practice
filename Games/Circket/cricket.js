 let scoreStr = localStorage.getItem('Score');
        let score;
        resetScore(scoreStr);

        function resetScore(scoreStr){
            score = scoreStr ? JSON.parse(scoreStr) : {
            win: 0,
            lost: 0,
            tie: 0, 
            };

            score.displayScore= function(){
                return `No of Matches Won : ${score.win} | lost: ${score.lost} | tie: ${score.tie}`
            };

            showResult();

        }

        

        // Function to get computer's choice
        function ComputerChoice(){
            let randomNumber = Math.random() * 3;
            if(randomNumber > 0 && randomNumber <= 1) {
                return 'Bat';
            }else if (randomNumber > 1 && randomNumber <= 2){
                return 'Ball';
            }else{
                return 'Stump';
            }
        }
        
        // Function to determine the result of the game
        function getResult(userMove , computerMove){
            if (userMove === 'Bat') {
                if (computerMove === 'Ball') {
                    score.win++;
                    return 'You win!';// Bat beats Ball
                }
                else if (computerMove === 'Bat') {
                    score.tie++;
                    return 'Tie!';// Bat vs Bat is a tie
                }
                else {
                    score.lost++;
                    return 'You lose!';// Bat loses to Stump
                }
            } else if (userMove === 'Ball') {
                if(computerMove === 'Ball'){
                    score.tie++;
                    return 'Tie!';
                }else if(computerMove === 'Stump'){
                    score.win++;
                    return 'You win!';
                }else{
                    score.lost++;
                    return 'You lose!';
                }
            } else if (userMove === 'Stump') {
                if(computerMove === 'Stump'){
                    score.tie++;
                    return 'Tie!'; 
                }else if(computerMove === 'Ball'){
                    score.win++;
                    return 'You win!';
                }else{
                    score.lost++;
                    return 'You lose!';
                }
            }

        }

        function showResult(userMove, computerMove, result){
            localStorage.setItem('Score', JSON.stringify(score))
            document.querySelector('#user-move').innerText = 
                userMove ? `You have Chosen ${userMove}.`: ''; //Truthy Falsy value 
            document.querySelector('#computer-move').innerText =
                computerMove ? ` Computer's Choice is ${computerMove}.`: '';
            document.querySelector('#result').innerText = result || ''; // fallback way
            document.querySelector('#score').innerText = `${score.displayScore()}`
    
        }