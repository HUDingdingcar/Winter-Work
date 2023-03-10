let my_course_id = new URL(location.href).searchParams.get("id")

const select = (s) => document.querySelector(s)
let class_head = select('.class_head')
let cover=document.querySelector('.class_head').querySelector('img')
let title = select('h1')
let abstract = class_head.querySelector('span')
let buy1 = class_head.querySelectorAll('button')[0]
let trial = class_head.querySelectorAll('button')[1]


buy1.onclick =async function () {
    let obj={
        course_id:my_course_id
    }
    let res = await fetch('http://localhost:8080/purchase',{
        method:'post',
        headers:{
            'Content-type':'application/json'
        },
        body:JSON.stringify(obj)
    });
    let res2 = await res.json();
    if(res2.msg=='购买成功'){
        location.href='/web/winter-work/class/class-detail/class-detail.html?id='+my_course_id
    }
}


let class_introduce = select('.class_introduce')
let intro = class_introduce.querySelector('div').querySelectorAll('span')[0]
let catalogue = class_introduce.querySelector('div').querySelectorAll('span')[1]
let catalogue_content = select('.catelogue_content')


async function ask_for_class() {
    let obj = {
        course_id: my_course_id
    }
    let res = await fetch('http://localhost:8080/catelogue', {
        method: 'post',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(obj)
    });
    let res2 = await res.json();
    let result = res2.course
    cover.src = result.cover
    title.innerHTML = result.course_title
    abstract.innerHTML = result.abstract
    if (res2.purchaseornot == 0) {
        buy1.innerHTML = '去购买'
    } else {
        buy1.innerHTML = '已购买'
    }
    let result2 = res2.catelogues
    for (let i = 0; i < result2.length; i++) {
        let div = document.createElement('div')
        let h4 = document.createElement('h4')
        let h5 = document.createElement('h5')
        let button = document.createElement('button')
        catalogue_content.appendChild(div)
        div.appendChild(h4)
        div.appendChild(h5)
        div.appendChild(button)


        h4.innerHTML = result2[i].order
        h5.innerHTML = result2[i].catalogue_title
        if (result2[i].trialornot == 1) {
            button.innerHTML = '试学'
            button.style.backgroundColor = '#dee557'
           
        } else if (result2[i].trialornot == 0 && res2.purchaseornot == 0) {
            button.innerHTML = '未购买'
            button.style.backgroundColor = '#e58657'
           
        }
        else if (result2[i].trialornot == 0 && res2.purchaseornot == 1) {
            button.innerHTML = '已购买'
            button.style.backgroundColor = '#57c6e5'
        }

        button.id = result2[i].catalogue_id
        div.id = result2[i].catalogue_id
        h5.id = result2[i].catalogue_id

        div.onclick = function (e) {
            location.href = '/web/winter-work/class/class-content/class-content.html?id=' + e.target.id
        }
        button.onclick = function (e) {
            location.href = '/web/winter-work/class/class-content/class-content.html?id=' + e.target.id
        }


    }


}
ask_for_class()


intro.onclick = function () {
    location.href = '/web/winter-work/class/class-detail/class-detail.html?id='+my_course_id
}
