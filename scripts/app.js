const handleSearch = () => {
  document.getElementById('spinner').style.display = "block";
  const searchText = document.getElementById('search-box').value
  setTimeout(function() {
    loadAllPhone(false,searchText)
  },1000)
}

const loadAllPhone = async(status,searchText) => {
  document.getElementById('spinner').style.display = 'none';

  const response = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
  const data = await response.json();
  if (status) {
    displayPhones(data.data.splice(0))
  } else {
    displayPhones(data.data.splice(0,6))
  }

}

const displayPhones = (phones) => {
  const phonesContainer = document.getElementById('phones-container');
  phonesContainer.innerHTML = '';
  phones.forEach(phone => {
    const {image, phone_name, slug} = phone
    const div = document.createElement('div');
    div.classList.add('card','card-compact','border','p-4',)
    div.innerHTML =
    `
    <div id="cards" class="bg-gray-100 flex justify-center py-14 rounded-xl">
    <img
      src=${image} />
  </div>
  <div class="card-body space-y-4">
    <h2 class="text-2xl font-bold text-center">${phone_name}</h2>
    <p class="text-lg font-normal text-center">${slug}</p>
    <div class="text-center">
        <button onclick="phoneDetails('${slug}')" class="btn btn-primary">
          Show details
      </button>
    </div>
  </div>
    `
    phonesContainer.appendChild(div)
   
  });
}

const phoneDetails = async(slug) => {
  const response = await fetch(`https://openapi.programming-hero.com/api/phone/${slug}`)

  const data = await response.json();
  displayDetails(data.data)

  

}

const displayDetails = (details) => {

  if (!details.others) {
    details.others = {
      GPS: "GPS info not available",
    };
  }


  const {
    image,
    name,
    brand,
    releaseDate,
    slug,
    mainFeatures: { storage, displaySize, chipSet, memory },
    others:{GPS},
} = details;

  const modalContainer = document.getElementById('modal-container')
  modalContainer.innerHTML =
  `
      <dialog id="my_modal_1" class="modal">
  <div class="modal-box space-y-5">
  <div class="flex justify-center">
  <img class="" src=${image}>
  </div>
    <h3 class="text-2xl font-bold">${name}</h3>
    <p><span class="font-semibold">Storage: </span>${storage}</p>
    <p><span class="font-semibold">Display Size: </span>${displaySize}</p>
    <p><span class="font-semibold">Chipset: </span>${chipSet}</p>
    <p><span class="font-semibold">Memory: </span>${memory}</p>
    <p><span class="font-semibold">Slug: </span> ${slug}</p>
    <p><span class="font-semibold">Release Date: </span>${releaseDate}</p>
    <p><span class="font-semibold">Brand: </span>${brand}</p>
    <p><span class="font-semibold">GPS: </span>${GPS}</p>
   
    <div class="modal-action">
      <form method="dialog">
        <!-- if there is a button in form, it will close the modal -->
        <button class="btn btn-error text-white">Close</button>
      </form>
    </div>
  </div>
</dialog>

  `
  my_modal_1.showModal()
}

const showAllPhones = () => {
  const searchText = document.getElementById('search-box').value
  loadAllPhone(true,searchText)
}
 loadAllPhone(false,"iphone")