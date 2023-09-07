let info=document.getElementById("information");
let vehicles=document.getElementById("NumberOfVehicles");
let country=document.getElementById("Country_");
let city=document.getElementById("City_");
let basicFieldset=document.getElementById("basicFieldset");
let NOfV=0;
let NOfS=0;
let currNumOfVeh=0;
let currNumOfStores=0

async function get_Countries()
{
    const response =await fetch("https://countriesnow.space/api/v0.1/countries");
    const data=await response.json();
    var api_Select= document.getElementById("Country_");
    api_Select.innerHTML=`<option value="0" disabled selected hidden>Choose a country </option>`;
    api_Select.innerHTML+=`
    <select>
    ${data.data.map(row=> `<Option>${row.country}</Option>`)}
    </select>
    `;
}

get_Countries();
async function get_Cites()
{ 
    var Count_= document.getElementById("Country_");
    
    const response =await fetch("https://countriesnow.space/api/v0.1/countries");
    const data=await response.json();
    var api_Select= document.getElementById("City_");
    api_Select.innerHTML=`<option value="0" disabled selected hidden>Choose a city </option>`;
    for(let row in data.data )
    {
        if (data.data[row].country==Count_.value)
        {
            api_Select.innerHTML +=`
            <select>
            ${data.data[row].cities.map(row=> `<Option>${row}</Option>`)}
            </select>`;
        }
    }
}
get_Cites();

function NumberOfStores()
        {
            sessionStorage.setItem("NumberOfStores",JSON.stringify(currNumOfStores));

};

function Country(value)
        {
            //console.log(value);
            get_Cites();
            var Count_= document.getElementById("Country_");
            var CountryError= document.getElementById("CountryError");
            Count_.style.border=`1px solid #509958`;
            CountryError.style.display="none";
};

function City()
        {
            var City= document.getElementById("City_");
            var CityError= document.getElementById("CityError");
            City.style.border=`1px solid #509958`;
            CityError.style.display="none";
};

function initialize()
{
let HelloError =document.getElementById("HelloError");
let Star_Sim=document.getElementById("startSimulation");
HelloError.style.display="None";
Star_Sim.style.display="none";
}

function NumberOfVehicles ()
        {
                info.innerHTML +=
                `<fieldset id="fieldset${currNumOfVeh}">
                <legend> Info about vehicle <font color=green>(${currNumOfVeh})</font></legend>
                <div class="row">
                    <div class=" col l5 lm s12">
                        <h6 class="h44">Type :</h6>
                        <select class="a" id="type${currNumOfVeh}" onblur="CapacityOptions(this.value, ${currNumOfVeh})">
                            <option value="0" disabled selected hidden>Choose the type of car </option>
                            <option>Private Car</option>
                            <option>Motorcycle</option>
                            <option>Large Car</option>
                        </select>
                    </div>

                    <div class="col l5 offset-l1 m5 offset-m1 s12">
                        <h6 class="h44">Capacity :</h6>
                        <select class="a" id="Capacity${currNumOfVeh}" onblur="setMaxCapacityFridge(${currNumOfVeh})">
                        <option value="0" disabled selected hidden>Choose the capacity of the car</option>
                        </select>
                    </div>
                </div>
                <br>
                <div class="row">
                    <p class="col l6 m6 s10"> <b>Does the vehicles accept fridge?</b></p>
                    <p class="col l5 m5 s6 row">
                        <label class="col l1 m1 s10">
                            <input type="radio" class="with-gap yes " name="HasFridge${currNumOfVeh}" value="YES"  id="fridgeYes${currNumOfVeh}" onclick="YesChange(${currNumOfVeh})"/>
                            <span class="" style="color:green;display:inline-block"><b>Yes</b></span>
                        </label>
                        <label class="col l1 offset-l3 m1 offset-m3 s3 offset-s0">
                            <input type="radio" class="with-gap no " name="HasFridge${currNumOfVeh}" value="No"  id="fridgeNo${currNumOfVeh}" checked="checked" onclick="NoChange(${currNumOfVeh})"/>
                            <span class="" style="color:red; display:inline-block"><b>No</b></span>
                        </label>
                    </p>
                </div>

                <div class=" row" id="CapacityDiv${currNumOfVeh}" style="display:none">
                    <p class="col l6 m6 s12"> <b>Capacity of the fridge</b></p>
                    <input type="number" placeholder="0" class="col l6 m6 s4 offset-s1" id="CapacityOfFridge${currNumOfVeh}" min=0>
                </div>
            </fieldset>`;
            console.log("out");
            let Star_Sim=document.getElementById("startSimulation");
            if(NOfV>0)
            {
                Star_Sim.style.display="block";
            }
            if(NOfV<1)
            {
                Star_Sim.style.display="none";
            }
}

