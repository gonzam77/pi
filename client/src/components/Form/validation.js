export default function validation({name, description, image, platforms, rating, released, genres}) {
    
    const regexName = /^[a-z0-9_-]{3,16}$/
    const regexImage = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/
    const regexRating = /^[0-9]+$/
    const regexReleased = /^(?:(?:(?:0?[1-9]|1\d|2[0-8])[/](?:0?[1-9]|1[0-2])|(?:29|30)[/](?:0?[13-9]|1[0-2])|31[/](?:0?[13578]|1[02]))[/](?:0{2,3}[1-9]|0{1,2}[1-9]\d|0?[1-9]\d{2}|[1-9]\d{3})|29[/]0?2[/](?:\d{1,2}(?:0[48]|[2468][048]|[13579][26])|(?:0?[48]|[13579][26]|[2468][048])00))$/
    const regexPlatforms = ""
    const regexGenres = ""

    var errors = {
        name: "",
        description: "",
        image: "",
        platforms: "",
        rating: "",
        released: "",
        genres: "",
    }
    
    if(!name) {
        errors.image = "A name is needed"
    } 
    if(!image) {
        errors.image = "A image is needed"
    } 
    if(!rating) {
        errors.raing = "A rating is needed"
    } 
    if(!released) {
        errors.released = "A released is needed"
    } 
    if(!platforms.length) {
        errors.platforms = "A platforms is needed"
    } 
    if(!genres.length) {
        errors.genres = "A genres is needed"
    } 
    if(!description ) {
        errors.description = "A description is needed";
    }

    // if(!regexName.test(name)) {
    //     errors.name = "Invalid name";
    // }
    if(name.length < 3) {
        errors.name = "Invalid name";
    }
    if(!regexImage.test(image)) {
        errors.image = "Invalid image URL";
    }
    if(!regexReleased.test(released)) {
        errors.released = "Invalid date";
    }
    if(!regexRating.test(rating)) {
        errors.rating = "Rating can only have numbers";
    }
    if(description.length < 10) {
        errors.description = "Must have more than 10 characters"
    }   
    
    return errors
}

