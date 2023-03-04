fetch("https://fakestoreapi.com/products/")
  .then((res) => res.json())
  .then((data) => displayCardData(data));

const getElement = (id) => {
  return document.getElementById(id);
};
//   card data show
const displayCardData = (data) => {
  console.log(data);
  const container = getElement("mainSection");
  data.forEach((element) => {
    const { category, description, id, image, price, rating, title } = element;
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML += `
    <div class="card mt-5">
          <img src="${image}" class="card-img-top img-fluid " style="height:400px" />
          <div class="card-body">
            <h5 class="card-title">${title}</h5>
            <p class="card-text">${description} </p>
            <h6  class="card-text" >$ ${price} </h6>

            <button onclick="getDetailId(${id})"
              type="button"
              class="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
            >
              See Details
            </button>

        </div>
    </div>
    `;
    container.appendChild(div);
  });
};