function YesChange(i)
{
    let CapacityDiv=document.getElementById("CapacityDiv"+i);
    let fridgeYes=document.getElementById("fridgeYes"+i);
    let fridgeNo=document.getElementById("fridgeNo"+i);
    console.log("in Ys");
    fridgeYes.setAttribute("checked","checked");
    fridgeNo.removeAttribute("checked");
    CapacityDiv.style.display="block";
    setMaxCapacityFridge(i);
}

function setMaxCapacityFridge(i)
{
    let TotalCapacity=document.getElementById("Capacity"+i);
    let CapacityOfFridge=document.getElementById("CapacityOfFridge"+i);
    CapacityOfFridge.max=TotalCapacity.value;
}

function NoChange(i)
{
    let CapacityDiv=document.getElementById("CapacityDiv"+i);
    let fridgeYes=document.getElementById("fridgeYes"+i);
    let fridgeNo=document.getElementById("fridgeNo"+i);
    console.log("in No");
    fridgeNo.setAttribute("checked","checked");
    fridgeYes.removeAttribute("checked");
    CapacityDiv.style.display="none";  
    
}

function CapacityOptions(value , i )
{
let CapacitySelect=document.getElementById("Capacity"+i);
if(value=="Private Car")
{
    CapacitySelect.innerHTML=`
    <option value="0" disabled selected hidden>Choose the capacity of the car</option>
    <option>100</option>
    <option>200</option>
    <option>300</option>
    `;
}
else if (value=="Large Car")
{
    CapacitySelect.innerHTML=`
    <option value="0" disabled selected hidden>Choose the capacity of the car</option>
    <option>300</option>
    <option>400</option>
    <option>500</option>
    <option>600</option>
    `;
}
else
{
    CapacitySelect.innerHTML =`
    <option value="0" disabled selected hidden>Choose the capacity of the car</option>
    <option>10</option>
    <option>20</option>
    <option>30</option>
    <option>40</option>
    <option>50</option>
    <option>60</option>
    <option>70</option>
    <option>80</option>
    <option>90</option>
    <option>100</option>
    `;
}
}

document.forms[0].onsubmit = function(e)
{
    let Fieldset;
    let type;
    let Capacity;
    let fridgeYes;
    let fridgeNo;
    let CapacityOfFridge;
    let flag=false;
    let elementerr=document.getElementById("HelloError");

    var Count_= document.getElementById("Country_");
    var City_= document.getElementById("City_");

    var CountryError= document.getElementById("CountryError");
    var CityError= document.getElementById("CityError");

    if(Count_.value=="0")
    {
        flag=true;
        Count_.style.border=`2px solid red`;
        CountryError.style.display="block";
    }
    else 
    {
        Count_.style.border=`1px solid #509958`;  
    }
    if(City_.value=="0")
    {
        flag=true;
        City_.style.border=`2px solid red`;
        CityError.style.display="block";
    }
    else 
    {
        City_.style.border=`1px solid #509958`;  
    }
    for(let i=1;i<= +currNumOfVeh;i++)
    {
    Fieldset=document.getElementById("fieldset"+i);
    type=document.getElementById("type"+i);
    Capacity=document.getElementById("Capacity"+i);
    fridgeYes=document.getElementById("fridgeYes"+i);
    fridgeNo=document.getElementById("fridgeNo"+i);
    CapacityOfFridge=document.getElementById("CapacityOfFridge"+i);
    if((fridgeYes.hasAttribute("checked") && CapacityOfFridge.value==0 ) || type.value=="0" || Capacity.value=="0" )
    {
        flag=true;
        Fieldset.style.border="3px solid red"; 
        elementerr.style.display="block";
    }
    else 
    {
        elementerr.style.display="none";
        Fieldset.style.border="2px solid #509958"; 
    }
    }
    if(flag==false)
    {
        store_data();
    }
    else 
    {
        //console.log(Event);
        e.preventDefault();
    }
    let startSimulation=document.getElementById("start");
    startSimulation.style.backgroundColor="#D8A533";
}

