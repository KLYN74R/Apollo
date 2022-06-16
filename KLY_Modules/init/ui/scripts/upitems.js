//To decode JSON from hex format
let hexToUtf8=str=>decodeURIComponent(
    
        str.replace(/\s+/g, '') // remove spaces
        .replace(/[0-9a-f]{2}/g, '%$&') // add '%' before each 2 characters
 
    )


let settings=JSON.parse(hexToUtf8(document.getElementById('settings').content))


main.setAttribute('class',settings.MODE==='light'?'cyberpunk':'cyberpunk black')


//Change theme handler
document.getElementById('theme-id').addEventListener('click',()=>{

    let main=document.getElementById('main'),

        updatedValue=main.getAttribute('class')==='cyberpunk'?'cyberpunk black':'cyberpunk'

    main.setAttribute('class',updatedValue)
    

    fetch(`/update/MODE/${updatedValue==='cyberpunk black'?'dark':'light'}`).catch(e=>console.log('Failed'))


})



//Change fullscreen mode
document.getElementById('fullscreen').addEventListener('click',()=>{

    if(window.innerWidth == screen.width && window.innerHeight == screen.height){

        document.exitFullscreen()

    }else{

        document.documentElement.requestFullscreen()

    }
  
})