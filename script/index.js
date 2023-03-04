fetch("https://fakestoreapi.com/products/")
  .then((res) => res.json())
  .then((data) => displayCardData(data));

const getElement = (id) => {
  return document.getElementById(id);
};

// fetch nav item
fetch("https://fakestoreapi.com/products/categories")
  .then((res) => res.json())
  .then((data) => showNevItem(data));
// show nav items
const showNevItem = (data) => {
  const navItem = getElement("navItem");

  let category_name = data
    .map(
      (category) =>
        `<a class=" text-decoration-none text-primary "  onclick="fetchCategories('${category
          .split("'")
          .join("")}')">${category}</a>`
    )
    .join("");
  navItem.innerHTML = category_name;
};

// fetchCategoryByName
const fetchCategories = (categoryName) => {
  fetch(`https://fakestoreapi.com/products/category/${categoryName}`)
    .then((res) => res.json())
    .then((json) => displayCardData(json));
};

const SearchCategories = () => {
  const searchBar = document.getElementById("search-filed");
  const value = searchBar.value;

  fetchCategories(value);
  searchBar.value = "";
};

//   card data show
const displayCardData = (data) => {
  console.log(data);
  const container = getElement("mainSection");
  container.innerHTML = "";
  data.forEach((element) => {
    const { category, description, id, image, price, rating, title } = element;
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML += `
    <div class="card  rounded-2 text-gray-50">
          <img src="${image}" class="card-img-top img-fluid rounded-3 px-lg-3 py-lg-3 p-2 " style="height:400px" />
          <div class="card-body">
            <h5 class="card-title">${title}</h5>
            
            <h5  class="card-text " >$ ${price} </h5>
            <div class="d-flex text-danger justify-content-between my-2">
            <h6 > <i class="fas fa-eye"></i> ${rating.count}</h6>
            

            <h6> ${rating.rate} 
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star-half-stroke"></i>
            </h6>
            </div>
            <div class="d-flex justify-content-between my-2">
            <h6  class="card-text text-danger" > ${category} </h6>
            <button onclick="getDetailId(${id})"
            type="button"
            class="btn btn-outline-success "
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop"
          >
            See Details
          </button>
            </div>

        </div>
    </div>
    `;
    container.appendChild(div);
  });
};

const getDetailId = (id) => {
  fetch(`https://fakestoreapi.com/products/${id}`)
    .then((res) => res.json())
    .then((data) => showSingleData(data));
};
const showSingleData = (data) => {
  const { id, category, image, price, title, rating, description } = data;

  const content = getElement("modal_content");
  const images = getElement("modal_image");

  content.innerText = "";
  images.innerText = "";

  content.innerHTML += `
       
      <div class="card-body">
      <h4 class="card-title py-2">${title}</h4>
      <p class="card-text text-black-50 fs-5">${description.slice(0, 150)}</p>
          <p class="card-text text-black-50 fs-5">${description.slice(151)}</p>
      <h4  class="card-text" >$ ${price} </h4>
      <h5  class="card-text" > ${category} </h5>

      <div class="mt-4 text-center">
        <div class="d-flex justify-content-around">
            <h5 > <i class="fas fa-eye"></i> ${rating.count}</h5>
            

            <div> ${rating.rate} 
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star-half-stroke"></i>
            </div>
        </div>
      <div>
   `;

  images.innerHTML += `
      <span style="top: 40px; right: 50px" class="badge text-bg-danger p-2 fs-6 position-absolute">product no: ${id}</span>
        

        <div class="mx-auto" style="width: 300px;">
        <img src="${image} " class="w-100  rounded-3 " style="height:300px; "/>
        </div>
        
      `;
};