let carsArray=[];
function store_data()
{
    sessionStorage.clear();
    product_arr=[]; 
    let type;
    let Capacity;
    let fridgeYes;
    let fridgeNo;
    let CapacityOfFridge;
    sessionStorage.setItem("Country",JSON.stringify(country.value));
    sessionStorage.setItem("City",JSON.stringify(city.value));
    sessionStorage.setItem("NumberOfVehicles",JSON.stringify(currNumOfVeh));
    NumberOfStores();
    for(let i=1;i<= +currNumOfVeh;i++)
    {
    type=document.getElementById("type"+i);
    Capacity=document.getElementById("Capacity"+i);
    fridgeYes=document.getElementById("fridgeYes"+i);
    fridgeNo=document.getElementById("fridgeNo"+i);
    CapacityOfFridge=document.getElementById("CapacityOfFridge"+i);

    let carObj=
    {
        type:type.value,
        Capacity:Capacity.value,
    }

    if(fridgeYes.hasAttribute("checked"))
    {
        carObj.HasFridge="Yes";
        carObj.CapacityOfFridge=CapacityOfFridge.value;
    }
    else
    {
        carObj.HasFridge="No";
        carObj.CapacityOfFridge="0";
    }
    //console.log(carObj);
    carsArray.push(carObj);

    NumberOfStores();
}
//console.log(carsArray);
sessionStorage.setItem("Cars",JSON.stringify(carsArray));
}

function plusVehicles()
{
// console.log(currNumOfVeh,NOfV,"first");
let Number_Vehicles=document.getElementById("NumberOfVehicles");
NOfV++;
currNumOfVeh++;
Number_Vehicles.innerText=NOfV;
// console.log(currNumOfVeh,NOfV,"Hello second");
NumberOfVehicles();
// console.log(currNumOfVeh,NOfV,"Hello third");
}

function minusVehicles()
{
let Number_Vehicles=document.getElementById("NumberOfVehicles");
// console.log(currNumOfVeh,NOfV,"First");
NOfV--;
MinusVehicle();
if(currNumOfVeh>0)
{
currNumOfVeh--;
}
Number_Vehicles.innerText=NOfV;
// console.log(currNumOfVeh,NOfV,"Second");
}

function plusStores()
{
let Number_Stores=document.getElementById("NumberOfStores");
NOfS++;
currNumOfStores++;
Number_Stores.innerText=NOfS;
}

function minusStores()
{
let Number_Stores=document.getElementById("NumberOfStores");
NOfS--;
if(currNumOfStores>0)
{
    currNumOfStores--;
}
Number_Stores.innerText=NOfS;
}

function MinusVehicle()
{
    if(currNumOfVeh>0)
    {
    let deletedField=currNumOfVeh;
    let lastVehicle=document.getElementById("fieldset"+deletedField);
    lastVehicle.remove();
    // console.log(currNumOfVeh,"llllllllllllllllll");
    }
    if(currNumOfVeh<=1)
    {
        initialize();
    }
}
