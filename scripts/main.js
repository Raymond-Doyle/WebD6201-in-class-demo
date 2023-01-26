(function (){

    function DisplayButton(){
        let randomButton = document.getElementById("randomButton")
        randomButton.addEventListener("click", function(){
            location.href = './projects.html'
        })
        let mainContent  = document.getElementsByTagName("main")[0]
        //console.log(mainContent)

        let mainParagraph = document.createElement("p")
        mainParagraph.setAttribute("id", "MainParagraph")
        mainParagraph.setAttribute("class", "mt-3")

        let firstString = "This is a paragraph that we added through javascript"
        mainParagraph.textContent = firstString

        mainContent.appendChild(mainParagraph)
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