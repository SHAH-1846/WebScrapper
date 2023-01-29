const axios=require('axios');
const cheerio=require('cheerio');
const pretty=require('pretty');
const fs=require('fs');

const markup=`<ul class="fruits"><li class="fruits_mango"> Mango </li><li class="fruits_apple"> Apple </li></ul>`;

const $=cheerio.load(markup);
console.log(pretty($.html()));

const mango=$('.fruits_mango');
console.log(pretty(mango.html()));
console.log(mango.attr('class'));

const apple=$('.fruits_apple');
console.log(apple.html());
console.log(apple.attr("class"));

const listItems=$('li');
console.log(listItems.length);
listItems.each(function(idx,el){
    console.log($(el).text());
})


const ul=$('ul');
ul.append('<li>Banana</li>');
ul.prepend('<li>Pineapple</li>');
console.log(pretty($.html()));
console.log("Using HTML: ",pretty(ul.html()));

// URL of the page we want to scrape
const url = "https://en.wikipedia.org/wiki/ISO_3166-1_alpha-3";


async function scrapeData(){
    try{
        const {data}=await axios.get(url);
        const $=cheerio.load(data);
        const listItems=$('.plainlist ul li');
        const countries=[];
        listItems.each(function (idx,el){
            const country={name:"",iso3:""};
            country.name=$(el).children('a').text();
            country.iso3=$(el).children('span').text();
            countries.push(country);
        });

        console.dir(countries);
        fs.writeFile('countries.json',JSON.stringify(countries,null,2),(err)=>{
            if(err){
                console.error(err);
                return;
            }
            console.log("Successfully written data to file!");

        });
    }catch(err){
        console.error(err);
    }

}
scrapeData();


