let core
(function(core){

    class Router{

        //public properties
        /**
         * @returns {string}
         */
        get ActiveLink(){

            return this.m_activelink
        }

        /**
         * @param {string} link
         */
        set ActiveLink(link){

        }

        //constructor 
        /**
         * Creates an instance of router
         * 
         * @constructor 
         */
        constructor(){
            this.ActiveLink = ""
        }

        //public methods - paths for methods
        /**
         * This method adds a new route to the Routing Table
         * 
         * @param {string[]} route
         * @returns {void}
         */
        Add(route) {
            this.m_routingTable.push(route)
        }

        /**
         * This method replaces the references for the Routing Table with a new one
         * Note: Routes should begin with a '/' character
         * 
         * @param {string} routingTable 
         * @param {void}
         */
        AddRoutingTable(routingTable){
            this.m_routingTable = routingTable
        }

        /**
         * This method finds and returns the index of the route in the Routing table
         * 
         * @param {string} route 
         * @returns 
         */
        Find(route){
            return this.m_routingTable.indexOf(route)
        }

        /**
         * This method remove a route from a routing table. It returns true if the route is removed, otherwise it returns -1
         * 
         * @param {string} route 
         * @returns {boolean}
         */
        Remove(route){

            if (this.Find(route) > -1){
                
                //remove the route
                this.m_routingTable.splice(this.Find(route), 1)                
                return true
            }
            return false
        }

        

        //public override methods
        /**
         * this method overrides the built-in toString method and returns the Routing Table in a comma-seperated output
         * 
         * @returns {string}
         */
        toString(){
            return this.m_routingTable.toString()
        }

    }


core.Router = Router
})(core || (core = {}))

let router = new core.Router()

let routingTable = [
    "/",                 // default route
    "/home",             // home page route
    "/about",            // about page route
    "/services",         // services page route
    "/contact",          // contact page route
    "/contact-list",     // contact-list page route
    "/projects",         // projects page route
    "/register",          // register page route
    "/login",             // login page route 
    "/edit"               // edit page route

]

let route = location.pathname

/*if (router.Find(route) > -1){
    router.ActiveLink = (route == "/") ? "home" : route.substring(1)
    
}else{
    router.ActiveLink = "404"
}*/

//Code above this is the same just one below is a terony operator
//Variable = (if condition) ? (if condition is true) : (else false) 
router.ActiveLink = (router.Find(route) > -1) ? (route == "/") ? "home" : route.substring(1) : router.ActiveLink = "404"