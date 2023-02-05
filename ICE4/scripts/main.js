(function (){

    function DisplayHome(){
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
    }

    function DisplayProjects(){
        console.log("Projects Page")
    }

    function DisplayContacts(){
        console.log("Contacts Page")

        let submitButton = document.getElementById("submitButton")
        let subscribeCheckbox = document.getElementById("subscribeCheckbox")

        console.log("Contacts Page")


        submitButton.addEventListener("click", function(event){
            event.preventDefault
            if (subscribeCheckbox.checked){
                console.log("The user had subscribed")
            }
        })
    }

    function DisplayContactList(){
        console.log("Contact List Page")

    }

    function DisplayReferences(){
        console.log("References Page")
    }

    function Start(){
        console.log("App Started!")
    
        switch (document.title){
            case "Homepage - WEBD6201 Demo":
                DisplayHome()
                break
            case "Projects - WEBD6201 Demo":
                DisplayProjects()
                break
            case "Contact Us - WEBD6201 Demo":
                DisplayContacts()
                break
            case "Contact List - WEBD6201 Demo":
                DisplayContactList()
                break
            case "References - WEBD6201 Demo":
                DisplayReferences()
                break
        }

    }


    window.addEventListener("load", Start)
})()