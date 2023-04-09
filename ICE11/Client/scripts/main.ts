(function (){
    
    function AuthGuard(): void {
        
        let protectedRoutes: string[] = [
            '/contact-list',
            '/edit'
        ]
    
        if (protectedRoutes.indexOf(location.pathname) > -1){
            if (!sessionStorage.getItem("user")) {
                location.href = '/login'
            }
        }
    
    }


    function DisplayHome(): Function{

        //Least Amount of Memory Heap
        // let randomButton = document.getElementById("randomButton")
        // randomButton.addEventListener("click", function(){
        //     location.href = './projects.html'
        // })

        //Most Amount of Memory Heap
         $("#randomButton").on("click", function() {
             location.href = '/contacts'
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

        return new Function()
    }

    function DisplayProjects(): Function{
        console.log("Projects Page")

        return new Function()
    }

    function AddContact(fullName:string, contactNumber:string, emailAddress:string){
        let contact = new core.Contact(fullName, contactNumber, emailAddress)
            if (contact.serialize()){
                let key = contact.Name.substring(0, 1) + Date.now()
                localStorage.setItem(key, contact.serialize() as string)
            }
    }

    function ValidateInput(inputFieldID:string, regularExpression:RegExp, exception:string) {

        let messageArea = $('#messageArea').hide()
        
        $('#' + inputFieldID).on("blur", function(){
            let inputText = $(this).val() as string
            if (!regularExpression.test(inputText)){
                $(this).trigger("focus").trigger("select")

                messageArea.addClass("alert alert-danger").text(exception).show()


            }else{

                messageArea.removeAttr("class").hide()

            }
        })
    }

    function ContactFormValidate(): void{

        let fullNamePattern = /^([A-Z][a-z]{1,25})((\s|,|-)([A-Z][a-z]{1,}))*(\s|,|-)*([A-Z][a-z]{1,})*$/g
        let contactNumberPattern = /^\(?\d{3}\)?[\s\.\-]?\d{3}[\s\.\-]?\d{4}$/g
        let emailAddressPatten = /^[\w-\.]+@([\w-]+\.+[\w-][\D]{2,10})$/g

        ValidateInput("fullName", fullNamePattern, "Please enter a valid Full name which means a capitalized first name and a captialized last name")
        ValidateInput("contactNumber", contactNumberPattern, "Please enter a valid phone number")
        ValidateInput("emailAddress", emailAddressPatten, "Please enter a valid email address")

        //TestFullName()
        //TestEmailAddress()
    }

    function DisplayContacts(): Function{

        console.log("Contacts Page")

        $('a[data="contact-list"]').off('click')
        $('a[data="contact-list"]').on('click', function() {
            location.href = '/contact-list'
        })

        ContactFormValidate()

        let submitButton = document.getElementById("submitButton") as HTMLElement
        let subscribeCheckbox = document.getElementById("subscribeCheckbox") as HTMLInputElement

        console.log("Contacts Page")


        submitButton.addEventListener("click", function(event){
            //event.preventDefault
            if (subscribeCheckbox.checked){

                let fullName = document.forms[0].fullName.value
                let contactNumber = document.forms[0].contactNumber.value
                let emailAddress = document.forms[0].emailAddress.value

                //if the user subscribes store the contact in local storage
                let contact = new core.Contact (fullName, contactNumber, emailAddress)

                if (contactNumber.serialize()){
                    let key = contact.Name.substring(0,1) + Date.now()
                    localStorage.setItem(key, contact.serialize() as string)
                }
            }
        })

        //Creates a button within a div tag if the user is logged in
        if (sessionStorage.getItem("user")){

            $("#buttonDiv").append(`<a href="/contact-list" class="btn btn-primary btn-lg link"><i class="fas fa-users fa-lg"></i> Show Contact List</a>`)

        }

        return new Function()
    }

    function DisplayContactList(): Function{

        if (localStorage.length > 0){

            let contactList = document.getElementById("contactList") as HTMLElement // Our contact list in the table of the contact list page
            let data = "" //Add data to this variable. Append deserialized data from LocalStorage to data
            let keys = Object.keys(localStorage)//Return a String Array of keys
            let index = 1 // Count the number of keys
            
            //For every key in the keys collection
            for (const key of keys) {
                let contactData = localStorage.getItem(key) as string//Get localStorage data value related to the key
                let contact = new core.Contact("", "", "")

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

            $("button.delete").on("click", function(){

                if (confirm("Are you sure you want to delete this contact?")){
                    localStorage.removeItem($(this).val() as string)
                }

                //location.href = "/contact-list"
                location.href = '/contact-list'
            })

            $("button.edit").on("click", function(){
                //location.href = '/edit#' + $(this).val() as string
                location.href = '/edit#' + $(this).val() as string
            })

        }

        $("#addButton").on("click", () => {

            //location.href = '/edit#Add'
            location.href = '/edit#Add'

        })

        return new Function()
    }

    function DisplayEditPage(): Function{

        ContactFormValidate()

        let page = location.hash.substring(1)

        switch(page){
            case "Add":
                {
                    $("#welcome").text("WEBD6201 Demo Add Contact")

                    $("#editButton").html(`<i class="fas fa-plus-circle fa-lg"></i> Add`)

                    $("#editButton").on("click", (event) => {
                        event.preventDefault()

                        let fullName = document.forms[0].fullName.value
                        let contactNumber = document.forms[0].contactNumber.value
                        let emailAddress = document.forms[0].emailAddress.value

                        AddContact(fullName, contactNumber, emailAddress)

                        //location.href = "/contact-list"
                        location.href = '/contact-list'
                    })
                }
                break
            default:
                {
                    let contact = new core.Contact("", "", "")
                    contact.deserialize(localStorage.getItem(page) as string)

                    $("#fullName").val(contact.Name)
                    $("#contactNumber").val(contact.ContactNumber)
                    $("#emailAddress").val(contact.EmailAddress)

                    $("#editButton").on("click", (event) => {
                        event.preventDefault()

                        contact.Name = $("#fullName").val() as string
                        contact.ContactNumber = $("#contactNumber").val() as string
                        contact.EmailAddress = $("#emailAddress").val() as string

                        localStorage.setItem(page, contact.serialize() as string)

                        //location.href = "/contact-list"
                        location.href = '/contact-list'
                    })
                }
                break

        }
        return new Function()
    }

    function DisplayLogin(): Function {
        console.log("Login Page")

        let messageArea = $('#messageArea')
        messageArea.hide()


        $('#loginButton').on('click', function() {
            let success = false

            // create an empty user object
            let newUser = new core.User()

            // use JQuery to load users.json file and read over it
            $.get('./user.json', function(data) {
                // iterate over every user in the users.json file... for loop
                for (const user of data.users) {
                    // check if the username and password match the user data

                    let username = document.forms[0].username.value
                    let password = document.forms[0].password.value

                    // passed in from users.json
                    if (username == user.Username && password == user.Password) {
                        newUser.fromJSON(user)
                        success = true
                        break
                    }
                }

                // if username and password matched (success = true) -> perform the login sequence
                if (success) {
                    // add user to sessionStorage
                    sessionStorage.setItem('user', newUser.serialize() as string)

                    // hide any error messages
                    // missing a part of this code
                    messageArea.removeAttr('class').hide()

                    // redirect the user to the secure area of our website - contact-list.html
                    //location.href = '/contacts'
                    location.href = '/contact-list'
                } else {
                    // display the error message
                    $('#username').trigger('focus').trigger('select')
                    messageArea.addClass('alert alert-danger').text('Error: Invalid Login Credentials.. Username/Password Mismatch')
                }
            })

            
        })

        $('#cancelButton').on('click', function() {
            // clear the form
            document.forms[0].reset()

            // return to home page
            //location.href = '/home'
            location.href = '/home'
        })
        return new Function()
    }

    function CheckLogin():void{

        if (sessionStorage.getItem("user")){

            $('#login').html(

                `<a id="logout" class="nav-link" href="/login"><i class="fas fa-sign-in-alt"></i>Logout</a>`

            )

            $('#logout').on('click', function(){
               
                sessionStorage.clear()

                $('#login').html(`<a class="nav-link" href="/login"><i class="fas fa-sign-in-alt"></i>Login</a>`)

                //location.href = '/login'
                location.href = '/login'
            })

        }

    }

    function DisplayReferences(): Function{
        console.log("References Page")
        return new Function()
    }

    function DisplayRegister(): Function{
        console.log("Register Page")

        return new Function()
    }


    function Display404Page(): Function{
        console.log("404 Page...")
        return new Function()
    }


    function Start(){
        console.log("App Started!")
       
        let pageId = $('body')[0].getAttribute('id')

        CheckLogin()


        switch (router.ActiveLink){
            case "home":
                DisplayHome()
            case "projects":
                DisplayProjects()
            case "contacts":
                DisplayContacts()
            case "contact-list":
                AuthGuard()
                DisplayContactList()
            case "references":
                DisplayReferences()
            case "edit":
                AuthGuard()
                DisplayEditPage()
            case "login":
                DisplayLogin()
            case "register":
                DisplayRegister()
            case "404":
                Display404Page()

        }
    }

    window.addEventListener("load", Start)
})()