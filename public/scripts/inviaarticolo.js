import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import {
    getFunctions,
    httpsCallable,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-functions.js";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAUfRw1DZiSBuNDDRO-SziodNP78JJZl7M",
    authDomain: "aiapie.firebaseapp.com",
    projectId: "aiapie",
    storageBucket: "aiapie.appspot.com",
    messagingSenderId: "1061532191936",
    appId: "1:1061532191936:web:78980d3ec10c961bef3125",
    measurementId: "G-L7DPMESSRF"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const functions = getFunctions();




const createArticleWrapper = document.getElementById("create-article-wrapper");
const articleOutput = document.getElementById("created-elements-wrapper");
const inputBlockPosition = document.getElementById("input-new-block-position");

// ref a input link affiliazione
const buttonInputLink = document.getElementById("block-button-link");
const bannerLinkInput = document.getElementById("block-banner-link");
const refInputImmaginiLinkClick = document.getElementById("block-images-link-click");


// init form
const initWrapper = document.getElementById("init-article-wrapper");
const affiliateLinkInput = document.getElementById("affiliate-link-input");
const pageSublinkInput = document.getElementById("page-sublink-input");
const pageTitleInput = document.getElementById("page-title-input");
const pageMetaInput = document.getElementById("page-meta-input");

const initForm = document.getElementById("init-form");

let standardAffiliateLink;
let pageSublink;
let pageTitle;
let pageMeta;

const handleInit = (event) => {
    event.preventDefault();
    initWrapper.classList.add("hidden");
    createArticleWrapper.classList.remove("hidden");
    standardAffiliateLink = affiliateLinkInput.value;
    pageSublink = pageSublinkInput.value;
    pageTitle = pageTitleInput.value;
    pageMeta = pageMetaInput.value;

    buttonInputLink.value = standardAffiliateLink;
    bannerLinkInput.value = standardAffiliateLink;
    refInputImmaginiLinkClick.value = standardAffiliateLink;
}
initForm.addEventListener("submit", handleInit);

let elementsCounter = 1;

const onDeleteFixNumbers = () => {
    elementsCounter--;
    inputBlockPosition.value = elementsCounter;
    let i = 0;
    while(articleOutput.children[i]){
        articleOutput.children[i].querySelector(".elementCounter").innerHTML = i+1;
        i++;
    }
}

// Menu scelta elemento
const tabsMenu = document.querySelector(".inviaArticoloInputTypeWrapper");

let currentActiveTab = "title-element";

const handleTabMenuClick = (e) => {
  const button = e.target;
  currentActiveTab = button.id;

  const activeTab = document.getElementById(button.id);

  if(!activeTab.classList.contains("active")){
    const children = tabsMenu.children;
    for(let i = 0; i < children.length; i++){
      children[i].classList.remove("active");
    }
    activeTab.classList.add("active");
    setElementInput(button.id);
  }
}

tabsMenu.addEventListener("click", handleTabMenuClick);

const setElementInput = (elementID) => {
    let elementInputsWrapper = document.querySelector(".inviaArticoloInputBlocks");
    const children = elementInputsWrapper.children;
    for(let i = 0; i < children.length; i++){
      children[i].classList.remove("active");
    }
    console.log("element id: ", elementID);
    console.log(`fabricated element id: ${elementID}-block`);
    document.getElementById(`${elementID}-block`).classList.add("active");
}




// Article Preview
const articlePreviewOpenBtn = document.getElementById("article-preview-btn");
const articlePreviewWrapper = document.getElementById("preview-wrapper");

const articlePreviewContent = document.getElementById("preview-content");

const articlePreviewCloseBtn = document.getElementById("close-preview-btn");
const articlePreviewSubmitBtn = document.getElementById("submit-preview-btn");

articlePreviewOpenBtn.addEventListener("click", () => {
    console.log("preview btn click");
    createArticleWrapper.classList.add("hidden");
    articlePreviewWrapper.classList.remove("hidden");
    // Add article blocks to preview
    let i = 0;
    while(articleOutput.children[i]){
        const articleElement = articleOutput.children[i].children[2].cloneNode(true);
        articlePreviewContent.append(articleElement);
        i++;
    }

});

articlePreviewCloseBtn.addEventListener("click", () => {
    articlePreviewWrapper.classList.add("hidden");
    createArticleWrapper.classList.remove("hidden");
    while(articlePreviewContent.firstChild){
        articlePreviewContent.removeChild(articlePreviewContent.lastChild);
    }
});

const warningModal = document.getElementById("warning-wrapper");
const warningForm = document.getElementById("warning-form");

articlePreviewSubmitBtn.addEventListener("click", () => {
    console.log("submit article click detectd");
    const articleHTML = articlePreviewContent.innerHTML;
    console.log("article HTML: ", articleHTML);

    // Warning modal on submit article
    warningModal.classList.remove("hidden");
    warningForm.classList.remove("hidden");
    articlePreviewWrapper.classList.add("hidden");

});
const finalPage = document.getElementById("final-page-wrapper");
// Warning modal on submit article
warningForm.addEventListener("submit", (event) => {
    warningForm.classList.add("hidden");
    warningModal.classList.add("hidden");
    finalPage.classList.remove("hidden");
    event.preventDefault();
    if (pageSublink.includes("aiapie.com")){
        pageSublink = pageSublink.slice(pageSublink.indexOf("com/")+4);
        console.log("edited sublink to: ", pageSublink);
    }
    const saveArticle = httpsCallable(functions, "saveArticle");
    saveArticle({
        subdomain: pageSublink,
        pageTitle: pageTitle,
        pageMeta: pageMeta,
        pageHTML: articlePreviewContent.innerHTML,
        }).then(() => {
            document.getElementById("final-page-text").innerHTML = "Perfetto, articolo inviato! Ricarica la pagina se vuoi trasmettere un altro articolo."
        }).catch((error) => {
            document.getElementById("final-page-text").innerHTML = "OPS, qualcosa è andato storto!";
            alert(String(`Copia il seguente codice e incollalo in un word nella cartella dell'articolo...${articlePreviewContent.innerHTML}`));
        });
});

const btnVediCodiceHTML = document.getElementById("btn-vedi-codice");
btnVediCodiceHTML.addEventListener("click", () => {
    alert(String(`Copia il seguente codice e incollalo in un word nella cartella dell'articolo:${articlePreviewContent.innerHTML}`));
});

const closeWarningBtn = document.querySelector(".warningBackBtn");
closeWarningBtn.addEventListener("click", () => {
    warningForm.classList.add("hidden");
    warningModal.classList.add("hidden");
    articlePreviewWrapper.classList.remove("hidden");
});

// Referenze a input titolo
const titleInput = document.getElementById("block-title-input");
const titleBtn = document.getElementById("block-title-btn");

titleBtn.addEventListener("click", () => {
    let titolo = titleInput.value;
    titleInput.value = "";

    let insertPosition = inputBlockPosition.value;

    const elementWrapper = document.createElement("div");
    elementWrapper.className = "elementWrapper";
    elementWrapper.id = `element-wrapper`;

    const elementNr = document.createElement("div");
    elementNr.className = "elementCounter";
    const elementNrTextnode = document.createTextNode(insertPosition);
    elementNr.appendChild(elementNrTextnode);

    const elementDeleteBtn = document.createElement("button");
    elementDeleteBtn.className = "deleteBtn";
    const elementDeleteBtnText = document.createTextNode("Elimina");
    elementDeleteBtn.appendChild(elementDeleteBtnText);
    elementDeleteBtn.addEventListener("click", () => {
        articleOutput.removeChild(elementWrapper);
        onDeleteFixNumbers();
    });

    // create post wrapper div
    const titleElement = document.createElement("h1");
    titleElement.className = "title";
    const titoloTextnode = document.createTextNode(titolo);
    titleElement.appendChild(titoloTextnode);

    elementWrapper.append(elementNr);
    elementWrapper.append(elementDeleteBtn);
    elementWrapper.append(titleElement);

    if(insertPosition == elementsCounter){
        articleOutput.append(elementWrapper);
    } else {
        insertPosition--;
        articleOutput.insertBefore(elementWrapper, articleOutput.children[insertPosition]);
        insertPosition++;
        while(articleOutput.children[insertPosition]){
            articleOutput.children[insertPosition].querySelector('.elementCounter').innerHTML = insertPosition +1;
            insertPosition++;
        }
    }
    
    elementsCounter ++;
    inputBlockPosition.value = elementsCounter;
});


// Referenze a input sottotitolo
const subtitleInput = document.getElementById("block-subtitle-input");
const subtitleBtn = document.getElementById("block-subtitle-btn");

subtitleBtn.addEventListener("click", () => {
    let sottotitolo = subtitleInput.value;
    subtitleInput.value = "";

    let insertPosition = inputBlockPosition.value;

    const elementWrapper = document.createElement("div");
    elementWrapper.className = "elementWrapper";
    elementWrapper.id = `element-wrapper`;

    const elementNr = document.createElement("div");
    elementNr.className = "elementCounter";
    const elementNrTextnode = document.createTextNode(insertPosition);
    elementNr.appendChild(elementNrTextnode);

    const elementDeleteBtn = document.createElement("button");
    elementDeleteBtn.className = "deleteBtn";
    const elementDeleteBtnText = document.createTextNode("Elimina");
    elementDeleteBtn.appendChild(elementDeleteBtnText);
    elementDeleteBtn.addEventListener("click", () => {
        articleOutput.removeChild(elementWrapper);
        console.log("delete click");
        onDeleteFixNumbers();
    });

    // create post wrapper div
    const titleElement = document.createElement("h2");
    titleElement.className = "subtitle";
    const titoloTextnode = document.createTextNode(sottotitolo);
    titleElement.appendChild(titoloTextnode);

    elementWrapper.append(elementNr);
    elementWrapper.append(elementDeleteBtn);
    elementWrapper.append(titleElement);

    if(insertPosition == elementsCounter){
        articleOutput.append(elementWrapper);
    } else {
        insertPosition--;
        articleOutput.insertBefore(elementWrapper, articleOutput.children[insertPosition]);
        insertPosition++;
        while(articleOutput.children[insertPosition]){
            articleOutput.children[insertPosition].querySelector('.elementCounter').innerHTML = insertPosition +1;
            insertPosition++;
        }
    }

    elementsCounter ++;
    inputBlockPosition.value = elementsCounter;
});


// Referenze a input sotto-sottotitolo
const subsubtitleInput = document.getElementById("block-subsubtitle-input");
const subsubtitleBtn = document.getElementById("block-subsubtitle-btn");

subsubtitleBtn.addEventListener("click", () => {
    let sottosottotitolo = subsubtitleInput.value;
    subsubtitleInput.value = "";

    let insertPosition = inputBlockPosition.value;

    const elementWrapper = document.createElement("div");
    elementWrapper.className = "elementWrapper";
    elementWrapper.id = `element-wrapper`;

    const elementNr = document.createElement("div");
    elementNr.className = "elementCounter";
    const elementNrTextnode = document.createTextNode(insertPosition);
    elementNr.appendChild(elementNrTextnode);

    const elementDeleteBtn = document.createElement("button");
    elementDeleteBtn.className = "deleteBtn";
    const elementDeleteBtnText = document.createTextNode("Elimina");
    elementDeleteBtn.appendChild(elementDeleteBtnText);
    elementDeleteBtn.addEventListener("click", () => {
        articleOutput.removeChild(elementWrapper);
        console.log("delete click");
        onDeleteFixNumbers();
    });

    // create post wrapper div
    const titleElement = document.createElement("h3");
    titleElement.className = "subsubtitle";
    const titoloTextnode = document.createTextNode(sottosottotitolo);
    titleElement.appendChild(titoloTextnode);

    elementWrapper.append(elementNr);
    elementWrapper.append(elementDeleteBtn);
    elementWrapper.append(titleElement);

    if(insertPosition == elementsCounter){
        articleOutput.append(elementWrapper);
    } else {
        insertPosition--;
        articleOutput.insertBefore(elementWrapper, articleOutput.children[insertPosition]);
        insertPosition++;
        while(articleOutput.children[insertPosition]){
            articleOutput.children[insertPosition].querySelector('.elementCounter').innerHTML = insertPosition +1;
            insertPosition++;
        }
    }

    elementsCounter ++;
    inputBlockPosition.value = elementsCounter;
});


// Referenze a input paragrafo
const paragraphInput = document.getElementById("block-paragraph-input");
const paragraphBtn = document.getElementById("block-paragraph-btn");

paragraphBtn.addEventListener("click", () => {
    let paragrafo = paragraphInput.value;
    paragraphInput.value = "";

    let insertPosition = inputBlockPosition.value;

    const elementWrapper = document.createElement("div");
    elementWrapper.className = "elementWrapper";
    elementWrapper.id = `element-wrapper`;

    const elementNr = document.createElement("div");
    elementNr.className = "elementCounter";
    const elementNrTextnode = document.createTextNode(insertPosition);
    elementNr.appendChild(elementNrTextnode);

    const elementDeleteBtn = document.createElement("button");
    elementDeleteBtn.className = "deleteBtn";
    const elementDeleteBtnText = document.createTextNode("Elimina");
    elementDeleteBtn.appendChild(elementDeleteBtnText);
    elementDeleteBtn.addEventListener("click", () => {
        articleOutput.removeChild(elementWrapper);
        onDeleteFixNumbers();
    });

    // create post wrapper div
    const titleElement = document.createElement("p");
    titleElement.className = "paragraph";
    const titoloTextnode = document.createTextNode(paragrafo);
    titleElement.appendChild(titoloTextnode);

    elementWrapper.append(elementNr);
    elementWrapper.append(elementDeleteBtn);
    elementWrapper.append(titleElement);

    if(insertPosition == elementsCounter){
        articleOutput.append(elementWrapper);
    } else {
        insertPosition--;
        articleOutput.insertBefore(elementWrapper, articleOutput.children[insertPosition]);
        insertPosition++;
        while(articleOutput.children[insertPosition]){
            articleOutput.children[insertPosition].querySelector('.elementCounter').innerHTML = insertPosition +1;
            insertPosition++;
        }
    }

    elementsCounter ++;
    inputBlockPosition.value = elementsCounter;
});


// Referenze a input immagini
const refInputImmaginiNome = document.getElementById("block-images-nome-img");

const addFonteBtn = document.getElementById("add-fonte-btn");
const refInputImmaginiLinkFonte = document.getElementById("block-images-link-fonte");
const refInputImmaginiNomeFonte = document.getElementById("block-images-nome-fonte");

const refInputImmaginiBtn = document.getElementById("block-images-btn");

refInputImmaginiBtn.addEventListener("click", () => {

    const elementWrapper = document.createElement("div");
    elementWrapper.className = "elementWrapper";
    elementWrapper.id = `element-wrapper`;

    let insertPosition = inputBlockPosition.value;

    const elementNr = document.createElement("div");
    elementNr.className = "elementCounter";
    const elementNrTextnode = document.createTextNode(insertPosition);
    elementNr.appendChild(elementNrTextnode);

    const elementDeleteBtn = document.createElement("button");
    elementDeleteBtn.className = "deleteBtn";
    const elementDeleteBtnText = document.createTextNode("Elimina");
    elementDeleteBtn.appendChild(elementDeleteBtnText);
    elementDeleteBtn.addEventListener("click", () => {
        articleOutput.removeChild(elementWrapper);
        onDeleteFixNumbers();
    });

    // create post wrapper div
    const titleElement = document.createElement("div");
    titleElement.className = "banner";


    const clickLink = document.createElement("a");
    if(refInputImmaginiLinkClick != ""){
        clickLink.href = refInputImmaginiLinkClick.value;
    }

    titleElement.append(clickLink);

    const immagine = document.createElement("img");
    immagine.src = `/images/${refInputImmaginiNome.value}`;
    immagine.alt = refInputImmaginiNome.value;

    refInputImmaginiNome.value = "";

    clickLink.append(immagine);

    elementWrapper.append(elementNr);
    elementWrapper.append(elementDeleteBtn);
    elementWrapper.append(titleElement);

    if(addFonteBtn.classList.contains("open")){
        const fonteWrapper = document.createElement("div");
        fonteWrapper.className = "fonte";

        elementWrapper.append(fonteWrapper);

        const fonteIntro = document.createElement("div");
        fonteIntro.className = "fonte-testo";
        fonteIntro.innerHTML = "Fonte:";

        fonteWrapper.append(fonteIntro);

        const linkFonte = document.createElement("a");
        linkFonte.href = refInputImmaginiLinkFonte.value;
        refInputImmaginiLinkFonte.value = "";

        fonteWrapper.append(linkFonte);

        const fonteNome = document.createElement("div");
        fonteNome.className = "fonte-testo";
        fonteNome.innerHTML = refInputImmaginiNomeFonte.value;
        refInputImmaginiNomeFonte.value = "";

        linkFonte.append(fonteNome);
    }

    if(insertPosition == elementsCounter){
        articleOutput.append(elementWrapper);
    } else {
        insertPosition--;
        articleOutput.insertBefore(elementWrapper, articleOutput.children[insertPosition]);
        insertPosition++;
        while(articleOutput.children[insertPosition]){
            articleOutput.children[insertPosition].querySelector('.elementCounter').innerHTML = insertPosition +1;
            insertPosition++;
        }
    }

    elementsCounter ++;
    inputBlockPosition.value = elementsCounter;
});

addFonteBtn.addEventListener("click", () => {
    console.log("fonte btn click");
    if(addFonteBtn.classList.contains("open")){
        refInputImmaginiLinkFonte.classList.add("hidden");
        refInputImmaginiNomeFonte.classList.add("hidden");
        addFonteBtn.classList.remove("open");
        addFonteBtn.innerHTML = "Aggiungi Fonte";
    } else {
        refInputImmaginiLinkFonte.classList.remove("hidden");
        refInputImmaginiNomeFonte.classList.remove("hidden");
        addFonteBtn.classList.add("open");
        addFonteBtn.innerHTML = "Togli Fonte";
    }
    
});

// Referenze a input Text + Img
const textImgTextInput = document.getElementById("block-text-img-text-input");
const textImgImgNameInput = document.getElementById("block-text-img-image-nome-img");

const textImgBtn = document.getElementById("block-text-img-btn");

textImgBtn.addEventListener("click", () => {
    let paragrafo = textImgTextInput.value;
    textImgTextInput.value = "";

    let insertPosition = inputBlockPosition.value;

    const elementWrapper = document.createElement("div");
    elementWrapper.className = "elementWrapper";
    elementWrapper.id = `element-wrapper`;

    const elementNr = document.createElement("div");
    elementNr.className = "elementCounter";
    const elementNrTextnode = document.createTextNode(insertPosition);
    elementNr.appendChild(elementNrTextnode);

    const elementDeleteBtn = document.createElement("button");
    elementDeleteBtn.className = "deleteBtn";
    const elementDeleteBtnText = document.createTextNode("Elimina");
    elementDeleteBtn.appendChild(elementDeleteBtnText);
    elementDeleteBtn.addEventListener("click", () => {
        articleOutput.removeChild(elementWrapper);
        onDeleteFixNumbers();
    });

    // create post wrapper div
    const textImgWrapper = document.createElement("div");
    textImgWrapper.className = "textAndImgWrapper";

    const text = document.createElement("div");
    text.className = "textAndImgWrapper";
    const textNode = document.createTextNode(paragrafo);
    text.appendChild(textNode);

    const img = document.createElement("img");
    img.className = "textAndImgWrapper";
    img.src = `/images/${textImgImgNameInput.value}`
    img.alt = textImgImgNameInput.value;
    textImgImgNameInput.value = "";

    textImgWrapper.append(text);
    textImgWrapper.append(img);

    elementWrapper.append(elementNr);
    elementWrapper.append(elementDeleteBtn);
    elementWrapper.append(textImgWrapper);

    if(insertPosition == elementsCounter){
        articleOutput.append(elementWrapper);
    } else {
        insertPosition--;
        articleOutput.insertBefore(elementWrapper, articleOutput.children[insertPosition]);
        insertPosition++;
        while(articleOutput.children[insertPosition]){
            articleOutput.children[insertPosition].querySelector('.elementCounter').innerHTML = insertPosition +1;
            insertPosition++;
        }
    }

    elementsCounter ++;
    inputBlockPosition.value = elementsCounter;
});



// Referenze a input Banner Jasper
const bannerOptionDropdown = document.getElementById("banners-dropdown");
const bannerBtn = document.getElementById("block-banner-btn");

bannerBtn.addEventListener("click", () => {
    // Leggere dropdown
    let bannerOption = bannerOptionDropdown.value;
    console.log("crea banner: ", bannerOption);

    let insertPosition = inputBlockPosition.value;

    const elementWrapper = document.createElement("div");
    elementWrapper.className = "elementWrapper";
    elementWrapper.id = `element-wrapper`;

    const elementNr = document.createElement("div");
    elementNr.className = "elementCounter";
    const elementNrTextnode = document.createTextNode(insertPosition);
    elementNr.appendChild(elementNrTextnode);

    const elementDeleteBtn = document.createElement("button");
    elementDeleteBtn.className = "deleteBtn";
    const elementDeleteBtnText = document.createTextNode("Elimina");
    elementDeleteBtn.appendChild(elementDeleteBtnText);
    elementDeleteBtn.addEventListener("click", () => {
        articleOutput.removeChild(elementWrapper);
        onDeleteFixNumbers();
    });

    // create banner element
    const bannerWrapper = document.createElement("div");
    bannerWrapper.className = "banner";


    const clickLink = document.createElement("a");
    if(bannerLinkInput.value != ""){
        clickLink.href = bannerLinkInput.value;
    }

    bannerWrapper.append(clickLink);

    const immagine = document.createElement("img");
    immagine.src = `/images/banner-ricorrenti/${bannerOption}.png`;
    immagine.alt = bannerOption;

    clickLink.append(immagine);

    elementWrapper.append(elementNr);
    elementWrapper.append(elementDeleteBtn);
    elementWrapper.append(bannerWrapper);

    if(insertPosition == elementsCounter){
        articleOutput.append(elementWrapper);
    } else {
        insertPosition--;
        articleOutput.insertBefore(elementWrapper, articleOutput.children[insertPosition]);
        insertPosition++;
        while(articleOutput.children[insertPosition]){
            articleOutput.children[insertPosition].querySelector('.elementCounter').innerHTML = insertPosition +1;
            insertPosition++;
        }
    }

    elementsCounter ++;
    inputBlockPosition.value = elementsCounter;
});


// Referenze a input bottone
const buttonInputText = document.getElementById("block-button-text");
const buttonAddBtn = document.getElementById("block-button-btn");

buttonAddBtn.addEventListener("click", () => {
    const buttonText = buttonInputText.value;
    const buttonLink = buttonInputLink.value;

    let insertPosition = inputBlockPosition.value;

    const elementWrapper = document.createElement("div");
    elementWrapper.className = "elementWrapper";
    elementWrapper.id = `element-wrapper`;

    const elementNr = document.createElement("div");
    elementNr.className = "elementCounter";
    const elementNrTextnode = document.createTextNode(insertPosition);
    elementNr.appendChild(elementNrTextnode);

    const elementDeleteBtn = document.createElement("button");
    elementDeleteBtn.className = "deleteBtn";
    const elementDeleteBtnText = document.createTextNode("Elimina");
    elementDeleteBtn.appendChild(elementDeleteBtnText);
    elementDeleteBtn.addEventListener("click", () => {
        articleOutput.removeChild(elementWrapper);
        onDeleteFixNumbers();
    });

    // create button
    const buttonWrapper = document.createElement("div");
    buttonWrapper.className = "cta-btn";

    const button = document.createElement("button");
    const buttonTextNode = document.createTextNode(buttonText);
    button.appendChild(buttonTextNode);
    button.addEventListener("click", () => {
        window.open(buttonLink, "_blank");
    });

    buttonWrapper.append(button);

    elementWrapper.append(elementNr);
    elementWrapper.append(elementDeleteBtn);
    elementWrapper.append(buttonWrapper);

    if(insertPosition == elementsCounter){
        articleOutput.append(elementWrapper);
    } else {
        insertPosition--;
        articleOutput.insertBefore(elementWrapper, articleOutput.children[insertPosition]);
        insertPosition++;
        while(articleOutput.children[insertPosition]){
            articleOutput.children[insertPosition].querySelector('.elementCounter').innerHTML = insertPosition +1;
            insertPosition++;
        }
    }

    elementsCounter ++;
    inputBlockPosition.value = elementsCounter;
});


// Referenze a input Index
const indexInputQuantity = document.getElementById("block-index-quantity");
const indexCreateInputBtn = document.getElementById("button-create-index-input");
const indexPointsInputWrapper = document.getElementById("index-points-inputs-wrapper");

const buttonAddIndex = document.getElementById("block-index-btn");

// btn continue click -> create input fields
indexCreateInputBtn.addEventListener("click", () => {
    if(indexInputQuantity.value > 0){
        while(indexPointsInputWrapper.firstChild){
            indexPointsInputWrapper.removeChild(indexPointsInputWrapper.lastChild);
        }
        buttonAddIndex.classList.remove("hidden");
        const indexQuantity = indexInputQuantity.value;
        for(let i = 0; i < indexQuantity; i++){
            const indexInput = document.createElement("input");
            indexInput.className = "indexInput";
            indexInput.id = `index-input-${i}`;
            indexInput.type = "text";
            indexInput.placeholder = "punto indice";
            indexPointsInputWrapper.append(indexInput);
        }
    }
});

// btn click submit -> read fields + create index
buttonAddIndex.addEventListener("click", () => {
    buttonAddIndex.classList.add("hidden");
    let indexArray = [];

    while(indexPointsInputWrapper.firstChild){
        indexArray.push(indexPointsInputWrapper.lastChild.value);
        indexPointsInputWrapper.removeChild(indexPointsInputWrapper.lastChild);
    }
    console.log(indexArray);

    let insertPosition = inputBlockPosition.value;

    const elementWrapper = document.createElement("div");
    elementWrapper.className = "elementWrapper";
    elementWrapper.id = `element-wrapper`;

    const elementNr = document.createElement("div");
    elementNr.className = "elementCounter";
    const elementNrTextnode = document.createTextNode(insertPosition);
    elementNr.appendChild(elementNrTextnode);

    const elementDeleteBtn = document.createElement("button");
    elementDeleteBtn.className = "deleteBtn";
    const elementDeleteBtnText = document.createTextNode("Elimina");
    elementDeleteBtn.appendChild(elementDeleteBtnText);
    elementDeleteBtn.addEventListener("click", () => {
        articleOutput.removeChild(elementWrapper);
        onDeleteFixNumbers();
    });

    // create index 
    const indexWrapper = document.createElement("div");
    indexWrapper.className = "indexWrapper";

    const titleElement = document.createElement("h2");
    titleElement.className = "subtitle";
    const titoloTextnode = document.createTextNode("Indice");
    titleElement.appendChild(titoloTextnode);

    indexWrapper.append(titleElement);

    const indexPointsWrapper = document.createElement("div");
    indexPointsWrapper.className = "index-points";

    indexWrapper.append(indexPointsWrapper);

    for(let i = indexArray.length -1; i >= 0; i--){
        const indexPointWrapper = document.createElement("div");
        indexPointWrapper.className = "index-point";

        const indexPointArrow = document.createElement("img");
        indexPointArrow.className = "index-point-img";
        indexPointArrow.src = "/icons/right-arrow.ico";

        indexPointWrapper.append(indexPointArrow);

        const indexPointLink = document.createElement("a");
        indexPointLink.href = `#section${i+1}`;

        indexPointWrapper.append(indexPointLink);

        const indexPointText = document.createElement("div");
        indexPointText.className = "index-point-text";
        const indexPointTextNode = document.createTextNode(indexArray[i]);
        indexPointText.appendChild(indexPointTextNode);

        indexPointLink.append(indexPointText);

        indexPointsWrapper.append(indexPointWrapper);
    }

    elementWrapper.append(elementNr);
    elementWrapper.append(elementDeleteBtn);
    elementWrapper.append(indexWrapper);

    if(insertPosition == elementsCounter){
        articleOutput.append(elementWrapper);
    } else {
        insertPosition--;
        articleOutput.insertBefore(elementWrapper, articleOutput.children[insertPosition]);
        insertPosition++;
        while(articleOutput.children[insertPosition]){
            articleOutput.children[insertPosition].querySelector('.elementCounter').innerHTML = insertPosition +1;
            insertPosition++;
        }
    }

    elementsCounter ++;
    inputBlockPosition.value = elementsCounter;
});


// Referenze a input bulletpoints
const bulletpointsInputQuantity = document.getElementById("block-bullentpoints-quantity");
const bulletpointsCreateInputBtn = document.getElementById("button-create-bullentpoints-input");
const bulletpointsPointsInputWrapper = document.getElementById("bullentpoints-inputs-wrapper");

const buttonAddbullentpoints = document.getElementById("block-bulletpoints-btn");

// btn continue click -> create input fields
bulletpointsCreateInputBtn.addEventListener("click", () => {
    if(bulletpointsInputQuantity.value > 0){
        while(bulletpointsPointsInputWrapper.firstChild){
            bulletpointsPointsInputWrapper.removeChild(bulletpointsPointsInputWrapper.lastChild);
        }
        buttonAddbullentpoints.classList.remove("hidden");
        const bulletpointsQuantity = bulletpointsInputQuantity.value;
        for(let i = 0; i < bulletpointsQuantity; i++){
            const bulletpointInput = document.createElement("input");
            bulletpointInput.className = "bulletpointInput";
            bulletpointInput.id = `bulletpoint-input-${i}`;
            bulletpointInput.type = "text";
            bulletpointInput.placeholder = "punto dell'elenco puntato...";
            bulletpointsPointsInputWrapper.append(bulletpointInput);
        }
    }
});

// btn click submit -> read fields + create index
buttonAddbullentpoints.addEventListener("click", () => {
    buttonAddbullentpoints.classList.add("hidden");
    let bulletpointsArray = [];

    while(bulletpointsPointsInputWrapper.firstChild){
        bulletpointsArray.push(bulletpointsPointsInputWrapper.lastChild.value);
        bulletpointsPointsInputWrapper.removeChild(bulletpointsPointsInputWrapper.lastChild);
    }

    let insertPosition = inputBlockPosition.value;

    const elementWrapper = document.createElement("div");
    elementWrapper.className = "elementWrapper";
    elementWrapper.id = `element-wrapper`;

    const elementNr = document.createElement("div");
    elementNr.className = "elementCounter";
    const elementNrTextnode = document.createTextNode(insertPosition);
    elementNr.appendChild(elementNrTextnode);

    const elementDeleteBtn = document.createElement("button");
    elementDeleteBtn.className = "deleteBtn";
    const elementDeleteBtnText = document.createTextNode("Elimina");
    elementDeleteBtn.appendChild(elementDeleteBtnText);
    elementDeleteBtn.addEventListener("click", () => {
        articleOutput.removeChild(elementWrapper);
        onDeleteFixNumbers();
    });

    // create bulletpoints 
    const bulletpointsWrapper = document.createElement("div");
    bulletpointsWrapper.className = "bulletpointsWrapper";

    const bulletpoints = document.createElement("ol");
    bulletpoints.className = "dot-bullet-points";

    bulletpointsWrapper.append(bulletpoints);

    for(let i = bulletpointsArray.length -1; i >= 0; i--){
        const bulletpointWrapper = document.createElement("li");

        const bulletpointTextNode = document.createTextNode(bulletpointsArray[i]);
        bulletpointWrapper.appendChild(bulletpointTextNode);

        bulletpoints.append(bulletpointWrapper);
    }

    elementWrapper.append(elementNr);
    elementWrapper.append(elementDeleteBtn);
    elementWrapper.append(bulletpointsWrapper);

    if(insertPosition == elementsCounter){
        articleOutput.append(elementWrapper);
    } else {
        insertPosition--;
        articleOutput.insertBefore(elementWrapper, articleOutput.children[insertPosition]);
        insertPosition++;
        while(articleOutput.children[insertPosition]){
            articleOutput.children[insertPosition].querySelector('.elementCounter').innerHTML = insertPosition +1;
            insertPosition++;
        }
    }

    elementsCounter ++;
    inputBlockPosition.value = elementsCounter;
});

