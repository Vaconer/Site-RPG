
class Personagem{ //Declaração de classe
    constructor(nome, classe){ // Construtor

         this.nome = nome; //Propriedades
         this.classe = classe; //Propriedades
         this.hp = 100; //Propriedades

    }
    exibirInfo(){ // Método
        const infoTela = document.getElementById("idInfo"); // Instanciamento de objetos
        infoTela.innerHTML = `Nome: ${this.nome} | Classe: ${this.classe} | HP: ${this.hp}`;
    }

    atacar(){ // Método
       const ataqueTela = document.getElementById("idAtaque"); // Instanciamento de objetos
       ataqueTela.innerHTML = `O ${this.classe} ${this.nome} está realizando um ataque!`;  
       let dano = Math.floor(Math.random() * 100);
       document.getElementById("idDano").innerHTML = "Dano causado: " + dano;
        
    }

    recarregar() {
        if (this instanceof Guerreiro) {
            const energiaMaxima = 100;
            const aumentoEnergia = 50;
    
            if (this.energia + aumentoEnergia <= energiaMaxima) {
                this.energia += aumentoEnergia;
            } else {
                this.energia = energiaMaxima;
            }
        } else if (this instanceof Arqueiro) {
            const arrowMax = 20;
            const arrowRecharge = 10;
    
            if (this.arrowNumbers + arrowRecharge <= arrowMax) {
                this.arrowNumbers += arrowRecharge;
            } else {
                this.arrowNumbers = arrowMax;
            }
        } else if (this instanceof Mago) { 
            const mpMax = 100; 
            const mpRecharge = 50; 
    
            if (this.mp + mpRecharge <= mpMax) { 
                this.mp += mpRecharge;
            } else {
                this.mp = mpMax; 
            }
        }
    }
    
    morrer(){ // Método
        if(this.hp <= 0){
            document.getElementById(`img${this.classe}`).style.filter = "saturate(0%)"
            document.getElementById(`${this.classe.toLowerCase()}AtkBt`).style.display = "none"
          
        }   
    }

    recebeDano(){ // Método
        const imgElement = document.getElementById(`img${this.classe}`); // Instanciamento de objetos

        imgElement.classList.add("blink");

        setTimeout(()=>{ //Acessos especiais
        imgElement.classList.remove("blink");  
        },1500)
        console.log(`img${this.classe}`)
    }
}

class Guerreiro extends Personagem {
    constructor(nome) {
        super(nome, "Guerreiro");
        this.energia = 100;
    }

    exibirInfo() {
        const infoTela = document.getElementById("idInfo");
        infoTela.innerHTML = `Nome: ${this.nome} | Classe: ${this.classe} | HP: ${this.hp} | Energia: ${this.energia}`;
    }

    atacar(inimigo) {
        if (this.energia >= 10) { // Change the condition to >= 10
            super.atacar();
            this.energia -= 10;
            const randomDamage = Math.floor(Math.random() * 31); // Random damage from 0 to 30
            inimigo.receberDano(randomDamage);
            this.exibirInfo();
        } else {
            ataqueTela.innerHTML = `${this.nome} está sem energia para atacar!`;
            const ataqueTela = document.getElementById("idAtaque");
            this.energia = 0; // Set energy to 0 when they are out of energy
        }
    }

}

class Mago extends Personagem {
    constructor(nome) {
        super(nome, "Mago");
        this.mp = 100;
    }

    exibirInfo() {
        const infoTela = document.getElementById("idInfo"); // Instanciamento de objetos
        infoTela.innerHTML = `Nome: ${this.nome} | Classe: ${this.classe} | HP: ${this.hp} | MP: ${this.mp}`;
    }

    atacar(inimigo) {
        if (this.mp >= 10) {
            super.atacar();
            const randomDamage = Math.floor(Math.random() * 31); // Random damage from 0 to 30
            inimigo.receberDano(randomDamage);
            this.mp -= 10; // Deduct MP after the attack
            this.exibirInfo(); // Update the info display after the attack
        } else {
            ataqueTela.innerHTML = `${this.nome} está sem mana para atacar!`;
            const ataqueTela = document.getElementById("idAtaque");
        }
    }
}

class Arqueiro extends Personagem {
    constructor(nome) {
        super(nome, "Arqueiro");
        this.arrowNumbers = 20; // Start with 20 arrows
    }

    exibirInfo() {
        const infoTela = document.getElementById("idInfo"); // Instanciamento de objetos
        infoTela.innerHTML = `Nome: ${this.nome} | Classe: ${this.classe} | HP: ${this.hp} | Flechas: ${this.arrowNumbers}`;
    }

