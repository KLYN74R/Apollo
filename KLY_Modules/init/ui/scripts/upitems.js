//Change theme handler
document.getElementById('theme-id').addEventListener('click',()=>{

    let main=document.getElementById('main')

    main.setAttribute('class',main.getAttribute('class')==='cyberpunk'?'cyberpunk black':'cyberpunk')


    //Change color of version

})



//Change fullscreen mode
document.getElementById('fullscreen').addEventListener('click',()=>{

    if(window.innerWidth == screen.width && window.innerHeight == screen.height){

        document.exitFullscreen()

    }else{

        document.documentElement.requestFullscreen()

    }
  
})