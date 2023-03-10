//Load Category Name
const categories = async () => {
    const url = 'https://openapi.programming-hero.com/api/news/categories'
    try {
        const res = await fetch(url);
        const data = await res.json();
        displayCategoryName(data.data.news_category);
    } catch (error) {
        console.log(error);
    }
}

//Display Category Name
const displayCategoryName = categories => {
    const allCategory = document.getElementById('all-categories');
    categories.forEach(category => {
        const allCategoryName = document.createElement('div')
        allCategoryName.innerHTML = `
        <button class="border-0 bg-white" onclick="categoryId('${category.category_id}')">${category.category_name}</button>
        `;
        allCategory.appendChild(allCategoryName);
    });
}

//Toggle Spinner
const toggleSpinner = isLoading => {
    const loadingSection = document.getElementById('spinner');
    if (isLoading) {
        loadingSection.classList.remove('d-none');
    }
    else {
        loadingSection.classList.add('d-none');
    }
}

//Category ID
const categoryId = async category_id => {
    // start spinner
    toggleSpinner(true);
    const url = `https://openapi.programming-hero.com/api/news/category/${category_id} `;
    try {
        const res = await fetch(url);
        const data = await res.json();
        displayCategoryInfo(data.data);

    } catch (error) {
        console.log(error);
    }
}

//Display Category News
const displayCategoryInfo = infos => {
    const itemCount = document.getElementById('item-count');
    itemCount.innerHTML = `
    <h5>${infos.length} Items Found</h5>
    `
    const categoryNews = document.getElementById('category-news');
    categoryNews.textContent = ``;

    for (const info of infos) {
        const infoDiv = document.createElement('div');

        infoDiv.innerHTML = `
        <div class="card mb-3" style="max-width: 1400px;">
                <div class="row g-0 border border-dark border-1">
                    <div class="col-lg-3 col-md-6">
                        <img src="${info.thumbnail_url}" class="img-fluid" alt="...">
                    </div>
                    <div class="col-lg-9 col-md-6 pt-5">
                        <div class="card-body">
                            <h5 class="card-title">${info.title}</h5>
                            <p class="card-text cut-text">Details: ${info.details.slice(0, 500)}... </p>
                        </div>
                       <div class="text-center">
                       <button onclick="loadNewsDetails('${info._id}')" type="button" class="mb-1 px-5 py-2  rounded-2 bg-secondary border-3 border-bottom border-dark border-top-0 border-start-0 border-end-0" data-bs-toggle="modal" data-bs-target="#exampleModal">Details</button>
                       </div>
                    </div>
                </div>
            </div> 
        `;
        categoryNews.appendChild(infoDiv);

    }
    // stop spinner
    toggleSpinner(false);
}



// Load News Details In Modal
const loadNewsDetails = async news_id => {
    const url = `https://openapi.programming-hero.com/api/news/${news_id}`
    try {
        const res = await fetch(url);
        const data = await res.json();
        displayNewsDetails(data.data[0]);
    } catch (error) {
        console.log(error);
    }
}

// Display News Details In Modal
const displayNewsDetails = newsDetails => {
    console.log(newsDetails);
    const detailsNews = document.getElementById('news');
    detailsNews.textContent = ``;
    const news = document.createElement('div');
    news.innerHTML = `
    <img src="${newsDetails?.author.img}" class="img-fluid rounded-start" alt="...">
          <h5 class="mt-2">Writer: ${newsDetails?.author.name ? newsDetails?.author.name : "No Data Found"}</h5>
          <p>Published Date: ${newsDetails?.author.published_date} </p>
          <p>Views: ${newsDetails?.total_view ? newsDetails?.total_view : "No Data Found"} </p>
    `
    detailsNews.appendChild(news);
}

//Function Call
loadNewsDetails();

categoryId("08");

categories();

