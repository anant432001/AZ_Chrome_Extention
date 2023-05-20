const problemListKey = 'algozenith_problems';
newBookmark = window.location.href;

// Creating a Save Button
const saveButton = document.createElement("img");
saveButton.src = chrome.runtime.getURL("assets/save.png");
saveButton.className = "btn_ref";
saveButton.title = "Problem already added to ToDo List";
saveButton.style.height = "40px";
saveButton.style.width = "40px";
saveButton.style.paddingTop = "10px";
saveButton.style.paddingRight = "10px";
// export {saveButton};
// 
// Creating a BookMark Button
const bookMarkButton = document.createElement("img");
bookMarkButton.src = chrome.runtime.getURL("assets/bookmark.png");
bookMarkButton.className = "btn_ref";
bookMarkButton.title = "Click here to add problem to ToDo List";
bookMarkButton.style.height = "40px";
bookMarkButton.style.width = "40px";
bookMarkButton.style.paddingTop = "10px";
bookMarkButton.style.paddingRight = "10px";
// export {bookMarkButton};
// 

window.addEventListener("load", async () => {
    currentProblemBookmarks = await fetchBookmarks();
    let flag = true;
    for (let i = 0; i < currentProblemBookmarks.length; i++) {
        if(newBookmark == currentProblemBookmarks[i].url)
            flag = false;
    }
    if(flag){
        addBookMarkButton();
    }
    else{
        addSaveButton();
    }
});

function addSaveButton(){
    parentElement = document.getElementsByClassName("list-inline text_white text-md-right")[0];
    parentElement.appendChild(saveButton);
};
// export {addSaveButton}; 

function addBookMarkButton(){
    parentElement = document.getElementsByClassName("list-inline text_white text-md-right")[0];
    parentElement.appendChild(bookMarkButton);
    bookMarkButton.addEventListener("click", addNewBookMarkEventHandler);
};
// export {addBookMarkButton}; 

const addNewBookMarkEventHandler = async () => {
    problemName = document.getElementsByClassName("col-8 my-auto")[0].childNodes[1].textContent;
    
    const newBookmarkObj = {
        url: newBookmark,
        desc: problemName
    };

    chrome.storage.sync.set({
        [problemListKey]: JSON.stringify([
            ...currentProblemBookmarks, 
            newBookmarkObj
        ])
    });

    document.getElementsByClassName("list-inline text_white text-md-right")[0].lastChild.remove();
    addSaveButton();
};
// export {addNewBookMarkEventHandler};

const fetchBookmarks = () => {
    return new Promise((resolve)=> {
        chrome.storage.sync.get([problemListKey], (obj) => {
            resolve(obj[problemListKey] ? JSON.parse(obj[problemListKey]) : []);
        });
    });
};
