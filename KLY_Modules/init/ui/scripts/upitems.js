//To decode JSON from hex format
let hexToUtf8=str=>decodeURIComponent(
    
        str.replace(/\s+/g, '') // remove spaces
        .replace(/[0-9a-f]{2}/g, '%$&') // add '%' before each 2 characters
 
    )


let settings=JSON.parse(hexToUtf8(document.getElementById('settings').content))

let DARTH_VADER_PATH='https://user-images.githubusercontent.com/53381472/207451252-c931618c-2884-4e34-83de-55efde93cab2.png'

let VELAS_GIRL_PATH='https://user-images.githubusercontent.com/53381472/172846349-ef66e2df-b26b-4449-8dad-61a201c59a06.png'



main.setAttribute('class',settings.MODE==='light'?'cyberpunk':'cyberpunk black')

//Change the image
document.getElementById('front_image').setAttribute('src',settings.MODE==='light'?VELAS_GIRL_PATH:DARTH_VADER_PATH)


//Change theme handler
document.getElementById('theme-id').addEventListener('click',()=>{

    let main=document.getElementById('main'),

        updatedValue=main.getAttribute('class')==='cyberpunk'?'cyberpunk black':'cyberpunk'

    main.setAttribute('class',updatedValue)

    //Change the image
    document.getElementById('front_image').setAttribute('src',updatedValue==='cyberpunk black'?DARTH_VADER_PATH:VELAS_GIRL_PATH)
    

    fetch(`/update/MODE/${updatedValue==='cyberpunk black'?'dark':'light'}`).catch(_=>console.log('Failed'))


})



//Change fullscreen mode
document.getElementById('fullscreen').addEventListener('click',()=>{

    if(window.innerWidth == screen.width && window.innerHeight == screen.height){

        document.exitFullscreen()

    }else{

        document.documentElement.requestFullscreen()

    }
  
})