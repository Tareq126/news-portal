const categories = async () => {
    const url = 'https://openapi.programming-hero.com/api/news/categories'
    const res = await fetch(url);
    const data = await res.json();
    displayCategoryName(data.data.news_category);
}

const displayCategoryName = (categories) => {
    const allCategory = document.getElementById('all-categories');
    categories.forEach(category => {
        const allCategoryName = document.createElement('div')
        allCategoryName.innerHTML = `
        <button onclick="categoryId('${category.category_id}')">${category.category_name}</button>
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

const displayCategoryInfo = (infos) => {
    console.log(infos);
    const categoryNews = document.getElementById('category-news');
    categoryNews.textContent = ``;
    for (const info of infos) {
        console.log(info);
        const infoDiv = document.createElement('div');
        infoDiv.innerHTML = `
        <div class="card mb-3" style="max-width: 840px;">
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src="${info.thumbnail_url}" class="img-fluid rounded-start" alt="...">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${info.title}</h5>
                            <p class="card-text">Details: ${info.details} </p>
                        </div>
                    </div>
                </div>
            </div>
        
        `;
        categoryNews.appendChild(infoDiv);
    }
}
categoryId();


categories();