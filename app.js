const input = document.querySelector(".todo-input")
const content = document.querySelector(".todo-content")
const adder = document.getElementById("btn")

adder.addEventListener("click",function(){
    const display=input.value
    const new_content=`<div class="task">
                        ${display}
                        <div class="buttons">
                            <button class="open">+</button>
                        </div>
                    </div>`
    const prev_content=content.innerHTML
    const inner_html = prev_content + new_content
    content.innerHTML=inner_html
    input.value=``
})