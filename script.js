(function() {
    var playerName = prompt("What is your name?");
    var name = document.getElementById("playerName");
    name.textContent = ("Name: " + playerName);
    var startButton = document.getElementById("startButton");
    var attackButton = document.getElementById("attackButton");
    var healButton = document.getElementById("healButton");
    var quitButton = document.getElementById("quitButton");
    var userHealthBar = document.getElementById("healthBar");
    var grantHealthBar = document.getElementById("grantHealthBar");
    var healBar = document.getElementById("healBar");
    var winBar = document.getElementById("winBar");
    var messageP = document.getElementById("messages");
    var disappear = document.getElementsByClassName("disappear");
    var gameDiv = document.getElementById("gameDiv");


    var user = {
        health: 40,
        healsRemaining: 2,
        wins: 0,
        generateAttackDamage(){
            return Math.floor(Math.random()*3)+1;
        },
        heal(){
            this.healsRemaining --;
            if (healsRemaining > 0){
                return (this.health += (Math.floor(Math.random()*10)+1));
            }
        }
    };
    var grant = {
        name:"Grant",
        health: 10, 
        generateAttackDamage(){
            return(Math.floor(Math.random()*5)+1);
        }
    };
    startButton.onclick = function() {
        var startDiv= document.getElementById("startDiv");
        startDiv.classList.add("disappear");
        startDiv.classList.remove("appear"); 
        startCombat();
    };


    attackButton.onclick = function() {
        if (user.health <= 0) {
            updateMessage("Grant has won!");
        } else if (user.wins >= 5) {
            updateMessage(playerName + " has beaten Grant for good!");
        } else if (grant.health <= 0 && user.wins < 5) {
            user.wins++;
            updateMessage("You have beaten one stage of Grant the Almighty Chicken!");
            grant.health = 10;
        } else if (user.health >= 0 && user.wins < 5){
            var grantAttack = function(){
                var defendNum = Math.floor(Math.random()*5)+1;
                user.health -= defendNum;
            };
            var userAttack = function(){
                var attNum = Math.floor(Math.random()*3)+1;
                grant.health -= attNum;
            };
            grantAttack();
            userAttack();
            updateDisplay();
            updateMessage(playerName + " has " + user.health + " health left." 
                + " Grant the Almighty Chicken has " + grant.health + 
                " health left.");
        }; 
    };

    healButton.onclick = function() {
        if (user.healsRemaining>0) {
            var userHeal = function(){
                var healNum = Math.floor(Math.random()*10)+1;
                user.health += healNum;
            };
            user.healsRemaining--;
            userHeal();
            updateDisplay();
            updateMessage(playerName + " has healed!");
        } else {
            updateMessage("You have used all of your heals!");
        }
    };
    quitButton.onclick = function(){
        updateMessage(playerName + " has quit the game!")
    }

    function updateDisplay() {
        userHealthBar.value = user.health;
        healBar.value = user.healsRemaining;
        winBar.value = user.wins;
        grantHealthBar.value = grant.health;
    }

    function updateMessage(newMessage) {
        messageP.innerText = newMessage;
    }

    function startCombat(){
        gameDiv.classList.remove("disappear");
        gameDiv.classList.add("appear");
    }


})();