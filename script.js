let vagasTotal = 9

let jogadores = JSON.parse(localStorage.getItem("jogadores")) || []

let ranking = JSON.parse(localStorage.getItem("ranking")) || {}

function salvar(){

localStorage.setItem("jogadores",JSON.stringify(jogadores))
localStorage.setItem("ranking",JSON.stringify(ranking))

}

function atualizar(){

let inscritos = jogadores.length
let restantes = vagasTotal - inscritos

document.getElementById("inscritos").innerText = inscritos
document.getElementById("restantes").innerText = restantes

let percent = (inscritos/vagasTotal)*100
document.getElementById("progress").style.width = percent+"%"

if(restantes <= 3){

document.getElementById("alert").innerHTML =
"<div class='alert'>⚠ Quase cheio — Restam "+restantes+" vagas</div>"

}

let lista = document.getElementById("lista")
lista.innerHTML=""

jogadores.forEach((j,i)=>{

let div = document.createElement("div")
div.className="player"
div.innerHTML=`${i+1}º ${j.nome}`

lista.appendChild(div)

})

let r = document.getElementById("ranking")
r.innerHTML=""

let sorted = Object.entries(ranking).sort((a,b)=>b[1]-a[1])

sorted.forEach((p,i)=>{

let medalha=""

if(i==0) medalha="🥇"
if(i==1) medalha="🥈"
if(i==2) medalha="🥉"

let classe="rank"

if(i==0) classe+=" gold"
if(i==1) classe+=" silver"
if(i==2) classe+=" bronze"

let div=document.createElement("div")

div.className=classe

div.innerHTML=`${medalha} ${p[0]} <span>${p[1]} partidas</span>`

r.appendChild(div)

})

}

function entrar(){

let nome=document.getElementById("nome").value

if(!nome)return

jogadores.push({nome})

if(!ranking[nome]) ranking[nome]=0

ranking[nome]++

salvar()

atualizar()

}

function abrirAdmin(){

document.getElementById("admin").style.display="block"

}

function loginAdmin(){

let senha=document.getElementById("senhaAdmin").value

if(senha=="ph2011jesus"){

document.getElementById("adminArea").style.display="block"

}

}

function limpar(){

jogadores=[]

salvar()

atualizar()

}

function resetRanking(){

ranking={}

salvar()

atualizar()

}

atualizar()
