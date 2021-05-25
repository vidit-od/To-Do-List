// [{"title":"1","description":"1","target":""},{"title":"2","description":"2","target":""},{"title":"3","description":"3","target":""},{"title":"4","description":"4","target":""},{"title":"5","description":"5","target":""}]
let list=[{
}];
let item={
    title:null,
    description:null,
    target:null,
}
const page_main=document.querySelector(".todo")
const page_second=document.querySelector(".todo-desc")
const input_main = document.querySelector(".todo-input")
const input_second = document.querySelector(".description")
const target=document.querySelector(".target")
const content = document.querySelector(".todo-content")
const adder = document.getElementById("btn")
const warning =document.querySelector(".warning")
const title = document.getElementById("title")
const submit=document.getElementById("submit")

const complete=content.querySelectorAll(".comp")
let complet_btn_list =[]
let expand_btn_list =[]
let delete_btn_list =[]


window.addEventListener("DOMContentLoaded",function(){
    page_second.classList.add("no")
    page_main.classList.add("yes")
    
    let list=JSON.parse(localStorage.getItem("list"))
    if(list!=null){
        for(let i=0; i<list.length;i++){    
            const new_content=`<div class="parent-task">
                                    <div class="task">
                                        <p>${list[i].title}</p>
                                        <div class="buttons">
                                            <button class="expand"><i class="fas fa-angle-double-down"></i></button>
                                            <button class="comp"><i class="fas fa-check"></i></button>
                                            <button class="delete"><i class="fas fa-trash-alt"></i></button>
                                        </div>
                                    </div>
                                    <div class ="extra">
                                        <div class="content-header">
                                            <p>Description</p>
                                            <div class="line_vertical_top"></div>
                                            <h2>Target Date :</h2>
                                        </div>
                                        <div class="line"></div>
                                        <div class="content">
                                            <p>${list[i].description}</p>
                                            <div class="line_vertical"></div>
                                            <h2>${list[i].target}</h2>
                                        </div>
                                    </div>
                                </div>`
            const prev_content=content.innerHTML;
            const inner_html = prev_content + new_content;
            content.innerHTML=inner_html;
        }
        list_update();
        buttons_function();
    }
})

adder.addEventListener("click",function(){
    const display=input_main.value
    if(display==""){
        warning.classList.add("warned")
        adder.classList.add("freez")
        warning.addEventListener("animationend",function(){
            warning.classList.remove("warned")
            adder.classList.remove("freez")
        })
    }
    else{
        input_main.value=``;

        page_main.classList.remove("yes");
        page_main.classList.add("no") ;
        page_main.addEventListener("transitionend",function(){
            page_second.classList.remove("no")
            page_second.classList.add("yes");
        })
        title.textContent=display;
    }
})

submit.addEventListener("click",function(){
    item.title=title.textContent;
    item.description=input_second.value;
    item.target=target.value;
    input_second.value="";
    target.value="";

    if(localStorage.getItem("list")===null){
        list=[]
    }
    else{
        list=JSON.parse(localStorage.getItem("list"))
    }
    list.push(item);
    localStorage.setItem("list", JSON.stringify(list));

    page_second.classList.remove("yes")
    page_second.classList.add("no")
    page_main.classList.remove("no")
    page_main.classList.add("yes")
    const empty=``
    content.innerHTML=empty;
    for(let i=0; i<list.length;i++){    
        const new_content=`<div class="task">
                                <p>${list[i].title}</p>
                                <div class="buttons">
                                    <button class="expand"><i class="fas fa-angle-double-down"></i></button>
                                    <button class="comp"><i class="fas fa-check"></i></button>
                                    <button class="delete"><i class="fas fa-trash-alt"></i></button>
                                </div>
                            </div>`
        const prev_content=content.innerHTML;
        const inner_html = prev_content + new_content;
        content.innerHTML=inner_html;
    }
    title.textContent="TO-Do List";
    const length=content.querySelectorAll(".task").length
    console.log(length)
    list_update()
    buttons_function()
})

window.addEventListener("transitionend",function(){
    if(page_second.classList.contains("yes") == true){
        if(page_main.classList.contains("yes")==true){
            page_second.classList.add("no")
            page_second.classList.remove("yes")
        }
    }
})
function buttons_function(){
    complet_btn_function();
    expand_btn_function();
    delete_btn_function();
}
function list_update(){
    const length=content.querySelectorAll(".task").length
    complet_btn_list=[]
    expand_btn_list=[]
    delete_btn_list=[]
    for(i=0;i<length;i++){
        complet_btn_list.push(content.querySelectorAll(".task")[i].querySelector(`.comp`))
    }
    for(i=0;i<length;i++){
        expand_btn_list.push(content.querySelectorAll(".task")[i].querySelector(`.expand`))
    }
    for(i=0;i<length;i++){
        delete_btn_list.push(content.querySelectorAll(".task")[i].querySelector(`.delete`))
    }
    console.log(complet_btn_list)
    console.log(expand_btn_list)
    console.log(delete_btn_list)
}
function delete_btn_function(){
    delete_btn_list.forEach(function(delete_btn){
        delete_btn.addEventListener("click",function(){
            list = JSON.parse(localStorage.getItem("list"));
            let list_dup=[];
            let to_delete=delete_btn.parentElement.parentElement.children[0].textContent
            list.forEach(function(value){
                console.log(to_delete,value.title)
                if(to_delete!=value.title){
                    list_dup.push(value)
                }
            })
            list=list_dup
            localStorage.removeItem("list")
            if(list.length!=0){
                localStorage.setItem("list", JSON.stringify(list));
            }
            delete_btn.parentElement.parentElement.style.animation="deleted 2s ease"
            delete_btn.parentElement.parentElement.addEventListener("animationend",function(){
                delete_btn.parentElement.parentElement.style.display="none"
            })
        })
    })
}

function expand_btn_function(){
    expand_btn_list.forEach(function(expand_btn){
        expand_btn.addEventListener("click",function(){
            expand_btn.parentElement.parentElement.parentElement.children[1].classList.toggle("show-text")
            expand_btn.classList.toggle("rotate_button")
            expand_btn_list.forEach(function(expa){
                if (expa.parentElement.parentElement.parentElement.children[1].classList.contains("show-text") && expa!=expand_btn){
                    expa.parentElement.parentElement.parentElement.children[1].classList.toggle("show-text")
                }
            })
        })
    })
}

function complet_btn_function(){
    complet_btn_list.forEach(function(complet_btn){
        complet_btn.addEventListener("click",function(){
            complet_btn.parentElement.parentElement.children[0].classList.toggle("complete-task")
            complet_btn.parentElement.children[0].classList.toggle("button_lock")
            complet_btn.parentElement.children[2].classList.toggle("button_lock")
            complet_btn.parentElement.children[1].classList.toggle("button_never_lock")
            if(complet_btn.parentElement.children[1].classList.contains("button_never_lock")){
                complet_btn.innerHTML=`<i class="fas fa-unlock"></i>`
            }
            else{
                complet_btn.innerHTML=`<i class="fas fa-check"></i>`
            }
        })
    })
}