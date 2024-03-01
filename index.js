const url = "https://openapi.programming-hero.com/api/ai/tools";
const loadData = async () => {
  const convertFecth = await fetch(url);
  const data = await convertFecth.json();
  const tool = data.data.tools;
  // console.log(tool);
  aiTools(tool);
};
loadData();

const aiTools = (id) => {
   
    id = id.slice(0,6)
  
    const cardsbody = document.getElementById('cards')
  id.forEach((element) => {
    // console.log(element);
    const div = document.createElement("div");
    div.classList = "card  w-96 bg-gray-100 shadow-xl mt-7";
    div.innerHTML = `
                    <figure>
                    <img  src="${element.image}" alt="Shoes" />
                    </figure>
                    <div class="card-body">
                      <h2 class="card-title text-xl ">Feature</h2>
                     <ol>
                        <li> 1. ${element.features[0]} </li>
                        <li> 2. ${element.features[1]}  </li>
                        <li> 3.  ${element.features[2]} </li>
                     </ol> 
                     <hr>

                      <div class="card-actions flex justify-between">
                       <div>
                       <h1 class="text-xl font-bold">${element.name}</h1>
                       <h1> <i class="fa-regular fa-calendar-days"></i> ${element.published_in }</h1>
                       
                       </div>

                        <button onclick="showDetails('${element.id}')"  class="btn bg-pink-100 rounded-full"> <i class="fa-solid fa-chevron-right"></i></button>
                      </div>
                    </div> `;
        cardsbody.appendChild(div)
  });
};

// const singleData = async() =>{
    
// }

const showDetails = async(id) =>{
    const respons = await fetch( `https://openapi.programming-hero.com/api/ai/tool/${id}`)
    const  data = await respons.json()
    const toolsData = data.data
    console.log(toolsData);

    showADetails.showModal()
   
    

    const modalDetails = document.getElementById('modal-details')
    modalDetails.innerHTML = `
    <div class="p-5 flex justify-between gap-2">
    <div class="border-2 rounded-2xl  border-red-400">
        <div class="p-5">
            <h1 class="text-xl font-semibold ">${toolsData?.description}</h1>
        </div>
        <div class="flex gap-3 mb-3 justify-around">
            <p class="text-orange-500 font-bold bg-gray-100 p-10">${toolsData.pricing[0].price} <br> <span> ${toolsData.pricing[0].plan}</span></p>
            <p class="text-green-300 font-bold bg-gray-100 p-10">${toolsData.pricing[1].price} <br> <span> ${toolsData.pricing[1].plan}</span></p>
            <p class="text-blue-200 font-bold bg-gray-100 p-10">${toolsData.pricing[2].price} <br> <span> ${toolsData.pricing[2].plan}</span></p>
        </div>
        <div class="flex mb-4 justify-around gap-5">
            <div>
                <h1 class="text-xl font-bold">Features</h1>
                <ol>
                     <li> ${toolsData.features[1].feature_name} </li>
                     <li> ${toolsData.features[2].feature_name} </li>
                     <li> ${toolsData.features[3].feature_name} </li>
                </ol>
            </div>
            <div>
                <h1 class="text-xl font-bold">Integrations</h1>
                <ol>
                    <li>${toolsData.integrations[0]}</li>
                    <li>${toolsData.integrations[1]}</li>
                    <li>${toolsData.integrations[2]}</li>
                </ol>

            </div>
        </div>
    </div>
    <div class="border-2 rounded-2xl border-green-300">
        <div class="p-2 space-y-3">
        <img class="rounded-xl" src="${toolsData.image_link[0]}" alt="">
        <h1 class="text-xl text-center font-bold">${toolsData.input_output_examples[0].input}</h1>
        <h1 class="text-center">${toolsData.input_output_examples[0].output}</h1>
        </div>
    </div>
</div>
    `
}
