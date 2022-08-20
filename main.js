let inputField=document.querySelector('.add-task input[type="text"]');
let submitTask=document.querySelector('.add-task input[type="radio"]');
let tasks=document.querySelector('.tasks');
let footer=document.querySelector('.footer');
let reOrder=document.querySelector('.re-order');
let itemsLeft=document.querySelector('.items-left .number');
let allTasks=document.querySelector('.all');
let activeTasks=document.querySelector('.activeTasks');
let completedTasks=document.querySelector('.completed');
let clearCompletedTasks=document.querySelector('.clear-completed');
let togglerImg=document.querySelector('.toggler img');
let deskBg=document.querySelector('#desk-bg');
let mobBg=document.querySelector('#mob-bg');
let container=document.querySelector('.container');


let labels=[];
let radios=[];
let arrOfTasks=[];
let spans=[];
let tasksNumber=0;
let id=0;
let mood='dark';

if(localStorage.oldTasks){
    arrOfTasks=JSON.parse(localStorage.oldTasks);
    arrOfTasks.forEach(task=>{
        task.id=id;
        window.localStorage.setItem('oldTasks',JSON.stringify(arrOfTasks));
        addTask(task.text, task.done);
    })
}

submitTask.onchange=()=>{
    if(inputField.value!==''){
        addTask(inputField.value);
        addToLocalStorage(inputField.value);
        inputField.value='';
    }else{
        submitTask.checked=false;
    }
}

inputField.onfocus=()=>{
    submitTask.checked=false;
}

function addTask(taskValue,  state){
    let taskText=document.createTextNode(taskValue);

    let task=document.createElement('div');
    tasksNumber++;
    task.className=`task-${id}`;

    let radio=document.createElement('input');
    radio.type='radio';
    radio.value=taskValue;
    radio.id=id;
    radios.push(radio);

    let label=document.createElement('label');
    label.appendChild(taskText);
    label.htmlFor=id;

    if(state){
        label.classList.add('done');
        task.classList.add('completed');
        tasksNumber--;
    }

    labels.push(label);

    let del=document.createElement('span');

    del.onclick=()=>{
        let deletedId=del.parentElement.getAttribute('task-id');
        del.parentElement.remove();
        arrOfTasks=arrOfTasks.filter(el=>deletedId!=el.id);
        window.localStorage.setItem('oldTasks',JSON.stringify(arrOfTasks));
        
        if(labels[deletedId].className!=='done'){
            tasksNumber-=1;
            itemsLeft.innerHTML=tasksNumber;
        }
        
        if(tasksNumber===0){
            footer.style.display='none';
            reOrder.style.display='none';
    
        }
    }

    task.appendChild(radio);
    task.appendChild(label);
    task.appendChild(del);
    task.setAttribute('task-id',id);
    tasks.appendChild(task);
    
    id++;

    itemsLeft.innerHTML=tasksNumber;
    footer.style.display='flex';
    reOrder.style.display='block';

    radios.forEach((radio,index)=>{

        radio.onchange=()=>{
            if(labels[index].classList.contains('done')){
                radio.checked=false;
            }else{

                labels[index].classList.add('done');
                document.querySelector(`.tasks .task-${radio.id}`).classList.add('completed');
                tasksNumber-=1;
                itemsLeft.innerHTML=tasksNumber;
                arrOfTasks[index].done=true;
                window.localStorage.setItem('oldTasks',JSON.stringify(arrOfTasks))
            }
        }
    })    
}



allTasks.onclick=()=>{
    document.querySelectorAll('.tasks div').forEach(task=>{
        task.classList.remove('hide');
    })
    
    allTasks.classList.add('active');
    activeTasks.classList.remove('active');
    completedTasks.classList.remove('active');
    inputField.disabled=false;
}

activeTasks.onclick=()=>{
    document.querySelectorAll('.tasks div').forEach(task=>{
        task.classList.contains('completed') ? task.classList.add('hide') : task.classList.remove('hide');
    })

    allTasks.classList.remove('active');
    activeTasks.classList.add('active');
    completedTasks.classList.remove('active');
    inputField.disabled=true;
}

completedTasks.onclick=()=>{
    document.querySelectorAll('.tasks div').forEach(task=>{
        task.classList.contains('completed') ? task.classList.remove('hide') : task.classList.add('hide');     
    })

    allTasks.classList.remove('active');
    activeTasks.classList.remove('active');
    completedTasks.classList.add('active');
    inputField.disabled=true;
}

clearCompletedTasks.onclick=()=>{
    let completed=document.querySelectorAll('.tasks .completed');
    completed.forEach(task=>{
        task.remove();
        arrOfTasks=arrOfTasks.filter(el=>task.getAttribute('task-id')!=el.id);
        window.localStorage.setItem('oldTasks',JSON.stringify(arrOfTasks));
    })

    if(tasksNumber===0){
        footer.style.display='none';
        reOrder.style.display='none';

    }
}

function addToLocalStorage(taskText){
    let data={
        text:taskText,
        id: id-1,
        done:false
    }
    arrOfTasks.push(data);
    window.localStorage.setItem('oldTasks',JSON.stringify(arrOfTasks));
}

togglerImg.onclick=()=>{
    changeMood();
}

let changeMood=()=>{
    if(mood==='dark'){
        togglerImg.src='images/icon-sun.svg';
        deskBg.src='images/bg-desktop-dark.jpg';
        mobBg.src='images/bg-mobile-dark.jpg';
        container.classList.add('dark-mood');
        mood='light';
    }else{
        togglerImg.src='images/icon-moon.svg';
        deskBg.src='images/bg-desktop-light.jpg';
        mobBg.src='images/bg-mobile-light.jpg';
        container.classList.remove('dark-mood');
        mood='dark';
    }
}






