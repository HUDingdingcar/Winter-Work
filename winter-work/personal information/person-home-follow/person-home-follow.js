let list=document.querySelector('.list')
let befoled=document.querySelector('.follow').querySelectorAll('span')[1]
let myid = new URL(location.href).searchParams.get("id")

befoled.onclick=function(){
    location.href='/web/winter-work/personal information/person-home-follow/person-home-befollowed.html?id='+myid
}

async function ask_for_follow(){
let obj={
        user_id:myid
    }
    let res = await fetch('http://localhost:8080/user/following',{
        method:'post',
        headers:{
            'Content-type':'application/json'
        },
        body:JSON.stringify(obj)
    });
    let res2 = await res.json();
    let result=res2.msg
    for(let i=0;i<result.length;i++){
        let div=document.createElement('div')
        list.appendChild(div)
        let img=document.createElement('img')
        let h1=document.createElement('h1')
        let button=document.createElement('button')
        div.appendChild(img)
        div.appendChild(h1)
        div.appendChild(button)


        let obj2={
            phoneoremail:result[i].phoneoremail
        }
        let r = await fetch('http://localhost:8080/getuserid',{
            method:'post',
            headers:{
                'Content-type':'application/json'
            },
            body:JSON.stringify(obj2)
        });
        let r2 = await r.json();
        let u_id=r2.msg.user_id

        img.src=result[i].cover
        h1.innerHTML=result[i].name
       
        
    }
}
ask_for_follow()