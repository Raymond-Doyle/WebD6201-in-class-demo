(function (){

    function DisplayHome(){

        //Least Amount of Memory Heap
        // let randomButton = document.getElementById("randomButton")
        // randomButton.addEventListener("click", function(){
        //     location.href = './projects.html'
        // })

        //Most Amount of Memory Heap
         $("#randomButton").on("click", function() {
             location.href = 'contacts.html'
         })

        //Second Most Amount of Memory Heap - JS Query
        //document.querySelectorAll("#randomButton").forEach(element => element.addEventListener("click", () => { location.href = 'contacts.html'}) )



        // let mainContent  = document.getElementsByTagName("main")[0]
        // console.log(mainContent)
        // mainContent.setAttribute("class", "container")
        // documentBody = document.body

        // let mainParagraph = document.createElement("p")
        // mainParagraph.setAttribute("id", "MainParagraph")
        // mainParagraph.setAttribute("class", "mt-3 container")

         let firstString = "This is a "
         let secondString = `${firstString} paragraph that we added through javascript`
        // mainParagraph.textContent = secondString

        // mainContent.appendChild(mainParagraph)

        $("main").addClass("container").append(`<p id="MainParagraph" class="mt-3 container">${secondString}</p>`)

    }

    function DisplayProjects(){
        console.log("Projects Page")
    }

    function AddContact(fullName, contactNumber, emailAddress){
        let contact = new Contact(fullName, contactNumber, emailAddress)
            if (contact.serialize()){
                let key = contact.Name.substring(0, 1) + Date.now()
                localStorage.setItem(key, contact.serialize())
            }
    }

    function TestFullName(){

        let messageArea = $('#messageArea').hide()
        
        let fullNamePattern = /([A-Z][a-z]{1, 25})((\s|,|-)([A-Z][a-z]{1,25}))*(\s|-|,)*([A-Z][a-z]{1,25}))*/g

        $('#fullName').on("blur", function(){
            let fullNameText = $(this).val()
            if (!fullNamePattern.test(fullNameText)){
                $(this).trigger("focus")
                $(this).trigger("select")

                messageArea.addClass("alert alert-danger")
                messageArea.text("Please enter a valid Full name which means a capitalized first name and a captialized last name")
                messageArea.show()


            }else{

                messageArea.removeAttr("class")
                messageArea.hide()

            }
        })

    }

    function DisplayContacts(){
        console.log("Contacts Page")

        let submitButton = document.getElementById("submitButton")
        let subscribeCheckbox = document.getElementById("subscribeCheckbox")

        //Local Storage
        /*localStorage.setItem("Random Variable", "Random variable for testing and demonstration")
        console.log(localStorage.getItem("Random Variable"))
        localStorage.removeItem("Random Variable")*/

        console.log("Contacts Page")


        submitButton.addEventListener("click", function(event){
            //event.preventDefault
            if (subscribeCheckbox.checked){
                //if the user subscribes store the contact in local storage
                AddContact(fullName.value, contactNumber.value, emailAddress.value)
            }
        })
    }

    function DisplayContactList(){

        if (localStorage.length > 0){

            let contactList = document.getElementById("contactList") // Our contact list in the table of the contact list page
            let data = "" //Add data to this variable. Append deserialized data from LocalStorage to data
            let keys = Object.keys(localStorage)//Return a String Array of keys
            let index = 1 // Count the number of keys
            
            //For every key in the keys collection
            for (const key of keys) {
                let contactData = localStorage.getItem(key) //Get localStorage data value related to the key
                let contact = new Contact()
                contact.deserialize(contactData)

                //Inject repeatable row into the contact list
                data += `<tr>
                    <th scope="row" class="test-center">${ index }</th>
                    <td class="text-center">${ contact.Name }</td>
                    <td class="text-center">${ contact.ContactNumber }</td>
                    <td class="text-center">${ contact.EmailAddress }</td>
                    <td class="text-center"><button value="${key}" id="editButton" class="btn btn-primary btn-sm edit"><i class="fas fa-edit fa-sm"></i>&nbsp; Edit</button></td>
                    <td class="text-center"><button value="${key}" id="deleteButton" class="btn btn-danger btn-sm delete"><i class="fas fa-trash-alt fa-sm"></i>&nbsp; Delete</button></td>
                    </tr>
                `

                index++
            }

            contactList.innerHTML = data

            $("#addButton").on("click", () => {

                location.href = 'edit.html#Add'

            })

            $("button.delete").on("click", function(){

                if (confirm("Are you sure you want to delete this contact?")){
                    localStorage.removeItem($(this).val())
                }

                location.href = "contact-list.html"
            })

            $("button.edit").on("click", function(){
                location.href = 'edit.html#' + $(this).val()
            })

        }

    }

    function DisplayEditPage(){
        let page = location.hash.substring(1)

        switch(page){
            case "Add":
                {
                    $("#welcome").text("WEBD6201 Demo Add Contact")

                    $("#editButton").html(`<i class="fas fa-plus-circle fa-lg"></i> Add`)

                    $("#editButton").on("click", (event) => {
                        event.preventDefault()

                        AddContact(fullName.value, contactNumber.value, emailAddress.value)

                        location.href = "contact-list.html"
                    })
                }
                break
            default:
                {
                    let contact = new Contact()
                    contact.deserialize(localStorage.getItem(page))

                    $("#fullName").val(contact.Name)
                    $("#contactNumber").val(contact.ContactNumber)
                    $("#emailAddress").val(contact.EmailAddress)

                    $("#editButton").on("click", (event) => {
                        event.preventDefault()

                        contact.Name = $("#fullName").val()
                        contact.ContactNumber = $("#contactNumber").val()
                        contact.EmailAddress = $("#emailAddress").val()

                        localStorage.setItem(page, contact.serialize())

                        location.href = "contact-list.html"

                    })
                }
                break

        }

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
            case "Edit - WEBD6201 Demo":
                DisplayEditPage()
                break
            case "References - WEBD6201 Demo":
                DisplayReferences()
                break
        }

    }


    window.addEventListener("load", Start)
})()