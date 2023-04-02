(function() {

    let protectedRoutes: string[] = [
        'contact-list'
    ]

    if (protectedRoutes.indexOf(router.ActiveLink) > -1){
        if (!sessionStorage.getItem("user")) {
            location.href = '/login'
        }
    }

})()