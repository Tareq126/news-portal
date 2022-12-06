const categories = async () => {
    const url = 'https://openapi.programming-hero.com/api/news/categories'
    const res = await fetch(url);
    const data = await res.json();
    displayCategoryName(data.data.news_category);
}

const displayCategoryName = categories => {
    const allCategory = document.getElementById('all-categories');
    categories.forEach(category => {
        const allCategoryName = document.createElement('div')
        allCategoryName.innerHTML = `
        <button class="border-0 bg-white" onclick="categoryId('${category.category_id}')">${category.category_name}</button>
        `;
        allCategory.appendChild(allCategoryName)

    });
}

const categoryId = async category_id => {
    const url = `https://openapi.programming-hero.com/api/news/category/${category_id} `;
    const res = await fetch(url);
    const data = await res.json();
    displayCategoryInfo(data.data);
}

const displayCategoryInfo = infos => {
    const categoryNews = document.getElementById('category-news');
    categoryNews.textContent = ``;
    for (const info of infos) {
        const infoDiv = document.createElement('div');
        infoDiv.innerHTML = `
        <div class="card mb-3" style="max-width: 840px;">
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src="${info.thumbnail_url}" class="img-fluid rounded-start" alt="...">
                    </div>
                    <div class="col-md-8 text-center">
                        <div class="card-body">
                            <h5 class="card-title">${info.title}</h5>
                            <p class="card-text">Details: ${info.details.slice(0, 400)} </p>
                        </div>
                        <button onclick="loadNewsDetails('${info._id}')" type="button" class="mb-2 px-5 rounded-3" data-bs-toggle="modal" data-bs-target="#exampleModal">Details</button>
                    </div>
                </div>
            </div>
        
        `;

        categoryNews.appendChild(infoDiv);
    }

}

const loadNewsDetails = async news_id => {
    const url = `https://openapi.programming-hero.com/api/news/${news_id}`
    const res = await fetch(url);
    const data = await res.json();
    displayNewsDetails(data.data[0]);
}

const displayNewsDetails = newsDetails => {
    console.log(newsDetails);
    const detailsNews = document.getElementById('detail-news');
    detailsNews.innerHTML = `
    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
          <img src="${newsDetails?.author.img}" class="img-fluid rounded-start" alt="...">
          <h5>Writer: ${newsDetails?.author.name}</h5>
          <p>Published Date: ${newsDetails?.author.published_date} </p>
          </div>
          <div class="modal-footer">
          <p>Views: ${newsDetails?.total_view} </p>
          </div>
        </div>
      </div>
    </div>
    
    `;

}

const allNews = 'https://openapi.programming-hero.com/api/news/category/08'

loadNewsDetails();

categoryId();


categories();

