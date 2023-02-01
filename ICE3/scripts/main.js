(function (){

    function DisplayButton(){
        let randomButton = document.getElementById("randomButton")
        randomButton.addEventListener("click", function(){
            location.href = './projects.html'
        })
        let mainContent  = document.getElementsByTagName("main")[0]
        //console.log(mainContent)
        mainContent.setAttribute("class", "container")
        documentBody = document.body

        let mainParagraph = document.createElement("p")
        mainParagraph.setAttribute("id", "MainParagraph")
        mainParagraph.setAttribute("class", "mt-3 container")

        let firstString = "This is a "
        let secondString = `${firstString} paragraph that we added through javascript`
        mainParagraph.textContent = secondString

        mainContent.before(mainParagraph)
        //mainContent.appendChild(mainParagraph)
        //document.getElementById("randomButton").remove()

        /*documentBody.innerHTML = `
        <div class="container">
            <h1 class="display-1">Hello WEBD</h1>
            <p>This is the test page</p>
        </div>`*/
        
    
    }


    function Start(){
        console.log("App Started!")
    
        switch (document.title){
            case "Homepage - WEBD6201 Demo":
                DisplayButton()
                break
            case "Projects - WEBD6201 Demo":
                DisplayButton()
                break
        }

    }


    window.addEventListener("load", Start)
})()