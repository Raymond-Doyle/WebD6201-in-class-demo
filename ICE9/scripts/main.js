(function (){
    /**
     * This function uses AJAX to open a connection to the server and returns
     * a data payload to the callback function
     * 
     * @param {string} method 
     * @param {string} url 
     * @param {function} callback 
     */
    function AjaxRequest(method, url, callback) {
        // AJAX
        // instantiate the XHR Object
        let XHR = new XMLHttpRequest()

        // add event listener for readystatechange
        XHR.addEventListener("readystatechange", () => {
            if (XHR.readyState === 4 && XHR.status === 200) {
                if (typeof callback === 'function') {
                    callback(XHR.responseText)
                } else {
                    console.error("ERROR: callback is not a function")
                }
            }
        })

        // connect and get data
        XHR.open(method, url)

        // send request to server to await response
        XHR.send()
    }

    /**
     * Load the static header
     * 
     * @param {HTML} html_data 
     */
    function LoadHeader(html_data) {
        $('#navigationBar').html(html_data)
        $(`li>a:contains(${ document.title })`).addClass('active')
        CheckLogin()
    }

    /**
     * This function loads content
     * 
     * @returns {void}
     */
    function LoadContent(){

    }

    /**
     * This function loads footer
     * 
     * @returns {void}
     */
    function LoadFooter(){

    }


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

    function ValidateInput(inputFieldID, regularExpression, exception) {

        let messageArea = $('#messageArea').hide()
        
        $('#' + inputFieldID).on("blur", function(){
            let inputText = $(this).val()
            if (!regularExpression.test(inputText)){
                $(this).trigger("focus").trigger("select")

                messageArea.addClass("alert alert-danger").text(exception).show()


            }else{

                messageArea.removeAttr("class").hide()

            }
        })
    }

    function ContactFormValidate(){

        let fullNamePattern = /^([A-Z][a-z]{1,25})((\s|,|-)([A-Z][a-z]{1,}))*(\s|,|-)*([A-Z][a-z]{1,})*$/g
        let contactNumberPattern = /^\(?\d{3}\)?[\s\.\-]?\d{3}[\s\.\-]?\d{4}$/g
        let emailAddressPatten = /^[\w-\.]+@([\w-]+\.+[\w-][\D]{2,10})$/g

        ValidateInput("fullName", fullNamePattern, "Please enter a valid Full name which means a capitalized first name and a captialized last name")
        ValidateInput("contactNumber", contactNumberPattern, "Please enter a valid phone number")
        ValidateInput("emailAddress", emailAddressPatten, "Please enter a valid email address")

        //TestFullName()
        //TestEmailAddress()

    }

    function DisplayContacts(){



        console.log("Contacts Page")

        ContactFormValidate()

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

        //Creates a button within a div tag if the user is logged in
        if (sessionStorage.getItem("user")){

            $("#buttonDiv").append(`<a href="./contact-list.html" class="btn btn-primary btn-lg"><i class="fas fa-users fa-lg"></i> Show Contact List</a>`)

        }


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

        $("#addButton").on("click", () => {

            location.href = 'edit.html#Add'

        })

    }

    function DisplayEditPage(){

        ContactFormValidate()

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

    function DisplayLogin() {
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
                    // passed in from users.json
                    if (username.value == user.Username && password.value == user.Password) {
                        newUser.fromJSON(user)
                        success = true
                        break
                    }
                }

                // if username and password matched (success = true) -> perform the login sequence
                if (success) {
                    // add user to sessionStorage
                    sessionStorage.setItem('user', newUser.serialize())

                    // hide any error messages
                    // missing a part of this code
                    messageArea.removeAttr('class').hide()

                    // redirect the user to the secure area of our website - contact-list.html
                    location.href = 'contacts.html'
                } else {
                    // display the error message
                    $('#username').trigger('focus').trigger('select')
                    messageArea.addClass('alert alert-danger').text('Error: Invalid Login Credentials.. Username/Password Mismatch')
                }
            })

            
        })

        $('#cancelButton').on('click', function() {
            // clear the form
            document.form[0].reset()

            // return to home page
            location.href = 'index.html'
        })
    }

    function CheckLogin(){

        if (sessionStorage.getItem("user")){

            $('#login').html(

                `<a id="logout" class="nav-link" href="#"><i class="fas fa-sign-in-alt"></i>Logout</a>`

            )

            $('#logout').on('click', function(){
               
                sessionStorage.clear()
                location.href = 'login.html'

            })

        }

    }

    function DisplayReferences(){
        console.log("References Page")
    }

    function DisplayRegister(){
        console.log("Register Page")
    }


    function Display404Page(){
        console.log("404 Page...")
    }

    /**
     * @returns {function}
     */
    function ActiveLinkCallBack(){

    }


    function Start(){
        console.log("App Started!")
        
        //AjaxRequest("GET", "./static/header.html", LoadHeader)

        LoadHeader()

        LoadContent()

        LoadFooter()


        /*switch (document.title){
            case "Homepage":
                DisplayHome()
                break
            case "Projects":
                DisplayProjects()
                break
            case "Contact Us":
                DisplayContacts()
                break
            case "Contact List":
                DisplayContactList()
                break
            case "Edit":
                DisplayEditPage()
                break
            case "Login":
                DisplayLogin()
                break
            case "Register":
                DisplayRegister()
                break
            case "References":
                DisplayReferences()
                break
        }*/

    }


    window.addEventListener("load", Start)
})()