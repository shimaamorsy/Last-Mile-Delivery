let map;
let marker;
let geocoder;

let NumberOfStores=JSON.parse(sessionStorage.NumberOfStores);
let NumberOfVehicles=JSON.parse(sessionStorage.NumberOfVehicles);
let Country=JSON.parse(sessionStorage.Country);
let City=JSON.parse(sessionStorage.City);
let Cars=JSON.parse(sessionStorage.Cars);

let Latitude;
let longitude;

let wayPoints=[];
let wayPointsStores=[];
let wayPointsVehicles=[];

async function toggleBounce() {
    if (marker.getAnimation() !== null) {
        marker.setAnimation(null);
    } else {
        marker.setAnimation(google.maps.Animation.BOUNCE);
    }
}
function geocode(request) {
geocoder
    .geocode(request)
    .then((result) => {
    const { results } = result;
    let lat=results[0].geometry.location.lat();
    let lng=results[0].geometry.location.lng();

    console.log(results);

    sessionStorage.setItem("Latitude",JSON.stringify(lat));
    sessionStorage.setItem("longitude",JSON.stringify(lng));

    map.setCenter(results[0].geometry.location);
    map.setZoom(10);
    return 0;
    })
}

async function initMap() {
const { Map } = await google.maps.importLibrary("maps");
const {TravelMode} = await google.maps.importLibrary("routes");
map = new Map(document.getElementById("map"), {
center: { lat: 27.1833, lng:31.1667 },
zoom:3,
mapTypeControl: false,
});

geocoder =await (new google.maps.Geocoder());
geocode({ address: City});

//console.log(JSON.parse(sessionStorage.Latitude),JSON.parse(sessionStorage.longitude),"LLLLLLLLLLLLLLLL");
//console.log(JSON.parse(sessionStorage.latv),JSON.parse(sessionStorage.lngv),"MMMMMMMMMMMMMMMMMMMMM");

arrData.forEach(function(item){
    let marker;
    //console.log(JSON.parse(sessionStorage.Latitude),JSON.parse(sessionStorage.longitude),"LLLLLLLLLLLLLLLL");
    let latlng=getPoint(JSON.parse(sessionStorage.Latitude),JSON.parse(sessionStorage.longitude));
    //console.log(latlng,"***");
    //console.log(longitude,"&&");
    let infowindow;
    let image ;
    
    if(item.Type=="Motorcycle")
    {
        item["latlng"]=latlng;
        image="https://img.icons8.com/emoji/96/000000/motorcycle-emoji.png";
    }

    else if (item.Type=="Large Car")
    {
        item["latlng"]=latlng;
        image="https://img.icons8.com/color/48/suv.png"
    }

    else if (item.Type=="Private Car")
    {
        item["latlng"]=latlng;
        image ="https://img.icons8.com/doodle/48/old-car.png";
    }

    else 
    {
        image="https://img.icons8.com/clouds/100/small-business.png";
    }

    if(item.Type=="Store")
    {
        //wayPointsStores.push(latlng);
        wayPoints.push(latlng);

        item["latlng"]=latlng;
        //console.log(item["latlng"]);
        let AllDivs=document.createElement("div");
        item.vehicles.forEach(function(veh)
        {
            let div=document.createElement("div");
            div.classList.add("DivObj");
            let h4Name=document.createElement("h4");
            let Ptype=document.createElement("h4");
            let PCapacity=document.createElement("h4");
    
            h4Name.innerHTML= "Vehicle name   :"+ `<span class="ff">${veh.Name}</span>`;
            PCapacity.innerHTML= "Number of orders   :"+`<span class="ff">${veh.Quantity}</span>`;
            Ptype.innerHTML= "Type of orders   :"+`<span class="ff">${veh.Type}</span>`;
    
    
            div.appendChild(h4Name);
            div.appendChild(PCapacity);
            div.appendChild(Ptype);
            
            AllDivs.appendChild(div);
        })
        if(AllDivs.innerHTML=="")
        {
            let text=document.createElement("h2");
            text.classList.add("text");
            text.innerText="No vehicle to take store's orders..";
            AllDivs.prepend(text);
        }
        else 
        {
            let text=document.createElement("h2");
            text.classList.add("text");
            text.innerText="These are vehicles that received store's orders..";
            AllDivs.prepend(text);
        }

        marker = new google.maps.Marker({
            position: latlng,
            title:item.Name,
            map:map,
            icon:image,
            animation: google.maps.Animation.DROP,
        })
        //marker.addListener("click", toggleBounce);
        infowindow = new google.maps.InfoWindow({
            content: `<div class="all">
            <div> <img src="${image}"></div>
            <h1 class="head">${item.Name}</h1>
            <h3>Number of initial orders:<span class="ff">${item["Total Orders"]}</span></h3>
            <h3>Number of current icy orders in the store :  <span class="ff">${item["Icy Orders"]}</span></h3>
            <h3>Number of current not icy orders in th store : <span class="ff">${item["Not Icy Orders"]}</span></h3></div>
            ` + AllDivs.outerHTML ,
        })
    }

    else if(item["Has Fridge"]=="Yes")
    {
        let AllDivs=document.createElement("div");
        item.stores.forEach(function(str)
        {
            let div=document.createElement("div");
            div.classList.add("DivObj");
            let h4Name=document.createElement("h4");
            let Ptype=document.createElement("h4");
            let PCapacity=document.createElement("h4");
    
            h4Name.innerHTML= "Store name   :"+ `<span class="ff">${str.Name}</span>`;
            PCapacity.innerHTML= "Number of oreders   :"+`<span class="ff">${str.Quantity}</span>`;
            Ptype.innerHTML= "Type of oreders   :"+`<span class="ff">${str.Type}</span>`;
    
    
            div.appendChild(h4Name);
            div.appendChild(PCapacity);
            div.appendChild(Ptype);
            
            AllDivs.appendChild(div);
        })
        if(AllDivs.innerHTML=="")
        {
            let text=document.createElement("h2");
            text.classList.add("text");
            text.innerText="No store requested this vehicle.. ";
            AllDivs.prepend(text);
        }
        else 
        {
            let text=document.createElement("h2");
            text.classList.add("text");
            text.innerText="These are stores that requested this vehicle.. ";
            AllDivs.prepend(text);
        }
        marker = new google.maps.Marker({
            position: latlng,
            title:item.Name,
            map:map,
            icon:image,
        })


        infowindow = new google.maps.InfoWindow({
            content: ` <div class="all">
            <div> <img src="${image}"></div>
            <h1 class="head">${item.Name}</h1>
            <h3>Full capacity :                   <span class="ff">${item["Full Capacity"]}</span></h3>
            <h3>Has fridge ? :                    <span class="ff">${item["Has Fridge"]}</span></h3>
            <h3>Capacity of the fridge  :         <span class="ff">${item["Fridge"]}</span></h3>

            <h3>Current not icy orders :           <span class="ff"> ${item["Current Not Icy Orders"]}</span></h3>
            <h3>Current free not icy orders :              <span class="ff">${item["Free Not Icy Orders"]}</span></h3>

            <h3>Current orders on vehicle's fridge :<span class="ff">${item["Current Orders on Vehicle'Fridge"]}</span></h3>
            <h3>Current free fridge's orders :             <span class="ff">${item["Free Fridge's Orders"]}</span></h3>
            </div>` + AllDivs.outerHTML ,
        })
    }

    else 
    {

        let AllDivs=document.createElement("div");
        item.stores.forEach(function(str)
        {
            let div=document.createElement("div");
            div.classList.add("DivObj");
            let h4Name=document.createElement("h4");
            let Ptype=document.createElement("h4");
            let PCapacity=document.createElement("h4");
    
            h4Name.innerHTML= "Store name   :"+ `<span class="ff">${str.Name}</span>`;
            PCapacity.innerHTML= "Number of oreders   :"+`<span class="ff">${str.Quantity}</span>`;
            Ptype.innerHTML= "Type of oreders   :"+`<span class="ff">${str.Type}</span>`;
    
    
            div.appendChild(h4Name);
            div.appendChild(PCapacity);
            div.appendChild(Ptype);
            
            AllDivs.appendChild(div);
        })

        if(AllDivs.innerHTML=="")
        {
            let text=document.createElement("h2");
            text.classList.add("text");
            text.innerText="No store requested this vehicle.. ";
            AllDivs.prepend(text);
        }
        else 
        {
            let text=document.createElement("h2");
            text.classList.add("text");
            text.innerText="These are stores that requested this vehicle.. ";
            AllDivs.prepend(text);
        }
        
        marker = new google.maps.Marker({
            position: latlng,
            title:item.Name,
            map:map,
            icon:image,
        })
        
        infowindow = new google.maps.InfoWindow({
            content: ` <div class=all>
            <div> <img src="${image}"></div>
            <h1 class="head">${item.Name}</h1>
            <h3>Full capacity :          <span class="ff">${item["Full Capacity"]}</span></h3>
            <h3>Has fridge ? :           <span class="ff">${item["Has Fridge"]}</span></h3>
            <h3>Current not icy orders : <span class="ff">${item["Current Not Icy Orders"]}</span></h3>
            <h3>Free not icy orders :    <span class="ff">${item["Free Not Icy Orders"]}</span></h3>
            </div`+ AllDivs.outerHTML,
        })
    }

    marker.addListener('click',function(){
        infowindow.open(map,marker);
    });
});

//console.log(arrData);
let waypts = [];
for(let vehicle=NumberOfStores;vehicle<(NumberOfStores+NumberOfVehicles);vehicle++)
{
    var directionsService = new google.maps.DirectionsService();
    var directionsRenderer = new google.maps.DirectionsRenderer({
        map: map
    });
    directionsRenderer.setMap(map);
    let vehicleObj=arrData[vehicle];
    let storesOfVObj=vehicleObj.stores;
    //console.log(storesOfVObj);
    storesOfVObj.forEach(function(item){
        for(let store=0;store<NumberOfStores;store++)
        {
            let storeName=arrData[store].Name;
            if(item.Name==storeName)
            {
                item["latlng"]=arrData[store].latlng;
            }
        }
    });
    waypts=[];
    var travelModes = [
        google.maps.TravelMode.DRIVING,
        google.maps.TravelMode.WALKING,
        google.maps.TravelMode.BICYCLING
    ];
    for (let i = 0; i < storesOfVObj.length-1; i++) {
        console.log(storesOfVObj[i].Name);
        waypts.push({
            location: storesOfVObj[i].latlng,
            stopover: true,
        });
    }
    calculateAndDisplayRoute(directionsService, directionsRenderer,vehicleObj,storesOfVObj[storesOfVObj.length-1],waypts,travelModes)
}
console.log(arrData);
}
let arrData=[];
StoresVehiclesData();
function getPoint(Lati,long)
{
    let radius=.05;
    let min_X=Lati-radius;
    let max_X=Lati+radius;

    let min_Y=long-radius;
    let max_Y=long+radius;

    let x,y;
    
    let r=0;
    while(r<100) {
    x =Math.random()*((max_X-min_X)+.1) + min_X;
    y=Math.random()*((max_Y-min_Y)+.1) + min_Y;;
    
    if(Math.pow((x-Lati),2) + Math.pow((y-long),2) <= Math.pow(radius,2))
    {
    return {lat:x,lng:y};
    break;
    }
    r++;
    }
}
function StoresVehiclesData()
{
for(let i=0;i<NumberOfStores;i++)
{
    let hasIcy=Math.random();
    let randomValue=Math.random()*100;
    let randomValueBetween;
    if(hasIcy>0.5)
    {
    randomValueBetween=getRandomValueBetween(0,randomValue);
    }
    else{
        randomValueBetween=0;
    }
    let obj={
        Name:`Store ${i+1}`,
        Type:"Store",
        latlng:wayPointsStores[i],
        vehicles:[],
        "Total Orders":Math.floor(randomValue),

        "Not Icy Orders":Math.floor(randomValue)-Math.floor(randomValueBetween),

        "Icy Orders":Math.floor(randomValueBetween),
    }
    arrData.push(obj);
}

for(let i=0;i<NumberOfVehicles;i++)
{
    let obj={
        Name:` Vehicle ${i+1}`,
        Type:Cars[i].type,
        stores:[],
        "Full Capacity":Cars[i].Capacity,
        "Has Fridge":Cars[i].HasFridge,
    }
    if(Cars[i].HasFridge=="Yes")
    {
        let Total_Icy_Curr=getRandomValueBetween(0,Cars[i].CapacityOfFridge);
        let NotIcy=Cars[i].Capacity-Cars[i].CapacityOfFridge;
        let randomValue=getRandomValueBetween(0,NotIcy);

        obj["Fridge"]=Cars[i].CapacityOfFridge;

        obj["Current Orders on Vehicle'Fridge"]=Total_Icy_Curr;
        obj["Free Fridge's Orders"]=Cars[i].CapacityOfFridge-Total_Icy_Curr;


        obj["Not Fridge"]=NotIcy;
        obj["Current Not Icy Orders"]=randomValue;
        obj["Free Not Icy Orders"]=NotIcy-randomValue;



    }
    else 
    {
        let Total_Curr=getRandomValueBetween(0,Cars[i].Capacity);

        obj["Current Not Icy Orders"]=Total_Curr;
        obj["Free Not Icy Orders"]=Cars[i].Capacity-Total_Curr;

    }
    arrData.push(obj);
}
sessionStorage.arrDataBefore=JSON.stringify(arrData);
StoreToVehicles();
}
function getRandomValueBetween(min,max)
{
    let ran=Math.random()*max;
    return Math.floor(ran);
}
function StoreToVehicles()
{
    //let SessionArray=JSON.parse(sessionStorage.SessionArray);
    //console.log(JSON.parse(sessionStorage.City));
    for(let store=0;store<NumberOfStores;store++)
    {
        let storeObj=arrData[store];
        //sessionStorage["StoreBefore"+store]=JSON.stringify(storeObj);
        //console.log(storeObj);

        for(let vehicle=NumberOfStores;vehicle<(NumberOfStores+NumberOfVehicles);vehicle++)
        {
            let vehicleObj=arrData[vehicle];
            //console.log(vehicleObj);
            //sessionStorage["VOF"+store+"Before*"+(vehicle-NumberOfStores)]=JSON.stringify(vehicleObj);
            if(vehicleObj["Has Fridge"]=="Yes")
            {
                if(storeObj["Icy Orders"] > 0 && vehicleObj["Free Fridge's Orders"] > 0 )
                {
                    let Quantity=0;
                    TypeOFOrders="Icy";
                    if(storeObj["Icy Orders"]>= vehicleObj["Free Fridge's Orders"])
                    {
                        Quantity=vehicleObj["Free Fridge's Orders"];
                        vehicleObj["Current Orders on Vehicle'Fridge"]+=vehicleObj["Free Fridge's Orders"];
                        storeObj["Icy Orders"]=storeObj["Icy Orders"]-vehicleObj["Free Fridge's Orders"];
                        vehicleObj["Free Fridge's Orders"]=0;
                    }
                    else 
                    {
                        Quantity=storeObj["Icy Orders"];
                        vehicleObj["Free Fridge's Orders"]
                        vehicleObj["Free Fridge's Orders"]=vehicleObj["Free Fridge's Orders"]-storeObj["Icy Orders"];
                        vehicleObj["Current Orders on Vehicle'Fridge"]+=storeObj["Icy Orders"];
                        storeObj["Icy Orders"]=0;
                    }

                    let storeObject={Name:storeObj["Name"],Quantity,Type:TypeOFOrders};
                    let vehicleObject={Name:vehicleObj["Name"],Quantity,Type:TypeOFOrders};

                    vehicleObj.stores.push(storeObject);
                    storeObj.vehicles.push(vehicleObject);
                }
            }

           // console.log(storeObj["Not Icy Orders"]);
         //   console.log(vehicleObj["Free Not Icy Orders"]);

            if(storeObj["Not Icy Orders"]> 0 && vehicleObj["Free Not Icy Orders"]> 0 )
            {
                let Quantity=0;
                let TypeOFOrders=" Not Icy";
                if(storeObj["Not Icy Orders"]>= vehicleObj["Free Not Icy Orders"])
                {
                    Quantity=vehicleObj["Free Not Icy Orders"];
                    vehicleObj["Current Not Icy Orders"]+=vehicleObj["Free Not Icy Orders"];
                    storeObj["Not Icy Orders"]=storeObj["Not Icy Orders"]-vehicleObj["Free Not Icy Orders"];
                    vehicleObj["Free Not Icy Orders"]=0;
                }
                else 
                {
                    Quantity=storeObj["Not Icy Orders"];
                    vehicleObj["Free Not Icy Orders"]=vehicleObj["Free Not Icy Orders"]-storeObj["Not Icy Orders"];
                    vehicleObj["Current Not Icy Orders"]+=storeObj["Not Icy Orders"];
                    storeObj["Not Icy Orders"]=0;
                }

                let storeObject={Name:storeObj["Name"],Quantity,Type:TypeOFOrders};
                let vehicleObject={Name:vehicleObj["Name"],Quantity,Type:TypeOFOrders};

                vehicleObj.stores.push(storeObject);
                storeObj.vehicles.push(vehicleObject);
            }
            //console.log(vehicleObj);
           // vehicleObj=SessionArray[vehicle];
            //sessionStorage["VOF"+store+"After"+ (vehicle-NumberOfStores)]=JSON.stringify(vehicleObj);
            //copyVehicleObj=Object.assign(arrData[vehicle]);
            //console.log(copyVehicleObj);
        }
        //console.log(storeObj);
        //sessionStorage["StoreAfter"+store]=JSON.stringify(storeObj);
 
    }
    sessionStorage.arrDataAfter=JSON.stringify(arrData);
    // sessionStorage.arrData=JSON.stringify(arrData);
  //  PutStoresAndVehiclesOnMap();
}
function calculateAndDisplayRoute(directionsService, directionsRenderer,start,end,waypts) {
    console.log(start,end,waypts);
    var travelModes = ["DRIVING", "WALKING", "BICYCLING", "TRANSIT"];
    if(end)
    {
directionsService
    .route({
    origin: start.latlng,
    destination:end.latlng,
    waypoints: waypts,
    optimizeWaypoints: true,
    travelMode:  google.maps.TravelMode.DRIVING, 
    })
    .then((response) => {
    directionsRenderer.setDirections(response);
    })
}
}

initMap();