    atacar(inimigo) {
        if (this.arrowNumbers > 0) { // Check if there are arrows available
            super.atacar();
            this.arrowNumbers -= 1;
            const randomDamage = Math.floor(Math.random() * 31); // Random damage from 0 to 30
            inimigo.receberDano(randomDamage);
            this.exibirInfo(); // Update the info display to show remaining arrows
        } else {
            // Display a message indicating that the Arqueiro is out of arrows
            ataqueTela.innerHTML = `${this.nome} está sem flechas!`;
            const ataqueTela = document.getElementById("idAtaque");
        }
    }
}

//instaciamento de objetos
const guerreiro = new Guerreiro("Ragnar"); // Instanciamento de objetos
const mago = new Mago("Thaedric"); // Instanciamento de objetos
const arqueiro = new Arqueiro("Thalia"); // Instanciamento de objetos


// Recarregar ------------------------------------------------------

const btRecarregarGuerreiro = document.getElementById("guerreiroRecarregar");

btRecarregarGuerreiro.addEventListener('click', () => {
    guerreiro.recarregar();
    guerreiro.exibirInfo();
});

const btRecarregarMago = document.getElementById("magoRecarregar");

btRecarregarMago.addEventListener('click', () => {
    mago.recarregar();
    mago.exibirInfo();
});

const btRecarregarArqueiro = document.getElementById("arqueiroRecarregar");

btRecarregarArqueiro.addEventListener('click', () => {
    arqueiro.recarregar();
    arqueiro.exibirInfo();
});

// info ------------------------------------------------------------
document.getElementById("guerreiroInfoBt").addEventListener('click', ()=>{guerreiro.exibirInfo()})
document.getElementById("magoInfoBt").addEventListener('click', ()=>{mago.exibirInfo()})
document.getElementById("arqueiroInfoBt").addEventListener('click', ()=>{arqueiro.exibirInfo()})

//ATAQUES ----------------------------------------------------------

const btAtkGuerreiro = document.getElementById("guerreiroAtkBt") // Instanciamento de objetos

btAtkGuerreiro.addEventListener('click', ()=>{ //arrow function
    guerreiro.atacar(inimigo);

})

const btAtkMago = document.getElementById("magoAtkBt") // Instanciamento de objetos

btAtkMago.addEventListener('click', ()=>{ //arrow function
    mago.atacar(inimigo);

})

const btAtkArqueiro = document.getElementById("arqueiroAtkBt") // Instanciamento de objetos

btAtkArqueiro.addEventListener('click', ()=>{ //arrow function
    arqueiro.atacar(inimigo);

})

///INIMIGO

class Inimigo extends Personagem {
    constructor(nome, classe) {
        super(nome, classe);
        this.hp = 500;
    }

    atacar(personagem) {
        const ataqueTela = document.getElementById("idAtaque");

        if (personagem.hp <= 0) {
            return;
        }

        let chanceAcerto = Math.floor(Math.random() * 20) + 2;
        let dano = Math.floor(Math.random() * 12) + 10;
        if (chanceAcerto == 20) {
            dano *= 2;
            personagem.hp -= dano;
            ataqueTela.innerHTML = `${this.nome} atacou criticamente ${personagem.nome} causando ${dano} de dano!`;
            personagem.recebeDano();
        } else if (chanceAcerto >= 13) {
            personagem.hp -= dano;
            ataqueTela.innerHTML = `${this.nome} acertou ${personagem.nome} causando ${dano} de dano!`;
            personagem.recebeDano();
        } else {
            dano = 0;
            ataqueTela.innerHTML = `${this.nome} errou ${personagem.nome} causando ${dano} de dano!`;
        }

        // Após o ataque, verifique se a vida do personagem é menor ou igual a 0
        if (personagem.hp <= 0) {
            personagem.morrer();
        }
    }

    receberDano(dano) {
        super.receberDano();
        if (this.hp > 0) {
            this.hp -= dano;
            if (this.hp <= 0) {
                inimigo.morrer();
            }
        }
    }
}

const inimigo = new Inimigo("Balor", "Demônio") // Instanciamento de objetos

document.getElementById("enemyInfoBt").addEventListener('click', ()=>{inimigo.exibirInfo()})

const personagens = [guerreiro, mago, arqueiro] // Instanciamento de objetos

document.getElementById("enemyAtkBt").addEventListener('click', ()=>{
    
    let personagemAleatorio = Math.floor(Math.random()*personagens.length)
    inimigo.atacar(personagens[personagemAleatorio])
    personagens[personagemAleatorio].morrer();
})