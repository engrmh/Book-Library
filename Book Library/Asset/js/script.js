let $ = document
const getTitle = $.getElementById('bookName')
const getAuthor = $.getElementById('bookAuthor')
const getYear = $.getElementById('bookYear')
const subjects = $.getElementById('subjects')
const getSubject = $.querySelectorAll('.subOption')
const addItemBtn = $.getElementById('addBook')
const searchBtn = $.getElementById('searchBook')
const bodyOfList = $.getElementById('book-list')
const modal = $.querySelector('.modal')
const dateBox = $.querySelector('.dateBox')
const closeDateBox = $.querySelector('.closeDateBox')
const searchResult = $.querySelector('.resultNumber')
const searchByName = $.getElementById('byName')
let subjectSelected = null

subjects.addEventListener('change', function (sub){
    getSubject.forEach(function (opt){
        if (opt.value === sub.target.value){
            subjectSelected = opt.innerHTML
        }
    })
})

addItemBtn.addEventListener('click' , AddNewBook)
// $.body.addEventListener('keydown', function (event){
//     if (event.keyCode === 13){
//         AddNewBook()
//     }
// })
let bookListArray = []
function AddNewBook() {
    if (getTitle.value === ''){
        modal.style.display = "block"
        modal.innerHTML = "فیلد عنوان کتاب را پر کنید!"
        modalRemover()
    }else if(getAuthor.value === ''){
        modal.style.display = "block"
        modal.innerHTML = "فیلد نام نویسنده را پر کنید!"
        modalRemover()
    }else if(getYear.value === ''){
        modal.style.display = "block"
        modal.innerHTML = 'فیلد سال را پر کنید!'
        modalRemover()
    }else {
        let newBookObj = {
            id: (bookListArray.length + 1)+1000,
            title: getTitle.value,
            author: getAuthor.value,
            year: getYear.value,
            subject: subjectSelected
        }
        makeEmptyValue()
        bookListArray.push(newBookObj)
        setLocalStorage(bookListArray)
        listGenerator(bookListArray)
        
        getTitle.focus()
    }
}
function makeEmptyValue(){
    getTitle.value = ''
    getAuthor.value = ''
    getYear.value = ''
}
function setLocalStorage(bookList){
    localStorage.setItem('books' , JSON.stringify(bookList))
}
function listGenerator(bookList){
    let bookBox ,bookRow ,  bookTitle , bookAuthor , bookYear , bookSubject , bookOperations , bookDel , bookLoan , bookLoanDate
    bodyOfList.innerHTML = ''
    bookList.forEach(function (book){
        bookRow = $.createElement('th')
        bookRow.innerHTML = book.id

        bookTitle = $.createElement('th')
        bookTitle.innerHTML = book.title

        bookAuthor = $.createElement('th')
        bookAuthor.innerHTML = book.author

        bookYear = $.createElement('th')
        bookYear.innerHTML = book.year

        bookSubject = $.createElement('th')
        bookSubject.innerHTML = book.subject

        bookOperations = $.createElement('th')
        bookSubject.classList.add('bookOperations')

        bookLoan = $.createElement('button')
        bookLoan.setAttribute('type' , 'submit')
        bookLoan.classList.add('bookLoan')
        bookLoan.innerHTML = "امانت"

        bookLoanDate = $.createElement('button')
        bookLoanDate.setAttribute('type' , 'submit')
        bookLoanDate.classList.add('bookLoanDate')
        bookLoanDate.innerHTML = "تاریخ"
        bookLoanDate.setAttribute('onclick', 'showDate()')

        bookDel = $.createElement('button')
        bookDel.setAttribute('type' , 'submit')
        bookDel.classList.add('bookDel')
        bookDel.innerHTML = "حذف"
        bookDel.setAttribute('onclick', 'delBook(' + book.id + ')')

        bookOperations.append(bookLoan , bookLoanDate , bookDel)

        bookBox = $.createElement('tr')
        bookBox.append(bookRow ,bookTitle , bookAuthor , bookYear , bookSubject , bookOperations)
        bodyOfList.append(bookBox)

        //search Book
        searchBtn.onclick = SearchBook

    })
}
function getLocalStorage(){
    let localStorageBooks = JSON.parse(localStorage.getItem('books'))
    if (localStorageBooks){
        bookListArray = localStorageBooks
    }else{
        bookListArray = []
    }
    listGenerator(bookListArray)
}
window.addEventListener('load' ,getLocalStorage)

// function loanOperation(){
//
// }
function showDate(){
    dateBox.style.top = '2rem'
}
function delBook(bookId) {
    let localStorageBooks = JSON.parse(localStorage.getItem('books'))
    bookListArray = localStorageBooks
    let mainBookIndex = bookListArray.findIndex(function (book) {
        return book.id === bookId
    })
    bookListArray.splice(mainBookIndex, 1)
    setLocalStorage(bookListArray)
    listGenerator(bookListArray)
}

function modalRemover(){
    setTimeout(function () {
        modal.style.display = 'none'
    },3000)
}
closeDateBox.onclick = anyFun

function anyFun(){
    dateBox.style.top = '-100rem'
}

function SearchBook(book){
    let bookRow
    let result = bookListArray.find(function (book){
        if (book.title === searchByName.value){
             bookRow = book.id
            return true
        }
    })
    console.log(result)
    if (!result){
        modal.style.display = "block"
        modal.style.backgroundColor = "#e60000"
        modal.innerHTML = 'کتاب موجود نیست!'
        modalRemover()
    }else{
        searchResult.innerHTML = result.id
        searchByName.value = ''
        searchByName.focus()
        modal.style.display = "block"
        modal.style.backgroundColor = "#009900"
        modal.innerHTML = 'کتاب یافت شد.'
        modalRemover()
    }
}